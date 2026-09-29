package io.github.alph_a07.basis.tokens.color

import kotlin.math.PI
import kotlin.math.atan2
import kotlin.math.cos
import kotlin.math.max
import kotlin.math.pow
import kotlin.math.roundToInt
import kotlin.math.sin
import kotlin.math.sqrt

/**
 * A color in the OKLCH color space (the polar/cylindrical form of OKLab).
 *
 * OKLCH is used as the single working space for every derived color in Basis — it is
 * perceptually uniform, so lightness/chroma steps and hue rotations behave predictably
 * regardless of the underlying hue, unlike HSL.
 *
 * @param l Perceptual lightness. 0 = black, 1 = white.
 * @param c Chroma (colorfulness). 0 = gray; practically renders up to roughly 0.4 in sRGB.
 * @param h Hue angle in degrees, 0..360.
 */
data class Oklch(val l: Float, val c: Float, val h: Float) {
    fun rotateHue(degrees: Float): Oklch = copy(h = ((h + degrees) % 360f + 360f) % 360f)
    fun withLightness(newL: Float): Oklch = copy(l = newL.coerceIn(0f, 1f))
    fun withChroma(newC: Float): Oklch = copy(c = max(0f, newC))
}

/** The golden angle in degrees. Rotating by this amount repeatedly spaces an arbitrary number of hues. */
const val GOLDEN_ANGLE_DEGREES = 137.50777f

/**
 * sRGB <-> OKLab/OKLCH conversion. Matrices from Björn Ottosson's OKLab reference
 * (https://bottosson.github.io/posts/oklab/); this is the standard, widely-verified derivation
 * also used by CSS oklch() and oklch.com.
 */

private fun srgbToLinear(v: Float): Float =
    if (v <= 0.04045f) v / 12.92f else ((v + 0.055f) / 1.055f).pow(2.4f)

private fun linearToSrgb(v: Float): Float =
    if (v <= 0.0031308f) v * 12.92f else 1.055f * v.pow(1f / 2.4f) - 0.055f

private fun cbrt(v: Float): Float = if (v >= 0f) v.pow(1f / 3f) else -(-v).pow(1f / 3f)

/**
 * Converts this [BasisColor] to the OKLCH color space.
 * Alpha is not part of OKLCH; carry it separately.
 */
fun BasisColor.toOklch(): Oklch {
    val r = srgbToLinear(red / 255f)
    val g = srgbToLinear(green / 255f)
    val b = srgbToLinear(blue / 255f)

    val l = 0.41222146f * r + 0.53633255f * g + 0.051445995f * b
    val m = 0.2119035f * r + 0.6806995f * g + 0.10739696f * b
    val s = 0.08830246f * r + 0.28171885f * g + 0.6299787f * b

    val lPrime = cbrt(l)
    val mPrime = cbrt(m)
    val sPrime = cbrt(s)

    val bigL = 0.21045426f * lPrime + 0.7936178f * mPrime - 0.004072047f * sPrime
    val a = 1.9779985f * lPrime - 2.4285922f * mPrime + 0.4505937f * sPrime
    val bLab = 0.025904037f * lPrime + 0.78277177f * mPrime - 0.80867577f * sPrime

    val chroma = sqrt(a * a + bLab * bLab)
    val hueRad = atan2(bLab, a)
    val hueDeg = (hueRad * 180f / PI.toFloat()).let { if (it < 0f) it + 360f else it }

    return Oklch(bigL, chroma, hueDeg)
}

/** Converts this OKLCH color back to a [BasisColor], clamping to the nearest representable sRGB value. */
fun Oklch.toBasisColor(alpha: Int = 255): BasisColor {
    val hueRad = h * PI.toFloat() / 180f
    val a = c * cos(hueRad)
    val bLab = c * sin(hueRad)

    val lPrime = l + 0.39633778f * a + 0.21580376f * bLab
    val mPrime = l - 0.105561346f * a - 0.06385417f * bLab
    val sPrime = l - 0.08948418f * a - 1.2914855f * bLab

    val ll = lPrime.pow(3)
    val mm = mPrime.pow(3)
    val ss = sPrime.pow(3)

    val r = +4.0767417f * ll - 3.3077116f * mm + 0.23096994f * ss
    val g = -1.268438f * ll + 2.6097574f * mm - 0.34131938f * ss
    val b = -0.0041960864f * ll - 0.7034186f * mm + 1.7076147f * ss

    fun channel(v: Float) = (linearToSrgb(v.coerceIn(0f, 1f)) * 255f).roundToInt().coerceIn(0, 255)

    return BasisColor.fromArgb(alpha, channel(r), channel(g), channel(b))
}

const val WCAG_AA_NORMAL_TEXT = 4.5f
const val WCAG_AA_LARGE_TEXT = 3.0f

private fun channelLuminance(channel: Int): Float {
    val cs = channel / 255f
    return if (cs <= 0.03928f) cs / 12.92f else ((cs + 0.055f) / 1.055f).pow(2.4f)
}

/** WCAG 2.x relative luminance, 0 (black) to 1 (white). */
fun BasisColor.relativeLuminance(): Float =
    0.2126f * channelLuminance(red) + 0.7152f * channelLuminance(green) + 0.0722f * channelLuminance(blue)

/** WCAG 2.x contrast ratio between two colors, from 1:1 (identical) to 21:1 (black vs white). */
fun contrastRatio(a: BasisColor, b: BasisColor): Float {
    val l1 = a.relativeLuminance() + 0.05f
    val l2 = b.relativeLuminance() + 0.05f

    return if (l1 > l2) l1 / l2 else l2 / l1
}

private val PURE_WHITE = BasisColor.fromArgb(255, 255, 255, 255)
private val PURE_BLACK = BasisColor.fromArgb(255, 0, 0, 0)

/**
 * Returns the accessible ink color (black or white) that provides the highest contrast against this
 * background color, according to WCAG 2.x guidelines.
 * This is useful for determining text color on colored backgrounds to ensure readability.
 */
fun BasisColor.contentOn(): BasisColor {
    val onWhite = contrastRatio(this, PURE_WHITE)
    val onBlack = contrastRatio(this, PURE_BLACK)

    return if (onWhite >= onBlack) PURE_WHITE else PURE_BLACK
}
