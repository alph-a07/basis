package io.github.alph_a07.basis.tokens.motion

/**
 * One semantic motion contract.
 *
 * These name what a piece of animation is for, not how it is achieved. Duration, easing, spring
 * behaviour and the choice of which properties to animate are all resolution details, so they are
 * absent from this vocabulary by design: a component asks for the motion that acknowledges a
 * press, and the resolved theme decides what that looks like.
 *
 * @property description What this motion communicates, in terms a component author can act on.
 */
enum class BasisMotionToken(
    val description: String,
) {
    /**
     * How an existing component acknowledges a direct interaction.
     *
     * The response to a press, hover or other direct input on a component that is already present.
     */
    Feedback("How an existing component acknowledges direct interaction."),

    /**
     * How an existing component moves between semantic states.
     *
     * For transitions such as unchecked to checked, off to on, or unselected to selected.
     */
    StateTransition("How an existing component moves between semantic states."),

    /**
     * How a single component changes its visual form.
     *
     * For a change of shape, color, size or icon. A state change may cause a transformation, but
     * the two are not the same concept: a state transition may animate several properties, while a
     * transformation is about the component's own appearance.
     */
    Transformation("How a single component changes its visual form."),

    /**
     * How an existing component changes its spatial extent.
     *
     * For accordions, expandable content, changing container extent and bottom-sheet expansion.
     */
    Expansion("How an existing component changes its spatial extent."),

    /**
     * How a visual object changes location while remaining the same object.
     *
     * For list reordering, layout rearrangement, a navigation indicator moving, or elements
     * shifting after an insertion or removal.
     */
    Reposition("How an existing visual object changes spatial location."),

    /**
     * How motion temporarily raises perceptual attention.
     *
     * For drawing attention to a changed value, validation emphasis, newly inserted content, or an
     * attention pulse.
     */
    Emphasis("How motion temporarily increases perceptual attention."),
}

/**
 * The animatable property one track of a resolved motion drives.
 *
 * The list is deliberately small. It names the kinds of visual property a Basis motion animates,
 * not every animatable type a platform offers, so that a resolved theme stays portable and a new
 * property is added only when a motion contract genuinely needs it.
 */
enum class BasisMotionProperty {
    /** A color transition. */
    Color,

    /** A shape or corner-geometry transition. */
    Shape,

    /** A size transition. */
    Size,

    /** A position transition, including translation along either axis. */
    Position,

    /** An alpha transition. */
    Opacity,
}
