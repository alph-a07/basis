package io.github.alph_a07.basis.theme.intent

/**
 * A very flexible intent for a design-system handoff, with every axis optional and independently resolvable.
 *
 * Each axis answers one orthogonal question: [identity] who the brand is, [mood] how the system
 * should feel, [domain] which product and interaction priors apply, and [control] what is locked.
 *
 * Unspecified axes fall back to default seeds during resolution, so the empty intent is valid and
 * a fully locked design-system handoff expresses itself through [control] alone.
 *
 * @property identity Brand color, presence, and brand typography.
 * @property mood Preset archetype and sparse feel knobs.
 * @property domain Product-domain and interaction-pattern priors.
 * @property control Locked overrides, mode generation, and hard constraints.
 */
public data class BasisIntent(
    public val identity: IdentityIntent? = null,
    public val mood: MoodIntent? = null,
    public val domain: DomainIntent? = null,
    public val control: ControlIntent? = null,
)
