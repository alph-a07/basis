package io.github.alph_a07.basis.theme

import io.github.alph_a07.basis.theme.color.GradientDirection
import io.github.alph_a07.basis.theme.color.Oklch
import io.github.alph_a07.basis.theme.color.OklchGradient
import io.github.alph_a07.basis.theme.color.OklchStop
import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.DurationValue
import io.github.alph_a07.basis.theme.core.EmValue
import io.github.alph_a07.basis.theme.core.FontWeightValue
import io.github.alph_a07.basis.theme.core.LineHeightValue
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
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.core.resolveIn
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
import kotlin.test.assertTrue

/**
 * Asserts that each token path identifier maps to exactly one leaf of the theme tree and that
 * every member of a path family resolves to a distinct leaf.
 */
internal class TokenPathsTest {

    private val pathFormat = Regex("""^[a-z][A-Za-z0-9]*(\.[a-z][A-Za-z0-9]*)*$""")

    private class LeafSequence {
        private var n = 0
        fun oklch(): Oklch {
            n += 1
            return Oklch(l = 0.01f * n, c = 0f, h = 0f)
        }

        fun dp(): DpValue {
            n += 1
            return DpValue(n.toFloat())
        }

        fun depth(): DepthSpec {
            n += 1
            return DepthSpec(
                elevation = DpValue(n.toFloat()),
                shadowAlpha = 0.2f,
                shadowBlur = DpValue(n.toFloat()),
                shadowYOffset = DpValue(1f),
            )
        }

        fun motion(): MotionSpec {
            n += 1
            return MotionSpec(
                duration = DurationValue(50L * n),
                easing = EasingKind.Standard,
            )
        }

        fun gradient(): OklchGradient = OklchGradient(
            stops = listOf(OklchStop(oklch(), 0f), OklchStop(oklch(), 1f)),
            direction = GradientDirection.Vertical,
        )

        fun role(): TypeRole {
            n += 1
            return TypeRole(
                family = FontFamilyRef.Catalog(GoogleFontId("inter")),
                size = DpValue(10f + n),
                weight = FontWeightValue(400),
                lineHeight = LineHeightValue(1.5f),
                letterSpacing = EmValue(0f),
                color = TypeColorRef.ContentDefault,
            )
        }
    }

    @Test
    fun typeAndMotionPathLiteralsMirrorTheTokenTree() {
        val typeExpected = listOf(
            TypographyTokenPath.StructureLevel1 to "typography.structure.level1",
            TypographyTokenPath.StructureLevel2 to "typography.structure.level2",
            TypographyTokenPath.StructureLevel3 to "typography.structure.level3",
            TypographyTokenPath.StructureLevel4 to "typography.structure.level4",
            TypographyTokenPath.StructureLevel5 to "typography.structure.level5",
            TypographyTokenPath.StructureLevel6 to "typography.structure.level6",
            TypographyTokenPath.ContentLevel1 to "typography.content.level1",
            TypographyTokenPath.ContentLevel2 to "typography.content.level2",
            TypographyTokenPath.ContentLevel3 to "typography.content.level3",
            TypographyTokenPath.ContentLevel4 to "typography.content.level4",
            TypographyTokenPath.ContentLevel5 to "typography.content.level5",
            TypographyTokenPath.MetadataLevel1 to "typography.metadata.level1",
            TypographyTokenPath.MetadataLevel2 to "typography.metadata.level2",
            TypographyTokenPath.MetadataLevel3 to "typography.metadata.level3",
        )
        val motionExpected = listOf(
            MotionTokenPath.Feedback to "motion.feedback",
            MotionTokenPath.StateTransition to "motion.stateTransition",
            MotionTokenPath.Transformation to "motion.transformation",
            MotionTokenPath.Expansion to "motion.expansion",
            MotionTokenPath.Reposition to "motion.reposition",
            MotionTokenPath.Emphasis to "motion.emphasis",
        )
        assertEquals(TypographyTokenPath.entries.size, typeExpected.size)
        assertEquals(MotionTokenPath.entries.size, motionExpected.size)
        typeExpected.forEach { (member, literal) -> assertEquals(literal, member.path) }
        motionExpected.forEach { (member, literal) -> assertEquals(literal, member.path) }
    }

