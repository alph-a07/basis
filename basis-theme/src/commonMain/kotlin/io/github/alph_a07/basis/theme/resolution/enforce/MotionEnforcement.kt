package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.intent.controls.MotionConstraint
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStage
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens

/**
 * Applies the motion floors: a duration bias cap, then a reduced-motion rewrite.
 *
 * Under reduced motion, spatial and transformational purposes collapse to zero duration to
 * prevent vestibular distress, while feedback and state crossfades retain a short fade to
 * preserve tactile confirmation.
 *
 * @param motion Derived motion purposes.
 * @param constraint Motion floors as specified, or null for no floor.
 * @param entries Accumulator of report entries for actual rewrites.
 * @return The motion purposes with floors applied.
 */
internal fun enforceMotion(
    motion: MotionTokens,
    constraint: MotionConstraint?,
    entries: MutableList<ReportEntry>,
): MotionTokens {
    if (constraint == null) {
        return motion
    }

    val bias = constraint.maxDurationBias
    val biased =
        if (bias == null) {
            motion
        } else {
            motion.copy(
                feedback = motion.feedback.biased(bias),
                stateTransition = motion.stateTransition.biased(bias),
                transformation = motion.transformation.biased(bias),
                expansion = motion.expansion.biased(bias),
                reposition = motion.reposition.biased(bias),
                emphasis = motion.emphasis.biased(bias),
            )
        }

    if (!constraint.preferReducedMotion) {
        return biased
    }

    entries +=
        ReportEntry(
            path = "motion",
            stage = ResolutionStage.Enforce,
            status = ReportStatus.OverriddenByConstraint,
            message =
                "Reduced motion preference collapsed spatial motion to 0ms and retained a short fade for feedback.",
        )

    return biased.copy(
        feedback = reducedFeedback(),
        stateTransition = reducedFeedback(),
        transformation = reducedSpatial(),
        expansion = reducedSpatial(),
        reposition = reducedSpatial(),
        emphasis = reducedSpatial(),
    )
}

private fun MotionSpec.biased(bias: Float): MotionSpec = copy(
    duration = DurationValue((duration.milliseconds * (1f + bias)).toLong().coerceAtLeast(0L)),
)

private fun reducedSpatial(): MotionSpec = MotionSpec(
    duration = DurationValue(REDUCED_SPATIAL_MOTION_MS),
    easing = EasingKind.Linear,
)

private fun reducedFeedback(): MotionSpec = MotionSpec(
    duration = DurationValue(REDUCED_FEEDBACK_MOTION_MS),
    easing = EasingKind.Linear,
)

/** Duration spatial motion collapses to under reduced motion, in milliseconds. */
private const val REDUCED_SPATIAL_MOTION_MS: Long = 0L

/** Duration non-spatial feedback and crossfade motion retain under reduced motion, in milliseconds. */
private const val REDUCED_FEEDBACK_MOTION_MS: Long = 100L
