package io.github.alph_a07.basis.theme.resolution.fonts

import java.io.InputStream
import java.util.zip.GZIPInputStream

/** Deserializes the vendored Google Fonts catalog binary asset. */
internal object FontCatalogReader {

    /**
     * Reads all catalog entries from a gzipped binary input stream.
     *
     * @param input Stream supplying the binary catalog resource.
     * @return Deserialized list of [FontCatalogEntry] items.
     */
    fun readCatalog(input: InputStream): List<FontCatalogEntry> {
        val bytes = GZIPInputStream(input).use { it.readBytes() }
        return FontCatalogDecoder.decode(bytes)
    }

    fun categoryFromCode(code: Int): GoogleFontsCategory = FontCatalogDecoder.categoryFromCode(code)

    internal const val CATEGORY_CODE_SANS_SERIF: Int = FontCatalogDecoder.CATEGORY_CODE_SANS_SERIF
    internal const val CATEGORY_CODE_SERIF: Int = FontCatalogDecoder.CATEGORY_CODE_SERIF
    internal const val CATEGORY_CODE_DISPLAY: Int = FontCatalogDecoder.CATEGORY_CODE_DISPLAY
    internal const val CATEGORY_CODE_HANDWRITING: Int = FontCatalogDecoder.CATEGORY_CODE_HANDWRITING
    internal const val CATEGORY_CODE_MONOSPACE: Int = FontCatalogDecoder.CATEGORY_CODE_MONOSPACE
}
