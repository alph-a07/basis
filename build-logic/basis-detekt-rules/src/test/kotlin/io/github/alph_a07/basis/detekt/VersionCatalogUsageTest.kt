package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.test.lint
import kotlin.test.Test
import org.assertj.core.api.Assertions.assertThat

class VersionCatalogUsageTest {

    private val rule = VersionCatalogUsage(io.gitlab.arturbosch.detekt.api.Config.empty)

    @Test
    fun `literal dependency coordinates are reported`() {
        val findings =
            rule.lint(
                """
            plugins {
                id("com.android.library")
            }

            dependencies {
                implementation("org.assertj:assertj-core:3.27.7")
            }
                """.trimIndent(),
            )

        assertThat(findings).hasSize(1)
        assertThat(findings.first().issue.id).isEqualTo("VersionCatalogUsage")
    }

    @Test
    fun `catalog dependency reference is allowed`() {
        val findings =
            rule.lint(
                """
            dependencies {
                testImplementation(libs.junit)
            }
                """.trimIndent(),
            )

        assertThat(findings).isEmpty()
    }

    @Test
    fun `detektPlugins literal coordinates are reported`() {
        val findings =
            rule.lint(
                """
            dependencies {
                detektPlugins("io.github.alph-a07:basis-detekt-rules:0.1.0")
            }
                """.trimIndent(),
            )

        assertThat(findings).hasSize(1)
        assertThat(findings.first().issue.id).isEqualTo("VersionCatalogUsage")
    }

    @Test
    fun `plugin literal version is reported`() {
        val findings =
            rule.lint(
                """
            plugins {
                id("com.android.application") version "8.0.0"
            }
                """.trimIndent(),
            )

        assertThat(findings).hasSize(1)
    }

    @Test
    fun `plugin without version is allowed`() {
        val findings =
            rule.lint(
                """
            plugins {
                alias(libs.plugins.detekt)
            }
                """.trimIndent(),
            )

        assertThat(findings).isEmpty()
    }
}
