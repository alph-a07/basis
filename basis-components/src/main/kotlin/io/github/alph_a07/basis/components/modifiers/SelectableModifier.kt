package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.selection.selectable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc

/**
 * Configures the element to be selectable with Basis indication, accessibility semantics, and minimum touch target.
 *
 * @param selected Whether the element is currently selected.
 * @param enabled Whether selection interaction is active; when false, interaction is suppressed.
 * @param role Accessibility [Role] describing the element's semantic role.
 * @param interactionSource Optional [MutableInteractionSource] to observe or emit interaction events.
 * @param shape Optional [Shape] to conform visual press indication highlights to.
 * @param onClick Callback invoked when the element is clicked.
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-selectable",
    role = "RadioButton",
    minTouchTargetDp = 48,
    touchTargetEnforced = true,
    respectsReducedMotion = true,
    sampleCode =
        "Row(\n" +
            "    modifier = Modifier\n" +
            "        .basisSelectable(\n" +
            "            selected = isSelected,\n" +
            "            role = Role.RadioButton,\n" +
            "            onClick = { onSelect() }\n" +
            "        )\n" +
            "        .basisPadding(all = BasisTheme.spacing.level2)\n" +
            ") {\n" +
            "    RadioButton(selected = isSelected, onClick = null)\n" +
            "    BasicText(\"Option Label\")\n" +
            "}",
)
public fun Modifier.basisSelectable(
    selected: Boolean,
    enabled: Boolean = true,
    role: Role? = null,
    interactionSource: MutableInteractionSource? = null,
    shape: Shape? = null,
    onClick: () -> Unit,
): Modifier {
    val indication = createBasisIndication(shape = shape)
    val selectableModifier =
        Modifier.selectable(
            selected = selected,
            interactionSource = interactionSource,
            indication = indication,
            enabled = enabled,
            role = role,
            onClick = onClick,
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
        .then(selectableModifier)
        .basisMinTouchTarget()
}
