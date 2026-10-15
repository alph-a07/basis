package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.graphics.Color
import io.github.alph_a07.basis.components.theme.BasisColorLocals
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.resolve
import kotlin.math.abs
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import org.junit.Test

/**
 * Unit tests for OKLCH to Compose [Color] bridging and [BasisColorLocals] conversion.
 */
class ColorConversionsTest {

    private val tolerance = 0.02f

    @Test
    fun toColor_blackOklch_mapsToBlack() {
        val oklch = Oklch(l = 0f, c = 0f, h = 0f)
        val color = oklch.toColor()

        assertTrue(color.red <= tolerance, "Expected red near 0, got ${color.red}")
        assertTrue(color.green <= tolerance, "Expected green near 0, got ${color.green}")
        assertTrue(color.blue <= tolerance, "Expected blue near 0, got ${color.blue}")
        assertEquals(1f, color.alpha)
    }

    @Test
    fun toColor_whiteOklch_mapsToWhite() {
        val oklch = Oklch(l = 1f, c = 0f, h = 0f)
        val color = oklch.toColor()

        assertTrue(abs(color.red - 1f) <= tolerance, "Expected red near 1, got ${color.red}")
        assertTrue(abs(color.green - 1f) <= tolerance, "Expected green near 1, got ${color.green}")
        assertTrue(abs(color.blue - 1f) <= tolerance, "Expected blue near 1, got ${color.blue}")
        assertEquals(1f, color.alpha)
    }

    @Test
    fun toColor_preservesAlpha() {
        val oklch = Oklch(l = 0.6f, c = 0.15f, h = 180f, a = 0.42f)
        val color = oklch.toColor()

        assertTrue(abs(color.alpha - 0.42f) <= tolerance, "Alpha must be preserved within tolerance")
    }

    @Test
    fun toColor_channelsAreFiniteAndClamped() {
        val saturated = Oklch(l = 0.8f, c = 0.35f, h = 120f)
        val color = saturated.toColor()

        assertTrue(color.red in 0f..1f, "Red must be in [0, 1]")
        assertTrue(color.green in 0f..1f, "Green must be in [0, 1]")
        assertTrue(color.blue in 0f..1f, "Blue must be in [0, 1]")
    }

    @Test
    fun toArgb_preservesAlphaAndChannels() {
        val oklch = Oklch(l = 1f, c = 0f, h = 0f, a = 1f)
        val argb = oklch.toArgb()

        assertEquals(-1, argb, "White should produce packed ARGB 0xFFFFFFFF (-1)")
    }

    @Test
    fun colorSpecArgb_toColor_mapsDirectly() {
        val spec = io.github.alph_a07.basis.theme.core.color.ColorSpec.Argb(-0x10000)
        val color = spec.toColor()

        assertEquals(1f, color.alpha)
        assertEquals(1f, color.red)
        assertEquals(0f, color.green)
        assertEquals(0f, color.blue)
    }

    @Test
    fun toBasisColorLocals_populatesAllTreeBranches() {
        val pair = resolve(BasisIntent())
        val theme = pair.light!!
        val locals = theme.color.toBasisColorLocals()

        assertNotNull(locals.surface.default)
        assertNotNull(locals.surface.elevated)
        assertNotNull(locals.surface.recessed)
        assertNotNull(locals.surface.inverse)

        assertNotNull(locals.content.default)
        assertNotNull(locals.content.muted)
        assertNotNull(locals.content.inverse)

        assertNotNull(locals.icon.default)
        assertNotNull(locals.icon.muted)
        assertNotNull(locals.icon.inverse)

        assertNotNull(locals.border.default)
        assertNotNull(locals.border.muted)
        assertNotNull(locals.border.strong)
        assertNotNull(locals.border.inverse)

        assertNotNull(locals.selection.surface)
        assertNotNull(locals.selection.content)
        assertNotNull(locals.selection.border)

        assertNotNull(locals.focus.ring)

        assertNotNull(locals.positive.surface)
        assertNotNull(locals.negative.surface)
        assertNotNull(locals.caution.surface)
        assertNotNull(locals.info.surface)

        assertNotNull(locals.brand.primary)
    }
}
