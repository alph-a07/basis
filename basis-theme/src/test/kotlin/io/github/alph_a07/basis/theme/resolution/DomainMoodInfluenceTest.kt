package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.intent.isSpecified
import io.github.alph_a07.basis.theme.intent.isUnspecified
import io.github.alph_a07.basis.theme.resolution.derive.calculateDerivationWeights
import io.github.alph_a07.basis.theme.resolution.domain.blendDomainInfluence
import io.github.alph_a07.basis.theme.resolution.mood.MoodInfluenceGain
import io.github.alph_a07.basis.theme.resolution.mood.blendMoodInfluence
import io.github.alph_a07.basis.theme.resolution.mood.moodInfluenceGain
import io.github.alph_a07.basis.theme.resolution.mood.resolveMoodProfile
import io.github.alph_a07.basis.theme.resolution.mood.scaleInfluenceBiases
import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

private fun assertNear(expected: Float, actual: Float, label: String = "") {
    assertTrue(abs(expected - actual) <= 1e-4f, "Expected $expected but was $actual ($label)")
}

class DomainMoodInfluenceTest {

    @Test
    fun emptyIntentYieldsZeroInfluenceAndNeutralBiases() {
        val blended = blendDomainInfluence(DomainIntent())
        assertEquals(ThemeProfile.NEUTRAL, blended)
        val scaled = scaleInfluenceBiases(blended, MoodInfluenceGain.UNSPECIFIED)
        assertEquals(0f, scaled.density)
        assertEquals(0f, scaled.warmth)
        assertEquals(0f, scaled.ctaEmphasis)
        val effective = blendMoodInfluence(blended, null)
        assertEquals(ThemeProfile.NEUTRAL, effective)
    }

    @Test
    fun financePlusDataNavigationKeepsConservativeMax() {
        val blended =
            blendDomainInfluence(
                DomainIntent(
                    domains = setOf(ProductDomain.Finance),
                    interactions = setOf(InteractionPattern.DataNavigation),
                ),
            )
        assertNear(0.80f, blended.riskSensitivity, "risk")
        assertNear(0.75f, blended.trustStrictness, "trust")
        assertNear(0.45f * 0.55f + 0.55f * 0.85f, blended.dataDensity, "density")
        assertNear(0.45f * -0.50f + 0.55f * -0.40f, blended.socialPresence, "social")
        val scaled = scaleInfluenceBiases(blended, MoodInfluenceGain.UNSPECIFIED)
        assertTrue(scaled.density > 0.3f, "density ${scaled.density}")
        assertTrue(scaled.playfulness < -0.2f, "play ${scaled.playfulness}")
        assertTrue(scaled.borderClarity > 0.3f, "borders ${scaled.borderClarity}")
    }

    @Test
    fun playfulDominatedByMoodNotWashedToNeutral() {
        val blended =
            blendDomainInfluence(
                DomainIntent(
                    domains = setOf(ProductDomain.Social),
                    interactions = setOf(InteractionPattern.ContentFeed),
                ),
            )
        val effective = blendMoodInfluence(blended, MoodIntent(preset = MoodPreset.Playful))
        val presetProfile = resolveMoodProfile(MoodIntent(preset = MoodPreset.Playful))
        assertNear(0.65f, presetProfile.roundness, "preset roundness")
        assertNear(0.75f, presetProfile.playfulness, "preset playfulness")
        assertTrue(effective.roundness > 0.5f, "roundness ${effective.roundness}")
        assertTrue(effective.playfulness > 0.5f, "play ${effective.playfulness}")
        assertTrue(effective.motionEnergy > 0.4f, "motion ${effective.motionEnergy}")
    }

    @Test
    fun financePlusPlayfulKeepsTrustworthyChromeWithPlayfulEnergy() {
        val blended = blendDomainInfluence(DomainIntent(domains = setOf(ProductDomain.Finance)))
        val scaled = scaleInfluenceBiases(blended, MoodInfluenceGain.SPECIFIED)
        val effective = blendMoodInfluence(blended, MoodIntent(preset = MoodPreset.Playful))
        val presetProfile = resolveMoodProfile(MoodIntent(preset = MoodPreset.Playful))
        assertTrue(scaled.contrast > 0.1f, "contrast ${scaled.contrast}")
        assertTrue(scaled.borderClarity > 0.2f, "borders ${scaled.borderClarity}")
        assertTrue(effective.playfulness > 0.4f, "play ${effective.playfulness}")
        assertTrue(effective.roundness > 0.3f, "round ${effective.roundness}")
        assertEquals(0.75f, presetProfile.playfulness)
    }

    @Test
    fun knobReplaceOverridesSingleAxisOnly() {
        val profile =
            resolveMoodProfile(
                MoodIntent(preset = MoodPreset.Bold, knobs = MoodKnobs(chroma = -0.8f)),
            )
        assertNear(-0.8f, profile.chroma, "replaced chroma")
        assertNear(0.55f, profile.contrast, "bold contrast")
        assertNear(-0.35f, profile.roundness, "bold roundness")
        assertNear(0.35f, profile.motionEnergy, "bold motion")
    }

