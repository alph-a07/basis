package io.github.alph_a07.basis.theme.resolution.constants

import io.github.alph_a07.basis.theme.intent.ProductDomain

/** Neutral hue shared by non-anchor neutrals, borders, and surfaces, in degrees. */
internal const val NEUTRAL_HUE_DEGREES: Float = 255f

/** Hue of positive status roles, in degrees. */
internal const val POSITIVE_HUE: Float = 145f

/** Hue of negative status roles, in degrees. */
internal const val NEGATIVE_HUE: Float = 25f

/** Hue of caution status roles, in degrees. */
internal const val CAUTION_HUE: Float = 85f

/** Hue of informational status roles, in degrees. */
internal const val INFO_HUE: Float = 250f

/** Chroma of a status surface token. */
internal const val STATUS_SURFACE_CHROMA: Float = 0.05f

/** Chroma of a status content token. */
internal const val STATUS_CONTENT_CHROMA: Float = 0.13f

/** Chroma of a status border token. */
internal const val STATUS_BORDER_CHROMA: Float = 0.09f

/** Chroma of the base focus ring. */
internal const val FOCUS_RING_CHROMA: Float = 0.14f

/** Chroma of the base brand anchor. */
internal const val BASE_BRAND_CHROMA: Float = 0.10f

/** Hue anchor degrees on the OKLCH color wheel per product domain. */
internal val DOMAIN_HUE_ANCHORS: Map<ProductDomain, Float> =
    mapOf(
        ProductDomain.Finance to 210f,
        ProductDomain.Health to 160f,
        ProductDomain.Social to 295f,
        ProductDomain.Productivity to 230f,
        ProductDomain.Commerce to 30f,
        ProductDomain.Media to 270f,
        ProductDomain.Education to 195f,
        ProductDomain.Travel to 185f,
        ProductDomain.Utilities to 240f,
        ProductDomain.Other to 255f,
    )

/** Returns the hue anchor in degrees for a given [ProductDomain]. */
internal fun domainHueAnchor(domain: ProductDomain): Float = DOMAIN_HUE_ANCHORS.getValue(domain)

/** Degrees pulled toward magenta for high social presence interaction influences. */
internal const val SOCIAL_HUE_PULL: Float = 8f

/** Degrees pulled toward cyan for high media richness interaction influences. */
internal const val MEDIA_HUE_PULL: Float = -6f

/** Angular rotation range in degrees along the shortest arc toward the warm amber anchor. */
internal const val WARMTH_HUE_RANGE: Float = 25f

/** Warm amber anchor hue in degrees (OKLCH). */
internal const val WARM_HUE_ANCHOR: Float = 65f

/** Maximum neutral surface chroma at highest profile chroma setting. */
internal const val MAX_SURFACE_CHROMA: Float = 0.015f

/** Maximum neutral content chroma at highest profile chroma setting. */
internal const val MAX_CONTENT_CHROMA: Float = 0.06f

/** Maximum icon tint chroma at highest profile chroma setting. */
internal const val MAX_ICON_CHROMA: Float = 0.07f

/** Maximum neutral border chroma at highest profile chroma setting. */
internal const val MAX_BORDER_CHROMA: Float = 0.03f

/** Maximum selection surface chroma at highest profile chroma setting. */
internal const val MAX_SELECTION_CHROMA: Float = 0.08f

/** Maximum focus ring chroma at highest profile chroma setting. */
internal const val MAX_FOCUS_CHROMA: Float = 0.14f

/** Maximum synthesized brand anchor chroma at highest profile chroma setting. */
internal const val MAX_BRAND_CHROMA: Float = 0.12f

/** Lightness of the elevated surface in light mode. */
internal const val ELEVATED_LIGHT: Float = 1f

/** Lightness of the elevated surface in dark mode. */
internal const val ELEVATED_DARK: Float = 0.22f

/** Lightness of the recessed surface in light mode. */
internal const val RECESSED_LIGHT: Float = 0.94f

/** Lightness of the recessed surface in dark mode. */
internal const val RECESSED_DARK: Float = 0.12f

/** Lightness of the inverted surface in light mode. */
internal const val INVERSE_SURFACE_LIGHT: Float = 0.18f

/** Lightness of the inverted surface in dark mode. */
internal const val INVERSE_SURFACE_DARK: Float = 0.92f

/** Lightness of muted content in light mode. */
internal const val MUTED_LIGHT: Float = 0.45f

/** Lightness of muted content in dark mode. */
internal const val MUTED_DARK: Float = 0.70f

/** Lightness of content on the inverted surface in light mode. */
internal const val INVERSE_CONTENT_LIGHT: Float = 0.96f

/** Lightness of content on the inverted surface in dark mode. */
internal const val INVERSE_CONTENT_DARK: Float = 0.18f

/** Lightness of the standard border in light mode. */
internal const val BORDER_LIGHT: Float = 0.82f

/** Lightness of the standard border in dark mode. */
internal const val BORDER_DARK: Float = 0.42f

/** Lightness of the muted border in light mode. */
internal const val BORDER_MUTED_LIGHT: Float = 0.89f

/** Lightness of the muted border in dark mode. */
internal const val BORDER_MUTED_DARK: Float = 0.32f

/** Lightness of the strong border in light mode. */
internal const val BORDER_STRONG_LIGHT: Float = 0.66f

/** Lightness of the strong border in dark mode. */
internal const val BORDER_STRONG_DARK: Float = 0.58f

/** Chroma shared by every border role. */
internal const val BORDER_CHROMA: Float = 0.02f

/** Lightness of the selection surface in light mode. */
internal const val SELECTION_LIGHT: Float = 0.90f

/** Lightness of the selection surface in dark mode. */
internal const val SELECTION_DARK: Float = 0.30f

/** Chroma shared by the selection surface. */
internal const val SELECTION_CHROMA: Float = 0.04f

/** Lightness of content on the selection surface in light mode. */
internal const val SELECTION_CONTENT_LIGHT: Float = 0.25f

/** Lightness of content on the selection surface in dark mode. */
internal const val SELECTION_CONTENT_DARK: Float = 0.92f
