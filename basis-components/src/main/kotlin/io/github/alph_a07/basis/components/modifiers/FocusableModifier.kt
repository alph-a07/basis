package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.focusable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc

/**
 * Configures the element to be focusable with Basis high-contrast focus ring feedback.
 *
 * @param enabled Whether focus interaction is active; when false, interaction is suppressed.
 * @param interactionSource Optional [MutableInteractionSource] to observe or emit interaction events.
 * @param shape Optional [Shape] conforming the focus ring outline. Defaults to [RectangleShape].
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-focusable",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = true,
    sampleCode =
        "val interactionSource = remember { MutableInteractionSource() }\n\n" +
            "Box(\n" +
            "    modifier = Modifier\n" +
            "        .basisFocusable(\n" +
            "            interactionSource = interactionSource,\n" +
            "            shape = RoundedCornerShape(BasisTheme.radius.level1.toDp())\n" +
            "        )\n" +
            "        .basisPadding(all = BasisTheme.spacing.level3)\n" +
            ") {\n" +
            "    BasicText(\"Focusable Element\")\n" +
            "}",
)
public fun Modifier.basisFocusable(
    enabled: Boolean = true,
    interactionSource: MutableInteractionSource? = null,
    shape: Shape? = null,
): Modifier {
    val focusRingModifier =
        if (enabled) {
            basisFocusRing(shape = shape ?: RectangleShape)
        } else {
            Modifier
        }

    return this
        .basisModifier()
        .then(focusRingModifier)
        .focusable(
            enabled = enabled,
            interactionSource = interactionSource,
        )
}
