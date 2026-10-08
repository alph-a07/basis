package io.github.alph_a07.basis.theme.color

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme

/**
 * On-demand categorical (chart series) color strategy.
 *
 * The static token tree never carries chart series; consumers request them per theme.
 */
public enum class CategoricalStrategy {
    /** Evenly spaced hues around the wheel at theme-appropriate chroma and lightness. */
    EvenHue,

    /** Series walking from the brand primary hue. */
    BrandAnchored,

    /** Pairwise-distinct series prioritizing contrast on `surface.default`. */
    AccessibleQualitative,
}

/**
 * One categorical series entry with its variants.
 *
 * @property main Primary series color.
 * @property soft Lower-chroma, higher-lightness variant of [main].
 * @property muted Lower-alpha or lower-chroma variant of [main].
 * @property onMain Content color meeting contrast on [main].
 */
public data class CategoricalSwatch(
    public val main: Oklch,
    public val soft: Oklch,
    public val muted: Oklch,
    public val onMain: Oklch,
)

/**
 * Derives an on-demand categorical chart series for this theme.
 *
 * ```kotlin
 * val series = theme.categorical(4)
 * ```
 *
 * @param count Number of swatches, must be `>= 1`.
 * @param strategy Selection strategy; recorded by callers for future derivation parity.
 * @return Exactly [count] swatches.
 */
@Suppress("MagicNumber")
public fun ResolvedTheme.categorical(
    count: Int,
    strategy: CategoricalStrategy = CategoricalStrategy.AccessibleQualitative,
): List<CategoricalSwatch> {
    require(count >= 1) { "categorical count must be >= 1, was $count." }

    val baseHue = color.brand.primary.h
    val baseIsDark = mode == ThemeMode.Dark
    return List(count) { index ->
        val hue = when (strategy) {
            CategoricalStrategy.EvenHue -> (index * (360f / count)) % 360f
            CategoricalStrategy.BrandAnchored -> (baseHue + index * (360f / count)) % 360f
            CategoricalStrategy.AccessibleQualitative -> (baseHue + 40f + index * (360f / count)) % 360f
        }
        val main = Oklch(
            l = if (baseIsDark) 0.68f else 0.62f,
            c = 0.14f,
            h = hue,
        )
        CategoricalSwatch(
            main = main,
            soft = main.copy(l = (main.l + 0.18f).coerceAtMost(0.95f), c = main.c * 0.55f),
            muted = main.copy(c = main.c * 0.45f),
            onMain = Oklch(l = if (baseIsDark) 0.16f else 0.96f, c = 0.01f, h = hue),
        )
    }
}
