package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.SemanticsPropertyReceiver
import androidx.compose.ui.semantics.semantics

/**
 * Attaches accessibility and testing semantics to the layout node.
 *
 * @param mergeDescendants Whether semantics of descendant nodes should be merged into this node.
 * @param properties Configuration lambda executed on [SemanticsPropertyReceiver].
 * @return Configured [Modifier].
 */
public fun Modifier.basisSemantics(
    mergeDescendants: Boolean = false,
    properties: SemanticsPropertyReceiver.() -> Unit,
): Modifier = semantics(mergeDescendants = mergeDescendants, properties = properties)
