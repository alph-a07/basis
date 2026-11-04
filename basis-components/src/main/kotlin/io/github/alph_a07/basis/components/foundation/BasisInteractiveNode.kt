package io.github.alph_a07.basis.components.foundation

import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.interaction.FocusInteraction
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusEventModifierNode
import androidx.compose.ui.focus.FocusState
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.input.key.Key
import androidx.compose.ui.input.key.KeyEvent
import androidx.compose.ui.input.key.KeyEventType
import androidx.compose.ui.input.key.KeyInputModifierNode
import androidx.compose.ui.input.key.key
import androidx.compose.ui.input.key.type
import androidx.compose.ui.input.pointer.SuspendingPointerInputModifierNode
import androidx.compose.ui.layout.Measurable
import androidx.compose.ui.layout.MeasureResult
import androidx.compose.ui.layout.MeasureScope
import androidx.compose.ui.node.CompositionLocalConsumerModifierNode
import androidx.compose.ui.node.DelegatingNode
import androidx.compose.ui.node.LayoutModifierNode
import androidx.compose.ui.node.ModifierNodeElement
import androidx.compose.ui.node.SemanticsModifierNode
import androidx.compose.ui.node.currentValueOf
import androidx.compose.ui.node.invalidateMeasurement
import androidx.compose.ui.node.invalidateSemantics
import androidx.compose.ui.platform.InspectorInfo
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.SemanticsPropertyReceiver
import androidx.compose.ui.semantics.disabled
import androidx.compose.ui.semantics.onClick
import androidx.compose.ui.semantics.onLongClick
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.toggleableState
import androidx.compose.ui.state.ToggleableState
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.isSpecified
import io.github.alph_a07.basis.components.annotation.BasisComponentDoc
import io.github.alph_a07.basis.components.foundation.modifier.basisModifier
import io.github.alph_a07.basis.components.theme.conversion.toDp
import io.github.alph_a07.basis.components.theme.locals.LocalBasisTheme
import kotlin.math.max
import kotlinx.coroutines.launch

/**
 * Shared interaction node handling click, select, and toggle gesture wiring, accessibility, and touch constraints.
 *
 * Centralizes pointer gesture detection, keyboard activation, focus state tracking, accessibility semantics,
 * and minimum touch target floors for interactive catalog components and custom controls.
 *
 * @property interactionSource Optional [MutableInteractionSource] to observe or emit interaction events.
 * @property enabled Whether user interaction is active; when false, gestures and key events are ignored.
 * @property role Accessibility [Role] describing the element's semantic role.
 * @property onClickLabel Optional semantic action description for accessibility services.
 * @property onLongClickLabel Optional semantic long-press action description for accessibility services.
 * @property minTouchTarget Minimum physical touch target dimension in [Dp].
 * @property onLongClick Optional callback invoked on long press.
 * @property onClick Optional callback invoked when clicked or activated.
 * @property selected Optional selection state for selectable elements.
 * @property checked Optional toggle state for toggleable elements.
 * @property onCheckedChange Optional callback invoked when toggle state changes.
 */
