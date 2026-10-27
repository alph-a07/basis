package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.constants.BaseSchema
import io.github.alph_a07.basis.theme.resolution.derive.DerivationWeights
import io.github.alph_a07.basis.theme.resolution.fonts.ResolvedFonts
import io.github.alph_a07.basis.theme.resolution.identity.BrandTints
import io.github.alph_a07.basis.theme.resolution.normalize.NormalizedIntent
import io.github.alph_a07.basis.theme.resolution.report.FontAssignmentReport
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.tokens.color.BrandColors

/**
 * Single context holding inputs, stage processing state, per-mode drafts, and diagnostics.
 *
 * @property intent Unvalidated consumer intent.
 * @property normalized Validated and converted intent.
 * @property modes Target theme modes to generate.
 * @property baseTables Versioned base tables.
 * @property lockedPaths Set of dotted token paths locked by Control.
 */
internal class ResolutionContext(
    val intent: BasisIntent,
    val normalized: NormalizedIntent,
    val modes: List<ThemeMode>,
    val baseTables: BaseSchema,
    val lockedPaths: Set<String>,
) {
    /** Unified theme profile combining visual style, structural biases, and behavioral influences. */
    var profile: ThemeProfile = ThemeProfile.NEUTRAL

    /** Multipliers and weight scaling factors derived from [profile]. */
    var weights: DerivationWeights? = null

    /** Resolved typography font families for all ladders. */
    var fonts: ResolvedFonts? = null

    /** Brand color anchors resolved by IdentityStage. */
    var brand: BrandColors? = null

    /** Mode-specific brand tint strengths resolved by IdentityStage. */
    var brandTints: Map<ThemeMode, BrandTints> = emptyMap()

    /** Per-mode draft token trees under construction. */
    val drafts: MutableMap<ThemeMode, ThemeDraft> = mutableMapOf()

    /** Diagnostics accumulator tracking decisions and overrides across every stage. */
    val entries: MutableList<ReportEntry> = mutableListOf()

    init {
        entries += normalized.entries
    }

    /** Appends a single diagnostic entry. */
    fun report(entry: ReportEntry) {
        entries += entry
    }

    /** Appends multiple diagnostic entries. */
    fun reportAll(newEntries: Iterable<ReportEntry>) {
        entries += newEntries
    }

    /** Builds the font assignment summary for the final resolution report. */
    fun fontReport(): FontAssignmentReport {
        val resolved = checkNotNull(fonts) { "Fonts have not been planned." }
        return FontAssignmentReport(
            structure = resolved.structure,
            content = resolved.content,
            metadata = resolved.metadata,
            unusedCandidates = resolved.unusedCandidates,
        )
    }
}
