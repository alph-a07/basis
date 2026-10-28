package io.github.alph_a07.basis.theme.resolution.parity

import io.github.alph_a07.basis.theme.resolution.resolve
import kotlin.test.Test
import kotlin.test.assertTrue

class ParityCorpusTest {

    @Test
    fun assertsCorpusMatchesGolden() {
        assertTrue(PARITY_GOLDENS.isNotEmpty(), "Parity goldens are empty. Run ./gradlew :basis-theme:updateGolden")
        val mismatches = mutableListOf<String>()

        for (case in ParityCorpus.cases) {
            val expected = PARITY_GOLDENS[case.id]
            checkNotNull(expected) {
                "Missing parity golden for case '${case.id}'. Run ./gradlew :basis-theme:updateGolden"
            }

            val pair = resolve(case.intent)
            val actual = captureThemeSnapshot(pair)

            if (expected != actual) {
                mismatches += collectDiffs(case.id, expected, actual)
            }
        }

        assertTrue(
            mismatches.isEmpty(),
            "Found ${mismatches.size} mismatches across corpus:\n" + mismatches.joinToString("\n"),
        )
    }

    private fun collectDiffs(caseId: String, expected: String, actual: String): List<String> {
        val diffs = mutableListOf<String>()
        val expLines = expected.lines()
        val actLines = actual.lines()
        for (i in 0 until maxOf(expLines.size, actLines.size)) {
            val exp = expLines.getOrNull(i)
            val act = actLines.getOrNull(i)
            if (exp != act) {
                diffs += "CASE '$caseId' line $i:\n  expected: '$exp'\n  actual:   '$act'"
            }
        }

        return diffs
    }
}
