package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.api.RuleSet
import io.gitlab.arturbosch.detekt.api.RuleSetProvider

/**
 * Supplies Basis' own code-shape rules.
 *
 * These cover conventions that no stock ktlint or detekt rule enforces, so they apply to every
 * module, including the pure Kotlin/JVM ones that Android lint never analyses.
 */
class BasisRuleSetProvider : RuleSetProvider {

    override val ruleSetId: String = RULE_SET_ID

    override fun instance(config: Config): RuleSet =
        RuleSet(
            ruleSetId,
            listOf(
                MandatoryBraces(config),
                BlankLineBeforeReturn(config),
                BlankLineBeforeLastStatement(config),
                VersionCatalogUsage(config),
            ),
        )

    companion object {
        const val RULE_SET_ID = "basis"
    }
}
