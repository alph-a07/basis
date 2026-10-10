package io.github.alph_a07.basis.ksp.family

/** Output package shared by every generated path family. */
internal const val OUTPUT_PACKAGE: String = "io.github.alph_a07.basis.theme.tokens.core"

/**
 * Renders one path family as Kotlin source: the typed identifier enum with its stable path
 * strings, followed by the `resolveIn` function that maps each entry to its token-tree leaf.
 */
internal object FamilyEmitter {

    fun emit(model: FamilyModel): String = buildString {
        appendLine("package $OUTPUT_PACKAGE")
        appendLine()
        imports(model).forEach { appendLine("import $it") }
        if (imports(model).isNotEmpty()) appendLine()
        append(enumEnumKdoc(model))
        appendLine("public enum class ${model.enumName}(public val path: String) {")
        model.members.forEach { appendLine("    ${it.entryName}(\"${it.path}\"),") }
        appendLine("}")
        appendLine()
        append(enumResolveKdoc(model))
        appendLine(
            "public fun ${model.enumName}.resolveIn(${model.paramName}: ${model.receiverSimpleName})" +
                ": ${model.returnType} = when (this) {",
        )
        model.members.forEach { member ->
            val accessor = member.segments.joinToString(separator = ".")
            appendLine("    ${model.enumName}.${member.entryName} -> ${model.paramName}.$accessor")
        }
        appendLine("}")
    }

    private fun imports(model: FamilyModel): List<String> =
        listOf(model.receiverFqn, model.returnFqn)
            .filterNot { it.startsWith("$OUTPUT_PACKAGE.") }
            .distinct()
            .sorted()

    private fun enumEnumKdoc(model: FamilyModel): String {
        val first = model.members.first()
        val summary =
            "Typed identifier of one ${model.kind} path, e.g. [${first.entryName}] for `${first.path}`."
        val body = buildString {
            append("[path] carries the stable dotted form recorded on resolution reports and accepted ")
            append("by the secondary override path map. The member set is closed, so an unknown ")
            append("${model.kind} path cannot be expressed where this type is required.")
            if (model.enumDocNote.isNotEmpty()) append(" ${model.enumDocNote}")
        }
        return renderKdoc(listOf(summary, body))
    }

    private fun enumResolveKdoc(model: FamilyModel): String {
        val clause = if (model.resolveDocNote.isEmpty()) "." else "; ${model.resolveDocNote}"
        val text = "Resolves this identifier to its ${model.resolveNoun} in [${model.paramName}]$clause"
        return renderKdoc(listOf(text))
    }

    private fun renderKdoc(paragraphs: List<String>): String = buildString {
        appendLine("/**")
        paragraphs.forEachIndexed { index, paragraph ->
            if (index > 0) appendLine(" *")
            wrapKdocParagraph(paragraph).forEach { appendLine(" * $it") }
        }
        appendLine(" */")
    }
}
