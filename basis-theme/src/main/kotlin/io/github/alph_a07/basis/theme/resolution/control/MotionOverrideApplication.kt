package io.github.alph_a07.basis.theme.resolution.control

import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.intent.controls.overrides.MotionSpecPatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens

/**
 * Applies motion overrides, which are mode-invariant.
 *
 * @param motion Derived motion purposes.
 * @param overrides Token overrides as specified, or null when Control specifies none.
 * @return The overridden motion purposes.
 */
internal fun applyMotionOverrides(
    motion: MotionTokens,
    overrides: TokenOverrides?,
): MotionTokens {
    val patch = overrides?.motion ?: return motion

    return motion.copy(
        feedback = motion.feedback.applyPatch(patch.feedback),
        stateTransition = motion.stateTransition.applyPatch(patch.stateTransition),
        transformation = motion.transformation.applyPatch(patch.transformation),
        expansion = motion.expansion.applyPatch(patch.expansion),
        reposition = motion.reposition.applyPatch(patch.reposition),
        emphasis = motion.emphasis.applyPatch(patch.emphasis),
    )
}

private fun MotionSpec.applyPatch(patch: MotionSpecPatch?): MotionSpec {
    if (patch == null) {
        return this
    }

    return copy(
        duration = patch.duration ?: duration,
        easing = patch.easing ?: easing,
        delay = patch.delay ?: delay,
        spring = patch.spring ?: spring,
    )
}
