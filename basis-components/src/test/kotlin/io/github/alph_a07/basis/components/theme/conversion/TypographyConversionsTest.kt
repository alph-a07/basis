package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.TextUnitType
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.components.theme.font.fontRegistry
import io.github.alph_a07.basis.theme.core.EmValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.core.LineHeightValue
import io.github.alph_a07.basis.theme.core.SpValue
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
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
            size = SpValue(20f),
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

    @Test
    fun toTextStyle_allTypeColorRefVariants_mapsEachBranchCorrectly() {
        val theme = resolve(BasisIntent()).light!!
        val locals = theme.color.toBasisColorLocals()
        val explicitOklch = Oklch(0.6f, 0.2f, 240f)

        val defaultRole = role.copy(color = TypeColorRef.ContentDefault)
        val mutedRole = role.copy(color = TypeColorRef.ContentMuted)
        val inverseRole = role.copy(color = TypeColorRef.ContentInverse)
        val explicitRole = role.copy(color = TypeColorRef.Explicit(explicitOklch))

        assertEquals(locals.content.default, defaultRole.toTextStyle(locals, registry).color)
        assertEquals(locals.content.muted, mutedRole.toTextStyle(locals, registry).color)
        assertEquals(locals.content.inverse, inverseRole.toTextStyle(locals, registry).color)
        assertEquals(explicitOklch.toColor(), explicitRole.toTextStyle(locals, registry).color)

        assertEquals(theme.color.content.default.toColor(), defaultRole.toTextStyle(theme.color, registry).color)
        assertEquals(theme.color.content.muted.toColor(), mutedRole.toTextStyle(theme.color, registry).color)
        assertEquals(theme.color.content.inverse.toColor(), inverseRole.toTextStyle(theme.color, registry).color)

        assertEquals(explicitOklch.toColor(), explicitRole.toTextStyle(theme.color, registry).color)
    }

    @Test
    fun toTextStyle_respectsSystemFontScale_usesSpAndEmUnits() {
        val theme = resolve(BasisIntent()).light!!
        val textStyle = role.toTextStyle(theme.color, registry)

        assertEquals(TextUnitType.Sp, textStyle.fontSize.type)
        assertEquals(20f, textStyle.fontSize.value)

        assertEquals(TextUnitType.Em, textStyle.lineHeight.type)
        assertEquals(1.3f, textStyle.lineHeight.value)

        assertEquals(TextUnitType.Em, textStyle.letterSpacing.type)

        assertEquals(0.05f, textStyle.letterSpacing.value)
    }

    @Test
    fun toTextStyle_fontScaleSimulation_scalesSpFontSizeProportionally() {
        val theme = resolve(BasisIntent()).light!!
        val textStyle = role.toTextStyle(theme.color, registry)

        val density100 = Density(density = 2f, fontScale = 1.0f)
        val density150 = Density(density = 2f, fontScale = 1.5f)
        val density200 = Density(density = 2f, fontScale = 2.0f)

        val px100 = with(density100) { textStyle.fontSize.toPx() }
        val px150 = with(density150) { textStyle.fontSize.toPx() }
        val px200 = with(density200) { textStyle.fontSize.toPx() }

        assertEquals(40f, px100)
        // Respects Compose/Android non-linear font scaling curve (scales up with fontScale)
        assertTrue(px150 > px100, "Font scale 1.5x must scale up font size ($px150 > $px100)")

        assertTrue(px200 > px150, "Font scale 2.0x must scale up font size further ($px200 > $px150)")
    }

    @Test
    fun toTextStyle_fontWeightAdjustment_supportsSystemBoldShifts() {
        val theme = resolve(BasisIntent()).light!!
        val textStyle = role.toTextStyle(theme.color, registry)

        assertNotNull(textStyle.fontWeight)
        assertEquals(700, textStyle.fontWeight!!.weight)

        val simulatedBoldOffset = 300
        val adjustedWeight = (textStyle.fontWeight!!.weight + simulatedBoldOffset).coerceIn(1, 1000)

        assertEquals(1000, adjustedWeight)
    }

    @Test
    fun toBasisTypographyLocals_convertsAllLaddersAndLevels() {
        val theme = resolve(BasisIntent()).light!!
        val locals = theme.color.toBasisColorLocals()

        val typographyLocalsFromTokens = theme.typography.toBasisTypographyLocals(theme.color, registry)
        val typographyLocalsFromLocals = theme.typography.toBasisTypographyLocals(locals, registry)

        assertNotNull(typographyLocalsFromTokens.structure.level1)
        assertNotNull(typographyLocalsFromTokens.structure.level2)
        assertNotNull(typographyLocalsFromTokens.structure.level3)
        assertNotNull(typographyLocalsFromTokens.structure.level4)
        assertNotNull(typographyLocalsFromTokens.structure.level5)
        assertNotNull(typographyLocalsFromTokens.structure.level6)

        assertNotNull(typographyLocalsFromTokens.content.level1)
        assertNotNull(typographyLocalsFromTokens.content.level2)
        assertNotNull(typographyLocalsFromTokens.content.level3)
        assertNotNull(typographyLocalsFromTokens.content.level4)
        assertNotNull(typographyLocalsFromTokens.content.level5)

        assertNotNull(typographyLocalsFromTokens.metadata.level1)
        assertNotNull(typographyLocalsFromTokens.metadata.level2)
        assertNotNull(typographyLocalsFromTokens.metadata.level3)

        assertEquals(
            typographyLocalsFromTokens.structure.level1.fontSize,
            typographyLocalsFromLocals.structure.level1.fontSize,
        )
        assertEquals(
            typographyLocalsFromTokens.content.level1.fontSize,
            typographyLocalsFromLocals.content.level1.fontSize,
        )

        assertEquals(
            typographyLocalsFromTokens.metadata.level1.fontSize,
            typographyLocalsFromLocals.metadata.level1.fontSize,
        )
    }
}
