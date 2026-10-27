package io.github.alph_a07.basis.theme.core

/**
 * Value wrapper for a magnitude in sp (scale-independent pixels).
 *
 * @property value Magnitude in sp, must be finite and non-negative.
 * @throws IllegalArgumentException If [value] is non-finite or negative.
 */
@JvmInline
public value class SpValue(public val value: Float) {
    init {
        require(value.isFinite() && value >= 0f) { "SpValue must be finite and >= 0, was $value." }
    }
}
