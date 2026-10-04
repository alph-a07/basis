package io.github.alph_a07.basis.tokens.typography

/**
 * A reference to a font family.
 *
 * This names a font-family decision without owning the font itself. It deliberately carries no
 * platform typeface: resolving a name to a renderable family — and loading or registering it — is
 * the platform layer's job, which keeps the token model platform-independent.
 *
 * A single resolved theme may reference several families at once, assigning them across
 * typography roles and levels; see [BasisFontFamilyAssignment].
 *
 * @property name The identifier of the family, supplied by whichever candidate source Theme
 *   Resolution draws on, whether a Basis-provided collection or a consumer's own font.
 */
@JvmInline
value class BasisFontFamily(val name: String) {
    init {
        require(name.isNotBlank()) { "A font family reference needs a non-blank name." }
    }

    override fun toString(): String = "BasisFontFamily($name)"
}
