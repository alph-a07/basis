package io.github.alph_a07.basis.tokens.size

/** One level of the icon size scale, in density-independent pixels. */
enum class SizeIcon {
    /** Dense rows, chips and inline glyphs. */
    Level1,

    /** Buttons, fields and list rows. */
    Level2,

    /** App bars, navigation items and standalone icon buttons. */
    Level3,

    /** Empty states and feature illustrations. */
    Level4,
}

/** One level of the avatar size scale, in density-independent pixels. */
enum class SizeAvatar {
    /** Dense lists and overlapping avatar groups. */
    Level1,

    /** Compact list rows and message bubbles. */
    Level2,

    /** Standard list items. */
    Level3,

    /** Profile summaries and headers. */
    Level4,

    /** Profile screens. */
    Level5,
}

/** One level of the dot size scale, in density-independent pixels. */
enum class SizeDot {
    /** Badges and typing indicators. */
    Level1,

    /** Presence and status markers. */
    Level2,

    /** Pager and step indicators. */
    Level3,
}

/** One level of the control size scale. */
enum class SizeControl {
    /** Compact controls, for chips and dense buttons. */
    Level1,

    /** The standard control size, for buttons and text fields. */
    Level2,

    /** Prominent controls, for primary actions and featured inputs. */
    Level3,
}

/**
 * The resolved dimensions of one control size level.
 *
 * A consumer selecting a control size is choosing a coherent dimensional relationship, not a
 * single outer height: the interior padding and the icon size are part of the same decision as the
 * height, because they are what keep the control's contents correctly placed at that height. These
 * constituents therefore change together, which is what justifies modelling them as one token
 * rather than as separate spacing and icon tokens.
 *
 * This type is the shape of that composite, not a filled-in value. The magnitudes are produced by
 * Theme Resolution; which numbers they take for a given theme is a resolved decision rather than a
 * property of the token.
 *
 * All magnitudes are in density-independent pixels. [minHeight] is the control's visual height and
 * says nothing about the interactive hit area, which is governed by accessibility requirements
 * rather than by this token.
 *
 * @property minHeight The control's minimum visual height.
 * @property horizontalPadding The interior padding on the leading and trailing edges.
 * @property verticalPadding The interior padding on the top and bottom edges.
 * @property iconSize The icon size the control renders a leading or trailing icon at.
 */
data class BasisControlSize(
    val minHeight: Int,
    val horizontalPadding: Int,
    val verticalPadding: Int,
    val iconSize: Int,
)

/*
 * The scalar families deliberately stop at the identity. The magnitude each level resolves to
 * belongs to Theme Resolution: a level names a reusable dimension, and which dimension that is for
 * a given theme is a resolved decision rather than a property of the token.
 *
 * Status meaning around a dot — positive, negative, caution — belongs to the Color family; only
 * the physical magnitude would live here.
 */
