package io.github.alph_a07.basis.theme.tokens.typography

import io.github.alph_a07.basis.theme.core.color.Oklch
import kotlinx.serialization.Serializable

/** Semantic color reference of a [TypeRole]. */
@Serializable
public sealed interface TypeColorRef {
    /** Resolves to `color.content.default`. */
    @Serializable
    public data object ContentDefault : TypeColorRef

    /** Resolves to `color.content.muted`. */
    @Serializable
    public data object ContentMuted : TypeColorRef

    /** Resolves to `color.content.inverse`. */
    @Serializable
    public data object ContentInverse : TypeColorRef

    /**
     * Escape hatch written only via Control typography overrides.
     *
     * @property color Explicit OKLCH color.
     */
    @Serializable
    public data class Explicit(public val color: Oklch) : TypeColorRef
}
