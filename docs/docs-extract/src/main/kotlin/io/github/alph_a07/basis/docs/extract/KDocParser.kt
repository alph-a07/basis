package io.github.alph_a07.basis.docs.extract

/**
 * Parser for Kotlin KDoc comments and tags.
 */
public object KDocParser {

    private val knobTowardRegex = Regex("""(\w[\w-]*)\s+toward\s+(\w[\w-]*)(?:[;.]|$)""")
    private val propertyTagRegex = Regex("""@property\s+(\w+)\s+([\s\S]*?)(?=@property|@param|@return|@throws|\*/|$)""")

    /**
     * Extracts the first sentence from a documentation block.
     *
     * @param text Documentation string.
     * @return First sentence ending with a period, or entire string trimmed.
     */
    public fun extractFirstSentence(text: String): String {
        val clean = text.trim()
        val parts = clean.split(". ")
        var accumulated = ""

        for (part in parts) {
            accumulated = if (accumulated.isEmpty()) part else "$accumulated. $part"

            if (!part.endsWith("e.g") && !part.endsWith("i.e")) {
                val result = if (accumulated.endsWith('.')) accumulated else "$accumulated."

                return result
            }
        }

        val fallback = if (clean.endsWith('.')) clean else "$clean."

        return fallback
    }

    /**
     * Parses negative and positive labels from a knob toward clause.
     *
     * @param propertyDoc Documentation text following `@property <knob>`.
     * @return Pair of negative and positive label strings.
     * @throws IllegalArgumentException If no toward clause is present.
     */
    public fun parseTowardLabels(propertyDoc: String): Pair<String, String> {
        val match =
            knobTowardRegex.find(propertyDoc)
                ?: throw IllegalArgumentException("No 'A toward B' clause found in: $propertyDoc")

        return Pair(match.groupValues[1], match.groupValues[2])
    }

    /**
     * Extracts all `@property` tags from a KDoc block.
     *
     * @param kdoc Raw KDoc block content.
     * @return Map of property name to raw documentation text.
     */
    public fun parsePropertyTags(kdoc: String): Map<String, String> = buildMap {
        propertyTagRegex.findAll(kdoc).forEach { match ->
            val name = match.groupValues[1]
            val desc =
                match.groupValues[2].lines()
                    .joinToString(" ") { it.trim().removePrefix("*").trim() }
                    .trim()

            put(name, desc)
        }
    }

    /**
     * Extracts enum entries and their leading KDoc summaries from source text.
     *
     * @param enumSource Source text containing an enum class definition.
     * @return Map of enum entry identifier to its documentation summary.
     */
    public fun parseEnumEntries(enumSource: String): Map<String, String> {
        val enumBody =
            enumSource
                .substringAfter('{')
                .substringBefore('}')
        val entryRegex = Regex("""(?:/\*\*([\s\S]*?)\*/\s*)?([A-Za-z0-9_]+)\s*(?:\([^)]*\))?\s*,""")

        return buildMap {
            entryRegex.findAll(enumBody).forEach { match ->
                val rawDoc = match.groupValues[1]
                val entryId = match.groupValues[2]
                val docClean =
                    rawDoc.lines()
                        .joinToString(" ") { it.trim().removePrefix("*").trim() }
                        .trim()

                put(entryId, extractFirstSentence(docClean))
            }
        }
    }

    /**
     * Formats an identifier (camelCase or PascalCase) into human-readable Title Case.
     *
     * @param identifier Identifier string to format.
     * @return Space-separated Title Case label.
     */
    public fun formatLabel(identifier: String): String = buildString {
        identifier.forEachIndexed { index, char ->
            if (index > 0 && char.isUpperCase() && !identifier[index - 1].isUpperCase()) {
                append(' ')
            }

            if (index == 0) {
                append(char.uppercaseChar())
            } else {
                append(char)
            }
        }
    }
}
