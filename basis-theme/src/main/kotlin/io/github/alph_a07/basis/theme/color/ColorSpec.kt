package io.github.alph_a07.basis.theme.color

/**
 * Consumer-supplied color in any supported intake space, converted to [Oklch] during normalization.
 *
 * [Oklch] itself implements this interface, so round-trip specifications need no wrapper variant.
 *
 * The [Hex], [Argb], and [Hsl] constructors are lenient so resolution can report instead of
 * crashing: values that cannot be interpreted (a hex string that does not parse, non-finite
 * components) are rejected with a report entry, and out-of-range components are clamped.
 */
public sealed interface ColorSpec {

    /**
     * sRGB hex string, with or without a leading `#`, six digits plus optional two-digit alpha.
     *
     * @property value Raw hex text, e.g. `"#6750A4"` or `"886750A4"`.
     */
    public data class Hex(public val value: String) : ColorSpec

    /**
     * Packed sRGB integer in `0xAARRGGBB` channel layout.
     *
     * @property argb Packed alpha, red, green, and blue channels.
     */
    public data class Argb(public val argb: Int) : ColorSpec

    /**
     * HSL intake color; hue in degrees, saturation and lightness as fractions.
     *
     * @property h Hue in degrees.
     * @property s Saturation in `0..1`.
     * @property l Lightness in `0..1`.
     * @property a Alpha in `0..1`. Defaults to `1` (opaque).
     */
    public data class Hsl(
        public val h: Float,
        public val s: Float,
        public val l: Float,
        public val a: Float = 1f,
    ) : ColorSpec
}
