package io.github.alph_a07.basis.theme.resolution.fonts

import java.util.zip.GZIPInputStream

internal actual fun loadFontCatalogEntries(): List<FontCatalogEntry> {
    val stream =
        GoogleFontCatalog::class.java.getResourceAsStream(RESOURCE_PATH)
            ?: error("Failed to load Google Fonts catalog resource at $RESOURCE_PATH")
    val decompressed = GZIPInputStream(stream).use { it.readBytes() }
    return FontCatalogDecoder.decode(decompressed)
}

private const val RESOURCE_PATH: String = "/basis/fonts/google-fonts-catalog.bin.gz"
