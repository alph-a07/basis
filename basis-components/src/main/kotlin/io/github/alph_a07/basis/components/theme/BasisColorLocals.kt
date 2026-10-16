package io.github.alph_a07.basis.components.theme

import androidx.compose.ui.graphics.Color
import io.github.alph_a07.basis.theme.tokens.color.BorderColors
import io.github.alph_a07.basis.theme.tokens.color.BrandColors
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.ContentColors
import io.github.alph_a07.basis.theme.tokens.color.FocusColors
import io.github.alph_a07.basis.theme.tokens.color.IconColors
import io.github.alph_a07.basis.theme.tokens.color.SelectionColors
import io.github.alph_a07.basis.theme.tokens.color.StatusColors
import io.github.alph_a07.basis.theme.tokens.color.SurfaceColors

/**
 * Compose-ready color tree converted from the OKLCH [ColorTokens] at the `BasisTheme` entry
 * boundary.
 *
 * Mirrors the [ColorTokens] structure exactly so component authors navigate the same mental model
 * regardless of whether they hold the OKLCH source or the Compose values. Gradients are excluded;
 * consumers requiring gradient rendering access them via [BasisTheme.current].
 *
 * @property surface Surface fills.
 * @property content Text content colors.
 * @property icon Icon tints.
 * @property border Border colors.
 * @property selection Selection state colors.
 * @property focus Focus affordance colors.
 * @property positive Positive status colors.
 * @property negative Negative status colors.
 * @property caution Caution status colors.
 * @property info Informational status colors.
 * @property brand Brand anchor colors retained for diagnostics and categorical use.
 */
public data class BasisColorLocals(
    public val surface: BasisSurfaceColors,
    public val content: BasisContentColors,
    public val icon: BasisIconColors,
    public val border: BasisBorderColors,
    public val selection: BasisSelectionColors,
    public val focus: BasisFocusColors,
    public val positive: BasisStatusColors,
    public val negative: BasisStatusColors,
    public val caution: BasisStatusColors,
    public val info: BasisStatusColors,
    public val brand: BasisBrandColors,
)

/**
 * Compose [Color] counterpart of [SurfaceColors].
 *
 * @property default Primary background.
 * @property elevated Raised background above [default].
 * @property recessed Sunken background below [default].
 * @property inverse High-inversion surface pairing with `content.inverse`.
 */
public data class BasisSurfaceColors(
    public val default: Color,
    public val elevated: Color,
    public val recessed: Color,
    public val inverse: Color,
)

/**
 * Compose [Color] counterpart of [ContentColors].
 *
 * @property default Primary text on surfaces.
 * @property muted Secondary text on surfaces.
 * @property inverse Text on [BasisSurfaceColors.inverse].
 */
public data class BasisContentColors(
    public val default: Color,
    public val muted: Color,
    public val inverse: Color,
)

/**
 * Compose [Color] counterpart of [IconColors].
 *
 * @property default Primary icon tint.
 * @property muted Secondary icon tint.
 * @property inverse Icon tint on [BasisSurfaceColors.inverse].
 */
public data class BasisIconColors(
    public val default: Color,
    public val muted: Color,
    public val inverse: Color,
)

/**
 * Compose [Color] counterpart of [BorderColors].
 *
 * @property default Standard border.
 * @property muted Subtle border.
 * @property strong Emphasized border.
 * @property inverse Border on [BasisSurfaceColors.inverse].
 */
public data class BasisBorderColors(
    public val default: Color,
    public val muted: Color,
    public val strong: Color,
    public val inverse: Color,
)

/**
 * Compose [Color] counterpart of [SelectionColors].
 *
 * @property surface Selected background.
 * @property content Content on the selected background.
 * @property border Border of the selected region.
 */
public data class BasisSelectionColors(
    public val surface: Color,
    public val content: Color,
    public val border: Color,
)

/**
 * Compose [Color] counterpart of [FocusColors].
 *
 * @property ring Focus ring detectable on `surface.default`.
 */
public data class BasisFocusColors(
    public val ring: Color,
)

/**
 * Compose [Color] counterpart of [StatusColors].
 *
 * @property surface Status background.
 * @property content Status text meeting contrast on [surface].
 * @property border Status border.
 * @property icon Status icon tint.
 */
public data class BasisStatusColors(
    public val surface: Color,
    public val content: Color,
    public val border: Color,
    public val icon: Color,
)

/**
 * Compose [Color] counterpart of [BrandColors].
 *
 * @property primary Identity brand anchor.
 * @property secondary First supporting anchor, null when unspecified.
 * @property tertiary Second supporting anchor, null when unspecified.
 * @property quaternary Third supporting anchor, null when unspecified.
 */
public data class BasisBrandColors(
    public val primary: Color,
    public val secondary: Color?,
    public val tertiary: Color?,
    public val quaternary: Color?,
)
