package io.github.alph_a07.basis.theme.resolution.fonts

import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId

internal object FontCatalogDecoder {

    @Suppress("LongMethod", "MagicNumber")
    fun decode(bytes: ByteArray): List<FontCatalogEntry> {
        check(bytes.size >= HEADER_SIZE_BYTES) { "Font catalog buffer too small." }

        var pos = 0

        fun readByte(): Int = bytes[pos++].toInt() and BYTE_MASK

        fun readShort(): Int {
            val b0 = bytes[pos++].toInt() and BYTE_MASK
            val b1 = bytes[pos++].toInt() and BYTE_MASK
            return (b0 shl BITS_PER_BYTE) or b1
        }

        fun readInt(): Int {
            val b0 = bytes[pos++].toInt() and BYTE_MASK
            val b1 = bytes[pos++].toInt() and BYTE_MASK
            val b2 = bytes[pos++].toInt() and BYTE_MASK
            val b3 = bytes[pos++].toInt() and BYTE_MASK
            return (b0 shl 24) or (b1 shl 16) or (b2 shl 8) or b3
        }

        fun readFloat(): Float = Float.fromBits(readInt())

        fun readUtf(): String {
            val len = readShort()
            val str = bytes.decodeToString(pos, pos + len)
            pos += len
            return str
        }

        val magic0 = bytes[pos++]
        val magic1 = bytes[pos++]
        val magic2 = bytes[pos++]
        val magic3 = bytes[pos++]
        check(
            magic0 == MAGIC_B &&
                magic1 == MAGIC_F &&
                magic2 == MAGIC_N &&
                magic3 == MAGIC_T,
        ) { "Invalid catalog asset magic bytes." }

        val version = readShort()
        check(version == FORMAT_VERSION) { "Unsupported catalog format version: $version" }

        val count = readInt()
        val entries = ArrayList<FontCatalogEntry>(count)

        repeat(count) {
            val id = GoogleFontId(readUtf())
            val familyName = readUtf()
            val googleFontsKey = readUtf()
            val category = categoryFromCode(readByte())

            val flags = readByte()
            val serif = (flags and FLAG_SERIF) != 0
            val mono = (flags and FLAG_MONO) != 0

            val weightsCount = readByte()

            val displayAffinity = readFloat()
            val textAffinity = readFloat()
            val metaAffinity = readFloat()
            val expressiveness = readFloat()
            val roundness = readFloat()

            val opticalDensity = readFloat()
            val minOpticalSizeDp = readFloat()
            val lightModeWeightBias = readShort().toShort().toInt()

            val axisCount = readShort()
            val axes: Set<FontAxis> =
                if (axisCount == 0) {
                    emptySet()
                } else {
                    val set = LinkedHashSet<FontAxis>(axisCount)
                    repeat(axisCount) {
                        val tag = readUtf()
                        val min = readFloat()
                        val max = readFloat()
                        val defaultValue = readFloat()
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
                    opticalDensity = opticalDensity,
                    minOpticalSizeDp = minOpticalSizeDp,
                    lightModeWeightBias = lightModeWeightBias,
                ),
            )
        }

        return entries
    }

    fun categoryFromCode(code: Int): GoogleFontsCategory = when (code) {
        CATEGORY_CODE_SANS_SERIF -> GoogleFontsCategory.SansSerif
        CATEGORY_CODE_SERIF -> GoogleFontsCategory.Serif
        CATEGORY_CODE_DISPLAY -> GoogleFontsCategory.Display
        CATEGORY_CODE_HANDWRITING -> GoogleFontsCategory.Handwriting
        CATEGORY_CODE_MONOSPACE -> GoogleFontsCategory.Monospace
        else -> error("Unsupported Google Fonts category code: $code")
    }

    internal const val CATEGORY_CODE_SANS_SERIF: Int = 0
    internal const val CATEGORY_CODE_SERIF: Int = 1
    internal const val CATEGORY_CODE_DISPLAY: Int = 2
    internal const val CATEGORY_CODE_HANDWRITING: Int = 3
    internal const val CATEGORY_CODE_MONOSPACE: Int = 4

    private const val HEADER_SIZE_BYTES: Int = 10
    private const val BYTE_MASK: Int = 0xFF
    private const val BITS_PER_BYTE: Int = 8
    private const val FORMAT_VERSION: Int = 3
    private const val FLAG_SERIF: Int = 1
    private const val FLAG_MONO: Int = 2

    private const val MAGIC_B: Byte = 'B'.code.toByte()
    private const val MAGIC_F: Byte = 'F'.code.toByte()
    private const val MAGIC_N: Byte = 'N'.code.toByte()
    private const val MAGIC_T: Byte = 'T'.code.toByte()
}
