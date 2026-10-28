package io.github.alph_a07.basis.theme.interchange

import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.report.ResolutionReport
import io.github.alph_a07.basis.theme.resolution.report.ThemeViolation
import kotlinx.serialization.json.Json

/**
 * JSON interchange serialization for intent models, resolution reports, and violations.
 */
public object ThemeInterchange {

    /** Configured [Json] instance for encoding and decoding theme data. */
    public val json: Json =
        Json {
            ignoreUnknownKeys = true
            isLenient = true
            allowStructuredMapKeys = true
            encodeDefaults = false

            allowSpecialFloatingPointValues = true
        }

    /**
     * Decodes a [BasisIntent] from a JSON string.
     *
     * @param jsonString Serialized JSON string of the intent.
     * @return Deserialized [BasisIntent].
     */
    public fun decodeIntent(jsonString: String): BasisIntent =
        json.decodeFromString(BasisIntent.serializer(), jsonString)

    /**
     * Encodes a [BasisIntent] to a JSON string.
     *
     * @param intent Intent to serialize.
     * @return Serialized JSON string.
     */
    public fun encodeIntent(intent: BasisIntent): String =
        json.encodeToString(BasisIntent.serializer(), intent)

    /**
     * Decodes a [ResolutionReport] from a JSON string.
     *
     * @param jsonString Serialized JSON string of the report.
     * @return Deserialized [ResolutionReport].
     */
    public fun decodeReport(jsonString: String): ResolutionReport =
        json.decodeFromString(ResolutionReport.serializer(), jsonString)

    /**
     * Encodes a [ResolutionReport] to a JSON string.
     *
     * @param report Resolution report to serialize.
     * @return Serialized JSON string.
     */
    public fun encodeReport(report: ResolutionReport): String =
        json.encodeToString(ResolutionReport.serializer(), report)

    /**
     * Decodes a list of [ThemeViolation]s from a JSON string.
     *
     * @param jsonString Serialized JSON string of the violations.
     * @return Deserialized list of [ThemeViolation]s.
     */
    public fun decodeViolations(jsonString: String): List<ThemeViolation> =
        json.decodeFromString(jsonString)

    /**
     * Encodes a list of [ThemeViolation]s to a JSON string.
     *
     * @param violations List of violations to serialize.
     * @return Serialized JSON string.
     */
    public fun encodeViolations(violations: List<ThemeViolation>): String =
        json.encodeToString(violations)
}
