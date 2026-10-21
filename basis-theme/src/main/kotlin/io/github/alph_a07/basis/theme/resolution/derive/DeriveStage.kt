package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.resolution.ResolutionContext

/**
 * Derivation stage scaling and modulating token families per mode.
 */
internal object DeriveStage {
    /**
     * Applies derived weights, shifted neutral hue, and brand anchors across token families for [mode].
     *
     * @param context Resolution context holding theme draft and derived weights.
     * @param mode Target theme mode to derive.
     */
    fun process(context: ResolutionContext, mode: ThemeMode) {
        val draft = requireNotNull(context.drafts[mode])
        val weights = context.weights ?: calculateDerivationWeights(context.profile).also { context.weights = it }
        val neutralHue = draft.neutralHue + weights.neutralHueShiftDegrees
        val brand = context.brand
        val tints = draft.brandTints ?: context.brandTints[mode]

        context.drafts[mode] =
            draft.copy(
                neutralHue = neutralHue,
                color = deriveColorTokens(draft.color, neutralHue, brand, tints, weights),
                typography = deriveTypographyTokens(draft.typography, weights),
                spacing = deriveSpacingTokens(draft.spacing, weights),
                radius = deriveRadiusTokens(draft.radius, weights),
                depth = deriveDepthTokens(draft.depth, weights),
                size = deriveSizeTokens(draft.size, weights),
                motion = deriveMotionTokens(draft.motion, weights),
            )
    }
}
