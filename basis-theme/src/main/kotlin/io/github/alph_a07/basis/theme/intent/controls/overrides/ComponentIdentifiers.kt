package io.github.alph_a07.basis.theme.intent.controls.overrides

/**
 * Stable identifier of one component family.
 *
 * @property value Component id, e.g. `"button"`.
 * @throws IllegalArgumentException If [value] is blank.
 */
@JvmInline
public value class ComponentId(public val value: String) {
    init {
        require(value.isNotBlank()) { "ComponentId must not be blank." }
    }
}

/**
 * Stable identifier of one variant within a component family.
 *
 * @property value Variant id, e.g. `"primary"`.
 * @throws IllegalArgumentException If [value] is blank.
 */
@JvmInline
public value class VariantId(public val value: String) {
    init {
        require(value.isNotBlank()) { "VariantId must not be blank." }
    }
}

/**
 * Stable identifier of one interaction state within a component family.
 *
 * @property value State id, e.g. `"pressed"`.
 * @throws IllegalArgumentException If [value] is blank.
 */
@JvmInline
public value class StateId(public val value: String) {
    init {
        require(value.isNotBlank()) { "StateId must not be blank." }
    }
}

/**
 * Composite key addressing one variant in one state.
 *
 * @property variant Variant within the component family.
 * @property state Interaction state within the component family.
 */
public data class VariantStateKey(
    public val variant: VariantId,
    public val state: StateId,
)
