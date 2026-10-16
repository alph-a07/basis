package io.github.alph_a07.basis.components.theme

import androidx.compose.runtime.Composable
import androidx.compose.runtime.ReadOnlyComposable
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.text.font.FontFamily
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.components.theme.font.fontRegistry
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import org.junit.Rule
import org.junit.Test

/** Instrumentation smoke tests for `BasisTheme` ambient enforcement and mode selection. */
class BasisThemeTest {

    @get:Rule
    val composeRule = createComposeRule()

    @Test
    fun requireAmbient_outsideBasisTheme_throwsIllegalStateException() {
        val caught =
            runCatching {
                composeRule.setContent {
                    readThemeOutside()
                }
            }.exceptionOrNull()

        assertNotNull(caught, "Expected IllegalStateException when reading BasisTheme outside its block")
        val isExpectedException = caught is IllegalStateException || caught.cause is IllegalStateException
        assertTrue(isExpectedException, "Expected IllegalStateException, got: $caught")
        val message = (caught as? IllegalStateException)?.message ?: caught.cause?.message
        assertNotNull(message, "Error message should not be null")

        assertTrue(message.contains("BasisTheme"), "Error message should mention BasisTheme, was: $message")
    }

    @Test
    fun requireAmbient_insideBasisTheme_doesNotThrow() {
        var ambient: BasisThemeAmbient? = null

        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                ambient = BasisTheme.current
            }
        }

        assertNotNull(ambient, "BasisThemeAmbient must be non-null inside BasisTheme")
    }

    @Test
    fun basisThemePairOverload_lightMode_selectsLightTree() {
        val pair = resolve(BasisIntent())
        var ambient: BasisThemeAmbient? = null

        composeRule.setContent {
            BasisTheme(pair = pair, useDarkTheme = false) {
                ambient = BasisTheme.current
            }
        }

        assertNotNull(ambient)
        assertNotNull(pair.light)
        assertEquals(ambient.theme.mode, pair.light!!.mode, "Light mode must be selected when useDarkTheme = false")
    }

    @Test
    fun basisThemePairOverload_darkMode_selectsDarkTree() {
        val pair = resolve(BasisIntent())
        var ambient: BasisThemeAmbient? = null

        composeRule.setContent {
            BasisTheme(pair = pair, useDarkTheme = true) {
                ambient = BasisTheme.current
            }
        }

        assertNotNull(ambient)
        assertNotNull(pair.dark)
        assertEquals(ambient.theme.mode, pair.dark!!.mode, "Dark mode must be selected when useDarkTheme = true")
    }

    @Test
    fun basisTheme_withReport_exposesDiagnostics() {
        val pair = resolve(BasisIntent())
        var ambient: BasisThemeAmbient? = null

        composeRule.setContent {
            BasisTheme(theme = pair.light!!, report = pair.report) {
                ambient = BasisTheme.current
            }
        }

        assertNotNull(ambient)
        assertNotNull(ambient.report, "Report must be forwarded when provided")
    }

    @Test
    fun basisTheme_withoutReport_reportIsNull() {
        val pair = resolve(BasisIntent())
        var ambient: BasisThemeAmbient? = null

        composeRule.setContent {
            BasisTheme(theme = pair.light!!) {
                ambient = BasisTheme.current
            }
        }

        assertNotNull(ambient)
        assertEquals(ambient.report, null, "Report must be null when not passed through")
    }

    @Test
    fun nestedBasisTheme_replacesAmbientForSubtree() {
        val pair = resolve(BasisIntent())
        var outerMode: io.github.alph_a07.basis.theme.core.ThemeMode? = null
        var innerMode: io.github.alph_a07.basis.theme.core.ThemeMode? = null

        composeRule.setContent {
            BasisTheme(theme = pair.light!!) {
                outerMode = BasisTheme.current.theme.mode

                BasisTheme(theme = pair.dark!!) {
                    innerMode = BasisTheme.current.theme.mode
                }
            }
        }

        assertEquals(outerMode, pair.light!!.mode, "Outer ambient must be light")
        assertEquals(innerMode, pair.dark!!.mode, "Inner ambient must be replaced by dark")
    }

    @Test
    fun basisTheme_accessors_returnNonNullValues() {
        var colors: BasisColorLocals? = null
        var typography: BasisTypographyLocals? = null

        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                colors = BasisTheme.colors

                typography = BasisTheme.typography
            }
        }

        assertNotNull(colors, "BasisTheme.colors must be accessible inside BasisTheme")
        assertNotNull(typography, "BasisTheme.typography must be accessible inside BasisTheme")
    }

    @Test
    fun basisTheme_unregisteredCustomFont_failsFastAtThemeEntry() {
        val customKey = CustomFontKey("unregistered-font")
        val baseTheme = resolve(BasisIntent()).light!!
        val themeWithCustomFont =
            baseTheme.copy(
                typography =
                    baseTheme.typography.copy(
                        content =
                            baseTheme.typography.content.copy(
                                level1 =
                                    baseTheme.typography.content.level1.copy(
                                        family = FontFamilyRef.Custom(customKey),
                                    ),
                            ),
                    ),
            )
        val caught =
            runCatching {
                composeRule.setContent {
                    BasisTheme(theme = themeWithCustomFont, fontRegistry = FontFamilyRegistry.Empty) {
                        // content
                    }
                }
            }.exceptionOrNull()

        assertNotNull(caught, "Expected failure when custom font key is unregistered")
        val isExpectedException = caught is IllegalStateException || caught.cause is IllegalStateException
        assertTrue(isExpectedException, "Expected IllegalStateException, got: $caught")
        val message = (caught as? IllegalStateException)?.message ?: caught.cause?.message
        assertNotNull(message, "Error message should not be null")

        assertTrue(
            message.contains("unregistered-font"),
            "Error message should mention the unregistered key, was: $message",
        )
    }

    @Test
    fun basisTheme_registeredCustomFont_resolvesWithoutError() {
        val customKey = CustomFontKey("registered-font")
        val baseTheme = resolve(BasisIntent()).light!!
        val themeWithCustomFont =
            baseTheme.copy(
                typography =
                    baseTheme.typography.copy(
                        content =
                            baseTheme.typography.content.copy(
                                level1 =
                                    baseTheme.typography.content.level1.copy(
                                        family = FontFamilyRef.Custom(customKey),
                                    ),
                            ),
                    ),
            )
        val registry =
            fontRegistry {
                register(customKey, FontFamily.Monospace)
            }
        var ambient: BasisThemeAmbient? = null

        composeRule.setContent {
            BasisTheme(theme = themeWithCustomFont, fontRegistry = registry) {
                ambient = BasisTheme.current
            }
        }

        assertNotNull(ambient)
        assertEquals(FontFamily.Monospace, ambient.typography.content.level1.fontFamily)
    }
}

@Composable
@ReadOnlyComposable
private fun readThemeOutside(): BasisThemeAmbient = requireAmbient()
