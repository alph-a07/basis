package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.selection.toggleable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role

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

    return this
        .then(toggleableModifier)
        .basisMinTouchTarget()
}
