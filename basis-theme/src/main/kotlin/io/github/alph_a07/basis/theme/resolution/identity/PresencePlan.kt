package io.github.alph_a07.basis.theme.resolution.identity

import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.tokens.color.BrandColors

/**
 * Brand tint strengths a presence tier applies, as OKLCH mix amounts.
 *
 * @property defaultSurface Tint mixed into `surface.default`.
 * @property elevated Tint mixed into `surface.elevated`.
 * @property borderStrong Lean of `border.strong` toward the brand anchor.
 * @property selection Tint mixed into `selection.surface`, shared by every tier.
 */
internal data class PresencePlan(
    val defaultSurface: Float,
    val elevated: Float,
    val borderStrong: Float,
    val selection: Float,
)

/**
 * Resolves the tint strengths for a presence tier.
 *
 * @param presence Presence as specified; null resolves to [DEFAULT_PRESENCE].
 * @param isDark Whether the dark mode slightly raises chroma-bearing tints.
 * @return The mix amounts the derivation stage applies.
 */
internal fun presencePlan(presence: BrandPresence?, isDark: Boolean): PresencePlan {
    val tier = presence ?: DEFAULT_PRESENCE
    val lift = if (isDark) DARK_TINT_LIFT else 1f

    return when (tier) {
        BrandPresence.Subtle -> {
            PresencePlan(0f, 0f, 0f, SUBTLE_SELECTION_TINT * lift)
        }

        BrandPresence.Balanced -> {
            PresencePlan(0f, 0f, 0f, BALANCED_SELECTION_TINT * lift)
        }

        BrandPresence.Strong -> {
            PresencePlan(
                defaultSurface = 0f,
                elevated = STRONG_ELEVATED_TINT * lift,
                borderStrong = STRONG_BORDER_LEAN,
                selection = STRONG_SELECTION_TINT * lift,
            )
        }

        BrandPresence.Dominant -> {
            PresencePlan(
                defaultSurface = DOMINANT_SURFACE_TINT * lift,
                elevated = DOMINANT_ELEVATED_TINT * lift,
                borderStrong = STRONG_BORDER_LEAN,
                selection = DOMINANT_SELECTION_TINT * lift,
            )
        }
    }
}

/**
 * Builds the brand anchor set from the identity inputs.
 *
 * The primary anchor is the converted brand color; supporting anchors fill the remaining slots in
 * the order specified and keep their own hue, so presence never rewrites who the brand is.
 *
 * @param primary Converted brand color, or null when unspecified or rejected.
 * @param supporting Converted supporting colors, at most four.
 * @return Brand anchors retained for diagnostics and categorical generation, or null when no
 * brand color anchors them so derivation falls back to the seed brand.
 */
internal fun brandAnchors(
    primary: io.github.alph_a07.basis.theme.core.color.Oklch?,
    supporting: List<io.github.alph_a07.basis.theme.core.color.Oklch>,
): BrandColors? {
    if (primary == null) {
        return null
    }

    return BrandColors(
        primary = primary,
        secondary = supporting.getOrNull(0),
        tertiary = supporting.getOrNull(1),
        quaternary = supporting.getOrNull(2),
    )
}

/** Presence applied when a brand color exists but presence was not specified. */
internal val DEFAULT_PRESENCE: BrandPresence = BrandPresence.Balanced

/** Selection tint under subtle presence. */
private const val SUBTLE_SELECTION_TINT = 0.12f

/** Selection tint under balanced presence. */
private const val BALANCED_SELECTION_TINT = 0.18f

/** Selection tint under strong presence. */
private const val STRONG_SELECTION_TINT = 0.24f

/** Selection tint under dominant presence. */
private const val DOMINANT_SELECTION_TINT = 0.28f

/** Tint mixed into the default surface under dominant presence. */
private const val DOMINANT_SURFACE_TINT = 0.06f

/** Tint mixed into the elevated surface under strong presence. */
private const val STRONG_ELEVATED_TINT = 0.05f

/** Tint mixed into the elevated surface under dominant presence. */
private const val DOMINANT_ELEVATED_TINT = 0.04f

/** Lean of the strong border toward the brand under strong and dominant presence. */
private const val STRONG_BORDER_LEAN = 0.35f

/** Multiplier raising tint strength in dark mode, where neutrals carry more room for chroma. */
private const val DARK_TINT_LIFT = 1.25f
