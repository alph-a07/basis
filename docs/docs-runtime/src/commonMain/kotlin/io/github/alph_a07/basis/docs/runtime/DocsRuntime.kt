@file:OptIn(ExperimentalJsExport::class)

package io.github.alph_a07.basis.docs.runtime

import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.interchange.ThemeInterchange
import io.github.alph_a07.basis.theme.resolution.report.ThemeViolation
import io.github.alph_a07.basis.theme.resolution.resolve as basisResolve
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json

private val runtimeJson =
    Json(ThemeInterchange.json) {
        encodeDefaults = true
    }

/**
 * Resolves an intent JSON string into tokens and diagnostics.
 *
 * @param intentJson Serialized JSON string of [BasisIntent], or empty/`"{}"` for default theme.
 * @return JSON string representing either [ResolvedSuccess] (`{ok: true, tokens, report}`)
 * or [ResolvedFailure] (`{ok: false, violations}`).
 */
@JsExport
public fun resolve(intentJson: String): String = resolveWithPrefix(intentJson, "b")

/**
 * Resolves an intent JSON string with a custom CSS variable prefix.
 *
 * @param intentJson Serialized JSON string of [BasisIntent], or empty/`"{}"` for default theme.
 * @param prefix CSS variable prefix without leading dashes, e.g. `"b"` for `--b-*`.
 * @return JSON string representing either [ResolvedSuccess] or [ResolvedFailure].
 */
@JsExport
public fun resolveWithPrefix(intentJson: String, prefix: String): String = try {
    val trimmed = intentJson.trim()
    val intent =
        if (trimmed.isEmpty() || trimmed == "{}") {
            BasisIntent()
        } else {
            ThemeInterchange.decodeIntent(trimmed)
        }
    val pair = basisResolve(intent)
    val lightTokens = pair.light?.let { extractTokenMap(it, prefix) } ?: emptyMap()
    val darkTokens = pair.dark?.let { extractTokenMap(it, prefix) } ?: emptyMap()
    val css = emitPairCss(pair, prefix)

    val tokens =
        ResolvedTokens(
            css = css,
            light = lightTokens,
            dark = darkTokens,
        )
    val success =
        ResolvedSuccess(
            ok = true,
            tokens = tokens,
            report = pair.report,
        )

    runtimeJson.encodeToString(ResolvedSuccess.serializer(), success)
} catch (e: SerializationException) {
    failureJson(e.message ?: "Failed to parse intent JSON.")
} catch (e: IllegalArgumentException) {
    failureJson(e.message ?: "Invalid intent arguments.")
} catch (e: IllegalStateException) {
    failureJson(e.message ?: "Invalid theme state.")
}

private fun failureJson(message: String): String {
    val failure =
        ResolvedFailure(
            ok = false,
            violations =
                listOf(
                    ThemeViolation(
                        path = "intent",
                        message = message,
                    ),
                ),
        )

    return runtimeJson.encodeToString(ResolvedFailure.serializer(), failure)
}

/**
 * Generates light/dark CSS blocks directly from an intent JSON string.
 *
 * @param intentJson Serialized JSON string of [BasisIntent].
 * @param prefix CSS variable prefix, defaults to `"b"`.
 * @param lightSelector CSS selector for the light theme block.
 * @param darkSelector CSS selector for the dark theme block.
 * @return CSS string with light and dark variable blocks.
 */
@JsExport
public fun emitCss(
    intentJson: String,
    prefix: String = "b",
    lightSelector: String = ":root, [data-theme=\"light\"]",
    darkSelector: String = "[data-theme=\"dark\"]",
): String {
    val trimmed = intentJson.trim()
    val intent =
        if (trimmed.isEmpty() || trimmed == "{}") {
            BasisIntent()
        } else {
            ThemeInterchange.decodeIntent(trimmed)
        }
    val pair = basisResolve(intent)

    return emitPairCss(pair, prefix, lightSelector, darkSelector)
}
