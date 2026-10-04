package io.github.alph_a07.basis.tokens.theme.appearance

import io.github.alph_a07.basis.tokens.motion.BasisMotionToken
import io.github.alph_a07.basis.tokens.motion.BasisResolvedMotion
import io.github.alph_a07.basis.tokens.radius.BasisRadius
import io.github.alph_a07.basis.tokens.size.BasisControlSize
import io.github.alph_a07.basis.tokens.size.SizeControl
import io.github.alph_a07.basis.tokens.spacing.BasisSpacing

/**
 * Explicitly assigned spacing magnitudes, keyed by the level they apply to.
 *
 * An entry states the magnitude a level resolves to rather than naming a new level or a use for it.
 * Spacing remains an indexed hierarchy: components still choose which level applies where, and
 * Basis still owns which levels exist.
 *
 * Magnitudes are stated in density-independent pixels, matching the unit the resolved theme uses.
 *
 * @property overrides The assigned magnitude per level, in density-independent pixels.
 */
data class BasisSpacingAppearance(
    val overrides: Map<BasisSpacing, Int> = emptyMap(),
) {
    init {
        overrides.forEach { (level, magnitude) ->
            require(magnitude >= 0) { "A spacing magnitude must not be negative, got $magnitude for $level." }
        }
    }
}

/**
 * Explicitly assigned radius magnitudes, keyed by the level they apply to.
 *
 * [BasisRadius.Full] is a boundary concept rather than an indexed magnitude: it means enough
 * curvature to render fully rounded relative to the bounds being drawn, so a fixed magnitude cannot
 * express it. It is therefore not a valid key.
 *
 * Magnitudes are stated in density-independent pixels, matching the unit the resolved theme uses.
 *
 * @property overrides The assigned magnitude per level, in density-independent pixels.
 */
data class BasisRadiusAppearance(
    val overrides: Map<BasisRadius, Int> = emptyMap(),
) {
    init {
        require(BasisRadius.Full !in overrides) {
            "BasisRadius.Full is derived from the bounds being drawn and cannot take a fixed magnitude."
        }
        overrides.forEach { (level, magnitude) ->
            require(magnitude >= 0) { "A radius magnitude must not be negative, got $magnitude for $level." }
        }
    }
}

/**
 * Explicitly assigned control dimensions, keyed by the control size level they apply to.
 *
 * A control size is a coherent dimensional relationship rather than a single outer height, so an
 * entry supplies all of its constituents together and they change as one.
 *
 * @property overrides The assigned dimensions per control size level.
 */
data class BasisSizeAppearance(
    val overrides: Map<SizeControl, BasisControlSize> = emptyMap(),
)

/**
 * Explicitly assigned motion values, keyed by the motion contract they apply to.
 *
 * Customization happens at the level of the motion contract. An entry supplies the resolved
 * expression for one contract and leaves the contract's meaning unchanged, which preserves the
 * abstraction that makes Motion more than a set of animation knobs.
 *
 * The mechanics inside a motion — duration, curve, spring behaviour and which properties animate —
 * are not customization points of their own. A consumer who wants a different feel for
 * `Motion.Feedback` supplies a different [BasisResolvedMotion] for it, rather than reaching in to
 * retune one track of the value resolution produced.
 *
 * @property overrides The assigned motion per contract.
 */
data class BasisMotionAppearance(
    val overrides: Map<BasisMotionToken, BasisResolvedMotion> = emptyMap(),
) {
    init {
        overrides.forEach { (token, motion) ->
            require(motion.token == token) {
                "A motion assigned to $token must itself resolve from $token, got ${motion.token}."
            }
        }
    }
}
