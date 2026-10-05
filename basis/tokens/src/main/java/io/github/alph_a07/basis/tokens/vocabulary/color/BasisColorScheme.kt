package io.github.alph_a07.basis.tokens.vocabulary.color

/**
 * The complete set of resolved color values for one theme.
 *
 * This is the value side of the Color family: [BasisColorRole] names each decision and this
 * scheme holds the concrete value each one resolved to. Theme Resolution produces the scheme;
 * components consume it and never assemble colors of their own.
 */
data class BasisColorScheme(
    /** The background colors. */
    val surface: SurfaceColors,
    /** The text colors. */
    val content: ContentColors,
    /** The icon colors. */
    val icon: IconColors,
    /** The border colors. */
    val border: BorderColors,
    /** The colors marking a selected item. */
    val selection: SelectionColors,
    /** The focus indicator colors. */
    val focus: FocusColors,
    /** The status colors. */
    val status: StatusColors,
    /** The gradient tokens. */
    val gradients: GradientColors,
) {
    /**
     * Returns the color this scheme resolved [role] to.
     *
     * Every role in [BasisColorRole] has a value, so this never fails: the catalogue and the
     * scheme are declared together and cannot drift apart. Use it when a token carries a role
     * rather than a color, so the role is looked up in the resolved scheme at the point of use.
     *
     * @param role The role to look up.
     * @return The resolved color for that role.
     */
    operator fun get(role: BasisColorRole): BasisColor = when (role.status) {
        null -> nonStatusRole(role)
        else -> statusRole(role)
    }

    private fun statusRole(role: BasisColorRole): BasisColor {
        val set = when (requireNotNull(role.status)) {
            BasisStatus.Positive -> status.positive
            BasisStatus.Negative -> status.negative
            BasisStatus.Caution -> status.caution
            BasisStatus.Info -> status.info
        }
        return when (requireNotNull(role.statusSlot)) {
            BasisStatusSlot.Surface -> set.surface
            BasisStatusSlot.Content -> set.content
            BasisStatusSlot.Icon -> set.icon
            BasisStatusSlot.Border -> set.border
        }
    }
}

/** Reads the value of every role that carries no status meaning. */
private fun BasisColorScheme.nonStatusRole(role: BasisColorRole): BasisColor = when (role) {
    BasisColorRole.SurfaceDefault -> surface.surface
    BasisColorRole.SurfaceElevated -> surface.elevated
    BasisColorRole.SurfaceRecessed -> surface.recessed
    BasisColorRole.SurfaceInverse -> surface.inverse
    BasisColorRole.ContentDefault -> content.content
    BasisColorRole.ContentMuted -> content.muted
    BasisColorRole.ContentInverse -> content.inverse
    BasisColorRole.IconDefault -> icon.icon
    BasisColorRole.IconMuted -> icon.muted
    BasisColorRole.IconInverse -> icon.inverse
    else -> boundaryNonStatusRole(role)
}

/** Reads the border, selection and focus roles, which no single earlier group covers. */
private fun BasisColorScheme.boundaryNonStatusRole(role: BasisColorRole): BasisColor = when (role) {
    BasisColorRole.BorderDefault -> border.border
    BasisColorRole.BorderMuted -> border.muted
    BasisColorRole.BorderStrong -> border.strong
    BasisColorRole.BorderInverse -> border.inverse
    BasisColorRole.SelectionSurface -> selection.surface
    BasisColorRole.SelectionContent -> selection.content
    BasisColorRole.SelectionBorder -> selection.border
    BasisColorRole.FocusRing -> focus.ring
    else -> error("$role carries status meaning and must be resolved through its status.")
}
