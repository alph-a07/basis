package io.github.alph_a07.basis.tokens.theme.appearance

import io.github.alph_a07.basis.tokens.color.BasisColor
import io.github.alph_a07.basis.tokens.color.BasisColorRole
import io.github.alph_a07.basis.tokens.typography.BasisFontFamily
import io.github.alph_a07.basis.tokens.typography.BasisTextStyle
import io.github.alph_a07.basis.tokens.typography.BasisTypographyLevel
import io.github.alph_a07.basis.tokens.typography.BasisTypographyRole

/**
 * Explicitly assigned color values, keyed by the semantic role they apply to.
 *
 * An entry replaces the value that role resolves to; it does not redefine what the role means. The
 * role keeps its identity, so a component referencing it continues to work and simply reads a
 * different value. Only roles in [BasisColorRole] may be keyed, which is what keeps Appearance from
 * introducing a color role the design system does not define.
 *
 * @property overrides The assigned color value per role.
 */
data class BasisColorAppearance(
    val overrides: Map<BasisColorRole, BasisColor> = emptyMap(),
)

/**
 * Explicitly assigned typography values.
 *
 * [tokens] replaces a whole composite typography token: the font family, size, weight, line
 * height, letter spacing and color role move together, because they form one coherent decision and
 * overriding them individually would leave the token internally inconsistent.
 *
 * [fontFamilies] is the one place where Basis deliberately exposes a constituent rather than a whole
 * composite, because font-family assignment has its own role-scope and level-scope contract.
 *
 * @property tokens The assigned composite value per typography level.
 * @property fontFamilies The font-family assignment, at role and level scope.
 */
data class BasisTypographyAppearance(
    val tokens: Map<BasisTypographyLevel, BasisTextStyle> = emptyMap(),
    val fontFamilies: BasisFontFamilyAppearance = BasisFontFamilyAppearance(),
)

/**
 * Font families assigned across a resolved theme, at role scope and level scope.
 *
 * Basis assigns several families within one theme: a display family for structure, a reading
 * family for content, and a compact family for metadata is a typical arrangement. Consumers may
 * express that here, including families of their own.
 *
 * The two scopes have one established relationship, which [resolve] implements: a level-scoped
 * assignment refines the role-scoped assignment for that level. Assigning a family at
 * [BasisTypographyRole.Structure] and a different one at Structure level 1 gives level 1 the
 * level-specific family and leaves levels 2 to 6 with the role family.
 *
 * This specificity rule is specific to font-family assignment. It is not a general precedence
 * order for Appearance, and it does not imply how overlapping scopes resolve for any other token.
 *
 * @property byRole The family assigned to a typography role as a whole.
 * @property byLevel The family assigned to one typography level, refining [byRole].
 */
data class BasisFontFamilyAppearance(
    val byRole: Map<BasisTypographyRole, BasisFontFamily> = emptyMap(),
    val byLevel: Map<BasisTypographyLevel, BasisFontFamily> = emptyMap(),
) {
    /**
     * Returns the family explicitly assigned to one typography level, if any.
     *
     * A level-scoped assignment wins over the role-scoped assignment for that level. `null` means
     * this Appearance expresses no preference for the level, and Theme Resolution remains free to
     * decide the family from Identity, Mood, Domain and the fonts available in the environment.
     *
     * @param role The role the level belongs to.
     * @param index The level index within that role, starting at 1.
     * @return The explicitly assigned family, or `null` if none was assigned at either scope.
     */
    fun resolve(role: BasisTypographyRole, index: Int): BasisFontFamily? =
        byLevel[BasisTypographyLevel(role, index)] ?: byRole[role]
}
