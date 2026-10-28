package io.github.alph_a07.basis.docs.extract

import java.io.File
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json

/**
 * Entrypoint to generate intent.json from basis-theme Kotlin sources.
 */
@OptIn(ExperimentalSerializationApi::class)
public fun main(args: Array<String>) {
    require(args.isNotEmpty()) { "Usage: GenerateIntentJsonKt <intentSourceDir> [outputFiles...]" }

    val intentDir = File(args[0])
    val rootDir = resolveProjectRoot(intentDir)
    val commit = GitCommitLocator.currentCommit(rootDir)

    val extractor = IntentExtractor(intentDir)
    val doc = extractor.extract(commit)

    val jsonCodec =
        Json {
            prettyPrint = true

            prettyPrintIndent = "  "
        }

    val jsonOutput = jsonCodec.encodeToString(IntentDocument.serializer(), doc) + "\n"

    val outputTargets =
        if (args.size > 1) {
            args.drop(1).map { File(it) }
        } else {
            listOf(File("build/docs-model/intent.json"))
        }

    outputTargets.forEach { file ->
        file.parentFile?.mkdirs()
        file.writeText(jsonOutput)

        println("Generated ${file.absolutePath} (commit: $commit)")
    }
}

internal fun resolveProjectRoot(start: File): File {
    var current: File? = start.canonicalFile
    while (current != null) {
        if (File(current, "settings.gradle.kts").exists()) {
            return current
        }

        current = current.parentFile
    }

    return start
}
