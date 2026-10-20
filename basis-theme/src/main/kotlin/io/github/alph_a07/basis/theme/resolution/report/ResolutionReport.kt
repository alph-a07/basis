package io.github.alph_a07.basis.theme.resolution.report

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.resolution.tables.BaseTables
import io.github.alph_a07.basis.theme.tokens.core.ResolvedThemePair
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Public diagnostics emitted alongside a [ResolvedThemePair].
 *
 * Every specified intent field maps to an entry; nothing is silently dropped. Carries the base
 * version the themes were derived from so visual tuning stays deliberate.
 *
 * @property entries Per-input diagnostics in stage order.
 * @property baseVersion Version of the base tables the themes were derived from.
 * @property modes Modes present on the pair.
 * @property fontAssignments Font role assignments selected by the fonts stage.
 */
public data class ResolutionReport(
    public val entries: List<ReportEntry>,
    public val baseVersion: Int = BaseTables.CURRENT,
    public val modes: Set<ThemeMode>,
    public val fontAssignments: FontAssignmentReport,
)

/**
 * Diagnostic record for one intent input or enforcement repair.
 *
 * @property path Token or input path, e.g. `color.surface.default` or `mood.knobs.warmth`.
 * @property stage Pipeline stage that produced this entry.
 * @property status How the input was treated.
 * @property message Human-readable explanation.
 * @property requested Requested value snapshot, when applicable.
 * @property enforced Enforced value snapshot for [ReportStatus.OverriddenByConstraint].
 */
public data class ReportEntry(
    public val path: String,
    public val stage: ResolutionStage,
    public val status: ReportStatus,
    public val message: String,
    public val requested: String? = null,
    public val enforced: String? = null,
)

/**
 * How an input was treated by the pipeline.
 */
public enum class ReportStatus {
    /** Applied as specified. */
    Honored,

    /** Applied with adjustment, e.g. duplicate pin winning over a candidate. */
    Modulated,

    /** Adjusted by a hard constraint; [ReportEntry.requested] vs [ReportEntry.enforced] differ. */
    OverriddenByConstraint,

    /** Dropped with a reason, e.g. unknown path or invalid color. */
    Rejected,

    /** No input present; the stage filled a default. */
    Absent,
}

/**
 * Font role assignments selected by the fonts stage.
 *
 * @property structure Family assigned to the structure ladder.
 * @property content Family assigned to the content ladder.
 * @property metadata Family assigned to the metadata ladder.
 * @property unusedCandidates Candidates not assigned to any role.
 */
public data class FontAssignmentReport(
    public val structure: FontFamilyRef?,
    public val content: FontFamilyRef?,
    public val metadata: FontFamilyRef?,
    public val unusedCandidates: List<FontFamilyRef>,
)
