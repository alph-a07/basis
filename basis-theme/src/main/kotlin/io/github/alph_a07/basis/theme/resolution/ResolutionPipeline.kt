package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.resolution.control.applyColorOverrides
import io.github.alph_a07.basis.theme.resolution.control.applyDepthOverrides
import io.github.alph_a07.basis.theme.resolution.control.applyMotionOverrides
import io.github.alph_a07.basis.theme.resolution.control.applyPathOverrides
import io.github.alph_a07.basis.theme.resolution.control.applyRadiusOverrides
import io.github.alph_a07.basis.theme.resolution.control.applySpacingOverrides
import io.github.alph_a07.basis.theme.resolution.control.applyTypographyOverrides
import io.github.alph_a07.basis.theme.resolution.derive.ColorModulators
import io.github.alph_a07.basis.theme.resolution.derive.ScalarModulators
import io.github.alph_a07.basis.theme.resolution.derive.TypographyModulators
import io.github.alph_a07.basis.theme.resolution.derive.applyFontPlan
import io.github.alph_a07.basis.theme.resolution.derive.deriveColorTokens
import io.github.alph_a07.basis.theme.resolution.derive.deriveDepthTokens
import io.github.alph_a07.basis.theme.resolution.derive.deriveMotionTokens
import io.github.alph_a07.basis.theme.resolution.derive.deriveRadiusTokens
import io.github.alph_a07.basis.theme.resolution.derive.deriveSizeTokens
import io.github.alph_a07.basis.theme.resolution.derive.deriveSpacingTokens
import io.github.alph_a07.basis.theme.resolution.derive.deriveTypographyTokens
import io.github.alph_a07.basis.theme.resolution.domain.PriorGain
import io.github.alph_a07.basis.theme.resolution.domain.blendPriorVectors
import io.github.alph_a07.basis.theme.resolution.domain.contributors
import io.github.alph_a07.basis.theme.resolution.domain.priorSeedBiases
import io.github.alph_a07.basis.theme.resolution.enforce.enforceConstraints
import io.github.alph_a07.basis.theme.resolution.fonts.resolveFontRoles
import io.github.alph_a07.basis.theme.resolution.identity.brandAnchors
import io.github.alph_a07.basis.theme.resolution.identity.presencePlan
import io.github.alph_a07.basis.theme.resolution.mood.MoodModulators
import io.github.alph_a07.basis.theme.resolution.mood.MoodProfile
import io.github.alph_a07.basis.theme.resolution.mood.isUnspecified
import io.github.alph_a07.basis.theme.resolution.mood.projectMoodModulators
import io.github.alph_a07.basis.theme.resolution.mood.resolveMood
import io.github.alph_a07.basis.theme.resolution.normalize.NormalizedIntent
import io.github.alph_a07.basis.theme.resolution.normalize.normalizeIntent
import io.github.alph_a07.basis.theme.resolution.report.FontAssignmentReport
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionReport
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStageId
import io.github.alph_a07.basis.theme.resolution.seed.BasisSeedCatalog
import io.github.alph_a07.basis.theme.resolution.seed.seedWorkingTheme
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.core.ResolvedThemePair

/**
 * Resolves intent into paired light and dark themes plus diagnostics.
 *
 * @param intent Consumer intent, every axis optional; the empty intent resolves to defaults.
 * @return The paired themes for the requested mode generation, with diagnostics.
 */
public fun resolve(intent: BasisIntent): ResolvedThemePair {
    val normalized = normalizeIntent(intent)
    val context = buildContext(normalized)
    val entries = mutableListOf<ReportEntry>()

    entries += normalized.entries
    entries += domainReportEntries(context)
    entries += moodReportEntries(context)
    entries += context.fonts.entries

    val light = context.modes.firstOrNull { it == ThemeMode.Light }?.let { resolveMode(it, context, entries) }
    val dark = context.modes.firstOrNull { it == ThemeMode.Dark }?.let { resolveMode(it, context, entries) }

    return ResolvedThemePair(
        light = light,
        dark = dark,
        report =
            ResolutionReport(
                entries = entries,
                seedVersion = BasisSeedCatalog.CURRENT,
                modesGenerated = context.modes.toSet(),
                fontAssignments = fontReport(context),
            ),
    )
}