    @Test
    fun scalarPathLiteralsMirrorTheTokenTree() {
        val spacingExpected = listOf(
            SpacingTokenPath.Level1 to "spacing.level1",
            SpacingTokenPath.Level2 to "spacing.level2",
            SpacingTokenPath.Level3 to "spacing.level3",
            SpacingTokenPath.Level4 to "spacing.level4",
            SpacingTokenPath.Level5 to "spacing.level5",
            SpacingTokenPath.Level6 to "spacing.level6",
            SpacingTokenPath.Level7 to "spacing.level7",
            SpacingTokenPath.Level8 to "spacing.level8",
        )
        val radiusExpected = listOf(
            RadiusTokenPath.None to "radius.none",
            RadiusTokenPath.Level1 to "radius.level1",
            RadiusTokenPath.Level2 to "radius.level2",
            RadiusTokenPath.Level3 to "radius.level3",
            RadiusTokenPath.Level4 to "radius.level4",
            RadiusTokenPath.Level5 to "radius.level5",
            RadiusTokenPath.Level6 to "radius.level6",
            RadiusTokenPath.Level7 to "radius.level7",
            RadiusTokenPath.Level8 to "radius.level8",
            RadiusTokenPath.Full to "radius.full",
        )
        val depthExpected = listOf(
            DepthTokenPath.Level1 to "depth.level1",
            DepthTokenPath.Level2 to "depth.level2",
            DepthTokenPath.Level3 to "depth.level3",
            DepthTokenPath.Level4 to "depth.level4",
        )
        val iconExpected = listOf(
            IconSizeTokenPath.Level1 to "size.icon.level1",
            IconSizeTokenPath.Level2 to "size.icon.level2",
            IconSizeTokenPath.Level3 to "size.icon.level3",
            IconSizeTokenPath.Level4 to "size.icon.level4",
            IconSizeTokenPath.Level5 to "size.icon.level5",
        )
        val controlExpected = listOf(
            ControlSizeTokenPath.Level1 to "size.control.level1",
            ControlSizeTokenPath.Level2 to "size.control.level2",
            ControlSizeTokenPath.Level3 to "size.control.level3",
            ControlSizeTokenPath.Level4 to "size.control.level4",
            ControlSizeTokenPath.Level5 to "size.control.level5",
        )
        assertEquals(SpacingTokenPath.entries.size, spacingExpected.size)
        assertEquals(RadiusTokenPath.entries.size, radiusExpected.size)
        assertEquals(DepthTokenPath.entries.size, depthExpected.size)
        assertEquals(IconSizeTokenPath.entries.size, iconExpected.size)
        assertEquals(ControlSizeTokenPath.entries.size, controlExpected.size)
        spacingExpected.forEach { (member, literal) -> assertEquals(literal, member.path) }
        radiusExpected.forEach { (member, literal) -> assertEquals(literal, member.path) }
        depthExpected.forEach { (member, literal) -> assertEquals(literal, member.path) }
        iconExpected.forEach { (member, literal) -> assertEquals(literal, member.path) }
        controlExpected.forEach { (member, literal) -> assertEquals(literal, member.path) }
    }

    @Test
    fun pathIdentifiersAreUniqueAndWellFormatted() {
        val all = listOf(
            ColorTokenPath.entries.map { it.path },
            TypographyTokenPath.entries.map { it.path },
            SpacingTokenPath.entries.map { it.path },
            RadiusTokenPath.entries.map { it.path },
            DepthTokenPath.entries.map { it.path },
            IconSizeTokenPath.entries.map { it.path },
            ControlSizeTokenPath.entries.map { it.path },
            MotionTokenPath.entries.map { it.path },
        ).flatten()

        assertEquals(all.size, all.distinct().size)
        assertTrue(all.all { pathFormat.matches(it) })
        assertTrue(
            all.all {
                it.startsWith("color.") || it.startsWith("typography.") || it.startsWith("spacing.") ||
                    it.startsWith("radius.") ||
                    it.startsWith("depth.") ||
                    it.startsWith("size.icon.") ||
                    it.startsWith("size.control.") ||
                    it.startsWith("motion.")
            },
        )
    }

