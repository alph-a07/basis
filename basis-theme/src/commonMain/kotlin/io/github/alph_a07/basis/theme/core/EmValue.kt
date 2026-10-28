package io.github.alph_a07.basis.theme.core

import kotlin.jvm.JvmInline
import kotlinx.serialization.Serializable

/**
 * Wrapper for a spacing value in em units, which must be finite.
 *
 * @property em Spacing in em units.
 */
@Serializable
@JvmInline
public value class EmValue(public val em: Float) {
    init {
        require(em.isFinite()) { "EmValue must be finite, was $em." }
    }
}
