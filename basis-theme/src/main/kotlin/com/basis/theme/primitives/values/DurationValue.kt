package com.basis.theme.primitives

/**
 * Value wrapper for a magnitude in milliseconds.
 *
 * @property duration Magnitude in milliseconds and must be non-negative.
 */
@JvmInline
public value class DurationValue(public val milliseconds: Long) {
    init {
        require(milliseconds >= 0L) { "DurationValue must be non-negative, was $milliseconds." }
    }
}
