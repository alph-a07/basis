package io.github.alph_a07.basis.docs.extract

import java.io.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue
import kotlinx.serialization.json.Json

class IntentExtractorTest {

    private val intentDir =
        File("../../basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/intent")
            .takeIf { it.exists() }
            ?: File("basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/intent")

    @Test
    fun extractsRealVocabularyMatchingAppendixACounts() {
        val extractor = IntentExtractor(intentDir)
        val doc = extractor.extract(commit = "test-commit")

        assertEquals(4, doc.identity.presence.size, "BrandPresence count must be 4")
        assertEquals(3, doc.identity.supportingColors.max, "Supporting colors max must be 3")
        assertEquals(5, doc.identity.fields.size, "IdentityIntent fields count must be 5")

        assertEquals(7, doc.mood.presets.size, "MoodPreset count must be 7")
        assertEquals(8, doc.mood.knobs.size, "MoodKnobs count must be 8")

        assertEquals(10, doc.domain.domains.size, "ProductDomain count must be 10")
        assertEquals(11, doc.domain.interactions.size, "InteractionPattern count must be 11")

        assertEquals(5, doc.control.fields.size, "ControlIntent fields count must be 5")
    }

    @Test
    fun verifiesKnobNegativeAndPositiveLabels() {
        val extractor = IntentExtractor(intentDir)
        val doc = extractor.extract(commit = "test-commit")

        val warmthKnob = doc.mood.knobs.first { it.id == "warmth" }
        assertEquals("Cooler", warmthKnob.negativeLabel)
        assertEquals("warmer", warmthKnob.positiveLabel)
        assertEquals(-1.0, warmthKnob.min)
        assertEquals(1.0, warmthKnob.max)

        val contrastKnob = doc.mood.knobs.first { it.id == "contrast" }
        assertEquals("Softer", contrastKnob.negativeLabel)
        assertEquals("punchier", contrastKnob.positiveLabel)

        val expressivenessKnob = doc.mood.knobs.first { it.id == "typographyExpressiveness" }
        assertEquals("Restrained", expressivenessKnob.negativeLabel)
        assertEquals("display-forward", expressivenessKnob.positiveLabel)
    }

    @Test
    fun failsWhenKnobTowardLineIsMissing() {
        assertFailsWith<IllegalArgumentException> {
            KDocParser.parseTowardLabels("Just some description with no polar direction.")
        }
    }

    @Test
    fun producesDeterministicByteIdenticalOutput() {
        val extractor = IntentExtractor(intentDir)
        val doc1 = extractor.extract(commit = "fixed-commit")
        val doc2 = extractor.extract(commit = "fixed-commit")

        val codec = Json { prettyPrint = true }
        val json1 = codec.encodeToString(IntentDocument.serializer(), doc1)
        val json2 = codec.encodeToString(IntentDocument.serializer(), doc2)

        assertEquals(json1, json2, "Output must be byte-identical across runs")
        assertTrue(!json1.contains("[Balanced]"), "KDoc links must not contain brackets")
    }
}
