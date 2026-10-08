package io.github.alph_a07.basis.theme.tokens.typography

import io.github.alph_a07.basis.theme.color.Oklch

/** Semantic color reference of a [TypeRole]. */
public sealed interface TypeColorRef {
    /** Resolves to `color.content.default`. */
    public data object ContentDefault : TypeColorRef

    /** Resolves to `color.content.muted`. */
    public data object ContentMuted : TypeColorRef

    /** Resolves to `color.content.inverse`. */
    public data object ContentInverse : TypeColorRef

    /**
     * Escape hatch written only via Control typography overrides.
     *
     * @property color Explicit OKLCH color.
     */
    public data class Explicit(public val color: Oklch) : TypeColorRef
}
