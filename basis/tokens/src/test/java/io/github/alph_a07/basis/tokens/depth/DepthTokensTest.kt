package io.github.alph_a07.basis.tokens.depth

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
        assertEquals(names, BasisDepth.entries.sortedBy { it.ordinal }.map { it.name })
    }

    @Test
    fun deeperLevelsUseAtLeastAsStrongAnExpressionAsShallowerOnes() {
        val light = BasisDepth.entries.map { BasisDepthTokens.light(it) }
        val strength = mapOf(
            BasisDepthExpression.Inset to 0,
            BasisDepthExpression.Tonal to 1,
            BasisDepthExpression.Shadow to 2,
            BasisDepthExpression.Elevation to 3,
            BasisDepthExpression.Combined to 4,
        )
        val ranked = light.map { requireNotNull(strength[it.expression]) }

        assertEquals(ranked.sorted(), ranked)
    }

    @Test
    fun everyLevelResolvesInBothModes() {
        for (level in BasisDepth.entries) {
            val light = BasisDepthTokens.light(level)
            val dark = BasisDepthTokens.dark(level)

            assertEquals(level, light.level)
            assertEquals(level, dark.level)
        }
    }

    @Test
    fun theSameLevelMayResolveToDifferentExpressionsInDifferentThemes() {
        val light = BasisDepthTokens.light(BasisDepth.Level2)
        val dark = BasisDepthTokens.dark(BasisDepth.Level2)

        assertEquals(BasisDepth.Level2, light.level)
        assertEquals(BasisDepth.Level2, dark.level)
        assertTrue(
            "Depth is implementation-neutral: one level must be able to resolve differently per theme",
            light.expression != dark.expression,
        )
    }

    @Test
    fun everyLevelResolvesToAKnownExpression() {
        for (level in BasisDepth.entries) {
            assertTrue(
                BasisDepthTokens.light(level).expression in BasisDepthExpression.entries,
            )
            assertTrue(
                BasisDepthTokens.dark(level).expression in BasisDepthExpression.entries,
            )
        }
    }
}