@BasisComponentDoc(
    id = "interactive-node",
    family = "Foundation",
    role = "Button",
    minTouchTargetDp = 48,
    respectsReducedMotion = true,
    quickStartSample =
        "val interactionSource = remember { MutableInteractionSource() }\n\n" +
            "Box(\n" +
            "    modifier = Modifier\n" +
            "        .basisInteractiveNode(\n" +
            "            interactionSource = interactionSource,\n" +
            "            onClick = { /* handle action */ }\n" +
            "        )\n" +
            ") {\n" +
            "    Text(\"Interactive Element\")\n" +
            "}",
)
public class BasisInteractiveNode(
    public var interactionSource: MutableInteractionSource? = null,
    public var enabled: Boolean = BasisInteractiveNodeDefaults.DEFAULT_ENABLED,
    public var role: Role? = null,
    public var onClickLabel: String? = null,
    public var onLongClickLabel: String? = null,
    public var minTouchTarget: Dp = Dp.Unspecified,
    public var onLongClick: (() -> Unit)? = null,
    public var onClick: (() -> Unit)? = null,
    public var selected: Boolean? = null,
    public var checked: Boolean? = null,
    public var onCheckedChange: ((Boolean) -> Unit)? = null,
) : DelegatingNode(),
    CompositionLocalConsumerModifierNode,
    LayoutModifierNode,
    SemanticsModifierNode,
    FocusEventModifierNode,
    KeyInputModifierNode {

    private val defaultInteractionSource = MutableInteractionSource()
    private var currentPress: PressInteraction.Press? = null
    private var currentKeyPress: PressInteraction.Press? = null
    private var currentFocus: FocusInteraction.Focus? = null
    private var isFocused: Boolean = false

    /**
     * Active [MutableInteractionSource] emitting press, hover, and focus events.
     */
    public val activeInteractionSource: MutableInteractionSource
        get() = interactionSource ?: defaultInteractionSource

    private val pointerInputNode =
        delegate(
            SuspendingPointerInputModifierNode {
                detectTapGestures(
                    onPress = { offset ->
                        if (!enabled) return@detectTapGestures
                        val press = PressInteraction.Press(offset)
                        currentPress = press

                        coroutineScope.launch { activeInteractionSource.emit(press) }
                        val released = tryAwaitRelease()
                        currentPress = null

                        coroutineScope.launch {
                            val endInteraction =
                                if (released) {
                                    PressInteraction.Release(press)
                                } else {
                                    PressInteraction.Cancel(press)
                                }

                            activeInteractionSource.emit(endInteraction)
                        }
                    },
                    onLongPress =
                        if (onLongClick != null && enabled) {
                            { onLongClick?.invoke() }
                        } else {
                            null
                        },
                    onTap = {
                        if (!enabled) return@detectTapGestures
                        val currentChecked = checked
                        val toggleHandler = onCheckedChange

                        if (currentChecked != null && toggleHandler != null) {
                            toggleHandler.invoke(!currentChecked)
                        } else {
                            onClick?.invoke()
                        }
                    },
                )
            },
        )

    /**
     * Updates interaction parameters, invalidating measurement, semantics, or active gestures when altered.
     */
    public fun update(
        interactionSource: MutableInteractionSource? = this.interactionSource,
        enabled: Boolean = this.enabled,
        role: Role? = this.role,
        onClickLabel: String? = this.onClickLabel,
        onLongClickLabel: String? = this.onLongClickLabel,
        minTouchTarget: Dp = this.minTouchTarget,
        onLongClick: (() -> Unit)? = this.onLongClick,
        onClick: (() -> Unit)? = this.onClick,
        selected: Boolean? = this.selected,
        checked: Boolean? = this.checked,
        onCheckedChange: ((Boolean) -> Unit)? = this.onCheckedChange,
    ) {
        val semanticsChanged =
            updateInteractionParams(interactionSource, enabled, role, onClickLabel, onLongClickLabel) or
                updateStateParams(onLongClick, onClick, selected, checked, onCheckedChange)
        val measurementChanged = this.minTouchTarget != minTouchTarget

        if (measurementChanged) {
            this.minTouchTarget = minTouchTarget
        }

        if (isAttached) {
            pointerInputNode.resetPointerInputHandler()
            if (semanticsChanged) {
                invalidateSemantics()
            }

            if (measurementChanged) {
                invalidateMeasurement()
            }
        }
    }

    private fun updateInteractionParams(
        newSource: MutableInteractionSource?,
        newEnabled: Boolean,
        newRole: Role?,
        newClickLabel: String?,
        newLongClickLabel: String?,
    ): Boolean {
        var changed = false

        if (this.enabled != newEnabled) {
            if (this.enabled && !newEnabled) {
                val press = currentPress
                currentPress = null

                if (press != null && isAttached) {
                    coroutineScope.launch { activeInteractionSource.emit(PressInteraction.Cancel(press)) }
                }
            }
            this.enabled = newEnabled

            changed = true
        }

        if (this.interactionSource != newSource) {
            this.interactionSource = newSource
        }

        if (this.role != newRole) {
            this.role = newRole

            changed = true
        }

        if (this.onClickLabel != newClickLabel) {
            this.onClickLabel = newClickLabel

            changed = true
        }

        if (this.onLongClickLabel != newLongClickLabel) {
            this.onLongClickLabel = newLongClickLabel

            changed = true
        }

        return changed
    }

    private fun updateStateParams(
        newLongClick: (() -> Unit)?,
        newClick: (() -> Unit)?,
        newSelected: Boolean?,
        newChecked: Boolean?,
        newToggle: ((Boolean) -> Unit)?,
    ): Boolean {
        var changed = false

        this.onLongClick = newLongClick
        this.onClick = newClick

        if (this.selected != newSelected) {
            this.selected = newSelected

            changed = true
        }

        if (this.checked != newChecked) {
            this.checked = newChecked

            changed = true
        }

        this.onCheckedChange = newToggle

        return changed
    }

    override fun MeasureScope.measure(
        measurable: Measurable,
        constraints: Constraints,
    ): MeasureResult {
        val placeable = measurable.measure(constraints)
        val resolvedMin =
            if (minTouchTarget.isSpecified) {
                minTouchTarget
            } else {
                currentValueOf(LocalBasisTheme)?.constraints?.minTouchTarget?.minSize?.toDp()
                    ?: BasisInteractiveNodeDefaults.DEFAULT_MIN_TOUCH_TARGET_DP
            }
        val minPx = resolvedMin.roundToPx()
        val targetWidth = max(placeable.width, minPx).coerceIn(constraints.minWidth, constraints.maxWidth)
        val targetHeight = max(placeable.height, minPx).coerceIn(constraints.minHeight, constraints.maxHeight)

        val x = (targetWidth - placeable.width) / 2
        val y = (targetHeight - placeable.height) / 2

        return layout(targetWidth, targetHeight) {
            placeable.place(x, y)
        }
    }

    override fun SemanticsPropertyReceiver.applySemantics() {
        val activeRole = this@BasisInteractiveNode.role
        if (activeRole != null) {
            role = activeRole
        }
        if (!this@BasisInteractiveNode.enabled) {
            disabled()
        }
        val activeSelected = this@BasisInteractiveNode.selected
        if (activeSelected != null) {
            selected = activeSelected
        }
        val activeChecked = this@BasisInteractiveNode.checked
        if (activeChecked != null) {
            toggleableState = ToggleableState(activeChecked)
        }
        if (this@BasisInteractiveNode.onClick != null || this@BasisInteractiveNode.onCheckedChange != null) {
            onClick(
                label = this@BasisInteractiveNode.onClickLabel,
                action = {
                    if (!this@BasisInteractiveNode.enabled) return@onClick false
                    val nodeChecked = this@BasisInteractiveNode.checked
                    val onToggle = this@BasisInteractiveNode.onCheckedChange
                    if (nodeChecked != null && onToggle != null) {
                        onToggle.invoke(!nodeChecked)
                    } else {
                        this@BasisInteractiveNode.onClick?.invoke()
                    }

                    true
                },
            )
        }
        val activeLongClick = this@BasisInteractiveNode.onLongClick

        if (activeLongClick != null) {
            onLongClick(
                label = this@BasisInteractiveNode.onLongClickLabel,
                action = {
                    if (!this@BasisInteractiveNode.enabled) return@onLongClick false
                    activeLongClick.invoke()

                    true
                },
            )
        }
    }

    override fun onFocusEvent(focusState: FocusState) {
        if (isFocused == focusState.isFocused) return
        isFocused = focusState.isFocused

        if (focusState.isFocused) {
            val focus = FocusInteraction.Focus()
            currentFocus = focus

            coroutineScope.launch { activeInteractionSource.emit(focus) }
        } else {
            val focus = currentFocus
            currentFocus = null

            if (focus != null) {
                coroutineScope.launch { activeInteractionSource.emit(FocusInteraction.Unfocus(focus)) }
            }
        }
    }

    override fun onKeyEvent(event: KeyEvent): Boolean {
        if (!enabled) return false
        val isActivationKey =
            event.key == Key.Enter ||
                event.key == Key.NumPadEnter ||
                event.key == Key.Spacebar
        if (!isActivationKey) return false

        return when (event.type) {
            KeyEventType.KeyDown -> {
                if (currentKeyPress == null) {
                    val press = PressInteraction.Press(Offset.Zero)
                    currentKeyPress = press

                    coroutineScope.launch { activeInteractionSource.emit(press) }
                }

                true
            }
            KeyEventType.KeyUp -> {
                val press = currentKeyPress
                currentKeyPress = null
                if (press != null) {
                    coroutineScope.launch { activeInteractionSource.emit(PressInteraction.Release(press)) }
                }
                val nodeChecked = checked
                val toggle = onCheckedChange
                if (nodeChecked != null && toggle != null) {
                    toggle.invoke(!nodeChecked)
                } else {
                    onClick?.invoke()
                }

                true
            }
            else -> false
        }
    }

    override fun onPreKeyEvent(event: KeyEvent): Boolean = false

    override fun onDetach() {
        val press = currentPress
        currentPress = null
        val keyPress = currentKeyPress
        currentKeyPress = null
        val focus = currentFocus
        currentFocus = null

        if (press != null || keyPress != null || focus != null) {
            coroutineScope.launch {
                if (press != null) {
                    activeInteractionSource.emit(PressInteraction.Cancel(press))
                }
                if (keyPress != null) {
                    activeInteractionSource.emit(PressInteraction.Cancel(keyPress))
                }

                if (focus != null) {
                    activeInteractionSource.emit(FocusInteraction.Unfocus(focus))
                }
            }
        }

        super.onDetach()
    }

    override fun onReset() {
        super.onReset()
        currentPress = null
        currentKeyPress = null
        currentFocus = null

        isFocused = false
    }
}

