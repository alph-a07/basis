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
import org.jetbrains.kotlin.psi.KtExpression
import org.jetbrains.kotlin.psi.KtIfExpression
import org.jetbrains.kotlin.psi.KtLoopExpression
import org.jetbrains.kotlin.psi.KtReturnExpression
import org.jetbrains.kotlin.psi.KtWhenEntry

/**
 * Reports a `return` that follows another statement without a blank line between them.
 *
 * A blank line marks where the surrounding computation ends and the exit begins, so a reader does
 * not have to reconstruct the split from indentation alone.
 *
 * Exempted: a `return` that is the only statement of a control-flow body. Such a return replaces the
 * body rather than concluding one, so separating it would add space without adding meaning.
 */
class BlankLineBeforeReturn(config: Config) : Rule(config) {

    override val issue =
        Issue(
            id = "BlankLineBeforeReturn",
            severity = Severity.Style,
            description = "A return statement should be preceded by a blank line.",
            debt = Debt.FIVE_MINS,
        )

    override fun visitReturnExpression(expression: KtReturnExpression) {
        super.visitReturnExpression(expression)

        if (isOnlyStatementOfControlFlowBody(expression)) {
            // A return that replaces the body of a control-flow node needs no blank line before it.
            return
        }

        if (isFirstStatementOfBlock(expression)) {
            // The return is the first statement of its block; there is no statement above it.
            return
        }

        val previous = expression.prevSibling

        if (previous is PsiWhiteSpace && previous.text.count { it == '\n' } < 2) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(expression),
                    message = "Separate this return from the statement above it with a blank line.",
                ),
            )
        }
    }

    private fun isFirstStatementOfBlock(expression: KtReturnExpression): Boolean {
        val parent = expression.parent
        if (parent is KtBlockExpression) {
            return parent.statements.firstOrNull() === expression
        }
        return false
    }

    private fun isOnlyStatementOfControlFlowBody(expression: KtReturnExpression): Boolean {
        val parent = expression.parent

        // The return replaces the loop body, so it needs no blank line before it.
        if (parent is KtLoopExpression) {
            return parent.body === expression
        }

        if (parent is KtIfExpression) {
            return isOnlyStatementOfControlFlowBodyInBranch(parent.then, expression) ||
                isOnlyStatementOfControlFlowBodyInBranch(parent.`else`, expression)
        }

        return parent is KtWhenEntry
    }

    private fun isOnlyStatementOfControlFlowBodyInBranch(
        branch: KtExpression?,
        expression: KtReturnExpression,
    ): Boolean {
        if (branch == null) return false
        return when (branch) {
            is KtBlockExpression -> branch.statements.size == 1 && branch.statements.first() === expression
            is KtReturnExpression -> branch === expression
            else -> false
        }
    }
}
