package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.text.font.FontFamily
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.components.theme.font.fontRegistry
import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.EmValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.core.LineHeightValue
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import org.junit.Test

/**
 * Unit tests for [TypeRole] to Compose [androidx.compose.ui.text.TextStyle] bridging.
 */
class TypographyConversionsTest {

    private val customKey = CustomFontKey("custom-title")
    private val customFamily = FontFamily.Cursive
    private val registry = fontRegistry { register(customKey, customFamily) }

    private val role =
        TypeRole(
            family = FontFamilyRef.Custom(customKey),
            size = DpValue(20f),
            weight = FontWeightValue(700),
            lineHeight = LineHeightValue(1.3f),
            letterSpacing = EmValue(0.05f),
            color = TypeColorRef.ContentDefault,
        )

    @Test
    fun toTextStyle_withColorTokens_mapsPropertiesCorrectly() {
        val theme = resolve(BasisIntent()).light!!
        val textStyle = role.toTextStyle(theme.color, registry)

        assertEquals(customFamily, textStyle.fontFamily)
        assertEquals(700, textStyle.fontWeight?.weight)
        assertEquals(theme.color.content.default.toColor(), textStyle.color)
    }

    @Test
    fun toTextStyle_withBasisColorLocals_mapsPropertiesCorrectly() {
        val theme = resolve(BasisIntent()).light!!
        val locals = theme.color.toBasisColorLocals()
        val textStyle = role.toTextStyle(locals, registry)

        assertEquals(customFamily, textStyle.fontFamily)
        assertEquals(700, textStyle.fontWeight?.weight)
        assertEquals(locals.content.default, textStyle.color)
    }

    @Test
    fun toTextStyle_unregisteredCustomFamily_throws() {
        val unregisteredRole = role.copy(family = FontFamilyRef.Custom(CustomFontKey("not-registered")))
        val theme = resolve(BasisIntent()).light!!

        assertFailsWith<IllegalStateException> {
            unregisteredRole.toTextStyle(theme.color, FontFamilyRegistry.Empty)
        }
    }
}
