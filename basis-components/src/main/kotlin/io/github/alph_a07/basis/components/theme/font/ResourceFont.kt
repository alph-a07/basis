package io.github.alph_a07.basis.components.theme.font

import androidx.annotation.FontRes
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey

/**
 * Descriptor for a font face loaded from an Android font resource.
 *
 * Used for Bring-Your-Own-Font (BYOF) resource registration within [FontFamilyRegistry].
 *
 * @property resId Android font resource identifier (from `R.font.*`).
 * @property weight Typographic weight for this font face. Defaults to [FontWeight.Normal].
 * @property style Typographic style (normal or italic) for this font face. Defaults to [FontStyle.Normal].
 * @throws IllegalArgumentException If [resId] is 0.
 */
public data class ResourceFont(
    @get:FontRes public val resId: Int,
    public val weight: FontWeight = FontWeight.Normal,
    public val style: FontStyle = FontStyle.Normal,
) {
    init {
        require(resId != 0) { "ResourceFont resId must not be 0." }
    }
}

/**
 * Loads a Compose [FontFamily] from one or more [ResourceFont] descriptors.
 *
 * @param fonts One or more [ResourceFont] descriptors defining the typeface variants.
 * @return A Compose [FontFamily] backed by the specified resource fonts.
 * @throws IllegalArgumentException If [fonts] is empty.
 */
public fun loadFontFamilyFromResource(
    vararg fonts: ResourceFont,
): FontFamily {
    require(fonts.isNotEmpty()) { "At least one ResourceFont must be provided to create a FontFamily." }

    val fontList =
        fonts.map {
            Font(
                resId = it.resId,
                weight = it.weight,
                style = it.style,
            )
        }

    return FontFamily(fontList)
}

/**
 * Loads a single-weight Compose [FontFamily] from an Android font resource identifier.
 *
 * @param resId Android font resource identifier (from `R.font.*`).
 * @param weight Typographic weight for this font face. Defaults to [FontWeight.Normal].
 * @param style Typographic style for this font face. Defaults to [FontStyle.Normal].
 * @return A Compose [FontFamily] backed by the specified resource font.
 */
public fun loadFontFamilyFromResource(
    @FontRes resId: Int,
    weight: FontWeight = FontWeight.Normal,
    style: FontStyle = FontStyle.Normal,
): FontFamily = loadFontFamilyFromResource(
    fonts = arrayOf(ResourceFont(resId = resId, weight = weight, style = style)),
)

/**
 * Registers a Bring-Your-Own-Font (BYOF) [FontFamily] loaded from one or more [ResourceFont] descriptors.
 *
 * @param key Consumer-chosen custom font key.
 * @param fonts One or more [ResourceFont] descriptors defining the typeface variants.
 * @return This builder instance for chaining.
 * @throws IllegalArgumentException If [fonts] is empty.
 */
public fun FontFamilyRegistry.Builder.registerResource(
    key: CustomFontKey,
    vararg fonts: ResourceFont,
): FontFamilyRegistry.Builder = register(
    key = key,
    family = loadFontFamilyFromResource(fonts = fonts),
)

/**
 * Registers a single-weight Bring-Your-Own-Font (BYOF) [FontFamily] loaded from an Android font resource.
 *
 * @param key Consumer-chosen custom font key.
 * @param resId Android font resource identifier (from `R.font.*`).
 * @param weight Typographic weight for this font face. Defaults to [FontWeight.Normal].
 * @param style Typographic style for this font face. Defaults to [FontStyle.Normal].
 * @return This builder instance for chaining.
 */
public fun FontFamilyRegistry.Builder.registerResource(
    key: CustomFontKey,
    @FontRes resId: Int,
    weight: FontWeight = FontWeight.Normal,
    style: FontStyle = FontStyle.Normal,
): FontFamilyRegistry.Builder = register(
    key = key,
    family =
        loadFontFamilyFromResource(
            resId = resId,
            weight = weight,
            style = style,
        ),
)
