package io.github.alph_a07.basis.theme.intent

/**
 * Intent to drive a mood profile, expressed as a preset and optional per-axis knobs.
 *
 * @property preset Named archetype driving the base mood profile.
 * @property knobs Sparse per-axis biases overlaid on the preset; null axes inherit the preset.
 */
public data class MoodIntent(
    public val preset: MoodPreset? = null,
    public val knobs: MoodKnobs? = null,
)

/** Distinct mood archetypes. */
public enum class MoodPreset {
    /** Balanced defaults with no stylistic lean. */
    Neutral,

    /** Low energy, soft contrast, and quiet motion. */
    Calm,

    /** Restrained, trustworthy, and information-first. */
    Professional,

    /** High chroma, punchy contrast, and forward typography. */
    Bold,

    /** Rounded, lively, and playful. */
    Playful,

    /** Reduced palette, generous space, and minimal ornament. */
    Minimal,

    /** Display-forward typography with expressive color and motion. */
    Expressive,
}

/**
 * Sparse per-axis mood biases, overlaid on the preset profile.
 *
 * Every axis is optional and independent. A present value is clamped into `[-1, 1]` during
 * normalization; `0` is the preset's neutral point for that axis. Non-finite values are rejected
 * and the axis falls back to the preset.
 *
 * @property warmth Cooler toward warmer.
 * @property chroma Muted toward saturated.
 * @property contrast Softer toward punchier; a preference, never an accessibility floor.
 * @property density Airy toward compact.
 * @property roundness Sharper toward rounder.
 * @property typographyExpressiveness Restrained toward display-forward.
 * @property motionEnergy Quiet toward lively.
 * @property playfulness Serious toward playful.
 */
public data class MoodKnobs(
    public val warmth: Float? = null,
    public val chroma: Float? = null,
    public val contrast: Float? = null,
    public val density: Float? = null,
    public val roundness: Float? = null,
    public val typographyExpressiveness: Float? = null,
    public val motionEnergy: Float? = null,
    public val playfulness: Float? = null,
)
