package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.contrastRatio
import io.github.alph_a07.basis.theme.core.color.gamutMapped
import io.github.alph_a07.basis.theme.core.color.safeOklch

/**
 * Lifts a foreground color until it meets [minRatio] against [background].
 *
 * Lightness moves first so the hue survives; chroma relaxes only when lightness alone is not
 * enough, and the background shifts last and only when [backgroundLocked] is false. Hue is never
 * changed, so a brand primary keeps its identity through repair.
 *
 * @param foreground Foreground color to repair.
 * @param background Background the foreground is read on.
 * @param minRatio Smallest allowed contrast ratio.
 * @param isDark Whether the dark mode lifts lightness upward.
 * @param backgroundLocked Whether Control already decided the background, forbidding a background shift.
 * @return The repaired pair, unchanged when it already meets the ratio.
 */
internal fun repairContrast(
    foreground: Oklch,
    background: Oklch,
    minRatio: Float,
    isDark: Boolean,
    backgroundLocked: Boolean,
): ContrastRepairResult {
    if (meetsContrast(foreground, background, minRatio)) {
        return ContrastRepairResult(foreground, background)
    }

    val direction = if (isDark) 1f else -1f
    val lifted = liftLightness(foreground, background, minRatio, direction)
    val result =
        when {
            meetsContrast(lifted, background, minRatio) ->
                ContrastRepairResult(lifted.gamutMapped(), background)
            else -> {
                val relaxed = lifted.copy(c = lifted.c * CHROMA_RELAX)
                when {
                    meetsContrast(relaxed, background, minRatio) || backgroundLocked ->
                        ContrastRepairResult(relaxed.gamutMapped(), background)
                    else -> {
                        val shifted =
                            safeOklch(
                                l = background.l - direction * BACKGROUND_MAX_SHIFT,
                                c = background.c,
                                h = background.h,
                                a = background.a,
                            )
                        ContrastRepairResult(relaxed.gamutMapped(), shifted.gamutMapped())
                    }
                }
            }
        }
    return result
}

/**
 * Whether a pair already meets its floor, so callers can report only actual repairs.
 *
 * @param foreground Foreground color.
 * @param background Background color.
 * @param minRatio Smallest allowed contrast ratio.
 * @return True when the pair meets or exceeds [minRatio].
 */
internal fun meetsContrast(foreground: Oklch, background: Oklch, minRatio: Float): Boolean =
    contrastRatio(foreground, background) >= minRatio

/**
 * Result of repairing one contrast pair.
 *
 * @property foreground Repaired foreground color.
 * @property background Possibly shifted background color; unchanged when Control locked it.
 */
internal data class ContrastRepairResult(
    val foreground: Oklch,
    val background: Oklch,
)

private fun liftLightness(
    foreground: Oklch,
    background: Oklch,
    minRatio: Float,
    direction: Float,
): Oklch {
    var candidate = foreground

    repeat(LIGHTNESS_STEPS) {
        if (meetsContrast(candidate, background, minRatio)) {
            return candidate
        }

        candidate =
            safeOklch(
                l = candidate.l + direction * LIGHTNESS_STEP,
                c = candidate.c,
                h = candidate.h,
                a = candidate.a,
            )
    }

    return candidate
}

/** Lightness step applied while lifting foreground contrast. */
private const val LIGHTNESS_STEP: Float = 0.01f

/** Step count applied while lifting foreground contrast. */
private const val LIGHTNESS_STEPS: Int = 60

/** Chroma retained after relaxing it once, as a multiplier. */
private const val CHROMA_RELAX: Float = 0.75f

/** Largest background lightness adjustment contrast repair may apply. */
private const val BACKGROUND_MAX_SHIFT: Float = 0.04f
