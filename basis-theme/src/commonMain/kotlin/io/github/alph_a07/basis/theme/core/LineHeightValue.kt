package io.github.alph_a07.basis.theme.core

/**
 * Line height multiplier.
 *
 * @property multiplier Multiplier of font size, e.g. `1.25`.
 */
@JvmInline
public value class LineHeightValue(public val multiplier: Float) {
    init {
        require(multiplier.isFinite() && multiplier > 0f) {
            "LineHeight must be finite and > 0, was $multiplier."
        }
    }
}
