package io.github.alph_a07.basis.theme.resolution.seed

/**
 * Lightness and chroma targets for one mode's neutral ladder.
 *
 * @property surfaceL Default surface lightness.
 * @property surfaceC Default surface chroma.
 * @property elevatedL Elevated surface lightness.
 * @property recessedL Recessed surface lightness.
 * @property inverseSurfaceL Inverted surface lightness.
 * @property contentL Default content lightness.
 * @property contentC Default content chroma.
 * @property mutedL Muted content lightness.
 * @property inverseContentL Content lightness on the inverted surface.
 * @property borderL Standard border lightness.
 * @property borderMutedL Muted border lightness.
 * @property borderStrongL Strong border lightness.
 * @property borderC Border chroma.
 * @property selectionL Selection surface lightness.
 * @property selectionC Selection surface chroma.
 * @property selectionContentL Content lightness on the selection surface.
 */
internal data class NeutralTargets(
    val surfaceL: Float,
    val surfaceC: Float,
    val elevatedL: Float,
    val recessedL: Float,
    val inverseSurfaceL: Float,
    val contentL: Float,
    val contentC: Float,
    val mutedL: Float,
    val inverseContentL: Float,
    val borderL: Float,
    val borderMutedL: Float,
    val borderStrongL: Float,
    val borderC: Float,
    val selectionL: Float,
    val selectionC: Float,
    val selectionContentL: Float,
) {
    /**
     * Neutral targets for one mode, derived from its versioned [NeutralSeed].
     *
     * @param seed Governance-owned surface and content targets for the mode.
     * @param isLight Whether the targets describe the light mode.
     */
    constructor(seed: NeutralSeed, isLight: Boolean) : this(
        surfaceL = seed.surfaceL,
        surfaceC = seed.surfaceC,
        elevatedL =
            if (isLight) {
                ELEVATED_LIGHT
            } else {
                ELEVATED_DARK
            },
        recessedL =
            if (isLight) {
                RECESSED_LIGHT
            } else {
                RECESSED_DARK
            },
        inverseSurfaceL =
            if (isLight) {
                INVERSE_SURFACE_LIGHT
            } else {
                INVERSE_SURFACE_DARK
            },
        contentL = seed.contentL,
        contentC = seed.contentC,
        mutedL =
            if (isLight) {
                MUTED_LIGHT
            } else {
                MUTED_DARK
            },
        inverseContentL =
            if (isLight) {
                INVERSE_CONTENT_LIGHT
            } else {
                INVERSE_CONTENT_DARK
            },
        borderL =
            if (isLight) {
                BORDER_LIGHT
            } else {
                BORDER_DARK
            },
        borderMutedL =
            if (isLight) {
                BORDER_MUTED_LIGHT
            } else {
                BORDER_MUTED_DARK
            },
        borderStrongL =
            if (isLight) {
                BORDER_STRONG_LIGHT
            } else {
                BORDER_STRONG_DARK
            },
        borderC = BORDER_CHROMA,
        selectionL =
            if (isLight) {
                SELECTION_LIGHT
            } else {
                SELECTION_DARK
            },
        selectionC = SELECTION_CHROMA,
        selectionContentL =
            if (isLight) {
                SELECTION_CONTENT_LIGHT
            } else {
                SELECTION_CONTENT_DARK
            },
    )
}

/** Lightness of the elevated surface in light mode. */
private const val ELEVATED_LIGHT = 1f

/** Lightness of the elevated surface in dark mode. */
private const val ELEVATED_DARK = 0.22f

/** Lightness of the recessed surface in light mode. */
private const val RECESSED_LIGHT = 0.94f

/** Lightness of the recessed surface in dark mode. */
private const val RECESSED_DARK = 0.12f

/** Lightness of the inverted surface in light mode. */
private const val INVERSE_SURFACE_LIGHT = 0.18f

/** Lightness of the inverted surface in dark mode. */
private const val INVERSE_SURFACE_DARK = 0.92f

/** Lightness of muted content in light mode. */
private const val MUTED_LIGHT = 0.45f

/** Lightness of muted content in dark mode. */
private const val MUTED_DARK = 0.70f

/** Lightness of content on the inverted surface in light mode. */
private const val INVERSE_CONTENT_LIGHT = 0.96f

/** Lightness of content on the inverted surface in dark mode. */
private const val INVERSE_CONTENT_DARK = 0.18f

/** Lightness of the standard border in light mode. */
private const val BORDER_LIGHT = 0.82f

/** Lightness of the standard border in dark mode. */
private const val BORDER_DARK = 0.42f

/** Lightness of the muted border in light mode. */
private const val BORDER_MUTED_LIGHT = 0.89f

/** Lightness of the muted border in dark mode. */
private const val BORDER_MUTED_DARK = 0.32f

/** Lightness of the strong border in light mode. */
private const val BORDER_STRONG_LIGHT = 0.66f

/** Lightness of the strong border in dark mode. */
private const val BORDER_STRONG_DARK = 0.58f

/** Chroma shared by every border role. */
private const val BORDER_CHROMA = 0.02f

/** Lightness of the selection surface in light mode. */
private const val SELECTION_LIGHT = 0.90f

/** Lightness of the selection surface in dark mode. */
private const val SELECTION_DARK = 0.30f

/** Chroma shared by the selection surface. */
private const val SELECTION_CHROMA = 0.04f

/** Lightness of content on the selection surface in light mode. */
private const val SELECTION_CONTENT_LIGHT = 0.25f

/** Lightness of content on the selection surface in dark mode. */
private const val SELECTION_CONTENT_DARK = 0.92f
