package io.github.alph_a07.basis.tokens.motion

/** The animation duration scale, in milliseconds. Locked in the governance sheet. */
object BasisMotionDurationTokens {
    /** Ultra-fast animation duration (50ms) for instantaneous micro-interactions and tactile state changes. */
    const val DURATION_INSTANT = 50

    /** Fast animation duration (100ms) for small UI transitions, switches, and toggle animations. */
    const val DURATION_FAST = 100

    /** Standard animation duration (200ms) for component transitions, expansions, and menu reveals. */
    const val DURATION_NORMAL = 200

    /** Extended animation duration (300ms) for screen transitions, bottom sheets, and full modal entries. */
    const val DURATION_SLOW = 300

    /** Long animation duration (500ms) for complex choreography and full-screen morphing transitions. */
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
    /** Standard cubic-bezier easing curve for general on-screen motion and natural element transitions. */
    val easingStandard = BasisEasing(0.2f, 0.0f, 0f, 1.0f)

    /** Deceleration easing curve for elements entering the screen or settling into final positions. */
    val easingDecelerate = BasisEasing(0f, 0f, 0f, 1f)

    /** Acceleration easing curve for elements exiting the screen or dismissing from view. */
    val easingAccelerate = BasisEasing(0.3f, 0f, 1f, 1f)

    /** Expressive easing curve for high-emphasis transitions, hero motions, and attention-drawing elements. */
    val easingEmphasized = BasisEasing(0.05f, 0.7f, 0.1f, 1.0f)
}

/**
 * @constructor Creates a spring with the given damping ratio and stiffness.
 * @param dampingRatio The damping ratio of the spring. Lower values mean slower settling.
 * @param stiffness The stiffness of the spring. Higher values mean increased resistance to
 *   displacement and faster settling.
 */
data class BasisSpring(val dampingRatio: Float, val stiffness: Float)

/** Available spring configurations. */
object BasisSpringTokens {
    /** Standard spring physics model providing natural, gesture-driven motion and smooth settling. */
    val springStandard = BasisSpring(dampingRatio = 0.8f, stiffness = 380f)

    /** Expressive spring physics model with bounce overshoot for playful interactions and reaction animations. */
    val springBouncy = BasisSpring(dampingRatio = 0.4f, stiffness = 380f)

    /** High-stiffness spring physics model for snappy, responsive snap-to-position gesture interactions. */
    val springStiff = BasisSpring(dampingRatio = 1.0f, stiffness = 600f)
}

/**
 * Choreography delay offset applied between consecutive elements during a cascading entrance.
 *
 * Pair with a duration token to build staggered lists: each item waits this long longer than the
 * previous one.
 */
const val STAGGER_DELAY = 40

/**
 * Resolves a duration token against the user's reduced-motion preference.
 *
 * When reduced motion is enabled the returned duration collapses to a single millisecond rather than
 * zero, so that transition callbacks and sequencing logic still fire in order and the UI never
 * depends on a zero-length animation completing.
 *
 * @param duration The duration token to resolve, in milliseconds.
 * @param reducedMotionEnabled Whether the user has enabled reduced motion. Defaults to false.
 * @return The adjusted duration in milliseconds.
 */
fun motionDuration(duration: Int, reducedMotionEnabled: Boolean = false): Int =
    if (reducedMotionEnabled) 1 else duration
