package io.github.alph_a07.basis.tokens.vocabulary.color

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Every color role has a value in the scheme, and the catalogue stops where it means to.
 */
class BasisColorSchemeTest {
    private fun scheme(): BasisColorScheme {
        val black = BasisColor.fromHex("#000000")
        val white = BasisColor.fromHex("#FFFFFF")
        val gradient = gradient(black, white, GradientDirection.Vertical)
        val status = StatusColorSet(surface = black, content = black, icon = black, border = black)

        return BasisColorScheme(
            surface = SurfaceColors(surface = black, elevated = black, recessed = black, inverse = white),
            content = ContentColors(content = black, muted = black, inverse = white),
            icon = IconColors(icon = black, muted = black, inverse = white),
            border = BorderColors(border = black, muted = black, strong = black, inverse = white),
            selection = SelectionColors(surface = black, content = black, border = black),
            focus = FocusColors(ring = black),
            status = StatusColors(
                positive = status,
                negative = status,
                caution = status,
                info = status,
            ),
            gradients = GradientColors(brand = gradient, surface = gradient),
        )
    }

    @Test
    fun rolesResolveToTheirOwnGroupRatherThanACatchAll() {
        val colors = scheme()

        assertEquals(colors.content.content, colors[BasisColorRole.ContentDefault])
        assertEquals(colors.content.muted, colors[BasisColorRole.ContentMuted])
        assertEquals(colors.content.inverse, colors[BasisColorRole.ContentInverse])
        assertEquals(colors.border.inverse, colors[BasisColorRole.BorderInverse])
        assertEquals(colors.selection.surface, colors[BasisColorRole.SelectionSurface])
        assertEquals(colors.selection.content, colors[BasisColorRole.SelectionContent])
        assertEquals(colors.selection.border, colors[BasisColorRole.SelectionBorder])
        assertEquals(colors.focus.ring, colors[BasisColorRole.FocusRing])
    }

    @Test
    fun statusCarriesItsOwnPresentationRoles() {
        val colors = scheme()

        assertEquals(colors.status.negative.surface, colors[BasisColorRole.NegativeSurface])
        assertEquals(colors.status.caution.icon, colors[BasisColorRole.CautionIcon])
        assertEquals(colors.status.info.border, colors[BasisColorRole.InfoBorder])
        assertEquals(colors.status.positive.content, colors[BasisColorRole.PositiveContent])
    }

    @Test
    fun theCatalogueDoesNotPublishAStateOrContextRole() {
        val names = BasisColorRole.entries.map { it.name.lowercase() }

        for (disabled in listOf("disabled", "hover", "pressed", "skeleton", "overlay", "interactive")) {
            assertTrue(
                "Disabled and interaction conditions are state on a role, not roles of their own; found $disabled",
                names.none { disabled in it },
            )
        }
    }

    @Test
    fun inverseRolesAreDistinctFromTheirDefaultCounterparts() {
        val colors = scheme()

        assertNotEquals(colors.content.content, colors.content.inverse)
        assertNotEquals(colors.border.border, colors.border.inverse)
    }
}
