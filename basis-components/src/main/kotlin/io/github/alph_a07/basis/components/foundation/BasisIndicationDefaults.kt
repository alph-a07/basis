package io.github.alph_a07.basis.components.foundation

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Default visual thresholds, geometry ratios, and animation durations for [BasisIndication].
 */
public object BasisIndicationDefaults {

    /** Default highlight opacity for active press interactions in `0..1`. */
    public const val PRESSED_ALPHA: Float = 0.12f

    /** Default outline opacity for cursor hover interactions in `0..1`. */
    public const val HOVERED_ALPHA: Float = 0.04f

    /** Default overlay opacity for input focus interactions in `0..1`. */
    public const val FOCUSED_ALPHA: Float = 0.10f

    /** Stroke width in [Dp] for cursor hover indication outlines. */
    public val HoverStrokeWidth: Dp = 1.5.dp

    /** Stroke width in [Dp] for input focus indication outlines. */
    public val FocusStrokeWidth: Dp = 2.dp

    /** Dimension multiplier applied to the element hypotenuse to compute max ripple radius. */
    public const val RADIUS_EXPANSION_RATIO: Float = 0.6f

    /** Minimum fraction of max radius before release cross-fade begins in `0..1`. */
    public const val MIN_RADIUS_FRACTION: Float = 0.40f

    /** Minimum hold duration in milliseconds for press ripples before release fade begins. */
    public const val MIN_PRESS_HOLD_MS: Long = 80L

    /** Spring damping ratio for expanding press ripples. */
    public const val PRESS_SPRING_DAMPING: Float = 0.72f

    /** Spring stiffness for expanding press ripples. */
    public const val PRESS_SPRING_STIFFNESS: Float = 280f

    /** Duration in milliseconds for cross-fading ripple expansion into full fill upon release. */
    public const val FILL_CROSS_FADE_MS: Int = 80

    /** Duration in milliseconds for fading out indication highlights upon release. */
    public const val FADE_OUT_MS: Int = 160

    /** Duration in milliseconds for fading out indication highlights when press is cancelled. */
    public const val CANCEL_FADE_MS: Int = 120

    /** Duration in milliseconds for transitioning into the cursor hover state. */
    public const val HOVER_IN_MS: Int = 80

    /** Duration in milliseconds for transitioning out of the cursor hover state. */
    public const val HOVER_OUT_MS: Int = 120

    /** Duration in milliseconds for transitioning into the input focus state. */
    public const val FOCUS_IN_MS: Int = 100

    /** Duration in milliseconds for transitioning out of the input focus state. */
    public const val FOCUS_OUT_MS: Int = 140
}
