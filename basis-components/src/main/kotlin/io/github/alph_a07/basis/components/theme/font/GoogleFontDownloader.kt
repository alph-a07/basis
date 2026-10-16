package io.github.alph_a07.basis.components.theme.font

import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.googlefonts.Font
import androidx.compose.ui.text.googlefonts.GoogleFont
import io.github.alph_a07.basis.theme.resolution.fonts.GoogleFontCatalog
import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId
import java.util.concurrent.ConcurrentHashMap

/**
 * Downloads and constructs Compose [FontFamily] instances for catalog Google Fonts.
 *
 * Resolves each [GoogleFontId] against [GoogleFontCatalog] to retrieve the canonical family name,
 * then constructs a Compose downloadable [FontFamily] backed by Google Play Services font provider.
 *
 * @property weights Default typographic weights to include when synthesizing downloadable font faces.
 * @throws IllegalArgumentException If [weights] is empty.
 */
public class GoogleFontDownloader(
    public val weights: List<FontWeight> = DEFAULT_WEIGHTS,
) {
    init {
        require(weights.isNotEmpty()) { "GoogleFontDownloader defaultWeights must not be empty." }
    }

    private val cache = ConcurrentHashMap<CacheKey, FontFamily>()

    /**
     * Loads a Compose [FontFamily] for the given [id] with specified [weights].
     *
     * @param id Identifier of the Google Font family to download.
     * @param weights Typographic weights to instantiate for this family. Defaults to [weights].
     * @return Downloadable Compose [FontFamily].
     * @throws IllegalArgumentException If [weights] is empty.
     */
    public fun load(
        id: GoogleFontId,
        weights: List<FontWeight> = this@GoogleFontDownloader.weights,
    ): FontFamily {
        require(weights.isNotEmpty()) { "GoogleFontDownloader weights must not be empty." }

        return cache.computeIfAbsent(CacheKey(id, weights)) { key ->
            val catalogEntry = GoogleFontCatalog.find(key.id)
            val familyName = catalogEntry?.familyName ?: key.id.value
            val googleFont = GoogleFont(familyName)
            val fonts =
                key.weights.map { weight ->
                    Font(
                        googleFont = googleFont,
                        weight = weight,
                    )
                }

            FontFamily(fonts)
        }
    }

    public companion object {
        /** Default typographic weights synthesized for Google Fonts catalog families. */
        public val DEFAULT_WEIGHTS: List<FontWeight> =
            listOf(
                FontWeight.Light,
                FontWeight.Normal,
                FontWeight.Medium,
                FontWeight.SemiBold,
                FontWeight.Bold,
            )

        /** Default downloader configured with Google Play Services font provider. */
        public val Default: GoogleFontDownloader = GoogleFontDownloader()
    }
}

private data class CacheKey(
    val id: GoogleFontId,
    val weights: List<FontWeight>,
)
