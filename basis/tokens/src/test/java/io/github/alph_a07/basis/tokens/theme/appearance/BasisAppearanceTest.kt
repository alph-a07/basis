package io.github.alph_a07.basis.tokens.theme.appearance

import io.github.alph_a07.basis.tokens.color.BasisColor
import io.github.alph_a07.basis.tokens.color.BasisColorRole
import io.github.alph_a07.basis.tokens.motion.BasisMotionProperty
import io.github.alph_a07.basis.tokens.motion.BasisMotionTiming
import io.github.alph_a07.basis.tokens.motion.BasisMotionToken
import io.github.alph_a07.basis.tokens.motion.BasisMotionTrack
import io.github.alph_a07.basis.tokens.motion.BasisResolvedMotion
import io.github.alph_a07.basis.tokens.radius.BasisRadius
import io.github.alph_a07.basis.tokens.spacing.BasisSpacing
import io.github.alph_a07.basis.tokens.typography.BasisFontFamily
import io.github.alph_a07.basis.tokens.typography.BasisTypographyLevel
import io.github.alph_a07.basis.tokens.typography.BasisTypographyRole
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
    fun aNegativeMagnitudeIsRejected() {
        assertTrue(
            runCatching { BasisSpacingAppearance(overrides = mapOf(BasisSpacing.Level2 to -1)) }
                .exceptionOrNull() is IllegalArgumentException,
        )
        assertTrue(
            runCatching { BasisRadiusAppearance(overrides = mapOf(BasisRadius.Level3 to -4)) }
                .exceptionOrNull() is IllegalArgumentException,
        )
    }

    @Test
    fun fullRadiusCannotTakeAFixedMagnitudeBecauseItIsDerivedFromTheBounds() {
        val failure = runCatching { BasisRadiusAppearance(overrides = mapOf(BasisRadius.Full to 16)) }
            .exceptionOrNull()

        assertTrue(failure is IllegalArgumentException)
    }

    @Test
    fun aMotionOverrideMustBelongToTheContractItIsAssignedTo() {
        val feedback = BasisResolvedMotion(
            token = BasisMotionToken.Feedback,
            tracks = listOf(BasisMotionTrack(BasisMotionProperty.Opacity, BasisMotionTiming.Immediate)),
        )

        val matching = BasisMotionAppearance(overrides = mapOf(BasisMotionToken.Feedback to feedback))
        val mismatched = runCatching {
            BasisMotionAppearance(overrides = mapOf(BasisMotionToken.Expansion to feedback))
        }.exceptionOrNull()

        assertEquals(feedback, matching.overrides.getValue(BasisMotionToken.Feedback))
        assertTrue(mismatched is IllegalArgumentException)
    }
}
