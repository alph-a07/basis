package io.github.alph_a07.basis.theme.intent.controls.overrides

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

/**
 * Composite key addressing one variant in one state.
 *
 * @property variant Variant within the component family.
 * @property state Interaction state within the component family.
 */
@Serializable(with = VariantStateKeySerializer::class)
public data class VariantStateKey(
    public val variant: VariantId,
    public val state: StateId,
)

/**
 * Serializer for [VariantStateKey] serializing into a `'Variant.State'` string format.
 */
public object VariantStateKeySerializer : KSerializer<VariantStateKey> {
    override val descriptor: SerialDescriptor =
        PrimitiveSerialDescriptor("VariantStateKey", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: VariantStateKey) {
        encoder.encodeString("${value.variant.name}.${value.state.name}")
    }

    override fun deserialize(decoder: Decoder): VariantStateKey {
        val raw = decoder.decodeString()
        val parts = raw.split('.', limit = 2)
        require(parts.size == 2) { "Expected format 'Variant.State', was '$raw'." }

        return VariantStateKey(
            variant = VariantId.valueOf(parts[0]),
            state = StateId.valueOf(parts[1]),
        )
    }
}
