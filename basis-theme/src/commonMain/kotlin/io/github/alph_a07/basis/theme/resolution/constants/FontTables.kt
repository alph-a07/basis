package io.github.alph_a07.basis.theme.resolution.constants

/** Standard step between numeric font weights. */
internal const val FONT_WEIGHT_STEP: Int = 100

/** Minimum permissible font weight. */
internal const val FONT_MIN_WEIGHT: Int = 100

/** Maximum permissible font weight. */
internal const val FONT_MAX_WEIGHT: Int = 900

/** Weight given to headline display suitability in dynamic structure scoring. */
internal const val STRUCTURE_DISPLAY_WEIGHT: Float = 0.40f

/** Weight given to mood expressiveness alignment in dynamic structure scoring. */
internal const val STRUCTURE_EXPR_WEIGHT: Float = 0.30f

/** Weight given to mood roundness alignment in dynamic structure scoring. */
internal const val STRUCTURE_ROUND_WEIGHT: Float = 0.30f

/** Penalty factor applied to expressiveness when domain trust is high in structure scoring. */
internal const val STRUCTURE_TRUST_WEIGHT: Float = 0.25f

/** Minimum distinct weight count recommended for a multi-level structure ladder. */
internal const val STRUCTURE_MIN_WEIGHT_DEPTH: Int = 3

/** Penalty applied to candidate structure families lacking sufficient weight depth in restrained contexts. */
internal const val STRUCTURE_WEIGHT_DEPTH_PENALTY: Float = 0.30f

/** Expressiveness threshold below which shallow weight depth is penalized for structure headlines. */
internal const val STRUCTURE_RESTRAINED_EXPR_THRESHOLD: Float = 0.60f

/** Domain trust strictness threshold above which shallow weight depth is penalized for structure headlines. */
internal const val STRUCTURE_ELEVATED_TRUST_THRESHOLD: Float = 0.40f

/** Weight given to mood roundness alignment in dynamic content scoring. */
internal const val CONTENT_ROUND_WEIGHT: Float = 0.15f

/** Bonus factor applied to text affinity when domain trust is high in content scoring. */
internal const val CONTENT_TRUST_WEIGHT: Float = 0.10f

/** Weight given to mood roundness alignment in dynamic metadata scoring. */
internal const val METADATA_ROUND_WEIGHT: Float = 0.10f

/** Explicit data density threshold above which metadata ladder prefers monospace candidates. */
internal const val METADATA_MONOSPACE_DENSITY_THRESHOLD: Float = 0.60f

/** Base bonus given to monospace families when data density meets or exceeds threshold. */
internal const val METADATA_MONOSPACE_BONUS: Float = 0.10f

/** Bonus factor scaled by data density influence for monospace entries. */
internal const val METADATA_DENSITY_WEIGHT: Float = 0.08f

/** Minimum score difference required to beat an earlier (more popular) candidate. */
internal const val CATALOG_TIE_EPSILON: Float = 0.0001f

/** Minimum optical density required for candidate families in the content ladder. */
internal const val CONTENT_OPTICAL_DENSITY_FLOOR: Float = 0.35f

/** Minimum optical density required for candidate families in the metadata ladder. */
internal const val METADATA_OPTICAL_DENSITY_FLOOR: Float = 0.35f

/** Minimum text affinity required for content body families. */
internal const val CONTENT_TEXT_AFFINITY_FLOOR: Float = 0.50f

/** Minimum meta affinity required for metadata caption families. */
internal const val METADATA_AFFINITY_FLOOR: Float = 0.40f

/** Minimum score difference required to break pairing order tie. */
internal const val SCORE_TIE_EPSILON: Float = 0.05f

/** Weight given to mood expressiveness alignment in structure scoring. */
internal const val CANDIDATE_EXPRESSIVENESS_WEIGHT: Float = 0.15f

/** Neutral fallback score used when catalog metadata is unavailable. */
internal const val DEFAULT_NEUTRAL_SCORE: Float = 0.5f

/** Sentinel score returned when a candidate fails a hard role-affinity gate. */
internal const val DISQUALIFIED_SCORE: Float = -100.0f

/** Minimum text affinity required to be eligible for the content ladder. */
internal const val CONTENT_TEXT_AFFINITY_GATE: Float = 0.40f

/** Minimum meta affinity required to be eligible for the metadata ladder. */
internal const val METADATA_AFFINITY_GATE: Float = 0.30f

/** Maximum number of top candidates retained per typographic category pool. */
internal const val TOP_CANDIDATE_POOL_SIZE: Int = 50

/** Minimum display affinity threshold for structural candidate consideration. */
internal const val STRUCTURE_AFFINITY_FLOOR: Float = 0.60f

/** Minimum text affinity threshold for body content candidate consideration. */
internal const val CONTENT_AFFINITY_FLOOR: Float = 0.70f

/** Minimum metadata affinity threshold for caption/tabular candidate consideration. */
internal const val METADATA_AFFINITY_POOL_FLOOR: Float = 0.65f
