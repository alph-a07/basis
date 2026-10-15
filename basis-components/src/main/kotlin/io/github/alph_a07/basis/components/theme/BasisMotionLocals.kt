package io.github.alph_a07.basis.components.theme

import androidx.compose.animation.core.AnimationSpec
import androidx.compose.animation.core.FiniteAnimationSpec
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens

/**
 * Compose animation-spec counterparts of [MotionTokens] semantic purposes.
 *
 * Each property carries a ready-to-use [FiniteAnimationSpec] so components pick the purpose that
 * matches their interaction intent and never specify duration or easing parameters directly.
 * Reduced-motion enforcement in the theme pipeline rewrites specs toward near-zero or `Linear`
 * before this tree is populated.
 *
 * @property feedback Taps, toggles, and micro confirmations.
 * @property stateTransition Enabled, selected, and pressed crossfades.
 * @property transformation Morphing shapes and shared-element-like motion.
 * @property expansion Reveal and collapse motion.
 * @property reposition Moves and reorders.
 * @property emphasis Attention pulses and highlights.
 */
public data class BasisMotionLocals(
    public val feedback: FiniteAnimationSpec<Float>,
    public val stateTransition: FiniteAnimationSpec<Float>,
    public val transformation: FiniteAnimationSpec<Float>,
    public val expansion: FiniteAnimationSpec<Float>,
    public val reposition: FiniteAnimationSpec<Float>,
    public val emphasis: AnimationSpec<Float>,
)
