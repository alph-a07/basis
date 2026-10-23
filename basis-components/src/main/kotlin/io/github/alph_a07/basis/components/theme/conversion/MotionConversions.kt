package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.AnimationSpec
import androidx.compose.animation.core.Easing
import androidx.compose.animation.core.FastOutLinearInEasing
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.FiniteAnimationSpec
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.SpringSpec
import androidx.compose.animation.core.TweenSpec
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.runtime.Composable
import androidx.compose.runtime.State
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import io.github.alph_a07.basis.components.theme.BasisTheme
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

/**
 * Resolves a [MotionSpec] from this [MotionTokens] tree for [path].
 *
 * @param path The semantic motion token path to resolve.
 * @return The corresponding [MotionSpec].
 */
public fun MotionTokens.spec(path: MotionTokenPath): MotionSpec = path.resolveIn(this)

/**
 * Returns the Compose [AnimationSpec] from [BasisMotionLocals] corresponding to [path].
 *
 * @param path The semantic motion token path.
 * @return The animation specification configured for that purpose.
 */
public fun BasisMotionLocals.specFor(path: MotionTokenPath): AnimationSpec<Float> = when (path) {
    MotionTokenPath.Feedback -> feedback
    MotionTokenPath.StateTransition -> stateTransition
    MotionTokenPath.Transformation -> transformation
    MotionTokenPath.Expansion -> expansion
    MotionTokenPath.Reposition -> reposition
    MotionTokenPath.Emphasis -> emphasis
}

/**
 * Animates a [Color] using the active [BasisTheme] motion tokens for [purpose].
 *
 * @param targetValue The target color value to animate to.
 * @param purpose Semantic motion purpose defining duration and easing curve. Defaults to
 * [MotionTokenPath.StateTransition].
 * @param label Debug label for animation tooling.
 * @param finishedListener Optional callback invoked when the color animation finishes.
 * @return A [State] holding the animated color.
 */
@Composable
public fun animateBasisColorAsState(
    targetValue: Color,
    purpose: MotionTokenPath = MotionTokenPath.StateTransition,
    label: String = "BasisColorAnimation",
    finishedListener: ((Color) -> Unit)? = null,
): State<Color> {
    val motion = BasisTheme.current.theme.motion
    val spec =
        remember(motion, purpose) {
            purpose.toFiniteAnimationSpec<Color>(motion)
        }

    return animateColorAsState(
        targetValue = targetValue,
        animationSpec = spec,
        label = label,
        finishedListener = finishedListener,
    )
}

/**
 * Animates a [Dp] value using the active [BasisTheme] motion tokens for [purpose].
 *
 * @param targetValue The target dp dimension to animate to.
 * @param purpose Semantic motion purpose defining duration and easing curve. Defaults to
 * [MotionTokenPath.StateTransition].
 * @param label Debug label for animation tooling.
 * @param finishedListener Optional callback invoked when the dimension animation finishes.
 * @return A [State] holding the animated dp.
 */
@Composable
public fun animateBasisDpAsState(
    targetValue: Dp,
    purpose: MotionTokenPath = MotionTokenPath.StateTransition,
    label: String = "BasisDpAnimation",
    finishedListener: ((Dp) -> Unit)? = null,
): State<Dp> {
    val motion = BasisTheme.current.theme.motion
    val spec =
        remember(motion, purpose) {
            purpose.toFiniteAnimationSpec<Dp>(motion)
        }

    return animateDpAsState(
        targetValue = targetValue,
        animationSpec = spec,
        label = label,
        finishedListener = finishedListener,
    )
}

/**
 * Animates a [Float] value using the active [BasisTheme] motion tokens for [purpose].
 *
 * @param targetValue The target float value to animate to.
 * @param purpose Semantic motion purpose defining duration and easing curve. Defaults to
 * [MotionTokenPath.StateTransition].
 * @param label Debug label for animation tooling.
 * @param finishedListener Optional callback invoked when the float animation finishes.
 * @return A [State] holding the animated float.
 */
@Composable
public fun animateBasisFloatAsState(
    targetValue: Float,
    purpose: MotionTokenPath = MotionTokenPath.StateTransition,
    label: String = "BasisFloatAnimation",
    finishedListener: ((Float) -> Unit)? = null,
): State<Float> {
    val motion = BasisTheme.current.theme.motion
    val spec =
        remember(motion, purpose) {
            purpose.toFiniteAnimationSpec<Float>(motion)
        }

    return animateFloatAsState(
        targetValue = targetValue,
        animationSpec = spec,
        label = label,
        finishedListener = finishedListener,
    )
}

/**
 * Resolves a [TweenSpec] from the active [BasisTheme] ambient for [purpose].
 *
 * @param T The animated value type.
 * @param purpose Semantic motion purpose path. Defaults to [MotionTokenPath.StateTransition].
 * @return A Compose [TweenSpec] configured with the theme's motion parameters.
 */
@Composable
public fun <T> basisTween(
    purpose: MotionTokenPath = MotionTokenPath.StateTransition,
): TweenSpec<T> {
    val motion = BasisTheme.current.theme.motion
    val motionSpec = motion.spec(purpose)

    return remember(motionSpec) { motionSpec.toTweenSpec() }
}

internal fun MotionTokens.toBasisMotionLocals(): BasisMotionLocals = BasisMotionLocals(
    feedback = feedback.toFiniteAnimationSpec(),
    stateTransition = stateTransition.toFiniteAnimationSpec(),
    transformation = transformation.toFiniteAnimationSpec(),
    expansion = expansion.toFiniteAnimationSpec(),
    reposition = reposition.toFiniteAnimationSpec(),
    emphasis = emphasis.toAnimationSpec(),
)
