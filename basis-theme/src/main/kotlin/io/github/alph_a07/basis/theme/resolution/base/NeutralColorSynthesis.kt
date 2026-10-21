package io.github.alph_a07.basis.theme.resolution.base

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
    val t = ((effectiveChroma + 1f) / 2f).coerceIn(0f, 1f)
    val surface = lerp(0f, MAX_SURFACE_CHROMA, t)
    val content = lerp(0f, MAX_CONTENT_CHROMA, t)
    val icon = lerp(0f, MAX_ICON_CHROMA, t)
    val border = lerp(0f, MAX_BORDER_CHROMA, t)
    val selection = lerp(0f, MAX_SELECTION_CHROMA, t)
    val focus = lerp(0f, MAX_FOCUS_CHROMA, t)
    val brand = lerp(0f, MAX_BRAND_CHROMA, t)

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
        val rad = Math.toRadians(hue.toDouble())
        sinSum += sin(rad)
        cosSum += cos(rad)
    }
    if (hypot(sinSum, cosSum) < CIRCULAR_SUM_EPSILON) {
        return NEUTRAL_HUE_DEGREES
    }
    val meanRad = atan2(sinSum, cosSum)
    val deg = Math.toDegrees(meanRad).toFloat()
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

private fun lerp(start: Float, stop: Float, fraction: Float): Float = start + (stop - start) * fraction

private const val DEGREES_FULL_CIRCLE: Float = 360f
private const val DEGREES_HALF_CIRCLE: Float = 180f
private const val CIRCULAR_SUM_EPSILON: Double = 1e-4
