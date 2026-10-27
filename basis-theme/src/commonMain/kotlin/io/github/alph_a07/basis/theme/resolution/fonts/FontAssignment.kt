package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.resolution.ThemeProfile
import io.github.alph_a07.basis.theme.resolution.constants.CANDIDATE_EXPRESSIVENESS_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.DEFAULT_NEUTRAL_SCORE
import io.github.alph_a07.basis.theme.resolution.constants.DefaultFontBias
import io.github.alph_a07.basis.theme.resolution.constants.SCORE_TIE_EPSILON
import io.github.alph_a07.basis.theme.resolution.normalize.NormalizedIntent
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStage
import io.github.alph_a07.basis.theme.resolution.typographyExpressiveness01
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import kotlin.math.abs

/**
 * Assigns a family to each typography ladder, then applies per-level Control locks.
 *
 * @param normalized Normalized intent carrying brand type and Control locks.
 * @param profile Effective theme profile, whose expressiveness modulates structure scoring and fallback bias.
 * @return The resolved fonts with diagnostics for every derived or locked family, and any unused candidates.
 */
internal fun resolveFontRoles(
    normalized: NormalizedIntent,
    profile: ThemeProfile,
): ResolvedFonts {
    val entries = mutableListOf<ReportEntry>()
    val typography = normalized.typography

    val pinnedStructure = typography.structure.pinned(LADDER_STRUCTURE, entries)
    val pinnedContent = typography.content.pinned(LADDER_CONTENT, entries)
    val pinnedMetadata = typography.metadata.pinned(LADDER_METADATA, entries)

    val assigned =
        CandidateAssigner.assign(
            candidates = typography.candidates,
            pinnedStructure = pinnedStructure,
            pinnedContent = pinnedContent,
            pinnedMetadata = pinnedMetadata,
            profile = profile,
            entries = entries,
        )

    val intentSpecified = normalized.isSpecified

    val structureFamily =
        assigned.structure ?: resolveLadderFallback(
            ladder = LADDER_STRUCTURE,
            intentSpecified = intentSpecified,
            derived = { FontCatalogDerivation.deriveStructure(profile) },
            canonical =
                if (profile.typographyExpressiveness >= DefaultFontBias.DISPLAY_THRESHOLD) {
                    DefaultFontBias.DISPLAY
                } else {
                    DefaultFontBias.TEXT
                },
            entries = entries,
        )

    val contentFamily =
        assigned.content ?: resolveLadderFallback(
            ladder = LADDER_CONTENT,
            intentSpecified = intentSpecified,
            derived = { FontCatalogDerivation.deriveContent(profile) },
            canonical = DefaultFontBias.TEXT,
            entries = entries,
        )

    val metadataFamily =
        assigned.metadata ?: resolveLadderFallback(
            ladder = LADDER_METADATA,
            intentSpecified = intentSpecified,
            derived = { FontCatalogDerivation.deriveMetadata(profile) },
            canonical = DefaultFontBias.METADATA,
            entries = entries,
        )

    val locks = normalized.control?.fonts?.levelFamilies ?: emptyMap()
    entries += lockEntries(locks)

    return ResolvedFonts(
        structure = structureFamily,
        content = contentFamily,
        metadata = metadataFamily,
        levelFamilies = locks,
        unusedCandidates = assigned.unusedCandidates,
        entries = entries,
    )
}

private inline fun resolveLadderFallback(
    ladder: String,
    intentSpecified: Boolean,
    derived: () -> FontFamilyRef,
    canonical: FontFamilyRef,
    entries: MutableList<ReportEntry>,
): FontFamilyRef = if (intentSpecified) {
    val family = derived()
    entries += fallbackEntry(ladder, family, isDynamic = true)
    family
} else {
    entries += fallbackEntry(ladder, canonical, isDynamic = false)
    canonical
}

private class AssignedLadders(
    val structure: FontFamilyRef?,
    val content: FontFamilyRef?,
    val metadata: FontFamilyRef?,
    val unusedCandidates: List<FontFamilyRef>,
)

private object CandidateAssigner {
    fun assign(
        candidates: List<FontFamilyRef>,
        pinnedStructure: FontFamilyRef?,
        pinnedContent: FontFamilyRef?,
        pinnedMetadata: FontFamilyRef?,
        profile: ThemeProfile,
        entries: MutableList<ReportEntry>,
    ): AssignedLadders = when {
        candidates.size == 1 ->
            assignSingle(
                single = candidates[0],
                pinnedStructure = pinnedStructure,
                pinnedContent = pinnedContent,
                pinnedMetadata = pinnedMetadata,
                entries = entries,
            )

        candidates.isNotEmpty() ->
            assignMultiple(
                candidates = candidates,
                pinnedStructure = pinnedStructure,
                pinnedContent = pinnedContent,
                pinnedMetadata = pinnedMetadata,
                profile = profile,
                entries = entries,
            )

        else -> AssignedLadders(pinnedStructure, pinnedContent, pinnedMetadata, emptyList())
    }

