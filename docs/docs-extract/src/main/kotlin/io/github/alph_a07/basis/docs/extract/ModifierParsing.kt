package io.github.alph_a07.basis.docs.extract

/**
 * Parsing utilities for modifier KDoc, declarations, and parameters.
 */
internal object ModifierParsing {

    fun cleanKdocLine(line: String): String {
        val trimmed = line.trim()
        val noPrefix = trimmed.removePrefix("/**").removePrefix("*/").removePrefix("*")

        return noPrefix.trim()
    }

    fun extractRawKdocBefore(codeBefore: String): String {
        if (!codeBefore.contains("/**") || !codeBefore.contains("*/")) {
            return ""
        }

        val lastKdocStart = codeBefore.lastIndexOf("/**")
        val lastKdocEnd = codeBefore.indexOf("*/", startIndex = lastKdocStart)
        val rawKDoc =
            if (lastKdocEnd != -1) {
                codeBefore.substring(lastKdocStart, lastKdocEnd + 2)
            } else {
                ""
            }

        return rawKDoc
    }

    fun buildCleanDeclaration(funName: String, parameters: List<ParameterDoc>): String {
        val decl =
            "public fun Modifier.$funName(\n" +
                parameters.joinToString(",\n") { p ->
                    val defaultPart = if (p.defaultValue != null) " = ${p.defaultValue}" else ""

                    "    ${p.name}: ${p.type}$defaultPart"
                } + "\n): Modifier"

        return decl
    }

    fun parseKDocParamTags(kdoc: String): Map<String, String> {
        val result = mutableMapOf<String, String>()
        val paramPattern =
            """@(?:param|property)\s+(\w+)\s+([\s\S]*?)(?=@(?:param|property)|@return|@throws|\*/|$)"""
        val paramRegex = Regex(paramPattern)
        paramRegex.findAll(kdoc).forEach { match ->
            val name = match.groupValues[1]
            val lines = match.groupValues[2].lines()
            val desc =
                lines.joinToString(" ") { it.trim().removePrefix("*").trim() }
                    .trim()

            result[name] = desc
        }

        return result
    }

    fun parseParameters(paramsRaw: String, paramDocs: Map<String, String>): List<ParameterDoc> {
        if (paramsRaw.isBlank()) {
            return emptyList()
        }

        val tokens = splitParameters(paramsRaw)
        val params =
            tokens.mapNotNull { token ->
                parseSingleParameter(token, paramDocs)
            }

        return params
    }

    private fun parseSingleParameter(token: String, paramDocs: Map<String, String>): ParameterDoc? {
        val colonIdx = token.indexOf(':')
        if (colonIdx == -1) {
            return null
        }

        val rawName = token.substring(0, colonIdx).trim()
        val name = rawName.substringAfterLast(' ')
        val rest = token.substring(colonIdx + 1).trim()

        val eqIdx = rest.indexOf('=')
        val type: String
        val defaultValue: String?
        if (eqIdx != -1) {
            type = rest.substring(0, eqIdx).trim()

            defaultValue = rest.substring(eqIdx + 1).trim()
        } else {
            type = rest.trim()

            defaultValue = null
        }

        val doc =
            ParameterDoc(
                name = name,
                type = type,
                defaultValue = defaultValue,
                description = paramDocs[name] ?: "$name parameter.",
                optional = defaultValue != null,
            )

        return doc
    }

    fun splitParameters(paramsRaw: String): List<String> {
        val results = mutableListOf<String>()
        var depthAngle = 0
        var depthParen = 0
        var depthBrace = 0
        var current = StringBuilder()

        for (char in paramsRaw) {
            when (char) {
                '<' -> depthAngle++
                '>' -> depthAngle--
                '(' -> depthParen++
                ')' -> depthParen--
                '{' -> depthBrace++
                '}' -> depthBrace--
                ',' -> {
                    if (depthAngle == 0 && depthParen == 0 && depthBrace == 0) {
                        results.add(current.toString().trim())
                        current = StringBuilder()

                        continue
                    }
                }
            }

            current.append(char)
        }
        if (current.isNotBlank()) {
            results.add(current.toString().trim())
        }

        return results
    }

    fun parseConcatenatedStrings(snippet: String): String {
        val stringLiteralRegex = Regex(""""((?:[^"\\]|\\.)*)"""")
        val matches = stringLiteralRegex.findAll(snippet)
        val result =
            matches.joinToString("") {
                it.groupValues[1].replace("\\n", "\n").replace("\\\"", "\"")
            }

        return result
    }

    fun extractKDocDescription(kdocText: String): String {
        val lines = kdocText.lines()
        val descLines = mutableListOf<String>()
        for (line in lines) {
            val cleaned = cleanKdocLine(line)
            if (cleaned.startsWith("@")) break

            if (cleaned.isNotBlank()) {
                descLines.add(cleaned)
            }
        }

        val desc = descLines.joinToString(" ").trim()

        return desc
    }
}
