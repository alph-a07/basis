package io.github.alph_a07.basis.theme.resolution.domain

/**
 * Weak-coupling gain applied to prior-derived biases.
 *
 * Unspecified gain when mood is fully unspecified, else specified gain, so
 * explicit mood setpoints dominate magnitude over domain priors.
 */
@Suppress("MagicNumber")
public enum class PriorGain(public val value: Float) {
    /** Mood fully unspecified: priors speak louder. */
    UNSPECIFIED(0.55f),

    /** Any mood signal present: priors step back. */
    SPECIFIED(0.35f),
}
