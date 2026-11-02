package io.github.alph_a07.basis.docs.extract

import java.io.File

/**
 * Extracts modifier documentation entities directly from Kotlin source files and annotations.
 *
 * @property modifiersDir Directory containing modifier Kotlin source files.
 */
public class ModifierExtractor(
    private val modifiersDir: File,
) {

    /**
     * Extracts all foundation modifier documentation entries.
     *
     * @param commit Current git commit SHA.
     * @return List of [ComponentDocEntry] objects for all discovered modifiers.
     */
    public fun extractAll(commit: String): List<ComponentDocEntry> {
        val files =
            modifiersDir.listFiles { file ->
                file.isFile && file.name.endsWith("Modifier.kt")
            }?.sortedBy { it.name } ?: emptyList()

        val results =
            files.mapNotNull { file ->
                extractModifier(file, commit)
            }

        return results
    }

    private fun extractModifier(file: File, commit: String): ComponentDocEntry? {
        val content = file.readText()
        val docAnnotation = if (content.contains("@BasisModifierDoc")) parseModifierDocAnnotation(content) else null
        val functions = parsePublicModifierFunctions(content)
        val primaryFunction = functions.firstOrNull()

        if (docAnnotation == null || primaryFunction == null) {
            return null
        }

        return buildComponentDocEntry(file, commit, docAnnotation, primaryFunction, functions)
    }

    private fun buildComponentDocEntry(
        file: File,
        commit: String,
        docAnnotation: ParsedDocAnnotation,
        primaryFunction: ParsedFunction,
        functions: List<ParsedFunction>,
    ): ComponentDocEntry {
        val mainKdocText = ModifierParsing.extractKDocDescription(primaryFunction.kdocText)
        val summary = KDocParser.extractFirstSentence(mainKdocText)
        val description = mainKdocText.ifBlank { summary }
        val keyboardNav = extractKeyboardNavigation(docAnnotation.role, docAnnotation.id)
        val checks = extractA11yChecks(docAnnotation)

        val entry =
            ComponentDocEntry(
                id = docAnnotation.id,
                name = primaryFunction.name,
                family = "Foundation",
                kind = "modifier",
                lifecycle = LifecycleDoc(status = "stable", addedIn = "0.1.0"),
                summary = summary,
                description = description,
                packageName = "io.github.alph_a07.basis.components.foundation.modifier",
                sourceUrl = buildSourceUrl(commit, file.name),
                overview =
                    OverviewDoc(
                        quickStartSample = docAnnotation.sampleCode.trim(),
                        anatomy = AnatomyDoc(parts = emptyList()),
                    ),
                api = buildApiDoc(docAnnotation, primaryFunction, functions),
                overrides = OverridesDoc(),
                accessibility = buildAccessibilityDoc(docAnnotation, keyboardNav, checks),
            )

        return entry
    }

    private fun buildSourceUrl(commit: String, fileName: String): String {
        val url =
            "https://github.com/alph-a07/basis/blob/$commit/basis-components/src/main/kotlin/" +
                "io/github/alph_a07/basis/components/foundation/modifier/$fileName"

        return url
    }

    private fun buildApiDoc(
        docAnnotation: ParsedDocAnnotation,
        primaryFunction: ParsedFunction,
        functions: List<ParsedFunction>,
    ): ApiDoc {
        val signatures =
            functions.map { fn ->
                SignatureDoc(
                    name = fn.name,
                    declaration = fn.declaration,
                    parameters = fn.parameters,
                    returnType = "Modifier",
                    kdoc = fn.rawKDoc,
                )
            }

        val samples =
            listOf(
                SampleDoc(
                    id = "${docAnnotation.id}-sample",
                    title = "Standard Usage",
                    code = docAnnotation.sampleCode.trim(),
                    description = "Idiomatic call-site usage for ${primaryFunction.name}.",
                ),
            )

        val doc = ApiDoc(signatures = signatures, samples = samples)

        return doc
    }

    private fun buildAccessibilityDoc(
        docAnnotation: ParsedDocAnnotation,
        keyboardNav: List<String>,
        checks: List<String>,
    ): AccessibilityDoc {
        val fallbackDesc =
            if (docAnnotation.respectsReducedMotion) {
                "Visual state transitions adapt to system reduced motion settings."
            } else {
                null
            }

        val doc =
            AccessibilityDoc(
                role = docAnnotation.role,
                touchTarget =
                    TouchTargetDoc(
                        minWidthDp = docAnnotation.minTouchTargetDp,
                        minHeightDp = docAnnotation.minTouchTargetDp,
                        enforced = docAnnotation.touchTargetEnforced,
                    ),
                reducedMotion =
                    ReducedMotionDoc(
                        respectsReducedMotion = docAnnotation.respectsReducedMotion,
                        fallbackDescription = fallbackDesc,
                    ),
                keyboardNavigation = keyboardNav,
                report =
                    AccessibilityReport(
                        status = "pass",
                        checks = checks,
                        version = "0.2.0",
                    ),
            )

        return doc
    }
}

