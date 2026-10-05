package io.github.alph_a07.basis.tokens.theme.inputs.identity

import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColor

/**
 * How prominently a product's identity should manifest in a resolved theme.
 *
 * This is an ordinal statement of design intent, not a quantity. It does not name a percentage of
 * branded UI, a color role, a component, a surface treatment, a saturation, a type style or a
 * layout; it states how strongly the identity should be felt, and Theme Resolution decides how
 * that prominence manifests across the token families.
 *
 * A consumer who wants to control exactly where identity appears should express that through
 * Appearance, not through this input.
 */
enum class BasisBrandPresence {
    /** The identity is present but held back, for products that should not read as strongly branded. */
    Subtle,

    /** The identity is expressed without dominating, which is the conventional default. */
    Balanced,

    /** The identity should be felt clearly across the theme rather than only at isolated accents. */
    Prominent,
}

/**
 * High-level visual identity material: the colors associated with a product or brand, together
 * with how prominently that identity should appear.
 *
 * Identity supplies raw visual material and a prominence intent. It does not assign semantic
 * color roles, and a color placed in [brandColors] is not thereby a primary, action, surface or
 * accent color. Those roles are decisions Theme Resolution derives during resolution, which is why
 * a brand color only becomes a semantic role once resolution interprets it.
 *
 * Identity carries no typography, shape, spacing, hierarchy or component decisions, and it assigns
 * no token values directly.
 *
 * All three properties are optional and this type is itself optional: a consumer with no brand
 * material to supply omits Identity entirely, which is distinct from supplying an Identity whose
 * color lists happen to be empty. The difference is whether identity material was offered at all.
 *
 * @property brandColors The colors that constitute the core visual identity. May be empty, and any
 *   number may be supplied. Ordering carries no semantic meaning: no color is more important
 *   because it appears first.
 * @property supportingColors Additional colors belonging to the broader visual identity but not
 *   core brand material. May be empty, and any number may be supplied. Ordering carries no
 *   semantic meaning. These do not automatically become secondary, accent or surface colors.
 * @property brandPresence How prominently the identity should manifest.
 */
data class BasisIdentity(
    val brandColors: List<BasisColor> = emptyList(),
    val supportingColors: List<BasisColor> = emptyList(),
    val brandPresence: BasisBrandPresence = BasisBrandPresence.Balanced,
)
