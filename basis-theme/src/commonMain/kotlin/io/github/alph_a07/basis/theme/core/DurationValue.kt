package io.github.alph_a07.basis.theme.core

import kotlin.jvm.JvmInline
import kotlinx.serialization.Serializable

/**
 * Value wrapper for a magnitude in milliseconds.
 *
 * @property milliseconds Magnitude in milliseconds and must be non-negative.
 */
@Serializable
@JvmInline
public value class DurationValue(public val milliseconds: Long) {
    init {
        require(milliseconds >= 0L) { "DurationValue must be non-negative, was $milliseconds." }
    }
}
