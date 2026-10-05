package io.github.alph_a07.basis.tokens.theme.inputs.constraints

import io.github.alph_a07.basis.tokens.theme.BasisThemeInputs
import io.github.alph_a07.basis.tokens.theme.inputs.appearance.BasisAppearance
import io.github.alph_a07.basis.tokens.theme.inputs.appearance.BasisTypographyAppearance
import io.github.alph_a07.basis.tokens.theme.resolution.BasisThemeResolver
import io.github.alph_a07.basis.tokens.theme.resolution.assertFailure
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTextStyleSpec
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyLevel
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyRole
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Constraints are mandatory validity requirements, and reduced motion is one of them.
 */
class BasisConstraintsTest {
    @Test
    fun noDeclaredRequirementIsTheDefault() {
        val constraints = BasisConstraints()
        assertEquals(BasisAccessibilityConstraints(), constraints.accessibility)
        assertEquals(false, constraints.accessibility.reducedMotion)
        assertNull(constraints.accessibility.minimumContrastRatio)
    }

    @Test
    fun reducedMotionIsCarriedAsARequirementRatherThanAsADuration() {
        val reduced = BasisAccessibilityConstraints(reducedMotion = true)
        assertTrue(reduced.reducedMotion)
    }

    @Test
    fun aContrastFloorMayBeDeclaredWithinTheMeaningfulRange() {
        val declared = checkNotNull(BasisAccessibilityConstraints(minimumContrastRatio = 4.5f).minimumContrastRatio)
        assertEquals(4.5f, declared, 0f)
    }

    @Test
    fun aContrastRatioOutsideTheMeaningfulRangeIsRefusedByResolution() {
        assertEquals("InvalidConstraint", categoryOf(BasisAccessibilityConstraints(minimumContrastRatio = 0.5f)))
        assertEquals("InvalidConstraint", categoryOf(BasisAccessibilityConstraints(minimumContrastRatio = 22f)))
    }

    @Test
    fun aMagnitudeFloorThatBoundsNothingIsRefusedByResolution() {
        assertEquals(
            "InvalidConstraint",
            categoryOf(BasisConstraints(values = BasisValueConstraints(minimumFontSizeSp = 0f))),
        )
        assertEquals(
            "InvalidConstraint",
            categoryOf(BasisConstraints(values = BasisValueConstraints(minimumLineHeightSp = -4f))),
        )
    }

    @Test
    fun aDefectIsCategorizedByWhichInputCarriedIt() {
        // A magnitude outside its range is one kind of thing in a customization and another in a
        // requirement: the first names a token to redirect, the second a guarantee to restate. Each
        // is therefore reported under the category that says which input to change.
        assertEquals(
            "InvalidAppearance",
            categoryOf(
                BasisAppearance(
                    typography = BasisTypographyAppearance(
                        tokens = mapOf(CONTENT_LEVEL_TWO to BasisTextStyleSpec(fontSizeSp = 0f)),
                    ),
                ),
            ),
        )
        assertEquals(
            "InvalidConstraint",
            categoryOf(BasisConstraints(values = BasisValueConstraints(minimumFontSizeSp = 0f))),
        )
    }

    @Test
    fun theFullContrastRangeIsAcceptedAtBothEnds() {
        val lowest = checkNotNull(
            BasisAccessibilityConstraints(minimumContrastRatio = 1f).minimumContrastRatio,
        )
        val highest = checkNotNull(
            BasisAccessibilityConstraints(minimumContrastRatio = 21f).minimumContrastRatio,
        )
        assertEquals(1f, lowest, 0f)
        assertEquals(21f, highest, 0f)
    }

    /**
     * The category a resolution declaring [constraints] reports.
     *
     * @param constraints The requirements to resolve with.
     * @return The failure category.
     */
    private fun categoryOf(constraints: BasisConstraints): String =
        assertFailure(BasisThemeResolver.resolve(BasisThemeInputs(constraints = constraints)).result).category

    /**
     * The category a resolution declaring [accessibility] reports.
     *
     * @param accessibility The accessibility requirements to resolve with.
     * @return The failure category.
     */
    private fun categoryOf(accessibility: BasisAccessibilityConstraints): String =
        categoryOf(BasisConstraints(accessibility = accessibility))

    /**
     * The category a resolution declaring [appearance] reports.
     *
     * @param appearance The customization to resolve with.
     * @return The failure category.
     */
    private fun categoryOf(appearance: BasisAppearance): String =
        assertFailure(BasisThemeResolver.resolve(BasisThemeInputs(appearance = appearance)).result).category

    private companion object {
        /** A typography level within the catalogue, used as the key of a misdirected customization. */
        val CONTENT_LEVEL_TWO = BasisTypographyLevel(BasisTypographyRole.Content, 2)
    }
}
