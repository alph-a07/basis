package io.github.alph_a07.basis.tokens.motion

/**
 * The reference resolutions of the motion tokens.
 *
 * These give a theme something concrete to animate before Theme Resolution runs. A resolved theme
 * may replace any of them, provided the result satisfies the applicable [BasisMotionConstraints].
 */
object BasisMotionTokens {
    /** The default resolution of every motion token, keyed by contract. */
    val defaults: Map<BasisMotionToken, BasisResolvedMotion> = mapOf(
        BasisMotionToken.Feedback to BasisResolvedMotion(
            token = BasisMotionToken.Feedback,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Opacity, BasisMotionTiming.Timed(50)),
            ),
        ),
        BasisMotionToken.StateTransition to BasisResolvedMotion(
            token = BasisMotionToken.StateTransition,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Color, BasisMotionTiming.Timed(200)),
                BasisMotionTrack(BasisMotionProperty.Shape, BasisMotionTiming.Timed(200)),
            ),
        ),
        BasisMotionToken.Transformation to BasisResolvedMotion(
            token = BasisMotionToken.Transformation,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Color, BasisMotionTiming.Timed(200)),
                BasisMotionTrack(BasisMotionProperty.Shape, BasisMotionTiming.Timed(200)),
                BasisMotionTrack(BasisMotionProperty.Size, BasisMotionTiming.Timed(200)),
            ),
        ),
        BasisMotionToken.Expansion to BasisResolvedMotion(
            token = BasisMotionToken.Expansion,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Size, BasisMotionTiming.Timed(300)),
                BasisMotionTrack(BasisMotionProperty.Position, BasisMotionTiming.Timed(300)),
            ),
        ),
        BasisMotionToken.Reposition to BasisResolvedMotion(
            token = BasisMotionToken.Reposition,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Position, BasisMotionTiming.Spring(0.8f, 380f)),
            ),
        ),
        BasisMotionToken.Emphasis to BasisResolvedMotion(
            token = BasisMotionToken.Emphasis,
            tracks = listOf(
                BasisMotionTrack(BasisMotionProperty.Size, BasisMotionTiming.Timed(300)),
                BasisMotionTrack(BasisMotionProperty.Opacity, BasisMotionTiming.Timed(300)),
            ),
        ),
    )

    /**
     * Applies [constraints] to [motion], removing animation where reduced motion is required.
     *
     * Reduced motion is honoured by replacing every track's timing with
     * [BasisMotionTiming.Immediate] rather than by setting durations to zero. A zero-duration
     * animation still schedules frames and completes asynchronously, which leaves a component
     * waiting on something the user asked not to see; [BasisMotionTiming.Immediate] expresses the
     * value change at the point of application instead.
     *
     * @param motion The resolved motion to adjust.
     * @param constraints The accessibility constraints to satisfy.
     * @return The motion to animate with.
     */
    fun applyConstraints(
        motion: BasisResolvedMotion,
        constraints: BasisMotionConstraints,
    ): BasisResolvedMotion =
        if (!constraints.reducedMotion) {
            motion
        } else {
            motion.copy(
                tracks = motion.tracks.map { it.copy(timing = BasisMotionTiming.Immediate) },
            )
        }
}
