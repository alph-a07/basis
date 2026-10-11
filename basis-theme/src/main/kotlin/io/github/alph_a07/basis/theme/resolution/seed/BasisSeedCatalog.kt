package io.github.alph_a07.basis.theme.resolution.seed

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.resolution.seed.BasisSeedCatalog.CURRENT
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec

/** A catalog of versioned seed tables for the Basis design system. */
public object BasisSeedCatalog {
    /** Current locked version of the seed tables. */
    public const val CURRENT: Int = 1

    /**
     * Retrieve tables for a given version.
     *
     * @param version Seed table version; defaults to [CURRENT].
     * @return The versioned [BasisSeedTables].
     * @throws IllegalArgumentException if the version is unknown.
     */
    @Suppress("LongMethod", "MagicNumber")
    public fun tables(version: Int = CURRENT): BasisSeedTables {
        require(version == CURRENT) { "Unknown BasisSeedCatalog version: $version" }

        return BasisSeedTables(
            version = version,
            spacing = floatArrayOf(4f, 8f, 12f, 16f, 24f, 32f, 40f, 48f),
            radiusLevels = floatArrayOf(2f, 4f, 6f, 8f, 12f, 16f, 24f, 32f),
            depth =
                List(4) {
                    DepthSpec(
                        elevation = DpValue(2f),
                        shadowAlpha = 0.2f,
                        shadowBlur = DpValue(4f),
                        shadowYOffset = DpValue(1f),
                    )
                },
            iconSizes = floatArrayOf(12f, 16f, 20f, 24f, 32f),
            avatarSizes = floatArrayOf(24f, 32f, 40f, 56f, 72f),
            controlSizes = floatArrayOf(32f, 40f, 48f, 56f, 64f),
            dotSizes = floatArrayOf(6f, 8f, 10f),
            typeMetrics =
                TypeSeedMetrics(
                    structureSizeDp = 24f,
                    contentSizeDp = 16f,
                    metadataSizeDp = 12f,
                    weight = 400,
                    lineHeight = 1.25f,
                    letterSpacingEm = -0.01f,
                ),
            motion =
                MotionTokens(
                    feedback = MotionSpec(DurationValue(200L), EasingKind.Standard),
                    stateTransition = MotionSpec(DurationValue(200L), EasingKind.Standard),
                    transformation = MotionSpec(DurationValue(200L), EasingKind.Standard),
                    expansion = MotionSpec(DurationValue(200L), EasingKind.Standard),
                    reposition = MotionSpec(DurationValue(200L), EasingKind.Standard),
                    emphasis = MotionSpec(DurationValue(200L), EasingKind.Standard),
                ),
            lightNeutrals =
                NeutralSeed(
                    surfaceL = 0.98f,
                    surfaceC = 0.01f,
                    contentL = 0.20f,
                    contentC = 0.05f,
                ),
            darkNeutrals =
                NeutralSeed(
                    surfaceL = 0.16f,
                    surfaceC = 0.01f,
                    contentL = 0.93f,
                    contentC = 0.05f,
                ),
            statusLight =
                StatusSeed(
                    positiveSurfaceL = 0.94f,
                    positiveContentL = 0.35f,
                    negativeSurfaceL = 0.94f,
                    negativeContentL = 0.35f,
                    cautionSurfaceL = 0.94f,
                    cautionContentL = 0.35f,
                    infoSurfaceL = 0.94f,
                    infoContentL = 0.35f,
                ),
            statusDark =
                StatusSeed(
                    positiveSurfaceL = 0.28f,
                    positiveContentL = 0.85f,
                    negativeSurfaceL = 0.28f,
                    negativeContentL = 0.85f,
                    cautionSurfaceL = 0.28f,
                    cautionContentL = 0.85f,
                    infoSurfaceL = 0.28f,
                    infoContentL = 0.85f,
                ),
        )
    }
}
