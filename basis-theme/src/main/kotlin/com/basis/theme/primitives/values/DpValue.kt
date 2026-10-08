package com.basis.theme.primitives

/**
 * Value wrapper for a magnitude in dp (density-independent pixels).
 *
 * @property value Magnitude in dp, must be finite and non-negative.
 */
@JvmInline
public value class DpValue(public val value: Float) {
    init {
        require(value.isFinite() && value >= 0f) { "DpValue must be finite and >= 0, was $value." }
    }
}
