package io.github.alph_a07.basis.theme.tokens.scalars

import io.github.alph_a07.basis.theme.core.DpValue

/** Size ladders: Icons, Avatars, Controls and Dots. */
public data class SizeTokens(
    public val icon: IconSizes,
    public val avatar: AvatarSizes,
    public val control: ControlSizes,
    public val dot: DotSizes,
)

/** Icon sizes, level 1 smallest through level 5 largest. */
public data class IconSizes(
    public val level1: DpValue,
    public val level2: DpValue,
    public val level3: DpValue,
    public val level4: DpValue,
    public val level5: DpValue,
)

/** Avatar sizes, level 1 smallest through level 5 largest. */
public data class AvatarSizes(
    public val level1: DpValue,
    public val level2: DpValue,
    public val level3: DpValue,
    public val level4: DpValue,
    public val level5: DpValue,
)

/**
 * Control sizes, level 1 smallest through level 5 largest.
 *
 * Enforce raises these to the minimum touch target floor.
 */
public data class ControlSizes(
    public val level1: DpValue,
    public val level2: DpValue,
    public val level3: DpValue,
    public val level4: DpValue,
    public val level5: DpValue,
)

/** Dot sizes, level 1 smallest through level 3 largest. */
public data class DotSizes(
    public val level1: DpValue,
    public val level2: DpValue,
    public val level3: DpValue,
)
