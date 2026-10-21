package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.resolution.identity.inferPresenceFromChroma
import io.github.alph_a07.basis.theme.resolution.identity.resolveBrandTints
import kotlin.test.Test
import kotlin.test.assertEquals

class PresenceChromaInferenceTest {

    @Test
    fun lowChromaInfersSubtle() {
        val inferred = inferPresenceFromChroma(0.05f)
        assertEquals(BrandPresence.Subtle, inferred)
    }

    @Test
    fun midChromaInfersBalanced() {
        val inferred = inferPresenceFromChroma(0.12f)
        assertEquals(BrandPresence.Balanced, inferred)
    }

    @Test
    fun highChromaInfersStrong() {
        val inferred = inferPresenceFromChroma(0.22f)
        assertEquals(BrandPresence.Strong, inferred)
    }

    @Test
    fun explicitPresenceWinsOverInference() {
        val tints =
            resolveBrandTints(
                presence = BrandPresence.Dominant,
                isDark = false,
                brandChroma = 0.22f,
            )
        val expectedDominantTints =
            resolveBrandTints(
                presence = BrandPresence.Dominant,
                isDark = false,
                brandChroma = 0.05f,
            )
        assertEquals(expectedDominantTints, tints)
    }
}
