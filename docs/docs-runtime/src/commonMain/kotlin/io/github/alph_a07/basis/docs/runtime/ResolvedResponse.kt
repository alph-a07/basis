package io.github.alph_a07.basis.docs.runtime

import io.github.alph_a07.basis.theme.resolution.report.ResolutionReport
import io.github.alph_a07.basis.theme.resolution.report.ThemeViolation
import kotlinx.serialization.Serializable

/**
 * Token payload emitted on successful theme resolution.
 *
 * @property css Combined CSS blocks for light and dark themes.
 * @property light Map of CSS variable names to resolved values for light mode.
 * @property dark Map of CSS variable names to resolved values for dark mode.
 * @property kinds Map of CSS variable names to their token kinds (e.g. "color", "dimension", "radius").
 * @property groups Map of CSS variable names to their catalogue group family names.
 */
@Serializable
public data class ResolvedTokens(
    public val css: String,
    public val light: Map<String, String> = emptyMap(),
    public val dark: Map<String, String> = emptyMap(),
    public val kinds: Map<String, String> = emptyMap(),
    public val groups: Map<String, String> = emptyMap(),
)

/**
 * Successful resolution response envelope.
 *
 * @property ok Always `true`.
 * @property tokens Token values and generated CSS.
 * @property report Diagnostics emitted by the theme resolution engine.
 */
@Serializable
public data class ResolvedSuccess(
    public val ok: Boolean = true,
    public val tokens: ResolvedTokens,
    public val report: ResolutionReport,
)

/**
 * Failed resolution response envelope.
 *
 * @property ok Always `false`.
 * @property violations List of violations explaining why resolution failed.
 */
@Serializable
public data class ResolvedFailure(
    public val ok: Boolean = false,
    public val violations: List<ThemeViolation>,
)
