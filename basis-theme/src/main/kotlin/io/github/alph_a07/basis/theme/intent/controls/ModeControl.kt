package io.github.alph_a07.basis.theme.intent.controls

import io.github.alph_a07.basis.theme.core.ThemeMode

/**
 * Color-mode generation policy for the resolved pair.
 *
 * @property preferred Mode the host application leans toward; a pairing hint, not a filter.
 * @property generate Which mode trees to deliver in the resolved theme.
 */
public data class ModeControl(
    public val preferred: ThemeMode? = null,
    public val generate: ModeGeneration = ModeGeneration.Pair,
)

/** Which color-mode trees a resolution produces. */
public enum class ModeGeneration {
    /** Both light and dark trees. */
    Pair,

    /** Only the light tree. */
    LightOnly,

    /** Only the dark tree. */
    DarkOnly,
}
