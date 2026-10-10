package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.motion.EasingKind
import io.github.alph_a07.basis.theme.motion.MotionSpec
import io.github.alph_a07.basis.theme.motion.SpringParams
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens

/**
 * Overrides for [MotionTokens]; only non-null fields are applied.
 *
 * @property feedback Overrides for [MotionTokens.feedback].
 * @property stateTransition Overrides for [MotionTokens.stateTransition].
 * @property transformation Overrides for [MotionTokens.transformation].
 * @property expansion Overrides for [MotionTokens.expansion].
 * @property reposition Overrides for [MotionTokens.reposition].
 * @property emphasis Overrides for [MotionTokens.emphasis].
 */
public data class MotionOverrides(
    public val feedback: MotionSpecPatch? = null,
    public val stateTransition: MotionSpecPatch? = null,
    public val transformation: MotionSpecPatch? = null,
    public val expansion: MotionSpecPatch? = null,
    public val reposition: MotionSpecPatch? = null,
    public val emphasis: MotionSpecPatch? = null,
)

/**
 * Overrides for a single [MotionSpec]; only non-null fields are applied.
 *
 * @property duration Replacement elapsed time of the motion.
 * @property easing Replacement easing family; [spring] is honored only for [EasingKind.Spring].
 * @property delay Replacement start delay.
 * @property spring Replacement spring parameters.
 */
public data class MotionSpecPatch(
    public val duration: DurationValue? = null,
    public val easing: EasingKind? = null,
    public val delay: DurationValue? = null,
    public val spring: SpringParams? = null,
)
