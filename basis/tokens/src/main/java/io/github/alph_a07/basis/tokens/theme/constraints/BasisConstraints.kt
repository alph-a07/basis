package io.github.alph_a07.basis.tokens.theme.constraints

/**
 * Accessibility requirements that a resolved theme must satisfy.
 *
 * These are mandatory validity requirements rather than preferences. Aesthetic intent cannot
 * silently weaken them: neither Mood, Domain, Identity nor an explicit Appearance customization
 * overrides a requirement declared here. Where a customization and a requirement disagree,
 * resolution either satisfies the requirement or reports that the requested theme is unsatisfiable.
 *
 * @property reducedMotion Whether the product must avoid or reduce non-essential motion.
 *
 *   This is a requirement rather than a Motion token, a Mood dimension or a styling preference,
 *   so it is deliberately not expressed as a duration. Satisfying it does not mean resolving every
 *   motion to a zero duration: resolution may remove a motion, simplify it, substitute a different
 *   pattern, or otherwise reduce its perceptual effect, and the Motion semantic token remains
 *   intact either way. Motion Resolution decides how each motion contract is adapted.
 * @property minimumContrastRatio The smallest contrast ratio that legibly contrasting content must
 *   reach, or `null` to impose no contrast floor beyond the default the resolved theme satisfies.
 *   Which pairs of colors the requirement applies to is a decision Theme Resolution makes when it
 *   validates the candidate theme, not something this input enumerates.
 */
data class BasisAccessibilityConstraints(
    val reducedMotion: Boolean = false,
    val minimumContrastRatio: Float? = null,
) {
    init {
        require(minimumContrastRatio == null || minimumContrastRatio in MIN_CONTRAST_RATIO..MAX_CONTRAST_RATIO) {
            "minimumContrastRatio must be null or " +
                "$MIN_CONTRAST_RATIO..$MAX_CONTRAST_RATIO, got $minimumContrastRatio."
        }
    }

    companion object {
        /**
         * The lowest meaningful contrast ratio: the two colors are indistinguishable.
         *
         * A requirement at this value constrains nothing, so a consumer who wants legibility should
         * state a materially higher ratio.
         */
        const val MIN_CONTRAST_RATIO = 1f

        /** The highest contrast ratio: the two colors are maximally distinguishable. */
        const val MAX_CONTRAST_RATIO = 21f
    }
}

/**
 * The requirements a resolved theme must satisfy to be valid.
 *
 * Constraints are authoritative in a way the other inputs are not. Mood states desired character
 * and Appearance states explicit customization, both of which are expressions of preference;
 * a constraint states what must remain true. A mandatory constraint is therefore never traded away
 * because another input happens to be more explicit, more specific or more strongly expressed.
 *
 * When no constraint is declared, this type defaults to no requirement beyond what a valid theme
 * satisfies on its own, so a consumer who has no accessibility requirements to express can simply
 * omit it.
 *
 * @property accessibility The accessibility requirements that resolution must satisfy.
 */
data class BasisConstraints(
    val accessibility: BasisAccessibilityConstraints = BasisAccessibilityConstraints(),
)
