package io.github.alph_a07.basis.theme.tokens.color

import io.github.alph_a07.basis.theme.color.Oklch
import io.github.alph_a07.basis.theme.color.OklchGradient

/** Semantic color tree with OKLCH leaves. */
public data class ColorTokens(
    public val surface: SurfaceColors,
    public val content: ContentColors,
    public val icon: IconColors,
    public val border: BorderColors,
    public val selection: SelectionColors,
    public val focus: FocusColors,
    public val positive: StatusColors,
    public val negative: StatusColors,
    public val caution: StatusColors,
    public val info: StatusColors,
    public val gradient: GradientColors,
    public val brand: BrandColors,
)

/**
 * Surface fills, from recessed through inverse.
 *
 * @property default Primary background.
 * @property elevated Raised background above [default].
 * @property recessed Sunken background below [default].
 * @property inverse High-inversion surface pairing with `content.inverse`.
 */
public data class SurfaceColors(
    public val default: Oklch,
    public val elevated: Oklch,
    public val recessed: Oklch,
    public val inverse: Oklch,
)

/**
 * Text content colors.
 *
 * @property default Primary text on surfaces.
 * @property muted Secondary text on surfaces.
 * @property inverse Text on [SurfaceColors.inverse].
 */
public data class ContentColors(
    public val default: Oklch,
    public val muted: Oklch,
    public val inverse: Oklch,
)

/**
 * Icon tints mirroring content roles.
 *
 * @property default Primary icon tint.
 * @property muted Secondary icon tint.
 * @property inverse Icon tint on [SurfaceColors.inverse].
 */
public data class IconColors(
    public val default: Oklch,
    public val muted: Oklch,
    public val inverse: Oklch,
)

/**
 * Border colors.
 *
 * @property default Standard border.
 * @property muted Subtle border.
 * @property strong Emphasized border.
 * @property inverse Border on [SurfaceColors.inverse].
 */
public data class BorderColors(
    public val default: Oklch,
    public val muted: Oklch,
    public val strong: Oklch,
    public val inverse: Oklch,
)

/**
 * Selection state colors.
 *
 * @property surface Selected background.
 * @property content Content on the selected background.
 * @property border Border of the selected region.
 */
public data class SelectionColors(
    public val surface: Oklch,
    public val content: Oklch,
    public val border: Oklch,
)

/**
 * Focus affordance colors.
 *
 * @property ring Focus ring, detectable on `surface.default`.
 */
public data class FocusColors(
    public val ring: Oklch,
)

/**
 * Shared shape for positive, negative, caution, and info roles.
 *
 * @property surface Status background.
 * @property content Status text meeting contrast on [surface].
 * @property border Status border.
 * @property icon Status icon, equal to [content] unless derivation splits for clarity.
 */
public data class StatusColors(
    public val surface: Oklch,
    public val content: Oklch,
    public val border: Oklch,
    public val icon: Oklch,
)

/**
 * OKLCH gradients.
 *
 * @property brand Brand gradient derived from brand anchors.
 * @property surface Subtle surface gradient from `surface.default` to `surface.elevated`.
 */
public data class GradientColors(
    public val brand: OklchGradient,
    public val surface: OklchGradient,
)

/**
 * Brand-derived anchors retained for diagnostics and categorical generation.
 *
 * @property primary Identity brand anchor after presence mapping and gamut mapping.
 * @property secondary First supporting anchor, null when unspecified.
 * @property tertiary Second supporting anchor, null when unspecified.
 * @property quaternary Third supporting anchor, null when unspecified.
 */
public data class BrandColors(
    public val primary: Oklch,
    public val secondary: Oklch?,
    public val tertiary: Oklch?,
    public val quaternary: Oklch?,
)
