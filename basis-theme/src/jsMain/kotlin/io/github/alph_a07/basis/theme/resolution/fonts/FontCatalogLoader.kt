package io.github.alph_a07.basis.theme.resolution.fonts

internal actual fun loadFontCatalogEntries(): List<FontCatalogEntry> {
    val uncompressedBytes = readGzippedCatalogAsset() ?: return emptyList()
    return FontCatalogDecoder.decode(uncompressedBytes)
}

private fun readGzippedCatalogAsset(): ByteArray? = try {
    val fs = js("require('fs')")
    val zlib = js("require('zlib')")
    val path = js("require('path')")

    val candidates =
        arrayOf(
            path.resolve(js("__dirname"), "basis/fonts/google-fonts-catalog.bin.gz"),
            path.resolve(js("__dirname"), "../basis/fonts/google-fonts-catalog.bin.gz"),
            path.resolve(
                js("process.cwd()"),
                "build/js/packages/Basis-basis-theme-test/kotlin/basis/fonts/google-fonts-catalog.bin.gz",
            ),
            path.resolve(
                js("process.cwd()"),
                "basis-theme/src/commonMain/resources/basis/fonts/google-fonts-catalog.bin.gz",
            ),
            path.resolve(
                js("process.cwd()"),
                "basis-theme/build/processedResources/js/main/basis/fonts/google-fonts-catalog.bin.gz",
            ),
        )

    var foundPath: String? = null
    for (candidate in candidates) {
        val s = candidate as String
        if (fs.existsSync(s) as Boolean) {
            foundPath = s
            break
        }
    }

    if (foundPath != null) {
        val compressed = fs.readFileSync(foundPath)
        val decompressed = zlib.gunzipSync(compressed)
        val len = decompressed.length as Int
        ByteArray(len) { i -> (decompressed[i] as Number).toByte() }
    } else {
        null
    }
} catch (_: Throwable) {
    null
}
