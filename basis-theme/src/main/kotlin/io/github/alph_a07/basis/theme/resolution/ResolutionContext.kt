package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.controls.ModeGeneration
import io.github.alph_a07.basis.theme.resolution.domain.PriorGain
import io.github.alph_a07.basis.theme.resolution.domain.PriorSeedBiases
import io.github.alph_a07.basis.theme.resolution.domain.PriorVector
import io.github.alph_a07.basis.theme.resolution.fonts.FontRolePlan
import io.github.alph_a07.basis.theme.resolution.mood.MoodModulators
import io.github.alph_a07.basis.theme.resolution.mood.MoodProfile
import io.github.alph_a07.basis.theme.resolution.normalize.NormalizedIntent

/**
 * Mode-invariant resolution state shared by every generated theme tree.
 *
 * The prior blend, mood stacking, family modulators, font role plan, and the set of tokens
 * locked by Control are computed once; the per-mode stages consume them without re-deriving.
 *
 * @property normalized Validated and converted intent.
 * @property prior Blended domain and interaction prior vector.
 * @property gain Weak-coupling gain applied to the prior-derived seed biases.
 * @property seedBiases Prior-derived aesthetic and structural biases.
 * @property moodProfile Mood setpoints after preset and knob replacement.
 * @property effectiveAesthetic Stacked `seed + mood` profile consumed by derivation.
 * @property modulators Processable per-family multipliers projected from [effectiveAesthetic].
 * @property fonts Font role plan, including per-level Control locks.
 * @property lockedPaths Tokens replaced by Control, which enforcement must not re-adjust.
 */
internal data class ResolutionContext(
    val normalized: NormalizedIntent,
    val prior: PriorVector,
    val gain: PriorGain,
    val seedBiases: PriorSeedBiases,
    val moodProfile: MoodProfile,
    val effectiveAesthetic: MoodProfile,
    val modulators: MoodModulators,
    val fonts: FontRolePlan,
    val lockedPaths: Set<String>,
) {
    /** Modes the resolved pair carries, from the mode generation policy. */
    val modes: List<ThemeMode>
        get() =
            when (normalized.control?.mode?.generate) {
                ModeGeneration.LightOnly -> {
                    listOf(ThemeMode.Light)
                }
                ModeGeneration.DarkOnly -> {
                    listOf(ThemeMode.Dark)
                }
                else -> {
                    listOf(ThemeMode.Light, ThemeMode.Dark)
                }
            }
}
