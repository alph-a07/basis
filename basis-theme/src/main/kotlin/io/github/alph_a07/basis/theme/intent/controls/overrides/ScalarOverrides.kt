package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.core.DpValue

/** Spacing levels overrides, only non-null fields are applied. */
public data class LevelSpacingOverrides(
    public val level1: DpValue? = null,
    public val level2: DpValue? = null,
    public val level3: DpValue? = null,
    public val level4: DpValue? = null,
    public val level5: DpValue? = null,
    public val level6: DpValue? = null,
    public val level7: DpValue? = null,
    public val level8: DpValue? = null,
)

/** Radius levels overrides, only non-null fields are applied. */
public data class RadiusOverrides(
    public val level1: DpValue? = null,
    public val level2: DpValue? = null,
    public val level3: DpValue? = null,
    public val level4: DpValue? = null,
    public val level5: DpValue? = null,
    public val level6: DpValue? = null,
    public val level7: DpValue? = null,
    public val level8: DpValue? = null,
)

/** Depth levels overrides, only non-null fields are applied. */
public data class DepthOverrides(
    public val level1: DepthSpecPatch? = null,
    public val level2: DepthSpecPatch? = null,
    public val level3: DepthSpecPatch? = null,
    public val level4: DepthSpecPatch? = null,
)

/**
 * Partial replacement of one depth level; only non-null fields are applied.
 *
 * [shadowAlpha] is mode-scoped because shadow strength differs per theme mode; the remaining fields
 * apply to every mode.
 *
 * @property elevation Replacement elevation in dp.
 * @property shadowAlpha Mode-scoped replacement shadow alpha in `0..1`.
 * @property shadowBlur Replacement shadow blur in dp.
 * @property shadowYOffset Replacement shadow vertical offset in dp.
 */
public data class DepthSpecPatch(
    public val elevation: DpValue? = null,
    public val shadowAlpha: OverrideMode<Float>? = null,
    public val shadowBlur: DpValue? = null,
    public val shadowYOffset: DpValue? = null,
)

/** Icons, avatars, controls and dots size overrides, only non-null fields are applied. */
public data class SizeOverrides(
    public val icon: IconSizeOverrides? = null,
    public val avatar: AvatarSizeOverrides? = null,
    public val control: ControlSizeOverrides? = null,
    public val dot: DotSizeOverrides? = null,
)

/** Icon size overrides, only non-null fields are applied. */
public data class IconSizeOverrides(
    public val level1: DpValue? = null,
    public val level2: DpValue? = null,
    public val level3: DpValue? = null,
    public val level4: DpValue? = null,
    public val level5: DpValue? = null,
)

/** Avatar size overrides, only non-null fields are applied. */
public data class AvatarSizeOverrides(
    public val level1: DpValue? = null,
    public val level2: DpValue? = null,
    public val level3: DpValue? = null,
    public val level4: DpValue? = null,
    public val level5: DpValue? = null,
)

/** Control size overrides, only non-null fields are applied. */
public data class ControlSizeOverrides(
    public val level1: DpValue? = null,
    public val level2: DpValue? = null,
    public val level3: DpValue? = null,
    public val level4: DpValue? = null,
    public val level5: DpValue? = null,
)

/** Dot size overrides, only non-null fields are applied. */
public data class DotSizeOverrides(
    public val level1: DpValue? = null,
    public val level2: DpValue? = null,
    public val level3: DpValue? = null,
)
