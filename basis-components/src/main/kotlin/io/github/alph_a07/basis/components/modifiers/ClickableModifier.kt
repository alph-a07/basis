package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.clickable
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.semantics.Role
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc

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
@BasisModifierDoc(
    id = "basis-clickable",
    role = "Button",
    minTouchTargetDp = 48,
    touchTargetEnforced = true,
    respectsReducedMotion = true,
    sampleCode =
        "val interactionSource = remember { MutableInteractionSource() }\n\n" +
            "Box(\n" +
            "    modifier = Modifier\n" +
            "        .basisClickable(\n" +
            "            interactionSource = interactionSource,\n" +
            "            shape = RoundedCornerShape(BasisTheme.radius.level2.toDp()),\n" +
            "            onClick = { /* handle action */ }\n" +
            "        )\n" +
            "        .basisPadding(all = BasisTheme.spacing.level3)\n" +
            ") {\n" +
            "    BasicText(\"Interactive Tile\")\n" +
            "}",
)
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

    val focusRingModifier =
        if (enabled) {
            Modifier.basisFocusRing(shape = shape ?: RectangleShape)
        } else {
            Modifier
        }

    return this
        .basisModifier()
        .then(focusRingModifier)
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
