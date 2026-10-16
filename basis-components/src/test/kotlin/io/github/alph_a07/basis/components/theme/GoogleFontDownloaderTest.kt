package io.github.alph_a07.basis.components.theme

import androidx.compose.ui.text.font.FontWeight
import io.github.alph_a07.basis.components.theme.font.GoogleFontDownloader
import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull
import kotlin.test.assertSame
import org.junit.Test

/**
 * Unit tests for [GoogleFontDownloader].
 */
class GoogleFontDownloaderTest {

    private val downloader = GoogleFontDownloader()

    @Test
    fun load_catalogFont_resolvesFontFamily() {
        val family = downloader.load(GoogleFontId("inter"))

        assertNotNull(family)
    }

    @Test
    fun load_unknownFont_fallsBackToIdValue() {
        val family = downloader.load(GoogleFontId("non-catalog-typeface"))

        assertNotNull(family)
    }

    @Test
    fun load_returnsCachedInstanceForSameArguments() {
        val id = GoogleFontId("roboto")
        val first = downloader.load(id)
        val second = downloader.load(id)

        assertSame(first, second)
    }

    @Test
    fun load_customWeights_createsFontFamily() {
        val id = GoogleFontId("open-sans")
        val weights = listOf(FontWeight.Bold, FontWeight.Light)
        val family = downloader.load(id, weights = weights)

        assertNotNull(family)
    }

    @Test
    fun load_emptyWeights_throwsIllegalArgumentException() {
        assertFailsWith<IllegalArgumentException> {
            downloader.load(GoogleFontId("inter"), weights = emptyList())
        }
    }

    @Test
    fun init_emptyDefaultWeights_throwsIllegalArgumentException() {
        assertFailsWith<IllegalArgumentException> {
            GoogleFontDownloader(weights = emptyList())
        }
    }

    @Test
    fun defaultInstance_loadsCatalogFont() {
        val family = GoogleFontDownloader.Default.load(GoogleFontId("inter"))

        assertNotNull(family)
    }
}
