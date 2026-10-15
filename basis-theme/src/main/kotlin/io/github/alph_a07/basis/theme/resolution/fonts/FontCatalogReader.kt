package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId
import java.io.BufferedInputStream
import java.io.DataInputStream
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
        val gzip = GZIPInputStream(input)
        val data = DataInputStream(BufferedInputStream(gzip))

        val magic = ByteArray(MAGIC_BYTES_LENGTH)
        data.readFully(magic)
        check(magic.contentEquals(MAGIC_BYTES)) { "Invalid catalog asset magic bytes." }

        val version = data.readShort().toInt()
        check(version == FORMAT_VERSION) { "Unsupported catalog format version: $version" }

        val count = data.readInt()
        val entries = ArrayList<FontCatalogEntry>(count)

        repeat(count) {
            val id = GoogleFontId(data.readUTF())
            val familyName = data.readUTF()
            val googleFontsKey = data.readUTF()
            val category = categoryFromCode(data.readByte().toInt())

            val flags = data.readByte().toInt()
            val serif = (flags and FLAG_SERIF) != 0
            val mono = (flags and FLAG_MONO) != 0

            val weightsCount = data.readByte().toInt() and 0xFF

            val displayAffinity = data.readFloat()
            val textAffinity = data.readFloat()
            val metaAffinity = data.readFloat()
            val expressiveness = data.readFloat()
            val roundness = data.readFloat()

            val axisCount = data.readShort().toInt()
            val axes =
                if (axisCount == 0) {
                    emptySet()
                } else {
                    val set = HashSet<FontAxis>(axisCount)
                    repeat(axisCount) {
                        val tag = data.readUTF()
                        val min = data.readFloat()
                        val max = data.readFloat()
                        val defaultValue = data.readFloat()
                        set.add(FontAxis(tag = tag, min = min, max = max, defaultValue = defaultValue))
                    }
                    set
                }

            entries.add(
                FontCatalogEntry(
                    id = id,
                    familyName = familyName,
                    googleFontsKey = googleFontsKey,
                    category = category,
                    axes = axes,
                    displayAffinity = displayAffinity,
                    textAffinity = textAffinity,
                    metaAffinity = metaAffinity,
                    expressiveness = expressiveness,
                    roundness = roundness,
                    serif = serif,
                    mono = mono,
                    weightsCount = weightsCount,
                ),
            )
        }

        return entries
    }

    /** Explicit byte-to-enum mapping decoupled from Kotlin enum declaration order. */
    fun categoryFromCode(code: Int): GoogleFontsCategory = when (code) {
        CATEGORY_CODE_SANS_SERIF -> GoogleFontsCategory.SansSerif
        CATEGORY_CODE_SERIF -> GoogleFontsCategory.Serif
        CATEGORY_CODE_DISPLAY -> GoogleFontsCategory.Display
        CATEGORY_CODE_HANDWRITING -> GoogleFontsCategory.Handwriting
        CATEGORY_CODE_MONOSPACE -> GoogleFontsCategory.Monospace
        else -> error("Unsupported Google Fonts category code: $code")
    }

    private val MAGIC_BYTES: ByteArray =
        byteArrayOf('B'.code.toByte(), 'F'.code.toByte(), 'N'.code.toByte(), 'T'.code.toByte())
    private const val MAGIC_BYTES_LENGTH: Int = 4
    private const val FORMAT_VERSION: Int = 2
    private const val FLAG_SERIF: Int = 1
    private const val FLAG_MONO: Int = 2

    internal const val CATEGORY_CODE_SANS_SERIF: Int = 0
    internal const val CATEGORY_CODE_SERIF: Int = 1
    internal const val CATEGORY_CODE_DISPLAY: Int = 2
    internal const val CATEGORY_CODE_HANDWRITING: Int = 3
    internal const val CATEGORY_CODE_MONOSPACE: Int = 4
}
