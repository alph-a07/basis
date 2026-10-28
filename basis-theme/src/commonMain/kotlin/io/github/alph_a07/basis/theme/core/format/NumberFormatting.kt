package io.github.alph_a07.basis.theme.core.format

import kotlin.math.abs
import kotlin.math.roundToLong

/**
 * Formats a 64-bit floating-point number into a deterministic, locale-invariant string.
 *
 * Avoids platform-divergent `toString()` and locale-dependent formatting across JVM and JS.
 *
 * @param value Floating-point value to format.
 * @param maxDecimals Maximum number of fractional decimal digits to retain, >= 0.
 * @return Formatted string representation without trailing zeros in the fractional part.
 * @throws IllegalArgumentException If [maxDecimals] is negative.
 */
@Suppress("ReturnCount")
public fun formatDeterministic(value: Double, maxDecimals: Int = 4): String {
    require(maxDecimals >= 0) { "maxDecimals must be non-negative, was $maxDecimals." }

    val special = formatSpecial(value)
    if (special != null) {
        return special
    }

    val isNegative = value < 0.0 || (value == 0.0 && 1.0 / value < 0.0)
    val absValue = abs(value)

    if (maxDecimals == 0) {
        val rounded = absValue.roundToLong()

        return if (isNegative && rounded != 0L) "-$rounded" else "$rounded"
    }

    return formatFractional(
        absValue = absValue,
        isNegative = isNegative,
        maxDecimals = maxDecimals,
    )
}

/**
 * Formats a 32-bit floating-point number into a deterministic, locale-invariant string.
 *
 * @param value Floating-point value to format.
 * @param maxDecimals Maximum number of fractional decimal digits to retain, >= 0.
 * @return Formatted string representation without trailing zeros in the fractional part.
 * @throws IllegalArgumentException If [maxDecimals] is negative.
 */
public fun formatDeterministic(value: Float, maxDecimals: Int = 4): String =
    formatDeterministic(value.toDouble(), maxDecimals)

private fun formatSpecial(value: Double): String? = when {
    value.isNaN() -> "NaN"
    value == Double.POSITIVE_INFINITY -> "Infinity"
    value == Double.NEGATIVE_INFINITY -> "-Infinity"
    else -> null
}

@Suppress("ReturnCount")
private fun formatFractional(
    absValue: Double,
    isNegative: Boolean,
    maxDecimals: Int,
): String {
    var factor = 1L
    repeat(maxDecimals) { factor *= DECIMAL_BASE }

    if (absValue >= (Long.MAX_VALUE / factor).toDouble()) {
        val longVal = absValue.toLong()

        return if (isNegative && longVal != 0L) "-$longVal" else "$longVal"
    }

    val rawScaled = absValue * factor
    val scaled = rawScaled.roundToLong()

    val integerPart = scaled / factor
    val fractionPart = scaled % factor

    if (fractionPart == 0L) {
        val sign = if (isNegative && integerPart != 0L) "-" else ""

        return "$sign$integerPart"
    }

    val fractionStr = fractionPart.toString()
    val paddedFraction = "0".repeat(maxDecimals - fractionStr.length) + fractionStr
    val trimmedFraction = paddedFraction.trimEnd('0')
    val sign = if (isNegative && (integerPart != 0L || trimmedFraction.isNotEmpty())) "-" else ""

    return "$sign$integerPart.$trimmedFraction"
}

private const val DECIMAL_BASE: Long = 10L
