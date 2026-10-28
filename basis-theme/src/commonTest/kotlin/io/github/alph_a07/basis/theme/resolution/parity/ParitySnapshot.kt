package io.github.alph_a07.basis.theme.resolution.parity

import io.github.alph_a07.basis.theme.core.format.formatDeterministic
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.core.ResolvedThemePair
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.core.resolveIn
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

@Suppress("CyclomaticComplexMethod")
internal fun captureThemeSnapshot(pair: ResolvedThemePair): String {
    val sb = StringBuilder()

    fun captureTheme(name: String, theme: ResolvedTheme?) {
        sb.appendLine("[$name]")
        if (theme == null) {
            sb.appendLine("null")
            return
        }
        sb.appendLine("mode=${theme.mode.name}")

        sb.appendLine("[colors]")
        for (path in ColorTokenPath.entries.sortedBy { it.name }) {
            val color = path.resolveIn(theme.color)
            if (color != null) {
                sb.appendLine(
                    "${path.path}=l:${formatDeterministic(color.l)}," +
                        "c:${formatDeterministic(color.c)}," +
                        "h:${formatDeterministic(color.h)}," +
                        "a:${formatDeterministic(color.a)}",
                )
            }
        }

        sb.appendLine("[spacing]")
        for (path in SpacingTokenPath.entries.sortedBy { it.name }) {
            sb.appendLine("${path.path}=${formatDeterministic(path.resolveIn(theme.spacing).value)}")
        }

        sb.appendLine("[radius]")
        for (path in RadiusTokenPath.entries.sortedBy { it.name }) {
            sb.appendLine("${path.path}=${formatDeterministic(path.resolveIn(theme.radius).value)}")
        }

        sb.appendLine("[depth]")
        for (path in DepthTokenPath.entries.sortedBy { it.name }) {
            val spec = path.resolveIn(theme.depth)
            sb.appendLine(
                "${path.path}=elev:${formatDeterministic(spec.elevation.value)}," +
                    "alpha:${formatDeterministic(spec.shadowAlpha)}",
            )
        }

        sb.appendLine("[motion]")
        for (path in MotionTokenPath.entries.sortedBy { it.name }) {
            val spec = path.resolveIn(theme.motion)
            sb.appendLine("${path.path}=dur:${spec.duration.milliseconds},easing:${spec.easing.name}")
        }

        sb.appendLine("[typography]")
        for (path in TypographyTokenPath.entries.sortedBy { it.name }) {
            val role = path.resolveIn(theme.typography)
            val fam =
                when (val f = role.family) {
                    is FontFamilyRef.Catalog -> "catalog:${f.id.value}"
                    is FontFamilyRef.Custom -> "custom:${f.key.value}"
                }
            sb.appendLine(
                "${path.path}=sz:${formatDeterministic(role.size.value)}," +
                    "wt:${role.weight.weight},fam:$fam",
            )
        }
    }

    captureTheme("Light", pair.light)
    captureTheme("Dark", pair.dark)

    sb.appendLine("[report]")
    sb.appendLine("baseVersion=${pair.report.baseVersion}")
    sb.appendLine("modes=${pair.report.modes.sortedBy { it.name }.joinToString(",") { it.name }}")
    for (entry in pair.report.entries) {
        sb.appendLine("${entry.path}|${entry.stage.name}|${entry.status.name}|${entry.requested}|${entry.enforced}")
    }
    val fa = pair.report.fontAssignments
    sb.appendLine(
        "fonts=str:${fa.structure?.let { formatFontRef(it) }}," +
            "cnt:${fa.content?.let { formatFontRef(it) }}," +
            "meta:${fa.metadata?.let { formatFontRef(it) }}",
    )

    return sb.toString().trimEnd()
}

private fun formatFontRef(ref: FontFamilyRef): String = when (ref) {
    is FontFamilyRef.Catalog -> "catalog:${ref.id.value}"
    is FontFamilyRef.Custom -> "custom:${ref.key.value}"
}
