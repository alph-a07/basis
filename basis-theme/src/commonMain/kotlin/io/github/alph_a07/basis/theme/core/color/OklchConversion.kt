@file:Suppress("MagicNumber")

package io.github.alph_a07.basis.theme.core.color

import io.github.alph_a07.basis.theme.core.format.coerceToFloat32
import io.github.alph_a07.basis.theme.core.format.toFloat32
import kotlin.math.PI
import kotlin.math.atan2
import kotlin.math.cbrt
import kotlin.math.pow
import kotlin.math.sqrt

/**
 * Converts an intake color into OKLCH, or null when the value cannot be interpreted.
 *
 * Hex strings outside the six or eight digit form and non-finite HSL components are rejected so
 * the caller reports them instead of failing resolution.
 */
internal fun ColorSpec.toOklchOrNull(): Oklch? =
    when (this) {
        is ColorSpec.Hex -> {
            hexToOklch(value)
        }

        is ColorSpec.Argb -> {
            argbToOklch(argb)
        }

        is ColorSpec.Hsl -> {
            hslToOklch(h, s, l, a)
        }

        is Oklch -> {
            this
        }
    }

/**
 * Builds an OKLCH color from unvalidated components.
 *
 * Lightness, chroma, and alpha are coerced into their documented ranges and the hue is wrapped
 * into `[0, 360)`, so intermediate derivation results never fail construction.
 */
internal fun safeOklch(l: Float, c: Float, h: Float, a: Float = 1f): Oklch = Oklch(
    l = l.coerceIn(0f, 1f).coerceToFloat32(),
    c = c.coerceAtLeast(0f).coerceToFloat32(),
    h = h.wrapHue().coerceToFloat32(),
    a = a.coerceIn(0f, 1f).coerceToFloat32(),
)

/**
 * Converts this [Oklch] color to a 32-bit packed ARGB integer in `0xAARRGGBB` layout.
 *
 * Linear sRGB channels are derived from OKLab LMS cone responses and mapped through the
 * standard sRGB gamma transfer curve, then clamped to `0..255`.
 *
 * @return 32-bit packed ARGB integer.
 */
public fun Oklch.toArgb(): Int {
    fun toGamma(linear: Float): Float {
        val clamped = linear.coerceIn(0f, 1f)

        return if (clamped <= LINEAR_TRANSFER_KNEE) {
            12.92f * clamped
        } else {
            1.055f * clamped.pow(1f / 2.4f) - 0.055f
        }.coerceIn(0f, 1f)
    }

    val linear = toLinearSrgb()
    val red = (toGamma(linear.r) * BYTE_MAX + ROUND_OFFSET).toInt()
    val green = (toGamma(linear.g) * BYTE_MAX + ROUND_OFFSET).toInt()
    val blue = (toGamma(linear.b) * BYTE_MAX + ROUND_OFFSET).toInt()
    val alpha = (a.coerceIn(0f, 1f) * BYTE_MAX + ROUND_OFFSET).toInt()

    return (alpha shl ALPHA_SHIFT) or (red shl RED_SHIFT) or (green shl GREEN_SHIFT) or blue
}

/**
 * Converts this [Oklch] color into a [ColorSpec.Argb] representation.
 *
 * @return The [ColorSpec.Argb] wrapping this color's packed ARGB integer.
 */
public fun Oklch.toColorSpecArgb(): ColorSpec.Argb = ColorSpec.Argb(toArgb())

@Suppress("ReturnCount")
private fun hexToOklch(value: String): Oklch? {
    val digits = value.removePrefix("#")
    if (!HEX_SHAPE.matches(digits)) {
        return null
    }

    val channels = digits.chunked(2).map { it.toIntOrNull(HEX_RADIX) }
    if (channels.any { it == null }) {
        return null
    }

    val values = channels.filterNotNull()
    val alpha = values.getOrNull(3) ?: CHANNEL_MASK

    return srgbToOklch(
        r = values[0] / BYTE_MAX,
        g = values[1] / BYTE_MAX,
        b = values[2] / BYTE_MAX,
        a = alpha / BYTE_MAX,
    )
}

private fun argbToOklch(argb: Int): Oklch {
    fun channel(shift: Int): Float = (argb ushr shift and CHANNEL_MASK) / BYTE_MAX

    return srgbToOklch(
        r = channel(RED_SHIFT),
        g = channel(GREEN_SHIFT),
        b = channel(0),
        a = channel(ALPHA_SHIFT),
    )
}

private fun hslToOklch(h: Float, s: Float, l: Float, a: Float): Oklch {
    val chroma = (1f - kotlin.math.abs(2f * l - 1f)) * s
    val huePrime = h.wrapHue() / HUE_SECTOR
    val secondary = chroma * (1f - kotlin.math.abs(huePrime % 2f - 1f))

    val (red, green, blue) = hueSector(huePrime.toInt(), chroma, secondary)
    val lightness = l - chroma / 2f

    return srgbToOklch(red + lightness, green + lightness, blue + lightness, a)
}

