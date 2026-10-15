package io.github.alph_a07.basis.theme.resolution.control

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.controls.overrides.DepthOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.DepthSpecPatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens

/**
 * Applies spacing overrides, which are mode-invariant.
 *
 * @param spacing Derived spacing ladder.
 * @param overrides Token overrides as specified, or null when Control specifies none.
 * @return The overridden spacing ladder.
 */
internal fun applySpacingOverrides(
    spacing: SpacingTokens,
    overrides: TokenOverrides?,
): SpacingTokens {
    val patch = overrides?.spacing ?: return spacing

    return spacing.copy(
        level1 = patch.level1 ?: spacing.level1,
        level2 = patch.level2 ?: spacing.level2,
        level3 = patch.level3 ?: spacing.level3,
        level4 = patch.level4 ?: spacing.level4,
        level5 = patch.level5 ?: spacing.level5,
        level6 = patch.level6 ?: spacing.level6,
        level7 = patch.level7 ?: spacing.level7,
        level8 = patch.level8 ?: spacing.level8,
    )
}

/**
 * Applies radius overrides, which are mode-invariant.
 *
 * The `none` and `full` sentinels stay fixed, so Control cannot turn them into ordinary levels.
 *
 * @param radius Derived radius ladder.
 * @param overrides Token overrides as specified, or null when Control specifies none.
 * @return The overridden radius ladder.
 */
internal fun applyRadiusOverrides(
    radius: RadiusTokens,
    overrides: TokenOverrides?,
): RadiusTokens {
    val patch = overrides?.radius ?: return radius

    return radius.copy(
        level1 = patch.level1 ?: radius.level1,
        level2 = patch.level2 ?: radius.level2,
        level3 = patch.level3 ?: radius.level3,
        level4 = patch.level4 ?: radius.level4,
        level5 = patch.level5 ?: radius.level5,
        level6 = patch.level6 ?: radius.level6,
        level7 = patch.level7 ?: radius.level7,
        level8 = patch.level8 ?: radius.level8,
    )
}

/**
 * Applies depth level patches onto one mode's depth ladder.
 *
 * Elevation, blur, and offset apply to every mode; shadow alpha is mode-scoped because shadow
 * strength differs per mode.
 *
 * @param depth Derived depth ladder.
 * @param overrides Depth overrides as specified, or null when Control specifies none.
 * @param mode Mode being resolved.
 * @return The overridden depth ladder.
 */
internal fun applyDepthOverrides(
    depth: DepthTokens,
    overrides: DepthOverrides?,
    mode: ThemeMode,
): DepthTokens {
    if (overrides == null) {
        return depth
    }

    return depth.copy(
        level1 = depth.level1.applyPatch(overrides.level1, mode),
        level2 = depth.level2.applyPatch(overrides.level2, mode),
        level3 = depth.level3.applyPatch(overrides.level3, mode),
        level4 = depth.level4.applyPatch(overrides.level4, mode),
    )
}

private fun DepthSpec.applyPatch(patch: DepthSpecPatch?, mode: ThemeMode): DepthSpec {
    if (patch == null) {
        return this
    }

    return copy(
        elevation = patch.elevation ?: elevation,
        shadowAlpha = patch.shadowAlpha.forMode(mode) ?: shadowAlpha,
        shadowBlur = patch.shadowBlur ?: shadowBlur,
        shadowYOffset = patch.shadowYOffset ?: shadowYOffset,
    )
}
