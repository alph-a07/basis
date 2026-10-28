package io.github.alph_a07.basis.theme.intent

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.controls.overrides.ColorTokenOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.LevelSpacingOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue
import io.github.alph_a07.basis.theme.intent.controls.overrides.SurfaceColorOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides
import io.github.alph_a07.basis.theme.interchange.ThemeInterchange
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class TokenOverridesParityTest {

    @Test
    fun typedSpacingPopulatesPathsMap() {
        val overrides =
            TokenOverrides(
                spacing = LevelSpacingOverrides(level1 = DpValue(12f)),
            )

        assertTrue(overrides.paths.containsKey("spacing.level1"))
        assertEquals(OverrideValue.Dp(DpValue(12f)), overrides.paths["spacing.level1"])
    }

    @Test
    fun typedColorPopulatesPathsMap() {
        val color = Oklch(0.5f, 0.1f, 200f)
        val overrides =
            TokenOverrides(
                color =
                    ColorTokenOverrides(
                        surface = SurfaceColorOverrides(default = OverrideMode.Both(color)),
                    ),
            )

        assertTrue(overrides.paths.containsKey("color.surface.default"))
        assertEquals(OverrideValue.Color(OverrideMode.Both(color)), overrides.paths["color.surface.default"])
    }

    @Test
    fun roundTripPreservesPathsPopulatedFromTypedTree() {
        val original =
            BasisIntent(
                control =
                    ControlIntent(
                        tokens =
                            TokenOverrides(
                                spacing = LevelSpacingOverrides(level4 = DpValue(24f)),
                            ),
                    ),
            )

        val json = ThemeInterchange.encodeIntent(original)
        println("SERIALIZED INTENT JSON: $json")
        val decoded = ThemeInterchange.decodeIntent(json)

        val tokens = decoded.control?.tokens
        assertNotNull(tokens)
        assertEquals(OverrideValue.Dp(DpValue(24f)), tokens.paths["spacing.level4"])
    }

    @Test
    fun disagreementBetweenTypedAndPathsFailsFast() {
        assertFailsWith<IllegalArgumentException> {
            TokenOverrides(
                spacing = LevelSpacingOverrides(level1 = DpValue(12f)),
                paths = mapOf("spacing.level1" to OverrideValue.Dp(DpValue(20f))),
            )
        }
    }
}
