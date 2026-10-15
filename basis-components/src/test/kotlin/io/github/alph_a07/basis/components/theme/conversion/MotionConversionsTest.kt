package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.animation.core.SpringSpec
import androidx.compose.animation.core.TweenSpec
import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.core.motion.SpringParams
import kotlin.test.assertEquals
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
}
