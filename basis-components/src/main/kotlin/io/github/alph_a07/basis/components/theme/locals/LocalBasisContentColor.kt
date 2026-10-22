package io.github.alph_a07.basis.components.theme.locals

import androidx.compose.runtime.ProvidableCompositionLocal
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * Composition local providing the preferred [Color] for content elements like text and icons.
 *
 * Surfaces provide this local to match their current surface and treatment roles, while
 * text and icon elements consume this value by default.
 */
public val LocalBasisContentColor: ProvidableCompositionLocal<Color> =
    compositionLocalOf { Color.Unspecified }
