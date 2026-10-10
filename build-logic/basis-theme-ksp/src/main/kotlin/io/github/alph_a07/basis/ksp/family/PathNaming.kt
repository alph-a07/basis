package io.github.alph_a07.basis.ksp.family

private const val TOKENS_SUFFIX = "Tokens"
private const val SIZES_SUFFIX = "Sizes"
private const val KDOC_WIDTH = 112

/**
 * Derives the generated enum name from the receiver type's simple name, e.g. `ColorTokens` becomes
 * `ColorTokenPath` and `IconSizes` becomes `IconSizeTokenPath`.
 */
internal fun enumNameFor(receiverSimpleName: String): String = when {
    receiverSimpleName.endsWith(TOKENS_SUFFIX) -> receiverSimpleName.removeSuffix(TOKENS_SUFFIX) + "TokenPath"
    receiverSimpleName.endsWith(SIZES_SUFFIX) -> receiverSimpleName.removeSuffix(SIZES_SUFFIX) + "SizeTokenPath"
    else -> error("Cannot derive a token path enum name from '$receiverSimpleName'.")
}

/**
 * Derives the generated enum entry name from the path segments relative to the family prefix,
 * e.g. `surface` + `default` becomes `SurfaceDefault`.
 */
internal fun memberNameFor(segments: List<String>): String =
    segments.joinToString(separator = "") { segment ->
        if (segment.isEmpty()) segment else segment[0].uppercaseChar() + segment.substring(1)
    }

/**
 * Joins the family prefix and the relative segments into the stable dotted path form, e.g.
 * `size.icon` + `level1` becomes `size.icon.level1`.
 */
internal fun pathFor(prefix: String, segments: List<String>): String =
    segments.fold(prefix) { path, segment -> "$path.$segment" }

/**
 * Resolves the `resolveIn` receiver parameter name, defaulting to the last segment of [prefix]
 * unless [explicit] overrides it.
 */
internal fun paramNameFor(prefix: String, explicit: String): String =
    explicit.ifEmpty { prefix.substringAfterLast('.') }

/**
 * Greedily wraps [text] into lines of at most [width] characters on word boundaries.
 */
internal fun wrapKdocParagraph(text: String, width: Int = KDOC_WIDTH): List<String> {
    val lines = mutableListOf<String>()
    val current = StringBuilder()
    text.split(' ').filter { it.isNotEmpty() }.forEach { word ->
        if (current.isNotEmpty() && current.length + 1 + word.length > width) {
            lines += current.toString()
            current.setLength(0)
        }
        if (current.isNotEmpty()) current.append(' ')
        current.append(word)
    }
    if (current.isNotEmpty()) lines += current.toString()
    return lines.ifEmpty { listOf("") }
}
