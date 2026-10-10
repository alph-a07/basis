package io.github.alph_a07.basis.ksp.knobs

/**
 * Renders one knob entry-map function as Kotlin source: an internal `knobEntries` extension
 * mapping each non-null axis of the receiver to its stable dotted path.
 */
internal object KnobEntriesEmitter {

    fun emit(model: KnobEntriesModel): String = buildString {
        appendLine("package ${model.packageName}")
        appendLine()
        appendLine("/**")
        appendLine(" * Maps each non-null axis of this knob group to its stable dotted path.")
        appendLine(" */")
        appendLine("internal fun ${model.receiverSimpleName}.knobEntries(): Map<String, Float> = buildMap {")
        model.entries.forEach { entry ->
            appendLine("    ${entry.propertyName}?.let { put(\"${entry.path}\", it) }")
        }
        appendLine("}")
    }
}
