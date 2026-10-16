package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.graphics.Color
import io.github.alph_a07.basis.components.theme.BasisBorderColors
import io.github.alph_a07.basis.components.theme.BasisBrandColors
import io.github.alph_a07.basis.components.theme.BasisColorLocals
import io.github.alph_a07.basis.components.theme.BasisContentColors
import io.github.alph_a07.basis.components.theme.BasisFocusColors
import io.github.alph_a07.basis.components.theme.BasisIconColors
import io.github.alph_a07.basis.components.theme.BasisSelectionColors
import io.github.alph_a07.basis.components.theme.BasisStatusColors
import io.github.alph_a07.basis.components.theme.BasisSurfaceColors
import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.toArgb as themeToArgb
import io.github.alph_a07.basis.theme.core.color.toColorSpecArgb
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.StatusColors

/**
 * Converts a [ColorSpec.Argb] intake/output token into a Compose [Color].
 *
 * @return The equivalent Compose [Color].
 */
public fun ColorSpec.Argb.toColor(): Color = Color(argb)

/**
 * Converts an [Oklch] token into a Compose [Color].
 *
 * This is the single conversion choke point in `basis-components`; no other code path should
 * construct Compose [Color] values from theme data. Color-space mathematics and transfer functions
 * are delegated to `basis-theme` via [ColorSpec.Argb].
 *
 * @return The equivalent Compose [Color].
 */
public fun Oklch.toColor(): Color = toColorSpecArgb().toColor()

/**
 * Converts an [Oklch] token into a 32-bit ARGB color integer.
 *
 * @return Packed ARGB integer representation in `0xAARRGGBB` channel layout.
 */
public fun Oklch.toArgb(): Int = themeToArgb()

internal fun ColorTokens.toBasisColorLocals(): BasisColorLocals =
    BasisColorLocals(
        surface =
            BasisSurfaceColors(
                default = surface.default.toColor(),
                elevated = surface.elevated.toColor(),
                recessed = surface.recessed.toColor(),
                inverse = surface.inverse.toColor(),
            ),
        content =
            BasisContentColors(
                default = content.default.toColor(),
                muted = content.muted.toColor(),
                inverse = content.inverse.toColor(),
            ),
        icon =
            BasisIconColors(
                default = icon.default.toColor(),
                muted = icon.muted.toColor(),
                inverse = icon.inverse.toColor(),
            ),
        border =
            BasisBorderColors(
                default = border.default.toColor(),
                muted = border.muted.toColor(),
                strong = border.strong.toColor(),
                inverse = border.inverse.toColor(),
            ),
        selection =
            BasisSelectionColors(
                surface = selection.surface.toColor(),
                content = selection.content.toColor(),
                border = selection.border.toColor(),
            ),
        focus =
            BasisFocusColors(
                ring = focus.ring.toColor(),
            ),
        positive = positive.toBasisStatusColors(),
        negative = negative.toBasisStatusColors(),
        caution = caution.toBasisStatusColors(),
        info = info.toBasisStatusColors(),
        brand =
            BasisBrandColors(
                primary = brand.primary.toColor(),
                secondary = brand.secondary?.toColor(),
                tertiary = brand.tertiary?.toColor(),
                quaternary = brand.quaternary?.toColor(),
            ),
    )

private fun StatusColors.toBasisStatusColors(): BasisStatusColors = BasisStatusColors(
    surface = surface.toColor(),
    content = content.toColor(),
    border = border.toColor(),
    icon = icon.toColor(),
)
