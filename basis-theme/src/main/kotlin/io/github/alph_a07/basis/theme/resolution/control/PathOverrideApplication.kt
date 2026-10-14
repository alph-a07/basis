package io.github.alph_a07.basis.theme.resolution.control

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue
import io.github.alph_a07.basis.theme.resolution.WorkingTheme
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStageId
import io.github.alph_a07.basis.theme.tokens.color.replaceToken
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Applies the secondary path-map form of token overrides.
 *
 * Paths are matched against the generated token path enums, so an unknown path is reported as
 * rejected rather than silently ignored. Mode-scoped color values resolve per mode; a value scoped
 * away from [mode] is skipped with a report entry.
 *
 * @param theme Working tree after derivation and font assignment.
 * @param paths Dotted-path to override value pairs as specified.
 * @param mode Mode being resolved.
 * @param entries Accumulator of diagnostics for unknown and skipped paths.
 * @return The working tree with every recognized path applied.
 */
internal fun applyPathOverrides(
    theme: WorkingTheme,
    paths: Map<String, OverrideValue>,
    mode: ThemeMode,
    entries: MutableList<ReportEntry>,
): WorkingTheme {
    var current = theme

    paths.forEach { (path, value) ->
        current = applyPath(current, path, value, mode, entries)
    }

    return current
}

private fun applyPath(
    theme: WorkingTheme,
    path: String,
    value: OverrideValue,
    mode: ThemeMode,
    entries: MutableList<ReportEntry>,
): WorkingTheme = when (value) {
    is OverrideValue.Color -> {
        applyColorPath(theme, path, value, mode, entries)
    }
    is OverrideValue.Dp -> {
        applyDpPath(theme, path, value, entries)
    }
    is OverrideValue.Depth -> {
        applyDepthPath(theme, path, value, entries)
    }
    is OverrideValue.Motion -> {
        applyMotionPath(theme, path, value, entries)
    }
    is OverrideValue.Typography -> {
        applyTypographyPath(theme, path, value, entries)
    }
}

@Suppress("ReturnCount")
private fun applyColorPath(
    theme: WorkingTheme,
    path: String,
    value: OverrideValue.Color,
    mode: ThemeMode,
    entries: MutableList<ReportEntry>,
): WorkingTheme {
    val token = ColorTokenPath.entries.firstOrNull { it.path == path }
    if (token == null) {
        entries += unknownPath(path)
        return theme
    }

    val resolved = value.value.forMode(mode)
    if (resolved == null) {
        entries += skippedPath(path)
        return theme
    }

    return theme.copy(color = theme.color.replaceToken(token, resolved))
}

@Suppress("ReturnCount")
private fun applyDpPath(
    theme: WorkingTheme,
    path: String,
    value: OverrideValue.Dp,
    entries: MutableList<ReportEntry>,
): WorkingTheme {
    val spacingPath = SpacingTokenPath.values().firstOrNull { it.path == path }
    if (spacingPath != null) {
        return theme.copy(spacing = replaceSpacing(theme.spacing, spacingPath, value.value))
    }

    val radiusPath = RadiusTokenPath.values().firstOrNull { it.path == path }
    if (radiusPath != null) {
        return theme.copy(radius = replaceRadius(theme.radius, radiusPath, value.value))
    }

    entries += unknownPath(path)
    return theme
}

private fun applyDepthPath(
    theme: WorkingTheme,
    path: String,
    value: OverrideValue.Depth,
    entries: MutableList<ReportEntry>,
): WorkingTheme {
    val token = DepthTokenPath.values().firstOrNull { it.path == path }
    if (token == null) {
        entries += unknownPath(path)
        return theme
    }

    return theme.copy(depth = replaceDepth(theme.depth, token, value.value))
}

private fun applyMotionPath(
    theme: WorkingTheme,
    path: String,
    value: OverrideValue.Motion,
    entries: MutableList<ReportEntry>,
): WorkingTheme {
    val token = MotionTokenPath.values().firstOrNull { it.path == path }
    if (token == null) {
        entries += unknownPath(path)
        return theme
    }

    return theme.copy(motion = replaceMotion(theme.motion, token, value.value))
}

private fun applyTypographyPath(
    theme: WorkingTheme,
    path: String,
    value: OverrideValue.Typography,
    entries: MutableList<ReportEntry>,
): WorkingTheme {
    val token = TypographyTokenPath.values().firstOrNull { it.path == path }
    if (token == null) {
        entries += unknownPath(path)
        return theme
    }

    return theme.copy(typography = replaceRole(theme.typography, token, value.value))
}

private fun unknownPath(path: String): ReportEntry = ReportEntry(
    path = path,
    stage = ResolutionStageId.Control,
    status = ReportStatus.Rejected,
    message = "Override path does not address a known token.",
)

private fun skippedPath(path: String): ReportEntry = ReportEntry(
    path = path,
    stage = ResolutionStageId.Control,
    status = ReportStatus.Rejected,
    message = "Override value is scoped to a mode that was not generated.",
)

