package io.github.alph_a07.basis.theme.resolution.component

import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverride
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentStylePatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.ProminenceTier
import io.github.alph_a07.basis.theme.intent.controls.overrides.StateId
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import io.github.alph_a07.basis.theme.intent.controls.overrides.UniversalStylePatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantId
import io.github.alph_a07.basis.theme.intent.controls.overrides.VariantStateKey
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.resolveIn
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ComponentStyleResolutionTest {

    private val theme = resolve(BasisIntent()).light!!

    @Test
    fun resolveComponentStyle_emptyOverride_resolvesFromAllOrNull() {
        val all =
            ComponentStylePatch(
                universal =
                    UniversalStylePatch(
                        prominence = ProminenceTier.Secondary,
                        surface = ColorTokenPath.SurfaceDefault,
                    ),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                override = ComponentOverride(all = all),
                theme = theme,
            )

        assertEquals(ProminenceTier.Secondary, resolved.universal.prominence)
        assertEquals(ColorTokenPath.SurfaceDefault.resolveIn(theme.color), resolved.universal.surface)
        assertNull(resolved.universal.content)
        assertNull(resolved.extra)
    }

    @Test
    fun resolveComponentStyle_precedenceCascade_variantStateWins() {
        val all =
            ComponentStylePatch(
                universal =
                    UniversalStylePatch(
                        prominence = ProminenceTier.Quiet,
                        surface = ColorTokenPath.SurfaceDefault,
                        radius = RadiusTokenPath.Level1,
                    ),
            )
        val byState =
            ComponentStylePatch(
                universal =
                    UniversalStylePatch(
                        prominence = ProminenceTier.Tertiary,
                        surface = ColorTokenPath.SurfaceRecessed,
                    ),
            )
        val byVariant =
            ComponentStylePatch(
                universal =
                    UniversalStylePatch(
                        prominence = ProminenceTier.Secondary,
                        surface = ColorTokenPath.SurfaceElevated,
                    ),
            )
        val byVariantState =
            ComponentStylePatch(
                universal =
                    UniversalStylePatch(
                        prominence = ProminenceTier.Primary,
                    ),
            )

        val override =
            ComponentOverride(
                all = all,
                byState = mapOf(StateId.Pressed to byState),
                byVariant = mapOf(VariantId.Filled to byVariant),
                byVariantState =
                    mapOf(
                        VariantStateKey(VariantId.Filled, StateId.Pressed) to byVariantState,
                    ),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                variant = VariantId.Filled,
                state = StateId.Pressed,
                override = override,
                theme = theme,
            )

        // variantState defines prominence -> Primary
        assertEquals(ProminenceTier.Primary, resolved.universal.prominence)
        // variantState omits surface -> falls back to byVariant (SurfaceElevated)
        assertEquals(ColorTokenPath.SurfaceElevated.resolveIn(theme.color), resolved.universal.surface)
        // byVariant omits radius -> falls back to all (Level1)
        assertEquals(RadiusTokenPath.Level1.resolveIn(theme.radius), resolved.universal.radius)
    }

    @Test
    fun resolveComponentStyle_precedenceCascade_variantBeatsStateAndAll() {
        val all =
            ComponentStylePatch(
                universal = UniversalStylePatch(treatment = Treatment.Fill),
            )
        val byState =
            ComponentStylePatch(
                universal = UniversalStylePatch(treatment = Treatment.Soft),
            )
        val byVariant =
            ComponentStylePatch(
                universal = UniversalStylePatch(treatment = Treatment.Outline),
            )

        val override =
            ComponentOverride(
                all = all,
                byState = mapOf(StateId.Hovered to byState),
                byVariant = mapOf(VariantId.Outlined to byVariant),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                variant = VariantId.Outlined,
                state = StateId.Hovered,
                override = override,
                theme = theme,
            )

        assertEquals(Treatment.Outline, resolved.universal.treatment)
    }

    @Test
    fun resolveComponentStyle_precedenceCascade_stateBeatsAll() {
        val all =
            ComponentStylePatch(
                universal = UniversalStylePatch(treatment = Treatment.Fill),
            )
        val byState =
            ComponentStylePatch(
                universal = UniversalStylePatch(treatment = Treatment.Soft),
            )

        val override =
            ComponentOverride(
                all = all,
                byState = mapOf(StateId.Disabled to byState),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                state = StateId.Disabled,
                override = override,
                theme = theme,
            )

        assertEquals(Treatment.Soft, resolved.universal.treatment)
    }

    @Test
    fun resolveComponentStyle_extraPatch_mismatchedTypeIgnored() {
        // Pass Divider extra patch to a Surface component ID
        val override =
            ComponentOverride(
                all =
                    ComponentStylePatch(
                        extra =
                            ComponentExtraPatch.Divider(
                                thickness = SpacingTokenPath.Level2,
                            ),
                    ),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                override = override,
                theme = theme,
            )

        assertNull(resolved.extra)
    }

    @Test
    fun resolveComponentStyle_extraPatch_matchingTypeMerged() {
        val allSurface =
            ComponentExtraPatch.Surface(
                depth = DepthTokenPath.Level1,
                borderWidth = SpacingTokenPath.Level2,
            )
        val variantSurface =
            ComponentExtraPatch.Surface(
                depth = DepthTokenPath.Level3,
            )

        val override =
            ComponentOverride(
                all = ComponentStylePatch(extra = allSurface),
                byVariant = mapOf(VariantId.Primary to ComponentStylePatch(extra = variantSurface)),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                variant = VariantId.Primary,
                override = override,
                theme = theme,
            )

        assertNotNull(resolved.extra)
        assertTrue(resolved.extra is ComponentExtraPatch.Surface)
        val surfaceExtra = resolved.extra
        // variant wins for depth
        assertEquals(DepthTokenPath.Level3, surfaceExtra.depth)
        // all provides borderWidth fallback
        assertEquals(SpacingTokenPath.Level2, surfaceExtra.borderWidth)
    }

    @Test
    fun resolveComponentStyle_textFundamental_extraIgnored() {
        val override =
            ComponentOverride(
                all =
                    ComponentStylePatch(
                        universal =
                            UniversalStylePatch(
                                content = ColorTokenPath.ContentDefault,
                            ),
                        extra = ComponentExtraPatch.Divider(thickness = SpacingTokenPath.Level1),
                    ),
            )

        val textResolved =
            resolveComponentStyle(
                id = ComponentId.Text,
                override = override,
                theme = theme,
            )

        assertEquals(ColorTokenPath.ContentDefault.resolveIn(theme.color), textResolved.universal.content)
        assertNull(textResolved.extra)
    }

    @Test
    fun resolveComponentStyle_withComponentOverrides_resolvesMatchingComponent() {
        val overrides =
            ComponentOverrides(
                byComponent =
                    mapOf(
                        ComponentId.Surface to
                            ComponentOverride(
                                all =
                                    ComponentStylePatch(
                                        universal =
                                            UniversalStylePatch(
                                                surface = ColorTokenPath.SurfaceInverse,
                                            ),
                                    ),
                            ),
                    ),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                overrides = overrides,
                theme = theme,
            )

        assertEquals(ColorTokenPath.SurfaceInverse.resolveIn(theme.color), resolved.universal.surface)
    }

    @Test
    fun resolveComponentStyle_surfaceExtra_resolvesDepthAndBorderWidth() {
        val override =
            ComponentOverride(
                all =
                    ComponentStylePatch(
                        extra =
                            ComponentExtraPatch.Surface(
                                depth = DepthTokenPath.Level2,
                                borderWidth = SpacingTokenPath.Level1,
                            ),
                    ),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                override = override,
                theme = theme,
            )

        val extra = resolved.extra as? ComponentExtraPatch.Surface
        assertNotNull(extra)
        assertEquals(DepthTokenPath.Level2, extra.depth)
        assertEquals(SpacingTokenPath.Level1, extra.borderWidth)
    }

    @Test
    fun resolveComponentStyle_iconExtra_resolvesSize() {
        val override =
            ComponentOverride(
                all =
                    ComponentStylePatch(
                        extra = ComponentExtraPatch.Icon(size = IconSizeTokenPath.Level4),
                    ),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Icon,
                override = override,
                theme = theme,
            )

        val extra = resolved.extra as? ComponentExtraPatch.Icon
        assertNotNull(extra)
        assertEquals(IconSizeTokenPath.Level4, extra.size)
    }

    @Test
    fun resolveComponentStyle_dividerExtra_resolvesThickness() {
        val override =
            ComponentOverride(
                all =
                    ComponentStylePatch(
                        extra = ComponentExtraPatch.Divider(thickness = SpacingTokenPath.Level2),
                    ),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Divider,
                override = override,
                theme = theme,
            )

        val extra = resolved.extra as? ComponentExtraPatch.Divider
        assertNotNull(extra)
        assertEquals(SpacingTokenPath.Level2, extra.thickness)
    }

    @Test
    fun resolveComponentStyle_universalDepth_resolvesDepthSpec() {
        val override =
            ComponentOverride(
                all =
                    ComponentStylePatch(
                        universal = UniversalStylePatch(depth = DepthTokenPath.Level3),
                    ),
            )

        val resolved =
            resolveComponentStyle(
                id = ComponentId.Surface,
                override = override,
                theme = theme,
            )

        assertEquals(DepthTokenPath.Level3.resolveIn(theme.depth), resolved.universal.depth)
    }
}
