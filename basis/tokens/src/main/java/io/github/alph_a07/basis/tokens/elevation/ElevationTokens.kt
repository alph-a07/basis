package io.github.alph_a07.basis.tokens.elevation

/**
 * The elevation scale.
 *
 * Each level carries both a light-mode shadow depth (`dp`) and a dark-mode tonal-surface
 * shift (`darkTonalPercent`). Per the dark-mode rule, shadow alpha fades toward 0 as the theme goes
 * dark and the tonal percentage carries the visual weight instead, because a black shadow on a dark
 * surface is invisible.
 *
 * Component mapping:
 * - [Level0] — flat on the parent surface
 * - [Level1] — resting cards, raised list rows
 * - [Level2] — elevated buttons, interactive cards, FABs
 * - [Level3] — sticky nav bars, top app bars, floating search bars
 * - [Level4] — dropdown menus, popovers, context menus, tooltips
 * - [Level5] — modal dialogs, full overlays, modal bottom sheets
 */
enum class BasisElevation(val dp: Int, val darkTonalPercent: Int) {
    /** Base elevation (0dp) with zero shadow or tonal shift, resting flat on the parent surface. */
    Level0(dp = 0, darkTonalPercent = 0),

    /** Low elevation (1dp) with subtle shadow for resting cards, raised list rows, and subtle surfaces. */
    Level1(dp = 1, darkTonalPercent = 5),

    /** Moderate elevation (3dp) for elevated buttons, interactive cards, and floating action buttons. */
    Level2(dp = 3, darkTonalPercent = 8),

    /** Medium elevation (6dp) for sticky navigation bars, top app bars, and floating search bars. */
    Level3(dp = 6, darkTonalPercent = 11),

    /** High elevation (8dp) for dropdown menus, popovers, context menus, and floating tooltips. */
    Level4(dp = 8, darkTonalPercent = 12),

    /** Maximum elevation (12dp) for modal dialogs, full overlays, and modal bottom sheets. */
    Level5(dp = 12, darkTonalPercent = 14),
}

/**
 * The shadow alpha (0f...1f) to render for this level.
 *
 * In light mode this is a fixed per-level value, rising with depth. In dark mode it is always 0f,
 * since the dark-mode rule puts all the visual weight on [BasisElevation.darkTonalPercent] instead of
 * a shadow.
 *
 * @param isDarkTheme Whether the current theme is dark.
 * @return The shadow alpha to render, where 0f means no shadow at all.
 */
fun BasisElevation.shadowAlpha(isDarkTheme: Boolean): Float {
    if (isDarkTheme) return 0f

    return when (this) {
        BasisElevation.Level0 -> 0f
        BasisElevation.Level1 -> 0.08f
        BasisElevation.Level2 -> 0.12f
        BasisElevation.Level3 -> 0.16f
        BasisElevation.Level4 -> 0.20f
        BasisElevation.Level5 -> 0.24f
    }
}

/**
 * Applies the pressed-state convention: drops this level by one step to signal physical depression.
 *
 * [BasisElevation.Level0] is the floor, so pressing an already-flat surface leaves it flat rather
 * than underflowing.
 *
 * @return The elevation to render while pressed.
 */
fun BasisElevation.pressed(): BasisElevation {
    val previousOrdinal = (ordinal - 1).coerceAtLeast(BasisElevation.Level0.ordinal)
    return BasisElevation.entries[previousOrdinal]
}
