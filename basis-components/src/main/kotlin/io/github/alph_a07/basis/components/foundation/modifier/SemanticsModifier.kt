package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.SemanticsPropertyReceiver
import androidx.compose.ui.semantics.semantics
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc

/**
 * Attaches accessibility and testing semantics to the layout node.
 *
 * @param mergeDescendants Whether semantics of descendant nodes should be merged into this node.
 * @param properties Configuration lambda executed on [SemanticsPropertyReceiver].
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-semantics",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = false,
    sampleCode =
        "Box(\n" +
            "    modifier = Modifier.basisSemantics {\n" +
            "        role = Role.Tab\n" +
            "        stateDescription = \"Selected tab 1 of 3\"\n" +
            "    }\n" +
            ") {\n" +
            "    Text(\"Overview\")\n" +
            "}",
)
public fun Modifier.basisSemantics(
    mergeDescendants: Boolean = false,
    properties: SemanticsPropertyReceiver.() -> Unit,
): Modifier = basisModifier().semantics(mergeDescendants = mergeDescendants, properties = properties)
