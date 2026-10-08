package io.github.alph_a07.basis.theme

import io.github.alph_a07.basis.theme.color.CategoricalStrategy
import io.github.alph_a07.basis.theme.color.GradientDirection
import io.github.alph_a07.basis.theme.color.Oklch
import io.github.alph_a07.basis.theme.color.OklchGradient
import io.github.alph_a07.basis.theme.color.OklchStop
import io.github.alph_a07.basis.theme.color.categorical
import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.EmValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.core.LineHeightValue
import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.motion.EasingKind
import io.github.alph_a07.basis.theme.motion.MotionSpec
import io.github.alph_a07.basis.theme.tokens.color.BorderColors
import io.github.alph_a07.basis.theme.tokens.color.BrandColors
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.ContentColors
import io.github.alph_a07.basis.theme.tokens.color.FocusColors
import io.github.alph_a07.basis.theme.tokens.color.GradientColors
import io.github.alph_a07.basis.theme.tokens.color.IconColors
import io.github.alph_a07.basis.theme.tokens.color.SelectionColors
import io.github.alph_a07.basis.theme.tokens.color.StatusColors
import io.github.alph_a07.basis.theme.tokens.color.SurfaceColors
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.motion.MotionTokens
import io.github.alph_a07.basis.theme.tokens.scalars.AvatarSizes
import io.github.alph_a07.basis.theme.tokens.scalars.ControlSizes
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.DotSizes
import io.github.alph_a07.basis.theme.tokens.scalars.IconSizes
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SizeTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

private fun oklch(h: Float = 255f): Oklch = Oklch(l = 0.6f, c = 0.1f, h = h)

private fun gradient(): OklchGradient = OklchGradient(
    stops = listOf(OklchStop(oklch(250f), 0f), OklchStop(oklch(260f), 1f)),
    direction = GradientDirection.Vertical,
)

private fun role(): TypeRole = TypeRole(
    family = FontFamilyRef.Catalog(GoogleFontId("inter")),
    size = DpValue(16f),
    weight = FontWeightValue(400),
    lineHeight = LineHeightValue(1.5f),
    letterSpacing = EmValue(0f),
    color = TypeColorRef.ContentDefault,
)

private fun colorTokens(): ColorTokens {
    val surface = SurfaceColors(oklch(), oklch(), oklch(), oklch(20f))
    val content = ContentColors(oklch(20f), oklch(100f), oklch(300f))
    val icon = IconColors(oklch(20f), oklch(100f), oklch(300f))
    val border = BorderColors(oklch(), oklch(), oklch(), oklch(20f))
    val selection = SelectionColors(oklch(), oklch(20f), oklch())
    val status = StatusColors(oklch(), oklch(20f), oklch(), oklch(20f))
    return ColorTokens(
        surface = surface,
        content = content,
        icon = icon,
        border = border,
        selection = selection,
        focus = FocusColors(oklch(250f)),
        positive = status,
        negative = status,
        caution = status,
        info = status,
        gradient = GradientColors(gradient(), gradient()),
        brand = BrandColors(primary = oklch(25f), secondary = null, tertiary = null, quaternary = null),
    )
}

private fun typographyTokens(): TypographyTokens = TypographyTokens(
    structure = StructureType(role(), role(), role(), role(), role(), role()),
    content = ContentType(role(), role(), role(), role(), role()),
    metadata = MetadataType(role(), role(), role()),
)

private fun sizeTokens(): SizeTokens = SizeTokens(
    icon = IconSizes(
        level1 = DpValue(12f),
        level2 = DpValue(16f),
        level3 = DpValue(20f),
        level4 = DpValue(24f),
        level5 = DpValue(32f),
    ),
    avatar = AvatarSizes(
        level1 = DpValue(24f),
        level2 = DpValue(32f),
        level3 = DpValue(40f),
        level4 = DpValue(56f),
        level5 = DpValue(72f),
    ),
    control = ControlSizes(
        level1 = DpValue(32f),
        level2 = DpValue(40f),
        level3 = DpValue(48f),
        level4 = DpValue(56f),
        level5 = DpValue(64f),
    ),
    dot = DotSizes(level1 = DpValue(6f), level2 = DpValue(8f), level3 = DpValue(10f)),
)

private fun theme(mode: ThemeMode): ResolvedTheme {
    val color = colorTokens()
    val typography = typographyTokens()
    val spacing = SpacingTokens(
        level1 = DpValue(4f),
        level2 = DpValue(8f),
        level3 = DpValue(12f),
        level4 = DpValue(16f),
        level5 = DpValue(24f),
        level6 = DpValue(32f),
        level7 = DpValue(40f),
        level8 = DpValue(48f),
    )
    val radius = RadiusTokens(
        none = DpValue(0f),
        level1 = DpValue(2f),
        level2 = DpValue(4f),
        level3 = DpValue(6f),
        level4 = DpValue(8f),
        level5 = DpValue(12f),
        level6 = DpValue(16f),
        level7 = DpValue(24f),
        level8 = DpValue(32f),
        full = DpValue(9999f),
    )
    val depthSpec = DepthSpec(DpValue(2f), 0.2f, DpValue(4f), DpValue(1f))
    val size = sizeTokens()
    val spec = MotionSpec(DurationValue(200L), EasingKind.Standard)
    return ResolvedTheme(
        mode = mode,
        color = color,
        typography = typography,
        spacing = spacing,
        radius = radius,
        depth = DepthTokens(depthSpec, depthSpec, depthSpec, depthSpec),
        size = size,
        motion = MotionTokens(spec, spec, spec, spec, spec, spec),
    )
}

internal class TokenContractsTest {
    @Test
    fun representativeTreeConstructsAndComparesEqual() {
        assertEquals(theme(ThemeMode.Light), theme(ThemeMode.Light))
        assertTrue(theme(ThemeMode.Light) != theme(ThemeMode.Dark))
    }

    @Test
    fun categoricalRespectsCountAndStrategies() {
        val light = theme(ThemeMode.Light)
        val series = light.categorical(4)
        assertEquals(4, series.size)
        val even = light.categorical(3, CategoricalStrategy.EvenHue)
        assertEquals(3, even.size)
        assertFailsWith<IllegalArgumentException> { light.categorical(0) }
    }

    @Test
    fun primitivesRejectOutOfRange() {
        assertFailsWith<IllegalArgumentException> { Oklch(l = 2f, c = 0.1f, h = 10f) }
        assertFailsWith<IllegalArgumentException> { DpValue(-1f) }
        assertFailsWith<IllegalArgumentException> { FontWeightValue(450) }
    }
}
