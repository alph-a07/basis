package io.github.alph_a07.basis.components.theme

import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import io.github.alph_a07.basis.components.theme.font.ResourceFont
import io.github.alph_a07.basis.components.theme.font.loadFontFamilyFromResource
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull
import org.junit.Test

/**
 * Unit tests for [ResourceFont] descriptor and resource loading helpers.
 */
class ResourceFontTest {

    @Test
    fun constructor_validResId_createsInstance() {
        val font = ResourceFont(resId = 123, weight = FontWeight.Bold, style = FontStyle.Italic)

        assertEquals(123, font.resId)
        assertEquals(FontWeight.Bold, font.weight)
        assertEquals(FontStyle.Italic, font.style)
    }

    @Test
    fun constructor_zeroResId_throwsIllegalArgumentException() {
        assertFailsWith<IllegalArgumentException> {
            ResourceFont(resId = 0)
        }
    }

    @Test
    fun loadFontFamilyFromResource_singleRes_returnsFontFamily() {
        val family = loadFontFamilyFromResource(resId = 123)

        assertNotNull(family)
    }

    @Test
    fun loadFontFamilyFromResource_vararg_returnsFontFamily() {
        val family =
            loadFontFamilyFromResource(
                ResourceFont(resId = 123, weight = FontWeight.Normal),
                ResourceFont(resId = 124, weight = FontWeight.Bold),
            )

        assertNotNull(family)
    }

    @Test
    fun loadFontFamilyFromResource_emptyVararg_throwsIllegalArgumentException() {
        assertFailsWith<IllegalArgumentException> {
            loadFontFamilyFromResource()
        }
    }
}
