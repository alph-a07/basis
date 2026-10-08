package io.github.alph_a07.basis.theme.color

/**
 * OKLCH gradient built from sorted stops.
 *
 * @property stops At least two stops with offsets in `[0, 1]` sorted ascending.
 * @property direction Gradient direction.
 */
public data class OklchGradient(
    public val stops: List<OklchStop>,
    public val direction: GradientDirection,
) {
    init {
        require(stops.size >= 2) { "OklchGradient requires at least 2 stops." }
        require(stops.zipWithNext().all { (a, b) -> a.offset <= b.offset }) {
            "OklchGradient stops must be sorted ascending by offset."
        }
        require(stops.all { it.offset in 0f..1f }) { "OklchGradient offsets must be in 0..1." }
    }
}

/**
 * Single stop of an [OklchGradient].
 *
 * @property color Color at this stop.
 * @property offset Position in `[0, 1]`.
 */
public data class OklchStop(
    public val color: Oklch,
    public val offset: Float,
)

/**
 * Direction of an [OklchGradient].
 */
public enum class GradientDirection {
    /** Angular direction in degrees; reserved for angled brand gradients. */
    AngleDeg,

    /** Top-to-bottom gradient. */
    Vertical,

    /** Start-to-end gradient. */
    Horizontal,
}
