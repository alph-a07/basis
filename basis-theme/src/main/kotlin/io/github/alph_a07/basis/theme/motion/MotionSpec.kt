package io.github.alph_a07.basis.theme.motion

import io.github.alph_a07.basis.theme.core.DurationValue

/**
 * Timing specification for one semantic motion purpose.
 *
 * Uses [DurationValue] so durations stay validated token values; the components module maps this
 * to animation specs at the Compose boundary.
 *
 * @property duration Elapsed time of the motion.
 * @property easing Easing family applied over [duration].
 * @property delay Start delay before the motion begins.
 * @property spring Spring parameters honored only when [easing] is [EasingKind.Spring].
 */
public data class MotionSpec(
    public val duration: DurationValue,
    public val easing: EasingKind,
    public val delay: DurationValue = DurationValue(0L),
    public val spring: SpringParams? = null,
)

/**
 * Spring parameters for [EasingKind.Spring] motion.
 *
 * @property stiffness Spring stiffness.
 * @property dampingRatio Damping ratio; `1` is critically damped.
 */
public data class SpringParams(
    public val stiffness: Float,
    public val dampingRatio: Float,
)
