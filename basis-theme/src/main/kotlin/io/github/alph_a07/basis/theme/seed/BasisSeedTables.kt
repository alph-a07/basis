package io.github.alph_a07.basis.theme.seed

import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec

/** Seed tables for a single version of the Basis design system. */
public data class BasisSeedTables(
    public val version: Int,
    public val spacing: FloatArray,
    public val radiusLevels: FloatArray,
    public val depth: List<DepthSpec>,
    public val iconSizes: FloatArray,
    public val avatarSizes: FloatArray,
    public val controlSizes: FloatArray,
    public val dotSizes: FloatArray,
    public val typeMetrics: TypeSeedMetrics,
    public val motion: MotionTokens,
    public val lightNeutrals: NeutralSeed,
    public val darkNeutrals: NeutralSeed,
    public val statusLight: StatusSeed,
    public val statusDark: StatusSeed,
) {
    /** Human-readable version tag. */
    override fun toString(): String = "BasisSeedTables(v=$version)"

    /** Equality compares version + content; arrays compared structurally. */
    override fun equals(other: Any?): Boolean {
        if (this === other) {
            return true
        }

        if (other !is BasisSeedTables) {
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

/** Default typography derivation metrics. */
public data class TypeSeedMetrics(
    public val structureSizeDp: Float,
    public val contentSizeDp: Float,
    public val metadataSizeDp: Float,
    public val weight: Int,
    public val lineHeight: Float,
    public val letterSpacingEm: Float,
)

/** Dual-mode neutral L/C targets (lightness / chroma). */
public data class NeutralSeed(
    public val surfaceL: Float,
    public val surfaceC: Float,
    public val contentL: Float,
    public val contentC: Float,
)

/** Status L/C targets for one mode (positive / negative / caution / info). */
public data class StatusSeed(
    public val positiveSurfaceL: Float,
    public val positiveContentL: Float,
    public val negativeSurfaceL: Float,
    public val negativeContentL: Float,
    public val cautionSurfaceL: Float,
    public val cautionContentL: Float,
    public val infoSurfaceL: Float,
    public val infoContentL: Float,
)
