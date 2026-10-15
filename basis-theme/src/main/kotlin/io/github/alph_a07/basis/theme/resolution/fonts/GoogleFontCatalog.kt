package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId

/** Access point for vendored Google Fonts catalog metadata and typographic affinity tags. */
public object GoogleFontCatalog {

    /**
     * Returns all available catalog entries in canonical upstream popularity order (highest popularity first).
     *
     * Derivation tie-breaks leverage this ordering to deterministically prefer more widely-vetted typographic families.
     */
    public val all: List<FontCatalogEntry> by lazy {
        val stream =
            GoogleFontCatalog::class.java.getResourceAsStream(RESOURCE_PATH)
                ?: error("Failed to load Google Fonts catalog resource at $RESOURCE_PATH")
        stream.use { FontCatalogReader.readCatalog(it) }
    }

    /**
     * Looks up a catalog entry by its [GoogleFontId].
     *
     * Matching is case-insensitive and normalizes spaces and underscores to hyphens.
     *
     * @param id Identifier of the font family to find.
     * @return The matching [FontCatalogEntry], or null if not present in the catalog.
     */
    public fun find(id: GoogleFontId): FontCatalogEntry? = byNormalizedKey[normalizeKey(id.value)]

    /**
     * Returns whether the catalog contains an entry matching [id].
     *
     * @param id Identifier to check.
     * @return `true` if present, `false` otherwise.
     */
    public fun contains(id: GoogleFontId): Boolean = find(id) != null

    /**
     * Returns all entries belonging to [category], pre-indexed for fast retrieval.
     *
     * @param category Typographic classification to filter by.
     * @return List of catalog entries in [category].
     */
    public fun byCategory(category: GoogleFontsCategory): List<FontCatalogEntry> =
        byCategoryMap[category] ?: emptyList()

    /** Returns the top candidate entries for structural display typography. */
    internal val topStructureCandidates: List<FontCatalogEntry> by lazy {
        all.asSequence()
            .filter { it.displayAffinity >= STRUCTURE_AFFINITY_FLOOR }
            .sortedByDescending { it.displayAffinity }
            .take(TOP_CANDIDATE_POOL_SIZE)
            .toList()
    }

    /** Returns the top candidate entries for content/reading typography. */
    internal val topContentCandidates: List<FontCatalogEntry> by lazy {
        all.asSequence()
            .filter { it.textAffinity >= CONTENT_AFFINITY_FLOOR }
            .sortedByDescending { it.textAffinity }
            .take(TOP_CANDIDATE_POOL_SIZE)
            .toList()
    }

    /** Returns the top candidate entries for metadata/caption typography. */
    internal val topMetadataCandidates: List<FontCatalogEntry> by lazy {
        all.asSequence()
            .filter { it.metaAffinity >= METADATA_AFFINITY_FLOOR }
            .sortedByDescending { it.metaAffinity }
            .take(TOP_CANDIDATE_POOL_SIZE)
            .toList()
    }

    private val byNormalizedKey: Map<String, FontCatalogEntry> by lazy {
        val map = HashMap<String, FontCatalogEntry>(all.size * 2)
        for (entry in all) {
            map[normalizeKey(entry.id.value)] = entry
            map[normalizeKey(entry.familyName)] = entry
        }
        map
    }

    private val byCategoryMap: Map<GoogleFontsCategory, List<FontCatalogEntry>> by lazy {
        all.groupBy { it.category }
    }

    private fun normalizeKey(raw: String): String =
        raw.trim().lowercase().replace('_', '-').replace(' ', '-')

    private const val RESOURCE_PATH: String = "/basis/fonts/google-fonts-catalog.bin.gz"
    private const val TOP_CANDIDATE_POOL_SIZE: Int = 50

    /** Minimum display affinity threshold for structural candidate consideration. */
    internal const val STRUCTURE_AFFINITY_FLOOR: Float = 0.60f

    /** Minimum text affinity threshold for body content candidate consideration. */
    internal const val CONTENT_AFFINITY_FLOOR: Float = 0.70f

    /** Minimum metadata affinity threshold for caption/tabular candidate consideration. */
    internal const val METADATA_AFFINITY_FLOOR: Float = 0.65f
}
