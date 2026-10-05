package io.github.alph_a07.basis.tokens.theme.inputs.mood

import io.github.alph_a07.basis.tokens.theme.BasisThemeInputs
import io.github.alph_a07.basis.tokens.theme.resolution.BasisThemeResolver
import io.github.alph_a07.basis.tokens.theme.resolution.assertFailure
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Mood is one named profile plus continuous dimensions, and never carries motion.
 */
class BasisMoodTest {
    @Test
    fun theNamedProfilesAreTheWholeVocabulary() {
        assertEquals(listOf("Calm", "Refined", "Energetic", "Playful"), BasisMoodProfile.entries.map { it.name })
    }

    @Test
    fun professionalIsNotAMoodProfile() {
        val names = BasisMoodProfile.entries.map { it.name.lowercase() }
        assertTrue("Professional is intentionally unassigned", names.none { it == "professional" })
    }

    @Test
    fun moodCarriesExactlyOneProfile() {
        val mood = BasisMood(BasisMoodProfile.Calm)
        assertEquals(BasisMoodProfile.Calm, mood.profile)
    }

    @Test
    fun aMoodWithNoStatedRefinementIsNeutralOnEveryDimension() {
        val unrefined = BasisMood(BasisMoodProfile.Energetic)
        val defaulted = BasisMood(BasisMoodProfile.Calm, BasisMoodDimensions())
        assertEquals(BasisMoodDimensions.NEUTRAL_ALL, unrefined.dimensions)
        assertEquals(BasisMoodDimensions.NEUTRAL_ALL, defaulted.dimensions)
        assertEquals(BasisMood(BasisMoodProfile.Energetic), unrefined)
    }

    @Test
    fun everyDimensionAcceptsBothEndsOfItsRange() {
        val low = BasisMoodDimensions(
            colorfulness = BasisMoodDimensions.MIN,
            shapeSoftness = BasisMoodDimensions.MIN,
            typographicExpressiveness = BasisMoodDimensions.MIN,
            depth = BasisMoodDimensions.MIN,
            visualComplexity = BasisMoodDimensions.MIN,
        )
        val high = BasisMoodDimensions(
            colorfulness = BasisMoodDimensions.MAX,
            shapeSoftness = BasisMoodDimensions.MAX,
            typographicExpressiveness = BasisMoodDimensions.MAX,
            depth = BasisMoodDimensions.MAX,
            visualComplexity = BasisMoodDimensions.MAX,
        )
        assertEquals(0f, low.colorfulness, 0f)
        assertEquals(1f, high.visualComplexity, 0f)
    }

    @Test
    fun aDimensionOutsideItsRangeIsRefusedByResolution() {
        assertEquals(
            "InvalidInput",
            failureFor(BasisMoodDimensions(colorfulness = 1.5f)).first,
        )
        assertEquals(
            "InvalidInput",
            failureFor(BasisMoodDimensions(depth = -0.1f)).first,
        )
    }

    @Test
    fun everyOffContinuumDimensionIsNamedInTheSameFailure() {
        val causes = failureFor(
            BasisMoodDimensions(colorfulness = 1.5f, depth = -0.1f),
        ).second
        assertTrue(causes.any { it.contains("colorfulness") })
        assertTrue(causes.any { it.contains("depth") })
    }

    /**
     * The category and causes a mood carrying [dimensions] resolves to.
     *
     * @param dimensions The dimensions to resolve with.
     * @return The failure category, and the causes that produced it.
     */
    private fun failureFor(dimensions: BasisMoodDimensions): Pair<String, List<String>> {
        val failure = assertFailure(
            BasisThemeResolver.resolve(BasisThemeInputs(mood = BasisMood(BasisMoodProfile.Calm, dimensions))).result,
        )
        return failure.category to failure.causes
    }

    @Test
    fun motionIsNotAMoodDimension() {
        val declared = BasisMoodDimensions::class.java.methods
            .filter { it.parameterCount == 0 }
            .mapNotNull { it.name.takeIf { name -> name.startsWith("get") } }
            .map { it.removePrefix("get").lowercase() }
            .filter { it != "class" }
        assertEquals(5, declared.size)
        assertTrue(
            "Reduced motion is a constraint, so it is not a dimension of taste",
            declared.none { it.contains("motion") },
        )
    }
}
