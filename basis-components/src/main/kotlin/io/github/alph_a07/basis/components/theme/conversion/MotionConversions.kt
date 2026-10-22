package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.animation.core.AnimationSpec
import androidx.compose.animation.core.Easing
import androidx.compose.animation.core.FastOutLinearInEasing
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.FiniteAnimationSpec
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.SpringSpec
import androidx.compose.animation.core.TweenSpec
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import io.github.alph_a07.basis.components.theme.locals.BasisMotionLocals
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.resolveIn
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens

/**
 * Maps a [MotionSpec] to a Compose [FiniteAnimationSpec].
 *
 * [EasingKind.Spring] produces a [SpringSpec] using [toSpringSpec]; all other easing families
 * produce a [TweenSpec] via [toTweenSpec].
 *
 * @param T The type of value being animated.
 * @return Mapped finite animation specification.
 */
public fun <T> MotionSpec.toFiniteAnimationSpec(): FiniteAnimationSpec<T> =
    if (easing == EasingKind.Spring) toSpringSpec() else toTweenSpec()

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

/**
 * Maps a [MotionSpec] explicitly to a Compose [TweenSpec].
 *
 * @param T The type of value being animated.
 * @return Mapped tween animation specification.
 */
public fun <T> MotionSpec.toTweenSpec(): TweenSpec<T> = tween(
    durationMillis = duration.milliseconds.toInt(),
    delayMillis = delay.milliseconds.toInt(),
    easing = easing.toEasing(),
)

/**
 * Maps a [MotionSpec] explicitly to a Compose [SpringSpec].
 *
 * When [spring] parameters are present on this spec, they are used; otherwise default Compose
 * spring parameters are used.
 *
 * @param T The type of value being animated.
 * @return Mapped spring animation specification.
 */
public fun <T> MotionSpec.toSpringSpec(): SpringSpec<T> {
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

/**
 * Maps a semantic [MotionTokenPath] to a Compose [FiniteAnimationSpec] by resolving it against [motion].
 *
 * @param T The type of value being animated.
 * @param motion The motion token tree to resolve in.
 * @return Mapped finite animation specification.
 */
public fun <T> MotionTokenPath.toFiniteAnimationSpec(
    motion: MotionTokens,
): FiniteAnimationSpec<T> = resolveIn(motion).toFiniteAnimationSpec()

/**
 * Maps a semantic [MotionTokenPath] to a Compose [AnimationSpec] by resolving it against [motion].
 *
 * @param T The type of value being animated.
 * @param motion The motion token tree to resolve in.
 * @return Mapped animation specification.
 */
public fun <T> MotionTokenPath.toAnimationSpec(
    motion: MotionTokens,
): AnimationSpec<T> = resolveIn(motion).toAnimationSpec()

/**
 * Maps an [EasingKind] to a Compose [Easing] curve.
 *
 * @return Equivalent Compose [Easing].
 */
public fun EasingKind.toEasing(): Easing = when (this) {
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
