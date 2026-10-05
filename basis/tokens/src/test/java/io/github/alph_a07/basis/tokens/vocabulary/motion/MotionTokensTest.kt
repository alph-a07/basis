package io.github.alph_a07.basis.tokens.vocabulary.motion

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Motion is use-case based, and its mechanics are not part of the public vocabulary.
 */
class MotionTokensTest {
    @Test
    fun theSixUseCasesAreTheWholeVocabulary() {
        assertEquals(
            listOf(
                BasisMotionToken.Feedback,
                BasisMotionToken.StateTransition,
                BasisMotionToken.Transformation,
                BasisMotionToken.Expansion,
                BasisMotionToken.Reposition,
                BasisMotionToken.Emphasis,
            ),
            BasisMotionToken.entries.toList(),
        )
    }

    @Test
    fun theVocabularyContainsNoAnimationMechanism() {
        val names = BasisMotionToken.entries.map { it.name.lowercase() }
        val mechanics = listOf(
            "duration", "delay", "easing", "spring", "fade", "scale", "slide",
            "translation", "rotation", "spec", "enter", "exit", "press", "swipe",
        )

        for (mechanic in mechanics) {
            assertTrue(
                "Animation mechanisms are resolution details, not token identities; found $mechanic",
                names.none { mechanic in it },
            )
        }
    }

    @Test
    fun aResolvedMotionCarriesOneOrMoreTracks() {
        val transformation = ResolvedMotion(
            token = BasisMotionToken.Transformation,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Color, BasisMotionTiming.Timed(200)),
                BasisMotionTrack(BasisMotionProperty.Shape, BasisMotionTiming.Timed(200)),
                BasisMotionTrack(BasisMotionProperty.Size, BasisMotionTiming.Timed(200)),
            ),
        )

        assertEquals(BasisMotionToken.Transformation, transformation.token)
        assertEquals(3, transformation.tracks.size)
    }

    @Test
    fun tracksWithinOneMotionAreAddressedToDistinctProperties() {
        val motion = ResolvedMotion(
            token = BasisMotionToken.Expansion,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Size, BasisMotionTiming.Timed(300)),
                BasisMotionTrack(BasisMotionProperty.Position, BasisMotionTiming.Timed(300)),
            ),
        )

        val properties = motion.tracks.map { it.property }

        assertEquals(properties.distinct().size, properties.size)
    }

    @Test
    fun tracksMayCarryIndependentTimings() {
        val motion = ResolvedMotion(
            token = BasisMotionToken.Transformation,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Color, BasisMotionTiming.Timed(150)),
                BasisMotionTrack(BasisMotionProperty.Position, BasisMotionTiming.Spring(0.8f, 380f)),
                BasisMotionTrack(BasisMotionProperty.Opacity, BasisMotionTiming.Immediate),
            ),
        )

        val timings = motion.tracks.map { it.timing }

        assertEquals(timings.distinct().size, timings.size)
    }

    @Test
    fun immediateIsItsOwnTimingRatherThanAZeroDuration() {
        // Reduced motion must not be expressed as a zero-length animation, which is why Immediate is a
        // separate timing rather than Timed(0).
        assertTrue(runCatching { BasisMotionTiming.Timed(0) }.exceptionOrNull() is IllegalArgumentException)
    }

    @Test
    fun aResolvedMotionWithoutTracksIsRejected() {
        val failure = runCatching {
            ResolvedMotion(BasisMotionToken.Feedback, emptyList())
        }.exceptionOrNull()

        assertTrue(failure is IllegalArgumentException)
    }

    @Test
    fun aTimedTrackRejectsANonPositiveDuration() {
        val failure = runCatching { BasisMotionTiming.Timed(0) }.exceptionOrNull()

        assertTrue(failure is IllegalArgumentException)
    }

    @Test
    fun aSpringRejectsNonPositiveParameters() {
        assertTrue(runCatching { BasisMotionTiming.Spring(0f, 380f) }.exceptionOrNull() is IllegalArgumentException)
        assertTrue(runCatching { BasisMotionTiming.Spring(0.8f, 0f) }.exceptionOrNull() is IllegalArgumentException)
    }
}
