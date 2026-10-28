package io.github.alph_a07.basis.docs.extract

import java.io.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlinx.serialization.json.Json

class PatchVocabularyExtractorTest {

    private val overridesDir =
        File("../../basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/intent/controls/overrides")
            .takeIf { it.exists() }
            ?: File("basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/intent/controls/overrides")

    @Test
    fun extractsVocabularyMatchingUniversalFieldsAndExtraFamilies() {
        val extractor = PatchVocabularyExtractor(overridesDir)
        val doc = extractor.extract(commit = "test-commit")

        assertEquals(10, doc.universalFields.size, "Universal fields count must be 10")
        val fieldNames = doc.universalFields.map { it.name }.toSet()
        val expectedUniversal =
            setOf(
                "prominence",
                "treatment",
                "surface",
                "content",
                "border",
                "radius",
                "typography",
                "padding",
                "gap",
                "depth",
            )
        assertEquals(expectedUniversal, fieldNames)

        assertEquals(5, doc.extraFamilies.size, "Extra families count must be 5")
        val familyNames = doc.extraFamilies.map { it.family }.toSet()
        val expectedFamilies = setOf("Surface", "Icon", "Divider", "Interactive", "Spacer")

        assertEquals(expectedFamilies, familyNames)
    }

    @Test
    fun verifiesTokenPathLaddersPresent() {
        val extractor = PatchVocabularyExtractor(overridesDir)
        val doc = extractor.extract(commit = "test-commit")

        assertTrue(doc.pathTypes.isNotEmpty(), "Path types must not be empty")

        val colorPathType = doc.pathTypes.first { it.pathType == "ColorTokenPath" }
        assertEquals("color", colorPathType.prefix)
        assertTrue(colorPathType.ladder.contains("color.surface.default"))
        assertTrue(colorPathType.ladder.contains("color.brand.primary"))

        val radiusPathType = doc.pathTypes.first { it.pathType == "RadiusTokenPath" }
        val expectedLadder =
            listOf(
                "radius.none",
                "radius.level1",
                "radius.level2",
                "radius.level3",
                "radius.level4",
                "radius.level5",
                "radius.level6",
                "radius.level7",
                "radius.level8",
                "radius.full",
            )

        assertEquals(expectedLadder, radiusPathType.ladder)
    }

    @Test
    fun producesDeterministicByteIdenticalOutput() {
        val extractor = PatchVocabularyExtractor(overridesDir)
        val doc1 = extractor.extract(commit = "fixed-commit")
        val doc2 = extractor.extract(commit = "fixed-commit")

        val codec = Json { prettyPrint = true }
        val json1 = codec.encodeToString(PatchVocabularyDocument.serializer(), doc1)
        val json2 = codec.encodeToString(PatchVocabularyDocument.serializer(), doc2)

        assertEquals(json1, json2, "Output must be byte-identical across runs")
    }
}
