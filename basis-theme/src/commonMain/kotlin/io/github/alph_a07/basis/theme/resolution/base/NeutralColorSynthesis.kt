package io.github.alph_a07.basis.theme.resolution.base

import io.github.alph_a07.basis.theme.core.format.coerceToFloat32
import io.github.alph_a07.basis.theme.core.format.toFloat32
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.resolution.ThemeProfile
import io.github.alph_a07.basis.theme.resolution.constants.MAX_BORDER_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.MAX_BRAND_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.MAX_CONTENT_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.MAX_FOCUS_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.MAX_ICON_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.MAX_SELECTION_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.MAX_SURFACE_CHROMA
import io.github.alph_a07.basis.theme.resolution.constants.MEDIA_HUE_PULL
import io.github.alph_a07.basis.theme.resolution.constants.NEUTRAL_HUE_DEGREES
import io.github.alph_a07.basis.theme.resolution.constants.SOCIAL_HUE_PULL
import io.github.alph_a07.basis.theme.resolution.constants.WARMTH_HUE_RANGE
import io.github.alph_a07.basis.theme.resolution.constants.WARM_HUE_ANCHOR
import io.github.alph_a07.basis.theme.resolution.constants.domainHueAnchor
import kotlin.math.PI
import kotlin.math.abs
import kotlin.math.atan2
import kotlin.math.cos
import kotlin.math.hypot
import kotlin.math.sign
import kotlin.math.sin

/**
 * Synthesizes a neutral hue from domain anchors, interaction influences, and mood warmth.
 *
 * Domain hues are averaged using a circular mean across the 360-degree color wheel. Warmth rotates
 * along the shortest circular arc toward the warm amber anchor (65°).
 *
 * @param profile Theme profile carrying interaction and domain influences.
 * @param domains Set of selected product domains.
 * @param effectiveWarmth Warmth setting in `[-1.0, 1.0]`.
 * @return Synthesized neutral hue in OKLCH degrees.
 */
internal fun synthesizeNeutralHue(
    profile: ThemeProfile,
    domains: Set<ProductDomain>,
    effectiveWarmth: Float,
): Float {
    val domainAnchorHue =
        if (domains.isEmpty()) {
            NEUTRAL_HUE_DEGREES
        } else {
            val anchors = domains.map { domainHueAnchor(it) }
            circularMean(anchors)
        }

    val interactionHueDelta = profile.socialPresence * SOCIAL_HUE_PULL + profile.mediaRichness * MEDIA_HUE_PULL
    val baseWithInteractions = normalizeHue(domainAnchorHue + interactionHueDelta)
    return applyWarmth(baseWithInteractions, effectiveWarmth)
}

/**
 * Synthesizes chromas across ColorTokens role axes from the effective profile chroma axis.
 *
 * @param effectiveChroma Chroma setting in `[-1.0, 1.0]`.
 * @return Synthesized chroma values for all role axes.
 */
internal fun synthesizeNeutralChroma(effectiveChroma: Float): SynthesizedChroma {
    val t = ((effectiveChroma.coerceToFloat32().toDouble() + 1.0) / 2.0).coerceIn(0.0, 1.0)
    val surface = (MAX_SURFACE_CHROMA.coerceToFloat32().toDouble() * t).toFloat32()
    val content = (MAX_CONTENT_CHROMA.coerceToFloat32().toDouble() * t).toFloat32()
    val icon = (MAX_ICON_CHROMA.coerceToFloat32().toDouble() * t).toFloat32()
    val border = (MAX_BORDER_CHROMA.coerceToFloat32().toDouble() * t).toFloat32()
    val selection = (MAX_SELECTION_CHROMA.coerceToFloat32().toDouble() * t).toFloat32()
    val focus = (MAX_FOCUS_CHROMA.coerceToFloat32().toDouble() * t).toFloat32()
    val brand = (MAX_BRAND_CHROMA.coerceToFloat32().toDouble() * t).toFloat32()

    return SynthesizedChroma(
        surface = surface,
        content = content,
        icon = icon,
        border = border,
        selection = selection,
        focus = focus,
        brand = brand,
    )
}

private fun circularMean(hues: Collection<Float>): Float {
    if (hues.isEmpty()) return NEUTRAL_HUE_DEGREES
    var sinSum = 0.0
    var cosSum = 0.0
    for (hue in hues) {
        val rad = hue.toDouble() * (PI / 180.0)
        sinSum += sin(rad)
        cosSum += cos(rad)
    }
    if (hypot(sinSum, cosSum) < CIRCULAR_SUM_EPSILON) {
        return NEUTRAL_HUE_DEGREES
    }
    val meanRad = atan2(sinSum, cosSum)
    val deg = ((meanRad * 180.0) / PI).toFloat()
    return normalizeHue(deg)
}

private fun applyWarmth(hue: Float, warmth: Float): Float {
    if (warmth == 0f) return normalizeHue(hue)
    val deltaToWarm = shortestAngleDelta(from = hue, to = WARM_HUE_ANCHOR)
    val shift =
        if (warmth > 0f) {
            val step = minOf(abs(deltaToWarm), WARMTH_HUE_RANGE)
            sign(deltaToWarm) * step * warmth
        } else {
            -sign(deltaToWarm) * WARMTH_HUE_RANGE * abs(warmth)
        }
    return normalizeHue(hue + shift)
}

private fun shortestAngleDelta(from: Float, to: Float): Float {
    val diff = (to - from) % DEGREES_FULL_CIRCLE
    return when {
        diff > DEGREES_HALF_CIRCLE -> diff - DEGREES_FULL_CIRCLE
        diff < -DEGREES_HALF_CIRCLE -> diff + DEGREES_FULL_CIRCLE
        else -> diff
    }
}

private fun normalizeHue(hue: Float): Float = ((hue % DEGREES_FULL_CIRCLE) + DEGREES_FULL_CIRCLE) % DEGREES_FULL_CIRCLE

private const val DEGREES_FULL_CIRCLE: Float = 360f
private const val DEGREES_HALF_CIRCLE: Float = 180f
private const val CIRCULAR_SUM_EPSILON: Double = 1e-4
