package io.github.alph_a07.basis.components.theme.font

import android.content.res.AssetManager
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey

/**
 * Descriptor for a font face loaded from an Android asset file.
 *
 * Used for Bring-Your-Own-Font (BYOF) asset registration within [FontFamilyRegistry].
 *
 * @property path Relative asset path within the `assets/` directory (e.g., `"fonts/Brand-Bold.ttf"`).
 * @property weight Typographic weight for this font face. Defaults to [FontWeight.Normal].
 * @property style Typographic style (normal or italic) for this font face. Defaults to [FontStyle.Normal].
 * @throws IllegalArgumentException If [path] is blank.
 */
public data class AssetFont(
    public val path: String,
    public val weight: FontWeight = FontWeight.Normal,
    public val style: FontStyle = FontStyle.Normal,
) {
    init {
        require(path.isNotBlank()) { "AssetFont path must not be blank." }
    }
}

/**
 * Loads a Compose [FontFamily] from one or more [AssetFont] descriptors.
 *
 * @param assetManager Android [AssetManager] used to locate and read the font assets.
 * @param fonts One or more [AssetFont] descriptors defining the typeface variants.
 * @return A Compose [FontFamily] backed by the specified asset fonts.
 * @throws IllegalArgumentException If [fonts] is empty.
 */
public fun loadFontFamilyFromAssets(
    assetManager: AssetManager,
    vararg fonts: AssetFont,
): FontFamily {
    require(fonts.isNotEmpty()) { "At least one AssetFont must be provided to create a FontFamily." }

    val fontList =
        fonts.map {
            Font(
                path = it.path,
                assetManager = assetManager,
                weight = it.weight,
                style = it.style,
            )
        }

    return FontFamily(fontList)
}

/**
 * Loads a single-weight Compose [FontFamily] from an Android asset file path.
 *
 * @param assetManager Android [AssetManager] used to locate and read the font asset.
 * @param path Relative asset path within the `assets/` directory.
 * @param weight Typographic weight for this font face. Defaults to [FontWeight.Normal].
 * @param style Typographic style for this font face. Defaults to [FontStyle.Normal].
 * @return A Compose [FontFamily] backed by the specified asset font.
 */
public fun loadFontFamilyFromAssets(
    assetManager: AssetManager,
    path: String,
    weight: FontWeight = FontWeight.Normal,
    style: FontStyle = FontStyle.Normal,
): FontFamily = loadFontFamilyFromAssets(
    assetManager = assetManager,
    fonts = arrayOf(AssetFont(path = path, weight = weight, style = style)),
)

/**
 * Registers a Bring-Your-Own-Font (BYOF) [FontFamily] loaded from one or more [AssetFont] descriptors.
 *
 * @param key Consumer-chosen custom font key.
 * @param assetManager Android [AssetManager] used to locate and read the font assets.
 * @param fonts One or more [AssetFont] descriptors defining the typeface variants.
 * @return This builder instance for chaining.
 * @throws IllegalArgumentException If [fonts] is empty.
 */
public fun FontFamilyRegistry.Builder.registerAsset(
    key: CustomFontKey,
    assetManager: AssetManager,
    vararg fonts: AssetFont,
): FontFamilyRegistry.Builder = register(
    key = key,
    family = loadFontFamilyFromAssets(assetManager = assetManager, fonts = fonts),
)

/**
 * Registers a single-weight Bring-Your-Own-Font (BYOF) [FontFamily] loaded from an Android asset file path.
 *
 * @param key Consumer-chosen custom font key.
 * @param assetManager Android [AssetManager] used to locate and read the font asset.
 * @param path Relative asset path within the `assets/` directory.
 * @param weight Typographic weight for this font face. Defaults to [FontWeight.Normal].
 * @param style Typographic style for this font face. Defaults to [FontStyle.Normal].
 * @return This builder instance for chaining.
 */
public fun FontFamilyRegistry.Builder.registerAsset(
    key: CustomFontKey,
    assetManager: AssetManager,
    path: String,
    weight: FontWeight = FontWeight.Normal,
    style: FontStyle = FontStyle.Normal,
): FontFamilyRegistry.Builder = register(
    key = key,
    family =
        loadFontFamilyFromAssets(
            assetManager = assetManager,
            path = path,
            weight = weight,
            style = style,
        ),
)
