package io.github.alph_a07.basis.theme.resolution.control

import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode

/**
 * Resolves a mode-scoped override for one mode.
 *
 * @param mode Mode being resolved.
 * @return The replacement value, or null when the override targets another mode only.
 */
internal fun <T> OverrideMode<T>?.forMode(mode: ThemeMode): T? {
    if (this == null) {
        return null
    }

    return when (this) {
        is OverrideMode.Both -> {
            value
        }
        is OverrideMode.LightOnly -> {
            value.takeIf { mode == ThemeMode.Light }
        }
        is OverrideMode.DarkOnly -> {
            value.takeIf { mode == ThemeMode.Dark }
        }
        is OverrideMode.Split -> {
            if (mode == ThemeMode.Light) {
                light
            } else {
                dark
            }
        }
    }
}
