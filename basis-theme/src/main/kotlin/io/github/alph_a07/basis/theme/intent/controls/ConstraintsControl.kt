package io.github.alph_a07.basis.theme.intent.controls

import io.github.alph_a07.basis.theme.core.DpValue

/**
 * Hard constraints controls on the resolved theme.
 *
 * All fields are optional; unspecified floors keep the library defaults.
 *
 * @property minContrast Minimum contrast ratio between content and its backing surface.
 * @property minTouchTarget Minimum interactive edge length.
 * @property spacing Min/max clamps on the spacing ladder, in dp.
 * @property size Min/max clamps on the control-size ladder, in dp.
 * @property radius Min/max clamps on the radius ladder, in dp.
 * @property motion Reduced-motion preference and duration bias.
 * @property typography Minimum readable size and font-scale floor.
 */
public data class ConstraintsControl(
    public val minContrast: ContrastConstraint? = null,
    public val minTouchTarget: TouchTargetConstraint? = null,
    public val spacing: MinMaxLevels? = null,
    public val size: MinMaxLevels? = null,
    public val radius: MinMaxLevels? = null,
    public val motion: MotionConstraint? = null,
    public val typography: TypographyConstraints? = null,
)

/**
 * Minimum WCAG-style contrast ratio, `1..21`, enforced during contrast repair.
 *
 * @property minRatio Smallest allowed ratio between content and surface luminance.
 */
public data class ContrastConstraint(public val minRatio: Float) {
    init {
        require(minRatio.isFinite() && minRatio in MIN_RATIO..MAX_RATIO) {
            "ContrastConstraint.minRatio must be in $MIN_RATIO..$MAX_RATIO, was $minRatio."
        }
    }

    private companion object {
        private const val MIN_RATIO: Float = 1f
        private const val MAX_RATIO: Float = 21f
    }
}

/**
 * Minimum interactive target size; enforcement grows control sizes rather than adding invisible
 * hit slop.
 *
 * @property minSize Smallest allowed interactive edge length, must be positive.
 */
public data class TouchTargetConstraint(public val minSize: DpValue) {
    init {
        require(minSize.value > 0f) { "TouchTargetConstraint.minSize must be positive, was $minSize." }
    }
}

/**
 * Inclusive min/max clamp applied to one scalar ladder; either bound may be omitted.
 *
 * @property min Lower bound in dp, or null for no lower clamp.
 * @property max Upper bound in dp, or null for no upper clamp.
 */
public data class MinMaxLevels(
    public val min: DpValue? = null,
    public val max: DpValue? = null,
) {
    init {
        val lower = min?.value
        val upper = max?.value

        require(lower == null || upper == null || lower <= upper) {
            "MinMaxLevels.min must be <= max, was $min > $max."
        }
    }
}

/**
 * Motion floors applied during enforcement, after mood and duration scaling.
 *
 * @property preferReducedMotion Rewrites every motion spec toward zero-effect linear motion.
 * @property maxDurationBias Bias in `[-1, 1]` capping durations relative to the derived spec;
 * negative shortens, positive extends, null leaves durations untouched.
 */
public data class MotionConstraint(
    public val preferReducedMotion: Boolean = false,
    public val maxDurationBias: Float? = null,
) {
    init {
        val bias = maxDurationBias
        require(bias == null || (bias.isFinite() && bias in MIN_BIAS..MAX_BIAS)) {
            "MotionConstraint.maxDurationBias must be null or in $MIN_BIAS..$MAX_BIAS, was $bias."
        }
    }

    private companion object {
        private const val MIN_BIAS: Float = -1f
        private const val MAX_BIAS: Float = 1f
    }
}

/**
 * Typography floors applied during enforcement.
 *
 * @property minReadableSize Smallest allowed rendered text size, or null for the library default.
 * @property scaleFloor Smallest allowed font-scale factor applied by the host, e.g. `1` for no
 * downsizing; null for no floor.
 */
public data class TypographyConstraints(
    public val minReadableSize: DpValue? = null,
    public val scaleFloor: Float? = null,
) {
    init {
        val floor = scaleFloor
        require(floor == null || (floor.isFinite() && floor >= 0f)) {
            "TypographyConstraints.scaleFloor must be null or finite and >= 0, was $floor."
        }
    }
}
