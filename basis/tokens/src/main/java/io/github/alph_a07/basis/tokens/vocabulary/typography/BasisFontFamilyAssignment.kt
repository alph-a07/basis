package io.github.alph_a07.basis.tokens.vocabulary.typography

/**
 * The font families a resolved theme assigns to its typography tokens.
 *
 * One theme may use several families at once: a reading family for content and a more expressive
 * one for structure, for example. Assignment is expressed at two scopes — an entire
 * [BasisTypographyRole], or a single [BasisTypographyLevel] within one — and the more specific
 * scope refines the broader one:
 *
 * ``` text
 * Level scope > Role scope > resolver default
 * ```
 *
 * Assigning [BasisTypographyRole.Structure] to one family while assigning structure level 1 to
 * another therefore leaves level 1 on its own family and every other structure level on the
 * role's.
 *
 * This specificity rule governs font-family assignment only. It is not a general precedence
 * hierarchy for other theming properties.
 *
 * A token that neither scope covers yields `null` from [familyFor], meaning no assignment was
 * expressed and the resolver supplies its default.
 *
 * @property byRole Families assigned to a whole role.
 * @property byLevel Families assigned to one level, refining any assignment for that level's role.
 */
data class BasisFontFamilyAssignment(
    val byRole: Map<BasisTypographyRole, BasisFontFamily> = emptyMap(),
    val byLevel: Map<BasisTypographyLevel, BasisFontFamily> = emptyMap(),
) {
    init {
        val unknown = byLevel.keys.filterNot { it.exists }
        require(unknown.isEmpty()) {
            "Font-family assignment names levels that do not exist: $unknown."
        }
    }

    /**
     * Returns the family assigned to [level], or `null` when neither scope covers it.
     *
     * @param level The typography token to look up.
     * @return The assigned family, or `null` to defer to the resolver's default.
     */
    fun familyFor(level: BasisTypographyLevel): BasisFontFamily? =
        byLevel[level] ?: byRole[level.role]

    /**
     * Returns the family assigned to every level of [role].
     *
     * @param role The role to look up.
     * @return Each level of that role and the family it resolves to, or `null` where no scope
     *   covers the level.
     */
    fun familiesFor(role: BasisTypographyRole): Map<BasisTypographyLevel, BasisFontFamily?> {
        val levelCount = when (role) {
            BasisTypographyRole.Structure -> STRUCTURE_LEVEL_COUNT
            BasisTypographyRole.Content -> CONTENT_LEVEL_COUNT
            BasisTypographyRole.Metadata -> METADATA_LEVEL_COUNT
        }
        return (1..levelCount)
            .map { BasisTypographyLevel(role, it) }
            .associateWith { familyFor(it) }
    }
}
