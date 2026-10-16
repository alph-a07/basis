package io.github.alph_a07.basis.components.theme.font

import androidx.compose.ui.text.font.FontFamily
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Resolves a [FontFamilyRef] to a Compose [FontFamily] at the `BasisTheme` entry boundary.
 *
 * Google Fonts catalog families are resolved and downloaded automatically via [GoogleFontDownloader].
 * Custom families must be registered before the theme is entered via [fontRegistry]; an unregistered
 * [FontFamilyRef.Custom] key fails fast at theme construction time.
 */
public class FontFamilyRegistry internal constructor(
    private val customFamilies: Map<CustomFontKey, FontFamily> = emptyMap(),
    private val googleFontDownloader: GoogleFontDownloader? = GoogleFontDownloader.Default,
) {

    /**
     * Resolves [ref] to a Compose [FontFamily].
     *
     * @param ref The font family reference to resolve.
     * @return The resolved Compose [FontFamily].
     * @throws IllegalStateException When [ref] is a [FontFamilyRef.Custom] with no registered
     * family for its key.
     */
    public fun resolve(ref: FontFamilyRef): FontFamily = when (ref) {
        is FontFamilyRef.Catalog ->
            googleFontDownloader?.load(ref.id) ?: FontFamily.Default

        is FontFamilyRef.Custom ->
            customFamilies[ref.key]
                ?: error(
                    "Custom font key '${ref.key.value}' is not registered. " +
                        "Register it via fontRegistry { } before entering BasisTheme.",
                )
    }

    /**
     * Returns true when a [CustomFontKey] is registered in this registry.
     *
     * @param key The custom font key to inspect.
     * @return True if registered, false otherwise.
     */
    public fun isRegistered(key: CustomFontKey): Boolean = customFamilies.containsKey(key)

    /**
     * Accumulates BYOF registrations for a [FontFamilyRegistry].
     *
     * Obtain an instance via [fontRegistry].
     */
    public class Builder internal constructor() {
        private val custom = mutableMapOf<CustomFontKey, FontFamily>()

        /**
         * Registers a Compose [FontFamily] for a [CustomFontKey] BYOF family.
         *
         * @param key Consumer-chosen custom font key.
         * @param family Loaded Compose font family.
         * @return This builder instance for chaining.
         */
        public fun register(key: CustomFontKey, family: FontFamily): Builder = apply {
            custom[key] = family
        }

        internal fun build(): FontFamilyRegistry = FontFamilyRegistry(
            customFamilies = custom.toMap(),
        )
    }

    public companion object {
        /** Default registry with automatic Google Fonts downloading enabled. */
        public val Default: FontFamilyRegistry = FontFamilyRegistry()

        internal val Empty: FontFamilyRegistry = FontFamilyRegistry(googleFontDownloader = null)
    }
}

/**
 * Builds a [FontFamilyRegistry] with BYOF custom font registrations.
 *
 * Google Fonts catalog families are always resolved and downloaded automatically; only custom
 * bring-your-own fonts require registration.
 *
 * ```kotlin
 * BasisTheme(
 *     theme = theme,
 *     fontRegistry = fontRegistry {
 *         registerResource(CustomFontKey("brand"), R.font.brand_regular)
 *         registerAsset(CustomFontKey("display"), assetManager, "fonts/Display.ttf")
 *     },
 * ) { … }
 * ```
 *
 * @param block Registration block scoped to a [FontFamilyRegistry.Builder].
 * @return Configured [FontFamilyRegistry].
 */
public fun fontRegistry(
    block: FontFamilyRegistry.Builder.() -> Unit,
): FontFamilyRegistry = FontFamilyRegistry.Builder().apply(block).build()
