package io.github.alph_a07.basis.theme.resolution.constants

import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec

/** Foundational base token schema for a single version of the theme resolution engine. */
internal data class BaseSchema(
    val version: Int,
    val spacing: FloatArray,
    val radiusLevels: FloatArray,
    val depth: List<DepthSpec>,
    val iconSizes: FloatArray,
    val avatarSizes: FloatArray,
    val controlSizes: FloatArray,
    val dotSizes: FloatArray,
    val typeMetrics: BaseTypeMetrics,
    val motion: MotionTokens,
    val lightNeutrals: BaseNeutrals,
    val darkNeutrals: BaseNeutrals,
    val statusLight: BaseStatus,
    val statusDark: BaseStatus,
) {
    /** Human-readable version tag. */
    override fun toString(): String = "BaseSchema(v=$version)"

    /** Equality compares version + content; arrays compared structurally. */
    @Suppress("CyclomaticComplexMethod")
    override fun equals(other: Any?): Boolean {
        if (this === other) {
            return true
        }

        if (other !is BaseSchema) {
            return false
        }

        return version == other.version &&
            spacing.contentEquals(other.spacing) &&
            radiusLevels.contentEquals(other.radiusLevels) &&
            depth == other.depth &&
            iconSizes.contentEquals(other.iconSizes) &&
            avatarSizes.contentEquals(other.avatarSizes) &&
            controlSizes.contentEquals(other.controlSizes) &&
            dotSizes.contentEquals(other.dotSizes) &&
            typeMetrics == other.typeMetrics &&
            motion == other.motion &&
            lightNeutrals == other.lightNeutrals &&
            darkNeutrals == other.darkNeutrals &&
            statusLight == other.statusLight &&
            statusDark == other.statusDark
    }

    override fun hashCode(): Int {
        var result = version

        result = 31 * result + spacing.contentHashCode()
        result = 31 * result + radiusLevels.contentHashCode()
        result = 31 * result + depth.hashCode()
        result = 31 * result + iconSizes.contentHashCode()
        result = 31 * result + avatarSizes.contentHashCode()
        result = 31 * result + controlSizes.contentHashCode()
        result = 31 * result + dotSizes.contentHashCode()
        result = 31 * result + typeMetrics.hashCode()
        result = 31 * result + motion.hashCode()
        result = 31 * result + lightNeutrals.hashCode()
        result = 31 * result + darkNeutrals.hashCode()
        result = 31 * result + statusLight.hashCode()
        result = 31 * result + statusDark.hashCode()

        return result
    }
}

/** Default typography base metrics. */
internal data class BaseTypeMetrics(
    val structureSizeDp: Float,
    val contentSizeDp: Float,
    val metadataSizeDp: Float,
    val weight: Int,
    val lineHeight: Float,
    val letterSpacingEm: Float,
)

/** Dual-mode neutral L/C base targets (lightness / chroma). */
internal data class BaseNeutrals(
    val surfaceL: Float,
    val surfaceC: Float,
    val contentL: Float,
    val contentC: Float,
)

/** Status L/C base targets for one mode (positive / negative / caution / info). */
internal data class BaseStatus(
    val positiveSurfaceL: Float,
    val positiveContentL: Float,
    val negativeSurfaceL: Float,
    val negativeContentL: Float,
    val cautionSurfaceL: Float,
    val cautionContentL: Float,
    val infoSurfaceL: Float,
    val infoContentL: Float,
)
