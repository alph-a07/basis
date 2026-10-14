package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.intent.controls.MinMaxLevels
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStageId
import io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.scalars.ControlSizes
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SizeTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens

/**
 * Raises every control size to the touch target floor.
 *
 * The floor grows the visual size rather than adding invisible hit slop, matching the token
 * contract that a control level is its own interactive edge.
 *
 * @param size Derived size ladders.
 * @param floor Smallest allowed interactive edge length.
 * @param entries Accumulator of report entries for actual raises.
 * @return The size ladders with control levels at or above the floor.
 */
internal fun enforceControlSizes(
    size: SizeTokens,
    floor: DpValue,
    entries: MutableList<ReportEntry>,
): SizeTokens = size.copy(
    control =
        ControlSizes(
            level1 = size.control.level1.raised(floor, ControlSizeTokenPath.Level1.path, entries),
            level2 = size.control.level2.raised(floor, ControlSizeTokenPath.Level2.path, entries),
            level3 = size.control.level3.raised(floor, ControlSizeTokenPath.Level3.path, entries),
            level4 = size.control.level4.raised(floor, ControlSizeTokenPath.Level4.path, entries),
            level5 = size.control.level5.raised(floor, ControlSizeTokenPath.Level5.path, entries),
        ),
)

private fun DpValue.raised(
    floor: DpValue,
    path: String,
    entries: MutableList<ReportEntry>,
): DpValue {
    if (value >= floor.value) {
        return this
    }

    entries +=
        ReportEntry(
            path = path,
            stage = ResolutionStageId.Enforce,
            status = ReportStatus.OverriddenByConstraint,
            message = "Control size raised to the minimum touch target.",
            requested = "$value",
            enforced = "${floor.value}",
        )

    return floor
}

/**
 * Clamps every spacing level into its inclusive min/max range.
 *
 * @param spacing Derived spacing ladder.
 * @param clamp Min/max range as specified, or null for no clamp.
 * @param entries Accumulator of report entries for actual clamps.
 * @return The clamped spacing ladder.
 */
internal fun clampSpacing(
    spacing: SpacingTokens,
    clamp: MinMaxLevels?,
    entries: MutableList<ReportEntry>,
): SpacingTokens {
    if (clamp == null) {
        return spacing
    }

    return spacing.copy(
        level1 = spacing.level1.clamped(clamp, SpacingTokenPath.Level1.path, entries),
        level2 = spacing.level2.clamped(clamp, SpacingTokenPath.Level2.path, entries),
        level3 = spacing.level3.clamped(clamp, SpacingTokenPath.Level3.path, entries),
        level4 = spacing.level4.clamped(clamp, SpacingTokenPath.Level4.path, entries),
        level5 = spacing.level5.clamped(clamp, SpacingTokenPath.Level5.path, entries),
        level6 = spacing.level6.clamped(clamp, SpacingTokenPath.Level6.path, entries),
        level7 = spacing.level7.clamped(clamp, SpacingTokenPath.Level7.path, entries),
        level8 = spacing.level8.clamped(clamp, SpacingTokenPath.Level8.path, entries),
    )
}

/**
 * Clamps every radius level into its inclusive min/max range.
 *
 * The `none` and `full` sentinels stay fixed so a clamp cannot turn them into ordinary levels.
 *
 * @param radius Derived radius ladder.
 * @param clamp Min/max range as specified, or null for no clamp.
 * @param entries Accumulator of report entries for actual clamps.
 * @return The clamped radius ladder.
 */
internal fun clampRadius(
    radius: RadiusTokens,
    clamp: MinMaxLevels?,
    entries: MutableList<ReportEntry>,
): RadiusTokens {
    if (clamp == null) {
        return radius
    }

    return radius.copy(
        level1 = radius.level1.clamped(clamp, RadiusTokenPath.Level1.path, entries),
        level2 = radius.level2.clamped(clamp, RadiusTokenPath.Level2.path, entries),
        level3 = radius.level3.clamped(clamp, RadiusTokenPath.Level3.path, entries),
        level4 = radius.level4.clamped(clamp, RadiusTokenPath.Level4.path, entries),
        level5 = radius.level5.clamped(clamp, RadiusTokenPath.Level5.path, entries),
        level6 = radius.level6.clamped(clamp, RadiusTokenPath.Level6.path, entries),
        level7 = radius.level7.clamped(clamp, RadiusTokenPath.Level7.path, entries),
        level8 = radius.level8.clamped(clamp, RadiusTokenPath.Level8.path, entries),
    )
}

private fun DpValue.clamped(
    clamp: MinMaxLevels,
    path: String,
    entries: MutableList<ReportEntry>,
): DpValue {
    val lower = clamp.min?.value
    val upper = clamp.max?.value
    val target = value.coerceIn(lower ?: value, upper ?: value)

    if (target == value) {
        return this
    }

    entries +=
        ReportEntry(
            path = path,
            stage = ResolutionStageId.Enforce,
            status = ReportStatus.OverriddenByConstraint,
            message = "Level clamped into the requested min/max range.",
            requested = "$value",
            enforced = "$target",
        )

    return DpValue(target)
}
