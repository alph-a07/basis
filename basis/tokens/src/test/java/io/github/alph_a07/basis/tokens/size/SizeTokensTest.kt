package io.github.alph_a07.basis.tokens.size

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Size families are indexed dimensional hierarchies, and Control is a composite.
 */
class SizeTokensTest {
    @Test
    fun theFourFamiliesAreTheWholeVocabulary() {
        assertTrue(SizeIcon.entries.isNotEmpty())
        assertTrue(SizeAvatar.entries.isNotEmpty())
        assertTrue(SizeDot.entries.isNotEmpty())
        assertTrue(SizeControl.entries.isNotEmpty())
    }

    @Test
    fun eachFamilyCarriesItsOwnLevelCount() {
        val counts = listOf(
            SizeIcon.entries.size,
            SizeAvatar.entries.size,
            SizeDot.entries.size,
            SizeControl.entries.size,
        )

        assertTrue(
            "Families size different objects, so they need not share a level count: $counts",
            counts.all { it > 0 },
        )
    }

    @Test
    fun levelsAreNamedByIndex() {
        val names = SizeIcon.entries.map { it.name }

        assertEquals(names.sorted(), names)
        assertTrue(names.all { it.startsWith("Level") })
    }

    @Test
    fun controlSizeCarriesItsWholeConstituentSet() {
        val control = BasisControlSize(
            minHeight = 40,
            horizontalPadding = 16,
            verticalPadding = 8,
            iconSize = 20,
        )

        assertTrue(control.minHeight > 0)
        assertTrue(control.horizontalPadding > 0)
        assertTrue(control.verticalPadding >= 0)
        assertTrue(control.iconSize > 0)
    }

    @Test
    fun controlConstituentsAreCarriedTogetherRatherThanSeparately() {
        val control = BasisControlSize(
            minHeight = 48,
            horizontalPadding = 20,
            verticalPadding = 12,
            iconSize = 24,
        )
        val copy = control.copy(minHeight = 56)

        assertEquals(20, copy.horizontalPadding)
        assertEquals(24, copy.iconSize)
    }
}
