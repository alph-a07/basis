package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath

/**
 * Family-specific patch fields extending universal component styling.
 */
public sealed interface ComponentExtraPatch {

    /**
     * Surface-family fields beyond the universal patch.
     *
     * @property depth Depth level path defining elevation and shadow.
     * @property borderWidth Border stroke thickness path.
     */
    public data class Surface(
        public val depth: DepthTokenPath? = null,
        public val borderWidth: SpacingTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Icon-family fields beyond the universal patch.
     *
     * @property size Icon size level path from the theme size ladder.
     */
    public data class Icon(
        public val size: IconSizeTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Divider-family fields beyond the universal patch.
     *
     * @property thickness Divider stroke thickness path.
     */
    public data class Divider(
        public val thickness: SpacingTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Interactive affordance fields beyond the universal patch.
     *
     * @property motion Motion purpose path for interaction indication.
     */
    public data class Interactive(
        public val motion: MotionTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Spacer-family fields beyond the universal patch.
     *
     * @property size Spacing ladder path defining the default spacer extent.
     */
    public data class Spacer(
        public val size: SpacingTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Button-family fields beyond the universal patch.
     *
     * @property icon Icon color path.
     * @property iconSize Icon size level path.
     * @property controlSize Control size level path.
     * @property depth Depth level path.
     * @property motion Motion purpose path.
     */
    public data class Button(
        public val icon: ColorTokenPath? = null,
        public val iconSize: IconSizeTokenPath? = null,
        public val controlSize: ControlSizeTokenPath? = null,
        public val depth: DepthTokenPath? = null,
        public val motion: MotionTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Text-field-family fields beyond the universal patch.
     *
     * @property labelTypography Label typography role path.
     * @property placeholderContent Placeholder content color path.
     * @property leadingIcon Leading icon color path.
     * @property controlSize Control size level path.
     */
    public data class TextField(
        public val labelTypography: TypographyTokenPath? = null,
        public val placeholderContent: ColorTokenPath? = null,
        public val leadingIcon: ColorTokenPath? = null,
        public val controlSize: ControlSizeTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Switch-family fields beyond the universal patch.
     *
     * @property trackOn Track color path in the on state.
     * @property trackOff Track color path in the off state.
     * @property thumb Thumb color path.
     */
    public data class Switch(
        public val trackOn: ColorTokenPath? = null,
        public val trackOff: ColorTokenPath? = null,
        public val thumb: ColorTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Dialog-family fields beyond the universal patch.
     *
     * @property scrim Scrim color path.
     * @property depth Depth level path.
     */
    public data class Dialog(
        public val scrim: ColorTokenPath? = null,
        public val depth: DepthTokenPath? = null,
    ) : ComponentExtraPatch
}
