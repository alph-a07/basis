package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.SpValue
import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.resolution.ResolutionContext

/** Enforcement stage applying hard constraint floors to a mode. */
internal object EnforceStage {
    /**
     * Enforces contrast, touch targets, scalar clamps, motion, and readability floors on [mode].
     *
     * @param context Resolution context holding controlled working themes, constraints, and locked paths.
     * @param mode Target theme mode to enforce.
     */
    fun process(context: ResolutionContext, mode: ThemeMode) {
        val draft = requireNotNull(context.drafts[mode])
        val constraints = context.normalized.control?.constraints
        val minContrast = constraints?.minContrast?.minRatio ?: DEFAULT_MIN_CONTRAST
        val minTouch = constraints?.minTouchTarget?.minSize ?: DEFAULT_MIN_TOUCH_TARGET
        val minText = constraints?.typography?.minReadableSize ?: DEFAULT_MIN_TEXT_SIZE
        val isDark = mode == ThemeMode.Dark

        val color = enforceContrast(draft.color, minContrast, context.lockedPaths, isDark, context.entries)

        context.drafts[mode] =
            draft.copy(
                color = color,
                size = enforceControlSizes(draft.size, minTouch, context.entries),
                spacing = clampSpacing(draft.spacing, constraints?.spacing, context.entries),
                radius = clampRadius(draft.radius, constraints?.radius, context.entries),
                motion = enforceMotion(draft.motion, constraints?.motion, context.entries),
                typography = enforceTypographyConstraints(draft.typography, minText, isDark, context.entries),
            )
    }
}

/** Default minimum contrast ratio when Control specifies none. */
private const val DEFAULT_MIN_CONTRAST: Float = 4.5f

/** Default minimum interactive edge length in dp when Control specifies none. */
private val DEFAULT_MIN_TOUCH_TARGET: DpValue = DpValue(48f)

/** Default minimum rendered text size in sp when Control specifies none. */
private val DEFAULT_MIN_TEXT_SIZE: SpValue = SpValue(11f)
