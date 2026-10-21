package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.resolution.ThemeProfile
import io.github.alph_a07.basis.theme.resolution.constants.CATALOG_TIE_EPSILON
import io.github.alph_a07.basis.theme.resolution.constants.CONTENT_OPTICAL_DENSITY_FLOOR
import io.github.alph_a07.basis.theme.resolution.constants.CONTENT_ROUND_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.CONTENT_TEXT_AFFINITY_FLOOR
import io.github.alph_a07.basis.theme.resolution.constants.CONTENT_TRUST_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.DefaultFontBias
import io.github.alph_a07.basis.theme.resolution.constants.METADATA_AFFINITY_FLOOR
import io.github.alph_a07.basis.theme.resolution.constants.METADATA_DENSITY_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.METADATA_MONOSPACE_BONUS
import io.github.alph_a07.basis.theme.resolution.constants.METADATA_MONOSPACE_DENSITY_THRESHOLD
import io.github.alph_a07.basis.theme.resolution.constants.METADATA_OPTICAL_DENSITY_FLOOR
import io.github.alph_a07.basis.theme.resolution.constants.METADATA_ROUND_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.STRUCTURE_DISPLAY_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.STRUCTURE_ELEVATED_TRUST_THRESHOLD
import io.github.alph_a07.basis.theme.resolution.constants.STRUCTURE_EXPR_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.STRUCTURE_MIN_WEIGHT_DEPTH
import io.github.alph_a07.basis.theme.resolution.constants.STRUCTURE_RESTRAINED_EXPR_THRESHOLD
import io.github.alph_a07.basis.theme.resolution.constants.STRUCTURE_ROUND_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.STRUCTURE_TRUST_WEIGHT
import io.github.alph_a07.basis.theme.resolution.constants.STRUCTURE_WEIGHT_DEPTH_PENALTY
import io.github.alph_a07.basis.theme.resolution.dataDensity01
import io.github.alph_a07.basis.theme.resolution.roundness01
import io.github.alph_a07.basis.theme.resolution.trustStrictness01
import io.github.alph_a07.basis.theme.resolution.typographyExpressiveness01
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import kotlin.math.abs

/**
 * Dynamically scores and derives typographic ladder families from the vendored catalog based on the theme profile.
 *
 * Content ladder derivation intentionally prioritizes high-legibility sans-serif workhorses for default UI body text
 * across varied display densities and small screen sizes. Consumers requiring editorial serif body text can supply
 * candidates or explicit pins via typography overrides.
 */
internal object FontCatalogDerivation {

    /** Derives the most suitable display/headline family for the structure ladder. */
    fun deriveStructure(profile: ThemeProfile): FontFamilyRef {
        val targetExpr = profile.typographyExpressiveness01
        val targetRound = profile.roundness01
        val trust = profile.trustStrictness01

        var bestEntry: FontCatalogEntry? = null
        var bestScore = Float.NEGATIVE_INFINITY

        for (entry in GoogleFontCatalog.all) {
            val score = scoreStructureEntry(entry, targetExpr, targetRound, trust)
            if (isBetterCandidate(score, bestEntry, bestScore)) {
                bestScore = score
                bestEntry = entry
            }
        }

        val selectedId = bestEntry?.id ?: (DefaultFontBias.DISPLAY as FontFamilyRef.Catalog).id
        return FontFamilyRef.Catalog(selectedId)
    }

    /** Derives the most suitable high-legibility body family for the content ladder. */
    fun deriveContent(profile: ThemeProfile): FontFamilyRef {
        val targetRound = profile.roundness01
        val trust = profile.trustStrictness01

        var bestEntry: FontCatalogEntry? = null
        var bestScore = Float.NEGATIVE_INFINITY

        for (entry in GoogleFontCatalog.all) {
            if (!isEligibleForContent(entry)) {
                continue
            }
            val score = scoreContentEntry(entry, targetRound, trust)
            if (isBetterCandidate(score, bestEntry, bestScore)) {
                bestScore = score
                bestEntry = entry
            }
        }

        val selectedId = bestEntry?.id ?: (DefaultFontBias.TEXT as FontFamilyRef.Catalog).id
        return FontFamilyRef.Catalog(selectedId)
    }