private fun fontReport(context: ResolutionContext): FontAssignmentReport = FontAssignmentReport(
    structure = context.fonts.structure,
    content = context.fonts.content,
    metadata = context.fonts.metadata,
    unusedCandidates = context.fonts.unusedCandidates,
)

private fun domainReportEntries(context: ResolutionContext): List<ReportEntry> {
    val contributors = context.normalized.domain.contributors()
    if (contributors.isEmpty()) {
        return listOf(
            ReportEntry(
                path = "domain",
                stage = ResolutionStageId.Seed,
                status = ReportStatus.Absent,
                message = "No domain or interaction selected; priors carry no opinion.",
            ),
        )
    }

    return listOf(
        ReportEntry(
            path = "domain",
            stage = ResolutionStageId.Seed,
            status = ReportStatus.Honored,
            message = "Domain and interaction priors blended and scaled by the prior gain.",
            enforced = contributors.joinToString(),
        ),
    )
}

private fun moodReportEntries(context: ResolutionContext): List<ReportEntry> {
    val specified = context.moodProfile != MoodProfile.NEUTRAL

    return listOf(
        ReportEntry(
            path = "mood",
            stage = ResolutionStageId.Mood,
            status = if (specified) ReportStatus.Honored else ReportStatus.Absent,
            message =
                if (specified) {
                    "Mood profile projected onto family modulators."
                } else {
                    "No mood signal; the profile stays neutral."
                },
        ),
    )
}

private fun buildContext(normalized: NormalizedIntent): ResolutionContext {
    val prior = blendPriorVectors(normalized.domain)
    val mood = MoodIntent(preset = normalized.preset, knobs = normalized.knobs)
    val gain = if (mood.isUnspecified()) PriorGain.UNSPECIFIED else PriorGain.SPECIFIED
    val seedBiases = priorSeedBiases(prior, gain)
    val (profile, effective) = resolveMood(mood, seedBiases.aesthetic)

    return ResolutionContext(
        normalized = normalized,
        prior = prior,
        gain = gain,
        seedBiases = seedBiases,
        moodProfile = profile,
        effectiveAesthetic = effective,
        modulators = projectMoodModulators(effective, seedBiases.structural, prior),
        fonts = resolveFontRoles(normalized, effective, prior),
        lockedPaths = normalized.control?.tokens?.paths?.keys ?: emptySet(),
    )
}

/**
 * Runs the per-mode stages for one mode.
 *
 * Seed, identity, derivation, fonts, control, and enforcement run in order over the shared context;
 * entries produced along the way are appended to [entries] so a single report covers both modes.
 *
 * @param mode Mode being resolved.
 * @param context Shared mode-invariant resolution state.
 * @param entries Accumulator of report entries across every stage.
 * @return The resolved theme for [mode].
 */
