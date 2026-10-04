package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.color.BasisColorScheme
import io.github.alph_a07.basis.tokens.depth.BasisDepthScheme
import io.github.alph_a07.basis.tokens.motion.BasisMotionScheme
import io.github.alph_a07.basis.tokens.radius.BasisRadiusScheme
import io.github.alph_a07.basis.tokens.size.BasisSizeScheme
import io.github.alph_a07.basis.tokens.spacing.BasisSpacingScheme
import io.github.alph_a07.basis.tokens.typography.BasisTypographyScheme

/**
 * Every public Basis design decision, resolved.
 *
 * A resolved theme is the complete output of Theme Resolution: the semantic decisions the token
 * catalogue defines, with the values one set of inputs, constraints and environment produced. It is
 * a theme-time value only. Component state, layout outcomes and platform rendering choices are not
 * decided here, and a component never assembles values of its own — it reads them from the resolved
 * theme it is given.
 *
 * Complete means complete against the public token contract: every color role, typography level,
 * spacing level, radius level, depth level, size level and motion contract has a value. It does not
 * mean every eventual pixel is predetermined. A resolved depth value, for instance, names the
 * magnitude of separation and the expression drawing it, and leaves the platform adapter to render
 * that expression.
 *
 * Because each family type refuses to exist without full coverage of its own catalogue, a
 * `BasisResolvedTheme` cannot be constructed in a partially resolved state. The completeness
 * guarantee is therefore structural rather than something a caller has to remember to check.
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
