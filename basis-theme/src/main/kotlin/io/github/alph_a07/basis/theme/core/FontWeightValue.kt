package io.github.alph_a07.basis.theme.core

/**
 * Wrapper for a font weight value, which must be in the range `100..900` in steps of `100`.
 *
 * @property weight Weight in `100..900` in steps of 100.
 */
@JvmInline
public value class FontWeightValue(public val weight: Int) {
    init {
        require(weight in 100..900 && weight % 100 == 0) {
            "FontWeightValue must be 100..900 in steps of 100, was $weight."
        }
    }
}
