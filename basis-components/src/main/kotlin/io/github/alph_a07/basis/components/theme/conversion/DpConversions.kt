package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.theme.core.DpValue

/**
 * Converts a pure-Kotlin [DpValue] into a Compose [Dp].
 *
 * @return The equivalent Compose [Dp].
 */
public fun DpValue.toDp(): Dp = value.dp

/**
 * Converts a Compose [Dp] into a pure-Kotlin [DpValue].
 *
 * @return The equivalent [DpValue].
 */
public fun Dp.toDpValue(): DpValue = DpValue(value)
