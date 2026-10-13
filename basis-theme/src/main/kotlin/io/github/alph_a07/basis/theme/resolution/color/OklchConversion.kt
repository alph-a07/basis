package io.github.alph_a07.basis.theme.resolution.color

import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.core.color.Oklch
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
    l = l.coerceIn(0f, 1f),
    c = c.coerceAtLeast(0f),
    h = h.wrapHue(),
    a = a.coerceIn(0f, 1f),
)

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

private fun argbToOklch(argb: Int): Oklch = srgbToOklch(
    r = channel(argb, RED_SHIFT),
    g = channel(argb, GREEN_SHIFT),
    b = channel(argb, 0),
    a = channel(argb, ALPHA_SHIFT),
)

private fun hslToOklch(h: Float, s: Float, l: Float, a: Float): Oklch {
    val chroma = (1f - kotlin.math.abs(2f * l - 1f)) * s
    val huePrime = h.wrapHue() / HUE_SECTOR
    val secondary = chroma * (1f - kotlin.math.abs(huePrime % 2f - 1f))

    val (red, green, blue) = hueSector(huePrime.toInt(), chroma, secondary)
    val lightness = l - chroma / 2f

    return srgbToOklch(red + lightness, green + lightness, blue + lightness, a)
}

private fun srgbToOklch(r: Float, g: Float, b: Float, a: Float): Oklch {
    val linearR = toLinear(r)
    val linearG = toLinear(g)
    val linearB = toLinear(b)

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

    return safeOklch(
        l =
            OKLAB_LIGHTNESS[0] * rootLong + OKLAB_LIGHTNESS[1] * rootMedium +
                OKLAB_LIGHTNESS[2] * rootShort,
        c = sqrt(axisA * axisA + axisB * axisB),
        h = atan2(axisB, axisA) * DEGREES_PER_RADIAN,
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

private fun channel(argb: Int, shift: Int): Float = (argb ushr shift and CHANNEL_MASK) / BYTE_MAX

private fun toLinear(channel: Float): Float =
    if (channel <= TRANSFER_KNEE) {
        channel / 12.92f
    } else {
        ((channel + 0.055f) / 1.055f).pow(2.4f)
    }

/** Degrees per radian, for converting an OKLab angle into an OKLCH hue. */
private const val DEGREES_PER_RADIAN: Float = 57.29578f

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
private const val TRANSFER_KNEE: Float = 0.04045f

private val HEX_SHAPE = Regex("^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$")

/** Row-major linear-sRGB to OKLab matrix. */
private val OKLAB_MATRIX =
    floatArrayOf(
        0.41222146f, 0.53633255f, 0.051445995f,
        0.2119035f, 0.6806995f, 0.10739696f,
        0.08830246f, 0.28171885f, 0.6299787f,
    )

/** OKLab lightness row. */
private val OKLAB_LIGHTNESS = floatArrayOf(0.21045426f, 0.7936178f, -0.004072047f)

/** OKLab `a` row. */
private val OKLAB_AXIS_A = floatArrayOf(1.9779985f, -2.4285922f, 0.4505937f)

/** OKLab `b` row. */
private val OKLAB_AXIS_B = floatArrayOf(0.025904037f, 0.78277177f, -0.80867577f)