private fun replaceSpacing(
    spacing: SpacingTokens,
    path: SpacingTokenPath,
    value: DpValue,
): SpacingTokens = spacing.copy(
    level1 = if (path == SpacingTokenPath.Level1) value else spacing.level1,
    level2 = if (path == SpacingTokenPath.Level2) value else spacing.level2,
    level3 = if (path == SpacingTokenPath.Level3) value else spacing.level3,
    level4 = if (path == SpacingTokenPath.Level4) value else spacing.level4,
    level5 = if (path == SpacingTokenPath.Level5) value else spacing.level5,
    level6 = if (path == SpacingTokenPath.Level6) value else spacing.level6,
    level7 = if (path == SpacingTokenPath.Level7) value else spacing.level7,
    level8 = if (path == SpacingTokenPath.Level8) value else spacing.level8,
)

private fun replaceRadius(
    radius: RadiusTokens,
    path: RadiusTokenPath,
    value: DpValue,
): RadiusTokens = radius.copy(
    none = if (path == RadiusTokenPath.None) value else radius.none,
    level1 = if (path == RadiusTokenPath.Level1) value else radius.level1,
    level2 = if (path == RadiusTokenPath.Level2) value else radius.level2,
    level3 = if (path == RadiusTokenPath.Level3) value else radius.level3,
    level4 = if (path == RadiusTokenPath.Level4) value else radius.level4,
    level5 = if (path == RadiusTokenPath.Level5) value else radius.level5,
    level6 = if (path == RadiusTokenPath.Level6) value else radius.level6,
    level7 = if (path == RadiusTokenPath.Level7) value else radius.level7,
    level8 = if (path == RadiusTokenPath.Level8) value else radius.level8,
    full = if (path == RadiusTokenPath.Full) value else radius.full,
)

private fun replaceDepth(
    depth: DepthTokens,
    path: DepthTokenPath,
    value: DepthSpec,
): DepthTokens = depth.copy(
    level1 = if (path == DepthTokenPath.Level1) value else depth.level1,
    level2 = if (path == DepthTokenPath.Level2) value else depth.level2,
    level3 = if (path == DepthTokenPath.Level3) value else depth.level3,
    level4 = if (path == DepthTokenPath.Level4) value else depth.level4,
)

private fun replaceMotion(
    motion: MotionTokens,
    path: MotionTokenPath,
    value: MotionSpec,
): MotionTokens = motion.copy(
    feedback = if (path == MotionTokenPath.Feedback) value else motion.feedback,
    stateTransition = if (path == MotionTokenPath.StateTransition) value else motion.stateTransition,
    transformation = if (path == MotionTokenPath.Transformation) value else motion.transformation,
    expansion = if (path == MotionTokenPath.Expansion) value else motion.expansion,
    reposition = if (path == MotionTokenPath.Reposition) value else motion.reposition,
    emphasis = if (path == MotionTokenPath.Emphasis) value else motion.emphasis,
)

private fun replaceRole(
    typography: TypographyTokens,
    path: TypographyTokenPath,
    value: TypeRole,
): TypographyTokens = typography.copy(
    structure = replaceStructure(typography.structure, path, value),
    content = replaceContent(typography.content, path, value),
    metadata = replaceMetadata(typography.metadata, path, value),
)

private fun replaceStructure(
    structure: StructureType,
    path: TypographyTokenPath,
    value: TypeRole,
): StructureType = structure.copy(
    level1 = if (path == TypographyTokenPath.StructureLevel1) value else structure.level1,
    level2 = if (path == TypographyTokenPath.StructureLevel2) value else structure.level2,
    level3 = if (path == TypographyTokenPath.StructureLevel3) value else structure.level3,
    level4 = if (path == TypographyTokenPath.StructureLevel4) value else structure.level4,
    level5 = if (path == TypographyTokenPath.StructureLevel5) value else structure.level5,
    level6 = if (path == TypographyTokenPath.StructureLevel6) value else structure.level6,
)

private fun replaceContent(
    content: ContentType,
    path: TypographyTokenPath,
    value: TypeRole,
): ContentType = content.copy(
    level1 = if (path == TypographyTokenPath.ContentLevel1) value else content.level1,
    level2 = if (path == TypographyTokenPath.ContentLevel2) value else content.level2,
    level3 = if (path == TypographyTokenPath.ContentLevel3) value else content.level3,
    level4 = if (path == TypographyTokenPath.ContentLevel4) value else content.level4,
    level5 = if (path == TypographyTokenPath.ContentLevel5) value else content.level5,
)

private fun replaceMetadata(
    metadata: MetadataType,
    path: TypographyTokenPath,
    value: TypeRole,
): MetadataType = metadata.copy(
    level1 = if (path == TypographyTokenPath.MetadataLevel1) value else metadata.level1,
    level2 = if (path == TypographyTokenPath.MetadataLevel2) value else metadata.level2,
    level3 = if (path == TypographyTokenPath.MetadataLevel3) value else metadata.level3,
)
