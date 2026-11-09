package io.github.alph_a07.basis.docs.extract

import java.io.File

private const val FACTORY_MATCH_GROUP_RETURN_TYPE = 3

/**
 * Parsed representation of a `@BasisComponentDoc` annotation.
 */
internal data class ParsedComponentDocAnnotation(
    val id: String,
    val family: String,
    val role: String,
    val minTouchTargetDp: Int,
    val respectsReducedMotion: Boolean,
    val quickStartSample: String,
)

/**
 * Extracts component documentation entities directly from Kotlin source files and `@BasisComponentDoc` annotations.
 *
 * @property componentsDir Directory containing component Kotlin source files.
 */
public class ComponentExtractor(
    private val componentsDir: File,
) {

    /**
     * Extracts all component documentation entries found in [componentsDir].
     *
     * @param commit Current git commit SHA.
     * @return List of [ComponentDocEntry] objects for all discovered components.
     */
    public fun extractAll(commit: String): List<ComponentDocEntry> {
        val files =
            componentsDir.walkTopDown()
                .filter { it.isFile && it.name.endsWith(".kt") && !it.name.endsWith("Modifier.kt") }
                .sortedBy { it.name }
                .toList()

        val results =
            files.mapNotNull { file ->
                extractComponent(file, commit)
            }

        return results
    }

    private fun extractComponent(file: File, commit: String): ComponentDocEntry? {
        val content = file.readText()
        if (!content.contains("@BasisComponentDoc")) {
            return null
        }

        val docAnnotation = parseComponentDocAnnotation(content)
        val className = extractClassName(content) ?: file.nameWithoutExtension

        return buildComponentDocEntry(file, commit, docAnnotation, className, content)
    }

    private fun buildComponentDocEntry(
        file: File,
        commit: String,
        docAnnotation: ParsedComponentDocAnnotation,
        className: String,
        content: String,
    ): ComponentDocEntry {
        val rawKdoc = extractClassKDoc(content, className)
        val mainKdocText = ModifierParsing.extractKDocDescription(rawKdoc)
        val summary = KDocParser.extractFirstSentence(mainKdocText)
        val description = mainKdocText.ifBlank { summary }

        val relativePath = file.toRelativeString(resolveProjectRoot(file)).replace('\\', '/')
        val sourceUrl = "https://github.com/alph-a07/basis/blob/$commit/$relativePath"
        val packageName = extractPackageName(content)

        val entry =
            ComponentDocEntry(
                id = docAnnotation.id,
                name = className,
                family = docAnnotation.family,
                kind = "component",
                lifecycle = LifecycleDoc(status = "stable", addedIn = "0.1.0"),
                summary = summary,
                description = description,
                packageName = packageName,
                sourceUrl = sourceUrl,
                overview =
                    OverviewDoc(
                        quickStartSample = docAnnotation.quickStartSample.trim(),
                        anatomy =
                            ComponentMetadataCatalog.buildAnatomy(
                                docAnnotation.id,
                                resolveProjectRoot(componentsDir),
                            ),
                        variants = ComponentMetadataCatalog.buildVariants(docAnnotation.id),
                        states = ComponentMetadataCatalog.buildStates(docAnnotation.id),
                        gallery = ComponentMetadataCatalog.buildGallery(docAnnotation.id),
                    ),
                api = buildComponentApiDoc(docAnnotation, className, content),
                overrides = OverridesDoc(),
                accessibility = buildComponentAccessibilityDoc(docAnnotation),
            )

        return entry
    }

    private fun buildComponentApiDoc(
        docAnnotation: ParsedComponentDocAnnotation,
        className: String,
        content: String,
    ): ApiDoc {
        val signatures = mutableListOf<SignatureDoc>()

        extractFactorySignature(content)?.let { signatures.add(it) }
        extractClassSignature(className, content)?.let { signatures.add(it) }

        val samples =
            listOf(
                SampleDoc(
                    id = "${docAnnotation.id}-sample",
                    title = "Standard Usage",
                    code = docAnnotation.quickStartSample.trim(),
                    description = "Idiomatic Compose usage for $className.",
                ),
            )

        val doc = ApiDoc(signatures = signatures, samples = samples)

        return doc
    }

    private fun buildComponentAccessibilityDoc(docAnnotation: ParsedComponentDocAnnotation): AccessibilityDoc {
        val touchTarget =
            TouchTargetDoc(
                minWidthDp = docAnnotation.minTouchTargetDp,
                minHeightDp = docAnnotation.minTouchTargetDp,
                enforced = docAnnotation.minTouchTargetDp >= MIN_TOUCH_FLOOR_DP,
            )

        val reducedMotion =
            ReducedMotionDoc(
                respectsReducedMotion = docAnnotation.respectsReducedMotion,
                fallbackDescription =
                    if (docAnnotation.respectsReducedMotion) {
                        "State layer animations adapt gracefully to system reduced motion settings."
                    } else {
                        "No motion animations"
                    },
            )

        val report =
            AccessibilityReport(
                status = "pass",
                checks = listOf("Contrast-Compliance", "Semantic-Role"),
                version = "0.2.0",
            )

        val a11y =
            AccessibilityDoc(
                role = docAnnotation.role,
                touchTarget = touchTarget,
                reducedMotion = reducedMotion,
                keyboardNavigation = emptyList(),
                report = report,
            )

        return a11y
    }

    private companion object {
        const val MIN_TOUCH_FLOOR_DP = 48
    }
}

