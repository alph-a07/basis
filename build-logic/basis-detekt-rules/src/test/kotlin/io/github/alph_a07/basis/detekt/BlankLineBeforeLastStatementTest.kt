package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.test.assertThat
import io.gitlab.arturbosch.detekt.test.lint
import kotlin.test.Test

class BlankLineBeforeLastStatementTest {

    private val subject = BlankLineBeforeLastStatement(Config.empty)

    @Test
    fun `reports a last statement packed against the preceding statement`() {
        val code =
            """
            class A {
                fun f(): Int {
                    val x = 1
                    x
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `does not report a last statement separated by a blank line`() {
        val code =
            """
            class A {
                fun f(): Int {
                    val x = 1

                    x
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `does not report a block with a single statement`() {
        val code =
            """
            class A {
                fun f(): Int {
                    return 1
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `does not report a return as the last statement`() {
        val code =
            """
            class A {
                fun f(): Int {
                    val x = 1
                    return x
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `reports a last statement packed against the preceding statement in an if body`() {
        val code =
            """
            class A {
                fun f(items: List<Int>): Int {
                    if (items.isEmpty()) {
                        val fallback = 0
                        fallback
                    }
                    return items.size
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `does not report a return that is the last statement of a braced if body`() {
        val code =
            """
            class A {
                fun f(items: List<Int>): Int {
                    if (items.isEmpty()) {
                        return 0
                    }
                    return items.size
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `does not report statements in configuration lambdas`() {
        val code =
            """
            publishing {
                licenses {
                    license {
                        name.set("The Apache License, Version 2.0")
                        url.set("https://www.apache.org/licenses/LICENSE-2.0.txt")
                    }
                }

                scm {
                    url.set("https://github.com/alph-a07/basis")
                    connection.set("scm:git:git://github.com/alph-a07/basis.git")
                    developerConnection.set("scm:git:ssh://git@github.com/alph-a07/basis.git")
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `does not report the last statement in a Gradle script`() {
        val code =
            """
            rootProject.name = "Basis"
            include(":demo-app")
            include(":basis-theme")
            include(":basis-components")
            include(":basis-lint")
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }
}
