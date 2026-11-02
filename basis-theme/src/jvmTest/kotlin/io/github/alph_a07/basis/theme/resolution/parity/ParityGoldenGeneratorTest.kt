package io.github.alph_a07.basis.theme.resolution.parity

import io.github.alph_a07.basis.theme.resolution.resolve
import java.io.File
import kotlin.test.Test

class ParityGoldenGeneratorTest {

    @Test
    fun generateGoldens() {
        val shouldUpdate = System.getProperty("basis.parity.update") == "true"
        if (!shouldUpdate) return

        val dir = System.getProperty("basis.parity.dir") ?: error("basis.parity.dir system property not set")
        val outputFile = File(dir, "io/github/alph_a07/basis/theme/resolution/parity/ParityGoldens.kt")

        val sb = StringBuilder()
        sb.appendLine("@file:Suppress(\"MaxLineLength\")")
        sb.appendLine()
        sb.appendLine("package io.github.alph_a07.basis.theme.resolution.parity")
        sb.appendLine()
        sb.appendLine("// AUTO-GENERATED FILE. DO NOT MODIFY DIRECTLY.")
        sb.appendLine("// This file is generated and must not be edited manually.")
        sb.appendLine("// Neither this file nor the use cases it serves should be written manually.")
        sb.appendLine("internal val PARITY_GOLDENS: Map<String, String> = mapOf(")
        for (case in ParityCorpus.cases) {
            val pair = resolve(case.intent)
            val snapshot = captureThemeSnapshot(pair)
            sb.appendLine("    \"${case.id}\" to \"\"\"$snapshot\"\"\".trimIndent(),")
        }
        sb.appendLine(")")
        sb.appendLine()

        outputFile.writeText(sb.toString())
        println("Generated parity goldens for ${ParityCorpus.cases.size} cases at ${outputFile.absolutePath}")
    }
}