    @Test
    fun colorPathLiteralsMirrorTheTokenTree() {
        val expected = listOf(
            ColorTokenPath.SurfaceDefault to "color.surface.default",
            ColorTokenPath.SurfaceElevated to "color.surface.elevated",
            ColorTokenPath.SurfaceRecessed to "color.surface.recessed",
            ColorTokenPath.SurfaceInverse to "color.surface.inverse",
            ColorTokenPath.ContentDefault to "color.content.default",
            ColorTokenPath.ContentMuted to "color.content.muted",
            ColorTokenPath.ContentInverse to "color.content.inverse",
            ColorTokenPath.IconDefault to "color.icon.default",
            ColorTokenPath.IconMuted to "color.icon.muted",
            ColorTokenPath.IconInverse to "color.icon.inverse",
            ColorTokenPath.BorderDefault to "color.border.default",
            ColorTokenPath.BorderMuted to "color.border.muted",
            ColorTokenPath.BorderStrong to "color.border.strong",
            ColorTokenPath.BorderInverse to "color.border.inverse",
            ColorTokenPath.SelectionSurface to "color.selection.surface",
            ColorTokenPath.SelectionContent to "color.selection.content",
            ColorTokenPath.SelectionBorder to "color.selection.border",
            ColorTokenPath.FocusRing to "color.focus.ring",
            ColorTokenPath.PositiveSurface to "color.positive.surface",
            ColorTokenPath.PositiveContent to "color.positive.content",
            ColorTokenPath.PositiveBorder to "color.positive.border",
            ColorTokenPath.PositiveIcon to "color.positive.icon",
            ColorTokenPath.NegativeSurface to "color.negative.surface",
            ColorTokenPath.NegativeContent to "color.negative.content",
            ColorTokenPath.NegativeBorder to "color.negative.border",
            ColorTokenPath.NegativeIcon to "color.negative.icon",
            ColorTokenPath.CautionSurface to "color.caution.surface",
            ColorTokenPath.CautionContent to "color.caution.content",
            ColorTokenPath.CautionBorder to "color.caution.border",
            ColorTokenPath.CautionIcon to "color.caution.icon",
            ColorTokenPath.InfoSurface to "color.info.surface",
            ColorTokenPath.InfoContent to "color.info.content",
            ColorTokenPath.InfoBorder to "color.info.border",
            ColorTokenPath.InfoIcon to "color.info.icon",
            ColorTokenPath.BrandPrimary to "color.brand.primary",
            ColorTokenPath.BrandSecondary to "color.brand.secondary",
            ColorTokenPath.BrandTertiary to "color.brand.tertiary",
            ColorTokenPath.BrandQuaternary to "color.brand.quaternary",
        )
        assertEquals(ColorTokenPath.entries.size, expected.size)
        expected.forEach { (member, literal) -> assertEquals(literal, member.path) }
    }

    @Test
    fun eachColorPathResolvesExactlyOneLeaf() {
        val resolved: Map<ColorTokenPath, Oklch?> =
            ColorTokenPath.entries.associateWith { it.resolveIn(colorTree(LeafSequence())) }
        assertEquals(ColorTokenPath.entries.size, resolved.values.distinct().size)
    }

    private fun colorTree(leaves: LeafSequence): ColorTokens = ColorTokens(
        surface = SurfaceColors(leaves.oklch(), leaves.oklch(), leaves.oklch(), leaves.oklch()),
        content = ContentColors(leaves.oklch(), leaves.oklch(), leaves.oklch()),
        icon = IconColors(leaves.oklch(), leaves.oklch(), leaves.oklch()),
        border = BorderColors(leaves.oklch(), leaves.oklch(), leaves.oklch(), leaves.oklch()),
        selection = SelectionColors(leaves.oklch(), leaves.oklch(), leaves.oklch()),
        focus = FocusColors(leaves.oklch()),
        positive = StatusColors(leaves.oklch(), leaves.oklch(), leaves.oklch(), leaves.oklch()),
        negative = StatusColors(leaves.oklch(), leaves.oklch(), leaves.oklch(), leaves.oklch()),
        caution = StatusColors(leaves.oklch(), leaves.oklch(), leaves.oklch(), leaves.oklch()),
        info = StatusColors(leaves.oklch(), leaves.oklch(), leaves.oklch(), leaves.oklch()),
        gradient = GradientColors(leaves.gradient(), leaves.gradient()),
        brand = BrandColors(
            primary = leaves.oklch(),
            secondary = leaves.oklch(),
            tertiary = leaves.oklch(),
            quaternary = leaves.oklch(),
        ),
    )