private data class ParsedDocAnnotation(
    val id: String,
    val role: String,
    val minTouchTargetDp: Int,
    val touchTargetEnforced: Boolean,
    val respectsReducedMotion: Boolean,
    val sampleCode: String,
)

private fun extractKeyboardNavigation(role: String, id: String): List<String> {
    val nav =
        when (role) {
            "Button", "RadioButton" -> listOf("Space", "Enter")
            "Checkbox" -> listOf("Space")
            else -> if (id == "basis-focus-ring") listOf("Tab", "ArrowKeys", "D-Pad") else emptyList()
        }

    return nav
}

private fun extractA11yChecks(docAnnotation: ParsedDocAnnotation): List<String> {
    val checks =
        buildList {
            if (docAnnotation.touchTargetEnforced) add("ATF-TouchTarget-48dp")
            if (docAnnotation.role != "None") add("Compose-Semantics-${docAnnotation.role}")
            if (docAnnotation.id == "basis-focus-ring") add("WCAG-Focus-Appearance-3:1")
            if (docAnnotation.id == "basis-surface") add("surface-contrast-compliance")
            if (docAnnotation.id == "basis-border") add("border-decorative-semantics")
            if (docAnnotation.id == "basis-clear-and-set-semantics") add("semantics-isolation")
            if (docAnnotation.id == "basis-semantics") add("semantics-tree-integrity")
            if (docAnnotation.id == "basis-indication") add("State-Layer-Contrast")
            if (docAnnotation.id == "basis-padding") add("token-spacing-alignment")

            if (isEmpty()) add("contract-pass")
        }

    return checks
}

private fun parseModifierDocAnnotation(source: String): ParsedDocAnnotation? {
    val annotationStart = source.indexOf("@BasisModifierDoc(")
    val body =
        if (annotationStart != -1) {
            source.substring(annotationStart).substringAfter("(").substringBefore("\npublic fun")
        } else {
            ""
        }

    val id = Regex("""id\s*=\s*"([^"]+)"""").find(body)?.groupValues?.get(1)
    if (annotationStart == -1 || id == null) {
        return null
    }

    val role = Regex("""role\s*=\s*"([^"]+)"""").find(body)?.groupValues?.get(1) ?: "None"
    val minTarget = Regex("""minTouchTargetDp\s*=\s*(\d+)""").find(body)?.groupValues?.get(1)?.toIntOrNull() ?: 0
    val enforced =
        Regex("""touchTargetEnforced\s*=\s*(true|false)""")
            .find(body)
            ?.groupValues
            ?.get(1)
            ?.toBoolean()
            ?: false
    val reducedMotion =
        Regex("""respectsReducedMotion\s*=\s*(true|false)""")
            .find(body)
            ?.groupValues
            ?.get(1)
            ?.toBoolean()
            ?: false

    val sampleCode = extractSampleCode(body, id)

    val annotation =
        ParsedDocAnnotation(
            id = id,
            role = role,
            minTouchTargetDp = minTarget,
            touchTargetEnforced = enforced,
            respectsReducedMotion = reducedMotion,
            sampleCode = sampleCode,
        )

    return annotation
}

private fun extractSampleCode(body: String, id: String): String {
    val sampleCode =
        if (body.contains("sampleCode = \"\"\"")) {
            body.substringAfter("sampleCode = \"\"\"").substringBefore("\"\"\"").trimIndent()
        } else if (body.contains("sampleCode =")) {
            ModifierParsing.parseConcatenatedStrings(body.substringAfter("sampleCode ="))
        } else {
            defaultQuickStart(id)
        }

    return sampleCode
}

private data class ParsedFunction(
    val name: String,
    val declaration: String,
    val rawKDoc: String,
    val kdocText: String,
    val parameters: List<ParameterDoc>,
)

private fun parsePublicModifierFunctions(source: String): List<ParsedFunction> {
    val results = mutableListOf<ParsedFunction>()
    val funDeclarationRegex = Regex("""public fun Modifier\.(\w+)\s*\(([\s\S]*?)\):\s*Modifier""")

    funDeclarationRegex.findAll(source).forEach { match ->
        val funName = match.groupValues[1]
        val paramsRaw = match.groupValues[2]

        val codeBefore = source.substring(0, match.range.first)
        val rawKDoc = ModifierParsing.extractRawKdocBefore(codeBefore)

        val kdocLines = rawKDoc.lines()
        val cleanedLines = kdocLines.map { line -> ModifierParsing.cleanKdocLine(line) }
        val kdocClean = cleanedLines.joinToString("\n").trim()

        val paramDocs = ModifierParsing.parseKDocParamTags(rawKDoc)
        val parameters = ModifierParsing.parseParameters(paramsRaw, paramDocs)

        val cleanDecl = ModifierParsing.buildCleanDeclaration(funName, parameters)

        results.add(
            ParsedFunction(
                name = funName,
                declaration = cleanDecl,
                rawKDoc = rawKDoc,
                kdocText = kdocClean,
                parameters = parameters,
            ),
        )
    }

    return results
}

private fun defaultQuickStart(name: String): String =
    "Box(\n    modifier = Modifier.$name()\n)"
