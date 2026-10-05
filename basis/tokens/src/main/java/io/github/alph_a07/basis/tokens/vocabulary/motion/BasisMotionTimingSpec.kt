package io.github.alph_a07.basis.tokens.vocabulary.motion

/**
 * Pins down the timing of a motion contract.
 *
 * Which properties a contract animates is part of what that contract means, so it is not
 * customizable. How those properties progress over time is an independent decision, and this states
 * it: every track of the resolved motion takes this timing.
 *
 * A `null` timing expresses no preference, leaving the contract's own timing to resolution. A
 * supplied timing is an explicit requirement: resolution keeps it unless a mandatory constraint
 * makes it unsatisfiable.
 *
 * @property timing How the contract's tracks progress, or `null` to leave it to the resolver.
 */
data class BasisMotionTimingSpec(
    val timing: BasisMotionTiming? = null,
)
