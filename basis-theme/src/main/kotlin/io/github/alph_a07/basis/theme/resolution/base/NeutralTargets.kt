package io.github.alph_a07.basis.theme.resolution.base

import io.github.alph_a07.basis.theme.resolution.constants.BORDER_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.BORDER_DARK
import io.github.alph_a07.basis.theme.resolution.constants.BORDER_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.BORDER_MUTED_DARK
import io.github.alph_a07.basis.theme.resolution.constants.BORDER_MUTED_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.BORDER_STRONG_DARK
import io.github.alph_a07.basis.theme.resolution.constants.BORDER_STRONG_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.BaseNeutrals
import io.github.alph_a07.basis.theme.resolution.constants.ELEVATED_DARK
import io.github.alph_a07.basis.theme.resolution.constants.ELEVATED_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.INVERSE_CONTENT_DARK
import io.github.alph_a07.basis.theme.resolution.constants.INVERSE_CONTENT_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.INVERSE_SURFACE_DARK
import io.github.alph_a07.basis.theme.resolution.constants.INVERSE_SURFACE_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.MUTED_DARK
import io.github.alph_a07.basis.theme.resolution.constants.MUTED_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.RECESSED_DARK
import io.github.alph_a07.basis.theme.resolution.constants.RECESSED_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.SELECTION_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.SELECTION_CONTENT_DARK
import io.github.alph_a07.basis.theme.resolution.constants.SELECTION_CONTENT_LIGHT
import io.github.alph_a07.basis.theme.resolution.constants.SELECTION_DARK
import io.github.alph_a07.basis.theme.resolution.constants.SELECTION_LIGHT

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
     * Neutral targets for one mode, derived from its versioned [BaseNeutrals].
     *
     * @param base Governance-owned surface and content targets for the mode.
     * @param isLight Whether the targets describe the light mode.
     */
    constructor(base: BaseNeutrals, isLight: Boolean) : this(
        surfaceL = base.surfaceL,
        surfaceC = base.surfaceC,
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
        contentL = base.contentL,
        contentC = base.contentC,
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