    private fun assignSingle(
        single: FontFamilyRef,
        pinnedStructure: FontFamilyRef?,
        pinnedContent: FontFamilyRef?,
        pinnedMetadata: FontFamilyRef?,
        entries: MutableList<ReportEntry>,
    ): AssignedLadders {
        var structure = pinnedStructure
        var content = pinnedContent
        var metadata = pinnedMetadata

        val isDisplay =
            when (single) {
                is FontFamilyRef.Catalog -> GoogleFontCatalog.find(single.id)?.category == GoogleFontsCategory.Display
                is FontFamilyRef.Custom -> false
            }
        if (structure == null) {
            structure = single
            entries += candidateEntry(LADDER_STRUCTURE, single, isReuse = false)
        }
        if (content == null && !isDisplay) {
            entries += candidateEntry(LADDER_CONTENT, single, isReuse = structure == single)
            content = single
        }
        if (metadata == null) {
            val isReuse = structure == single || content == single
            entries += candidateEntry(LADDER_METADATA, single, isReuse = isReuse)
            metadata = single
        }

        return AssignedLadders(structure, content, metadata, emptyList())
    }

    private fun assignMultiple(
        candidates: List<FontFamilyRef>,
        pinnedStructure: FontFamilyRef?,
        pinnedContent: FontFamilyRef?,
        pinnedMetadata: FontFamilyRef?,
        profile: ThemeProfile,
        entries: MutableList<ReportEntry>,
    ): AssignedLadders {
        var structure = pinnedStructure
        var content = pinnedContent
        var metadata = pinnedMetadata
        val pool = candidates.toMutableList()

        if (structure == null && pool.isNotEmpty()) {
            structure = pickCandidate(pool) { scoreCandidate(it, LADDER_STRUCTURE, profile) }
            entries += candidateEntry(LADDER_STRUCTURE, structure, isReuse = false)
        }
        if (content == null && pool.isNotEmpty()) {
            content = pickCandidate(pool) { scoreCandidate(it, LADDER_CONTENT, profile) }
            entries += candidateEntry(LADDER_CONTENT, content, isReuse = false)
        }
        if (metadata == null && pool.isNotEmpty()) {
            metadata = pickCandidate(pool) { scoreCandidate(it, LADDER_METADATA, profile) }
            entries += candidateEntry(LADDER_METADATA, metadata, isReuse = false)
        }

        return AssignedLadders(structure, content, metadata, pool)
    }

    private inline fun pickCandidate(
        pool: MutableList<FontFamilyRef>,
        scoreFn: (FontFamilyRef) -> Float,
    ): FontFamilyRef {
        var bestIndex = 0
        var bestScore = scoreFn(pool[0])

        for (i in 1 until pool.size) {
            val score = scoreFn(pool[i])
            if (score - bestScore > SCORE_TIE_EPSILON) {
                bestScore = score
                bestIndex = i
            }
        }

        return pool.removeAt(bestIndex)
    }

    private fun scoreCandidate(
        ref: FontFamilyRef,
        ladder: String,
        profile: ThemeProfile,
    ): Float {
        val entry =
            when (ref) {
                is FontFamilyRef.Catalog -> GoogleFontCatalog.find(ref.id)
                is FontFamilyRef.Custom -> null
            } ?: return DEFAULT_NEUTRAL_SCORE

        return when (ladder) {
            LADDER_STRUCTURE -> {
                val fit = 1.0f - abs(entry.expressiveness - profile.typographyExpressiveness01)
                entry.displayAffinity + CANDIDATE_EXPRESSIVENESS_WEIGHT * fit
            }

            LADDER_CONTENT -> entry.textAffinity
            else -> entry.metaAffinity
        }
    }
}

private fun candidateEntry(ladder: String, candidate: FontFamilyRef, isReuse: Boolean): ReportEntry = ReportEntry(
    path = "$FONTS_PATH.$ladder",
    stage = ResolutionStage.Fonts,
    status = ReportStatus.Modulated,
    message =
        if (isReuse) {
            "Single candidate reused for the $ladder ladder."
        } else {
            "Candidate assigned to the $ladder ladder by pairing order."
        },
    requested = candidate.label,
)

private fun FontFamilyRef?.pinned(ladder: String, entries: MutableList<ReportEntry>): FontFamilyRef? {
    if (this == null) {
        return null
    }

    entries +=
        ReportEntry(
            path = "$FONTS_PATH.$ladder",
            stage = ResolutionStage.Fonts,
            status = ReportStatus.Honored,
            message = "Role pin locks the $ladder ladder.",
            requested = label,
        )

    return this
}

private fun fallbackEntry(ladder: String, fallback: FontFamilyRef, isDynamic: Boolean): ReportEntry =
    ReportEntry(
        path = "$FONTS_PATH.$ladder",
        stage = ResolutionStage.Fonts,
        status = ReportStatus.Absent,
        message =
            if (isDynamic) {
                "No requested family fills the $ladder ladder; derived dynamically from catalog based on intent."
            } else {
                "No requested family fills the $ladder ladder; derivation bias applied."
            },
        enforced = fallback.label,
    )

private fun lockEntries(locks: Map<TypographyTokenPath, FontFamilyRef>): List<ReportEntry> = locks
    .map { (path, family) ->
        ReportEntry(
            path = path.path,
            stage = ResolutionStage.Fonts,
            status = ReportStatus.Honored,
            message = "Per-level Control lock wins over the ladder family.",
            requested = family.label,
        )
    }

private val FontFamilyRef.label: String
    get() =
        when (this) {
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
