package io.github.alph_a07.basis.tokens.theme.inputs.appearance

import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColor
import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColorRole
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisFontFamily
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTextStyleSpec
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyLevel
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyRole

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
 * [tokens] pins down one or more constituents of a composite typography token. Every constituent
 * the consumer leaves unspecified stays with Theme Resolution, so specifying
 * `Typography.Content.Level2 = { fontSize = 20 }` states one requirement without also dictating the
 * line height that should accompany it.
 *
 * [fontFamilies] is the one place where Basis deliberately exposes family assignment rather than the
 * family as part of a whole token, because font-family assignment has its own role-scope and
 * level-scope contract.
 *
 * @property tokens The explicitly pinned-down constituents per typography level.
 * @property fontFamilies The font-family assignment, at role and level scope.
 */
data class BasisTypographyAppearance(
    val tokens: Map<BasisTypographyLevel, BasisTextStyleSpec> = emptyMap(),
    val fontFamilies: BasisFontFamilyAppearance = BasisFontFamilyAppearance(),
)

/**
 * Font families assigned across a resolved theme, at role scope and level scope.
 *
 * Basis assigns several families within one theme: a display family for structure, a reading
 * family for content, and a compact family for metadata is a typical arrangement. Consumers may
 * express that here, including families of their own.
 *
 * The two scopes have one established relationship, which [resolve] implements:
 *
 * ```text
 * Level scope > Role scope > resolver default
 * ```
 *
 * Assigning a family at [BasisTypographyRole.Structure] and a different one at Structure level 1
 * gives level 1 the level-specific family and leaves levels 2 to 6 with the role family.
 *
 * This specificity rule is specific to font-family assignment. It is not a general precedence
 * order for Appearance, and it does not imply how overlapping scopes resolve for any other token.
 *
 * These are the only two scopes a consumer may state a family at. Family assignment is deliberately
 * not also reachable per typography token: a second, equally specific route to the same decision
 * would mean that stating two families differently has no correct resolution, so the surface avoids
 * creating that question rather than answering it with a further precedence rule.
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
     * decide the family from Mood, Domain and the fonts available in the environment.
     *
     * @param role The role the level belongs to.
     * @param index The level index within that role, starting at 1.
     * @return The explicitly assigned family, or `null` if none was assigned at either scope.
     */
    fun resolve(role: BasisTypographyRole, index: Int): BasisFontFamily? =
        byLevel[BasisTypographyLevel(role, index)] ?: byRole[role]
}
