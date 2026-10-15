package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId

/**
 * Vendored catalog metadata and derived design affinities for a Google Fonts family.
 *
 * @property id Canonical identifier matching [GoogleFontId.value].
 * @property familyName Human-readable family name as published on Google Fonts.
 * @property googleFontsKey Query parameter key used when requesting web font files.
 * @property category Primary typographic category classification.
 * @property axes Variation axes supported by this family, or an empty set for static fonts.
 * @property displayAffinity Suitability score for headline and structural display typography in `[0.0, 1.0]`.
 * @property textAffinity Suitability score for high-legibility body and long-form content in `[0.0, 1.0]`.
 * @property metaAffinity Suitability score for captions, data tables, and metadata treatments in `[0.0, 1.0]`.
 * @property expressiveness Personality and stylistic intensity rating in `[0.0, 1.0]`.
 * @property roundness Geometric roundness vs sharpness of letterform contours in `[0.0, 1.0]`.
 * @property serif Whether letterforms feature serifs or slab brackets.
 * @property mono Whether letterforms have fixed horizontal advance width.
 * @property weightsCount Number of distinct weight steps supported by this family, >= 1.
 * @throws IllegalArgumentException If [familyName] or [googleFontsKey] is blank, or if an affinity is outside `[0, 1]`.
 */
public data class FontCatalogEntry(
    public val id: GoogleFontId,
    public val familyName: String,
    public val googleFontsKey: String,
    public val category: GoogleFontsCategory,
    public val axes: Set<FontAxis>,
    public val displayAffinity: Float,
    public val textAffinity: Float,
    public val metaAffinity: Float,
    public val expressiveness: Float,
    public val roundness: Float,
    public val serif: Boolean,
    public val mono: Boolean,
    public val weightsCount: Int = 1,
) {
    init {
        require(familyName.isNotBlank()) { "FontCatalogEntry familyName must not be blank." }
        require(googleFontsKey.isNotBlank()) { "FontCatalogEntry googleFontsKey must not be blank." }
        require(displayAffinity in 0.0f..1.0f) {
            "displayAffinity must be between 0.0 and 1.0, was $displayAffinity."
        }
        require(textAffinity in 0.0f..1.0f) {
            "textAffinity must be between 0.0 and 1.0, was $textAffinity."
        }
        require(metaAffinity in 0.0f..1.0f) {
            "metaAffinity must be between 0.0 and 1.0, was $metaAffinity."
        }
        require(expressiveness in 0.0f..1.0f) {
            "expressiveness must be between 0.0 and 1.0, was $expressiveness."
        }
        require(roundness in 0.0f..1.0f) {
            "roundness must be between 0.0 and 1.0, was $roundness."
        }
        require(weightsCount >= 1) {
            "weightsCount must be >= 1, was $weightsCount."
        }
    }
}

/**
 * Variation axis metadata supported by a font family.
 *
 * @property tag Four-character axis tag identifier such as `"wght"` or `"opsz"`.
 * @property min Minimum permitted value for this axis.
 * @property max Maximum permitted value for this axis.
 * @property defaultValue Default design value for this axis.
 * @throws IllegalArgumentException If [tag] is blank or [min] exceeds [max].
 */
public data class FontAxis(
    public val tag: String,
    public val min: Float,
    public val max: Float,
    public val defaultValue: Float,
) {
    init {
        require(tag.isNotBlank()) { "FontAxis tag must not be blank." }
        require(min <= max) { "FontAxis min ($min) must be <= max ($max)." }
    }
}

/** Broad typographic classification defined by Google Fonts metadata. */
public enum class GoogleFontsCategory {
    /** Sans-serif typeface characterized by the absence of stroke terminals. */
    SansSerif,

    /** Serif typeface with finishing strokes or decorative projections on letterforms. */
    Serif,

    /** Expressive typeface optimized for larger headline or structural treatments. */
    Display,

    /** Script or cursive typeface mimicking handwritten letterforms. */
    Handwriting,

    /** Monospaced typeface where each glyph shares identical horizontal advance. */
    Monospace,
}
