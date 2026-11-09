package io.github.alph_a07.basis.docs.extract

import java.io.File
import java.nio.file.Files
import kotlin.test.Test
import kotlin.test.assertTrue

/**
 * Guardrail test for [ComponentExtractor].
 *
 * Ensures that `@BasisComponentDoc.quickStartSample` values that use Kotlin string
 * concatenation (e.g. `"..." + "..."`) are fully extracted and not truncated at the
 * first string literal. Without this, generated docs pages render cut-off code blocks.
 */
class ComponentExtractorTest {

    @Test
    fun concatenatedQuickStartSampleIsComplete() {
        val tempDir = Files.createTempDirectory("component-extractor-test").toFile()

        try {
            val testFile = File(tempDir, "TestSampleComponent.kt")
            testFile.writeText(
                """
                package io.github.alph_a07.basis.components.test

                import io.github.alph_a07.basis.components.annotation.BasisComponentDoc

                /**
                 * Test component doc.
                 */
                @BasisComponentDoc(
                    id = "test-sample",
                    family = "Foundation",
                    role = "Button",
                    minTouchTargetDp = 48,
                    respectsReducedMotion = true,
                    quickStartSample =
                        "TestComponent(\n    onClick = { /* action */ },\n)" +
                            "\n    .testModifier()",
                )
                public class TestSampleComponent
                """.trimIndent(),
            )

            val extractor = ComponentExtractor(tempDir)
            val entries = extractor.extractAll(commit = "test-commit")

            val entry = entries.first { it.id == "test-sample" }
            val sample = entry.overview.quickStartSample

            assertTrue(
                sample.trimEnd().endsWith(".testModifier()"),
                "sample is truncated: $sample",
            )

            assertTrue(
                sample.contains("TestComponent"),
                "sample missing first part: $sample",
            )
        } finally {
            tempDir.deleteRecursively()
        }
    }
}
