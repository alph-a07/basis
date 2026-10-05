package io.github.alph_a07.basis.tokens.theme.inputs.appearance

import io.github.alph_a07.basis.tokens.theme.BasisThemeInputs
import io.github.alph_a07.basis.tokens.theme.resolution.BasisThemeResolver
import io.github.alph_a07.basis.tokens.theme.resolution.assertFailure
import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColor
import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColorRole
import io.github.alph_a07.basis.tokens.vocabulary.motion.BasisMotionTiming
import io.github.alph_a07.basis.tokens.vocabulary.motion.BasisMotionTimingSpec
import io.github.alph_a07.basis.tokens.vocabulary.motion.BasisMotionToken
import io.github.alph_a07.basis.tokens.vocabulary.radius.BasisRadius
import io.github.alph_a07.basis.tokens.vocabulary.spacing.BasisSpacing
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisFontFamily
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyLevel
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyRole
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Appearance customizes the supported token vocabulary and nothing beyond it.
 */
class BasisAppearanceTest {
    @Test
    fun anUncustomizedAppearanceExpressesNothing() {
        val appearance = BasisAppearance()
        assertTrue(appearance.color.overrides.isEmpty())
        assertTrue(appearance.typography.tokens.isEmpty())
        assertTrue(appearance.typography.fontFamilies.byRole.isEmpty())
        assertTrue(appearance.typography.fontFamilies.byLevel.isEmpty())
        assertTrue(appearance.spacing.overrides.isEmpty())
        assertTrue(appearance.radius.overrides.isEmpty())
        assertTrue(appearance.size.overrides.isEmpty())
        assertTrue(appearance.motion.overrides.isEmpty())
    }

    @Test
    fun aColorOverrideIsKeyedByAnExistingRole() {
        val appearance = BasisColorAppearance(
            overrides = mapOf(BasisColorRole.SurfaceDefault to BasisColor.fromHex("FFFFFF")),
        )
        assertEquals(BasisColor.fromHex("FFFFFF"), appearance.overrides.getValue(BasisColorRole.SurfaceDefault))
    }

    @Test
    fun aLevelScopedFamilyRefinesTheRoleScopedFamily() {
        val roleFamily = BasisFontFamily("Reading")
        val levelFamily = BasisFontFamily("Display")
        val appearance = BasisFontFamilyAppearance(
            byRole = mapOf(BasisTypographyRole.Structure to roleFamily),
            byLevel = mapOf(BasisTypographyLevel(BasisTypographyRole.Structure, 1) to levelFamily),
        )
        assertEquals(levelFamily, appearance.resolve(BasisTypographyRole.Structure, 1))
        assertEquals(roleFamily, appearance.resolve(BasisTypographyRole.Structure, 2))
        assertNull(appearance.resolve(BasisTypographyRole.Content, 1))
    }

    @Test
    fun anUnassignedLevelResolvesToNothingRatherThanToADefault() {
        assertNull(BasisFontFamilyAppearance().resolve(BasisTypographyRole.Content, 1))
    }

    @Test
    fun aNegativeMagnitudeIsRefusedByResolution() {
        assertEquals(
            "InvalidAppearance",
            categoryOf(BasisAppearance(spacing = BasisSpacingAppearance(overrides = mapOf(BasisSpacing.Level2 to -1)))),
        )
        assertEquals(
            "InvalidAppearance",
            categoryOf(BasisAppearance(radius = BasisRadiusAppearance(overrides = mapOf(BasisRadius.Level3 to -4)))),
        )
    }

    @Test
    fun fullRadiusCannotTakeAFixedMagnitudeBecauseItIsDerivedFromTheBounds() {
        val failure = assertFailure(
            BasisThemeResolver.resolve(
                BasisThemeInputs(
                    appearance = BasisAppearance(radius = BasisRadiusAppearance(mapOf(BasisRadius.Full to 16))),
                ),
            ).result,
        )
        assertEquals("InvalidAppearance", failure.category)
        assertTrue(failure.causes.any { it.contains("BasisRadius.Full") })
    }

    /**
     * The category a resolution declaring [appearance] reports.
     *
     * @param appearance The customization to resolve with.
     * @return The failure category.
     */
    private fun categoryOf(appearance: BasisAppearance): String =
        assertFailure(BasisThemeResolver.resolve(BasisThemeInputs(appearance = appearance)).result).category

    @Test
    fun aMotionOverrideCarriesTimingRatherThanAWholeMotion() {
        val appearance = BasisMotionAppearance(
            overrides = mapOf(BasisMotionToken.Feedback to BasisMotionTimingSpec(BasisMotionTiming.Immediate)),
        )
        assertEquals(
            BasisMotionTiming.Immediate,
            appearance.overrides.getValue(BasisMotionToken.Feedback).timing,
        )
    }

    @Test
    fun aMotionOverrideCannotNameADifferentContract() {
        // The specification carries timing only, so it cannot disagree with the contract it is keyed
        // by. The mismatch this used to guard against is no longer expressible.
        val failure = runCatching {
            BasisMotionAppearance(
                overrides = mapOf(
                    BasisMotionToken.Expansion to BasisMotionTimingSpec(BasisMotionTiming.Immediate),
                ),
            )
        }.exceptionOrNull()
        assertNull(failure)
    }
}
