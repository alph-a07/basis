package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.intent.controls.MotionConstraint
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStageId
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens

/**
 * Applies the motion floors: a duration bias cap, then a reduced-motion rewrite.
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
            stage = ResolutionStageId.Enforce,
            status = ReportStatus.OverriddenByConstraint,
            message = "Reduced motion preference rewrote every purpose to zero-duration linear motion.",
        )

    return biased.copy(
        feedback = reduced(),
        stateTransition = reduced(),
        transformation = reduced(),
        expansion = reduced(),
        reposition = reduced(),
        emphasis = reduced(),
    )
}

private fun MotionSpec.biased(bias: Float): MotionSpec = copy(
    duration = DurationValue((duration.milliseconds * (1f + bias)).toLong().coerceAtLeast(0L)),
)

private fun reduced(): MotionSpec = MotionSpec(
    duration = DurationValue(REDUCED_MOTION_MS),
    easing = EasingKind.Linear,
)

/** Duration every motion purpose collapses to under reduced motion, in milliseconds. */
private const val REDUCED_MOTION_MS: Long = 0L
