package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.theme.inputs.appearance.BasisAppearance
import io.github.alph_a07.basis.tokens.theme.inputs.constraints.BasisConstraints
import io.github.alph_a07.basis.tokens.theme.inputs.domain.BasisDomain
import io.github.alph_a07.basis.tokens.theme.inputs.identity.BasisIdentity
import io.github.alph_a07.basis.tokens.theme.inputs.mood.BasisMood

/**
 * Every input a consumer may supply when asking Basis for a theme.
 *
 * Identity provides brand material, Mood defines visual character, Domain provides product context,
 * Appearance provides explicit customization, and Constraints define required validity.
 *
 * Identity, Mood, and Domain are optional. Appearance and Constraints default to no additional
 * input. Invalid combinations are reported during resolution rather than construction.
 *
 * @property identity The visual identity material and how prominently it should appear, or `null`
 *   when the consumer expresses none.
 * @property mood The desired visual character, or `null` when the consumer expresses none.
 * @property domain The broad product context, or `null` when the consumer expresses none.
 * @property appearance Explicit visual customization. Defaults to expressing nothing.
 * @property constraints Requirements the resolved theme must satisfy. Defaults to no declared
 *   requirement beyond those a valid theme satisfies on its own.
 */
data class BasisThemeInputs(
    val identity: BasisIdentity? = null,
    val mood: BasisMood? = null,
    val domain: BasisDomain? = null,
    val appearance: BasisAppearance = BasisAppearance(),
    val constraints: BasisConstraints = BasisConstraints(),
)
