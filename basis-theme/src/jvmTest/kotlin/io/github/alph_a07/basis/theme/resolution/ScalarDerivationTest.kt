package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.resolution.derive.ScalarWeights
import io.github.alph_a07.basis.theme.resolution.derive.deriveRadiusTokens
import io.github.alph_a07.basis.theme.resolution.derive.deriveSpacingTokens
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens
import kotlin.test.Test
import kotlin.test.assertEquals

class ScalarDerivationTest {

    @Test
    fun spacingLadderSnapsToGridWhenScaled() {
        val spacing =
            SpacingTokens(
                level1 = DpValue(4f),
                level2 = DpValue(8f),
                level3 = DpValue(12f),
                level4 = DpValue(16f),
                level5 = DpValue(24f),
                level6 = DpValue(32f),
                level7 = DpValue(40f),
                level8 = DpValue(48f),
            )
        val weights =
            ScalarWeights(
                spacing = 1.15f,
                radius = 1f,
                depth = 1f,
                control = 1f,
                iconDot = 1f,
                avatar = 1f,
            )

        val derived = deriveSpacingTokens(spacing, weights)

        // 4 * 1.15 = 4.6 -> snaps to 5.0
        assertEquals(5f, derived.level1.value)
        // 8 * 1.15 = 9.2 -> snaps to 9.0
        assertEquals(9f, derived.level2.value)
        // 12 * 1.15 = 13.8 -> snaps to 14.0
        assertEquals(14f, derived.level3.value)
        // 16 * 1.15 = 18.4 -> snaps to 18.0
        assertEquals(18f, derived.level4.value)
        // 24 * 1.15 = 27.6 -> snaps to 28.0
        assertEquals(28f, derived.level5.value)
        // 32 * 1.15 = 36.8 -> snaps to 37.0
        assertEquals(37f, derived.level6.value)
        // 40 * 1.15 = 46.0 -> snaps to 46.0
        assertEquals(46f, derived.level7.value)
        // 48 * 1.15 = 55.2 -> snaps to 55.0
        assertEquals(55f, derived.level8.value)
    }

    @Test
    fun radiusLadderSnapsToGridAndExcludesSentinels() {
        val radius =
            RadiusTokens(
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
        val weights =
            ScalarWeights(
                spacing = 1f,
                radius = 1.15f,
                depth = 1f,
                control = 1f,
                iconDot = 1f,
                avatar = 1f,
            )

        val derived = deriveRadiusTokens(radius, weights)

        // none and full sentinels must remain untouched
        assertEquals(0f, derived.none.value)
        assertEquals(9999f, derived.full.value)

        // levels scaled and snapped to grid
        // 2 * 1.15 = 2.3 -> snaps to 2.0
        assertEquals(2f, derived.level1.value)
        // 4 * 1.15 = 4.6 -> snaps to 5.0
        assertEquals(5f, derived.level2.value)
        // 6 * 1.15 = 6.9 -> snaps to 7.0
        assertEquals(7f, derived.level3.value)
        // 8 * 1.15 = 9.2 -> snaps to 9.0
        assertEquals(9f, derived.level4.value)
        // 32 * 1.15 = 36.8 -> snaps to 37.0
        assertEquals(37f, derived.level8.value)
    }
}
