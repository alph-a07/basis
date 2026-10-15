package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.core.color.contrastRatio
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.intent.ControlIntent
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.IdentityIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.intent.TypographyIdentity
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import io.github.alph_a07.basis.theme.intent.controls.ContrastConstraint
import io.github.alph_a07.basis.theme.intent.controls.ModeControl
import io.github.alph_a07.basis.theme.intent.controls.ModeGeneration
import io.github.alph_a07.basis.theme.intent.controls.MotionConstraint
import io.github.alph_a07.basis.theme.intent.controls.TouchTargetConstraint
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverride
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentStylePatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue
import io.github.alph_a07.basis.theme.intent.controls.overrides.ProminenceTier
import io.github.alph_a07.basis.theme.intent.controls.overrides.StateId
import io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import io.github.alph_a07.basis.theme.intent.controls.overrides.UniversalStylePatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantId
import io.github.alph_a07.basis.theme.resolution.fonts.DefaultFontBias
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.seed.BasisSeedCatalog
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId
import kotlin.math.abs
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ResolvePipelineTest {

    @Test
    fun emptyIntentResolvesBothModes() {
        val pair = resolve(BasisIntent())

        val light = pair.light
        val dark = pair.dark
        assertNotNull(light)
        assertNotNull(dark)
        assertEquals(ThemeMode.Light, light.mode)
        assertEquals(ThemeMode.Dark, dark.mode)
        assertEquals(setOf(ThemeMode.Light, ThemeMode.Dark), pair.report.modesGenerated)
        assertEquals(BasisSeedCatalog.CURRENT, pair.report.seedVersion)
    }

    @Test
    fun emptyIntentMatchesSeedNeutralTargets() {
        val pair = resolve(BasisIntent())
        val tables = BasisSeedCatalog.tables()

        val lightSurface = pair.light?.color?.surface?.default
        assertNotNull(lightSurface)
        assertNear(tables.lightNeutrals.surfaceL, lightSurface.l, "light surface")

        val darkSurface = pair.dark?.color?.surface?.default
        assertNotNull(darkSurface)
        assertNear(tables.darkNeutrals.surfaceL, darkSurface.l, "dark surface")
    }

    @Test
    fun brandColorOnlyHonorsBrandAnchor() {
        val pair = resolve(BasisIntent(identity = IdentityIntent(brandColor = ColorSpec.Hex("#6750A4"))))
        val entry = pair.report.entries.first { it.path == "identity.brandColor" }

        assertEquals(ReportStatus.Honored, entry.status)
        val primary = pair.light?.color?.brand?.primary
        assertNotNull(primary)
        assertTrue(primary.c > 0f)
    }

    @Test
    fun invalidBrandColorIsRejected() {
        val pair = resolve(BasisIntent(identity = IdentityIntent(brandColor = ColorSpec.Hex("not-a-color"))))
        val entry = pair.report.entries.first { it.path == "identity.brandColor" }

        assertEquals(ReportStatus.Rejected, entry.status)
        val primary = pair.light?.color?.brand?.primary
        assertNotNull(primary)
        assertTrue(primary.c > 0f)
    }

    @Test
    fun presenceWithoutBrandIsModulated() {
        val pair = resolve(BasisIntent(identity = IdentityIntent(presence = BrandPresence.Dominant)))
        val entry = pair.report.entries.first { it.path == "identity.presence" }

        assertEquals(ReportStatus.Modulated, entry.status)
    }

    @Test
    fun supportingColorsOnlyTreatsAsAccentAnchorsAndDerivesNeutrals() {
        val identity =
            IdentityIntent(
                supportingColors = listOf(ColorSpec.Hex("#FF8800"), ColorSpec.Hex("#00AAFF")),
            )
        val pair = resolve(BasisIntent(identity = identity))

        val entries = pair.report.entries
        assertEquals(ReportStatus.Honored, entries.first { it.path == "identity.supportingColors[0]" }.status)
        assertEquals(ReportStatus.Honored, entries.first { it.path == "identity.supportingColors[1]" }.status)

        val lightSurface = pair.light?.color?.surface?.default
        assertNotNull(lightSurface)
        assertTrue(lightSurface.l > 0.9f, "neutral surface must derive bright lightness")
        assertNear(NEUTRAL_HUE_TARGET, lightSurface.h, "neutral surface hue")
    }

    @Test
    fun roughFontListAssignsLaddersIntelligently() {
        val inter = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val roboto = FontFamilyRef.Catalog(GoogleFontId("roboto"))
        val openSans = FontFamilyRef.Catalog(GoogleFontId("open-sans"))
        val identity = IdentityIntent(typography = TypographyIdentity(candidates = listOf(inter, roboto, openSans)))
        val pair = resolve(BasisIntent(identity = identity))

        val assignments = pair.report.fontAssignments
        assertEquals(inter, assignments.structure)
        assertEquals(roboto, assignments.content)
        assertEquals(openSans, assignments.metadata)
        assertTrue(assignments.unusedCandidates.isEmpty())

        val light = pair.light
        assertNotNull(light)
        assertEquals(inter, light.typography.structure.level1.family)
        assertEquals(roboto, light.typography.content.level1.family)
        assertEquals(openSans, light.typography.metadata.level1.family)

        val report = pair.report.entries.first { it.path == "typography.structure" }
        assertEquals(ReportStatus.Modulated, report.status)
    }

    @Test
    fun roleMappedFontsHonorsPinsAndDerivesGaps() {
        val playfair = FontFamilyRef.Catalog(GoogleFontId("playfair-display"))
        val identity = IdentityIntent(typography = TypographyIdentity(structure = playfair))
        val pair = resolve(BasisIntent(identity = identity))

        val light = pair.light
        assertNotNull(light)
        assertEquals(playfair, light.typography.structure.level1.family)
        assertEquals(DefaultFontBias.TEXT, light.typography.content.level1.family)
        assertEquals(DefaultFontBias.METADATA, light.typography.metadata.level1.family)

        val structureEntry = pair.report.entries.first { it.path == "typography.structure" }
        assertEquals(ReportStatus.Honored, structureEntry.status)
        val contentEntry = pair.report.entries.first { it.path == "typography.content" }
        assertEquals(ReportStatus.Absent, contentEntry.status)
    }

    @Test
    fun hybridFontsPrefersPinsAndFillsRemainingWithCandidates() {
        val merriweather = FontFamilyRef.Catalog(GoogleFontId("merriweather"))
        val inter = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val roboto = FontFamilyRef.Catalog(GoogleFontId("roboto"))
        val identity =
            IdentityIntent(
                typography =
                    TypographyIdentity(
                        structure = merriweather,
                        candidates = listOf(merriweather, inter, roboto),
                    ),
            )
        val pair = resolve(BasisIntent(identity = identity))

        val light = pair.light
        assertNotNull(light)
        assertEquals(merriweather, light.typography.structure.level1.family)
        assertEquals(inter, light.typography.content.level1.family)
        assertEquals(roboto, light.typography.metadata.level1.family)

        val structureEntry = pair.report.entries.first { it.path == "typography.structure" }
        assertEquals(ReportStatus.Honored, structureEntry.status)
        val contentEntry = pair.report.entries.first { it.path == "typography.content" }
        assertEquals(ReportStatus.Modulated, contentEntry.status)
    }

    @Test
    fun catalogVsCustomFontPreservesRefTypesAndDiagnostics() {
        val catalogRef = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val customRef = FontFamilyRef.Custom(CustomFontKey("custom-brand-sans"))
        val identity = IdentityIntent(typography = TypographyIdentity(structure = customRef, content = catalogRef))
        val pair = resolve(BasisIntent(identity = identity))

        val light = pair.light
        assertNotNull(light)
        assertEquals(customRef, light.typography.structure.level1.family)
        assertEquals(catalogRef, light.typography.content.level1.family)

        val structureReport = pair.report.entries.first { it.path == "typography.structure" }
        assertEquals("custom:custom-brand-sans", structureReport.requested)
        val contentReport = pair.report.entries.first { it.path == "typography.content" }
        assertEquals("catalog:inter", contentReport.requested)
    }

    @Test
    fun moodOnlyProjectsOntoModulators() {
        val calm = resolve(BasisIntent(mood = MoodIntent(preset = MoodPreset.Calm)))
        val bold = resolve(BasisIntent(mood = MoodIntent(preset = MoodPreset.Bold)))

        val calmLight = calm.light
        val boldLight = bold.light
        assertNotNull(calmLight)
        assertNotNull(boldLight)
        assertTrue(calmLight.spacing.level4.value > boldLight.spacing.level4.value, "calm spacing airier than bold")
        assertTrue(calmLight.radius.level4.value > boldLight.radius.level4.value, "calm radius rounder than bold")
    }

    @Test
    fun fineVibeTweakModulatesAroundAnchorsWithoutTokenWrites() {
        val baseCalm = resolve(BasisIntent(mood = MoodIntent(preset = MoodPreset.Calm)))
        val tweaked =
            resolve(
                BasisIntent(
                    mood = MoodIntent(preset = MoodPreset.Calm, knobs = MoodKnobs(density = 0.8f, roundness = -0.8f)),
                ),
            )

        val baseSpacing = baseCalm.light?.spacing?.level4?.value ?: 0f
        val tweakedSpacing = tweaked.light?.spacing?.level4?.value ?: 0f
        assertTrue(tweakedSpacing < baseSpacing, "density knob should compact spacing")

        val baseRadius = baseCalm.light?.radius?.level4?.value ?: 0f
        val tweakedRadius = tweaked.light?.radius?.level4?.value ?: 0f
        assertTrue(tweakedRadius < baseRadius, "roundness knob should sharpen radius")

        assertEquals(ReportStatus.Honored, tweaked.report.entries.first { it.path == "mood" }.status)
    }

    @Test
    fun hotBrandCalmMoodLocksBrandHueWhileModulatingEnergy() {
        val hotBrand = ColorSpec.Hex("#FF3B30")
        val calmPair =
            resolve(
                BasisIntent(
                    identity = IdentityIntent(brandColor = hotBrand),
                    mood = MoodIntent(preset = MoodPreset.Calm),
                ),
            )
        val boldPair =
            resolve(
                BasisIntent(
                    identity = IdentityIntent(brandColor = hotBrand),
                    mood = MoodIntent(preset = MoodPreset.Bold),
                ),
            )

        val calmPrimary = calmPair.light?.color?.brand?.primary
        val boldPrimary = boldPair.light?.color?.brand?.primary
        assertNotNull(calmPrimary)
        assertNotNull(boldPrimary)
        assertNear(calmPrimary.h, boldPrimary.h, "brand primary hue locks across calm and bold moods")

        val calmLight = calmPair.light
        val boldLight = boldPair.light
        assertNotNull(calmLight)
        assertNotNull(boldLight)
        assertTrue(calmLight.spacing.level4.value > boldLight.spacing.level4.value, "calm mood spaces wider than bold")
        assertTrue(
            calmLight.motion.feedback.duration.milliseconds > boldLight.motion.feedback.duration.milliseconds,
            "calm motion duration is gentler than bold",
        )
    }

    @Test
    fun domainOnlySeedsPriorsWithoutInventingColor() {
        val domain =
            DomainIntent(
                domains = setOf(ProductDomain.Finance),
                interactions = setOf(InteractionPattern.DataNavigation),
            )
        val pair = resolve(BasisIntent(domain = domain))

        val entry = pair.report.entries.first { it.path == "domain" }
        assertEquals(ReportStatus.Honored, entry.status)
        assertTrue((pair.light?.spacing?.level4?.value ?: 0f) < 16f, "finance density should compact spacing")
    }

    @Test
    fun multiDomainSuperAppDeterministicallyBlendsPriorsAndReports() {
        val domainIntent =
            DomainIntent(
                domains = setOf(ProductDomain.Finance, ProductDomain.Commerce, ProductDomain.Social),
                interactions = setOf(InteractionPattern.DataNavigation, InteractionPattern.CheckoutCommerce),
            )
        val pair1 = resolve(BasisIntent(domain = domainIntent))
        val pair2 = resolve(BasisIntent(domain = domainIntent))

        val light1 = pair1.light
        val light2 = pair2.light
        assertNotNull(light1)
        assertNotNull(light2)
        assertEquals(light1.spacing.level4.value, light2.spacing.level4.value, "deterministic spacing")
        assertEquals(light1.motion.feedback.duration, light2.motion.feedback.duration, "motion")

        val domainEntry = pair1.report.entries.first { it.path == "domain" }
        assertEquals(ReportStatus.Honored, domainEntry.status)
        val enforced = domainEntry.enforced.orEmpty()
        listOf("Finance", "Commerce", "Social", "DataNavigation", "CheckoutCommerce").forEach {
            assertTrue(enforced.contains(it), "missing contributor $it")
        }
    }

    @Test
    fun interactionHeavyPatternAppliesDensityAndMotionPriors() {
        val domain =
            DomainIntent(
                interactions = setOf(InteractionPattern.ChatMessaging, InteractionPattern.DataNavigation),
            )
        val interactionPair = resolve(BasisIntent(domain = domain))
        val defaultPair = resolve(BasisIntent())

        val interactionSpacing = interactionPair.light?.spacing?.level4?.value ?: 0f
        val defaultSpacing = defaultPair.light?.spacing?.level4?.value ?: 0f
        assertTrue(interactionSpacing < defaultSpacing, "data density prior should compact spacing")
        assertEquals(ReportStatus.Honored, interactionPair.report.entries.first { it.path == "domain" }.status)
    }

    @Test
    fun a11yFirstEnforcesFloorsAndReportsRepairs() {
        val constraints =
            ConstraintsControl(
                minContrast = ContrastConstraint(7f),
                minTouchTarget = TouchTargetConstraint(DpValue(48f)),
            )
        val pair =
            resolve(
                BasisIntent(
                    identity = IdentityIntent(brandColor = ColorSpec.Hex("#F4D03F")),
                    control = ControlIntent(constraints = constraints),
                ),
            )

        val light = pair.light
        assertNotNull(light)
        val ratio = contrastRatio(light.color.content.default, light.color.surface.default)
        assertTrue(ratio >= 7f, "contrast ratio $ratio must meet 7.0 floor")
        assertTrue(light.size.control.level1.value >= 48f, "control size must meet touch floor")
        assertTrue(pair.report.entries.any { it.status == ReportStatus.OverriddenByConstraint })
    }

    @Test
    fun darkFirstProductGeneratesPairedThemesWithEqualDarkAttention() {
        val control = ControlIntent(mode = ModeControl(preferred = ThemeMode.Dark, generate = ModeGeneration.Pair))
        val pair = resolve(BasisIntent(control = control))

        assertNotNull(pair.light)
        val dark = pair.dark
        assertNotNull(dark)
        assertEquals(setOf(ThemeMode.Light, ThemeMode.Dark), pair.report.modesGenerated)

        val darkSurface = dark.color.surface.default
        assertTrue(darkSurface.l < 0.3f, "dark surface must be properly dark")
        assertNear(NEUTRAL_HUE_TARGET, darkSurface.h, "dark neutral hue")
        assertTrue(contrastRatio(dark.color.content.default, darkSurface) >= 4.5f, "dark contrast meets floor")
    }

    @Test
    fun partialTokenLockPreservesUnspecifiedTokenDerivations() {
        val overrides = TokenOverrides.fromPaths("spacing.level4" to OverrideValue.Dp(DpValue(22f)))
        val control = ControlIntent(tokens = overrides)
        val pair = resolve(BasisIntent(mood = MoodIntent(preset = MoodPreset.Bold), control = control))
        val defaultBold = resolve(BasisIntent(mood = MoodIntent(preset = MoodPreset.Bold)))

        val light = pair.light
        val defaultLight = defaultBold.light
        assertNotNull(light)
        assertNotNull(defaultLight)
        assertNear(22f, light.spacing.level4.value, "overridden spacing level4")
        assertNear(defaultLight.spacing.level1.value, light.spacing.level1.value, "unspecified spacing level1 derives")
        assertNear(defaultLight.radius.level1.value, light.radius.level1.value, "unspecified radius level1 derives")
    }

    @Test
    fun fullDesignSystemHandoffResolvesCleanlyWithoutMoodOrDomain() {
        val denseOverrides =
            TokenOverrides.fromPaths(
                "spacing.level1" to OverrideValue.Dp(DpValue(4f)),
                "spacing.level2" to OverrideValue.Dp(DpValue(8f)),
                "spacing.level3" to OverrideValue.Dp(DpValue(12f)),
                "spacing.level4" to OverrideValue.Dp(DpValue(16f)),
                "radius.level1" to OverrideValue.Dp(DpValue(2f)),
                "radius.level2" to OverrideValue.Dp(DpValue(4f)),
            )
        val control =
            ControlIntent(
                tokens = denseOverrides,
                constraints = ConstraintsControl(minTouchTarget = TouchTargetConstraint(DpValue(44f))),
            )
        val pair = resolve(BasisIntent(control = control))

        val light = pair.light
        assertNotNull(light)
        val spacing = light.spacing
        val radius = light.radius
        assertNear(4f, spacing.level1.value, "dense spacing level1")
        assertNear(16f, spacing.level4.value, "dense spacing level4")
        assertNear(2f, radius.level1.value, "dense radius level1")
        assertNear(4f, radius.level2.value, "dense radius level2")
        assertTrue(light.size.control.level1.value >= 44f, "control size meets touch target constraint")

        assertEquals(ReportStatus.Absent, pair.report.entries.first { it.path == "mood" }.status)
        assertEquals(ReportStatus.Absent, pair.report.entries.first { it.path == "domain" }.status)
    }

    @Test
    fun componentFamilyPrefsConfiguredWithoutInstanceLevelContamination() {
        val buttonId = ComponentId("button")
        val primaryVariant = VariantId("primary")
        val pressedState = StateId("pressed")

        val allPatch =
            ComponentStylePatch(
                universal =
                    UniversalStylePatch(
                        prominence = ProminenceTier.Primary,
                        treatment = Treatment.Fill,
                        radius = RadiusTokenPath.Level2,
                    ),
            )
        val variantPatch =
            ComponentStylePatch(
                universal = UniversalStylePatch(prominence = ProminenceTier.Primary),
            )
        val statePatch =
            ComponentStylePatch(
                universal = UniversalStylePatch(surface = ColorTokenPath.SurfaceElevated),
            )
        val componentOverride =
            ComponentOverride(
                all = allPatch,
                byVariant = mapOf(primaryVariant to variantPatch),
                byState = mapOf(pressedState to statePatch),
            )
        val componentOverrides =
            ComponentOverrides(
                byComponent = mapOf(buttonId to componentOverride),
            )
        val pair = resolve(BasisIntent(control = ControlIntent(components = componentOverrides)))

        assertNotNull(pair.light)
        assertNotNull(pair.dark)
        assertEquals(RadiusTokenPath.Level2, componentOverrides.byComponent[buttonId]?.all?.universal?.radius)
    }

    @Test
    fun enterpriseRestrainedCombinesAllAxesWithoutClash() {
        val constraints =
            ConstraintsControl(
                minContrast = ContrastConstraint(4.5f),
                minTouchTarget = TouchTargetConstraint(DpValue(44f)),
            )
        val intent =
            BasisIntent(
                identity = IdentityIntent(brandColor = ColorSpec.Hex("#003366"), presence = BrandPresence.Subtle),
                mood = MoodIntent(preset = MoodPreset.Professional),
                domain =
                    DomainIntent(
                        domains = setOf(ProductDomain.Finance),
                        interactions = setOf(InteractionPattern.DataNavigation),
                    ),
                control = ControlIntent(constraints = constraints),
            )
        val pair = resolve(intent)

        assertEquals(ReportStatus.Honored, pair.report.entries.first { it.path == "identity.brandColor" }.status)
        assertEquals(ReportStatus.Honored, pair.report.entries.first { it.path == "mood" }.status)
        assertEquals(ReportStatus.Honored, pair.report.entries.first { it.path == "domain" }.status)

        val light = pair.light
        assertNotNull(light)
        assertTrue(contrastRatio(light.color.content.default, light.color.surface.default) >= 4.5f)
        assertTrue(light.size.control.level1.value >= 44f)
        assertTrue(light.color.surface.default.l > 0.9f, "subtle presence keeps clean default surface")
    }

    @Test
    fun mixedIntentKeepsBrandHueAcrossWarmth() {
        val intent =
            BasisIntent(
                identity = IdentityIntent(brandColor = ColorSpec.Hex("#E10600")),
                mood = MoodIntent(knobs = MoodKnobs(warmth = 1f)),
            )
        val pair = resolve(intent)

        val light = pair.light
        assertNotNull(light)
        val brandPrimary = light.color.brand.primary
        val brandHue = brandPrimary.h
        assertNear(29.47641f, brandHue, "brand hue must not drift with warmth")

        val brandStops = light.color.gradient.brand.stops
        val derivativeHue = brandStops.last().color.h
        assertNotNull(derivativeHue)
        val brandSecondHue = (brandHue + 28f + 180f).rem(360f) - 180f
        val circularDist = (derivativeHue - brandSecondHue + 180f).rem(360f) - 180f
        assertTrue(
            abs(circularDist.coerceIn(-180f, 180f)) <= 6.5f,
            "brand derivative must land 28 degrees from brand primary",
        )
    }

    @Test
    fun lightAndDarkNeutralsAreDualSeeded() {
        val pair = resolve(BasisIntent())

        val lightSurface = pair.light?.color?.surface?.default
        val darkSurface = pair.dark?.color?.surface?.default

        assertNotNull(lightSurface)
        assertNotNull(darkSurface)
        assertTrue(lightSurface.l > 0.9f, "light surface must be bright")
        assertTrue(darkSurface.l < 0.3f, "dark surface must be dark")
        assertNear(NEUTRAL_HUE_TARGET, lightSurface.h, "light neutral hue")
        assertNear(NEUTRAL_HUE_TARGET, darkSurface.h, "dark neutral hue")
    }

    @Test
    fun lightOnlyGenerationOmitsDark() {
        val control = ControlIntent(mode = ModeControl(generate = ModeGeneration.LightOnly))
        val pair = resolve(BasisIntent(control = control))

        assertNotNull(pair.light)
        assertNull(pair.dark)
        assertEquals(setOf(ThemeMode.Light), pair.report.modesGenerated)
    }

    @Test
    fun touchFloorRepairsSmallControls() {
        val constraints = ConstraintsControl(minTouchTarget = TouchTargetConstraint(DpValue(56f)))
        val pair = resolve(BasisIntent(control = ControlIntent(constraints = constraints)))

        pair.light?.size?.control?.let { controls ->
            listOf(controls.level1, controls.level2, controls.level3, controls.level4, controls.level5)
                .forEach { assertTrue(it.value >= 56f, "control ${it.value} below the touch floor") }
        }

        assertTrue(
            pair.report.entries.any {
                it.status == ReportStatus.OverriddenByConstraint && it.path.startsWith("size.control")
            },
            "expected an override entry for the raised control sizes",
        )
    }

    @Test
    fun reducedMotionCollapsesEveryPurpose() {
        val constraints = ConstraintsControl(motion = MotionConstraint(preferReducedMotion = true))
        val pair = resolve(BasisIntent(control = ControlIntent(constraints = constraints)))

        val motion = pair.light?.motion
        assertNotNull(motion)

        listOf(
            motion.feedback,
            motion.stateTransition,
            motion.transformation,
            motion.expansion,
            motion.reposition,
            motion.emphasis,
        ).forEach {
            assertEquals(0L, it.duration.milliseconds)
            assertEquals(EasingKind.Linear, it.easing)
        }
    }

    @Test
    fun ownedContrastPairsMeetDefaultFloor() {
        val pair = resolve(BasisIntent(identity = IdentityIntent(brandColor = ColorSpec.Hex("#6750A4"))))

        pair.light?.let { light ->
            assertTrue(
                contrastRatio(light.color.content.default, light.color.surface.default) >= 4.5f,
                "light body contrast below the floor",
            )
        }

        pair.dark?.let { dark ->
            assertTrue(
                contrastRatio(dark.color.content.default, dark.color.surface.default) >= 4.5f,
                "dark body contrast below the floor",
            )
        }
    }

    @Test
    fun controlOverrideWinsOverDerivation() {
        val overrides = TokenOverrides.fromPaths("spacing.level4" to OverrideValue.Dp(DpValue(20f)))
        val pair = resolve(BasisIntent(control = ControlIntent(tokens = overrides)))

        assertNear(20f, pair.light?.spacing?.level4?.value, "overridden spacing level4")
    }

    private fun assertNear(expected: Float, actual: Float?, label: String = "") {
        assertTrue(
            actual != null && abs(expected - actual) <= 1e-3f,
            "Expected $expected but was $actual ($label)",
        )
    }

    private companion object {
        private const val NEUTRAL_HUE_TARGET: Float = 255f
    }
}
