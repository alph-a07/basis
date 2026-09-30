package io.github.alph_a07.basis.tokens.theme

import io.github.alph_a07.basis.tokens.color.BasisColor
import io.github.alph_a07.basis.tokens.color.BasisColorScheme
import io.github.alph_a07.basis.tokens.color.BorderColors
import io.github.alph_a07.basis.tokens.color.ContentColors
import io.github.alph_a07.basis.tokens.color.IconColors
import io.github.alph_a07.basis.tokens.color.InteractiveColors
import io.github.alph_a07.basis.tokens.color.Oklch
import io.github.alph_a07.basis.tokens.color.SelectedColors
import io.github.alph_a07.basis.tokens.color.SkeletonColors
import io.github.alph_a07.basis.tokens.color.StatusColorSet
import io.github.alph_a07.basis.tokens.color.StatusColors
import io.github.alph_a07.basis.tokens.color.SurfaceColors
import io.github.alph_a07.basis.tokens.color.WCAG_AA_LARGE_TEXT
import io.github.alph_a07.basis.tokens.color.WCAG_AA_NORMAL_TEXT
import io.github.alph_a07.basis.tokens.color.contentOn
import io.github.alph_a07.basis.tokens.color.contrastRatio
import io.github.alph_a07.basis.tokens.color.toBasisColor
import io.github.alph_a07.basis.tokens.color.toOklch
import kotlin.math.max

/**
 * Validates that the color scheme meets minimum contrast requirements for accessibility.
 * @return A list of readable failure messages for any contrast checks that fail.
 */
fun BasisColorScheme.validateContrast(): List<String> {
    val failures = mutableListOf<String>()

    fun check(name: String, fg: BasisColor, bg: BasisColor, minRatio: Float) {
        val ratio = contrastRatio(fg, bg)
        if (ratio < minRatio) {
            failures += "$name is ${"%.2f".format(ratio)}:1, needs $minRatio:1"
        }
    }

    check("content on interactive", content.contentOnInteractive, interactive.interactive, WCAG_AA_NORMAL_TEXT)
    check("content on selected", content.contentOnSelected, selected.selectedMuted, WCAG_AA_NORMAL_TEXT)
    check("content on surface", content.content, surface.surface, WCAG_AA_NORMAL_TEXT)
    check("contentMuted on surface", content.contentMuted, surface.surface, WCAG_AA_LARGE_TEXT)
    check("border on surface", border.border, surface.surface, WCAG_AA_LARGE_TEXT)

    return failures
}

/** Deliberately chosen hues for status colors, to ensure consistent meaning across apps. */
private const val POSITIVE_HUE = 145f
private const val NEGATIVE_HUE = 25f
private const val CAUTION_HUE = 85f
private const val INFO_HUE = 235f

/**
 * Derives a pair of light and dark color schemes from the given seed hues and vibe.
 * @param seedHues A non-empty list of seed hues to base the color scheme derivation on.
 * @param vibe The vibe of the color scheme, which determines how the seed hues are used.
 * @param tuning Optional tuning parameters for the color scheme derivation.
 * @return A pair of [BasisColorScheme]s, where the first is the light scheme and the second is the dark scheme.
 */
