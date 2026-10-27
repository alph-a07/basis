package io.github.alph_a07.basis.theme.tokens.color

import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.resolveIn

/**
 * Replaces one color token in this tree by its [ColorTokenPath].
 *
 * @param path Typed identifier of the color token to replace.
 * @param value New OKLCH color value.
 * @return A copy of [ColorTokens] with the token updated.
 */
@Suppress("LongMethod", "CyclomaticComplexMethod")
public fun ColorTokens.replaceToken(path: ColorTokenPath, value: Oklch): ColorTokens = when (path) {
    ColorTokenPath.SurfaceDefault -> copy(surface = surface.copy(default = value))
    ColorTokenPath.SurfaceElevated -> copy(surface = surface.copy(elevated = value))
    ColorTokenPath.SurfaceRecessed -> copy(surface = surface.copy(recessed = value))
    ColorTokenPath.SurfaceInverse -> copy(surface = surface.copy(inverse = value))
    ColorTokenPath.ContentDefault -> copy(content = content.copy(default = value))
    ColorTokenPath.ContentMuted -> copy(content = content.copy(muted = value))
    ColorTokenPath.ContentInverse -> copy(content = content.copy(inverse = value))
    ColorTokenPath.IconDefault -> copy(icon = icon.copy(default = value))
    ColorTokenPath.IconMuted -> copy(icon = icon.copy(muted = value))
    ColorTokenPath.IconInverse -> copy(icon = icon.copy(inverse = value))
    ColorTokenPath.BorderDefault -> copy(border = border.copy(default = value))
    ColorTokenPath.BorderMuted -> copy(border = border.copy(muted = value))
    ColorTokenPath.BorderStrong -> copy(border = border.copy(strong = value))
    ColorTokenPath.BorderInverse -> copy(border = border.copy(inverse = value))
    ColorTokenPath.SelectionSurface -> copy(selection = selection.copy(surface = value))
    ColorTokenPath.SelectionContent -> copy(selection = selection.copy(content = value))
    ColorTokenPath.SelectionBorder -> copy(selection = selection.copy(border = value))
    ColorTokenPath.FocusRing -> copy(focus = focus.copy(ring = value))
    ColorTokenPath.PositiveSurface -> copy(positive = positive.copy(surface = value))
    ColorTokenPath.PositiveContent -> copy(positive = positive.copy(content = value))
    ColorTokenPath.PositiveBorder -> copy(positive = positive.copy(border = value))
    ColorTokenPath.PositiveIcon -> copy(positive = positive.copy(icon = value))
    ColorTokenPath.NegativeSurface -> copy(negative = negative.copy(surface = value))
    ColorTokenPath.NegativeContent -> copy(negative = negative.copy(content = value))
    ColorTokenPath.NegativeBorder -> copy(negative = negative.copy(border = value))
    ColorTokenPath.NegativeIcon -> copy(negative = negative.copy(icon = value))
    ColorTokenPath.CautionSurface -> copy(caution = caution.copy(surface = value))
    ColorTokenPath.CautionContent -> copy(caution = caution.copy(content = value))
    ColorTokenPath.CautionBorder -> copy(caution = caution.copy(border = value))
    ColorTokenPath.CautionIcon -> copy(caution = caution.copy(icon = value))
    ColorTokenPath.InfoSurface -> copy(info = info.copy(surface = value))
    ColorTokenPath.InfoContent -> copy(info = info.copy(content = value))
    ColorTokenPath.InfoBorder -> copy(info = info.copy(border = value))
    ColorTokenPath.InfoIcon -> copy(info = info.copy(icon = value))
    ColorTokenPath.BrandPrimary -> copy(brand = brand.copy(primary = value))
    ColorTokenPath.BrandSecondary -> copy(brand = brand.copy(secondary = value))
    ColorTokenPath.BrandTertiary -> copy(brand = brand.copy(tertiary = value))
    ColorTokenPath.BrandQuaternary -> copy(brand = brand.copy(quaternary = value))
}

/**
 * Replaces one color token in this tree by its stable dotted path.
 *
 * Gradient paths are not referenceable as single color tokens, so an unknown or gradient path
 * leaves this tree unchanged.
 *
 * @param path Dotted token path, e.g. `color.surface.default`.
 * @param value New OKLCH color value.
 * @return A copy of [ColorTokens] with the token updated.
 */
public fun ColorTokens.replaceToken(path: String, value: Oklch): ColorTokens {
    val token = ColorTokenPath.entries.firstOrNull { it.path == path }

    return if (token != null) replaceToken(token, value) else this
}

/**
 * Reads one color token by its stable dotted path.
 *
 * @param path Dotted token path, e.g. `color.surface.default`.
 * @return The resolved [Oklch] token value, or null when unknown or addressing an unassigned brand anchor.
 */
public fun ColorTokens.resolveToken(path: String): Oklch? {
    val token = ColorTokenPath.entries.firstOrNull { it.path == path }

    return token?.resolveIn(this)
}