private fun srgbToOklch(r: Float, g: Float, b: Float, a: Float): Oklch {
    val linearR = toLinear(r.toDouble())
    val linearG = toLinear(g.toDouble())
    val linearB = toLinear(b.toDouble())

    val lmsLong = OKLAB_MATRIX[0] * linearR + OKLAB_MATRIX[1] * linearG + OKLAB_MATRIX[2] * linearB
    val lmsMedium = OKLAB_MATRIX[3] * linearR + OKLAB_MATRIX[4] * linearG + OKLAB_MATRIX[5] * linearB
    val lmsShort = OKLAB_MATRIX[6] * linearR + OKLAB_MATRIX[7] * linearG + OKLAB_MATRIX[8] * linearB

    val rootLong = cbrt(lmsLong)
    val rootMedium = cbrt(lmsMedium)
    val rootShort = cbrt(lmsShort)

    val axisA =
        OKLAB_AXIS_A[0] * rootLong + OKLAB_AXIS_A[1] * rootMedium + OKLAB_AXIS_A[2] * rootShort
    val axisB =
        OKLAB_AXIS_B[0] * rootLong + OKLAB_AXIS_B[1] * rootMedium + OKLAB_AXIS_B[2] * rootShort

    val chroma = sqrt(axisA * axisA + axisB * axisB)
    val effectiveChroma = if (chroma <= ACHROMATIC_CHROMA_THRESHOLD) 0.0 else chroma
    val hue =
        if (effectiveChroma == 0.0) {
            0.0
        } else {
            val deg = atan2(axisB, axisA) * (180.0 / PI)

            if (deg < 0.0) deg + 360.0 else deg
        }

    val lightness =
        OKLAB_LIGHTNESS[0] * rootLong + OKLAB_LIGHTNESS[1] * rootMedium +
            OKLAB_LIGHTNESS[2] * rootShort

    return safeOklch(
        l = lightness.toFloat32(),
        c = effectiveChroma.toFloat32(),
        h = hue.toFloat32(),
        a = a,
    )
}

/** Width of one hue sector of the HSL-to-sRGB wheel, in degrees. */
private const val HUE_SECTOR: Float = 60f

private fun hueSector(sector: Int, chroma: Float, secondary: Float): Triple<Float, Float, Float> =
    when (sector) {
        0 -> {
            Triple(chroma, secondary, 0f)
        }

        1 -> {
            Triple(secondary, chroma, 0f)
        }

        2 -> {
            Triple(0f, chroma, secondary)
        }

        3 -> {
            Triple(0f, secondary, chroma)
        }

        4 -> {
            Triple(secondary, 0f, chroma)
        }

        else -> {
            Triple(chroma, 0f, secondary)
        }
    }

private fun toLinear(channel: Double): Double =
    if (channel <= TRANSFER_KNEE) {
        channel / 12.92
    } else {
        ((channel + 0.055) / 1.055).pow(2.4)
    }

/** Largest value carried by one 8-bit channel. */
private const val BYTE_MAX: Float = 255f

/** Radix of a hexadecimal channel literal. */
private const val HEX_RADIX: Int = 16

/** Bit mask isolating one channel of a packed ARGB integer. */
private const val CHANNEL_MASK: Int = 0xFF

/** Shift placing one channel of a packed ARGB integer into the low byte. */
private const val ALPHA_SHIFT: Int = 24
private const val RED_SHIFT: Int = 16
private const val GREEN_SHIFT: Int = 8

/** sRGB transfer-function knee between the linear and the gamma segment. */
private const val TRANSFER_KNEE: Double = 0.04045

/** Linear sRGB transfer-function knee (0.04045 / 12.92). */
private const val LINEAR_TRANSFER_KNEE: Float = 0.0031308f

/** Rounding offset for channel quantization to 8-bit integer. */
private const val ROUND_OFFSET: Float = 0.5f

private val HEX_SHAPE = Regex("^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$")

/** Row-major linear-sRGB to OKLab matrix. */
private val OKLAB_MATRIX =
    doubleArrayOf(
        0.41222146, 0.53633255, 0.051445995,
        0.2119035, 0.6806995, 0.10739696,
        0.08830246, 0.28171885, 0.6299787,
    )

/** OKLab lightness row. */
private val OKLAB_LIGHTNESS = doubleArrayOf(0.21045426, 0.7936178, -0.004072047)

/** OKLab `a` row. */
private val OKLAB_AXIS_A = doubleArrayOf(1.9779985, -2.4285922, 0.4505937)

/** OKLab `b` row. */
private val OKLAB_AXIS_B = doubleArrayOf(0.025904037, 0.78277177, -0.80867577)

/** Chroma floor below which hue is degenerate and set to 0. */
private const val ACHROMATIC_CHROMA_THRESHOLD: Double = 0.0001
