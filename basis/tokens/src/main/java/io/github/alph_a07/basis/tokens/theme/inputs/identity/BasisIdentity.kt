package io.github.alph_a07.basis.tokens.theme.inputs.identity

import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColor

/**
 * How strongly a product's identity should influence the resolved theme.
 *
 * A consumer who wants to control exactly where identity appears should express that through
 * Appearance, not through this input.
 */
enum class BasisBrandPresence {
    /** Identity influence is restrained, for products that should not read as strongly branded. */
    Subtle,

    /** Identity meaningfully shapes appropriate decisions without dominating, the conventional default. */
    Balanced,

    /** Identity strongly shapes appropriate decisions rather than appearing only at isolated accents. */
    Prominent,
}

/**
 * The visual material that belongs to a product's identity, and how strongly that identity should
 * influence the resulting theme.
 *
 * @property primary The strongest single representation of the product's visual identity, or `null`
 *   when the brand has no single strongest color. Optional because a brand may genuinely have
 *   multiple equally important colors; when it is absent, Basis does not promote a supporting color
 *   to this role.
 * @property supporting Additional colors that materially belong to the product's identity. A set,
 *   so it is unordered and carries neither priority nor semantic UI role: a supporting color may be
 *   visually stronger than [primary].
 * @property presence How strongly identity-derived candidates are preferred during resolution.
 */
data class BasisIdentity(
    val primary: BasisColor? = null,
    val supporting: Set<BasisColor> = emptySet(),
    val presence: BasisBrandPresence = BasisBrandPresence.Balanced,
)
