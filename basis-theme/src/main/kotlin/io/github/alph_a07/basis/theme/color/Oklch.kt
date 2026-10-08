package io.github.alph_a07.basis.theme.color

/**
 * A color in the OKLCH color space, the single color representation used in the theme system.
 *
 * @property l Lightness in `0..1`.
 * @property c Chroma, `>= 0`.
 * @property h Hue in degrees, `[0, 360]`.
 * @property a Alpha in `0..1`. defaults to `1` (opaque).
 */
@Suppress("MagicNumber")
public data class Oklch(
    public val l: Float,
    public val c: Float,
    public val h: Float,
    public val a: Float = 1f,
) {
    init {
        require(l.isFinite() && l in 0f..1f) { "Oklch.l must be in 0..1, was $l." }
        require(c.isFinite() && c >= 0f) { "Oklch.c must be finite and >= 0, was $c." }
        require(h.isFinite() && h in 0f..360f) { "Oklch.h must be in [0, 360], was $h." }
        require(a.isFinite() && a in 0f..1f) { "Oklch.a must be in 0..1, was $a." }
    }
}
