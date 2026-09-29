package io.github.alph_a07.basis.tokens.sizing

/**
 * The minimum touch target, in dp, for every interactive element.
 *
 * This is a floor, not a fixed size: density scaling may raise the effective hit area but must never
 * lower it below this value.
 */
object BasisTouchTargetTokens {
    /** Minimum interactive hit area for every interactive atom. */
    const val MIN_TOUCH_TARGET = 48
}

/** The icon size scale, in dp. */
object BasisIconSizeTokens {
    /** Small icon size for dense rows, chips, and inline glyphs. */
    const val ICON_SIZE_SM = 16

    /** Default icon size for buttons, fields, and list rows. */
    const val ICON_SIZE_MD = 20

    /** Large icon size for app bars, navigation items, and standalone icon buttons. */
    const val ICON_SIZE_LG = 24

    /** Extra-large icon size for empty states and feature illustrations. */
    const val ICON_SIZE_XL = 32
}

/** The control height scale, in dp, for buttons, chips and similar controls. */
object BasisControlHeightTokens {
    /**
     * Compact interactive control height for chips and dense buttons.
     *
     * This is the visual height only; the hit area still follows [BasisTouchTargetTokens.MIN_TOUCH_TARGET].
     */
    const val CONTROL_HEIGHT_SM = 32

    /** Standard interactive control height for buttons and text fields. */
    const val CONTROL_HEIGHT_MD = 40

    /** Large interactive control height for primary actions and prominent inputs. */
    const val CONTROL_HEIGHT_LG = 48
}

/** The avatar size scale, in dp. */
object BasisAvatarSizeTokens {
    /** Extra-small avatar for dense lists and overlapping avatar groups. */
    const val AVATAR_SIZE_XS = 24

    /** Small avatar for compact list rows and message bubbles. */
    const val AVATAR_SIZE_SM = 32

    /** Default avatar size for standard list items. */
    const val AVATAR_SIZE_MD = 40

    /** Large avatar size for profile summaries and headers. */
    const val AVATAR_SIZE_LG = 56

    /** Extra-large avatar size for profile screens. */
    const val AVATAR_SIZE_XL = 72
}

/** The status dot size scale, in dp. */
object BasisDotSizeTokens {
    /** Small dot diameter for badges and typing indicators. */
    const val DOT_SIZE_SM = 6

    /** Default dot diameter for presence and status markers. */
    const val DOT_SIZE_MD = 8

    /** Large dot diameter for pager and step indicators. */
    const val DOT_SIZE_LG = 10
}
