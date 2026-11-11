package io.github.alph_a07.basis.components.modifiers

import androidx.compose.ui.Modifier

/**
 * Applies universal baseline modifier logic shared across all Basis modifiers and components.
 *
 * Serves as the single root entrypoint in the foundation modifier pipeline, ensuring common logic,
 * ambient diagnostics, inspection metadata, or design system behaviors can be added in one place
 * and applied uniformly everywhere.
 *
 * @return Configured [Modifier].
 */
public fun Modifier.basisModifier(): Modifier = this
