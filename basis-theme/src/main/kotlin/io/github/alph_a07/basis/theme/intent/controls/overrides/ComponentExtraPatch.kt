package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath

/**
 * Family-specific patch fields extending universal styling for foundational components.
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
}
