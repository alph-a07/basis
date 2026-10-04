package io.github.alph_a07.basis.tokens.depth

/**
 * One level of the depth scale.
 *
 * Depth is a perceptual layering relationship: how far a surface reads as sitting above another,
 * independent of how that separation is drawn. A level therefore names a magnitude of separation
 * and not a rendering mechanism, so the same level may be drawn with elevation in one theme and
 * with a tonal shift in another.
 */
enum class BasisDepth {
    /** The shallowest layering, for a surface resting just above its parent. */
    Level1,

    /** The second layering magnitude, for resting cards and raised rows. */
    Level2,

    /** The third layering magnitude, for interactive cards and floating action buttons. */
    Level3,

    /** The fourth layering magnitude, for sticky bars and floating search surfaces. */
    Level4,

    /** The fifth layering magnitude, for menus, popovers and tooltips. */
    Level5,

    /** The deepest layering, for modal dialogs and bottom sheets. */
    Level6,
}

/** The number of levels in the depth scale. */
const val DEPTH_LEVEL_COUNT = 6

/**
 * The mechanism through which a depth level is rendered.
 *
 * Depth decides how far a surface reads as separated; the renderer decides how to achieve that.
 * Which mechanism applies is a property of the resolved theme, the component and the environment,
 * so a consumer chooses the depth level and never the mechanism.
 */
enum class BasisDepthExpression {
    /** Separation drawn by raising the surface with an elevation offset. */
    Elevation,

    /** Separation drawn by casting a shadow around the surface. */
    Shadow,

    /** Separation drawn by insetting the surface within its container. */
    Inset,

    /** Separation drawn by shifting the surface's tone relative to what surrounds it. */
    Tonal,

    /** Separation drawn by coordinating more than one of the other mechanisms. */
    Combined,
}

/**
 * The resolved value of one depth token.
 *
 * This is the composite that a depth level resolves to: the magnitude the level names, paired with
 * the mechanism chosen to express it. Keeping both in one value is what allows the level to stay
 * implementation-neutral — a component adapter reads [expression] and renders accordingly, rather
 * than assuming a level implies a particular effect.
 *
 * @property level The perceptual magnitude this value expresses.
 * @property expression The mechanism used to render it.
 */
data class BasisDepthValue(
    val level: BasisDepth,
    val expression: BasisDepthExpression,
)
