package io.github.alph_a07.basis.tokens.theme.inputs.identity

import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColor
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Identity carries visual material and prominence, not semantic color roles.
 */
class BasisIdentityTest {
    @Test
    fun anIdentityCanCarryNoColorMaterialAtAll() {
        val identity = BasisIdentity()
        assertTrue(identity.brandColors.isEmpty())
        assertTrue(identity.supportingColors.isEmpty())
    }

    @Test
    fun brandPresenceIsOrderedFromSubtleToProminent() {
        val names = BasisBrandPresence.entries.map { it.name }
        assertEquals(listOf("Subtle", "Balanced", "Prominent"), names)
    }

    @Test
    fun presenceDefaultsToBalancedRatherThanToNoIdentity() {
        assertEquals(BasisBrandPresence.Balanced, BasisIdentity().brandPresence)
    }

    @Test
    fun anyNumberOfColorsIsAcceptedInEitherList() {
        val many = List(6) { BasisColor.fromHex("FF0000") }
        val identity = BasisIdentity(brandColors = many, supportingColors = many)
        assertEquals(6, identity.brandColors.size)
        assertEquals(6, identity.supportingColors.size)
    }

    @Test
    fun colorOrderCarriesNoMeaningSoReorderingIsANewIdentity() {
        val a = BasisColor.fromHex("336699")
        val b = BasisColor.fromHex("CC2211")
        val forward = BasisIdentity(brandColors = listOf(a, b))
        val reversed = BasisIdentity(brandColors = listOf(b, a))
        // The contract makes no promise about which color matters more, so the two are distinct
        // values rather than being normalized into one canonical order.
        assertEquals(forward, BasisIdentity(brandColors = listOf(a, b)))
        assertNotEquals(forward, reversed)
    }
}
