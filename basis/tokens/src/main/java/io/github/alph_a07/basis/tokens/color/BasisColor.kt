package io.github.alph_a07.basis.tokens.color

/**
 * Represents a color in ARGB format, where each channel is 8 bits.
 * @param argb The color value in ARGB format, packed into a single [UInt].
 * - Bits 24-31: Alpha channel (opacity)
 * - Bits 16-23: Red channel
 * - Bits 8-15: Green channel
 * - Bits 0-7: Blue channel
 */
@JvmInline
value class BasisColor(val argb: UInt) {

    val alpha: Int get() = ((argb shr 24) and 0xFFu).toInt()
    val red: Int get() = ((argb shr 16) and 0xFFu).toInt()
    val green: Int get() = ((argb shr 8) and 0xFFu).toInt()
    val blue: Int get() = (argb and 0xFFu).toInt()

    companion object {
        /**
         * Creates a [BasisColor] from a hex string.
         * The hex string can be in the following formats:
         * - "#RRGGBB" (6 hex digits, alpha defaults to 255)
         * - "RRGGBB" (6 hex digits, alpha defaults to 255)
         * - "#AARRGGBB" (8 hex digits, includes alpha)
         * - "AARRGGBB" (8 hex digits, includes alpha)
         * The '#' prefix is optional.
         *
         * @param hex The hex string representing the color.
         * @return A [BasisColor] instance corresponding to the provided hex string.
         * @throws IllegalArgumentException if the hex string is not valid.
         */
        fun fromHex(hex: String): BasisColor {
            val cleaned = hex.removePrefix("#")
            val withAlpha = when (cleaned.length) {
                6 -> "FF$cleaned"
                8 -> cleaned
                else -> throw IllegalArgumentException(
                    "BasisColor.fromHex expects 6 or 8 hex digits (optionally prefixed with '#'), got: \"$hex\""
                )
            }
            val value = withAlpha.toUIntOrNull(radix = 16)
                ?: throw IllegalArgumentException("BasisColor.fromHex: \"$hex\" is not valid hex")

            return BasisColor(value)
        }

        /**
         * Creates a [BasisColor] from individual ARGB channel values.
         *
         * @param alpha The alpha channel value (0-255).
         * @param red The red channel value (0-255).
         * @param green The green channel value (0-255).
         * @param blue The blue channel value (0-255).
         * @return A [BasisColor] instance corresponding to the provided channel values.
         * @throws IllegalArgumentException if any channel value is out of the 0-255 range.
         */
        fun fromArgb(alpha: Int, red: Int, green: Int, blue: Int): BasisColor {
            require(alpha in 0..255 && red in 0..255 && green in 0..255 && blue in 0..255) {
                "BasisColor fromArgb: channel values must be 0..255"
            }

            val packed = (alpha.toUInt() shl 24) or (red.toUInt() shl 16) or
                (green.toUInt() shl 8) or blue.toUInt()

            return BasisColor(packed)
        }
    }
}
