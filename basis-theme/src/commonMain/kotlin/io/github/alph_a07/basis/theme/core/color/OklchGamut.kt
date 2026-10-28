@file:Suppress("MagicNumber")

package io.github.alph_a07.basis.theme.core.color

import io.github.alph_a07.basis.theme.core.format.toFloat32
import kotlin.math.PI
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.pow
import kotlin.math.sin

/**
 * Blends two OKLCH colors along the shortest hue arc.
 *
 * @return The color at [amount] along the arc from [from] to [to], with lightness,
 * chroma, and alpha linearly interpolated.
 */
internal fun mixOklch(from: Oklch, to: Oklch, amount: Float): Oklch {
    val t = amount.coerceIn(0f, 1f).toDouble()

    return safeOklch(
        l = (from.l.toDouble() + (to.l.toDouble() - from.l.toDouble()) * t).toFloat32(),
        c = (from.c.toDouble() + (to.c.toDouble() - from.c.toDouble()) * t).toFloat32(),
        h = from.h.hueTowards(to.h, amount.coerceIn(0f, 1f)),
        a = (from.a.toDouble() + (to.a.toDouble() - from.a.toDouble()) * t).toFloat32(),
    )
}

/**
 * Maps this color into the sRGB gamut by reducing chroma only.
 *
 * Hue and lightness are preserved so a brand anchor keeps its identity when its requested chroma
 * is not displayable.
 */
internal fun Oklch.gamutMapped(): Oklch {
    if (isInGamut()) {
        return this
    }

    var lower = 0.0
    var upper = c.toDouble()

    repeat(GAMUT_STEPS) {
        val middle = (lower + upper) / 2.0
        val candidate = copy(c = middle.toFloat32())

        if (candidate.isInGamut()) {
            lower = middle
        } else {
            upper = middle
        }
    }

    return copy(c = lower.toFloat32())
}

/** Whether every linear-sRGB channel of this color sits inside the unit range. */
internal fun Oklch.isInGamut(): Boolean {
    val linear = toLinearSrgb()
    val low = -GAMUT_EPSILON
    val high = 1f + GAMUT_EPSILON

    return linear.r in low..high && linear.g in low..high && linear.b in low..high
}

/** Converts this color to a linear-sRGB triplet. */
internal fun Oklch.toLinearSrgb(): LinearSrgb {
    val hue = h.toDouble() * (PI / 180.0)
    val axisA = c.toDouble() * cos(hue)
    val axisB = c.toDouble() * sin(hue)
    val lD = l.toDouble()

    val rootLong = lD + 0.39633778 * axisA + 0.21580376 * axisB
    val rootMedium = lD - 0.105561346 * axisA - 0.06385417 * axisB
    val rootShort = lD - 0.08948418 * axisA - 1.2914855 * axisB

    val lmsLong = rootLong.pow(3)
    val lmsMedium = rootMedium.pow(3)
    val lmsShort = rootShort.pow(3)

    return LinearSrgb(
        r = (4.0767417 * lmsLong - 3.3077116 * lmsMedium + 0.23096994 * lmsShort).toFloat32(),
        g = (-1.268438 * lmsLong + 2.6097574 * lmsMedium - 0.34131938 * lmsShort).toFloat32(),
        b = (-0.0041960864 * lmsLong - 0.7034186 * lmsMedium + 1.7076147 * lmsShort).toFloat32(),
    )
}

/** WCAG relative luminance of this color, in `0..1`. */
internal fun Oklch.relativeLuminance(): Float {
    val linear = toLinearSrgb()

    return (
        LUMINANCE_WEIGHTS[0] * linear.r +
            LUMINANCE_WEIGHTS[1] * linear.g +
            LUMINANCE_WEIGHTS[2] * linear.b
        )
        .coerceIn(0f, 1f)
}

/**
 * WCAG contrast ratio between this [first] and [second] colors, in `1..21`.
 *
 * The order of the arguments does not matter.
 */
internal fun contrastRatio(first: Oklch, second: Oklch): Float {
    val firstLuminance = first.relativeLuminance()
    val secondLuminance = second.relativeLuminance()
    val lighter = maxOf(firstLuminance, secondLuminance)
    val darker = minOf(firstLuminance, secondLuminance)

    return (lighter + LUMINANCE_OFFSET) / (darker + LUMINANCE_OFFSET)
}

/** Wraps a hue into `[0, 360)`. */
internal fun Float.wrapHue(): Float {
    val wrapped = this.toDouble() % 360.0

    return ((if (wrapped < 0.0) wrapped + 360.0 else wrapped).toFloat32()) % 360f
}

/**
 * Interpolates this hue toward [target] along the shortest arc.
 *
 * @param amount Fraction of the arc to travel, coerced into `0..1`.
 */
internal fun Float.hueTowards(target: Float, amount: Float): Float {
    val thisD = this.toDouble()
    val targetD = target.toDouble()
    val t = amount.coerceIn(0f, 1f).toDouble()

    val delta = ((targetD - thisD + 180.0 + 360.0) % 360.0) - 180.0
    val wrapped = (thisD % 360.0 + 360.0) % 360.0
    val result = (wrapped + delta * t) % 360.0
    val normalized = if (result < 0.0) result + 360.0 else result

    return normalized.toFloat32() % 360f
}

/** Shifts this hue by a signed number of degrees, wrapping into `[0, 360)`. */
internal fun Float.shiftHue(degrees: Float): Float {
    val shifted = (this.toDouble() + degrees.toDouble()) % 360.0
    val normalized = if (shifted < 0.0) shifted + 360.0 else shifted

    return normalized.toFloat32() % 360f
}

/** Whether the absolute difference between this value and [other] is within [tolerance]. */
internal fun Float.isNear(other: Float, tolerance: Float = 1e-4f): Boolean =
    abs(this - other) <= tolerance

/** Tolerance applied when deciding whether a linear channel is inside the unit range. */
private const val GAMUT_EPSILON: Float = 1e-4f

/** Binary-search refinement count used when mapping a color back into the sRGB gamut. */
private const val GAMUT_STEPS: Int = 20

/** WCAG relative-luminance weights of the linear-sRGB channels. */
private val LUMINANCE_WEIGHTS = floatArrayOf(0.2126f, 0.7152f, 0.0722f)

/** WCAG luminance offset that lifts black off zero. */
private const val LUMINANCE_OFFSET: Float = 0.05f
