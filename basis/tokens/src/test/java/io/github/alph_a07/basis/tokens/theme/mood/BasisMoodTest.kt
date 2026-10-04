package io.github.alph_a07.basis.tokens.theme.mood

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
    fun aDimensionOutsideItsRangeIsRejected() {
        assertTrue(
            runCatching { BasisMoodDimensions(colorfulness = 1.5f) }
                .exceptionOrNull() is IllegalArgumentException,
        )
        assertTrue(
            runCatching { BasisMoodDimensions(depth = -0.1f) }
                .exceptionOrNull() is IllegalArgumentException,
        )
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
