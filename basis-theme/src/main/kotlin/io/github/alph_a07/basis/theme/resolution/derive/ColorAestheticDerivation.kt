package io.github.alph_a07.basis.theme.resolution.derive

import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.resolution.domain.NEUTRAL_HUE_DEGREES
import io.github.alph_a07.basis.theme.resolution.domain.PriorVector
import io.github.alph_a07.basis.theme.resolution.domain.SynthesizedChroma
import kotlin.math.abs
import kotlin.math.atan2
import kotlin.math.cos
import kotlin.math.hypot
import kotlin.math.sign
import kotlin.math.sin

/**
 * Synthesizes a neutral hue from domain baseline, interaction priors, and mood warmth.
 *
 * Domain hues are averaged using a circular mean across the 360-degree color wheel. Warmth rotates
 * along the shortest circular arc toward the warm amber anchor (65°).
 *
 * @param prior Prior vector carrying interaction and domain influences.
 * @param domains Set of selected product domains.
 * @param effectiveWarmth Warmth setting in `[-1.0, 1.0]`.
 * @return Synthesized neutral hue in OKLCH degrees.
 */
internal fun synthesizeNeutralHue(
    prior: PriorVector,
    domains: Set<ProductDomain>,
    effectiveWarmth: Float,
): Float {
    val domainBaselineHue =
        if (domains.isEmpty()) {
            NEUTRAL_HUE_DEGREES
        } else {
            val anchors = domains.map { domainHueAnchor(it) }
            circularMean(anchors)
        }

    val interactionHueDelta = prior.socialPresence * SOCIAL_HUE_PULL + prior.mediaRichness * MEDIA_HUE_PULL
    val baseWithInteractions = normalizeHue(domainBaselineHue + interactionHueDelta)
    return applyWarmth(baseWithInteractions, effectiveWarmth)
}

/**
 * Synthesizes chromas across ColorTokens role axes from the effective aesthetic chroma axis.
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

private fun domainHueAnchor(domain: ProductDomain): Float = when (domain) {
    ProductDomain.Finance -> FINANCE_HUE
    ProductDomain.Health -> HEALTH_HUE
    ProductDomain.Social -> SOCIAL_HUE
    ProductDomain.Productivity -> PRODUCTIVITY_HUE
    ProductDomain.Commerce -> COMMERCE_HUE
    ProductDomain.Media -> MEDIA_HUE
    ProductDomain.Education -> EDUCATION_HUE
    ProductDomain.Travel -> TRAVEL_HUE
    ProductDomain.Utilities -> UTILITIES_HUE
    ProductDomain.Other -> OTHER_HUE
}

private fun lerp(start: Float, stop: Float, fraction: Float): Float = start + (stop - start) * fraction

private const val FINANCE_HUE: Float = 210f
private const val HEALTH_HUE: Float = 160f
private const val SOCIAL_HUE: Float = 295f
private const val PRODUCTIVITY_HUE: Float = 230f
private const val COMMERCE_HUE: Float = 30f
private const val MEDIA_HUE: Float = 270f
private const val EDUCATION_HUE: Float = 195f
private const val TRAVEL_HUE: Float = 185f
private const val UTILITIES_HUE: Float = 240f
private const val OTHER_HUE: Float = 255f

private const val SOCIAL_HUE_PULL: Float = 8f
private const val MEDIA_HUE_PULL: Float = -6f
private const val WARMTH_HUE_RANGE: Float = 25f
private const val WARM_HUE_ANCHOR: Float = 65f

private const val DEGREES_FULL_CIRCLE: Float = 360f
private const val DEGREES_HALF_CIRCLE: Float = 180f
private const val CIRCULAR_SUM_EPSILON: Double = 1e-4

private const val MAX_SURFACE_CHROMA: Float = 0.015f
private const val MAX_CONTENT_CHROMA: Float = 0.06f
private const val MAX_ICON_CHROMA: Float = 0.07f
private const val MAX_BORDER_CHROMA: Float = 0.03f
private const val MAX_SELECTION_CHROMA: Float = 0.08f
private const val MAX_FOCUS_CHROMA: Float = 0.14f
private const val MAX_BRAND_CHROMA: Float = 0.12f
