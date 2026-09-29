package io.github.alph_a07.basis.tokens.spacing

import kotlin.math.roundToInt

/**
 * The spacing scale, in dp.
 *
 * Pairing convention: closely related items (an icon and its label, a chip and its badge) sit at
 * [SPACE_2] to [SPACE_8], while distinct groups are separated by [SPACE_16] or more.
 */
object BasisSpacingTokens {
    /** Micro spatial step (2dp) for tight element pairings, icon-text spacing, and compact badges. */
    const val SPACE_2 = 2

    /** Extra-compact spatial step (4dp) for inline tag padding, nested chips, and tight form gutters. */
    const val SPACE_4 = 4

    /** Compact spatial step (8dp) for icon button padding, related element gaps, and list item spacing. */
    const val SPACE_8 = 8

    /** Moderate spatial step (12dp) for button padding, card interior spacing, and grouped form items. */
    const val SPACE_12 = 12

    /** Base spatial step (16dp) for standard screen margins, card padding, and container separation. */
    const val SPACE_16 = 16

    /** Generous spatial step (24dp) for major section spacing, header gaps, and card group separation. */
    const val SPACE_24 = 24

    /** Large spatial step (32dp) for layout gutters and prominent content section breaks. */
    const val SPACE_32 = 32

    /** Extra-large spatial step (48dp) for major screen section transitions and expansive view padding. */
    const val SPACE_48 = 48

    /** Maximum spatial step (64dp) for hero header separation and empty-state layout margins. */
    const val SPACE_64 = 64
}

/**
 * Responsive spatial utility that scales a layout interval based on a user-driven factor.
 *
 * The factor is bounded so that a single call can never collapse related elements together or blow
 * apart a layout, no matter what the platform reports.
 *
 * @param space The base spacing value in dp.
 * @param factor The scaling factor, typically derived from user settings such as font size or display zoom.
 * @return The scaled spacing value in dp, rounded to the nearest integer.
 */
fun spacingScale(space: Int, factor: Float): Int {
    val bounded = factor.coerceIn(0.85f, 1.3f)
    return (space * bounded).roundToInt()
}
