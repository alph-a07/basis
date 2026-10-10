package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.test.assertThat
import io.gitlab.arturbosch.detekt.test.lint
import kotlin.test.Test

class BlankLineBeforeReturnTest {

    private val subject = BlankLineBeforeReturn(Config.empty)

    @Test
    fun `reports a return packed against the statement above it`() {
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

        assertThat(subject.lint(code)).hasSize(1)
    }

    @Test
    fun `does not report a return separated by a blank line`() {
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
    fun `does not report the first return in a block`() {
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
    fun `does not report a return that is the only statement of an if body`() {
        val code =
            """
            class A {
                fun f(items: List<Int>): Int {
                    if (items.isEmpty()) return 0

                    return items.size
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `does not report a return that is the only statement of a braced if body`() {
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
    fun `does not report a return that is the only statement of an else body`() {
        val code =
            """
            class A {
                fun f(items: List<Int>): Int {
                    if (items.isEmpty()) {
                        0
                    } else {
                        return items.size
                    }
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `does not report a return that is the only statement of a when entry`() {
        val code =
            """
            class A {
                fun f(value: Int): Int = when (value) {
                    0 -> return 0
                    else -> value
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).isEmpty()
    }

    @Test
    fun `reports a return that follows another statement inside the same control flow body`() {
        val code =
            """
            class A {
                fun f(items: List<Int>): Int {
                    if (items.isEmpty()) {
                        val fallback = 0
                        return fallback
                    }

                    return items.size
                }
            }
            """.trimIndent()

        assertThat(subject.lint(code)).hasSize(1)
    }
}
