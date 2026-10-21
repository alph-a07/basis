package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import org.junit.Test

/**
 * Unit tests for [DepthSpec] to Compose elevation and shadow mapping.
 */
class DepthConversionsTest {

    private val spec =
        DepthSpec(
            elevation = DpValue(4f),
            shadowAlpha = 0.15f,
            shadowBlur = DpValue(8f),
            shadowYOffset = DpValue(2f),
        )

    @Test
    fun toElevationDp_returnsElevationInDp() {
        assertEquals(4.dp, spec.toElevationDp())
    }

    @Test
    fun toShadowBlurDp_returnsBlurInDp() {
        assertEquals(8.dp, spec.toShadowBlurDp())
    }

    @Test
    fun toShadowYOffsetDp_returnsYOffsetInDp() {
        assertEquals(2.dp, spec.toShadowYOffsetDp())
    }

    @Test
    fun toShadowColor_defaultBaseColor_usesBlackWithModulatedAlpha() {
        val shadowColor = spec.toShadowColor()

        assertTrue(kotlin.math.abs(shadowColor.alpha - 0.15f) <= 0.01f)
        assertEquals(0f, shadowColor.red)
        assertEquals(0f, shadowColor.green)

        assertEquals(0f, shadowColor.blue)
    }

    @Test
    fun toShadowColor_customBaseColor_modulatesBaseColorAlpha() {
        val baseColor = Color(red = 0.2f, green = 0.4f, blue = 0.8f, alpha = 0.5f)
        val shadowColor = spec.toShadowColor(baseColor)

        // 0.15 * 0.5 = 0.075f
        assertTrue(kotlin.math.abs(shadowColor.alpha - 0.075f) <= 0.005f)
        assertEquals(0.2f, shadowColor.red)
        assertEquals(0.4f, shadowColor.green)

        assertEquals(0.8f, shadowColor.blue)
    }

    @Test
    fun resolvedThemeDepthLadder_allLevelsConvertCorrectly() {
        val theme = resolve(BasisIntent()).light!!

        val level1 = theme.depth.level1
        val level2 = theme.depth.level2
        val level3 = theme.depth.level3
        val level4 = theme.depth.level4

        assertTrue(level1.toElevationDp() >= 0.dp)
        assertTrue(level2.toElevationDp() >= level1.toElevationDp())
        assertTrue(level3.toElevationDp() >= level2.toElevationDp())
        assertTrue(level4.toElevationDp() >= level3.toElevationDp())

        assertTrue(level1.toShadowBlurDp() >= 0.dp)
        assertTrue(level4.toShadowBlurDp() >= level1.toShadowBlurDp())

        assertTrue(level1.toShadowColor().alpha >= 0f)

        assertTrue(level4.toShadowColor().alpha <= 1f)
    }
}
