package io.github.alph_a07.basis.tokens.theme.inputs.appearance

/**
 * Explicit visual customization of the public Basis token vocabulary.
 *
 * Appearance is the supported customization surface, not an unrestricted styling escape hatch.
 * Basis decides what can be customized, and a consumer customizes within that surface. Appearance
 * is not a second intent system: it refines the visual expression a theme resolves to without
 * changing what Identity, Mood or Domain mean.
 *
 * Every family defaults to no customization, so [BasisAppearance] expresses nothing by default.
 * That is what makes a bring-your-own-design-system path possible: a consumer who supplies only
 * Appearance still resolves through the same engine as one who also supplies intent inputs.
 *
 * Appearance cannot create a new token type, redefine the meaning of an existing token, style a
 * component instance, or bypass a mandatory constraint. It cannot style a component instance
 * because components expose no instance-styling parameters; they consume resolved tokens. If a
 * value is not part of the public Basis vocabulary, Appearance has no way to introduce it.
 *
 * An explicit customization also does not imply permission to violate a constraint. When a
 * customization and a mandatory constraint disagree, resolution either produces a theme satisfying
 * both or reports that the request is unsatisfiable.
 *
 * Each family is customizable only where Basis deliberately exposes it. Depth is absent for a
 * deliberate reason: a depth level names a perceptual magnitude and its rendering mechanism is not
 * consumer-selectable, so there is no magnitude here to override.
 *
 * @property color Assigned color values per semantic role.
 * @property typography Assigned typography composites and font families.
 * @property spacing Assigned spacing magnitudes per level.
 * @property radius Assigned radius magnitudes per level.
 * @property size Assigned control dimensions per control size level.
 * @property motion Assigned motion expressions per motion contract.
 *
 * A target the catalogue does not expose, or a magnitude it cannot take, is reported by Theme
 * Resolution rather than refused here.
 */
data class BasisAppearance(
    val color: BasisColorAppearance = BasisColorAppearance(),
    val typography: BasisTypographyAppearance = BasisTypographyAppearance(),
    val spacing: BasisSpacingAppearance = BasisSpacingAppearance(),
    val radius: BasisRadiusAppearance = BasisRadiusAppearance(),
    val size: BasisSizeAppearance = BasisSizeAppearance(),
    val motion: BasisMotionAppearance = BasisMotionAppearance(),
)
