package io.github.alph_a07.basis.theme.resolution.component

import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId

/**
 * Fully resolved styling for a component instance, produced by merging component overrides
 * with theme token trees.
 *
 * @property id The component family identifier.
 * @property universal Resolved universal styling attributes (surface, content, border, radius, etc.).
 * @property extra Component family-specific extra patch, with irrelevant or mismatched types omitted.
 */
public data class ResolvedComponentStyle(
    public val id: ComponentId,
    public val universal: ResolvedUniversalStyle,
    public val extra: ComponentExtraPatch? = null,
)
