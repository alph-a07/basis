package io.github.alph_a07.basis.theme.resolution.color

import io.github.alph_a07.basis.theme.core.color.Oklch
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.pow
import kotlin.math.sin

/** Linear-sRGB triplet of an OKLCH color. */
internal data class LinearSrgb(
    val r: Float,
    val g: Float,
    val b: Float,
)

/**
 * Blends two OKLCH colors along the shortest hue arc.
 * @return The color at [amount] along the arc from [from] to [to], with lightness, chroma, and alpha linearly interpolated.
 */
internal fun mixOklch(from: Oklch, to: Oklch, amount: Float): Oklch {
    val t = amount.coerceIn(0f, 1f)

    return safeOklch(
        l = from.l + (to.l - from.l) * t,
        c = from.c + (to.c - from.c) * t,
        h = from.h.hueTowards(to.h, t),
        a = from.a + (to.a - from.a) * t,
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

    var lower = 0f
    var upper = c

    repeat(GAMUT_STEPS) {
        val middle = (lower + upper) / 2f
        val candidate = copy(c = middle)
        if (candidate.isInGamut()) {
            lower = middle
        } else {
            upper = middle
        }
    }

    return copy(c = lower)
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
    val hue = h * (Math.PI.toFloat() / HUE_HALF)
    val axisA = c * cos(hue)
    val axisB = c * sin(hue)

    val rootLong = l + 0.39633778f * axisA + 0.21580376f * axisB
    val rootMedium = l - 0.105561346f * axisA - 0.06385417f * axisB
    val rootShort = l - 0.08948418f * axisA - 1.2914855f * axisB

    val lmsLong = rootLong.pow(3)
    val lmsMedium = rootMedium.pow(3)
    val lmsShort = rootShort.pow(3)

    return LinearSrgb(
        r = 4.0767417f * lmsLong - 3.3077116f * lmsMedium + 0.23096994f * lmsShort,
        g = -1.268438f * lmsLong + 2.6097574f * lmsMedium - 0.34131938f * lmsShort,
        b = -0.0041960864f * lmsLong - 0.7034186f * lmsMedium + 1.7076147f * lmsShort,
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
    val wrapped = this % HUE_FULL
    return if (wrapped < 0f) wrapped + HUE_FULL else wrapped
}

/**
 * Interpolates this hue toward [target] along the shortest arc.
 *
 * @param amount Fraction of the arc to travel, coerced into `0..1`.
 */
internal fun Float.hueTowards(target: Float, amount: Float): Float {
    val delta = ((target - this + HUE_HALF + HUE_FULL) % HUE_FULL) - HUE_HALF
    return wrapHue() + delta * amount.coerceIn(0f, 1f)
}

/** Shifts this hue by a signed number of degrees, wrapping into `[0, 360)`. */
internal fun Float.shiftHue(degrees: Float): Float = (this + degrees).wrapHue()

/** Whether the absolute difference between this value and [other] is within [tolerance]. */
internal fun Float.isNear(other: Float, tolerance: Float = 1e-4f): Boolean =
    abs(this - other) <= tolerance

/** Full hue circle in degrees. */
private const val HUE_FULL: Float = 360f

/** Half of the hue circle in degrees. */
private const val HUE_HALF: Float = 180f

/** Tolerance applied when deciding whether a linear channel is inside the unit range. */
private const val GAMUT_EPSILON: Float = 1e-4f

/** Binary-search refinement count used when mapping a color back into the sRGB gamut. */
private const val GAMUT_STEPS: Int = 20

/** WCAG relative-luminance weights of the linear-sRGB channels. */
private val LUMINANCE_WEIGHTS = floatArrayOf(0.2126f, 0.7152f, 0.0722f)

/** WCAG luminance offset that lifts black off zero. */
private const val LUMINANCE_OFFSET: Float = 0.05f
