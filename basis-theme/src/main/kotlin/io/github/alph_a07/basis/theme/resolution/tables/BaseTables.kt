package io.github.alph_a07.basis.theme.resolution.tables

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec

/** Base tables specifying foundational token scales, metrics, and colors across versions. */
internal object BaseTables {
    /** Current locked version of the base tables. */
    const val CURRENT: Int = 1

    /**
     * Retrieves the base tables for a given [version].
     *
     * @param version Base table version; defaults to [CURRENT].
     * @return The versioned [BaseSchema].
     * @throws IllegalArgumentException if the version is unknown.
     */
    @Suppress("LongMethod", "MagicNumber")
    fun get(version: Int = CURRENT): BaseSchema {
        require(version == CURRENT) { "Unknown BaseTables version: $version" }

        return BaseSchema(
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
                BaseTypeMetrics(
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
                BaseNeutrals(
                    surfaceL = 0.98f,
                    surfaceC = 0.01f,
                    contentL = 0.20f,
                    contentC = 0.05f,
                ),
            darkNeutrals =
                BaseNeutrals(
                    surfaceL = 0.16f,
                    surfaceC = 0.01f,
                    contentL = 0.93f,
                    contentC = 0.05f,
                ),
            statusLight =
                BaseStatus(
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
                BaseStatus(
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
