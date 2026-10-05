package io.github.alph_a07.basis.tokens.vocabulary.typography

import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColorRole

/**
 * Pins down selected constituents of a typography token.
 *
 * A `null` constituent expresses no preference for it, leaving that constituent to resolution. A
 * supplied constituent is an explicit requirement: resolution keeps it unless a mandatory
 * constraint makes it unsatisfiable, in which case resolution fails rather than substituting a
 * value the consumer did not ask for.
 *
 * Does not carry a font family. Use [BasisFontFamilyAppearance], whose scopes are whole role and
 * single level.
 *
 * @property fontSizeSp The text size in scale-independent pixels, or `null` to leave it to the
 *   resolver's scale for this level.
 * @property lineHeightSp The line height in scale-independent pixels, or `null` to leave the
 *   resolver free to pair it with the resolved font size.
 * @property fontWeight The font weight, from
 *   [io.github.alph_a07.basis.tokens.vocabulary.typography.BasisFontWeightTokens], or `null` to leave it to the
 *   resolver's weight for this role and level.
 * @property letterSpacingSp The letter spacing in scale-independent pixels, or `null` to leave it
 *   to the resolver.
 * @property colorRole The color role this token is drawn in, or `null` to leave it to the resolver's
 *   role convention.
 */
data class BasisTextStyleSpec(
    val fontSizeSp: Float? = null,
    val lineHeightSp: Float? = null,
    val fontWeight: Int? = null,
    val letterSpacingSp: Float? = null,
    val colorRole: BasisColorRole? = null,
)
