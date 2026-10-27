package io.github.alph_a07.basis.theme.core

/**
 * Wrapper for a font weight value, which must be in the range `100..900` in steps of `100`.
 *
 * @property weight Weight in `100..900` in steps of 100.
 */
@JvmInline
public value class FontWeightValue(public val weight: Int) {
    init {
        require(weight in MIN_WEIGHT..MAX_WEIGHT && weight % STEP == 0) {
            "FontWeightValue must be 100..900 in steps of 100, was $weight."
        }
    }

    private companion object {
        private const val MIN_WEIGHT: Int = 100
        private const val MAX_WEIGHT: Int = 900
        private const val STEP: Int = 100
    }
}
