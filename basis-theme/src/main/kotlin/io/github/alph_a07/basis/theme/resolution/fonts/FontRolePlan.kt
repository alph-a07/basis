package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Font families resolved once per intent, shared by every generated mode.
 *
 * @property structure Family for the structure ladder.
 * @property content Family for the content ladder.
 * @property metadata Family for the metadata ladder.
 * @property levelFamilies Per-level Control locks, which win over the ladder family.
 * @property unusedCandidates Requested candidates that no role consumed.
 * @property entries Diagnostics for pins, reuse, and derivation.
 */
internal data class FontRolePlan(
    val structure: FontFamilyRef,
    val content: FontFamilyRef,
    val metadata: FontFamilyRef,
    val levelFamilies: Map<TypographyTokenPath, FontFamilyRef>,
    val unusedCandidates: List<FontFamilyRef>,
    val entries: List<ReportEntry>,
) {
    /** Family for one typography level, preferring a Control lock over the ladder family. */
    fun familyFor(path: TypographyTokenPath): FontFamilyRef = levelFamilies[path] ?: ladderFamily(path)

    private fun ladderFamily(path: TypographyTokenPath): FontFamilyRef {
        val ladder = path.name.substringBefore("Level")

        return when (ladder) {
            "Structure" -> {
                structure
            }
            "Content" -> {
                content
            }
            else -> {
                metadata
            }
        }
    }
}
