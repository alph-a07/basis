package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.selection.selectable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role

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

    return this
        .then(selectableModifier)
        .basisMinTouchTarget()
}
