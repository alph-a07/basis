package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.color.BasisCategoricalTuning
import io.github.alph_a07.basis.tokens.color.BasisColor
import io.github.alph_a07.basis.tokens.shape.BasisRoundness
import io.github.alph_a07.basis.tokens.typography.BasisFontFamily
import io.github.alph_a07.basis.tokens.typography.BasisFontFamilyTokens
import io.github.alph_a07.basis.tokens.typography.BasisFontWeightTokens

/** The "vibe" of a theme: how many seed hues are expected and how much they bleed into neutral tokens. */
enum class BasisVibe {
    /**
     * Near-neutral. `seedHues` still feeds `interactive`/`selected`/`focusRing`, but
     * surfaces/content/border stay effectively gray.
     */
    Monochrome,

    /** A light touch of brand hue bleeds into neutrals alongside the two anchor seed hues. */
    TwoTone,

    /** More brand presence across neutrals, anchored by three seed hues. */
    ThreeTone,

    /** Maximum brand presence; `seedHues` can be any length the brand needs. */
    FullSpectrum,
}

/** Per-slot font overrides, matching the two non-mono slots in [BasisFontFamilyTokens]. */
data class BasisFontFamilyOverrides(
    val default: BasisFontFamily? = null,
    val display: BasisFontFamily? = null,
    val displayWeightThreshold: Int = BasisFontWeightTokens.WEIGHT_SEMIBOLD,
)

/**
 * The configuration for a Basis theme, including vibe, seed hues, font families, roundness, and tuning parameters.
 * @param vibe How many seed hues are expected and how much they bleed into neutral tokens.
 * @param seedHues Brand anchor hues, first-to-last significance. Length is open — pick however
 *   many the brand actually has; [vibe] governs how they're used, not how many are allowed.
 * @param fontFamilies Per-slot overrides for [BasisFontFamilyTokens].
 *   Defaults to both slots unset, i.e. library defaults for both.
 * @param roundness Proportional scale applied across the whole radius token set.
 * @param derivationTuning Every numeric knob [deriveColorSchemes] uses beyond [vibe]/[seedHues]
 *   themselves — defaults reproduce the library's stock look. Only worth touching if the stock
 *   look needs retuning, not for ordinary theming.
 * @param categoricalTuning Every numeric knob [categoricalPalette]/[softVariant] use beyond
 *   `seedHues` itself — kept as a
 *   separate object from [derivationTuning] since categorical/chart colors are an independent
 *   concern from the UI scheme, not because they're any less part of "the theme."
 */
data class BasisThemeConfig(
    val vibe: BasisVibe,
    val seedHues: List<BasisColor>,
    val fontFamilies: BasisFontFamilyOverrides = BasisFontFamilyOverrides(),
    val roundness: BasisRoundness = BasisRoundness.Round,
    val derivationTuning: BasisSchemeDerivationTuning = BasisSchemeDerivationTuning(),
    val categoricalTuning: BasisCategoricalTuning = BasisCategoricalTuning(),
) {
    init {
        require(seedHues.isNotEmpty()) { "BasisThemeConfig requires at least one seed hue." }

        val minExpected = when (vibe) {
            BasisVibe.Monochrome -> 1
            BasisVibe.TwoTone -> 2
            BasisVibe.ThreeTone -> 3
            BasisVibe.FullSpectrum -> 1
        }

        require(seedHues.size >= minExpected) {
            "BasisVibe.$vibe expects at least $minExpected seed hue(s), got ${seedHues.size}."
        }
    }
}
