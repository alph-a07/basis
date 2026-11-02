package io.github.alph_a07.basis.docs.extract

import java.io.File
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Entrypoint to generate components.json from basis-components Kotlin sources.
 */
@OptIn(ExperimentalSerializationApi::class)
public fun main(args: Array<String>) {
    require(args.isNotEmpty()) {
        "Usage: GenerateComponentsJsonKt <modifiersSourceDir> [outputFiles...]"
    }

    val modifiersDir = File(args[0])
    val rootDir = resolveProjectRoot(modifiersDir)
    val commit = GitCommitLocator.currentCommit(rootDir)

    val extractor = ModifierExtractor(modifiersDir)
    val extractedModifiers = extractor.extractAll(commit)
    println("Extracted ${extractedModifiers.size} modifiers from ${modifiersDir.absolutePath}")

    val jsonCodec =
        Json {
            prettyPrint = true
            prettyPrintIndent = "  "
            ignoreUnknownKeys = true
            encodeDefaults = true

            explicitNulls = false
        }

    val outputTargets = resolveOutputTargets(args)
    val fixtureFile = outputTargets.find { it.name.endsWith(".fixture.json") }
    val existingNonModifiers = parseExistingNonModifiers(fixtureFile, jsonCodec)

    outputTargets.forEach { file ->
        writeComponentsTarget(file, commit, extractedModifiers, existingNonModifiers, jsonCodec)
    }
}

private fun resolveOutputTargets(args: Array<String>): List<File> {
    val targets =
        if (args.size > 1) {
            args.drop(1).map { File(it) }
        } else {
            listOf(File("build/docs-model/components.json"))
        }

    return targets
}

private fun parseExistingNonModifiers(fixtureFile: File?, jsonCodec: Json): List<JsonObject> {
    if (fixtureFile == null || !fixtureFile.exists()) {
        return emptyList()
    }

    val existing = mutableListOf<JsonObject>()
    try {
        val rootObj = jsonCodec.parseToJsonElement(fixtureFile.readText()).jsonObject
        val comps = rootObj["components"]?.jsonArray ?: JsonArray(emptyList())

        comps.forEach { comp ->
            val kind = comp.jsonObject["kind"]?.jsonPrimitive?.content

            if (kind != "modifier") {
                existing.add(comp.jsonObject)
            }
        }
    } catch (@Suppress("TooGenericExceptionCaught") e: Exception) {
        println("Warning: could not parse non-modifiers from ${fixtureFile.name}: ${e.message}")
    }

    return existing
}

private fun writeComponentsTarget(
    file: File,
    commit: String,
    extractedModifiers: List<ComponentDocEntry>,
    existingNonModifiers: List<JsonObject>,
    jsonCodec: Json,
) {
    val isFixture = file.name.endsWith(".fixture.json")
    val provenance = if (isFixture) "fixture" else "generated"

    val generatedDoc =
        ComponentsDocument(
            schemaVersion = "0.2.0",
            provenance = provenance,
            source = SourceCommit(commit = commit),
            components = extractedModifiers,
        )

    val docJsonObj = jsonCodec.encodeToJsonElement(ComponentsDocument.serializer(), generatedDoc).jsonObject
    val generatedComps = docJsonObj["components"]?.jsonArray ?: JsonArray(emptyList())

    val mergedComponents =
        buildList {
            existingNonModifiers.forEach { add(it) }

            generatedComps.forEach { add(it) }
        }

    val finalDoc =
        buildJsonObject {
            put("schemaVersion", docJsonObj["schemaVersion"] ?: JsonPrimitive("0.2.0"))
            put("provenance", JsonPrimitive(provenance))
            put("source", docJsonObj["source"] ?: JsonPrimitive(commit))

            put("components", JsonArray(mergedComponents))
        }

    val jsonOutput = jsonCodec.encodeToString(JsonObject.serializer(), finalDoc) + "\n"
    file.parentFile?.mkdirs()
    file.writeText(jsonOutput)

    println(
        "Generated ${file.absolutePath} with ${mergedComponents.size} components " +
            "(${extractedModifiers.size} modifiers, commit: $commit)",
    )
}
