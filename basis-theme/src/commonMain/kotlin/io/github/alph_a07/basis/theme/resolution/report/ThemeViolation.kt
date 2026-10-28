package io.github.alph_a07.basis.theme.resolution.report

import kotlinx.serialization.Serializable

/**
 * Diagnostic record representing an intent or schema violation.
 *
 * @property path Input or token path where the violation occurred.
 * @property message Human-readable explanation of why the input is invalid.
 */
@Serializable
public data class ThemeViolation(
    public val path: String,
    public val message: String,
)

/**
 * Extracts all rejected entries from this report as a list of [ThemeViolation]s.
 *
 * @return List of violations corresponding to rejected inputs.
 */
public fun ResolutionReport.violations(): List<ThemeViolation> = entries
    .filter { it.status == ReportStatus.Rejected }
    .map { ThemeViolation(path = it.path, message = it.message) }
