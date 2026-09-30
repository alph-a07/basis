package io.github.alph_a07.basis_lint

import com.android.tools.lint.client.api.UElementHandler
import com.android.tools.lint.detector.api.Category
import com.android.tools.lint.detector.api.Detector
import com.android.tools.lint.detector.api.Implementation
import com.android.tools.lint.detector.api.Issue
import com.android.tools.lint.detector.api.JavaContext
import com.android.tools.lint.detector.api.Scope
import com.android.tools.lint.detector.api.Severity
import com.android.tools.lint.detector.api.SourceCodeScanner
import com.intellij.psi.PsiElement
import com.intellij.psi.PsiJavaFile
import com.intellij.psi.PsiMember
import com.intellij.psi.PsiMethod
import com.intellij.psi.PsiType
import com.intellij.psi.PsiVariable
import org.jetbrains.uast.UCallExpression
import org.jetbrains.uast.UElement
import org.jetbrains.uast.UExpression
import org.jetbrains.uast.ULiteralExpression
import org.jetbrains.uast.UParenthesizedExpression
import org.jetbrains.uast.UQualifiedReferenceExpression
import org.jetbrains.uast.UResolvable
import org.jetbrains.uast.USimpleNameReferenceExpression

/**
 * Reports a `Dp` value passed to a parameter that carries a font size.
 *
 * Basis requires every font size to be expressed in scale-independent pixels so that text responds
 * to the user's OS-level font scale setting. A font size in dp is measured in physical units and
 * stays the same size no matter how large the user has set their system font, which defeats the
 * purpose of that setting for anyone using it to read more comfortably.
 */
class SpOnlyFontSizeDetector : Detector(), SourceCodeScanner {

    override fun getApplicableUastTypes(): List<Class<out UElement>> =
        listOf(UCallExpression::class.java)

    override fun createUastHandler(context: JavaContext): UElementHandler =
        object : UElementHandler() {
            override fun visitCallExpression(node: UCallExpression) {
                checkFontSizeArguments(context, node)
            }
        }

    /**
     * Reports every `Dp` argument bound to a font-size parameter of [node].
     *
     * The argument-to-parameter mapping is computed by lint rather than read from call-site syntax,
     * so named, positional and mixed calls are all covered. An unresolvable callee is skipped:
     * without the signature there is nothing to indicate the argument is a font size.
     */
    private fun checkFontSizeArguments(context: JavaContext, node: UCallExpression) {
        // Resolved through UAST rather than through `sourcePsi`: for a Kotlin file the underlying
        // element is a `KtCallExpression`, which is not a `PsiMethodCallExpression` and cannot be
        // resolved with the Java PSI API.
        val method = node.resolve() ?: return
        val mapping = context.evaluator.computeArgumentMapping(node, method)

        for ((argument, parameter) in mapping) {
            val name = parameter.name
            if (name !in FONT_SIZE_PARAMETERS) continue

            val reported = unwrap(argument) ?: continue
            if (!isDpTyped(reported)) continue

            context.report(
                ISSUE,
                reported,
                context.getLocation(reported),
                "`$name` is sized in dp, so it will not respond to the user's font scale " +
                    "setting. Use sp (for example `${renderSuggestion(reported)}`) instead.",
            )
        }
    }

    /** Strips parentheses so the reported range is the value itself. */
    private fun unwrap(expression: UExpression): UExpression? = when (expression) {
        is UParenthesizedExpression -> unwrap(expression.expression)
        else -> expression
    }

    /**
     * True when [expression] evaluates to a `Dp`.
     *
     * `Dp` is a `@JvmInline value class`, so its type is erased: once `16.dp` has been unboxed for the
     * call its expression type is the underlying `Float`, and a `Dp` produced by a constant or a
     * function can arrive unboxed too. The call is therefore identified by the `dp` extension property
     * in `androidx.compose.ui.unit` that produced the value, which survives unboxing and cannot be
     * matched by any other expression yielding a `Dp`.
     */
    private fun isDpTyped(expression: UExpression): Boolean {
        if (expression.getExpressionType()?.isDp() == true) return true
        if (isDpDeclaration(expression)) return true
        return referencesDpExtension(expression)
    }

