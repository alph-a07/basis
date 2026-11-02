package io.github.alph_a07.basis.docs.runtime

import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.core.ResolvedThemePair
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.core.resolveIn
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole

/**
 * Extracts a map of CSS custom property names to values from a [ResolvedTheme].
 *
 * @param theme Resolved theme instance.
 * @param prefix Custom property prefix.
 * @return Map of CSS variable names to formatted string values.
 */
public fun extractTokenMap(theme: ResolvedTheme, prefix: String = ""): Map<String, String> {
    val map = LinkedHashMap<String, String>()

    for (tokenPath in ColorTokenPath.entries) {
        val color = tokenPath.resolveIn(theme.color)

        if (color != null) {
            map[tokenPathToCssVar(tokenPath.path, prefix)] = formatColor(color)
        }
    }

    for (tokenPath in SpacingTokenPath.entries) {
        map[tokenPathToCssVar(tokenPath.path, prefix)] = formatDp(tokenPath.resolveIn(theme.spacing))
    }

    for (tokenPath in RadiusTokenPath.entries) {
        map[tokenPathToCssVar(tokenPath.path, prefix)] = formatDp(tokenPath.resolveIn(theme.radius))
    }

    for (tokenPath in DepthTokenPath.entries) {
        map[tokenPathToCssVar(tokenPath.path, prefix)] = formatDepth(tokenPath.resolveIn(theme.depth))
    }

    for (tokenPath in MotionTokenPath.entries) {
        map[tokenPathToCssVar(tokenPath.path, prefix)] = formatMotion(tokenPath.resolveIn(theme.motion))
    }

    for (tokenPath in IconSizeTokenPath.entries) {
        map[tokenPathToCssVar(tokenPath.path, prefix)] = formatDp(tokenPath.resolveIn(theme.size.icon))
    }

    for (tokenPath in ControlSizeTokenPath.entries) {
        map[tokenPathToCssVar(tokenPath.path, prefix)] = formatDp(tokenPath.resolveIn(theme.size.control))
    }

    for (tokenPath in TypographyTokenPath.entries) {
        putTypographyProperties(map, tokenPath.path, tokenPath.resolveIn(theme.typography), prefix)
    }

    return map
}

/**
 * Extracts metadata maps for token kinds and groups keyed by CSS variable names.
 *
 * @param prefix Custom property prefix, e.g. `"b"`.
 * @return Pair of kinds map and groups map.
 */
public fun extractTokenMetadata(prefix: String = ""): Pair<Map<String, String>, Map<String, String>> {
    val kinds = LinkedHashMap<String, String>()
    val groups = LinkedHashMap<String, String>()

    for (tokenPath in ColorTokenPath.entries) {
        val cssVar = tokenPathToCssVar(tokenPath.path, prefix)
        kinds[cssVar] = "color"

        groups[cssVar] = "color"
    }

    for (tokenPath in SpacingTokenPath.entries) {
        val cssVar = tokenPathToCssVar(tokenPath.path, prefix)
        kinds[cssVar] = "dimension"

        groups[cssVar] = "spacing"
    }

    for (tokenPath in RadiusTokenPath.entries) {
        val cssVar = tokenPathToCssVar(tokenPath.path, prefix)
        kinds[cssVar] = "radius"

        groups[cssVar] = "radius"
    }

    for (tokenPath in DepthTokenPath.entries) {
        val cssVar = tokenPathToCssVar(tokenPath.path, prefix)
        kinds[cssVar] = "shadow"

        groups[cssVar] = "depth"
    }

    for (tokenPath in MotionTokenPath.entries) {
        val cssVar = tokenPathToCssVar(tokenPath.path, prefix)
        kinds[cssVar] = "duration"

        groups[cssVar] = "motion"
    }

    for (tokenPath in IconSizeTokenPath.entries) {
        val cssVar = tokenPathToCssVar(tokenPath.path, prefix)
        kinds[cssVar] = "dimension"

        groups[cssVar] = "size.icon"
    }

    for (tokenPath in ControlSizeTokenPath.entries) {
        val cssVar = tokenPathToCssVar(tokenPath.path, prefix)
        kinds[cssVar] = "dimension"

        groups[cssVar] = "size.control"
    }

    for (tokenPath in TypographyTokenPath.entries) {
        val varName = tokenPathToCssVar(tokenPath.path, prefix)
        kinds[varName] = "typography"
        groups[varName] = "typography"

        kinds["$varName-size"] = "dimension"
        groups["$varName-size"] = "typography"

        kinds["$varName-weight"] = "weight"
        groups["$varName-weight"] = "typography"

        kinds["$varName-line-height"] = "multiplier"
        groups["$varName-line-height"] = "typography"

        kinds["$varName-letter-spacing"] = "dimension"
        groups["$varName-letter-spacing"] = "typography"

        kinds["$varName-family"] = "font-family"

        groups["$varName-family"] = "typography"
    }

    return Pair(kinds, groups)
}

private fun putTypographyProperties(
    map: MutableMap<String, String>,
    path: String,
    role: TypeRole,
    prefix: String,
) {
    val varName = tokenPathToCssVar(path, prefix)
    map[varName] = formatTypeRole(role)
    map["$varName-size"] = formatSp(role.size)
    map["$varName-weight"] = role.weight.weight.toString()
    map["$varName-line-height"] =
        io.github.alph_a07.basis.theme.core.format.formatDeterministic(role.lineHeight.multiplier)
    map["$varName-letter-spacing"] =
        "${io.github.alph_a07.basis.theme.core.format.formatDeterministic(role.letterSpacing.em)}em"

    map["$varName-family"] = formatFontFamily(role.family)
}

/**
 * Emits a single CSS ruleset for a [ResolvedTheme].
 *
 * @param theme Resolved theme instance.
 * @param selector CSS selector scoping the block.
 * @param prefix Custom property prefix.
 * @return Formatted CSS ruleset string.
 */
public fun emitThemeCss(theme: ResolvedTheme, selector: String, prefix: String = ""): String {
    val tokens = extractTokenMap(theme, prefix)
    val lines = tokens.map { (name, value) -> "  $name: $value;" }

    return "$selector {\n" + lines.joinToString("\n") + "\n}"
}

/**
 * Emits light and dark CSS blocks for a [ResolvedThemePair].
 *
 * @param pair Resolved light and dark theme pair.
 * @param prefix Custom property prefix.
 * @param lightSelector CSS selector scoping the light ruleset.
 * @param darkSelector CSS selector scoping the dark ruleset.
 * @return Concatenated CSS rulesets.
 */
public fun emitPairCss(
    pair: ResolvedThemePair,
    prefix: String = "",
    lightSelector: String = ":root, [data-theme=\"light\"]",
    darkSelector: String = "[data-theme=\"dark\"]",
): String {
    val lightCss = pair.light?.let { emitThemeCss(it, lightSelector, prefix) }.orEmpty()
    val darkCss = pair.dark?.let { emitThemeCss(it, darkSelector, prefix) }.orEmpty()

    return listOf(lightCss, darkCss).filter { it.isNotEmpty() }.joinToString("\n\n")
}
