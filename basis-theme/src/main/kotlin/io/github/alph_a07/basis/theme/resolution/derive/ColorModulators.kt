package io.github.alph_a07.basis.theme.resolution.derive

/**
 * Color multipliers consumed by derivation.
 *
 * @property accentChromaScale Chroma multiplier for accents, focus, and status roles.
 * @property neutralChromaScale Chroma multiplier for neutral roles.
 * @property lightnessDeltaScale Multiplier on the surface-to-content lightness delta.
 * @property statusChromaScale Additional status chroma multiplier from prior clarity.
 * @property borderStrengthScale Border strength multiplier from contrast preference.
 * @property clarityBorderScale Additional border strength multiplier from prior clarity.
 * @property focusEmphasis Focus ring chroma boost.
 */
internal data class ColorModulators(
    val accentChromaScale: Float,
    val neutralChromaScale: Float,
    val lightnessDeltaScale: Float,
    val statusChromaScale: Float,
    val borderStrengthScale: Float,
    val clarityBorderScale: Float,
    val focusEmphasis: Float,
) {
    /** Combined border strength multiplier from mood contrast and prior clarity. */
    val borderScale: Float
        get() = borderStrengthScale * clarityBorderScale

    /** Combined chroma multiplier for status roles. */
    val statusScale: Float
        get() = accentChromaScale * statusChromaScale
}