/**
 * Creates and remembers a [BasisInteractiveNode] configured with interaction states and callbacks.
 *
 * @param interactionSource Optional [MutableInteractionSource] to observe or emit interaction events.
 * @param enabled Whether user interaction is active; when false, gestures and key events are ignored.
 * @param role Accessibility [Role] describing the element's semantic role.
 * @param onClickLabel Optional semantic action description for accessibility services.
 * @param onLongClickLabel Optional semantic long-press action description for accessibility services.
 * @param minTouchTarget Minimum physical touch target dimension in [Dp].
 * @param onLongClick Optional callback invoked on long press.
 * @param onClick Optional callback invoked when clicked or activated.
 * @param selected Optional selection state for selectable elements.
 * @param checked Optional toggle state for toggleable elements.
 * @param onCheckedChange Optional callback invoked when toggle state changes.
 * @return Remembered [BasisInteractiveNode] instance.
 */
@Composable
public fun rememberBasisInteractiveNode(
    interactionSource: MutableInteractionSource? = null,
    enabled: Boolean = BasisInteractiveNodeDefaults.DEFAULT_ENABLED,
    role: Role? = null,
    onClickLabel: String? = null,
    onLongClickLabel: String? = null,
    minTouchTarget: Dp = Dp.Unspecified,
    onLongClick: (() -> Unit)? = null,
    onClick: (() -> Unit)? = null,
    selected: Boolean? = null,
    checked: Boolean? = null,
    onCheckedChange: ((Boolean) -> Unit)? = null,
): BasisInteractiveNode {
    val node =
        remember {
            BasisInteractiveNode(
                interactionSource = interactionSource,
                enabled = enabled,
                role = role,
                onClickLabel = onClickLabel,
                onLongClickLabel = onLongClickLabel,
                minTouchTarget = minTouchTarget,
                onLongClick = onLongClick,
                onClick = onClick,
                selected = selected,
                checked = checked,
                onCheckedChange = onCheckedChange,
            )
        }

    node.update(
        interactionSource = interactionSource,
        enabled = enabled,
        role = role,
        onClickLabel = onClickLabel,
        onLongClickLabel = onLongClickLabel,
        minTouchTarget = minTouchTarget,
        onLongClick = onLongClick,
        onClick = onClick,
        selected = selected,
        checked = checked,
        onCheckedChange = onCheckedChange,
    )

    return node
}

