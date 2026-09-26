package io.github.alph_a07.basis.tokens.typography

/** A closed set of font family references. */
sealed class BasisFontFamily {
    data object Default : BasisFontFamily()
    data object Display : BasisFontFamily()
    data object Mono : BasisFontFamily()
    data class Custom(val name: String) : BasisFontFamily()
}

/** The set of available font families. */
object BasisFontFamilyTokens {
    /** Default system stack for universal application UI and body copy. */
    val fontFamilyDefault: BasisFontFamily = BasisFontFamily.Default

    /** Secondary, more expressive stack for emphasized text. */
    val fontFamilyDisplay: BasisFontFamily = BasisFontFamily.Display

    /** Monospace stack for tabular data, code snippets, tokens, and technical identifiers. */
    val fontFamilyMono: BasisFontFamily = BasisFontFamily.Mono
}

/** The four locked font weights. */
object BasisFontWeightTokens {
    const val WEIGHT_REGULAR = 400
    const val WEIGHT_MEDIUM = 500
    const val WEIGHT_SEMIBOLD = 600
    const val WEIGHT_BOLD = 700
}

/** A text style, including size, line height, weight, and font family. */
data class BasisTextStyle(
    /** Size of the text in scale-independent pixels (sp). */
    val fontSizeSp: Float,
    /** Line height of the text in scale-independent pixels (sp). */
    val lineHeightSp: Float,
    /** Weight of the text. */
    val weight: Int = BasisFontWeightTokens.WEIGHT_REGULAR,
    /**
     * Font family of the text.
     * If `null`, the font family will be resolved based on the text's weight.
     */
    val fontFamily: BasisFontFamily? = null,
    /** Letter spacing of the text in scale-independent pixels (sp). */
    val letterSpacingSp: Float = 0f,
    /**
     *  Whether to use tabular numbers.
     * A tabular number is a number that has a fixed width, which makes it easier to align numbers in a table.
     */
    val useTabularNums: Boolean = false,
)

/**
 * Resolves the font family based on the text style's weight and the provided threshold.
 * @param displayWeightThreshold The minimum weight at which the display font family is used. Defaults to [BasisFontWeightTokens.WEIGHT_SEMIBOLD].
 * @return The resolved font family.
 */
fun BasisTextStyle.resolvedFontFamily(
    displayWeightThreshold: Int = BasisFontWeightTokens.WEIGHT_SEMIBOLD,
): BasisFontFamily =
    fontFamily ?: if (weight >= displayWeightThreshold) {
        BasisFontFamily.Display
    } else {
        BasisFontFamily.Default
    }

/** Applies [BasisFontFamilyTokens.fontFamilyMono] and monospaced digit alignment for tabular data. */
fun BasisTextStyle.tabularNums(): BasisTextStyle =
    copy(fontFamily = BasisFontFamilyTokens.fontFamilyMono, useTabularNums = true)

/** The text style scale, in sp. */
object BasisTypeScale {
    /** Largest display typography scale for hero marketing headers and prominent splash titles. */
    val displayLarge = BasisTextStyle(fontSizeSp = 57f, lineHeightSp = 64f, weight = BasisFontWeightTokens.WEIGHT_SEMIBOLD)
    /** Compact display typography scale for expressive hero callouts and section highlights. */
    val displaySmall = BasisTextStyle(fontSizeSp = 45f, lineHeightSp = 52f, weight = BasisFontWeightTokens.WEIGHT_SEMIBOLD)

    /** Primary headline typography scale for top-level screen headers and major feature titles. */
    val headlineLarge = BasisTextStyle(fontSizeSp = 32f, lineHeightSp = 40f, weight = BasisFontWeightTokens.WEIGHT_SEMIBOLD)
    /** Secondary headline typography scale for subsection headers, dialog titles, and card headers. */
    val headlineSmall = BasisTextStyle(fontSizeSp = 24f, lineHeightSp = 32f, weight = BasisFontWeightTokens.WEIGHT_SEMIBOLD)

    /** Large title typography scale for primary card headers, app bar titles, and modal headers. */
    val titleLarge = BasisTextStyle(fontSizeSp = 22f, lineHeightSp = 28f, weight = BasisFontWeightTokens.WEIGHT_SEMIBOLD)
    /** Medium title typography scale for section titles, dense list headers, and medium card titles. */
    val titleMedium = BasisTextStyle(fontSizeSp = 16f, lineHeightSp = 24f, weight = BasisFontWeightTokens.WEIGHT_MEDIUM)
    /** Compact title typography scale for nested headers, group captions, and compact card headers. */
    val titleSmall = BasisTextStyle(fontSizeSp = 14f, lineHeightSp = 20f, weight = BasisFontWeightTokens.WEIGHT_MEDIUM)

    /** Primary body typography scale for long-form reading, article text, and major paragraphs. */
    val bodyLarge = BasisTextStyle(fontSizeSp = 16f, lineHeightSp = 24f, weight = BasisFontWeightTokens.WEIGHT_REGULAR)
    /** Standard body typography scale for application UI copy, form labels, and list content. */
    val bodyMedium = BasisTextStyle(fontSizeSp = 14f, lineHeightSp = 20f, weight = BasisFontWeightTokens.WEIGHT_REGULAR)
    /** Compact body typography scale for secondary body descriptions, dense tables, and annotations. */
    val bodySmall = BasisTextStyle(fontSizeSp = 12f, lineHeightSp = 16f, weight = BasisFontWeightTokens.WEIGHT_REGULAR)

    /** Prominent label typography scale for primary buttons, action links, and tab titles. */
    val labelLarge = BasisTextStyle(fontSizeSp = 14f, lineHeightSp = 20f, weight = BasisFontWeightTokens.WEIGHT_MEDIUM)
    /** Standard label typography scale for chips, compact buttons, badge labels, and form tags. */
    val labelMedium = BasisTextStyle(fontSizeSp = 12f, lineHeightSp = 16f, weight = BasisFontWeightTokens.WEIGHT_MEDIUM)
    /** Smallest label typography scale for compact badge indicators, sub-labels, and tiny tags. */
    val labelSmall = BasisTextStyle(fontSizeSp = 11f, lineHeightSp = 16f, weight = BasisFontWeightTokens.WEIGHT_MEDIUM)

    /** Minimal typography scale for fine-print captions, timestamps, legal text, and table metadata. */
    val caption = BasisTextStyle(fontSizeSp = 10f, lineHeightSp = 14f, weight = BasisFontWeightTokens.WEIGHT_REGULAR)
}