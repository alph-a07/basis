package io.github.alph_a07.basis.docs.extract

import io.github.alph_a07.basis.theme.intent.controls.overrides.ProminenceTier
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import java.io.File

/**
 * Extracts patch vocabulary and token ladders from basis-theme sources.
 *
 * @property overridesSourceDir Directory containing component override and patch Kotlin sources.
 */
public class PatchVocabularyExtractor(
    private val overridesSourceDir: File,
) {

    /**
     * Extracts the complete [PatchVocabularyDocument].
     *
     * @param commit Current git commit SHA.
     * @return Fully populated [PatchVocabularyDocument].
     */
    public fun extract(commit: String): PatchVocabularyDocument {
        val universalFile = File(overridesSourceDir, "UniversalStylePatch.kt")
        val extraFile = File(overridesSourceDir, "ComponentExtraPatch.kt")

        require(universalFile.exists()) { "Missing UniversalStylePatch.kt in $overridesSourceDir" }
        require(extraFile.exists()) { "Missing ComponentExtraPatch.kt in $overridesSourceDir" }

        val universalFields = extractUniversalFields(universalFile.readText())
        val extraFamilies = extractExtraFamilies()
        val pathTypes = extractPathTypes()

        return PatchVocabularyDocument(
            schemaVersion = "0.2.0",
            provenance = "generated",
            source = SourceCommit(commit = commit),
            universalFields = universalFields,
            extraFamilies = extraFamilies,
            pathTypes = pathTypes,
        )
    }

    private fun extractUniversalFields(source: String): List<UniversalFieldDoc> {
        val classKdoc = source.substringBefore("public data class UniversalStylePatch").substringAfterLast("/**")
        val propTags = KDocParser.parsePropertyTags(classKdoc)

        val enumFields =
            listOf(
                UniversalFieldDoc(
                    name = "prominence",
                    type = "enum",
                    typeName = "ProminenceTier",
                    summary = KDocParser.extractFirstSentence(propTags["prominence"].orEmpty()),
                    values = ProminenceTier.entries.map { it.name },
                ),
                UniversalFieldDoc(
                    name = "treatment",
                    type = "enum",
                    typeName = "Treatment",
                    summary = KDocParser.extractFirstSentence(propTags["treatment"].orEmpty()),
                    values = Treatment.entries.map { it.name },
                ),
            )

        val pathFields =
            listOf(
                createUniversalPathDoc("surface", "ColorTokenPath", propTags),
                createUniversalPathDoc("content", "ColorTokenPath", propTags),
                createUniversalPathDoc("border", "ColorTokenPath", propTags),
                createUniversalPathDoc("radius", "RadiusTokenPath", propTags),
                createUniversalPathDoc("typography", "TypographyTokenPath", propTags),
                createUniversalPathDoc("padding", "SpacingTokenPath", propTags),
                createUniversalPathDoc("gap", "SpacingTokenPath", propTags),
                createUniversalPathDoc("depth", "DepthTokenPath", propTags),
            )

        val fields = enumFields + pathFields
        require(fields.size == UNIVERSAL_FIELDS_COUNT) {
            "Expected $UNIVERSAL_FIELDS_COUNT universal fields, found ${fields.size}"
        }

        return fields
    }

    private fun createUniversalPathDoc(
        name: String,
        pathType: String,
        propTags: Map<String, String>,
    ): UniversalFieldDoc = UniversalFieldDoc(
        name = name,
        type = "tokenPath",
        pathType = pathType,
        summary = KDocParser.extractFirstSentence(propTags[name].orEmpty()),
    )

    private fun extractExtraFamilies(): List<ExtraFamilyDoc> {
        val families =
            listOf(
                createSurfaceFamilyDoc(),
                createIconFamilyDoc(),
                createDividerFamilyDoc(),
                createInteractiveFamilyDoc(),
                createSpacerFamilyDoc(),
            )

        require(families.size == EXTRA_FAMILIES_COUNT) {
            "Expected $EXTRA_FAMILIES_COUNT extra families, found ${families.size}"
        }

        return families
    }

    private fun createSurfaceFamilyDoc(): ExtraFamilyDoc = ExtraFamilyDoc(
        family = "Surface",
        summary = "Surface-family fields beyond the universal patch.",
        fields =
            listOf(
                ExtraFieldDoc(
                    "depth",
                    "tokenPath",
                    "DepthTokenPath",
                    "Depth level path defining elevation and shadow.",
                ),
                ExtraFieldDoc(
                    name = "borderWidth",
                    type = "tokenPath",
                    pathType = "SpacingTokenPath",
                    summary = "Border stroke thickness path.",
                ),
            ),
    )

    private fun createIconFamilyDoc(): ExtraFamilyDoc = ExtraFamilyDoc(
        family = "Icon",
        summary = "Icon-family fields beyond the universal patch.",
        fields =
            listOf(
                ExtraFieldDoc(
                    "size",
                    "tokenPath",
                    "IconSizeTokenPath",
                    "Icon size level path from the theme size ladder.",
                ),
            ),
    )

    private fun createDividerFamilyDoc(): ExtraFamilyDoc = ExtraFamilyDoc(
        family = "Divider",
        summary = "Divider-family fields beyond the universal patch.",
        fields =
            listOf(
                ExtraFieldDoc(
                    name = "thickness",
                    type = "tokenPath",
                    pathType = "SpacingTokenPath",
                    summary = "Divider stroke thickness path.",
                ),
            ),
    )

    private fun createInteractiveFamilyDoc(): ExtraFamilyDoc = ExtraFamilyDoc(
        family = "Interactive",
        summary = "Interactive affordance fields beyond the universal patch.",
        fields =
            listOf(
                ExtraFieldDoc(
                    "motion",
                    "tokenPath",
                    "MotionTokenPath",
                    "Motion purpose path for interaction indication.",
                ),
            ),
    )

    private fun createSpacerFamilyDoc(): ExtraFamilyDoc = ExtraFamilyDoc(
        family = "Spacer",
        summary = "Spacer-family fields beyond the universal patch.",
        fields =
            listOf(
                ExtraFieldDoc("size", "tokenPath", "SpacingTokenPath", "Spacing ladder path defining spacer extent."),
            ),
    )

    private fun extractPathTypes(): List<PathTypeDoc> = listOf(
        PathTypeDoc("ColorTokenPath", "color", ColorTokenPath.entries.map { it.path }),
        PathTypeDoc("DepthTokenPath", "depth", DepthTokenPath.entries.map { it.path }),
        PathTypeDoc("RadiusTokenPath", "radius", RadiusTokenPath.entries.map { it.path }),
        PathTypeDoc("SpacingTokenPath", "spacing", SpacingTokenPath.entries.map { it.path }),
        PathTypeDoc("TypographyTokenPath", "typography", TypographyTokenPath.entries.map { it.path }),
        PathTypeDoc("IconSizeTokenPath", "size.icon", IconSizeTokenPath.entries.map { it.path }),
        PathTypeDoc("MotionTokenPath", "motion", MotionTokenPath.entries.map { it.path }),
        PathTypeDoc("ControlSizeTokenPath", "size.control", ControlSizeTokenPath.entries.map { it.path }),
    )
}

private const val UNIVERSAL_FIELDS_COUNT = 10
private const val EXTRA_FAMILIES_COUNT = 5
