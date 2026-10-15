package io.github.alph_a07.basis.theme.tokens.motion

import io.github.alph_a07.basis.theme.core.codegen.BasisTokenPathFamily
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme

/**
 * Semantic motion tokens for a [ResolvedTheme].
 *
 * Would be overridden if `reducedMotion` is enforced.
 *
 * @property feedback Taps, toggles, and micro confirmations.
 * @property stateTransition Enabled, selected, and pressed crossfades.
 * @property transformation Morphing shapes and shared-element-like motion.
 * @property expansion Reveal and collapse motion.
 * @property reposition Moves and reorders.
 * @property emphasis Attention pulses and highlights.
 */
@BasisTokenPathFamily(prefix = "motion", kind = "motion purpose")
public data class MotionTokens(
    public val feedback: MotionSpec,
    public val stateTransition: MotionSpec,
    public val transformation: MotionSpec,
    public val expansion: MotionSpec,
    public val reposition: MotionSpec,
    public val emphasis: MotionSpec,
)
