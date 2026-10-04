package io.github.alph_a07.basis.tokens.theme.constraints

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
    fun aContrastRatioOutsideTheMeaningfulRangeIsRejected() {
        assertTrue(
            runCatching { BasisAccessibilityConstraints(minimumContrastRatio = 0.5f) }
                .exceptionOrNull() is IllegalArgumentException,
        )
        assertTrue(
            runCatching { BasisAccessibilityConstraints(minimumContrastRatio = 22f) }
                .exceptionOrNull() is IllegalArgumentException,
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
}
