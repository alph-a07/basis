package io.github.alph_a07.basis.components.theme

import androidx.compose.ui.text.font.FontFamily
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.components.theme.font.fontRegistry
import io.github.alph_a07.basis.components.theme.font.registerResource
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import org.junit.Test

/**
 * Unit tests for [FontFamilyRegistry] resolution and fail-fast behavior.
 */
class FontFamilyRegistryTest {

    @Test
    fun resolve_registeredCustomFamily_returnsRegisteredInstance() {
        val key = CustomFontKey("brand-display")
        val expected = FontFamily.Serif
        val registry = fontRegistry { register(key, expected) }

        val resolved = registry.resolve(FontFamilyRef.Custom(key))

        assertEquals(expected, resolved)
        assertTrue(registry.isRegistered(key))
    }

    @Test
    fun resolve_unregisteredCustomFamily_throwsIllegalStateException() {
        val key = CustomFontKey("unknown-custom")
        val registry = FontFamilyRegistry.Empty

        val exception =
            assertFailsWith<IllegalStateException> {
                registry.resolve(FontFamilyRef.Custom(key))
            }

        assertTrue(exception.message?.contains("unknown-custom") == true)
        assertFalse(registry.isRegistered(key))
    }

    @Test
    fun resolve_catalogFamily_noDownloader_fallsBackToDefault() {
        val registry = FontFamilyRegistry.Empty

        val resolved = registry.resolve(FontFamilyRef.Catalog(GoogleFontId("roboto")))

        assertEquals(FontFamily.Default, resolved)
    }

    @Test
    fun defaultRegistry_resolvesCatalogFontAutomatically() {
        val resolved = FontFamilyRegistry.Default.resolve(FontFamilyRef.Catalog(GoogleFontId("inter")))

        assertNotNull(resolved)
    }

    @Test
    fun fontRegistry_registerResource_registersCustomFamily() {
        val key = CustomFontKey("my-res-font")
        val registry = fontRegistry { registerResource(key, resId = 1234) }

        assertTrue(registry.isRegistered(key))
        assertNotNull(registry.resolve(FontFamilyRef.Custom(key)))
    }
}
