package io.github.alph_a07.basis.theme.core.color

import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class OklchConversionTest {

    @Test
    fun toArgb_blackAndWhite() {
        val black = Oklch(l = 0f, c = 0f, h = 0f)
        val white = Oklch(l = 1f, c = 0f, h = 0f)

        assertEquals(-0x1000000, black.toArgb())
        assertEquals(-0x1, white.toArgb())
    }

    @Test
    fun toArgb_preservesAlpha() {
        val oklch = Oklch(l = 0.5f, c = 0.1f, h = 180f, a = 0.42f)
        val alpha = (oklch.toArgb() ushr 24 and 0xFF) / 255f

        assertTrue(abs(alpha - 0.42f) <= 0.01f)
    }

    @Test
    fun toColorSpecArgb_wrapsCalculatedArgb() {
        val oklch = Oklch(l = 0.7f, c = 0.15f, h = 120f, a = 0.9f)
        val spec = oklch.toColorSpecArgb()

        assertEquals(oklch.toArgb(), spec.argb)
    }

    @Test
    fun toColorSpecArgb_roundTripNormalization() {
        val original = Oklch(l = 0.65f, c = 0.05f, h = 210f)
        val spec = original.toColorSpecArgb()
        val recovered = spec.toOklchOrNull()

        assertNotNull(recovered)
        assertTrue(abs(recovered.l - original.l) <= 0.02f)
        assertTrue(abs(recovered.c - original.c) <= 0.02f)
        assertTrue(abs(recovered.h - original.h) <= 2f)
    }
}
