package io.github.alph_a07.basis.components.foundation

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Default parameters and thresholds for [BasisInteractiveNode].
 */
public object BasisInteractiveNodeDefaults {
    /** Default minimum physical touch target floor enforced for accessible interactions. */
    public val DEFAULT_MIN_TOUCH_TARGET_DP: Dp = 48.dp

    /** Default enabled state for interactive components. */
    public const val DEFAULT_ENABLED: Boolean = true

    /** Standard long press threshold duration in milliseconds. */
    public const val LONG_PRESS_TIMEOUT_MS: Long = 500L

    /** Standard tap debounce threshold in milliseconds. */
    public const val TAP_TIMEOUT_MS: Long = 100L
}
