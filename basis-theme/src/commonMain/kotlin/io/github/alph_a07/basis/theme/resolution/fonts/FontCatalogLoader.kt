package io.github.alph_a07.basis.theme.resolution.fonts

/**
 * Loads the vendored Google Fonts catalog entries.
 *
 * Implemented per-platform: classpath stream on JVM; asset / precompiled on JS.
 */
internal expect fun loadFontCatalogEntries(): List<FontCatalogEntry>
