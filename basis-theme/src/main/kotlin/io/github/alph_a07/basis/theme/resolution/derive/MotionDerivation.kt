package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.core.motion.SpringParams
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens

/**
 * Scales the motion durations and optionally applies spring easing to expansion and emphasis purposes.
 *
 * @param motion Seeded motion tokens.
 * @param durationScale Multiplier on every motion duration.
 * @param emphasisBoost Emphasis boost in effect; if above the spring threshold, expansion and emphasis purposes take a spring easing.
 * @return The scaled motion tokens.
 */
internal fun deriveMotionTokens(
    motion: MotionTokens,
    durationScale: Float,
    emphasisBoost: Float,
): MotionTokens {
    val springy = emphasisBoost >= SPRING_EMPHASIS_THRESHOLD

    fun spec(value: MotionSpec, emphasized: Boolean): MotionSpec {
        val scaled =
            value.copy(
                duration = DurationValue(scaleMilliseconds(value.duration.milliseconds, durationScale)),
            )

        if (!emphasized || !springy) {
            return scaled
        }

        return scaled.copy(
            easing = EasingKind.Spring,
            spring = SpringParams(SPRING_STIFFNESS, SPRING_DAMPING),
        )
    }

    return MotionTokens(
        feedback = spec(motion.feedback, false),
        stateTransition = spec(motion.stateTransition, false),
        transformation = spec(motion.transformation, false),
        expansion = spec(motion.expansion, true),
        reposition = spec(motion.reposition, false),
        emphasis = spec(motion.emphasis, true),
    )
}

/** Emphasis boost at or above which expansion and emphasis motion take a spring easing. */
private const val SPRING_EMPHASIS_THRESHOLD: Float = 0.35f

/** Spring stiffness used when emphasis lifts a purpose onto a spring easing. */
private const val SPRING_STIFFNESS: Float = 380f

/** Spring damping ratio used when emphasis lifts a purpose onto a spring easing. */
private const val SPRING_DAMPING: Float = 0.82f
