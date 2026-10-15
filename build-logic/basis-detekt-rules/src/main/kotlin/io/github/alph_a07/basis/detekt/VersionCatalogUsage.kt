package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.CodeSmell
import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.api.Debt
import io.gitlab.arturbosch.detekt.api.Entity
import io.gitlab.arturbosch.detekt.api.Issue
import io.gitlab.arturbosch.detekt.api.Rule
import io.gitlab.arturbosch.detekt.api.Severity
import org.jetbrains.kotlin.psi.KtBinaryExpression
import org.jetbrains.kotlin.psi.KtCallExpression
import org.jetbrains.kotlin.psi.KtNameReferenceExpression
import org.jetbrains.kotlin.psi.KtStringTemplateExpression

/**
 * Enforces dependency and plugin declarations against the version catalog.
 *
 * A direct declaration is a string-literal argument to a dependency function (e.g.
 * `implementation("org.assertj:assertj-core:3.27.7")`) or a plugin with a literal version,
 * such as `id("com.android.application") version "8.0.0"`. These pin a version that lives in
 * exactly one file: once it drifts, the only source of truth is duplicated text. The catalog
 * owns the version, so every consumer reads from a single entry.
 */
class VersionCatalogUsage(config: Config) : Rule(config) {

    private companion object {
        // Dependency functions whose string argument is a direct group:module:version. Includes
        // `detektPlugins`: it is a normal dependency configuration, so a literal there hides a
        // version exactly like one in `implementation` does.
        private val dependencyFunctions =
            setOf(
                "implementation",
                "api",
                "compileOnly",
                "runtimeOnly",
                "testImplementation",
                "testRuntimeOnly",
                "androidTestImplementation",
                "debugImplementation",
                "ksp",
                "annotationProcessor",
                "lintChecks",
                "lintTests",
                "detektPlugins",
            )

        // Functions that create a plugin declaration whose `version` is a literal.
        private val pluginFunctions = setOf("id", "kotlin")
    }

    override val issue =
        Issue(
            id = "VersionCatalogUsage",
            severity = Severity.Style,
            description =
                "Declare dependencies and plugins through the version catalog instead of hardcoding versions.",
            debt = Debt.FIVE_MINS,
        )

    override fun visitCallExpression(expression: KtCallExpression) {
        super.visitCallExpression(expression)

        val name = (expression.calleeExpression as? KtNameReferenceExpression)?.getReferencedName()

        if (name != null && dependencyFunctions.contains(name)) {
            checkDependencyStringIsCatalog(expression)
        }

        if (name != null && pluginFunctions.contains(name)) {
            checkPluginLiteralVersion(expression)
        }
    }

    override fun visitBinaryExpression(expression: KtBinaryExpression) {
        super.visitBinaryExpression(expression)

        // The Kotlin DSL declares a plugin version as an infix call on the declaration, e.g.
        // `id("com.android.application") version "8.0.0"`. The left side names the plugin through
        // one of the plugin functions; a string literal on the right pins a version that belongs
        // in the catalog.
        if (expression.operationReference.getReferencedName() != "version") return

        val receiver = expression.left as? KtCallExpression ?: return
        val receiverName = (receiver.calleeExpression as? KtNameReferenceExpression)?.getReferencedName()

        if (receiverName == null || !pluginFunctions.contains(receiverName)) return

        val version = expression.right as? KtStringTemplateExpression ?: return

        if (version.text.startsWith("\"")) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(expression.operationReference),
                    message = "Declare the plugin version in the version catalog instead of a literal.",
                ),
            )
        }
    }

    private fun checkDependencyStringIsCatalog(expression: KtCallExpression) {
        val firstArgument = expression.valueArguments.firstOrNull()
        val argumentExpression = firstArgument?.getArgumentExpression()
        val string = argumentExpression as? KtStringTemplateExpression ?: return

        val raw = string.text

        // A catalog entry is a property reference like `libs.assertj`; a quoted string is a
        // direct declaration with a version that belongs in the catalog.
        if (raw.startsWith("\"") && raw.contains(":")) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(expression.calleeExpression ?: expression),
                    message = "Declare this dependency through the version catalog instead of a literal version.",
                ),
            )
        }
    }

    private fun checkPluginLiteralVersion(expression: KtCallExpression) {
        val versionArgument =
            expression.valueArguments.firstOrNull {
                it.getArgumentName()?.asName?.asString() == "version"
            } ?: return

        val version = versionArgument.getArgumentExpression() as? KtStringTemplateExpression ?: return
        val raw = version.text

        if (raw.startsWith("\"")) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(expression.calleeExpression ?: expression),
                    message = "Declare the plugin version in the version catalog instead of a literal.",
                ),
            )
        }
    }
}
