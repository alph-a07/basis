package io.github.alph_a07.basis.docs.extract

import java.io.File

/**
 * Extracts intent vocabulary from basis-theme Kotlin sources and KDoc.
 *
 * @property intentSourceDir Directory containing intent Kotlin source files.
 */
public class IntentExtractor(
    private val intentSourceDir: File,
) {

    /**
     * Extracts the complete [IntentDocument].
     *
     * @param commit Current git commit SHA.
     * @return Fully populated [IntentDocument].
     */
    public fun extract(commit: String): IntentDocument {
        val identityFile = File(intentSourceDir, "IdentityIntent.kt")
        val moodFile = File(intentSourceDir, "MoodIntent.kt")
        val domainFile = File(intentSourceDir, "DomainIntent.kt")
        val controlFile = File(intentSourceDir, "ControlIntent.kt")

        require(identityFile.exists()) { "Missing IdentityIntent.kt in $intentSourceDir" }
        require(moodFile.exists()) { "Missing MoodIntent.kt in $intentSourceDir" }
        require(domainFile.exists()) { "Missing DomainIntent.kt in $intentSourceDir" }
        require(controlFile.exists()) { "Missing ControlIntent.kt in $intentSourceDir" }

        val identityDoc = extractIdentity(identityFile.readText())
        val moodDoc = extractMood(moodFile.readText())
        val domainDoc = extractDomain(domainFile.readText())
        val controlDoc = extractControl(controlFile.readText())

        return IntentDocument(
            schemaVersion = "0.2.0",
            provenance = "generated",
            source = SourceCommit(commit = commit),
            identity = identityDoc,
            mood = moodDoc,
            domain = domainDoc,
            control = controlDoc,
        )
    }

    private fun extractIdentity(source: String): IdentityDoc {
        val presenceEntries = KDocParser.parseEnumEntries(source.substringAfter("enum class BrandPresence"))
        require(presenceEntries.size == BRAND_PRESENCE_COUNT) {
            "Expected $BRAND_PRESENCE_COUNT BrandPresence entries, found ${presenceEntries.size}"
        }

        val presenceChoices =
            presenceEntries.map { (id, summary) ->
                ChoiceDoc(id = id, label = KDocParser.formatLabel(id), summary = summary)
            }

        val propTags = KDocParser.parsePropertyTags(source.substringBefore("public data class IdentityIntent"))
        val fields =
            listOf("brandColor", "supportingColors", "presence", "typography", "deriveColors").map { fieldId ->
                val summary = propTags[fieldId]?.let { KDocParser.extractFirstSentence(it) }.orEmpty()

                FieldDoc(id = fieldId, label = KDocParser.formatLabel(fieldId), summary = summary)
            }

        return IdentityDoc(
            presence = presenceChoices,
            supportingColors = SupportingColorsDoc(max = SUPPORTING_COLORS_MAX),
            fields = fields,
        )
    }

    private fun extractMood(source: String): MoodDoc {
        val presetEntries = KDocParser.parseEnumEntries(source.substringAfter("enum class MoodPreset"))
        require(presetEntries.size == MOOD_PRESET_COUNT) {
            "Expected $MOOD_PRESET_COUNT MoodPreset entries, found ${presetEntries.size}"
        }

        val presetChoices =
            presetEntries.map { (id, summary) ->
                ChoiceDoc(id = id, label = KDocParser.formatLabel(id), summary = summary)
            }

        val knobsKdoc =
            source.substringAfter("public data class MoodKnobs")
                .let { source.substringBefore("public data class MoodKnobs").substringAfterLast("/**") }
        val propTags = KDocParser.parsePropertyTags(knobsKdoc)

        val knobIds =
            listOf(
                "warmth",
                "chroma",
                "contrast",
                "density",
                "roundness",
                "typographyExpressiveness",
                "motionEnergy",
                "playfulness",
            )
        require(knobIds.size == MOOD_KNOBS_COUNT) { "Expected $MOOD_KNOBS_COUNT knob axes" }

        val knobs =
            knobIds.map { knobId ->
                val rawDoc = propTags[knobId] ?: throw IllegalArgumentException("Missing KDoc for knob axis: $knobId")
                val (neg, pos) = KDocParser.parseTowardLabels(rawDoc)
                val summary = KDocParser.extractFirstSentence(rawDoc)

                KnobDoc(
                    id = knobId,
                    label = KDocParser.formatLabel(knobId),
                    summary = summary,
                    negativeLabel = neg,
                    positiveLabel = pos,
                    min = -1.0,
                    max = 1.0,
                )
            }

        return MoodDoc(
            presets = presetChoices,
            knobs = knobs,
        )
    }

    private fun extractDomain(source: String): DomainDoc {
        val domainEntries = KDocParser.parseEnumEntries(source.substringAfter("enum class ProductDomain"))
        require(domainEntries.size == PRODUCT_DOMAIN_COUNT) {
            "Expected $PRODUCT_DOMAIN_COUNT ProductDomain entries, found ${domainEntries.size}"
        }
        val domains =
            domainEntries.map { (id, summary) ->
                ChoiceDoc(id = id, label = KDocParser.formatLabel(id), summary = summary)
            }

        val interactionEntries = KDocParser.parseEnumEntries(source.substringAfter("enum class InteractionPattern"))
        require(interactionEntries.size == INTERACTION_PATTERN_COUNT) {
            "Expected $INTERACTION_PATTERN_COUNT InteractionPattern entries, found ${interactionEntries.size}"
        }
        val interactions =
            interactionEntries.map { (id, summary) ->
                ChoiceDoc(id = id, label = KDocParser.formatLabel(id), summary = summary)
            }

        return DomainDoc(
            domains = domains,
            interactions = interactions,
        )
    }

    private fun extractControl(source: String): ControlDoc {
        val controlKdoc = source.substringBefore("public data class ControlIntent").substringAfterLast("/**")
        val propTags = KDocParser.parsePropertyTags(controlKdoc)

        val fields =
            listOf("tokens", "components", "mode", "fonts", "constraints").map { fieldId ->
                val summary = propTags[fieldId]?.let { KDocParser.extractFirstSentence(it) }.orEmpty()

                FieldDoc(id = fieldId, label = KDocParser.formatLabel(fieldId), summary = summary)
            }

        return ControlDoc(fields = fields)
    }
}

private const val BRAND_PRESENCE_COUNT = 4
private const val SUPPORTING_COLORS_MAX = 3
private const val MOOD_PRESET_COUNT = 7
private const val MOOD_KNOBS_COUNT = 8
private const val PRODUCT_DOMAIN_COUNT = 10
private const val INTERACTION_PATTERN_COUNT = 11
