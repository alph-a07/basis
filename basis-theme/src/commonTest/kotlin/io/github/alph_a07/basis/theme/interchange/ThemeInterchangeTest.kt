package io.github.alph_a07.basis.theme.interchange

import io.github.alph_a07.basis.theme.resolution.parity.ParityCorpus
import io.github.alph_a07.basis.theme.resolution.parity.captureThemeSnapshot
import io.github.alph_a07.basis.theme.resolution.report.ThemeViolation
import io.github.alph_a07.basis.theme.resolution.report.violations
import io.github.alph_a07.basis.theme.resolution.resolve
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ThemeInterchangeTest {

    @Test
    fun roundTripsEntireParityCorpusIntents() {
        assertTrue(ParityCorpus.cases.isNotEmpty(), "Corpus should not be empty.")

        for (case in ParityCorpus.cases) {
            val encodedJson = ThemeInterchange.encodeIntent(case.intent)
            val decodedIntent = ThemeInterchange.decodeIntent(encodedJson)

            assertEquals(
                case.intent,
                decodedIntent,
                "Intent structural mismatch for case '${case.id}'.",
            )

            val originalResolved = resolve(case.intent)
            val decodedResolved = resolve(decodedIntent)

            assertEquals(
                captureThemeSnapshot(originalResolved),
                captureThemeSnapshot(decodedResolved),
                "Resolution output mismatch after round-trip for case '${case.id}'.",
            )
        }
    }

    @Test
    fun roundTripsEntireParityCorpusResolutionReports() {
        for (case in ParityCorpus.cases) {
            val originalPair = resolve(case.intent)
            val encodedReport = ThemeInterchange.encodeReport(originalPair.report)
            val decodedReport = ThemeInterchange.decodeReport(encodedReport)

            assertEquals(
                originalPair.report,
                decodedReport,
                "Report structural mismatch for case '${case.id}'.",
            )
        }
    }

    @Test
    fun roundTripsViolationsFromCorpusAndCustom() {
        var foundViolations = false

        for (case in ParityCorpus.cases) {
            val pair = resolve(case.intent)
            val violations = pair.report.violations()

            if (violations.isNotEmpty()) {
                foundViolations = true
                val json = ThemeInterchange.encodeViolations(violations)
                val decoded = ThemeInterchange.decodeViolations(json)

                assertEquals(
                    violations,
                    decoded,
                    "Violations mismatch for case '${case.id}'.",
                )
            }
        }

        assertTrue(foundViolations, "Expected at least one corpus case to produce violations.")

        val customViolations =
            listOf(
                ThemeViolation(path = "identity.brandColor", message = "Invalid color format."),
                ThemeViolation(path = "mood.knobs.warmth", message = "Value out of range [-1, 1]."),
            )
        val customJson = ThemeInterchange.encodeViolations(customViolations)
        val customDecoded = ThemeInterchange.decodeViolations(customJson)

        assertEquals(customViolations, customDecoded)
    }
}