    @Test
    fun eachTypographyPathResolvesExactlyOneLeaf() {
        val leaves = LeafSequence()
        val typography = TypographyTokens(
            structure = StructureType(
                leaves.role(),
                leaves.role(),
                leaves.role(),
                leaves.role(),
                leaves.role(),
                leaves.role(),
            ),
            content = ContentType(
                leaves.role(),
                leaves.role(),
                leaves.role(),
                leaves.role(),
                leaves.role(),
            ),
            metadata = MetadataType(leaves.role(), leaves.role(), leaves.role()),
        )
        val resolved = TypographyTokenPath.entries.associateWith { it.resolveIn(typography) }
        assertEquals(TypographyTokenPath.entries.size, resolved.values.distinct().size)
    }

    @Test
    fun eachScalarPathResolvesExactlyOneLeaf() {
        val leaves = LeafSequence()
        val spacing = SpacingTokens(
            leaves.dp(),
            leaves.dp(),
            leaves.dp(),
            leaves.dp(),
            leaves.dp(),
            leaves.dp(),
            leaves.dp(),
            leaves.dp(),
        )
        val radius = RadiusTokens(
            none = leaves.dp(),
            level1 = leaves.dp(),
            level2 = leaves.dp(),
            level3 = leaves.dp(),
            level4 = leaves.dp(),
            level5 = leaves.dp(),
            level6 = leaves.dp(),
            level7 = leaves.dp(),
            level8 = leaves.dp(),
            full = leaves.dp(),
        )
        val depth = DepthTokens(leaves.depth(), leaves.depth(), leaves.depth(), leaves.depth())
        val size = SizeTokens(
            icon = IconSizes(leaves.dp(), leaves.dp(), leaves.dp(), leaves.dp(), leaves.dp()),
            avatar = AvatarSizes(leaves.dp(), leaves.dp(), leaves.dp(), leaves.dp(), leaves.dp()),
            control = ControlSizes(leaves.dp(), leaves.dp(), leaves.dp(), leaves.dp(), leaves.dp()),
            dot = DotSizes(leaves.dp(), leaves.dp(), leaves.dp()),
        )

        val resolved = listOf(
            SpacingTokenPath.entries.associateWith { it.resolveIn(spacing) },
            RadiusTokenPath.entries.associateWith { it.resolveIn(radius) },
            DepthTokenPath.entries.associateWith { it.resolveIn(depth) },
            IconSizeTokenPath.entries.associateWith { it.resolveIn(size.icon) },
            ControlSizeTokenPath.entries.associateWith { it.resolveIn(size.control) },
        ).flatMap { it.values }.distinct()
        val expected = SpacingTokenPath.entries.size +
            RadiusTokenPath.entries.size +
            DepthTokenPath.entries.size +
            IconSizeTokenPath.entries.size +
            ControlSizeTokenPath.entries.size
        assertEquals(expected, resolved.size)
    }

    @Test
    fun eachMotionPathResolvesExactlyOneLeaf() {
        val leaves = LeafSequence()
        val motion = MotionTokens(
            leaves.motion(),
            leaves.motion(),
            leaves.motion(),
            leaves.motion(),
            leaves.motion(),
            leaves.motion(),
        )
        val resolved = MotionTokenPath.entries.associateWith { path ->
            when (path) {
                MotionTokenPath.Feedback -> motion.feedback
                MotionTokenPath.StateTransition -> motion.stateTransition
                MotionTokenPath.Transformation -> motion.transformation
                MotionTokenPath.Expansion -> motion.expansion
                MotionTokenPath.Reposition -> motion.reposition
                MotionTokenPath.Emphasis -> motion.emphasis
            }
        }
        assertEquals(MotionTokenPath.entries.size, resolved.values.distinct().size)
    }
}