    /** Derives the most suitable caption/table family for the metadata ladder. */
    fun deriveMetadata(profile: ThemeProfile): FontFamilyRef {
        val targetRound = profile.roundness01
        val density = profile.dataDensity01

        var bestEntry: FontCatalogEntry? = null
        var bestScore = Float.NEGATIVE_INFINITY

        for (entry in GoogleFontCatalog.all) {
            if (entry.opticalDensity < METADATA_OPTICAL_DENSITY_FLOOR || entry.metaAffinity < METADATA_AFFINITY_FLOOR) {
                continue
            }
            val score = scoreMetadataEntry(entry, targetRound, density)
            if (isBetterCandidate(score, bestEntry, bestScore)) {
                bestScore = score
                bestEntry = entry
            }
        }

        val selectedId = bestEntry?.id ?: (DefaultFontBias.METADATA as FontFamilyRef.Catalog).id
        return FontFamilyRef.Catalog(selectedId)
    }

    private fun scoreStructureEntry(
        entry: FontCatalogEntry,
        targetExpr: Float,
        targetRound: Float,
        trust: Float,
    ): Float {
        val exprFit = 1.0f - abs(entry.expressiveness - targetExpr)
        val roundFit = 1.0f - abs(entry.roundness - targetRound)
        val trustPenalty = entry.expressiveness * trust * STRUCTURE_TRUST_WEIGHT
        val weightPenalty =
            if (
                entry.weightsCount < STRUCTURE_MIN_WEIGHT_DEPTH &&
                (targetExpr < STRUCTURE_RESTRAINED_EXPR_THRESHOLD || trust > STRUCTURE_ELEVATED_TRUST_THRESHOLD)
            ) {
                STRUCTURE_WEIGHT_DEPTH_PENALTY
            } else {
                0.0f
            }
        return STRUCTURE_DISPLAY_WEIGHT * entry.displayAffinity +
            STRUCTURE_EXPR_WEIGHT * exprFit +
            STRUCTURE_ROUND_WEIGHT * roundFit -
            trustPenalty -
            weightPenalty
    }

    private fun scoreContentEntry(
        entry: FontCatalogEntry,
        targetRound: Float,
        trust: Float,
    ): Float {
        val roundFit = 1.0f - abs(entry.roundness - targetRound)
        val trustBonus = trust * entry.textAffinity * CONTENT_TRUST_WEIGHT
        return entry.textAffinity + CONTENT_ROUND_WEIGHT * roundFit + trustBonus
    }

    private fun scoreMetadataEntry(
        entry: FontCatalogEntry,
        targetRound: Float,
        density: Float,
    ): Float {
        val roundFit = 1.0f - abs(entry.roundness - targetRound)
        val monoBonus =
            if (entry.mono) {
                if (density >= METADATA_MONOSPACE_DENSITY_THRESHOLD) {
                    METADATA_MONOSPACE_BONUS + density * METADATA_DENSITY_WEIGHT
                } else {
                    0.0f
                }
            } else {
                0.0f
            }
        return entry.metaAffinity + METADATA_ROUND_WEIGHT * roundFit + monoBonus
    }

    private fun isEligibleForContent(entry: FontCatalogEntry): Boolean =
        !entry.mono &&
            entry.category != GoogleFontsCategory.Display &&
            entry.textAffinity >= CONTENT_TEXT_AFFINITY_FLOOR &&
            entry.opticalDensity >= CONTENT_OPTICAL_DENSITY_FLOOR

    /**
     * Preserves popularity order for tie-breaking: since [GoogleFontCatalog.all] is sorted by popularity,
     * the earlier candidate in the catalog wins ties within [CATALOG_TIE_EPSILON].
     */
    private fun isBetterCandidate(
        score: Float,
        bestEntry: FontCatalogEntry?,
        bestScore: Float,
    ): Boolean = bestEntry == null || score > bestScore + CATALOG_TIE_EPSILON
}
