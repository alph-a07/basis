package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.selection.toggleable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc

/**
 * Configures the element to be toggleable with Basis indication, semantics, and minimum touch target.
 *
 * @param value Current checked or toggle state of the element.
 * @param enabled Whether toggle interaction is active; when false, interaction is suppressed.
 * @param role Accessibility [Role] describing the element's semantic role.
 * @param interactionSource Optional [MutableInteractionSource] to observe or emit interaction events.
 * @param shape Optional [Shape] to conform visual press indication highlights to.
 * @param onValueChange Callback invoked with the new state when toggled.
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-toggleable",
    role = "Checkbox",
    minTouchTargetDp = 48,
    touchTargetEnforced = true,
    respectsReducedMotion = true,
    sampleCode =
        "Row(\n" +
            "    modifier = Modifier\n" +
            "        .basisToggleable(\n" +
            "            value = isChecked,\n" +
            "            role = Role.Checkbox,\n" +
            "            onValueChange = { isChecked = it }\n" +
            "        )\n" +
            "        .basisPadding(all = BasisTheme.spacing.level2)\n" +
            ") {\n" +
            "    Checkbox(checked = isChecked, onCheckedChange = null)\n" +
            "    BasicText(\"Enable Push Notifications\")\n" +
            "}",
)
public fun Modifier.basisToggleable(
    value: Boolean,
    enabled: Boolean = true,
    role: Role? = null,
    interactionSource: MutableInteractionSource? = null,
    shape: Shape? = null,
    onValueChange: (Boolean) -> Unit,
): Modifier {
    val indication = createBasisIndication(shape = shape)
    val toggleableModifier =
        Modifier.toggleable(
            value = value,
            interactionSource = interactionSource,
            indication = indication,
            enabled = enabled,
            role = role,
            onValueChange = onValueChange,
        )

    val focusRingModifier =
        if (enabled) {
            Modifier.basisFocusRing(shape = shape ?: RectangleShape)
        } else {
            Modifier
        }

    return this
        .basisModifier()
        .then(focusRingModifier)
        .then(toggleableModifier)
        .basisMinTouchTarget()
}
