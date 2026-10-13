package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.resolution.mood.MoodProfile
import io.github.alph_a07.basis.theme.resolution.normalize.NormalizedIntent
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStageId
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Assigns a family to each typography ladder, then applies per-level Control locks.
 *
 * @param normalized Normalized intent carrying brand type and Control locks.
 * @param aesthetic Effective aesthetic, whose expressiveness picks the structure bias.
 * @return The role plan with diagnostics for every derived or locked family, and any unused candidates.
 */
internal fun resolveFontRoles(normalized: NormalizedIntent, aesthetic: MoodProfile): FontRolePlan {
    val entries = mutableListOf<ReportEntry>()
    val typography = normalized.typography
    val remaining = typography.candidates.toMutableList()

    val structure =
        typography.structure.pinned(LADDER_STRUCTURE, entries)
            ?: remaining.takeNext(LADDER_STRUCTURE, entries)
    val content =
        typography.content.pinned(LADDER_CONTENT, entries)
            ?: remaining.takeNext(LADDER_CONTENT, entries)
    val metadata =
        typography.metadata.pinned(LADDER_METADATA, entries)
            ?: remaining.takeNext(LADDER_METADATA, entries)

    val structureBias =
        if (aesthetic.typographyExpressiveness >= DefaultFontBias.DISPLAY_THRESHOLD) {
            DefaultFontBias.DISPLAY
        } else {
            DefaultFontBias.TEXT
        }

    entries += derivedEntry(LADDER_STRUCTURE, structure, structureBias)
    entries += derivedEntry(LADDER_CONTENT, content, DefaultFontBias.TEXT)
    entries += derivedEntry(LADDER_METADATA, metadata, DefaultFontBias.METADATA)

    val locks = normalized.control?.fonts?.levelFamilies ?: emptyMap()
    entries += lockEntries(locks)

    val fontRolePlan =
        FontRolePlan(
            structure = structure ?: structureBias,
            content = content ?: DefaultFontBias.TEXT,
            metadata = metadata ?: DefaultFontBias.METADATA,
            levelFamilies = locks,
            unusedCandidates = remaining.toList(),
            entries = entries,
        )

    return fontRolePlan
}

private fun FontFamilyRef?.pinned(ladder: String, entries: MutableList<ReportEntry>): FontFamilyRef? {
    if (this == null) {
        return null
    }

    entries +=
        ReportEntry(
            path = "$FONTS_PATH.$ladder",
            stage = ResolutionStageId.Fonts,
            status = ReportStatus.Honored,
            message = "Role pin locks the $ladder ladder.",
            requested = label(),
        )

    return this
}

private fun MutableList<FontFamilyRef>.takeNext(ladder: String, entries: MutableList<ReportEntry>): FontFamilyRef? {
    val taken = removeFirstOrNull() ?: return null

    entries +=
        ReportEntry(
            path = "$FONTS_PATH.$ladder",
            stage = ResolutionStageId.Fonts,
            status = ReportStatus.Modulated,
            message = "Candidate assigned to the $ladder ladder by pairing order.",
            requested = taken.label(),
        )

    return taken
}

private fun derivedEntry(ladder: String, assigned: FontFamilyRef?, fallback: FontFamilyRef): List<ReportEntry> {
    if (assigned != null) {
        return emptyList()
    }

    return listOf(
        ReportEntry(
            path = "$FONTS_PATH.$ladder",
            stage = ResolutionStageId.Fonts,
            status = ReportStatus.Absent,
            message = "No requested family fills the $ladder ladder; derivation bias applied.",
            enforced = fallback.label(),
        ),
    )
}

private fun lockEntries(locks: Map<TypographyTokenPath, FontFamilyRef>): List<ReportEntry> = locks
    .map { (path, family) ->
        ReportEntry(
            path = "$FONTS_PATH.${path.path}",
            stage = ResolutionStageId.Fonts,
            status = ReportStatus.Honored,
            message = "Per-level Control lock wins over the ladder family.",
            requested = family.label(),
        )
    }

private fun FontFamilyRef.label(): String = when (this) {
    is FontFamilyRef.Catalog -> {
        "catalog:${id.value}"
    }

    is FontFamilyRef.Custom -> {
        "custom:${key.value}"
    }
}

/** Report path root of the fonts stage. */
private const val FONTS_PATH: String = "typography"

/** Structure ladder identifier. */
private const val LADDER_STRUCTURE: String = "structure"

/** Content ladder identifier. */
private const val LADDER_CONTENT: String = "content"

/** Metadata ladder identifier. */
private const val LADDER_METADATA: String = "metadata"
