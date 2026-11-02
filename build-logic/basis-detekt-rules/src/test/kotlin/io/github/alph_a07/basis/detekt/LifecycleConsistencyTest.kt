package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.test.assertThat
import io.gitlab.arturbosch.detekt.test.lint
import kotlin.test.Test

class LifecycleConsistencyTest {

    private val subject = LifecycleConsistency(Config.empty)

    @Test
    fun `passes on valid active lifecycle annotation`() {
        val code =
            """
            @Lifecycle(addedIn = "0.1.0")
            class MyComponent
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `passes on valid positional addedIn lifecycle annotation`() {
        val code =
            """
            @Lifecycle("0.1.0")
            class MyComponent
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `passes on valid deprecated warning declaration`() {
        val code =
            """
            @Deprecated("Use new API")
            @Lifecycle(addedIn = "0.1.0", deprecatedIn = "0.2.0")
            fun oldFun() {}
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `passes on valid discontinued error declaration`() {
        val code =
            """
            @Deprecated("Discontinued", level = DeprecationLevel.ERROR)
            @Lifecycle(addedIn = "0.1.0", discontinuedIn = "0.3.0")
            class DeadComponent
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `passes on valid discontinued hidden declaration`() {
        val code =
            """
            @Deprecated("Discontinued", level = DeprecationLevel.HIDDEN)
            @Lifecycle(addedIn = "0.1.0", discontinuedIn = "0.3.0")
            class HiddenComponent
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `reports invalid or missing addedIn semver`() {
        val missing =
            """
            @Lifecycle(addedIn = "")
            class BrokenComponent
            """.trimIndent()
        assertThat(subject.lint(missing)).hasSize(1)

        val invalidSemver =
            """
            @Lifecycle(addedIn = "v1")
            class BrokenComponent
            """.trimIndent()
        assertThat(subject.lint(invalidSemver)).hasSize(1)
    }

    @Test
    fun `reports deprecatedIn without Deprecated annotation`() {
        val code =
            """
            @Lifecycle(addedIn = "0.1.0", deprecatedIn = "0.2.0")
            fun orphanDeprecated() {}
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `reports discontinuedIn without Deprecated annotation`() {
        val code =
            """
            @Lifecycle(addedIn = "0.1.0", discontinuedIn = "0.3.0")
            fun orphanDiscontinued() {}
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `reports Deprecated warning missing deprecatedIn on Lifecycle`() {
        val code =
            """
            @Deprecated("Old")
            @Lifecycle(addedIn = "0.1.0")
            fun missingDepIn() {}
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `reports Deprecated error missing discontinuedIn on Lifecycle`() {
        val code =
            """
            @Deprecated("Removed", level = DeprecationLevel.ERROR)
            @Lifecycle(addedIn = "0.1.0")
            fun missingDiscontinuedIn() {}
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `reports deprecatedIn combined with DeprecationLevel ERROR`() {
        val code =
            """
            @Deprecated("Dead", level = DeprecationLevel.ERROR)
            @Lifecycle(addedIn = "0.1.0", deprecatedIn = "0.2.0")
            fun mismatchedLevel() {}
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(2)
    }

    @Test
    fun `reports discontinuedIn combined with DeprecationLevel WARNING`() {
        val code =
            """
            @Deprecated("Warning only")
            @Lifecycle(addedIn = "0.1.0", discontinuedIn = "0.3.0")
            fun mismatchedLevel() {}
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(2)
    }

    @Test
    fun `reports Deprecated annotation on declaration missing Lifecycle`() {
        val code =
            """
            @Deprecated("Use other")
            fun noLifecycle() {}
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }
}
