package io.github.alph_a07.basis.theme

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.core.color.Oklch
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
import io.github.alph_a07.basis.theme.intent.clamped
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import io.github.alph_a07.basis.theme.intent.controls.ContrastConstraint
import io.github.alph_a07.basis.theme.intent.controls.FontControl
import io.github.alph_a07.basis.theme.intent.controls.FontFeatureSpec
import io.github.alph_a07.basis.theme.intent.controls.MinMaxLevels
import io.github.alph_a07.basis.theme.intent.controls.ModeControl
import io.github.alph_a07.basis.theme.intent.controls.MotionConstraint
import io.github.alph_a07.basis.theme.intent.controls.TouchTargetConstraint
import io.github.alph_a07.basis.theme.intent.controls.TypographyConstraints
import io.github.alph_a07.basis.theme.intent.controls.WeightClamp
import io.github.alph_a07.basis.theme.intent.controls.overrides.ColorTokenOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverride
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentStylePatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.DepthSpecPatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.LevelSpacingOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue
import io.github.alph_a07.basis.theme.intent.controls.overrides.ProminenceTier
import io.github.alph_a07.basis.theme.intent.controls.overrides.StateId
import io.github.alph_a07.basis.theme.intent.controls.overrides.SurfaceColorOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import io.github.alph_a07.basis.theme.intent.controls.overrides.UniversalStylePatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantId
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantStateKey
import io.github.alph_a07.basis.theme.intent.dedupedCandidates
import io.github.alph_a07.basis.theme.intent.excessSupportingColorCount
import io.github.alph_a07.basis.theme.intent.hasPresenceWithoutBrand
import io.github.alph_a07.basis.theme.intent.isWellFormed
import io.github.alph_a07.basis.theme.intent.violatingKnobs
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

private val INTER: FontFamilyRef = FontFamilyRef.Catalog(GoogleFontId("inter"))
private val ROBOTO: FontFamilyRef = FontFamilyRef.Catalog(GoogleFontId("roboto"))

internal class IntentContractsTest {
    @Test
    fun emptyIntentIsValid() {
        assertEquals(BasisIntent(), BasisIntent(identity = null, mood = null, domain = null, control = null))
        assertNull(BasisIntent().identity)
        assertNull(BasisIntent().mood)
        assertNull(BasisIntent().domain)

        assertNull(BasisIntent().control)
    }

    @Test
    fun axesSetIndependently() {
        val identity = BasisIntent(identity = IdentityIntent(brandColor = ColorSpec.Hex("#6750A4")))
        val mood = BasisIntent(mood = MoodIntent(preset = MoodPreset.Calm, knobs = MoodKnobs(warmth = 0.5f)))
        val domain =
            BasisIntent(
                domain =
                    DomainIntent(
                        domains = setOf(ProductDomain.Finance),
                        interactions = setOf(InteractionPattern.DataNavigation),
                    ),
            )
        val control = BasisIntent(control = ControlIntent(mode = ModeControl(preferred = ThemeMode.Dark)))

        assertNull(identity.mood)
        assertNull(mood.identity)
        assertNull(domain.control)
        assertNull(control.domain)
        assertEquals(identity, BasisIntent(identity = identity.identity))
        assertEquals(mood, BasisIntent(mood = mood.mood))
        assertEquals(domain, BasisIntent(domain = domain.domain))

        assertEquals(control, BasisIntent(control = control.control))
    }

    @Test
    fun colorSpecIntakeDetectsMalformedValues() {
        assertTrue(ColorSpec.Hex("#6750A4").isWellFormed())
        assertTrue(ColorSpec.Hex("6750A4").isWellFormed())
        assertTrue(ColorSpec.Hex("#886750A4").isWellFormed())
        assertFalse(ColorSpec.Hex("#6750").isWellFormed())
        assertFalse(ColorSpec.Hex("not-a-color").isWellFormed())
        assertFalse(ColorSpec.Hex("").isWellFormed())
        assertTrue(ColorSpec.Argb(0xFF6750A4.toInt()).isWellFormed())
        assertFalse(ColorSpec.Hsl(h = Float.NaN, s = 0.5f, l = 0.5f).isWellFormed())

        assertTrue(Oklch(l = 0.6f, c = 0.1f, h = 250f).isWellFormed())
    }

