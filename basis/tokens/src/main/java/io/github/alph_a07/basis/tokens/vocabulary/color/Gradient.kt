package io.github.alph_a07.basis.tokens.vocabulary.color

/** Enumeration defining the allowed gradient directions. */
enum class GradientDirection {
    /** Left to right. */
    Horizontal,

    /** Top to bottom. */
    Vertical,

    /** Corner to opposite corner. */
    Diagonal,

    /** Outward from the center. Not a linear interpolation — see [gradient]. */
    Radial,
}

/**
 * A gradient definition.
 * @property stops The color stops of the gradient.
 * @property direction The direction of the gradient.
 */
data class BasisGradient(
    val stops: List<Pair<Float, BasisColor>>,
    val direction: GradientDirection,
)

/**
 * Renders a two-point gradient along [direction].
 *
 * @param from The color at the start of the gradient.
 * @param to The color at the end of the gradient.
 * @param direction The direction along which the gradient runs.
 * @return A [BasisGradient] pinned to positions `0f` and `1f`.
 */
fun gradient(from: BasisColor, to: BasisColor, direction: GradientDirection): BasisGradient =
    BasisGradient(stops = listOf(0f to from, 1f to to), direction = direction)

/**
 * Generates a multi-stop color gradient along [direction].
 *
 * @param stops The color stops, each a position between `0f` and `1f` paired with its [BasisColor].
 * @param direction The direction along which the gradient runs.
 * @return A [BasisGradient] carrying the supplied stops verbatim.
 */
fun gradient(stops: List<Pair<Float, BasisColor>>, direction: GradientDirection): BasisGradient =
    BasisGradient(stops = stops, direction = direction)
