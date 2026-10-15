package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.test.assertThat
import io.gitlab.arturbosch.detekt.test.lint
import kotlin.test.Test

class MandatoryBracesTest {

    private val subject = MandatoryBraces(Config.empty)

    @Test
    fun `reports a single line loop body without braces`() {
        val code =
            """
            class A {
                fun f(items: List<Int>): Int {
                    var total = 0
                    for (item in items) total += item
                    return total
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `reports a while body without braces`() {
        val code =
            """
            class A {
                fun f(n: Int): Int {
                    var value = n
                    while (value > 0) value--
                    return value
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `does not report a braced loop body`() {
        val code =
            """
            class A {
                fun f(items: List<Int>): Int {
                    var total = 0
                    for (item in items) {
                        total += item
                    }
                    return total
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `reports a catch body without braces`() {
        val code =
            """
            class A {
                fun f(): Int {
                    return try {
                        0
                    } catch (e: Exception) 0
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `does not report a braced catch body`() {
        val code =
            """
            class A {
                fun f(): Int {
                    return try {
                        0
                    } catch (e: Exception) {
                        0
                    }
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }
}