    @Test
    fun moodKnobsClampAndReportViolations() {
        val knobs = MoodKnobs(warmth = 2f, chroma = -3f, density = Float.NaN, roundness = 0.4f)
        val clamped = knobs.clamped()
        assertEquals(1f, clamped.warmth)
        assertEquals(-1f, clamped.chroma)
        assertNull(clamped.density)
        assertEquals(0.4f, clamped.roundness)

        val violations = knobs.violatingKnobs()
        assertEquals(
            setOf("mood.knobs.warmth", "mood.knobs.chroma", "mood.knobs.density"),
            violations.keys,
        )

        assertEquals(2f, violations["mood.knobs.warmth"])
    }

    @Test
    fun identityDetectsCapAndPresenceWithoutBrand() {
        val anchored = IdentityIntent(brandColor = ColorSpec.Hex("#6750A4"), presence = BrandPresence.Strong)
        assertEquals(0, anchored.excessSupportingColorCount())
        assertFalse(anchored.hasPresenceWithoutBrand())

        val unanchored =
            IdentityIntent(
                supportingColors = List(6) { ColorSpec.Argb(it) },
                presence = BrandPresence.Strong,
            )
        assertEquals(2, unanchored.excessSupportingColorCount())

        assertTrue(unanchored.hasPresenceWithoutBrand())
    }

    @Test
    fun typographyIdentityDedupesCandidatesAgainstPins() {
        val identity = TypographyIdentity(candidates = listOf(INTER, ROBOTO, INTER), content = ROBOTO)
        assertEquals(listOf(INTER), identity.dedupedCandidates())

        assertEquals(
            listOf(INTER, ROBOTO),
            TypographyIdentity(candidates = listOf(INTER, ROBOTO, INTER)).dedupedCandidates(),
        )
    }

    @Test
    fun identifiersValidateShapeAndLadders() {
        assertFailsWith<IllegalArgumentException> { ComponentId("") }
        assertFailsWith<IllegalArgumentException> { VariantId("") }
        assertFailsWith<IllegalArgumentException> { StateId("") }
        assertFailsWith<IllegalArgumentException> {
            WeightClamp(min = FontWeightValue(600), max = FontWeightValue(400))
        }

        assertFailsWith<IllegalArgumentException> { FontFeatureSpec(setOf(" ")) }
    }

    @Test
    fun hardConstraintsRejectInvalidValues() {
        assertEquals(4.5f, ContrastConstraint(4.5f).minRatio)
        assertFailsWith<IllegalArgumentException> { ContrastConstraint(0.5f) }
        assertFailsWith<IllegalArgumentException> { ContrastConstraint(Float.NaN) }
        assertFailsWith<IllegalArgumentException> { TouchTargetConstraint(DpValue(0f)) }
        assertFailsWith<IllegalArgumentException> { MinMaxLevels(min = DpValue(16f), max = DpValue(8f)) }
        assertFailsWith<IllegalArgumentException> { MotionConstraint(maxDurationBias = 2f) }
        assertFailsWith<IllegalArgumentException> { TypographyConstraints(scaleFloor = Float.NaN) }

        ConstraintsControl(minContrast = ContrastConstraint(7f), motion = MotionConstraint(preferReducedMotion = true))
    }

