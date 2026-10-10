package io.github.alph_a07.basis.ksp.family

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

/**
 * Pins the naming rules that map token data classes onto the generated path API: enum names,
 * entry names, dotted paths, and receiver parameter names must match the historical literals.
 */
internal class PathNamingTest {

    @Test
    fun enumNamesFollowReceiverTypeSuffixRules() {
        assertEquals("ColorTokenPath", enumNameFor("ColorTokens"))
        assertEquals("TypographyTokenPath", enumNameFor("TypographyTokens"))
        assertEquals("SpacingTokenPath", enumNameFor("SpacingTokens"))
        assertEquals("RadiusTokenPath", enumNameFor("RadiusTokens"))
        assertEquals("DepthTokenPath", enumNameFor("DepthTokens"))
        assertEquals("MotionTokenPath", enumNameFor("MotionTokens"))
        assertEquals("IconSizeTokenPath", enumNameFor("IconSizes"))
        assertEquals("ControlSizeTokenPath", enumNameFor("ControlSizes"))
    }

    @Test
    fun enumNameRejectsUnknownSuffixes() {
        assertFailsWith<IllegalStateException> { enumNameFor("GradientColors") }
    }

    @Test
    fun memberNamesPascalCaseEachSegment() {
        assertEquals("SurfaceDefault", memberNameFor(listOf("surface", "default")))
        assertEquals("StateTransition", memberNameFor(listOf("stateTransition")))
        assertEquals("StructureLevel1", memberNameFor(listOf("structure", "level1")))
        assertEquals("Level1", memberNameFor(listOf("level1")))
        assertEquals("BrandQuaternary", memberNameFor(listOf("brand", "quaternary")))
    }

    @Test
    fun pathsJoinPrefixAndSegments() {
        assertEquals("color.surface.default", pathFor("color", listOf("surface", "default")))
        assertEquals("motion.stateTransition", pathFor("motion", listOf("stateTransition")))
        assertEquals("size.icon.level1", pathFor("size.icon", listOf("level1")))
        assertEquals("radius.none", pathFor("radius", listOf("none")))
    }

    @Test
    fun paramNameDefaultsToLastPrefixSegment() {
        assertEquals("typography", paramNameFor("typography", ""))
        assertEquals("icon", paramNameFor("size.icon", ""))
        assertEquals("colors", paramNameFor("color", "colors"))
    }

    @Test
    fun kdocWrappingStaysWithinWidth() {
        val text = "word ".repeat(60).trim()
        val lines = wrapKdocParagraph(text, width = 40)
        assertTrue(lines.all { it.length <= 40 }, "every wrapped line must fit the width")
        assertEquals(text.split(' ').joinToString(" "), lines.joinToString(" "))
    }
}
