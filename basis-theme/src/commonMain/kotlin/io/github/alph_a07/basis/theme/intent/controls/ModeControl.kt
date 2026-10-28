package io.github.alph_a07.basis.theme.intent.controls

import io.github.alph_a07.basis.theme.core.ThemeMode
import kotlinx.serialization.Serializable

/**
 * Color-mode policy for the resolved theme.
 *
 * @property preferred Mode the host application leans toward; a pairing hint, not a filter.
 * @property targets Set of theme modes to deliver in the resolved theme.
 */
@Serializable
public data class ModeControl(
    public val preferred: ThemeMode? = null,
    public val targets: Set<ThemeMode> = setOf(ThemeMode.Light, ThemeMode.Dark),
)
