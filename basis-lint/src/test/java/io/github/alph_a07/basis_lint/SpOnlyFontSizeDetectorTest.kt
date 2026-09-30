package io.github.alph_a07.basis_lint

import com.android.tools.lint.checks.infrastructure.LintDetectorTest
import com.android.tools.lint.checks.infrastructure.TestFile
import com.android.tools.lint.detector.api.Detector
import com.android.tools.lint.detector.api.Issue

/**
 * The stubs declare no Android dependencies, so each task opts out of the SDK lookup and of
 * compilation of the synthetic sources; `allowCompilationErrors` then tolerates the sp arguments
 * the type-error cases deliberately pass.
 *
 * [LintDetectorTest] descends from JUnit 3's `TestCase`, so cases are discovered by the `test` name
 * prefix and `@Test` is inert. Test methods therefore keep the prefix and carry no annotation.
 */
class SpOnlyFontSizeDetectorTest : LintDetectorTest() {

    override fun getDetector(): Detector = SpOnlyFontSizeDetector()

    override fun getIssues(): List<Issue> = listOf(SpOnlyFontSizeDetector.ISSUE)

    fun testDpFontSizeIsReported() {
        lint()
            .files(
                COMPOSE_STUBS,
                TYPOGRAPHY_STUBS,
                kotlin(
                    """
                    package test

                    import androidx.compose.ui.text.scaled
                    import androidx.compose.ui.unit.dp

                    val style = scaled(fontSize = 16.dp, lineHeight = 24.dp, letterSpacing = 0.5.dp)
                    """,
                ),
            )
            .allowMissingSdk()
            .allowCompilationErrors()
            .run()
            .expectErrorCount(3)
            .expectContains("SpOnlyFontSize")
    }

    fun testSpFontSizeIsNotReported() {
        lint()
            .files(
                COMPOSE_STUBS,
                TYPOGRAPHY_STUBS,
                kotlin(
                    """
                    package test

                    import androidx.compose.ui.text.scaled
                    import androidx.compose.ui.unit.sp

                    val style = scaled(fontSize = 16.sp, lineHeight = 24.sp, letterSpacing = 0.5.sp)
                    """,
                ),
            )
            .allowMissingSdk()
            .allowCompilationErrors()
            .run()
            .expectClean()
    }

    fun testPositionalDpFontSizeIsReported() {
        lint()
            .files(
                COMPOSE_STUBS,
                TYPOGRAPHY_STUBS,
                kotlin(
                    """
                    package test

                    import androidx.compose.ui.text.scaled
                    import androidx.compose.ui.unit.dp
                    import androidx.compose.ui.unit.sp

                    val style = scaled(16.dp, 24.sp, 0.5.sp)
                    """,
                ),
            )
            .allowMissingSdk()
            .allowCompilationErrors()
            .run()
            .expectErrorCount(1)
    }

    fun testUnrelatedDpValuesAreNotReported() {
        lint()
            .files(
                COMPOSE_STUBS,
                TYPOGRAPHY_STUBS,
                kotlin(
                    """
                    package test

                    import androidx.compose.ui.unit.Dp
                    import androidx.compose.ui.unit.dp

                    val size: Dp = 16.dp
                    val padding: Dp = 8.dp
                    """,
                ),
            )
            .allowMissingSdk()
            .allowCompilationErrors()
            .run()
            .expectClean()
    }

    fun testNonFontSizeParametersAreNotReported() {
        lint()
            .files(
                COMPOSE_STUBS,
                TYPOGRAPHY_STUBS,
                kotlin(
                    """
                    package test

                    import androidx.compose.ui.text.padded
                    import androidx.compose.ui.unit.dp

                    val box = padded(width = 16.dp, height = 8.dp)
                    """,
                ),
            )
            .allowMissingSdk()
            .allowCompilationErrors()
            .run()
            .expectClean()
    }

    fun testMessageSuggestsTheSpRewrite() {
        lint()
            .files(
                COMPOSE_STUBS,
                TYPOGRAPHY_STUBS,
                kotlin(
                    """
                    package test

                    import androidx.compose.ui.text.scaled
                    import androidx.compose.ui.unit.dp
                    import androidx.compose.ui.unit.sp

                    val style = scaled(fontSize = 16.dp, lineHeight = 24.sp, letterSpacing = 0.5.sp)
                    """,
                ),
            )
            .allowMissingSdk()
            .allowCompilationErrors()
            .run()
            .expectContains("16.sp")
    }

    private companion object {
        val COMPOSE_STUBS: TestFile = kotlin(
            """
            package androidx.compose.ui.unit

            @JvmInline
            value class Dp(val value: Float)

            @JvmInline
            value class TextUnit(val value: Float)

            val Int.dp: Dp get() = Dp(this.toFloat())
            val Float.dp: Dp get() = Dp(this)
            val Int.sp: TextUnit get() = TextUnit(this.toFloat())
            val Float.sp: TextUnit get() = TextUnit(this)
            """,
        ).indented()

        /**
         * Stands in for typography and layout helpers that accept a `Dp` for sizing.
         *
         * Compose's own `TextStyle` types `fontSize` as a `TextUnit`, so a raw `16.dp` in that
         * position fails to compile. A helper or Basis component that accepts a `Dp` compiles
         * cleanly, and that is where a dp font size slips in.
         */
        val TYPOGRAPHY_STUBS: TestFile = kotlin(
            """
            package androidx.compose.ui.text

            import androidx.compose.ui.unit.Dp
            import androidx.compose.ui.unit.TextUnit

            class TextStyle(fontSize: TextUnit, lineHeight: TextUnit, letterSpacing: TextUnit)

            fun scaled(fontSize: Dp, lineHeight: Dp, letterSpacing: Dp): TextStyle =
                TextStyle(TextUnit(0f), TextUnit(0f), TextUnit(0f))

            fun padded(width: Dp, height: Dp): TextStyle =
                TextStyle(TextUnit(0f), TextUnit(0f), TextUnit(0f))
            """,
        ).indented()
    }
}
