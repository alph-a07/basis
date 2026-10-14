package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStageId
import io.github.alph_a07.basis.theme.tokens.color.ColorTokens
import io.github.alph_a07.basis.theme.tokens.color.replaceToken
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.resolveIn

/**
 * Repairs the owned contrast pairs of one mode's color tree.
 *
 * Only tokens Control did not lock may move, so a locked background is reported instead of
 * shifted. The brand primary keeps its hue because repair never touches it.
 *
 * @param color Derived color tree.
 * @param minRatio Smallest allowed contrast ratio.
 * @param lockedColorPaths Tokens Control replaced, which repair must not shift.
 * @param isDark Whether the dark mode lifts lightness upward.
 * @param entries Accumulator of report entries for actual repairs.
 * @return The repaired color tree.
 */
internal fun enforceContrast(
    color: ColorTokens,
    minRatio: Float,
    lockedColorPaths: Set<String>,
    isDark: Boolean,
    entries: MutableList<ReportEntry>,
): ColorTokens {
    var tree = color

    OWNED_CONTRAST_PAIRS.forEach { pair ->
        val surface = pair.surface.resolveIn(tree)
        val foreground = pair.foreground.resolveIn(tree)
        if (surface == null || foreground == null) {
            return@forEach
        }

        val floor = pair.customMinRatio ?: minRatio
        val surfaceLocked = pair.surfaceImmutable || pair.surface.path in lockedColorPaths

        if (!meetsContrast(foreground, surface, floor)) {
            val repair = repairContrast(foreground, surface, floor, isDark, surfaceLocked)
            tree = tree.replaceToken(pair.foreground, repair.foreground)

            pair.secondaryForeground?.let { secondary ->
                tree = tree.replaceToken(secondary, repair.foreground)
            }

            if (!surfaceLocked) {
                tree = tree.replaceToken(pair.surface, repair.background)
            }

            entries += repairEntry(pair.foreground.path, floor, surfaceLocked)
        }
    }

    return tree
}

/**
 * Lists the contrast pairs the pipeline owns for one mode's color tree.
 *
 * @return The owned pairs, in report order.
 */
internal fun ownedContrastPairs(): List<ContrastPair> =
    OWNED_CONTRAST_PAIRS.flatMap { pair ->
        listOfNotNull(
            ContrastPair(pair.foreground.path, pair.surface.path),
            pair.secondaryForeground?.let { ContrastPair(it.path, pair.surface.path) },
        )
    }

/**
 * Contrast pairs the pipeline owns, described by their token paths.
 *
 * @property foregroundPath Token path of the foreground token.
 * @property backgroundPath Token path of the background token.
 */
internal data class ContrastPair(
    val foregroundPath: String,
    val backgroundPath: String,
)

private fun repairEntry(
    path: String,
    minRatio: Float,
    locked: Boolean,
): ReportEntry = ReportEntry(
    path = path,
    stage = ResolutionStageId.Enforce,
    status = ReportStatus.OverriddenByConstraint,
    message =
        if (locked) {
            "Contrast floor $minRatio could not be met without moving a Control-locked background."
        } else {
            "Contrast floor $minRatio applied by lifting lightness."
        },
    enforced = minRatio.toString(),
)

/**
 * An owned contrast relationship between a foreground token and its backing surface.
 *
 * @property foreground Foreground token that must be readable against [surface].
 * @property surface Backing surface token.
 * @property secondaryForeground Optional companion foreground token that mirrors the foreground color.
 * @property customMinRatio Optional custom contrast floor; null uses the pipeline-configured minimum ratio.
 * @property surfaceImmutable True when the surface must never be shifted by repair.
 */
private data class OwnedContrastPair(
    val foreground: ColorTokenPath,
    val surface: ColorTokenPath,
    val secondaryForeground: ColorTokenPath? = null,
    val customMinRatio: Float? = null,
    val surfaceImmutable: Boolean = false,
)

/** Owned contrast relationships between content, status, and interactive tokens and their backing surfaces. */
private val OWNED_CONTRAST_PAIRS: List<OwnedContrastPair> =
    listOf(
        OwnedContrastPair(ColorTokenPath.ContentDefault, ColorTokenPath.SurfaceDefault),
        OwnedContrastPair(ColorTokenPath.ContentDefault, ColorTokenPath.SurfaceElevated),
        OwnedContrastPair(ColorTokenPath.ContentDefault, ColorTokenPath.SurfaceRecessed),
        OwnedContrastPair(ColorTokenPath.ContentInverse, ColorTokenPath.SurfaceInverse),
        OwnedContrastPair(ColorTokenPath.SelectionContent, ColorTokenPath.SelectionSurface),
        OwnedContrastPair(
            foreground = ColorTokenPath.PositiveContent,
            surface = ColorTokenPath.PositiveSurface,
            secondaryForeground = ColorTokenPath.PositiveIcon,
        ),
        OwnedContrastPair(
            foreground = ColorTokenPath.NegativeContent,
            surface = ColorTokenPath.NegativeSurface,
            secondaryForeground = ColorTokenPath.NegativeIcon,
        ),
        OwnedContrastPair(
            foreground = ColorTokenPath.CautionContent,
            surface = ColorTokenPath.CautionSurface,
            secondaryForeground = ColorTokenPath.CautionIcon,
        ),
        OwnedContrastPair(
            foreground = ColorTokenPath.InfoContent,
            surface = ColorTokenPath.InfoSurface,
            secondaryForeground = ColorTokenPath.InfoIcon,
        ),
        OwnedContrastPair(
            foreground = ColorTokenPath.FocusRing,
            surface = ColorTokenPath.SurfaceDefault,
            customMinRatio = FOCUS_MIN_CONTRAST,
            surfaceImmutable = true,
        ),
    )

/** Contrast ratio a focus ring must reach to stay detectable, below the body-text floor. */
private const val FOCUS_MIN_CONTRAST: Float = 3f
