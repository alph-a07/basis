package io.github.alph_a07.basis.theme.tokens.typography

/** Font family selected for a role. */
public sealed interface FontFamilyRef {
    /**
     * Catalog family chosen from vendored Google Fonts metadata.
     *
     * @property id Catalog family id.
     */
    public data class Catalog(public val id: GoogleFontId) : FontFamilyRef

    /**
     * Bring-your-own-font key registered at `BasisTheme` setup.
     *
     * @property key Consumer-registered key.
     */
    public data class Custom(public val key: CustomFontKey) : FontFamilyRef
}