/**
 * Configures the element with interactive gesture handling, accessibility semantics, and touch constraints.
 *
 * @param interactionSource Optional [MutableInteractionSource] to observe or emit interaction events.
 * @param enabled Whether user interaction is active; when false, gestures and key events are ignored.
 * @param role Accessibility [Role] describing the element's semantic role.
 * @param onClickLabel Optional semantic action description for accessibility services.
 * @param onLongClickLabel Optional semantic long-press action description for accessibility services.
 * @param minTouchTarget Minimum physical touch target dimension in [Dp].
 * @param onLongClick Optional callback invoked on long press.
 * @param onClick Optional callback invoked when clicked or activated.
 * @param selected Optional selection state for selectable elements.
 * @param checked Optional toggle state for toggleable elements.
 * @param onCheckedChange Optional callback invoked when toggle state changes.
 * @return Configured [Modifier].
 */
public fun Modifier.basisInteractiveNode(
    interactionSource: MutableInteractionSource? = null,
    enabled: Boolean = BasisInteractiveNodeDefaults.DEFAULT_ENABLED,
    role: Role? = null,
    onClickLabel: String? = null,
    onLongClickLabel: String? = null,
    minTouchTarget: Dp = Dp.Unspecified,
    onLongClick: (() -> Unit)? = null,
    onClick: (() -> Unit)? = null,
    selected: Boolean? = null,
    checked: Boolean? = null,
    onCheckedChange: ((Boolean) -> Unit)? = null,
): Modifier = basisModifier() then
    BasisInteractiveNodeElement(
        interactionSource = interactionSource,
        enabled = enabled,
        role = role,
        onClickLabel = onClickLabel,
        onLongClickLabel = onLongClickLabel,
        minTouchTarget = minTouchTarget,
        onLongClick = onLongClick,
        onClick = onClick,
        selected = selected,
        checked = checked,
        onCheckedChange = onCheckedChange,
    )

