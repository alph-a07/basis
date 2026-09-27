package io.github.alph_a07.basis.tokens.color

/** Closed enum for available gradient directions. */
enum class GradientDirection { Horizontal, Vertical, Diagonal, Radial }

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
 * Generates a two-point linear gradient.
 * @param from The starting color of the gradient.
 * @param to The ending color of the gradient.
 * @param direction The direction of the gradient.
 * @return A [BasisGradient] representing the generated gradient.
 */
fun gradient(from: BasisColor, to: BasisColor, direction: GradientDirection): BasisGradient =
    BasisGradient(stops = listOf(0f to from, 1f to to), direction = direction)

/**
 * Generates a multi-point gradient.
 * @param stops A list of pairs, where each pair consists of a position (0f to 1f) and a [BasisColor].
 * @param direction The direction of the gradient.
 * @return A [BasisGradient] representing the generated gradient.
 */
fun gradient(stops: List<Pair<Float, BasisColor>>, direction: GradientDirection): BasisGradient =
    BasisGradient(stops = stops, direction = direction)