package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.theme.appearance.BasisAppearance
import io.github.alph_a07.basis.tokens.theme.constraints.BasisConstraints
import io.github.alph_a07.basis.tokens.theme.domain.BasisDomain
import io.github.alph_a07.basis.tokens.theme.identity.BasisIdentity
import io.github.alph_a07.basis.tokens.theme.mood.BasisMood

/**
 * Every input a consumer may supply when asking Basis for a theme.
 *
 * The five inputs answer different questions and are deliberately kept apart. Identity says what
 * visual identity material exists, Mood says what visual character the product should have, Domain
 * says what product context should influence the design, Appearance says what explicit visual
 * customization the consumer wants, and Constraints says what must remain valid. They are never
 * merged, because a single input that could express all five would let an explicit value quietly
 * take on the meaning of a mandatory requirement.
 *
 * All five are independently optional, and every combination resolves through the same engine.
 * A consumer supplies whatever subset they actually have rather than manufacturing intent they do
 * not: a consumer with a partial understanding of their brand supplies Identity alone, a consumer
 * bringing an established design system supplies Appearance alone, and a consumer with both
 * supplies both. There are no separate resolution paths to choose between.
 *
 * A `null` intent input means the consumer expressed nothing for it, which is distinct from
 * expressing a value that happens to be empty: `identity = null` says no identity material was
 * offered, whereas an Identity with no brand colors says identity material was offered and it was
 * empty. Theme Resolution interprets the information actually supplied.
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
