package io.github.alph_a07.basis.tokens.spacing

import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * The public spacing hierarchy contains exactly eight levels.
 */
class SpacingTokensTest {
    @Test
    fun scaleHasExactlyEightLevels() {
        assertEquals(SPACING_LEVEL_COUNT, BasisSpacing.entries.size)
        assertEquals(8, BasisSpacing.entries.size)
    }

    @Test
    fun levelsAreNamedByIndexRatherThanByMagnitude() {
        assertEquals(
            listOf("Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8"),
            BasisSpacing.entries.map { it.name },
        )
    }

    @Test
    fun levelsAscendInOrdinalOrder() {
        val names = BasisSpacing.entries.map { it.name }

        assertEquals(names.sorted(), names)
    }
}
