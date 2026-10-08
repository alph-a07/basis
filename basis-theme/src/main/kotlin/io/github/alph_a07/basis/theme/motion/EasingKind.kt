package io.github.alph_a07.basis.theme.motion

/** Easing function family for a motion purpose. */
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