    @Test
    fun controlShellsCarryOverridesAndDeepTypeLocks() {
        val patch =
            ComponentStylePatch(
                universal =
                    UniversalStylePatch(
                        prominence = ProminenceTier.Primary,
                        treatment = Treatment.Fill,
                        surface = ColorTokenPath.SurfaceDefault,
                    ),
                extra = ComponentExtraPatch.Button(controlSize = ControlSizeTokenPath.Level3),
            )
        val key = VariantStateKey(VariantId("primary"), StateId("pressed"))
        val overrideSet =
            ComponentOverride(
                all = patch,
                byVariant = mapOf(VariantId("primary") to patch),
                byState = mapOf(StateId("pressed") to patch),
                byVariantState = mapOf(key to patch),
            )
        val components = ComponentOverrides(byComponent = mapOf(ComponentId("button") to overrideSet))
        assertEquals(overrideSet, components.byComponent[ComponentId("button")])
        assertEquals(patch, overrideSet.byVariantState[key])
        assertEquals(patch, overrideSet.all)
        assertEquals("color.surface.default", ColorTokenPath.SurfaceDefault.path)
        assertEquals("size.control.level3", ControlSizeTokenPath.Level3.path)

        val tokens =
            TokenOverrides(
                color =
                    ColorTokenOverrides(
                        surface = SurfaceColorOverrides(default = OverrideMode.Both(Oklch(0.98f, 0.01f, 255f))),
                    ),
                spacing = LevelSpacingOverrides(level4 = DpValue(20f)),
            )
        assertEquals(OverrideMode.Both(Oklch(0.98f, 0.01f, 255f)), tokens.color?.surface?.default)
        assertEquals(DpValue(20f), tokens.spacing?.level4)
        assertNull(tokens.radius)
        assertTrue(tokens.paths.isEmpty())

        val fromPaths =
            TokenOverrides.fromPaths(
                "color.surface.default" to OverrideValue.Color(Oklch(0.98f, 0.01f, 255f)),
                "spacing.level4" to OverrideValue.Dp(DpValue(20f)),
            )
        assertEquals(2, fromPaths.paths.size)
        val dp = fromPaths.paths["spacing.level4"] as OverrideValue.Dp
        assertEquals(DpValue(20f), dp.value)

        val fonts =
            FontControl(
                levelFamilies = mapOf(TypographyTokenPath.StructureLevel3 to ROBOTO),
                weightClamps = mapOf(TypographyTokenPath.ContentLevel1 to WeightClamp(max = FontWeightValue(600))),
            )
        val control = ControlIntent(tokens = tokens, components = components, fonts = fonts)
        assertEquals(ROBOTO, control.fonts?.levelFamilies?.get(TypographyTokenPath.StructureLevel3))
        assertEquals(tokens, control.tokens)

        assertEquals(components, control.components)
    }

    @Test
    fun modeScopedOverridesExpressAllFourStates() {
        val light = Oklch(0.98f, 0.01f, 255f)
        val dark = Oklch(0.16f, 0.02f, 255f)
        val surface =
            SurfaceColorOverrides(
                default = OverrideMode.Both(light),
                elevated = OverrideMode.LightOnly(light),
                recessed = OverrideMode.DarkOnly(dark),
                inverse = OverrideMode.Split(light = light, dark = dark),
            )
        assertEquals(OverrideMode.Both(light), surface.default)
        assertEquals(OverrideMode.LightOnly(light), surface.elevated)
        assertEquals(OverrideMode.DarkOnly(dark), surface.recessed)
        assertEquals(OverrideMode.Split(light, dark), surface.inverse)

        val depth = DepthSpecPatch(elevation = DpValue(4f), shadowAlpha = OverrideMode.Split(0.2f, 0.4f))
        assertEquals(OverrideMode.Split(0.2f, 0.4f), depth.shadowAlpha)
        assertEquals(DpValue(4f), depth.elevation)

        val shared = OverrideValue.Color(light)
        assertEquals(OverrideMode.Both(light), shared.value)
        val scoped = OverrideValue.Color(OverrideMode.DarkOnly(dark))

        assertEquals(OverrideMode.DarkOnly(dark), scoped.value)
    }
}
