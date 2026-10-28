package io.github.alph_a07.basis.docs.extract

import java.io.File
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json

/**
 * Entrypoint to generate patch-vocabulary.json from basis-theme Kotlin sources.
 */
@OptIn(ExperimentalSerializationApi::class)
public fun main(args: Array<String>) {
    require(args.isNotEmpty()) { "Usage: GeneratePatchVocabularyKt <overridesSourceDir> [outputFiles...]" }

    val overridesDir = File(args[0])
    val rootDir = resolveProjectRoot(overridesDir)
    val commit = GitCommitLocator.currentCommit(rootDir)

    val extractor = PatchVocabularyExtractor(overridesDir)
    val doc = extractor.extract(commit)

    val jsonCodec =
        Json {
            prettyPrint = true

            prettyPrintIndent = "  "
        }

    val jsonOutput = jsonCodec.encodeToString(PatchVocabularyDocument.serializer(), doc) + "\n"

    val outputTargets =
        if (args.size > 1) {
            args.drop(1).map { File(it) }
        } else {
            listOf(File("build/docs-model/patch-vocabulary.json"))
        }

    outputTargets.forEach { file ->
        file.parentFile?.mkdirs()
        file.writeText(jsonOutput)

        println("Generated ${file.absolutePath} (commit: $commit)")
    }
}
