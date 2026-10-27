package io.github.alph_a07.basis.theme.intent.controls.overrides

/**
 * Per-component style patches keyed by component id.
 *
 * Patches never carry raw colors, dimensions, or instance keys; they reference token paths and
 * are interpreted at component read time, most specific binding winning.
 *
 * @property byComponent Patches per component id, e.g. [ComponentId.Surface].
 */
public data class ComponentOverrides(
    public val byComponent: Map<ComponentId, ComponentOverride> = emptyMap(),
)
