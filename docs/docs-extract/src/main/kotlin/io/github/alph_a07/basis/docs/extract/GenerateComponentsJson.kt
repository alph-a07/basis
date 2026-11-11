package io.github.alph_a07.basis.docs.extract

import java.io.File
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json

/**
 * Entrypoint to generate components.json from basis-components Kotlin sources.
 */
@OptIn(ExperimentalSerializationApi::class)
public fun main(args: Array<String>) {
    require(args.isNotEmpty()) {
        "Usage: GenerateComponentsJsonKt <componentsSourceDir> [outputFiles...]"
    }

    val inputDir = File(args[0])
    val rootDir = resolveProjectRoot(inputDir)
    val commit = GitCommitLocator.currentCommit(rootDir)

    val modifiersDir =
        if (inputDir.name == "modifier") {
            inputDir
        } else {
            File(inputDir, "modifiers").takeIf { it.exists() } ?: inputDir
        }

    val componentsDir =
        if (inputDir.name == "modifier") {
            inputDir.parentFile ?: inputDir
        } else {
            inputDir
        }

    val modifierExtractor = ModifierExtractor(modifiersDir)
    val extractedModifiers = modifierExtractor.extractAll(commit)

    val componentExtractor = ComponentExtractor(componentsDir)
    val extractedComponents = componentExtractor.extractAll(commit)

    val allComponents = extractedComponents + extractedModifiers
    println(
        "Extracted ${extractedComponents.size} components and ${extractedModifiers.size} modifiers " +
            "from ${inputDir.absolutePath}",
    )

    val jsonCodec =
        Json {
            prettyPrint = true
            prettyPrintIndent = "  "
            ignoreUnknownKeys = true
            encodeDefaults = true

            explicitNulls = false
        }

    val outputTargets = resolveOutputTargets(args)

    outputTargets.forEach { file ->
        writeComponentsTarget(file, commit, allComponents, jsonCodec)
    }
}

private fun resolveOutputTargets(args: Array<String>): List<File> {
    val targets =
        if (args.size > 1) {
            args.drop(1).map { File(it) }
        } else {
            listOf(File("docs/docs-model/generated/components.json"))
        }

    return targets
}

private fun writeComponentsTarget(
    file: File,
    commit: String,
    components: List<ComponentDocEntry>,
    jsonCodec: Json,
) {
    val generatedDoc =
        ComponentsDocument(
            schemaVersion = "0.2.0",
            provenance = "generated",
            source = SourceCommit(commit = commit),
            components = components,
        )

    val jsonOutput = jsonCodec.encodeToString(ComponentsDocument.serializer(), generatedDoc) + "\n"
    file.parentFile?.mkdirs()
    file.writeText(jsonOutput)

    println(
        "Generated ${file.absolutePath} with ${components.size} entries " +
            "(commit: $commit)",
    )
}
