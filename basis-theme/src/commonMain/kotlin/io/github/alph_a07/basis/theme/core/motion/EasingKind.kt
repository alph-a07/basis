package io.github.alph_a07.basis.theme.core.motion

import kotlinx.serialization.Serializable

/** Easing function family for a motion purpose. */
@Serializable
public enum class EasingKind {
    /** Constant velocity; used for reduced-motion rewrites. */
    Linear,

    /** Platform standard ease. */
    Standard,

    /** Stronger ease for transformations and expansions. */
    Emphasized,

    /** Ease-out curve. */
    Decelerate,

    /** Ease-in curve. */
    Accelerate,

    /** Physics spring; [MotionSpec.spring] applies only with this easing. */
    Spring,
}
