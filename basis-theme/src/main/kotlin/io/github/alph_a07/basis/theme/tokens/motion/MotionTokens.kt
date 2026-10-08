package io.github.alph_a07.basis.theme.tokens.motion

import io.github.alph_a07.basis.theme.motion.MotionSpec

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
public data class MotionTokens(
    public val feedback: MotionSpec,
    public val stateTransition: MotionSpec,
    public val transformation: MotionSpec,
    public val expansion: MotionSpec,
    public val reposition: MotionSpec,
    public val emphasis: MotionSpec,
)
