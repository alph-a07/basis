package io.github.alph_a07.basis.theme.intent.controls.overrides

import kotlinx.serialization.Serializable

/**
 * Visual treatment family a component instance renders with.
 */
@Serializable
public enum class Treatment {
    /** Solid brand or role fill. */
    Fill,

    /** Bordered, transparent-bodied treatment. */
    Outline,

    /** Low-chroma tinted treatment. */
    Soft,

    /** Borderless, background-free treatment. */
    Ghost,

    /** High-contrast treatment for inverted surfaces. */
    Inverse,
}
