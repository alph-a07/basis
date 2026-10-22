package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.clickable
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role

/**
 * Configures the element to be clickable with Basis indication, accessibility semantics, and minimum touch target.
 *
 * @param enabled Whether the click affordance is active; when false, interaction is suppressed.
 * @param onClickLabel Optional semantic action description for accessibility services.
 * @param role Accessibility [Role] describing the element's semantic role.
 * @param onLongClickLabel Optional semantic long-press action description for accessibility services.
 * @param interactionSource Optional [MutableInteractionSource] to observe or emit interaction events.
 * @param shape Optional [Shape] to conform visual press indication highlights to.
 * @param onLongClick Optional callback invoked on long press.
 * @param onClick Callback invoked when the element is clicked.
 * @return Configured [Modifier].
 */
@OptIn(ExperimentalFoundationApi::class)
public fun Modifier.basisClickable(
    enabled: Boolean = true,
    onClickLabel: String? = null,
    role: Role? = null,
    onLongClickLabel: String? = null,
    interactionSource: MutableInteractionSource? = null,
    shape: Shape? = null,
    onLongClick: (() -> Unit)? = null,
    onClick: () -> Unit,
): Modifier {
    val indication = createBasisIndication(shape = shape)
    val clickableModifier =
        if (onLongClick != null) {
            Modifier.combinedClickable(
                interactionSource = interactionSource,
                indication = indication,
                enabled = enabled,
                onClickLabel = onClickLabel,
                role = role,
                onLongClickLabel = onLongClickLabel,
                onLongClick = onLongClick,
                onClick = onClick,
            )
        } else {
            Modifier.clickable(
                interactionSource = interactionSource,
                indication = indication,
                enabled = enabled,
                onClickLabel = onClickLabel,
                role = role,
                onClick = onClick,
            )
        }

    return this
        .then(clickableModifier)
        .basisMinTouchTarget()
}

/**
 * Configures the element to be clickable with Basis indication, semantics, and minimum touch target.
 *
 * @param enabled Whether the click affordance is active; when false, interaction is suppressed.
 * @param role Accessibility [Role] describing the element's semantic role.
 * @param interactionSource Optional [MutableInteractionSource] to observe or emit interaction events.
 * @param shape Optional [Shape] to conform visual press indication highlights to.
 * @param onLongClick Optional callback invoked on long press.
 * @param onClick Callback invoked when the element is clicked.
 * @return Configured [Modifier].
 */
@OptIn(ExperimentalFoundationApi::class)
public fun Modifier.basisClickable(
    enabled: Boolean = true,
    role: Role? = null,
    interactionSource: MutableInteractionSource? = null,
    shape: Shape? = null,
    onLongClick: (() -> Unit)? = null,
    onClick: () -> Unit,
): Modifier = basisClickable(
    enabled = enabled,
    onClickLabel = null,
    role = role,
    onLongClickLabel = null,
    interactionSource = interactionSource,
    shape = shape,
    onLongClick = onLongClick,
    onClick = onClick,
)
