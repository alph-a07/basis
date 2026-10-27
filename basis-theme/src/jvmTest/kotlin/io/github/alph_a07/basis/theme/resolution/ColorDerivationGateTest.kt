package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.IdentityIntent
import io.github.alph_a07.basis.theme.intent.ProductDomain
import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class ColorDerivationGateTest {

    @Test
    fun deriveColorsFalseYieldsAchromaticNeutralsAndBrand() {
        val intent = BasisIntent(identity = IdentityIntent(deriveColors = false))
        val resolved = resolve(intent)

        val light = resolved.light
        assertNotNull(light)

        // Surfaced tokens
        assertEquals(0f, light.color.surface.default.c)
        assertEquals(0f, light.color.surface.elevated.c)
        assertEquals(0f, light.color.surface.recessed.c)
        assertEquals(0f, light.color.surface.inverse.c)

        // Content tokens
        assertEquals(0f, light.color.content.default.c)
        assertEquals(0f, light.color.content.muted.c)
        assertEquals(0f, light.color.content.inverse.c)

        // Icon tokens
        assertEquals(0f, light.color.icon.default.c)
        assertEquals(0f, light.color.icon.muted.c)
        assertEquals(0f, light.color.icon.inverse.c)

        // Border tokens
        assertEquals(0f, light.color.border.default.c)
        assertEquals(0f, light.color.border.muted.c)
        assertEquals(0f, light.color.border.strong.c)
        assertEquals(0f, light.color.border.inverse.c)

        // Selection & Focus tokens
        assertEquals(0f, light.color.selection.surface.c)
        assertEquals(0f, light.color.selection.content.c)
        assertEquals(0f, light.color.selection.border.c)
        assertEquals(0f, light.color.focus.ring.c)

        // Brand primary
        assertEquals(0f, light.color.brand.primary.c)
    }

    @Test
    fun deriveColorsTrueWithFinanceDomainYieldsNearFinanceHue() {
        val intent =
            BasisIntent(
                domain = DomainIntent(domains = setOf(ProductDomain.Finance)),
                identity = IdentityIntent(deriveColors = true),
            )
        val resolved = resolve(intent)
        val light = resolved.light
        assertNotNull(light)

        // Neutral hue should be within ±25° of 210°
        val diff = abs(light.color.surface.default.h - 210f)
        assertTrue(diff <= 25f, "Expected surface hue near 210f, got ${light.color.surface.default.h}")
    }

    @Test
    fun deriveColorsTrueWithNoDomainPreservesFallbackHue() {
        val intent = BasisIntent(identity = IdentityIntent(deriveColors = true))
        val resolved = resolve(intent)
        val light = resolved.light
        assertNotNull(light)

        // Fallback neutral hue is 255f
        assertEquals(255f, light.color.surface.default.h)
    }
}
