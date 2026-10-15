package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.animation.core.AnimationSpec
import androidx.compose.animation.core.FastOutLinearInEasing
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.FiniteAnimationSpec
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import io.github.alph_a07.basis.components.theme.BasisMotionLocals
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens

/**
 * Maps a [MotionSpec] to a Compose [FiniteAnimationSpec].
 *
 * [EasingKind.Spring] produces a [spring] spec using the [MotionSpec.spring] parameters; all other
 * easing families produce a [tween] with the corresponding Compose easing curve. When spring
 * params are absent on a Spring-eased spec, default spring values are used.
 *
 * @param T The type of value being animated.
 * @return Mapped finite animation specification.
 */
public fun <T> MotionSpec.toFiniteAnimationSpec(): FiniteAnimationSpec<T> {
    if (easing == EasingKind.Spring) {
        val params = spring

        return if (params != null) {
            spring(
                dampingRatio = params.dampingRatio,
                stiffness = params.stiffness,
            )
        } else {
            spring()
        }
    }

    return tween(
        durationMillis = duration.milliseconds.toInt(),
        delayMillis = delay.milliseconds.toInt(),
        easing = easing.toComposeEasing(),
    )
}

/**
 * Maps a [MotionSpec] to a Compose [AnimationSpec].
 *
 * Provided as a convenience for motion purposes (e.g. [MotionTokens.emphasis]) that may use spring
 * animation with unbounded oscillation. Components should prefer the typed [FiniteAnimationSpec]
 * overload when possible.
 *
 * @param T The type of value being animated.
 * @return Mapped animation specification.
 */
public fun <T> MotionSpec.toAnimationSpec(): AnimationSpec<T> = toFiniteAnimationSpec()

private fun EasingKind.toComposeEasing() = when (this) {
    EasingKind.Linear -> LinearEasing
    EasingKind.Standard -> FastOutSlowInEasing
    EasingKind.Emphasized -> FastOutSlowInEasing
    EasingKind.Decelerate -> LinearOutSlowInEasing
    EasingKind.Accelerate -> FastOutLinearInEasing
    EasingKind.Spring -> FastOutSlowInEasing
}

internal fun MotionTokens.toBasisMotionLocals(): BasisMotionLocals = BasisMotionLocals(
    feedback = feedback.toFiniteAnimationSpec(),
    stateTransition = stateTransition.toFiniteAnimationSpec(),
    transformation = transformation.toFiniteAnimationSpec(),
    expansion = expansion.toFiniteAnimationSpec(),
    reposition = reposition.toFiniteAnimationSpec(),
    emphasis = emphasis.toAnimationSpec(),
)
