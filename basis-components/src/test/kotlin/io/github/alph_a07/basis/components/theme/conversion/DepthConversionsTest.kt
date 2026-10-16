package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.theme.core.DpValue
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
    fun toShadowColor_modulatesBaseColorAlpha() {
        val baseColor = Color.Black
        val shadowColor = spec.toShadowColor(baseColor)

        assertTrue(kotlin.math.abs(shadowColor.alpha - 0.15f) <= 0.01f)
        assertEquals(0f, shadowColor.red)
        assertEquals(0f, shadowColor.green)
        assertEquals(0f, shadowColor.blue)
    }
}