private data class BasisInteractiveNodeElement(
    val interactionSource: MutableInteractionSource?,
    val enabled: Boolean,
    val role: Role?,
    val onClickLabel: String?,
    val onLongClickLabel: String?,
    val minTouchTarget: Dp,
    val onLongClick: (() -> Unit)?,
    val onClick: (() -> Unit)?,
    val selected: Boolean?,
    val checked: Boolean?,
    val onCheckedChange: ((Boolean) -> Unit)?,
) : ModifierNodeElement<BasisInteractiveNode>() {

    override fun create(): BasisInteractiveNode =
        BasisInteractiveNode(
            interactionSource = interactionSource,
            enabled = enabled,
            role = role,
            onClickLabel = onClickLabel,
            onLongClickLabel = onLongClickLabel,
            minTouchTarget = minTouchTarget,
            onLongClick = onLongClick,
            onClick = onClick,
            selected = selected,
            checked = checked,
            onCheckedChange = onCheckedChange,
        )

    override fun update(node: BasisInteractiveNode) {
        node.update(
            interactionSource = interactionSource,
            enabled = enabled,
            role = role,
            onClickLabel = onClickLabel,
            onLongClickLabel = onLongClickLabel,
            minTouchTarget = minTouchTarget,
            onLongClick = onLongClick,
            onClick = onClick,
            selected = selected,
            checked = checked,
            onCheckedChange = onCheckedChange,
        )
    }

    override fun InspectorInfo.inspectableProperties() {
        name = "basisInteractiveNode"
        properties["interactionSource"] = interactionSource
        properties["enabled"] = enabled
        properties["role"] = role
        properties["onClickLabel"] = onClickLabel
        properties["onLongClickLabel"] = onLongClickLabel
        properties["minTouchTarget"] = minTouchTarget
        properties["selected"] = selected

        properties["checked"] = checked
    }
}