fun deriveColorSchemes(
    seedHues: List<BasisColor>,
    vibe: BasisVibe,
    tuning: BasisSchemeDerivationTuning = BasisSchemeDerivationTuning(),
): Pair<BasisColorScheme, BasisColorScheme> {
    require(seedHues.isNotEmpty()) { "deriveColorSchemes requires at least one seed hue." }

    val primary = seedHues.first().toOklch()
    val tint = tuning.vibeTintStrength[vibe]

    fun neutral(lightness: Float): Oklch = Oklch(lightness, tint, primary.h)

    fun scheme(isDark: Boolean): BasisColorScheme {
        val ramp = if (isDark) tuning.darkNeutrals else tuning.lightNeutrals
        val overlay = tuning.overlay

        val surface = SurfaceColors(
            surface = neutral(ramp.surface).toBasisColor(),
            surfaceElevated = neutral(ramp.surfaceElevated).toBasisColor(),
            surfaceRecessed = neutral(ramp.surfaceRecessed).toBasisColor(),
            surfaceInverse = neutral(ramp.surfaceInverse).toBasisColor(),
            surfaceDisabled = neutral(ramp.surfaceDisabled).toBasisColor(),
            overlayBackdrop = Oklch(overlay.backdropLightness, 0f, 0f).toBasisColor(alpha = overlay.backdropAlpha),
            overlayHover = Oklch(if (isDark) overlay.hoverLightnessDark else overlay.hoverLightnessLight, 0f, 0f)
                .toBasisColor(alpha = overlay.hoverAlpha),
            backdropGradientStart = Oklch(overlay.gradientStartLightness, 0f, 0f)
                .toBasisColor(alpha = overlay.gradientStartAlpha),
            backdropGradientEnd = Oklch(overlay.gradientEndLightness, 0f, 0f)
                .toBasisColor(alpha = overlay.gradientEndAlpha),
        )

        val interactiveTuning = tuning.interactive
        val interactiveBase = primary
            .withLightness(if (isDark) interactiveTuning.lightnessDark else interactiveTuning.lightnessLight)
            .withChroma(max(primary.c, interactiveTuning.minChroma))
        val interactive = InteractiveColors(
            interactive = interactiveBase.toBasisColor(),
            interactiveHover = interactiveBase
                .withLightness(
                    interactiveBase.l +
                        if (isDark) interactiveTuning.hoverDeltaDark else interactiveTuning.hoverDeltaLight,
                )
                .toBasisColor(),
            interactivePressed = interactiveBase
                .withLightness(
                    interactiveBase.l +
                        if (isDark) interactiveTuning.pressedDeltaDark else interactiveTuning.pressedDeltaLight,
                )
                .toBasisColor(),
            interactiveDisabled = neutral(ramp.interactiveDisabled).toBasisColor(),
            interactiveMuted = interactiveBase
                .withLightness(
                    if (isDark) interactiveTuning.mutedLightnessDark else interactiveTuning.mutedLightnessLight,
                )
                .withChroma(interactiveBase.c * interactiveTuning.mutedChromaScale).toBasisColor(),
        )

        val selected = SelectedColors(
            selected = interactiveBase.toBasisColor(),
            selectedMuted = interactiveBase
                .withLightness(
                    if (isDark) {
                        interactiveTuning.selectedMutedLightnessDark
                    } else {
                        interactiveTuning.selectedMutedLightnessLight
                    },
                )
                .withChroma(interactiveBase.c * interactiveTuning.selectedMutedChromaScale).toBasisColor(),
            selectedBorder = interactiveBase
                .withLightness(
                    if (isDark) {
                        interactiveTuning.selectedBorderLightnessDark
                    } else {
                        interactiveTuning.selectedBorderLightnessLight
                    },
                )
                .toBasisColor(),
        )

        val content = ContentColors(
            content = neutral(ramp.content).toBasisColor(),
            contentMuted = neutral(ramp.contentMuted).toBasisColor(),
            contentSubtle = neutral(ramp.contentSubtle).toBasisColor(),
            contentDisabled = neutral(ramp.contentDisabled).toBasisColor(),
            contentInverse = neutral(ramp.contentInverse).toBasisColor(),
            contentOnInteractive = interactive.interactive.contentOn(),
            contentOnSelected = selected.selectedMuted.contentOn(),
        )

        val icon = IconColors.aliasing(content)

        val border = BorderColors(
            border = neutral(ramp.border).toBasisColor(),
            borderMuted = neutral(ramp.borderMuted).toBasisColor(),
            borderStrong = neutral(ramp.borderStrong).toBasisColor(),
            borderDisabled = neutral(ramp.borderDisabled).toBasisColor(),
        )

        val focusRing = primary.withLightness(interactiveTuning.focusLightness)
            .withChroma(max(primary.c, interactiveTuning.focusMinChroma)).toBasisColor()

        val statusTone = if (isDark) tuning.statusDark else tuning.statusLight
        fun status(hue: Float): StatusColorSet = StatusColorSet(
            icon = Oklch(statusTone.iconLightness, statusTone.iconChroma, hue).toBasisColor(),
            text = Oklch(statusTone.textLightness, statusTone.textChroma, hue).toBasisColor(),
            surface = Oklch(statusTone.surfaceLightness, statusTone.surfaceChroma, hue).toBasisColor(),
            border = Oklch(statusTone.borderLightness, statusTone.borderChroma, hue).toBasisColor(),
        )
        val status = StatusColors(
            positive = status(hue = POSITIVE_HUE),
            negative = status(hue = NEGATIVE_HUE),
            caution = status(hue = CAUTION_HUE),
            info = status(hue = INFO_HUE),
        )

        val skeleton = SkeletonColors(
            skeleton = surface.surfaceRecessed,
            skeletonHighlight = neutral(ramp.skeletonHighlight).toBasisColor(),
        )

        return BasisColorScheme(
            surface = surface,
            content = content,
            icon = icon,
            border = border,
            interactive = interactive,
            selected = selected,
            focusRing = focusRing,
            status = status,
            skeleton = skeleton,
        )
    }

    return scheme(isDark = false) to scheme(isDark = true)
}
