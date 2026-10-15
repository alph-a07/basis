package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId

/** Derived font fallbacks used when no requested family fills a ladder. */
internal object DefaultFontBias {

    /** Text-leaning sans used for the content ladder and for restrained structure ladders. */
    val TEXT: FontFamilyRef = FontFamilyRef.Catalog(GoogleFontId("inter"))

    /** Display-leaning sans used for the structure ladder when typography is expressive. */
    val DISPLAY: FontFamilyRef = FontFamilyRef.Catalog(GoogleFontId("archivo"))

    /** Compact sans used for the metadata ladder. */
    val METADATA: FontFamilyRef = FontFamilyRef.Catalog(GoogleFontId("inter"))

    /** Expressiveness threshold at or above which the structure ladder takes the display bias. */
    const val DISPLAY_THRESHOLD: Float = 0.35f
}
