package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath

/**
 * Flattens typed token override trees into a secondary dotted [paths] map.
 */
internal fun flattenTokenOverrides(
    color: ColorTokenOverrides?,
    spacing: LevelSpacingOverrides?,
    radius: RadiusOverrides?,
    size: SizeOverrides?,
): Map<String, OverrideValue> {
    val map = LinkedHashMap<String, OverrideValue>()

    if (color != null) {
        flattenColorOverrides(color, map)
    }

    if (spacing != null) {
        flattenSpacingOverrides(spacing, map)
    }

    if (radius != null) {
        flattenRadiusOverrides(radius, map)
    }

    if (size != null) {
        flattenSizeOverrides(size, map)
    }

    return map
}

private fun flattenColorOverrides(
    color: ColorTokenOverrides,
    map: MutableMap<String, OverrideValue>,
) {
    flattenSurfaceColor(color.surface, map)
    flattenContentAndIconColor(color.content, color.icon, map)
    flattenBorderAndSelection(color.border, color.selection, map)

    flattenStatusAndBrandColor(color, map)
}

private fun flattenSurfaceColor(
    surface: SurfaceColorOverrides?,
    map: MutableMap<String, OverrideValue>,
) {
    surface?.default?.let { map[ColorTokenPath.SurfaceDefault.path] = OverrideValue.Color(it) }
    surface?.elevated?.let { map[ColorTokenPath.SurfaceElevated.path] = OverrideValue.Color(it) }
    surface?.recessed?.let { map[ColorTokenPath.SurfaceRecessed.path] = OverrideValue.Color(it) }

    surface?.inverse?.let { map[ColorTokenPath.SurfaceInverse.path] = OverrideValue.Color(it) }
}

private fun flattenContentAndIconColor(
    content: ContentColorOverrides?,
    icon: IconColorOverrides?,
    map: MutableMap<String, OverrideValue>,
) {
    content?.default?.let { map[ColorTokenPath.ContentDefault.path] = OverrideValue.Color(it) }
    content?.muted?.let { map[ColorTokenPath.ContentMuted.path] = OverrideValue.Color(it) }
    content?.inverse?.let { map[ColorTokenPath.ContentInverse.path] = OverrideValue.Color(it) }

    icon?.default?.let { map[ColorTokenPath.IconDefault.path] = OverrideValue.Color(it) }
    icon?.muted?.let { map[ColorTokenPath.IconMuted.path] = OverrideValue.Color(it) }

    icon?.inverse?.let { map[ColorTokenPath.IconInverse.path] = OverrideValue.Color(it) }
}

private fun flattenBorderAndSelection(
    border: BorderColorOverrides?,
    selection: SelectionColorOverrides?,
    map: MutableMap<String, OverrideValue>,
) {
    border?.default?.let { map[ColorTokenPath.BorderDefault.path] = OverrideValue.Color(it) }
    border?.muted?.let { map[ColorTokenPath.BorderMuted.path] = OverrideValue.Color(it) }
    border?.strong?.let { map[ColorTokenPath.BorderStrong.path] = OverrideValue.Color(it) }
    border?.inverse?.let { map[ColorTokenPath.BorderInverse.path] = OverrideValue.Color(it) }

    selection?.surface?.let { map[ColorTokenPath.SelectionSurface.path] = OverrideValue.Color(it) }
    selection?.content?.let { map[ColorTokenPath.SelectionContent.path] = OverrideValue.Color(it) }

    selection?.border?.let { map[ColorTokenPath.SelectionBorder.path] = OverrideValue.Color(it) }
}

