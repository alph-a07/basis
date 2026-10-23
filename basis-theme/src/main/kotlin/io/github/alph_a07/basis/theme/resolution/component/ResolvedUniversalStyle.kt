package io.github.alph_a07.basis.theme.resolution.component

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.controls.overrides.ProminenceTier
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole

/**
 * Fully resolved universal styling attributes for a component instance.
 *
 * Properties resolve to concrete theme units ([Oklch], [DpValue], [TypeRole], [DepthSpec]) rather than
 * symbolic token paths. Irrelevant or unspecified properties remain null, indicating that
 * the component should defer to its own default treatment.
 *
 * @property prominence Hierarchy tier of the component instance.
 * @property treatment Visual treatment family of the component instance.
 * @property surface Surface fill color.
 * @property content Primary foreground content color.
 * @property border Stroke color for outlined or bordered surfaces.
 * @property radius Corner radius dimension.
 * @property typography Typography role.
 * @property padding Outer content padding dimension.
 * @property gap Inner slot spacing dimension.
 * @property depth Elevation and shadow spec.
 */
public data class ResolvedUniversalStyle(
    public val prominence: ProminenceTier? = null,
    public val treatment: Treatment? = null,
    public val surface: Oklch? = null,
    public val content: Oklch? = null,
    public val border: Oklch? = null,
    public val radius: DpValue? = null,
    public val typography: TypeRole? = null,
    public val padding: DpValue? = null,
    public val gap: DpValue? = null,
    public val depth: DepthSpec? = null,
)
