package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.graphics.Color
import io.github.alph_a07.basis.components.theme.BasisColorLocals
import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.color.BrandColors
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
    fun toColor_primaryRed_mapsCorrectly() {
        val redOklch = Oklch(l = 0.628f, c = 0.258f, h = 29.2f)
        val color = redOklch.toColor()

        assertTrue(color.red > 0.8f, "Red channel should be dominant, got ${color.red}")
        assertTrue(color.green < 0.2f, "Green channel should be low, got ${color.green}")
        assertTrue(color.blue < 0.2f, "Blue channel should be low, got ${color.blue}")
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
        val spec = ColorSpec.Argb(-0x10000)
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

    @Test
    fun toBasisColorLocals_matchesTokenConversionExactly() {
        val theme = resolve(BasisIntent()).light!!
        val locals = theme.color.toBasisColorLocals()

        assertEquals(theme.color.surface.default.toColor(), locals.surface.default)
        assertEquals(theme.color.surface.elevated.toColor(), locals.surface.elevated)
        assertEquals(theme.color.surface.recessed.toColor(), locals.surface.recessed)
        assertEquals(theme.color.surface.inverse.toColor(), locals.surface.inverse)

        assertEquals(theme.color.content.default.toColor(), locals.content.default)
        assertEquals(theme.color.content.muted.toColor(), locals.content.muted)
        assertEquals(theme.color.content.inverse.toColor(), locals.content.inverse)

        assertEquals(theme.color.icon.default.toColor(), locals.icon.default)
        assertEquals(theme.color.icon.muted.toColor(), locals.icon.muted)
        assertEquals(theme.color.icon.inverse.toColor(), locals.icon.inverse)

        assertEquals(theme.color.border.default.toColor(), locals.border.default)
        assertEquals(theme.color.border.muted.toColor(), locals.border.muted)
        assertEquals(theme.color.border.strong.toColor(), locals.border.strong)
        assertEquals(theme.color.border.inverse.toColor(), locals.border.inverse)

        assertEquals(theme.color.selection.surface.toColor(), locals.selection.surface)
        assertEquals(theme.color.selection.content.toColor(), locals.selection.content)
        assertEquals(theme.color.selection.border.toColor(), locals.selection.border)

        assertEquals(theme.color.focus.ring.toColor(), locals.focus.ring)

        assertEquals(theme.color.positive.surface.toColor(), locals.positive.surface)
        assertEquals(theme.color.negative.surface.toColor(), locals.negative.surface)
        assertEquals(theme.color.caution.surface.toColor(), locals.caution.surface)
        assertEquals(theme.color.info.surface.toColor(), locals.info.surface)

        assertEquals(theme.color.brand.primary.toColor(), locals.brand.primary)
    }

    @Test
    fun toBasisColorLocals_supportingBrandColors_preserveNullWhenUnspecified() {
        val baseTheme = resolve(BasisIntent()).light!!
        val customColorTokens =
            baseTheme.color.copy(
                brand =
                    BrandColors(
                        primary = Oklch(0.5f, 0f, 0f),
                        secondary = null,
                        tertiary = null,
                        quaternary = null,
                    ),
            )
        val locals = customColorTokens.toBasisColorLocals()

        assertEquals(null, locals.brand.secondary)
        assertEquals(null, locals.brand.tertiary)

        assertEquals(null, locals.brand.quaternary)
    }

    @Test
    fun toBasisColorLocals_supportingBrandColors_convertsWhenSpecified() {
        val baseTheme = resolve(BasisIntent()).light!!
        val secondaryOklch = Oklch(0.6f, 0.1f, 120f)
        val customColorTokens =
            baseTheme.color.copy(
                brand =
                    BrandColors(
                        primary = Oklch(0.5f, 0.2f, 30f),
                        secondary = secondaryOklch,
                        tertiary = null,
                        quaternary = null,
                    ),
            )
        val locals = customColorTokens.toBasisColorLocals()

        assertNotNull(locals.brand.secondary)
        assertEquals(secondaryOklch.toColor(), locals.brand.secondary)
        assertEquals(null, locals.brand.tertiary)

        assertEquals(null, locals.brand.quaternary)
    }
}
