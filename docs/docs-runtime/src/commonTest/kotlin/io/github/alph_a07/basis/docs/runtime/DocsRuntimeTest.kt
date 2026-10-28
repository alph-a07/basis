package io.github.alph_a07.basis.docs.runtime

import io.github.alph_a07.basis.theme.interchange.ThemeInterchange
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class DocsRuntimeTest {

    @Test
    fun resolvesDefaultIntentSuccessfully() {
        val resultJson = resolve("{}")
        val response = ThemeInterchange.json.decodeFromString(ResolvedSuccess.serializer(), resultJson)

        assertTrue(response.ok)
        assertNotNull(response.tokens.css)
        assertTrue(response.tokens.css.contains(":root, [data-theme=\"light\"]"))
        assertTrue(response.tokens.css.contains("[data-theme=\"dark\"]"))
        assertTrue(response.tokens.css.contains("--b-color-surface-default: oklch("))

        val lightSurface = response.tokens.light["--b-color-surface-default"]
        assertNotNull(lightSurface)
        assertTrue(lightSurface.startsWith("oklch("))

        val darkSurface = response.tokens.dark["--b-color-surface-default"]
        assertNotNull(darkSurface)
        assertTrue(darkSurface.startsWith("oklch("))

        assertTrue(response.report.modes.isNotEmpty())
    }

    @Test
    fun resolvesWithCustomPrefix() {
        val resultJson = resolveWithPrefix("{}", "d")
        val response = ThemeInterchange.json.decodeFromString(ResolvedSuccess.serializer(), resultJson)

        assertTrue(response.ok)
        assertTrue(response.tokens.css.contains("--d-color-surface-default: oklch("))

        val lightSurface = response.tokens.light["--d-color-surface-default"]
        assertNotNull(lightSurface)
        assertTrue(lightSurface.startsWith("oklch("))
    }

    @Test
    fun returnsFailureOnMalformedJson() {
        val resultJson = resolve("{ malformed json }")
        val response = ThemeInterchange.json.decodeFromString(ResolvedFailure.serializer(), resultJson)

        assertFalse(response.ok)
        assertTrue(response.violations.isNotEmpty())
        assertEquals("intent", response.violations.first().path)
    }

    @Test
    fun emitsCustomCssRulesets() {
        val css =
            emitCss(
                intentJson = "{}",
                prefix = "preview",
                lightSelector = ".preview-light",
                darkSelector = ".preview-dark",
            )

        assertTrue(css.contains(".preview-light {"))
        assertTrue(css.contains(".preview-dark {"))
        assertTrue(css.contains("--preview-color-surface-default: oklch("))
    }

    @Test
    fun convertsTokenPathsToCssVars() {
        assertEquals("--b-color-surface-default", tokenPathToCssVar("color.surface.default", "b"))
        assertEquals("--b-color-surface-default", tokenPathToCssVar("color.surface.default", "--b"))
        assertEquals("--d-spacing-level4", tokenPathToCssVar("spacing.level4", "d"))
        assertEquals("--color-surface-default", tokenPathToCssVar("color.surface.default", ""))
    }
}
