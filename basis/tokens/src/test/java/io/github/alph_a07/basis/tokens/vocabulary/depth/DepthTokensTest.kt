package io.github.alph_a07.basis.tokens.vocabulary.depth

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * A depth level is a perceptual magnitude, not a rendering mechanism.
 */
class DepthTokensTest {
    @Test
    fun theScaleIsAnIndexedHierarchy() {
        assertEquals(DEPTH_LEVEL_COUNT, BasisDepth.entries.size)
        assertEquals(6, BasisDepth.entries.size)
    }

    @Test
    fun levelsAreOrderedByMagnitude() {
        val names = BasisDepth.entries.map { it.name }

        assertEquals(names.sorted(), names)
    }

    @Test
    fun everyMechanismIsAvailableAsAnExpression() {
        val names = BasisDepthExpression.entries.map { it.name }

        assertTrue("Elevation" in names)
        assertTrue("Shadow" in names)
        assertTrue("Inset" in names)
        assertTrue("Tonal" in names)
        assertTrue("Combined" in names)
    }

    @Test
    fun aResolvedValuePairsALevelWithAMechanism() {
        val value = BasisDepthValue(BasisDepth.Level3, BasisDepthExpression.Tonal)

        assertEquals(BasisDepth.Level3, value.level)
        assertEquals(BasisDepthExpression.Tonal, value.expression)
    }

    @Test
    fun theSameLevelCanCarryDifferentMechanisms() {
        val light = BasisDepthValue(BasisDepth.Level2, BasisDepthExpression.Elevation)
        val dark = BasisDepthValue(BasisDepth.Level2, BasisDepthExpression.Tonal)

        assertEquals(light.level, dark.level)
        assertTrue(
            "Depth is implementation-neutral: one level must be able to resolve differently per theme",
            light.expression != dark.expression,
        )
    }
}