    @Test
    fun moodUnspecifiedDrivesInfluenceGain() {
        assertTrue(null.isUnspecified())
        assertTrue(!null.isSpecified())
        assertEquals(MoodInfluenceGain.UNSPECIFIED, null.moodInfluenceGain())
        assertTrue(MoodIntent().isUnspecified())
        assertTrue(!MoodIntent().isSpecified())
        assertEquals(MoodInfluenceGain.UNSPECIFIED, MoodIntent().moodInfluenceGain())
        assertTrue(MoodIntent(knobs = MoodKnobs()).isUnspecified())
        assertTrue(!MoodIntent(knobs = MoodKnobs()).isSpecified())
        assertEquals(MoodInfluenceGain.UNSPECIFIED, MoodIntent(knobs = MoodKnobs()).moodInfluenceGain())
        assertTrue(!MoodIntent(preset = MoodPreset.Calm).isUnspecified())
        assertTrue(MoodIntent(preset = MoodPreset.Calm).isSpecified())
        assertEquals(MoodInfluenceGain.SPECIFIED, MoodIntent(preset = MoodPreset.Calm).moodInfluenceGain())
        assertTrue(!MoodIntent(knobs = MoodKnobs(warmth = 0.5f)).isUnspecified())
        assertTrue(MoodIntent(knobs = MoodKnobs(warmth = 0.5f)).isSpecified())
        assertEquals(MoodInfluenceGain.SPECIFIED, MoodIntent(knobs = MoodKnobs(warmth = 0.5f)).moodInfluenceGain())
    }

    @Test
    fun domainNeverSetsWarmthButKnobDoes() {
        val blended =
            blendDomainInfluence(
                DomainIntent(
                    domains = setOf(ProductDomain.Finance, ProductDomain.Social),
                    interactions = setOf(InteractionPattern.DataNavigation),
                ),
            )
        val effective =
            blendMoodInfluence(
                blended,
                MoodIntent(preset = MoodPreset.Playful, knobs = MoodKnobs(warmth = 1f)),
            )
        assertNear(1f, effective.warmth, "warmth")
        val weights = calculateDerivationWeights(effective)
        assertNear(25f, weights.neutralHueShiftDegrees, "neutral shift")
        assertNear(6f, weights.brandDerivativeMaxShiftDegrees, "brand cap")
    }

    @Test
    fun familyDeriveWeightsFormulas() {
        val effective =
            ThemeProfile(
                warmth = 0f,
                chroma = 0.5f,
                contrast = 0.5f,
                density = 1f,
                roundness = -1f,
                typographyExpressiveness = 0.5f,
                motionEnergy = 1f,
                playfulness = 0f,
            )
        val weights = calculateDerivationWeights(effective)
        assertNear(0.84f, weights.spacingScale, "spacing")
        assertNear(0.50f, weights.radiusScale, "radius")
        assertNear(1f + 0.5f * 0.15f, weights.depthScale, "depth")
        assertNear(1f + 0.5f * 0.12f, weights.structureDisplayScale, "display")
        assertNear(0.65f, weights.durationScale, "duration")
        assertNear(1.164f, weights.accentChromaScale, "accent chroma")
        assertEquals(2, weights.structureWeightBias, "weight bias")
    }

    @Test
    fun nonLinearDensityUsesSmoothstep() {
        val neutralDensity = ThemeProfile.NEUTRAL
        val weightsNeutral = calculateDerivationWeights(neutralDensity)
        assertNear(1.00f, weightsNeutral.spacingScale, "midpoint spacing")

        val quarterDensity = ThemeProfile.NEUTRAL.copy(density = -0.5f)
        val weightsQuarter = calculateDerivationWeights(quarterDensity)
        // t = 0.25, smoothstep(0.25) = 0.0625 * 2.5 = 0.15625, lerp(1.16, 0.84, 0.15625) = 1.11f
        assertNear(1.16f - 0.32f * 0.15625f, weightsQuarter.spacingScale, "quarter density smoothstep")
    }

    @Test
    fun nonLinearRoundnessPerceptualCurve() {
        val neutralRoundness = ThemeProfile.NEUTRAL
        val weightsNeutral = calculateDerivationWeights(neutralRoundness)
        // t = 0.5, 0.5^0.6 ≈ 0.65975, lerp(0.50, 1.55, 0.65975) ≈ 1.1927f (> linear 1.025f)
        assertTrue(weightsNeutral.radiusScale > 1.15f, "roundness is concave and elevated at neutral")
    }

    @Test
    fun crossAxisInteractionsProactivelyScale() {
        val energeticAndPlayful = ThemeProfile.NEUTRAL.copy(motionEnergy = 0.8f, playfulness = 0.8f)
        val weightsEnergy = calculateDerivationWeights(energeticAndPlayful)
        // linear would be 0.8*0.5 + 0.8*0.4 = 0.72; with cross term 0.8*0.8*0.25 = 0.16 => 0.88f
        assertNear(0.88f, weightsEnergy.emphasisBoost, "cross-term synergy")

        val highContrastAndChroma = ThemeProfile.NEUTRAL.copy(contrast = 0.8f, chroma = 0.8f)
        val weightsChroma = calculateDerivationWeights(highContrastAndChroma)
        val linearAccentChroma = 1f + 0.8f * 0.40f
        assertTrue(
            weightsChroma.accentChromaScale < linearAccentChroma,
            "superlinear saturation attenuation",
        )
    }

    @Test
    fun typographyWeightBiasUsesDiscreteSteps() {
        val lowExpr = ThemeProfile.NEUTRAL.copy(typographyExpressiveness = -0.6f)
        assertEquals(0, calculateDerivationWeights(lowExpr).structureWeightBias)

        val midExpr = ThemeProfile.NEUTRAL.copy(typographyExpressiveness = 0.0f)
        assertEquals(1, calculateDerivationWeights(midExpr).structureWeightBias)

        val highExpr = ThemeProfile.NEUTRAL.copy(typographyExpressiveness = 0.6f)
        assertEquals(2, calculateDerivationWeights(highExpr).structureWeightBias)
    }
}
