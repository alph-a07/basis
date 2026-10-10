package io.github.alph_a07.basis.ksp.knobs

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Pins the emitted knob entry-map source: package, internal visibility, stable dotted paths in
 * declaration order, and null-skipping `let` guards.
 */
internal class KnobEntriesEmitterTest {

    private val moodModel = KnobEntriesModel(
        packageName = "io.github.alph_a07.basis.theme.intent",
        receiverSimpleName = "MoodKnobs",
        entries = listOf(
            KnobEntry("warmth", "mood.knobs.warmth"),
            KnobEntry("chroma", "mood.knobs.chroma"),
        ),
    )

    @Test
    fun emitsInternalExtensionInReceiverPackage() {
        val source = KnobEntriesEmitter.emit(moodModel)
        assertTrue(source.startsWith("package io.github.alph_a07.basis.theme.intent\n"))
        assertTrue(source.contains("internal fun MoodKnobs.knobEntries(): Map<String, Float> = buildMap {"))
    }

    @Test
    fun emitsOneNullSkippingEntryPerAxisInOrder() {
        val source = KnobEntriesEmitter.emit(moodModel)
        val puts = source.lineSequence()
            .map { it.trim() }
            .filter { it.startsWith("warmth?.let") || it.startsWith("chroma?.let") }
            .toList()
        assertEquals(
            listOf(
                "warmth?.let { put(\"mood.knobs.warmth\", it) }",
                "chroma?.let { put(\"mood.knobs.chroma\", it) }",
            ),
            puts,
        )
    }
}
