package io.github.alph_a07.basis.tokens.motion

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
    fun everyUseCaseResolvesToAtLeastOneTrack() {
        for (token in BasisMotionToken.entries) {
            val resolved = requireNotNull(BasisMotionTokens.defaults[token]) { "$token has no resolution" }
            assertEquals(token, resolved.token)
            assertTrue("$token resolved to no tracks", resolved.tracks.isNotEmpty())
        }
    }

    @Test
    fun tracksWithinOneMotionAreAddressedToDistinctProperties() {
        for (motion in BasisMotionTokens.defaults.values) {
            val properties = motion.tracks.map { it.property }
            assertEquals(
                "${motion.token} drives a property more than once: $properties",
                properties.distinct(),
                properties,
            )
        }
    }

    @Test
    fun aResolvedMotionWithoutTracksIsRejected() {
        val failure = runCatching {
            BasisResolvedMotion(BasisMotionToken.Feedback, emptyList())
        }.exceptionOrNull()

        assertTrue(failure is IllegalArgumentException)
    }

    @Test
    fun reducedMotionRemovesAnimationRatherThanZeroingDuration() {
        val feedback = requireNotNull(BasisMotionTokens.defaults[BasisMotionToken.Feedback])

        val reduced = BasisMotionTokens.applyConstraints(
            motion = feedback,
            constraints = BasisMotionConstraints(reducedMotion = true),
        )

        assertTrue(
            "Every track must become immediate under reduced motion",
            reduced.tracks.all { it.timing == BasisMotionTiming.Immediate },
        )
        assertEquals(
            "Reduced motion must not express itself as a zero-length animation",
            0,
            reduced.tracks.count { it.timing is BasisMotionTiming.Timed },
        )
    }

    @Test
    fun motionIsUnchangedWhenNoConstraintApplies() {
        val expansion = requireNotNull(BasisMotionTokens.defaults[BasisMotionToken.Expansion])

        val result = BasisMotionTokens.applyConstraints(
            motion = expansion,
            constraints = BasisMotionConstraints(reducedMotion = false),
        )

        assertEquals(expansion, result)
    }

    @Test
    fun aTimedTrackRejectsANonPositiveDuration() {
        val failure = runCatching { BasisMotionTiming.Timed(0) }.exceptionOrNull()

        assertTrue(failure is IllegalArgumentException)
    }
}
