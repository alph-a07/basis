package io.github.alph_a07.basis.components.theme

import androidx.compose.runtime.staticCompositionLocalOf

/**
 * Composition local holding the [BasisThemeAmbient] for the current subtree.
 *
 * The default value is `null` so that any access outside a [BasisTheme] block produces a
 * meaningful error rather than a silent default. Reading this local directly is an implementation
 * detail of `basis-components`; external code reads through [BasisTheme.current].
 */
internal val LocalBasisTheme = staticCompositionLocalOf<BasisThemeAmbient?> { null }
