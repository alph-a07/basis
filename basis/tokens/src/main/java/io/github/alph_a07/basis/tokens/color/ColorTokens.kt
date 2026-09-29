package io.github.alph_a07.basis.tokens.color

/** A set of colors for the surface of the UI. */
data class SurfaceColors(
    /** Default background color for baseline application screens and primary containers. */
    val surface: BasisColor,
    /** Raised container background color for cards, bottom sheets, and dialog surfaces. */
    val surfaceElevated: BasisColor,
    /** Recessed background color for search inputs, well containers, and sunken tracks. */
    val surfaceRecessed: BasisColor,
    /** Contrasting dark or inverted surface color for snackbars, banners, and floating tooltips. */
    val surfaceInverse: BasisColor,
    /** Container background color applied to disabled or inactive interactive components. */
    val surfaceDisabled: BasisColor,
    /** Semi-transparent backdrop color used to dim background content beneath modal windows. */
    val overlayBackdrop: BasisColor,
    /** Semi-transparent hover state tint layered over container surfaces on cursor hover. */
    val overlayHover: BasisColor,
    /** Starting color and opacity for progressive backdrop gradients on hero media surfaces. */
    val backdropGradientStart: BasisColor,
    /** Ending color and opacity for progressive backdrop gradients to maintain text contrast. */
    val backdropGradientEnd: BasisColor,
)

/** A set of colors for content (text, etc.) in the UI. */
data class ContentColors(
    /** Primary typography and iconography color for maximum hierarchy and legibility. */
    val content: BasisColor,
    /** Secondary text color for supporting descriptions, subtitles, and secondary labels. */
    val contentMuted: BasisColor,
    /** Tertiary text color for placeholders, metadata captions, and disabled hints. */
    val contentSubtle: BasisColor,
    /** Low-contrast text color applied to inactive, non-interactive typography. */
    val contentDisabled: BasisColor,
    /** High-contrast text color designed for display on dark or inverted surface containers. */
    val contentInverse: BasisColor,
    /** Text and icon color providing high-contrast readability over primary action fills. */
    val contentOnInteractive: BasisColor,
    /** Text and icon color displayed on top of selected container backgrounds. */
    val contentOnSelected: BasisColor,
)

/** A set of colors for icons in the UI. */
data class IconColors(
    /** Primary color for standalone, navigation, and functional icons. */
    val icon: BasisColor,
    /** Secondary icon color for supporting actions and non-critical glyphs. */
    val iconMuted: BasisColor,
    /** Low-emphasis icon color for tertiary visual cues and decorative icons. */
    val iconSubtle: BasisColor,
    /** Muted icon color indicating disabled or inactive functionality. */
    val iconDisabled: BasisColor,
    /** High-contrast icon color for use against inverted or dark surface backgrounds. */
    val iconInverse: BasisColor,
    /** Icon color ensuring optimal contrast when placed atop primary interactive buttons. */
    val iconOnInteractive: BasisColor,
    /** Icon color providing visual clarity when placed within selected container states. */
    val iconOnSelected: BasisColor,
) {
    companion object {
        /** Creates an [IconColors] instance by aliasing the corresponding colors from a [ContentColors] instance. */
        fun aliasing(content: ContentColors) = IconColors(
            icon = content.content,
            iconMuted = content.contentMuted,
            iconSubtle = content.contentSubtle,
            iconDisabled = content.contentDisabled,
            iconInverse = content.contentInverse,
            iconOnInteractive = content.contentOnInteractive,
            iconOnSelected = content.contentOnSelected,
        )
    }
}

/** A set of colors for borders in the UI. */
data class BorderColors(
    /** Default stroke color for structural dividers, container outlines, and boundaries. */
    val border: BasisColor,
    /** Subtle border color for hairline dividers and secondary component outlines. */
    val borderMuted: BasisColor,
    /** High-contrast border color for input borders, focused containers, and prominent frames. */
    val borderStrong: BasisColor,
    /** Muted boundary stroke color indicating disabled component perimeters. */
    val borderDisabled: BasisColor,
)

/** A set of colors for interactive elements in the UI. */
data class InteractiveColors(
    /** Primary brand action color for key call-to-action buttons and interactive controls. */
    val interactive: BasisColor,
    /** State tint applied to primary action surfaces on pointer hover. */
    val interactiveHover: BasisColor,
    /** State tint applied to primary action surfaces on click or press. */
    val interactivePressed: BasisColor,
    /** Inactive background fill color for disabled buttons and controls. */
    val interactiveDisabled: BasisColor,
    /** Tonal, low-emphasis background fill for secondary and tertiary action buttons. */
    val interactiveMuted: BasisColor,
)

/** A set of colors for selected elements in the UI. */
data class SelectedColors(
    /** Fill color highlighting active selection across tabs, filter chips, and segmented controls. */
    val selected: BasisColor,
    /** Soft tonal background fill for secondary selected items and resting active pills. */
    val selectedMuted: BasisColor,
    /** Border stroke accentuating active selection on cards, chips, and input controls. */
    val selectedBorder: BasisColor,
)

/** A set of colors for status indicators in the UI. */
data class StatusColorSet(
    /** Icon color for the status. */
    val icon: BasisColor,
    /** Text color for the status. */
    val text: BasisColor,
    /** Tinted background surface fill for the status. */
    val surface: BasisColor,
    /** Border stroke framing the status. */
    val border: BasisColor,
)

/** A set of colors for different status types in the UI. */
data class StatusColors(
    /** Colors indicating successful operations, completion, and positive feedback. */
    val positive: StatusColorSet,
    /** Colors signaling destructive actions, errors, and system failure warnings. */
    val negative: StatusColorSet,
    /** Colors representing warnings, non-blocking cautions, and attention alerts. */
    val caution: StatusColorSet,
    /** Colors indicating general information, neutral tips, and help guidance. */
    val info: StatusColorSet,
)

/** A set of colors for skeleton loading states in the UI. */
data class SkeletonColors(
    /**
     * Base placeholder background color for loading skeletons before content resolves.
     *
     * The derived scheme sets this to [SurfaceColors.surfaceRecessed], so a skeleton reads as a
     * genuine container rather than as a hole in the layout.
     */
    val skeleton: BasisColor,
    /** Animated shimmer highlight band sweeping across loading skeleton shapes. */
    val skeletonHighlight: BasisColor,
)

/**
 * The complete color scheme for a Basis theme.
 * This includes all the color tokens used in the design system.
 */
data class BasisColorScheme(
    /** A set of colors for the surface of the UI. */
    val surface: SurfaceColors,
    /** A set of colors for the content (text, etc.) of the UI. */
    val content: ContentColors,
    /** A set of colors for the icons in the UI. */
    val icon: IconColors,
    /** A set of colors for the borders in the UI. */
    val border: BorderColors,
    /** A set of colors for the interactive elements in the UI. */
    val interactive: InteractiveColors,
    /** A set of colors for the selected elements in the UI. */
    val selected: SelectedColors,
    /** High-visibility accessibility outline indicating active keyboard or assistive focus. */
    val focusRing: BasisColor,
    /** A set of colors for different status types in the UI. */
    val status: StatusColors,
    /** A set of colors for skeleton loading states in the UI. */
    val skeleton: SkeletonColors,
)
