package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.resolution.base.synthesizeNeutralChroma
import io.github.alph_a07.basis.theme.resolution.base.synthesizeNeutralHue
import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class NeutralSynthesisTest {

    @Test
    fun emptyDomainsReturnsFallbackHue() {
        val hue =
            synthesizeNeutralHue(
                profile = ThemeProfile.NEUTRAL,
                domains = emptySet(),
                effectiveWarmth = 0f,
            )
        assertEquals(255f, hue)
    }

    @Test
    fun singleFinanceDomainZeroWarmthReturnsNearFinanceAnchor() {
        val hue =
            synthesizeNeutralHue(
                profile = ThemeProfile.NEUTRAL,
                domains = setOf(ProductDomain.Finance),
                effectiveWarmth = 0f,
            )
        assertTrue(abs(hue - 210f) < 1e-4f, "Expected 210f, got $hue")
    }

    @Test
    fun financeAndSocialBlendBetweenAnchors() {
        val hue =
            synthesizeNeutralHue(
                profile = ThemeProfile.NEUTRAL,
                domains = setOf(ProductDomain.Finance, ProductDomain.Social),
                effectiveWarmth = 0f,
            )
        assertTrue(hue > 210f && hue < 295f, "Expected hue between 210 and 295, got $hue")
    }

    @Test
    fun circularMeanWrapsAcrossZeroDegrees() {
        val hue =
            synthesizeNeutralHue(
                profile = ThemeProfile.NEUTRAL,
                domains = setOf(ProductDomain.Commerce, ProductDomain.Media),
                effectiveWarmth = 0f,
            )
        // Commerce (30°) and Media (270°) wrap across 360°/0° to 330° (not linear 150°)
        assertTrue(abs(hue - 330f) < 1e-2f, "Expected 330f circular mean, got $hue")
    }

    @Test
    fun positiveWarmthRotatesTowardWarmAnchor() {
        // Finance is 210°; warm anchor is 65°. Shortest arc goes clockwise (downward to 185°)
        val financeWarm =
            synthesizeNeutralHue(
                profile = ThemeProfile.NEUTRAL,
                domains = setOf(ProductDomain.Finance),
                effectiveWarmth = 1f,
            )
        assertTrue(abs(financeWarm - 185f) < 1e-2f, "Expected 185f on Finance +warmth, got $financeWarm")

        // Commerce is 30°; warm anchor is 65°. Shortest arc goes counter-clockwise (upward to 55°)
        val commerceWarm =
            synthesizeNeutralHue(
                profile = ThemeProfile.NEUTRAL,
                domains = setOf(ProductDomain.Commerce),
                effectiveWarmth = 1f,
            )
        assertTrue(abs(commerceWarm - 55f) < 1e-2f, "Expected 55f on Commerce +warmth, got $commerceWarm")
    }

    @Test
    fun positiveOneChromaReturnsMaxChromas() {
        val chroma = synthesizeNeutralChroma(1f)
        assertTrue(abs(chroma.surface - 0.015f) < 1e-4f, "Expected 0.015f, got ${chroma.surface}")
        assertTrue(abs(chroma.content - 0.06f) < 1e-4f, "Expected 0.06f, got ${chroma.content}")
    }

    @Test
    fun negativeOneChromaReturnsZeroChromas() {
        val chroma = synthesizeNeutralChroma(-1f)
        assertEquals(0f, chroma.surface)
        assertEquals(0f, chroma.content)
        assertEquals(0f, chroma.border)
    }
}
