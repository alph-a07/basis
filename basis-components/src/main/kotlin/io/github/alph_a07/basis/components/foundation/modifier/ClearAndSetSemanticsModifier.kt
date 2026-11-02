package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.SemanticsPropertyReceiver
import androidx.compose.ui.semantics.clearAndSetSemantics

/**
 * Clears all descendant semantics and assigns new semantic properties to this layout node.
 *
 * Useful for TalkBack when custom controls contain internal sub-nodes (such as decorative icons or
 * composite labels) that should be exposed to accessibility services as a single coherent entity.
 *
 * @param properties Configuration lambda executed on [SemanticsPropertyReceiver].
 * @return Configured [Modifier].
 */
public fun Modifier.basisClearAndSetSemantics(
    properties: SemanticsPropertyReceiver.() -> Unit,
): Modifier = basisModifier().clearAndSetSemantics(properties = properties)