    /**
     * True when [expression] is, or ends in, a call to the `dp` extension property.
     *
     * The primary signal resolves the `dp` reference back to its declaration in
     * `androidx.compose.ui.unit`. The fallback covers a `Float` receiver, where UAST does not always
     * bind the extension: a property named `dp` on a number is unambiguous, and the receiver's type
     * keeps the check from matching an unrelated `dp` member.
     */
    private fun referencesDpExtension(expression: UExpression): Boolean {
        val qualified = expression as? UQualifiedReferenceExpression

        val resolved = listOfNotNull(expression, qualified?.selector)
            .filterIsInstance<UResolvable>()
            .mapNotNull { it.resolve() }
            .any { resolved -> resolved.isDpExtensionProperty() }
        if (resolved) return true

        val selector = qualified?.selector ?: return false
        val isDpCall = (selector as? USimpleNameReferenceExpression)?.identifier == DP_EXTENSION
        return isDpCall && qualified.receiver.getExpressionType()?.isNumeric() == true
    }

    /**
     * True when [expression] is a reference to a local or property already declared as a `Dp`.
     *
     * Value-class erasure leaves no use-site signal once a `Dp` has been given a name, so a
     * declaration-typed reference returns false rather than guessing. Such a value is reported at its
     * declaration instead, which keeps the diagnosis with the code that chose the unit.
     */
    private fun isDpDeclaration(expression: UExpression): Boolean {
        if (expression !is UResolvable) return false
        val resolved = expression.resolve() ?: return false

        val declaredType = when (resolved) {
            is PsiVariable -> resolved.type
            is PsiMethod -> resolved.returnType
            else -> null
        } ?: return false

        return declaredType.isDp()
    }

    private fun PsiType.isDp(): Boolean = canonicalText == DP_FQN

    /** True when this type is one a `dp` literal can be written against. */
    private fun PsiType.isNumeric(): Boolean = canonicalText in NUMERIC_TYPES

    /**
     * True when [this] is the `dp` extension property declared in `androidx.compose.ui.unit`.
     *
     * UAST resolves a Kotlin extension property to the synthetic `getDp` accessor, so both the
     * property name and its Java accessor form are matched.
     */
    private fun PsiElement.isDpExtensionProperty(): Boolean {
        if (this !is PsiMember) return false
        if (name != DP_EXTENSION && name != DP_EXTENSION_ACCESSOR) return false
        return packageNameOfDeclaration() == DP_PACKAGE
    }

    /**
     * The package the declaration lives in, or null when it cannot be determined.
     *
     * A Kotlin declaration lives in a [com.intellij.psi.PsiFile] that is not a [PsiJavaFile], so a null
     * result means "unknown" and never matches.
     */
    private fun PsiElement.packageNameOfDeclaration(): String? =
        (containingFile as? PsiJavaFile)?.packageName

    /**
     * Renders the sp rewrite of [expression] for the message, falling back to prose when the value
     * is not a literal the detector can restate.
     */
    private fun renderSuggestion(expression: UExpression): String {
        val qualified = expression as? UQualifiedReferenceExpression
        val literal = (qualified?.receiver ?: expression) as? ULiteralExpression
        val value = literal?.value
        return if (value is Number) "${literalText(value)}.sp" else "the equivalent sp value"
    }

    /** The literal exactly as written, so `16` stays `16` and `0.5` stays `0.5`. */
    private fun literalText(value: Number): String =
        if (value is Float || value is Double) "${value}f" else value.toString()

    companion object {
        private const val DP_FQN = "androidx.compose.ui.unit.Dp"
        private const val DP_PACKAGE = "androidx.compose.ui.unit"
        private const val DP_EXTENSION = "dp"
        private const val DP_EXTENSION_ACCESSOR = "getDp"

        private val FONT_SIZE_PARAMETERS = setOf(
            "fontSize",
            "fontSizeSp",
            "lineHeight",
            "lineHeightSp",
            "letterSpacing",
            "letterSpacingSp",
        )

        private val NUMERIC_TYPES = setOf("int", "long", "float", "double", "short", "byte")

        @JvmField
        val ISSUE: Issue = Issue.create(
            id = "SpOnlyFontSize",
            briefDescription = "Font size must be expressed in sp",
            explanation = """
                Basis requires every font size to be expressed in scale-independent pixels so that \
                text responds to the user's OS-level font scale setting.

                A font size in dp is measured in physical units and stays the same size no matter how \
                large the user has set their system font, which defeats the purpose of that setting \
                for anyone using it to read more comfortably.

                Use `sp` (for example `16.sp`) for font size, line height, and letter spacing.
            """,
            category = Category.CORRECTNESS,
            priority = 7,
            severity = Severity.ERROR,
            implementation = Implementation(
                SpOnlyFontSizeDetector::class.java,
                Scope.JAVA_FILE_SCOPE,
            ),
        )
    }
}
