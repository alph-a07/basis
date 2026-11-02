package io.github.alph_a07.basis.detekt

import io.gitlab.arturbosch.detekt.api.CodeSmell
import io.gitlab.arturbosch.detekt.api.Config
import io.gitlab.arturbosch.detekt.api.Debt
import io.gitlab.arturbosch.detekt.api.Entity
import io.gitlab.arturbosch.detekt.api.Issue
import io.gitlab.arturbosch.detekt.api.Rule
import io.gitlab.arturbosch.detekt.api.Severity
import org.jetbrains.kotlin.psi.KtAnnotationEntry
import org.jetbrains.kotlin.psi.KtDeclaration

/**
 * Enforces consistency between `@Lifecycle` version boundaries and `@Deprecated` declarations.
 *
 * Requirements:
 * - `addedIn` on `@Lifecycle` is required and must be valid SemVer.
 * - `@Deprecated(WARNING)` requires `deprecatedIn` on `@Lifecycle`.
 * - `@Deprecated(ERROR)` or `@Deprecated(HIDDEN)` requires `discontinuedIn` on `@Lifecycle`.
 * - Non-empty `deprecatedIn` without `@Deprecated(WARNING)` is an error.
 * - Non-empty `discontinuedIn` without `@Deprecated(ERROR|HIDDEN)` is an error.
 */
class LifecycleConsistency(config: Config) : Rule(config) {

    override val issue =
        Issue(
            id = "LifecycleConsistency",
            severity = Severity.Defect,
            description = "Enforces consistency between @Lifecycle metadata and @Deprecated annotations.",
            debt = Debt.FIVE_MINS,
        )

