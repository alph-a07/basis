package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColorScheme
import io.github.alph_a07.basis.tokens.vocabulary.depth.BasisDepthScheme
import io.github.alph_a07.basis.tokens.vocabulary.motion.BasisMotionScheme
import io.github.alph_a07.basis.tokens.vocabulary.radius.BasisRadiusScheme
import io.github.alph_a07.basis.tokens.vocabulary.size.BasisSizeScheme
import io.github.alph_a07.basis.tokens.vocabulary.spacing.BasisSpacingScheme
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyScheme

/**
 * Contains every public Basis design decision resolved for one set of inputs, constraints, and
 * environment.
 *
 * The theme contains semantic token values only. Component state, layout, and platform rendering
 * remain outside theme resolution. Each scheme requires complete coverage of its token family.
 *
 * @property color The resolved semantic colors.
 * @property typography The resolved type scale and the families assigned to it.
 * @property spacing The resolved spacing magnitudes.
 * @property radius The resolved radius magnitudes.
 * @property size The resolved icon, avatar, dot and control sizes.
 * @property depth The resolved depth values, each pairing magnitude with expression.
 * @property motion The resolved values for every motion contract.
 */
data class BasisResolvedTheme(
    val color: BasisColorScheme,
    val typography: BasisTypographyScheme,
    val spacing: BasisSpacingScheme,
    val radius: BasisRadiusScheme,
    val size: BasisSizeScheme,
    val depth: BasisDepthScheme,
    val motion: BasisMotionScheme,
)