private fun flattenStatusAndBrandColor(
    color: ColorTokenOverrides,
    map: MutableMap<String, OverrideValue>,
) {
    color.focus?.ring?.let { map[ColorTokenPath.FocusRing.path] = OverrideValue.Color(it) }

    color.positive?.surface?.let { map[ColorTokenPath.PositiveSurface.path] = OverrideValue.Color(it) }
    color.negative?.surface?.let { map[ColorTokenPath.NegativeSurface.path] = OverrideValue.Color(it) }
    color.caution?.surface?.let { map[ColorTokenPath.CautionSurface.path] = OverrideValue.Color(it) }
    color.info?.surface?.let { map[ColorTokenPath.InfoSurface.path] = OverrideValue.Color(it) }

    color.brand?.primary?.let { map[ColorTokenPath.BrandPrimary.path] = OverrideValue.Color(it) }
    color.brand?.secondary?.let { map[ColorTokenPath.BrandSecondary.path] = OverrideValue.Color(it) }
    color.brand?.tertiary?.let { map[ColorTokenPath.BrandTertiary.path] = OverrideValue.Color(it) }

    color.brand?.quaternary?.let { map[ColorTokenPath.BrandQuaternary.path] = OverrideValue.Color(it) }
}

private fun flattenSpacingOverrides(
    spacing: LevelSpacingOverrides,
    map: MutableMap<String, OverrideValue>,
) {
    spacing.level1?.let { map[SpacingTokenPath.Level1.path] = OverrideValue.Dp(it) }
    spacing.level2?.let { map[SpacingTokenPath.Level2.path] = OverrideValue.Dp(it) }
    spacing.level3?.let { map[SpacingTokenPath.Level3.path] = OverrideValue.Dp(it) }
    spacing.level4?.let { map[SpacingTokenPath.Level4.path] = OverrideValue.Dp(it) }
    spacing.level5?.let { map[SpacingTokenPath.Level5.path] = OverrideValue.Dp(it) }
    spacing.level6?.let { map[SpacingTokenPath.Level6.path] = OverrideValue.Dp(it) }
    spacing.level7?.let { map[SpacingTokenPath.Level7.path] = OverrideValue.Dp(it) }

    spacing.level8?.let { map[SpacingTokenPath.Level8.path] = OverrideValue.Dp(it) }
}

private fun flattenRadiusOverrides(
    radius: RadiusOverrides,
    map: MutableMap<String, OverrideValue>,
) {
    radius.level1?.let { map[RadiusTokenPath.Level1.path] = OverrideValue.Dp(it) }
    radius.level2?.let { map[RadiusTokenPath.Level2.path] = OverrideValue.Dp(it) }
    radius.level3?.let { map[RadiusTokenPath.Level3.path] = OverrideValue.Dp(it) }
    radius.level4?.let { map[RadiusTokenPath.Level4.path] = OverrideValue.Dp(it) }
    radius.level5?.let { map[RadiusTokenPath.Level5.path] = OverrideValue.Dp(it) }
    radius.level6?.let { map[RadiusTokenPath.Level6.path] = OverrideValue.Dp(it) }
    radius.level7?.let { map[RadiusTokenPath.Level7.path] = OverrideValue.Dp(it) }

    radius.level8?.let { map[RadiusTokenPath.Level8.path] = OverrideValue.Dp(it) }
}

private fun flattenSizeOverrides(
    size: SizeOverrides,
    map: MutableMap<String, OverrideValue>,
) {
    size.icon?.let { icon ->
        icon.level1?.let { map[IconSizeTokenPath.Level1.path] = OverrideValue.Dp(it) }
        icon.level2?.let { map[IconSizeTokenPath.Level2.path] = OverrideValue.Dp(it) }
        icon.level3?.let { map[IconSizeTokenPath.Level3.path] = OverrideValue.Dp(it) }
        icon.level4?.let { map[IconSizeTokenPath.Level4.path] = OverrideValue.Dp(it) }

        icon.level5?.let { map[IconSizeTokenPath.Level5.path] = OverrideValue.Dp(it) }
    }

    size.control?.let { ctrl ->
        ctrl.level1?.let { map[ControlSizeTokenPath.Level1.path] = OverrideValue.Dp(it) }
        ctrl.level2?.let { map[ControlSizeTokenPath.Level2.path] = OverrideValue.Dp(it) }
        ctrl.level3?.let { map[ControlSizeTokenPath.Level3.path] = OverrideValue.Dp(it) }
        ctrl.level4?.let { map[ControlSizeTokenPath.Level4.path] = OverrideValue.Dp(it) }

        ctrl.level5?.let { map[ControlSizeTokenPath.Level5.path] = OverrideValue.Dp(it) }
    }
}
