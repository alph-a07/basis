package io.github.alph_a07.basis.tokens.typography

/**
 * The typography role a token belongs to.
 *
 * Typography is organized by the role text plays in a layout rather than by how large it is. The
 * three roles are the whole vocabulary: structure establishes hierarchy, content carries reading,
 * and metadata carries supporting detail.
 */
enum class BasisTypographyRole {
    /** Establishes hierarchy. Six levels, from the most prominent heading to the least. */
    Structure,

    /** Carries reading text. Five levels, from long-form prose to compact annotations. */
    Content,

    /** Carries supporting detail. Three levels, from small captions to fine print. */
    Metadata,
}

/**
 * The number of levels in the [BasisTypographyRole.Structure] role.
 *
 * A level index is ordinal within its own role and carries no cross-role meaning, so
 * [BasisTypographyRole.Structure] level 1 and [BasisTypographyRole.Content] level 1 are unrelated
 * decisions that happen to share an index.
 */
const val STRUCTURE_LEVEL_COUNT = 6

/** The number of levels in the [BasisTypographyRole.Content] role. */
const val CONTENT_LEVEL_COUNT = 5

/** The number of levels in the [BasisTypographyRole.Metadata] role. */
const val METADATA_LEVEL_COUNT = 3

/**
 * One typography token: a role paired with a level index within it.
 *
 * This addresses a single typography token for purposes that need to name one, such as
 * font-family assignment. The index is ordinal within its own role and carries no cross-role
 * meaning, so [BasisTypographyRole.Structure] level 1 and [BasisTypographyRole.Content] level 1 are
 * unrelated decisions that happen to share an index.
 *
 * @property role The role this token belongs to.
 * @property index The ordinal within that role, starting at 1.
 */
data class BasisTypographyLevel(
    val role: BasisTypographyRole,
    val index: Int,
) {
    init {
        require(index >= 1) { "A typography level index starts at 1, got $index." }
    }

    /**
     * Whether this level exists in its role.
     *
     * A level beyond its role's count names a token that does not exist, which would otherwise
     * produce an unresolvable requirement.
     */
    val exists: Boolean
        get() = when (role) {
            BasisTypographyRole.Structure -> index <= STRUCTURE_LEVEL_COUNT
            BasisTypographyRole.Content -> index <= CONTENT_LEVEL_COUNT
            BasisTypographyRole.Metadata -> index <= METADATA_LEVEL_COUNT
        }

    companion object {
        /**
         * Every typography level the catalogue defines, in a stable order.
         *
         * Resolution and any value that must cover the whole catalogue iterate this list rather
         * than assembling levels from each role's count separately, so a role that gains a level
         * cannot be left out of a resolved scheme by accident.
         */
        fun all(): List<BasisTypographyLevel> =
            BasisTypographyRole.entries.flatMap { role -> levelsOf(role) }

        /**
         * Every level of one role, in ascending level order.
         *
         * @param role The role whose levels to list.
         * @return The levels that role defines.
         */
        fun levelsOf(role: BasisTypographyRole): List<BasisTypographyLevel> {
            val count = when (role) {
                BasisTypographyRole.Structure -> STRUCTURE_LEVEL_COUNT
                BasisTypographyRole.Content -> CONTENT_LEVEL_COUNT
                BasisTypographyRole.Metadata -> METADATA_LEVEL_COUNT
            }
            return (1..count).map { BasisTypographyLevel(role, it) }
        }
    }
}
