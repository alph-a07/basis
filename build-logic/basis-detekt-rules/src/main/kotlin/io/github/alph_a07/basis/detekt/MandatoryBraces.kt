package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.CodeSmell
import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.api.Debt
import io.gitlab.arturbosch.detekt.api.Entity
import io.gitlab.arturbosch.detekt.api.Issue
import io.gitlab.arturbosch.detekt.api.Rule
import io.gitlab.arturbosch.detekt.api.Severity
import org.jetbrains.kotlin.psi.KtBlockExpression
import org.jetbrains.kotlin.psi.KtElement
import org.jetbrains.kotlin.psi.KtLoopExpression
import org.jetbrains.kotlin.psi.KtTryExpression

/**
 * Reports loop bodies that are not written as a braced block.
 *
 * Braces make the extent of a loop body explicit, so a later edit cannot silently widen it to
 * statements the author never intended to include. detekt's own `MandatoryBracesLoops` reports only
 * multi-line loops, which leaves the single-line form `for (item in items) total += item` unreported.
 */
class MandatoryBraces(config: Config) : Rule(config) {

    override val issue =
        Issue(
            id = "MandatoryBraces",
            severity = Severity.Style,
            description =
                "Control-flow bodies (loops and try/catch/finally blocks) should always be wrapped in braces.",
            debt = Debt.FIVE_MINS,
        )

    override fun visitLoopExpression(loopExpression: KtLoopExpression) {
        super.visitLoopExpression(loopExpression)

        if (loopExpression.body !is KtBlockExpression) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(loopExpression),
                    message = "Wrap the body of this loop in braces.",
                ),
            )
        }
    }

    override fun visitTryExpression(tryExpression: KtTryExpression) {
        super.visitTryExpression(tryExpression)

        if (tryExpression.tryBlock !is KtBlockExpression) {
            reportBraces(tryExpression.tryBlock, Entity.from(tryExpression))
        }

        for (catchClause in tryExpression.catchClauses) {
            if (catchClause.catchBody !is KtBlockExpression) {
                reportBraces(catchClause.catchBody, Entity.from(catchClause))
            }
        }

        val finallySection = tryExpression.finallyBlock
        if (finallySection != null && finallySection.finalExpression !is KtBlockExpression) {
            reportBraces(finallySection.finalExpression, Entity.from(finallySection))
        }
    }

    private fun reportBraces(body: KtElement?, entity: Entity) {
        if (body !is KtBlockExpression) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = entity,
                    message = "Wrap the body of this loop/try block in braces.",
                ),
            )
        }
    }
}
