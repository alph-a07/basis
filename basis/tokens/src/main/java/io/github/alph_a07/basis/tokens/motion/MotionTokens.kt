package io.github.alph_a07.basis.tokens.motion

/** The animation duration scale, in milliseconds. Locked in the governance sheet. */
object BasisMotionDurationTokens {
    const val DURATION_INSTANT = 50
    const val DURATION_FAST = 100
    const val DURATION_NORMAL = 200
    const val DURATION_SLOW = 300
    const val DURATION_SLOWER = 500
}

/**
 * @constructor Creates a cubic-bezier easing curve with the given control points.
 * @param x1 The x-coordinate of the first control point.
 * @param y1 The y-coordinate of the first control point.
 * @param x2 The x-coordinate of the second control point.
 * @param y2 The y-coordinate of the second control point.
 */
data class BasisEasing(val x1: Float, val y1: Float, val x2: Float, val y2: Float)

/** Available easing curves. */
object BasisEasingTokens {
    /** General on-screen motion — the default for anything without a more specific curve. */
    val easingStandard = BasisEasing(0.2f, 0.0f, 0f, 1.0f)

    /** Entering/settling elements — starts fast, eases into its final position. */
    val easingDecelerate = BasisEasing(0f, 0f, 0f, 1f)

    /** Exiting/dismissing elements — starts slow, accelerates out. */
    val easingAccelerate = BasisEasing(0.3f, 0f, 1f, 1f)

    /** High-emphasis, expressive motion for hero transitions and attention-drawing elements. */
    val easingEmphasized = BasisEasing(0.05f, 0.7f, 0.1f, 1.0f)
}

/**
 * @constructor Creates a spring with the given damping ratio and stiffness.
 * @param dampingRatio The damping ratio of the spring. Lower values mean slower settling.
 * @param stiffness The stiffness of the spring. Higher values mean increased resistance to displacement and faster settling.
  */
data class BasisSpring(val dampingRatio: Float, val stiffness: Float)

/** Available spring configurations. */
object BasisSpringTokens {
    /** Natural, gesture-driven settling with no overshoot. */
    val springStandard = BasisSpring(dampingRatio = 0.8f, stiffness = 380f)

    /** Overshoots and settles — playful interactions, reaction animations. */
    val springBouncy = BasisSpring(dampingRatio = 0.4f, stiffness = 380f)

    /** Critically damped and stiff — snappy, immediate gesture-driven snapping. */
    val springStiff = BasisSpring(dampingRatio = 1.0f, stiffness = 600f)
}

/** Delay offset between consecutive elements in a staggered/cascading entrance, in milliseconds. */
const val staggerDelay = 40

/** Utility function to get the appropriate motion duration based on the reduced motion setting.
 * @param duration The original duration in milliseconds.
 * @param reducedMotionEnabled Whether the user has enabled reduced motion. Defaults to false.
 * @return The adjusted duration in milliseconds. If reduced motion is enabled, returns 1ms; otherwise, returns the original duration.
 */
fun motionDuration(duration: Int, reducedMotionEnabled: Boolean = false): Int =
    if (reducedMotionEnabled) 1 else duration