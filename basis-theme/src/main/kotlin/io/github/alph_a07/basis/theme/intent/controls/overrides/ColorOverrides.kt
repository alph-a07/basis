package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.OklchGradient
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens

/**
 * Color overrides for a [ColorTokens] tree. Only non-null fields are applied.
 *
 * @property surface Overrides for [ColorTokens.surface].
 * @property content Overrides for [ColorTokens.content].
 * @property icon Overrides for [ColorTokens.icon].
 * @property border Overrides for [ColorTokens.border].
 * @property selection Overrides for [ColorTokens.selection].
 * @property focus Overrides for [ColorTokens.focus].
 * @property positive Overrides for [ColorTokens.positive].
 * @property negative Overrides for [ColorTokens.negative].
 * @property caution Overrides for [ColorTokens.caution].
 * @property info Overrides for [ColorTokens.info].
 * @property gradient Overrides for [ColorTokens.gradient].
 * @property brand Overrides for [ColorTokens.brand].
 */
public data class ColorTokenOverrides(
    public val surface: SurfaceColorOverrides? = null,
    public val content: ContentColorOverrides? = null,
    public val icon: IconColorOverrides? = null,
    public val border: BorderColorOverrides? = null,
    public val selection: SelectionColorOverrides? = null,
    public val focus: FocusColorOverrides? = null,
    public val positive: StatusColorOverrides? = null,
    public val negative: StatusColorOverrides? = null,
    public val caution: StatusColorOverrides? = null,
    public val info: StatusColorOverrides? = null,
    public val gradient: GradientColorOverrides? = null,
    public val brand: BrandColorOverrides? = null,
)

/** Surface colors overrides. */
public data class SurfaceColorOverrides(
    public val default: OverrideMode<Oklch>? = null,
    public val elevated: OverrideMode<Oklch>? = null,
    public val recessed: OverrideMode<Oklch>? = null,
    public val inverse: OverrideMode<Oklch>? = null,
)

/** Content colors overrides. */
public data class ContentColorOverrides(
    public val default: OverrideMode<Oklch>? = null,
    public val muted: OverrideMode<Oklch>? = null,
    public val inverse: OverrideMode<Oklch>? = null,
)

/** Icon colors overrides. */
public data class IconColorOverrides(
    public val default: OverrideMode<Oklch>? = null,
    public val muted: OverrideMode<Oklch>? = null,
    public val inverse: OverrideMode<Oklch>? = null,
)

/** Border colors overrides. */
public data class BorderColorOverrides(
    public val default: OverrideMode<Oklch>? = null,
    public val muted: OverrideMode<Oklch>? = null,
    public val strong: OverrideMode<Oklch>? = null,
    public val inverse: OverrideMode<Oklch>? = null,
)

/** Selection state overrides. */
public data class SelectionColorOverrides(
    public val surface: OverrideMode<Oklch>? = null,
    public val content: OverrideMode<Oklch>? = null,
    public val border: OverrideMode<Oklch>? = null,
)

/** Focus affordance overrides. */
public data class FocusColorOverrides(
    public val ring: OverrideMode<Oklch>? = null,
)

/** Status role colors overrides. */
public data class StatusColorOverrides(
    public val surface: OverrideMode<Oklch>? = null,
    public val content: OverrideMode<Oklch>? = null,
    public val border: OverrideMode<Oklch>? = null,
    public val icon: OverrideMode<Oklch>? = null,
)

/** Gradient colors overrides. */
public data class GradientColorOverrides(
    public val brand: OverrideMode<OklchGradient>? = null,
    public val surface: OverrideMode<OklchGradient>? = null,
)

/** Brand colors overrides. */
public data class BrandColorOverrides(
    public val primary: OverrideMode<Oklch>? = null,
    public val secondary: OverrideMode<Oklch>? = null,
    public val tertiary: OverrideMode<Oklch>? = null,
    public val quaternary: OverrideMode<Oklch>? = null,
)
