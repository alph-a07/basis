package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath

/**
 * Fields common to a clear majority of components; irrelevant fields are ignored per component.
 *
 * Every field references a token path so patches stay theme-agnostic. A reference that does not
 * resolve to a known token is skipped, with an optional report entry.
 *
 * @property prominence Hierarchy tier of the component instance.
 * @property treatment Visual treatment family of the component instance.
 * @property surface Surface color path, e.g. [ColorTokenPath.SurfaceDefault].
 * @property content Content color path.
 * @property border Border color path.
 * @property radius Radius level path.
 * @property typography Typography role path.
 * @property padding Outer content padding spacing path.
 * @property gap Inner slot spacing path.
 * @property depth Depth level path defining elevation and shadow.
 */
public data class UniversalStylePatch(
    public val prominence: ProminenceTier? = null,
    public val treatment: Treatment? = null,
    public val surface: ColorTokenPath? = null,
    public val content: ColorTokenPath? = null,
    public val border: ColorTokenPath? = null,
    public val radius: RadiusTokenPath? = null,
    public val typography: TypographyTokenPath? = null,
    public val padding: SpacingTokenPath? = null,
    public val gap: SpacingTokenPath? = null,
    public val depth: DepthTokenPath? = null,
)
