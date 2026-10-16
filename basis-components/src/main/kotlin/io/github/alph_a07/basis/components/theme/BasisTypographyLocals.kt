package io.github.alph_a07.basis.components.theme

import androidx.compose.ui.text.TextStyle
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Compose [TextStyle] tree derived from the OKLCH [TypographyTokens] at the `BasisTheme` entry
 * boundary.
 *
 * @property structure Title and hierarchy ladder, level 1 largest.
 * @property content Body and readable-text ladder, level 1 largest.
 * @property metadata Caption, label, and helper ladder, level 1 largest.
 */
public data class BasisTypographyLocals(
    public val structure: BasisStructureType,
    public val content: BasisContentType,
    public val metadata: BasisMetadataType,
)

/**
 * Compose [TextStyle] counterpart of the structure ladder.
 *
 * @property level1 Largest structure role.
 * @property level2 Second structure role.
 * @property level3 Third structure role.
 * @property level4 Fourth structure role.
 * @property level5 Fifth structure role.
 * @property level6 Smallest structure role.
 */
public data class BasisStructureType(
    public val level1: TextStyle,
    public val level2: TextStyle,
    public val level3: TextStyle,
    public val level4: TextStyle,
    public val level5: TextStyle,
    public val level6: TextStyle,
)

/**
 * Compose [TextStyle] counterpart of the content ladder.
 *
 * @property level1 Largest content role.
 * @property level2 Second content role.
 * @property level3 Third content role.
 * @property level4 Fourth content role.
 * @property level5 Smallest content role.
 */
public data class BasisContentType(
    public val level1: TextStyle,
    public val level2: TextStyle,
    public val level3: TextStyle,
    public val level4: TextStyle,
    public val level5: TextStyle,
)

/**
 * Compose [TextStyle] counterpart of the metadata ladder.
 *
 * @property level1 Largest metadata role.
 * @property level2 Second metadata role.
 * @property level3 Smallest metadata role.
 */
public data class BasisMetadataType(
    public val level1: TextStyle,
    public val level2: TextStyle,
    public val level3: TextStyle,
)
