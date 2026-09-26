package io.github.alph_a07.basis.tokens.elevation

/**
 * The elevation scale.
 *
 * Each level carries both a light-mode shadow depth (`dp`) and a dark-mode tonal-surface
 * shift (`darkTonalPercent`) — per the locked dark-mode rule, shadow alpha fades toward 0
 * as the theme goes dark, and the tonal percentage carries the visual weight instead.
 *
 * Recommended component mapping:
 * - [Level1] — resting cards, raised list rows
 * - [Level2] — elevated/raised buttons, FABs
 * - [Level3] — sticky nav bars, top app bars, floating search bars
 * - [Level4] — dropdown menus, popovers, context menus, tooltips
 * - [Level5] — modal dialogs, full overlays, modal bottom sheets
 */
enum class BasisElevation(val dp: Int, val darkTonalPercent: Int) {
    Level0(dp = 0, darkTonalPercent = 0),
    Level1(dp = 1, darkTonalPercent = 5),
    Level2(dp = 3, darkTonalPercent = 8),
    Level3(dp = 6, darkTonalPercent = 11),
    Level4(dp = 8, darkTonalPercent = 12),
    Level5(dp = 12, darkTonalPercent = 14),
}

/**
 * The shadow alpha (0f...1f) to render for this level. Fixed per-level values in light mode.
 * In dark mode this is always 0f, since the dark-mode rule puts all the visual weight on [BasisElevation.darkTonalPercent] instead of a shadow.
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

/** The pressed-state convention: reduce elevation by one level on press, floored at [BasisElevation.Level0]. */
fun BasisElevation.pressed(): BasisElevation {
    val previousOrdinal = (ordinal - 1).coerceAtLeast(BasisElevation.Level0.ordinal)
    return BasisElevation.entries[previousOrdinal]
}