private fun resolveMode(
    mode: ThemeMode,
    context: ResolutionContext,
    entries: MutableList<ReportEntry>,
): ResolvedTheme {
    val tables = BasisSeedCatalog.tables()
    val isDark = mode == ThemeMode.Dark
    val modulators = context.modulators
    val anchors = brandAnchors(context.normalized.brandColor, context.normalized.supportingColors)
    val anchored = context.normalized.brandColor != null
    val plan = if (anchored) presencePlan(context.normalized.presence, isDark) else null

    val seeded =
        seedWorkingTheme(
            mode = mode,
            tables = tables,
            fonts = context.fonts,
            brandPrimary = context.normalized.brandColor,
            presence = context.normalized.presence,
        )

    val neutralHue = seeded.neutralHue + modulators.neutralHueShiftDegrees

    val derived =
        seeded.copy(
            color = deriveColorTokens(seeded.color, neutralHue, anchors, plan, colorModulators(modulators)),
            typography = deriveTypographyTokens(seeded.typography, typographyModulators(modulators)),
            spacing = deriveSpacingTokens(seeded.spacing, scalarModulators(modulators)),
            radius = deriveRadiusTokens(seeded.radius, scalarModulators(modulators)),
            depth = deriveDepthTokens(seeded.depth, scalarModulators(modulators)),
            size = deriveSizeTokens(seeded.size, scalarModulators(modulators)),
            motion = deriveMotionTokens(seeded.motion, modulators.durationScale, modulators.emphasisBoost),
            neutralHue = neutralHue,
        )

    val withFonts =
        derived.copy(
            typography =
                applyFontPlan(
                    typography = derived.typography,
                    plan = context.fonts,
                    weightClamps = context.normalized.control?.fonts?.weightClamps ?: emptyMap(),
                ),
        )

    val controlled = applyControl(withFonts, context, mode, entries)
    val enforced = enforceConstraints(controlled, context.normalized.control?.constraints, context.lockedPaths)

    entries += enforced.entries

    return enforced.theme.toResolvedTheme()
}

private fun colorModulators(
    modulators: MoodModulators,
): ColorModulators = ColorModulators(
    accentChromaScale = modulators.accentChromaScale,
    neutralChromaScale = modulators.neutralChromaScale,
    lightnessDeltaScale = modulators.lightnessDeltaScale,
    statusChromaScale = modulators.statusChromaScale,
    borderStrengthScale = modulators.borderStrengthScale,
    clarityBorderScale = modulators.clarityBorderScale,
    focusEmphasis = modulators.focusEmphasis,
)

private fun scalarModulators(
    modulators: MoodModulators,
): ScalarModulators = ScalarModulators(
    spacing = modulators.spacingScale,
    radius = modulators.radiusScale,
    depth = modulators.depthScale,
    control = modulators.controlScale,
    avatar = modulators.avatarScale,
    iconDot = modulators.iconDotScale,
)

private fun typographyModulators(
    modulators: MoodModulators,
): TypographyModulators = TypographyModulators(
    display = modulators.structureDisplayScale,
    ratio = modulators.typeRatioScale,
    body = modulators.contentBodyScale,
    metadata = modulators.contentBodyScale,
    tracking = modulators.structureTrackingScale,
    weightBias = modulators.structureWeightBias,
)

/**
 * Applies Control overrides onto one mode's working tree.
 *
 * Mode-scoped tokens resolve per mode while mode-invariant families apply to both, so a token that
 * targets only the light mode leaves the dark tree on its derived value.
 *
 * @param theme Working tree after derivation and font assignment.
 * @param context Shared resolution state carrying the specified overrides.
 * @param mode Mode being resolved.
 * @return The working tree with every override applied.
 */
private fun applyControl(
    theme: WorkingTheme,
    context: ResolutionContext,
    mode: ThemeMode,
    entries: MutableList<ReportEntry>,
): WorkingTheme {
    val overrides = context.normalized.control?.tokens ?: return theme

    val locked = mutableSetOf<ColorTokenPath>()

    return applyPathOverrides(
        theme =
            theme.copy(
                color = applyColorOverrides(theme.color, overrides.color, mode, locked),
                typography = applyTypographyOverrides(theme.typography, overrides),
                spacing = applySpacingOverrides(theme.spacing, overrides),
                radius = applyRadiusOverrides(theme.radius, overrides),
                depth = applyDepthOverrides(theme.depth, overrides.depth, mode),
                motion = applyMotionOverrides(theme.motion, overrides),
            ),
        paths = overrides.paths,
        mode = mode,
        entries = entries,
    )
}
