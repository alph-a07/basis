package io.github.alph_a07.basis.tokens.vocabulary.motion

/**
 * How one track of a resolved motion progresses over time.
 *
 * Duration and curve are properties of the resolved motion rather than public tokens, because the
 * Motion family deliberately does not expose its mechanics as vocabulary.
 */
sealed interface BasisMotionTiming {
    /**
     * A fixed-length transition.
     *
     * @property durationMs The duration in milliseconds.
     */
    data class Timed(val durationMs: Int) : BasisMotionTiming {
        init {
            require(durationMs > 0) { "A timed motion needs a positive duration, got $durationMs." }
        }
    }

    /**
     * A spring-driven transition, which settles rather than finishing at a fixed instant.
     *
     * @property dampingRatio How quickly the spring settles. Below 1 the spring overshoots.
     * @property stiffness How strongly the spring resists displacement.
     */
    data class Spring(val dampingRatio: Float, val stiffness: Float) : BasisMotionTiming {
        init {
            require(dampingRatio > 0f) { "A spring needs a positive damping ratio, got $dampingRatio." }
            require(stiffness > 0f) { "A spring needs positive stiffness, got $stiffness." }
        }
    }

    /**
     * No interpolation at all: the value changes immediately.
     *
     * This is how a reduced-motion requirement removes an animation rather than shortening it.
     * Modelled as its own timing because a zero-length animation still schedules frames and
     * completes asynchronously, whereas [Immediate] completes at the point of application.
     */
    data object Immediate : BasisMotionTiming
}

/**
 * One track of a resolved motion: a single animatable property and how it progresses.
 *
 * @property property The animatable property this track drives.
 * @property timing How that property progresses.
 */
data class BasisMotionTrack(
    val property: BasisMotionProperty,
    val timing: BasisMotionTiming,
)

/**
 * The resolved value of one motion token: one or more coordinated tracks.
 *
 * A motion contract does not necessarily resolve to a single primitive animation. It resolves to
 * the set of properties that change together to express the intent, each with its own timing, and
 * a renderer treats those tracks as one coherent motion instance: they start and end together and
 * are cancelled as one operation, while retaining independent durations and curves.
 *
 * @property token The motion contract this value was resolved from.
 * @property tracks The tracks that together express the contract.
 */
data class ResolvedMotion(
    val token: BasisMotionToken,
    val tracks: List<BasisMotionTrack>,
) {
    init {
        require(tracks.isNotEmpty()) {
            "A resolved motion needs at least one track, got none for $token."
        }
    }
}
