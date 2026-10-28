package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import kotlinx.serialization.Serializable

/**
 * Wrapper for values that override a token in a [ResolvedTheme] tree via the [TokenOverrides.paths] map.
 */
@Serializable
public sealed interface OverrideValue {

    /**
     * Mode-scoped OKLCH color token replacement.
     *
     * @property value Replacement color, scoped to one or both generated modes.
     */
    @Serializable
    public data class Color(public val value: OverrideMode<Oklch>) : OverrideValue {

        /**
         * Builds a replacement applied to every generated mode.
         *
         * @param value Replacement color shared by both modes.
         */
        public constructor(value: Oklch) : this(OverrideMode.Both(value))
    }

    /**
     * dp-valued token replacement for spacing, radius, and size paths.
     *
     * @property value Replacement magnitude.
     */
    @Serializable
    public data class Dp(public val value: DpValue) : OverrideValue

    /**
     * Whole-role typography replacement.
     *
     * @property value Replacement composite.
     */
    @Serializable
    public data class Typography(public val value: TypeRole) : OverrideValue

    /**
     * Motion purpose replacement.
     *
     * @property value Replacement timing spec.
     */
    @Serializable
    public data class Motion(public val value: MotionSpec) : OverrideValue

    /**
     * Depth level replacement.
     *
     * @property value Replacement elevation spec.
     */
    @Serializable
    public data class Depth(public val value: DepthSpec) : OverrideValue
}
