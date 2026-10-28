package io.github.alph_a07.basis.theme.intent.controls.overrides

import kotlinx.serialization.Serializable

/**
 * Theme specific override mode for overriding tokens.
 *
 * @param T Type of the overridden token.
 */
@Serializable
public sealed interface OverrideMode<out T> {

    /** Applied to both modes. */
    @Serializable
    public data class Both<T>(public val value: T) : OverrideMode<T>

    /** Applied to the light theme; the dark theme keeps its derived value. */
    @Serializable
    public data class LightOnly<T>(public val value: T) : OverrideMode<T>

    /** Applied to the dark theme; the light theme keeps its derived value. */
    @Serializable
    public data class DarkOnly<T>(public val value: T) : OverrideMode<T>

    /** Applied with a distinct value per theme mode. */
    @Serializable
    public data class Split<T>(
        public val light: T,
        public val dark: T,
    ) : OverrideMode<T>
}
