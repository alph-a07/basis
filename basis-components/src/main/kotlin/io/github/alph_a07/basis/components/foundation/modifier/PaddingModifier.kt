package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.theme.conversion.toDp
import io.github.alph_a07.basis.theme.core.DpValue

/**
 * Applies horizontal and vertical padding using Basis token dimensions.
 *
 * @param horizontal Optional horizontal padding in [DpValue].
 * @param vertical Optional vertical padding in [DpValue].
 * @return Configured [Modifier].
 */
public fun Modifier.basisPadding(
    horizontal: DpValue? = null,
    vertical: DpValue? = null,
): Modifier = padding(
    horizontal = horizontal?.toDp() ?: 0.dp,
    vertical = vertical?.toDp() ?: 0.dp,
)

/**
 * Applies uniform padding along all edges using a Basis token dimension.
 *
 * @param all Uniform padding in [DpValue].
 * @return Configured [Modifier].
 */
public fun Modifier.basisPadding(
    all: DpValue,
): Modifier = padding(all.toDp())
