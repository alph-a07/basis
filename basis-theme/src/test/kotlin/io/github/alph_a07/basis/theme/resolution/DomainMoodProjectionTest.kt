package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.resolution.domain.PriorGain
import io.github.alph_a07.basis.theme.resolution.domain.PriorVector
import io.github.alph_a07.basis.theme.resolution.domain.blendPriorVectors
import io.github.alph_a07.basis.theme.resolution.domain.priorSeedBiases
import io.github.alph_a07.basis.theme.resolution.mood.MoodProfile
import io.github.alph_a07.basis.theme.resolution.mood.isUnspecified
import io.github.alph_a07.basis.theme.resolution.mood.projectMoodModulators
import io.github.alph_a07.basis.theme.resolution.mood.resolveMood
import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

private fun assertNear(expected: Float, actual: Float, label: String = "") {
    assertTrue(abs(expected - actual) <= 1e-4f, "Expected $expected but was $actual ($label)")
}

class DomainMoodProjectionTest {

    @Test
    fun emptyIntentYieldsZeroPriorAndNeutralBiases() {
        val blended = blendPriorVectors(DomainIntent())
        assertEquals(PriorVector.ZERO, blended)
        val seed = priorSeedBiases(blended, PriorGain.UNSPECIFIED)
        assertEquals(0f, seed.aesthetic.density)
        assertEquals(0f, seed.aesthetic.warmth)
        assertEquals(0f, seed.structural.ctaEmphasis)
        val (profile, effective) = resolveMood(null, seed.aesthetic)
        assertEquals(MoodProfile.NEUTRAL, profile)
        assertEquals(MoodProfile.NEUTRAL, effective)
    }

    @Test
    fun financePlusDataNavigationKeepsConservativeMax() {
        val blended =
            blendPriorVectors(
                DomainIntent(
                    domains = setOf(ProductDomain.Finance),
                    interactions = setOf(InteractionPattern.DataNavigation),
                ),
            )
        assertNear(0.80f, blended.riskSensitivity, "risk")
        assertNear(0.75f, blended.trustStrictness, "trust")
        assertNear(0.45f * 0.55f + 0.55f * 0.85f, blended.dataDensity, "density")
        assertNear(0.45f * -0.50f + 0.55f * -0.40f, blended.socialPresence, "social")
        val seed = priorSeedBiases(blended, PriorGain.UNSPECIFIED)
        assertTrue(seed.aesthetic.density > 0.3f, "density ${seed.aesthetic.density}")
        assertTrue(seed.aesthetic.playfulness < -0.2f, "play ${seed.aesthetic.playfulness}")
        assertTrue(seed.structural.borderClarity > 0.3f, "borders ${seed.structural.borderClarity}")
    }

    @Test
    fun playfulDominatedByMoodNotWashedToNeutral() {
        val blended =
            blendPriorVectors(
                DomainIntent(
                    domains = setOf(ProductDomain.Social),
                    interactions = setOf(InteractionPattern.ContentFeed),
                ),
            )
        val seed = priorSeedBiases(blended, PriorGain.SPECIFIED)
        val (profile, effective) = resolveMood(MoodIntent(preset = MoodPreset.Playful), seed.aesthetic)
        assertNear(0.65f, profile.roundness, "preset roundness")
        assertNear(0.75f, profile.playfulness, "preset playfulness")
        assertTrue(effective.roundness > 0.5f, "roundness ${effective.roundness}")
        assertTrue(effective.playfulness > 0.5f, "play ${effective.playfulness}")
        assertTrue(effective.motionEnergy > 0.4f, "motion ${effective.motionEnergy}")
    }

    @Test
    fun financePlusPlayfulKeepsTrustworthyChromeWithPlayfulEnergy() {
        val blended = blendPriorVectors(DomainIntent(domains = setOf(ProductDomain.Finance)))
        val seed = priorSeedBiases(blended, PriorGain.SPECIFIED)
        val (profile, effective) = resolveMood(MoodIntent(preset = MoodPreset.Playful), seed.aesthetic)
        assertTrue(seed.aesthetic.contrast > 0.1f, "contrast ${seed.aesthetic.contrast}")
        assertTrue(seed.structural.borderClarity > 0.2f, "borders ${seed.structural.borderClarity}")
        assertTrue(effective.playfulness > 0.4f, "play ${effective.playfulness}")
        assertTrue(effective.roundness > 0.3f, "round ${effective.roundness}")
        assertEquals(0.75f, profile.playfulness)
    }

    @Test
    fun knobReplaceOverridesSingleAxisOnly() {
        val seed = priorSeedBiases(PriorVector.ZERO, PriorGain.SPECIFIED)
        val (profile, _) =
            resolveMood(
                MoodIntent(preset = MoodPreset.Bold, knobs = MoodKnobs(chroma = -0.8f)),
                seed.aesthetic,
            )
        assertNear(-0.8f, profile.chroma, "replaced chroma")
        assertNear(0.55f, profile.contrast, "bold contrast")
        assertNear(-0.35f, profile.roundness, "bold roundness")
        assertNear(0.35f, profile.motionEnergy, "bold motion")
    }

    @Test
    fun moodUnspecifiedDrivesPriorGain() {
        assertTrue(null.isUnspecified())
        assertTrue(MoodIntent().isUnspecified())
        assertTrue(MoodIntent(knobs = MoodKnobs()).isUnspecified())
        assertTrue(!MoodIntent(preset = MoodPreset.Calm).isUnspecified())
        assertTrue(!MoodIntent(knobs = MoodKnobs(warmth = 0.5f)).isUnspecified())
    }

    @Test
    fun domainNeverSetsWarmthButKnobDoes() {
        val blended =
            blendPriorVectors(
                DomainIntent(
                    domains = setOf(ProductDomain.Finance, ProductDomain.Social),
                    interactions = setOf(InteractionPattern.DataNavigation),
                ),
            )
        val seed = priorSeedBiases(blended, PriorGain.UNSPECIFIED)
        assertEquals(0f, seed.aesthetic.warmth)
        val (_, effective) =
            resolveMood(
                MoodIntent(preset = MoodPreset.Playful, knobs = MoodKnobs(warmth = 1f)),
                seed.aesthetic,
            )
        assertNear(1f, effective.warmth, "warmth")
        val modulators = projectMoodModulators(effective, seed.structural, blended)
        assertNear(25f, modulators.neutralHueShiftDegrees, "neutral shift")
        assertNear(6f, modulators.brandDerivativeMaxShiftDegrees, "brand cap")
    }

    @Test
    fun familyModulatorFormulas() {
        val effective =
            MoodProfile(
                warmth = 0f,
                chroma = 0.5f,
                contrast = 0.5f,
                density = 1f,
                roundness = -1f,
                typographyExpressiveness = 0.5f,
                motionEnergy = 1f,
                playfulness = 0f,
            )
        val zero = priorSeedBiases(PriorVector.ZERO, PriorGain.SPECIFIED)
        val modulators = projectMoodModulators(effective, zero.structural, PriorVector.ZERO)
        assertNear(0.84f, modulators.spacingScale, "spacing")
        assertNear(0.50f, modulators.radiusScale, "radius")
        assertNear(1f + 0.5f * 0.15f, modulators.depthScale, "depth")
        assertNear(1f + 0.5f * 0.12f, modulators.structureDisplayScale, "display")
        assertNear(0.65f, modulators.durationScale, "duration")
        assertNear(1f + 0.5f * 0.40f, modulators.accentChromaScale, "accent chroma")
    }
}
