package io.github.alph_a07.basis.theme.tokens.typography

import kotlin.jvm.JvmInline
import kotlinx.serialization.Serializable

/**
 * Stable identifier of a Google Fonts catalog family.
 *
 * @property value Catalog family id, e.g. `"inter"`.
 */
@Serializable
@JvmInline
public value class GoogleFontId(public val value: String) {
    init {
        require(value.isNotBlank()) { "GoogleFontId must not be blank." }
    }
}

/**
 * Consumer-registered key for a bring-your-own-font family.
 *
 * @property value Unique BYOF key chosen by the consumer.
 */
@Serializable
@JvmInline
public value class CustomFontKey(public val value: String) {
    init {
        require(value.isNotBlank()) { "CustomFontKey must not be blank." }
    }
}
