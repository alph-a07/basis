package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.resolution.domain.PriorVector
import io.github.alph_a07.basis.theme.resolution.domain.dataDensity01
import io.github.alph_a07.basis.theme.resolution.domain.trustStrictness01
import io.github.alph_a07.basis.theme.resolution.mood.MoodProfile
import io.github.alph_a07.basis.theme.resolution.mood.roundness01
import io.github.alph_a07.basis.theme.resolution.mood.typographyExpressiveness01
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import kotlin.math.abs

/**
 * Dynamically scores and derives typographic ladder families from the vendored catalog based on mood and domain priors.
 *
 * Content ladder derivation intentionally prioritizes high-legibility sans-serif workhorses for default UI body text
 * across varied display densities and small screen sizes. Consumers requiring editorial serif body text can supply
 * candidates or explicit pins via typography overrides.
 */
internal object FontCatalogDerivation {

    /** Derives the most suitable display/headline family for the structure ladder. */
    fun deriveStructure(aesthetic: MoodProfile, prior: PriorVector): FontFamilyRef {
        val targetExpr = aesthetic.typographyExpressiveness01
        val targetRound = aesthetic.roundness01
        val trust = prior.trustStrictness01

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
    fun deriveContent(aesthetic: MoodProfile, prior: PriorVector): FontFamilyRef {
        val targetRound = aesthetic.roundness01
        val trust = prior.trustStrictness01

        var bestEntry: FontCatalogEntry? = null
        var bestScore = Float.NEGATIVE_INFINITY

        for (entry in GoogleFontCatalog.all) {
            if (entry.mono || entry.textAffinity < GoogleFontCatalog.CONTENT_AFFINITY_FLOOR) continue
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
    fun deriveMetadata(aesthetic: MoodProfile, prior: PriorVector): FontFamilyRef {
        val targetRound = aesthetic.roundness01
        val density = prior.dataDensity01

        var bestEntry: FontCatalogEntry? = null
        var bestScore = Float.NEGATIVE_INFINITY

        for (entry in GoogleFontCatalog.all) {
            if (entry.metaAffinity < GoogleFontCatalog.METADATA_AFFINITY_FLOOR) continue
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

    /**
     * Preserves popularity order for tie-breaking: since [GoogleFontCatalog.all] is sorted by popularity,
     * the earlier candidate in the catalog wins ties within [CATALOG_TIE_EPSILON].
     */
    private fun isBetterCandidate(
        score: Float,
        bestEntry: FontCatalogEntry?,
        bestScore: Float,
    ): Boolean = bestEntry == null || score > bestScore + CATALOG_TIE_EPSILON

    /** Weight given to headline display suitability in dynamic structure scoring. */
    private const val STRUCTURE_DISPLAY_WEIGHT: Float = 0.40f

    /** Weight given to mood expressiveness alignment in dynamic structure scoring. */
    private const val STRUCTURE_EXPR_WEIGHT: Float = 0.30f

    /** Weight given to mood roundness alignment in dynamic structure scoring. */
    private const val STRUCTURE_ROUND_WEIGHT: Float = 0.30f

    /** Penalty factor applied to expressiveness when domain trust is high in structure scoring. */
    private const val STRUCTURE_TRUST_WEIGHT: Float = 0.25f

    /** Minimum distinct weight count recommended for a multi-level structure ladder. */
    private const val STRUCTURE_MIN_WEIGHT_DEPTH: Int = 3

    /** Penalty applied to candidate structure families lacking sufficient weight depth in restrained contexts. */
    private const val STRUCTURE_WEIGHT_DEPTH_PENALTY: Float = 0.30f

    /** Expressiveness threshold below which shallow weight depth is penalized for structure headlines. */
    private const val STRUCTURE_RESTRAINED_EXPR_THRESHOLD: Float = 0.60f

    /** Domain trust strictness threshold above which shallow weight depth is penalized for structure headlines. */
    private const val STRUCTURE_ELEVATED_TRUST_THRESHOLD: Float = 0.40f

    /** Weight given to mood roundness alignment in dynamic content scoring. */
    private const val CONTENT_ROUND_WEIGHT: Float = 0.15f

    /** Bonus factor applied to text affinity when domain trust is high in content scoring. */
    private const val CONTENT_TRUST_WEIGHT: Float = 0.10f

    /** Weight given to mood roundness alignment in dynamic metadata scoring. */
    private const val METADATA_ROUND_WEIGHT: Float = 0.10f

    /** Explicit data density threshold above which metadata ladder prefers monospace candidates. */
    private const val METADATA_MONOSPACE_DENSITY_THRESHOLD: Float = 0.60f

    /** Base bonus given to monospace families when data density meets or exceeds threshold. */
    private const val METADATA_MONOSPACE_BONUS: Float = 0.10f

    /** Bonus factor scaled by data density prior for monospace entries. */
    private const val METADATA_DENSITY_WEIGHT: Float = 0.08f

    /** Minimum score difference required to beat an earlier (more popular) candidate. */
    private const val CATALOG_TIE_EPSILON: Float = 0.0001f
}
