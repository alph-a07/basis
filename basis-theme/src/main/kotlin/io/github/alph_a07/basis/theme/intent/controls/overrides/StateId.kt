package io.github.alph_a07.basis.theme.intent.controls.overrides

/**
 * Stable identifier of one interaction state within a component family.
 */
public enum class StateId {
    /** Default resting state. */
    Default,

    /** Active press interaction state. */
    Pressed,

    /** Focus interaction state. */
    Focused,

    /** Pointer hover interaction state. */
    Hovered,

    /** Dragged interaction state. */
    Dragged,

    /** Disabled non-interactive state. */
    Disabled,

    /** Selected or checked state. */
    Selected,
}
