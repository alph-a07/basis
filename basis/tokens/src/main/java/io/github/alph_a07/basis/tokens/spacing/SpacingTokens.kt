package io.github.alph_a07.basis.tokens.spacing

import kotlin.math.roundToInt

/** The spacing scale, in dp. */
object BasisSpacingTokens {
    const val SPACE_2 = 2
    const val SPACE_4 = 4
    const val SPACE_8 = 8
    const val SPACE_12 = 12
    const val SPACE_16 = 16
    const val SPACE_24 = 24
    const val SPACE_32 = 32
    const val SPACE_48 = 48
    const val SPACE_64 = 64
}

/**
 * Scales a spacing value by a factor, bounded between 0.85 and 1.3.
 *
 * @param space The base spacing value in dp.
 * @param factor The scaling factor, typically derived from user settings such as font size or display zoom.
 * @return The scaled spacing value in dp, rounded to the nearest integer.
 */
fun spacingScale(space: Int, factor: Float): Int {
    val bounded = factor.coerceIn(0.85f, 1.3f)
    return (space * bounded).roundToInt()
}