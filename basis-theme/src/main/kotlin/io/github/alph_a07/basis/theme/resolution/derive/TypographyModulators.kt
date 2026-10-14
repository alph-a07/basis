package io.github.alph_a07.basis.theme.resolution.derive

/** Typography multipliers consumed by derivation.
 *
 * @property display Multiplier on the two largest structure levels.
 * @property ratio Multiplier on the size gap between adjacent levels.
 * @property body Multiplier on content levels.
 * @property metadata Multiplier on metadata levels.
 * @property tracking Multiplier on structure letter spacing.
 * @property weightBias Weight steps added to structure roles.
 */
internal data class TypographyModulators(
    val display: Float,
    val ratio: Float,
    val body: Float,
    val metadata: Float,
    val tracking: Float,
    val weightBias: Int,
)
