package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import io.github.alph_a07.basis.theme.resolution.WorkingTheme
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry

/**
 * Applies hard constraint floors onto one mode's working tree.
 *
 * Contrast repair runs on the owned pairs, control sizes rise to the touch floor, scalar ladders
 * respect their clamps, text sizes respect the readable floor, and reduced motion collapses every
 * purpose to zero-duration linear motion. Tokens Control locked are reported rather than repaired.
 *
 * @param theme Working tree to enforce.
 * @param constraints Hard constraints as specified, or null for library defaults.
 * @param lockedColorPaths Tokens Control replaced, which contrast repair must not shift.
 * @return The enforced tree plus one report entry per adjustment.
 */
internal fun enforceConstraints(
    theme: WorkingTheme,
    constraints: ConstraintsControl?,
    lockedColorPaths: Set<String>,
): EnforcementResult {
    val minContrast = constraints?.minContrast?.minRatio ?: DEFAULT_MIN_CONTRAST
    val minTouch = constraints?.minTouchTarget?.minSize ?: DEFAULT_MIN_TOUCH_TARGET
    val minText = constraints?.typography?.minReadableSize ?: DEFAULT_MIN_TEXT_SIZE
    val isDark = theme.mode == ThemeMode.Dark
    val entries = mutableListOf<ReportEntry>()

    val color = enforceContrast(theme.color, minContrast, lockedColorPaths, isDark, entries)

    return EnforcementResult(
        theme =
            theme.copy(
                color = color,
                size = enforceControlSizes(theme.size, minTouch, entries),
                spacing = clampSpacing(theme.spacing, constraints?.spacing, entries),
                radius = clampRadius(theme.radius, constraints?.radius, entries),
                motion = enforceMotion(theme.motion, constraints?.motion, entries),
                typography = enforceTextSizes(theme.typography, minText, entries),
            ),
        entries = entries,
    )
}

/**
 * Result of enforcing one mode's working tree.
 *
 * @property theme The enforced tree.
 * @property entries One entry per adjustment, for the resolution report.
 */
internal data class EnforcementResult(
    val theme: WorkingTheme,
    val entries: List<ReportEntry>,
)

/** Default minimum contrast ratio when Control specifies none. */
internal const val DEFAULT_MIN_CONTRAST: Float = 4.5f

/** Default minimum interactive edge length in dp when Control specifies none. */
internal val DEFAULT_MIN_TOUCH_TARGET: DpValue = DpValue(48f)

/** Default minimum rendered text size in dp when Control specifies none. */
internal val DEFAULT_MIN_TEXT_SIZE: DpValue = DpValue(11f)
