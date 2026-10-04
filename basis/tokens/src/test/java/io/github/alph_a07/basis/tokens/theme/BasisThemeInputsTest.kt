package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.theme.appearance.BasisAppearance
import io.github.alph_a07.basis.tokens.theme.appearance.BasisSpacingAppearance
import io.github.alph_a07.basis.tokens.theme.constraints.BasisConstraints
import io.github.alph_a07.basis.tokens.theme.domain.BasisDomain
import io.github.alph_a07.basis.tokens.theme.domain.BasisDomainKind
import io.github.alph_a07.basis.tokens.theme.identity.BasisIdentity
import io.github.alph_a07.basis.tokens.theme.mood.BasisMood
import io.github.alph_a07.basis.tokens.theme.mood.BasisMoodProfile
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * Every input is independently optional, and omitting one is not the same as an empty one.
 */
class BasisThemeInputsTest {
    @Test
    fun everyInputMayBeOmitted() {
        val inputs = BasisThemeInputs()

        assertNull(inputs.identity)
        assertNull(inputs.mood)
        assertNull(inputs.domain)
        assertEquals(BasisAppearance(), inputs.appearance)
        assertEquals(BasisConstraints(), inputs.constraints)
    }

    @Test
    fun intentInputsCanBeSuppliedInAnySubset() {
        val onlyDomain = BasisThemeInputs(domain = BasisDomain(BasisDomainKind.Healthcare))

        assertNull(onlyDomain.identity)
        assertNull(onlyDomain.mood)
        assertNotNull(onlyDomain.domain)
    }

    @Test
    fun appearanceAloneIsTheBringYourOwnDesignSystemPath() {
        val inputs = BasisThemeInputs(
            appearance = BasisAppearance(spacing = BasisSpacingAppearance()),
        )

        assertNull(inputs.identity)
        assertNull(inputs.mood)
        assertNull(inputs.domain)
        assertNotNull(inputs.appearance)
    }

    @Test
    fun anOmittedInputIsDistinctFromAnEmptyOne() {
        val omitted = BasisThemeInputs()
        val expressedButEmpty = BasisThemeInputs(identity = BasisIdentity())

        assertNull(omitted.identity)
        // Omission says no material was offered; an empty Identity says material was offered and
        // it was empty. Theme Resolution reads these differently.
        assertNotNull(expressedButEmpty.identity)
        assertEquals(
            emptyList<Any>(),
            expressedButEmpty.identity?.brandColors.orEmpty(),
        )
    }

    @Test
    fun allInputsCanBeSuppliedTogether() {
        val inputs = BasisThemeInputs(
            identity = BasisIdentity(),
            mood = BasisMood(BasisMoodProfile.Calm),
            domain = BasisDomain(BasisDomainKind.Finance),
        )

        assertNotNull(inputs.identity)
        assertEquals(BasisMoodProfile.Calm, inputs.mood?.profile)
        assertEquals(BasisDomainKind.Finance, inputs.domain?.kind)
    }
}
