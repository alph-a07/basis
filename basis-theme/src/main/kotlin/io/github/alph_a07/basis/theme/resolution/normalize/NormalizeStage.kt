package io.github.alph_a07.basis.theme.resolution.normalize

import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.ResolutionContext

/** Normalization stage validating and converting raw consumer intent into an initial context. */
internal object NormalizeStage {
    /**
     * Validates and converts [intent] into an initialized [ResolutionContext].
     *
     * @param intent Raw consumer intent.
     * @return Initialized resolution context holding normalized intent and target modes.
     */
    fun process(intent: BasisIntent): ResolutionContext = ResolutionContext.create(intent)
}
