package io.github.alph_a07.basis.components.modifiers

import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.SemanticsPropertyReceiver
import androidx.compose.ui.semantics.clearAndSetSemantics
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc

/**
 * Clears all descendant semantics and assigns new semantic properties to this layout node.
 *
 * Useful for TalkBack when custom controls contain internal sub-nodes (such as decorative icons or
 * composite labels) that should be exposed to accessibility services as a single coherent entity.
 *
 * @param properties Configuration lambda executed on [SemanticsPropertyReceiver].
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-clear-and-set-semantics",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = false,
    sampleCode =
        "Row(\n" +
            "    modifier = Modifier.basisClearAndSetSemantics {\n" +
            "        contentDescription = \"Rating: 4.5 out of 5 stars\"\n" +
            "    }\n" +
            ") {\n" +
            "    Icon(Icons.Default.Star, contentDescription = null)\n" +
            "    Text(\"4.5\")\n" +
            "}",
)
public fun Modifier.basisClearAndSetSemantics(
    properties: SemanticsPropertyReceiver.() -> Unit,
): Modifier = basisModifier().clearAndSetSemantics(properties = properties)
