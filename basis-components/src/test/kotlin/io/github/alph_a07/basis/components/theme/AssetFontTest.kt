package io.github.alph_a07.basis.components.theme

import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import io.github.alph_a07.basis.components.theme.font.AssetFont
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import org.junit.Test

/**
 * Unit tests for [AssetFont] descriptor.
 */
class AssetFontTest {

    @Test
    fun constructor_validPath_createsInstance() {
        val font =
            AssetFont(
                path = "fonts/custom.ttf",
                weight = FontWeight.Bold,
                style = FontStyle.Italic,
            )

        assertEquals("fonts/custom.ttf", font.path)
        assertEquals(FontWeight.Bold, font.weight)
        assertEquals(FontStyle.Italic, font.style)
    }

    @Test
    fun constructor_blankPath_throwsIllegalArgumentException() {
        assertFailsWith<IllegalArgumentException> {
            AssetFont(path = "  ")
        }
    }
}
