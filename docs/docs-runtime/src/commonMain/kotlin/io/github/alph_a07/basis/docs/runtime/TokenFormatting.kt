@file:OptIn(ExperimentalJsExport::class)

package io.github.alph_a07.basis.docs.runtime

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.SpValue
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.format.formatDeterministic
import io.github.alph_a07.basis.theme.core.motion.EasingKind
import io.github.alph_a07.basis.theme.core.motion.MotionSpec
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

/**
 * Converts a dotted token path to a CSS custom property name.
 *
 * @param path Dotted token path, e.g. `"color.surface.default"`.
 * @param prefix Custom property prefix, e.g. `"b"` for `--b-*`.
 * @return Formatted CSS custom property name.
 */
@JsExport
public fun tokenPathToCssVar(path: String, prefix: String = ""): String {
    val cleanPrefix = prefix.trim().removePrefix("--").removeSuffix("-")
    val cleanPath = path.trim().replace('.', '-')

    return if (cleanPrefix.isEmpty()) "--$cleanPath" else "--$cleanPrefix-$cleanPath"
}

/**
 * Formats an [Oklch] color as a CSS `oklch()` function call.
 *
 * @param color Color to format.
 * @return CSS `oklch()` string.
 */
public fun formatColor(color: Oklch): String {
    val l = formatDeterministic(color.l)
    val c = formatDeterministic(color.c)
    val h = formatDeterministic(color.h)

    return if (color.a < 1f) {
        val a = formatDeterministic(color.a)

        "oklch($l $c $h / $a)"
    } else {
        "oklch($l $c $h)"
    }
}

/**
 * Formats a [DpValue] as a CSS pixel magnitude.
 *
 * @param dp Value to format.
 * @return CSS pixel string, e.g. `"16px"`.
 */
public fun formatDp(dp: DpValue): String = "${formatDeterministic(dp.value)}px"

/**
 * Formats an [SpValue] as a CSS pixel magnitude.
 *
 * @param sp Value to format.
 * @return CSS pixel string, e.g. `"14px"`.
 */
public fun formatSp(sp: SpValue): String = "${formatDeterministic(sp.value)}px"

/**
 * Formats a [DepthSpec] as a CSS `box-shadow` value.
 *
 * @param spec Depth specification to format.
 * @return CSS `box-shadow` string.
 */
public fun formatDepth(spec: DepthSpec): String {
    val y = "${formatDeterministic(spec.shadowYOffset.value)}px"
    val blur = "${formatDeterministic(spec.shadowBlur.value)}px"
    val alpha = formatDeterministic(spec.shadowAlpha)

    return "0 $y $blur rgb(0 0 0 / $alpha)"
}

/**
 * Formats a [MotionSpec] as a CSS transition shorthand value.
 *
 * @param spec Motion specification to format.
 * @return CSS timing string combining duration and easing curve.
 */
public fun formatMotion(spec: MotionSpec): String =
    "${spec.duration.milliseconds}ms ${formatEasing(spec.easing)}"

/**
 * Maps an [EasingKind] to a CSS timing function.
 *
 * @param easing Easing archetype.
 * @return CSS cubic-bezier or keyword easing representation.
 */
public fun formatEasing(easing: EasingKind): String = when (easing) {
    EasingKind.Linear -> "linear"
    EasingKind.Standard -> "cubic-bezier(0.2, 0, 0, 1)"
    EasingKind.Emphasized -> "cubic-bezier(0.2, 0, 0, 1.25)"
    EasingKind.Decelerate -> "cubic-bezier(0, 0, 0.2, 1)"
    EasingKind.Accelerate -> "cubic-bezier(0.3, 0, 1, 1)"
    EasingKind.Spring -> "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
}

/**
 * Formats a [FontFamilyRef] into a CSS font-family list.
 *
 * @param family Family reference.
 * @return Quoted font family name followed by system sans-serif fallback.
 */
public fun formatFontFamily(family: FontFamilyRef): String = when (family) {
    is FontFamilyRef.Catalog -> "\"${family.id.value}\", sans-serif"
    is FontFamilyRef.Custom -> "\"${family.key.value}\", sans-serif"
}

/**
 * Formats a [TypeRole] composite as a CSS font shorthand value.
 *
 * @param role Role composite.
 * @return CSS `font` shorthand value.
 */
public fun formatTypeRole(role: TypeRole): String =
    "${role.weight.weight} ${formatSp(role.size)}/${formatDeterministic(role.lineHeight.multiplier)} " +
        formatFontFamily(role.family)
