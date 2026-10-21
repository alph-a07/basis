package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.animation.core.FastOutLinearInEasing
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.SpringSpec
import androidx.compose.animation.core.TweenSpec
import androidx.compose.ui.unit.Dp
import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.core.motion.SpringParams
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import org.junit.Test

/**
 * Unit tests for [MotionSpec] to Compose animation spec bridging.
 */
class MotionConversionsTest {

    @Test
    fun toFiniteAnimationSpec_springEasing_producesSpringSpec() {
        val spec =
            MotionSpec(
                duration = DurationValue(200L),
                easing = EasingKind.Spring,
                spring = SpringParams(stiffness = 300f, dampingRatio = 0.8f),
            )
        val animSpec = spec.toFiniteAnimationSpec<Float>()

        assertTrue(animSpec is SpringSpec<Float>)
        assertEquals(300f, animSpec.stiffness)

        assertEquals(0.8f, animSpec.dampingRatio)
    }

    @Test
    fun toFiniteAnimationSpec_standardEasing_producesTweenSpec() {
        val spec =
            MotionSpec(
                duration = DurationValue(240L),
                delay = DurationValue(50L),
                easing = EasingKind.Standard,
            )
        val animSpec = spec.toFiniteAnimationSpec<Float>()

        assertTrue(animSpec is TweenSpec<Float>)
        assertEquals(240, animSpec.durationMillis)

        assertEquals(50, animSpec.delay)
    }

    @Test
    fun toAnimationSpec_supportsGenericTypes() {
        val spec =
            MotionSpec(
                duration = DurationValue(150L),
                easing = EasingKind.Linear,
            )
        val stringSpec = spec.toAnimationSpec<String>()

        assertTrue(stringSpec is TweenSpec<String>)

        assertEquals(150, stringSpec.durationMillis)
    }

    @Test
    fun toTweenSpec_mapsDurationDelayAndEasing() {
        val spec =
            MotionSpec(
                duration = DurationValue(300L),
                delay = DurationValue(75L),
                easing = EasingKind.Decelerate,
            )
        val tweenSpec = spec.toTweenSpec<Dp>()

        assertEquals(300, tweenSpec.durationMillis)
        assertEquals(75, tweenSpec.delay)

        assertEquals(LinearOutSlowInEasing, tweenSpec.easing)
    }

    @Test
    fun toSpringSpec_defaultParams_producesDefaultSpring() {
        val spec =
            MotionSpec(
                duration = DurationValue(200L),
                easing = EasingKind.Spring,
                spring = null,
            )
        val springSpec = spec.toSpringSpec<Float>()

        assertEquals(Spring.DampingRatioNoBouncy, springSpec.dampingRatio)

        assertEquals(Spring.StiffnessMedium, springSpec.stiffness)
    }

    @Test
    fun toSpringSpec_customParams_usesCustomDampingAndStiffness() {
        val spec =
            MotionSpec(
                duration = DurationValue(200L),
                easing = EasingKind.Spring,
                spring = SpringParams(stiffness = 450f, dampingRatio = 0.65f),
            )
        val springSpec = spec.toSpringSpec<Float>()

        assertEquals(450f, springSpec.stiffness)

        assertEquals(0.65f, springSpec.dampingRatio)
    }

    @Test
    fun toEasing_allEasingKindVariants_produceExpectedComposeEasing() {
        assertEquals(LinearEasing, EasingKind.Linear.toEasing())
        assertEquals(FastOutSlowInEasing, EasingKind.Standard.toEasing())
        assertEquals(FastOutSlowInEasing, EasingKind.Emphasized.toEasing())
        assertEquals(LinearOutSlowInEasing, EasingKind.Decelerate.toEasing())
        assertEquals(FastOutLinearInEasing, EasingKind.Accelerate.toEasing())

        assertEquals(FastOutSlowInEasing, EasingKind.Spring.toEasing())
    }

    @Test
    fun motionTokenPath_toFiniteAnimationSpec_resolvesAllPurposes() {
        val theme = resolve(BasisIntent()).light!!

        val feedback = MotionTokenPath.Feedback.toFiniteAnimationSpec<Float>(theme.motion)
        val state = MotionTokenPath.StateTransition.toFiniteAnimationSpec<Float>(theme.motion)
        val transform = MotionTokenPath.Transformation.toFiniteAnimationSpec<Float>(theme.motion)
        val expansion = MotionTokenPath.Expansion.toFiniteAnimationSpec<Float>(theme.motion)
        val reposition = MotionTokenPath.Reposition.toFiniteAnimationSpec<Float>(theme.motion)
        val emphasis = MotionTokenPath.Emphasis.toAnimationSpec<Float>(theme.motion)

        assertNotNull(feedback)
        assertNotNull(state)
        assertNotNull(transform)
        assertNotNull(expansion)
        assertNotNull(reposition)

        assertNotNull(emphasis)
    }

    @Test
    fun toBasisMotionLocals_allPurposesPopulated() {
        val theme = resolve(BasisIntent()).light!!
        val locals = theme.motion.toBasisMotionLocals()

        assertNotNull(locals.feedback)
        assertNotNull(locals.stateTransition)
        assertNotNull(locals.transformation)
        assertNotNull(locals.expansion)
        assertNotNull(locals.reposition)

        assertNotNull(locals.emphasis)
    }
}