    override fun visitDeclaration(dcl: KtDeclaration) {
        super.visitDeclaration(dcl)

        val lifecycleAnnotation = findAnnotation(dcl, "Lifecycle")
        val deprecatedAnnotation = findAnnotation(dcl, "Deprecated")

        if (lifecycleAnnotation == null && deprecatedAnnotation == null) {
            return
        }

        if (lifecycleAnnotation != null) {
            validateLifecycleAnnotation(lifecycleAnnotation, deprecatedAnnotation)
        } else if (deprecatedAnnotation != null) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(deprecatedAnnotation),
                    message = "Declaration annotated with @Deprecated must also declare @Lifecycle boundaries.",
                ),
            )
        }
    }

    private fun validateLifecycleAnnotation(
        lifecycleAnnotation: KtAnnotationEntry,
        deprecatedAnnotation: KtAnnotationEntry?,
    ) {
        val addedIn = extractStringArg(lifecycleAnnotation, "addedIn", 0)
        val deprecatedIn = extractStringArg(lifecycleAnnotation, "deprecatedIn", 1)
        val discontinuedIn = extractStringArg(lifecycleAnnotation, "discontinuedIn", 2)

        validateAddedIn(lifecycleAnnotation, addedIn)

        val depLevel = deprecatedAnnotation?.let { extractDeprecationLevel(it) }

        if (!deprecatedIn.isNullOrBlank()) {
            validateDeprecatedIn(lifecycleAnnotation, deprecatedIn, deprecatedAnnotation, depLevel)
        }

        if (!discontinuedIn.isNullOrBlank()) {
            validateDiscontinuedIn(lifecycleAnnotation, discontinuedIn, deprecatedAnnotation, depLevel)
        }

        if (deprecatedAnnotation != null) {
            validateDeprecatedAnnotation(lifecycleAnnotation, depLevel, deprecatedIn, discontinuedIn)
        }
    }

    private fun validateAddedIn(lifecycleAnnotation: KtAnnotationEntry, addedIn: String?) {
        if (addedIn.isNullOrBlank()) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(lifecycleAnnotation),
                    message = "@Lifecycle requires a non-empty `addedIn` version string.",
                ),
            )
        } else if (!SEMVER_REGEX.matches(addedIn)) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(lifecycleAnnotation),
                    message = "@Lifecycle `addedIn` value '$addedIn' is not valid SemVer.",
                ),
            )
        }
    }

    private fun validateDeprecatedIn(
        lifecycleAnnotation: KtAnnotationEntry,
        deprecatedIn: String,
        deprecatedAnnotation: KtAnnotationEntry?,
        depLevel: String?,
    ) {
        if (!SEMVER_REGEX.matches(deprecatedIn)) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(lifecycleAnnotation),
                    message = "@Lifecycle `deprecatedIn` value '$deprecatedIn' is not valid SemVer.",
                ),
            )
        }
        if (deprecatedAnnotation == null) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(lifecycleAnnotation),
                    message = "@Lifecycle has `deprecatedIn` set, but declaration lacks @Deprecated.",
                ),
            )
        } else if (depLevel != "WARNING") {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(deprecatedAnnotation),
                    message = "@Lifecycle `deprecatedIn` requires @Deprecated(WARNING) (found $depLevel).",
                ),
            )
        }
    }

    private fun validateDiscontinuedIn(
        lifecycleAnnotation: KtAnnotationEntry,
        discontinuedIn: String,
        deprecatedAnnotation: KtAnnotationEntry?,
        depLevel: String?,
    ) {
        if (!SEMVER_REGEX.matches(discontinuedIn)) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(lifecycleAnnotation),
                    message = "@Lifecycle `discontinuedIn` value '$discontinuedIn' is not valid SemVer.",
                ),
            )
        }
        if (deprecatedAnnotation == null) {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(lifecycleAnnotation),
                    message = "@Lifecycle has `discontinuedIn` set, but declaration lacks @Deprecated.",
                ),
            )
        } else if (depLevel != "ERROR" && depLevel != "HIDDEN") {
            report(
                CodeSmell(
                    issue = issue,
                    entity = Entity.from(deprecatedAnnotation),
                    message = "@Lifecycle `discontinuedIn` requires @Deprecated(ERROR/HIDDEN) (found $depLevel).",
                ),
            )
        }
    }

    private fun validateDeprecatedAnnotation(
        lifecycleAnnotation: KtAnnotationEntry,
        depLevel: String?,
        deprecatedIn: String?,
        discontinuedIn: String?,
    ) {
        when (depLevel) {
            "WARNING" -> {
                if (deprecatedIn.isNullOrBlank()) {
                    report(
                        CodeSmell(
                            issue = issue,
                            entity = Entity.from(lifecycleAnnotation),
                            message = "@Deprecated(WARNING) requires `deprecatedIn` on @Lifecycle.",
                        ),
                    )
                }
            }
            "ERROR", "HIDDEN" -> {
                if (discontinuedIn.isNullOrBlank()) {
                    report(
                        CodeSmell(
                            issue = issue,
                            entity = Entity.from(lifecycleAnnotation),
                            message = "@Deprecated($depLevel) requires `discontinuedIn` on @Lifecycle.",
                        ),
                    )
                }
            }
        }
    }

    private fun findAnnotation(dcl: KtDeclaration, shortName: String): KtAnnotationEntry? =
        dcl.annotationEntries.firstOrNull { it.shortName?.asString() == shortName }

    private fun extractStringArg(entry: KtAnnotationEntry, name: String, positionalIndex: Int): String? {
        val args = entry.valueArguments
        for (arg in args) {
            if (arg.getArgumentName()?.asName?.asString() == name) {
                return arg.getArgumentExpression()?.text?.trim('\"')
            }
        }
        if (args.size > positionalIndex && args[positionalIndex].getArgumentName() == null) {
            return args[positionalIndex].getArgumentExpression()?.text?.trim('\"')
        }
        return null
    }

    private fun extractDeprecationLevel(entry: KtAnnotationEntry): String {
        val args = entry.valueArguments
        for (arg in args) {
            if (arg.getArgumentName()?.asName?.asString() == "level") {
                val exprText = arg.getArgumentExpression()?.text ?: return "WARNING"
                return when {
                    "ERROR" in exprText -> "ERROR"
                    "HIDDEN" in exprText -> "HIDDEN"
                    else -> "WARNING"
                }
            }
        }
        if (args.size >= 3 && args[2].getArgumentName() == null) {
            val exprText = args[2].getArgumentExpression()?.text ?: return "WARNING"
            return when {
                "ERROR" in exprText -> "ERROR"
                "HIDDEN" in exprText -> "HIDDEN"
                else -> "WARNING"
            }
        }
        return "WARNING"
    }

    companion object {
        private val SEMVER_REGEX = Regex("""^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$""")
    }
}
