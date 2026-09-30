package io.github.alph_a07.basis_lint

import com.android.tools.lint.client.api.IssueRegistry
import com.android.tools.lint.client.api.Vendor
import com.android.tools.lint.detector.api.CURRENT_API

/**
 * Registers the checks that enforce Basis' own code conventions.
 *
 * Discovered through `META-INF/services/com.android.tools.lint.client.api.IssueRegistry`, so this
 * class name and package are part of the plugin's contract with lint and must not be renamed.
 */
class BasisIssueRegistry : IssueRegistry() {
    override val issues = listOf(SpOnlyFontSizeDetector.ISSUE)

    override val api: Int = CURRENT_API

    override val vendor: Vendor = Vendor(
        vendorName = "Basis",
        identifier = "io.github.alph_a07:basis-lint",
        feedbackUrl = "https://github.com/alph-a07/basis/issues",
    )
}
