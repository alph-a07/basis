package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.CodeSmell
import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.api.Debt
import io.gitlab.arturbosch.detekt.api.Entity
import io.gitlab.arturbosch.detekt.api.Issue
import io.gitlab.arturbosch.detekt.api.Rule
import io.gitlab.arturbosch.detekt.api.Severity
import org.jetbrains.kotlin.com.intellij.psi.PsiWhiteSpace
import org.jetbrains.kotlin.psi.KtBlockExpression
import org.jetbrains.kotlin.psi.KtFile
import org.jetbrains.kotlin.psi.KtReturnExpression

/** Reports the final statement of a non-lambda block being packed against the preceding statements. */
class BlankLineBeforeLastStatement(config: Config) : Rule(config) {

    override val issue =
        Issue(
            id = "BlankLineBeforeLastStatement",
            severity = Severity.Style,
            description =
                "The last statement of a block of statements should be separated from the preceding statements by a blank line.",
            debt = Debt.FIVE_MINS,
        )

    override fun visitKtFile(file: KtFile) {
        if (file.name.endsWith(".gradle.kts")) return
        super.visitKtFile(file)
    }

    override fun visitBlockExpression(block: KtBlockExpression) {
        super.visitBlockExpression(block)

        val statements = block.statements
        if (statements.size < 2) return

        val last = statements.last()
        if (last is KtReturnExpression) return // already covered by BlankLineBeforeReturn

        val previous = last.prevSibling

        if (previous is PsiWhiteSpace && previous.text.count { it == '\n' } < 2) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(last),
                    message = "Separate this last statement from the statement above it with a blank line.",
                ),
            )
        }
    }
}
