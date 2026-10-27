package io.github.alph_a07.basis.theme.resolution.normalize

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.ResolutionContext
import io.github.alph_a07.basis.theme.resolution.constants.BaseTables

/** Normalization stage validating and converting raw consumer intent into an initial context. */
internal object NormalizeStage {
    /**
     * Validates and converts [intent] into an initialized [ResolutionContext].
     *
     * @param intent Raw consumer intent.
     * @return Initialized resolution context holding normalized intent and target modes.
     */
    fun process(intent: BasisIntent): ResolutionContext {
        val normalized = normalizeIntent(intent)
        val baseTables = BaseTables.get()
        val lockedPaths = normalized.control?.tokens?.paths?.keys ?: emptySet()
        val targets = normalized.control?.mode?.targets ?: setOf(ThemeMode.Light, ThemeMode.Dark)
        val modes = targets.toList()

        return ResolutionContext(
            intent = intent,
            normalized = normalized,
            modes = modes,
            baseTables = baseTables,
            lockedPaths = lockedPaths,
        )
    }
}
