package io.github.alph_a07.basis.theme.intent.controls.overrides

import kotlinx.serialization.Serializable

/**
 * Stable identifier of one variant within a component family.
 */
@Serializable
public enum class VariantId {
    /** Primary emphasized variant. */
    Primary,

    /** Secondary supporting variant. */
    Secondary,

    /** Tertiary subtle variant. */
    Tertiary,

    /** Solid filled variant. */
    Filled,

    /** Outlined variant with border stroke. */
    Outlined,

    /** Soft-tinted subtle variant. */
    Soft,

    /** Borderless and background-free ghost variant. */
    Ghost,

    /** Elevated variant with depth and shadow. */
    Elevated,

    /** Tonal variant. */
    Tonal,
}
