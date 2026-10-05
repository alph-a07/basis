package io.github.alph_a07.basis.tokens.vocabulary.radius

import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * The radius family is eight indexed levels plus two boundary concepts.
 */
class RadiusTokensTest {
    @Test
    fun scaleHasEightIndexedLevelsAndTwoBoundaries() {
        val indexed = BasisRadius.entries.filter { it.isIndexed }

        assertEquals(RADIUS_INDEXED_LEVEL_COUNT, indexed.size)
        assertEquals(8, indexed.size)
        assertEquals(10, BasisRadius.entries.size)
    }

    @Test
    fun noneAndFullAreBoundariesRatherThanIndexedMagnitudes() {
        assertEquals(
            listOf(BasisRadius.None, BasisRadius.Full),
            BasisRadius.entries.filterNot { it.isIndexed },
        )
    }

    @Test
    fun indexedLevelsAreContiguousAndAscend() {
        assertEquals(
            listOf("Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8"),
            BasisRadius.entries.filter { it.isIndexed }.map { it.name },
        )
    }

    @Test
    fun asymmetricShapesAreExpressibleWithoutNewTokens() {
        val sheet = BasisCornerShape.topRounded(BasisRadius.Level3)

        assertEquals(BasisRadius.Level3, sheet.topStart)
        assertEquals(BasisRadius.Level3, sheet.topEnd)
        assertEquals(BasisRadius.None, sheet.bottomEnd)
        assertEquals(BasisRadius.None, sheet.bottomStart)
    }

    @Test
    fun aBoundaryRadiusComposesLikeAnyOtherLevel() {
        val pill = BasisCornerShape.uniform(BasisRadius.Full)

        assertEquals(BasisRadius.Full, pill.topStart)
        assertEquals(BasisRadius.Full, pill.bottomEnd)
    }
}

private val BasisRadius.isIndexed: Boolean
    get() = this != BasisRadius.None && this != BasisRadius.Full