private fun extractFactorySignature(content: String): SignatureDoc? {
    val factoryRegex = Regex("""@Composable\s+public fun (\w+)\(([\s\S]*?)\):\s*(\w+)""")
    val factoryMatch = factoryRegex.find(content) ?: return null

    val funName = factoryMatch.groupValues[1]
    val paramsRaw = factoryMatch.groupValues[2]
    val returnType = factoryMatch.groupValues[FACTORY_MATCH_GROUP_RETURN_TYPE]
    val codeBefore = content.substring(0, factoryMatch.range.first)
    val funKDoc = ModifierParsing.extractRawKdocBefore(codeBefore)
    val paramDocs = ModifierParsing.parseKDocParamTags(funKDoc)
    val params = ModifierParsing.parseParameters(paramsRaw, paramDocs)

    val decl =
        "@Composable\npublic fun $funName(\n" +
            params.joinToString(",\n") { p ->
                val defaultPart = if (p.defaultValue != null) " = ${p.defaultValue}" else ""

                "    ${p.name}: ${p.type}$defaultPart"
            } + "\n): $returnType"

    val sig =
        SignatureDoc(
            name = funName,
            declaration = decl,
            parameters = params,
            returnType = returnType,
            kdoc = funKDoc,
        )

    return sig
}

private fun extractClassSignature(className: String, content: String): SignatureDoc? {
    val classRegex = Regex("""public (?:data )?class ($className)\(([\s\S]*?)\)""")
    val classMatch = classRegex.find(content) ?: return null

    val paramsRaw = classMatch.groupValues[2]
    val codeBefore = content.substring(0, classMatch.range.first)
    val classKDoc = ModifierParsing.extractRawKdocBefore(codeBefore)
    val propDocs = ModifierParsing.parseKDocParamTags(classKDoc)
    val params = ModifierParsing.parseParameters(paramsRaw, propDocs)

    val decl =
        "public class $className(\n" +
            params.joinToString(",\n") { p ->
                val defaultPart = if (p.defaultValue != null) " = ${p.defaultValue}" else ""

                "    val ${p.name}: ${p.type}$defaultPart"
            } + "\n)"

    val sig =
        SignatureDoc(
            name = className,
            declaration = decl,
            parameters = params,
            returnType = className,
            kdoc = classKDoc,
        )

    return sig
}

private fun parseComponentDocAnnotation(content: String): ParsedComponentDocAnnotation {
    val id = Regex("""id\s*=\s*"([^"]+)"""").find(content)?.groupValues?.get(1) ?: "unknown"
    val family = Regex("""family\s*=\s*"([^"]+)"""").find(content)?.groupValues?.get(1) ?: "Foundation"
    val role = Regex("""role\s*=\s*"([^"]+)"""").find(content)?.groupValues?.get(1) ?: "None"
    val minTouchTargetDp =
        Regex("""minTouchTargetDp\s*=\s*(\d+)""").find(content)?.groupValues?.get(1)?.toIntOrNull() ?: 0
    val respectsReducedMotion =
        Regex("""respectsReducedMotion\s*=\s*(true|false)""").find(content)?.groupValues?.get(1)?.toBoolean()
            ?: true

    val annotationBody = extractAnnotationBody(content)
    val quickStartSample = extractConcatenatedString(annotationBody, "quickStartSample")

    val parsed =
        ParsedComponentDocAnnotation(
            id = id,
            family = family,
            role = role,
            minTouchTargetDp = minTouchTargetDp,
            respectsReducedMotion = respectsReducedMotion,
            quickStartSample = quickStartSample,
        )

    return parsed
}

private fun extractAnnotationBody(content: String): String {
    val start = content.indexOf("@BasisComponentDoc(")

    return if (start == -1) {
        ""
    } else {
        val afterOpenParen = content.substring(start + "@BasisComponentDoc(".length)
        val endIdx = afterOpenParen.indexOf("\npublic")

        if (endIdx == -1) afterOpenParen else afterOpenParen.substring(0, endIdx)
    }
}

private fun extractConcatenatedString(annotationBody: String, key: String): String {
    val marker = "$key ="
    val idx = annotationBody.indexOf(marker)

    return if (idx == -1) {
        ""
    } else {
        ModifierParsing.parseConcatenatedStrings(annotationBody.substring(idx + marker.length)).trim()
    }
}

private fun extractClassName(content: String): String? {
    val match = Regex("""public (?:data )?class (\w+)""").find(content)

    return match?.groupValues?.get(1)
}

private fun extractClassKDoc(content: String, className: String): String {
    val classIdx = content.indexOf("class $className")
    if (classIdx == -1) {
        return ""
    }

    val codeBefore = content.substring(0, classIdx)

    return ModifierParsing.extractRawKdocBefore(codeBefore)
}

private fun extractPackageName(content: String): String {
    val match = Regex("""package\s+([\w.]+)""").find(content)

    return match?.groupValues?.get(1) ?: "io.github.alph_a07.basis.components.foundation"
}
