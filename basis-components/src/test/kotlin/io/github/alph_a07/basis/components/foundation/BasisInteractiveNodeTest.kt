package io.github.alph_a07.basis.components.foundation

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertSame
import kotlin.test.assertTrue
import org.junit.Test

/** Unit tests for [BasisInteractiveNode], [BasisInteractiveNodeDefaults], and interactive wiring. */
class BasisInteractiveNodeTest {

    @Test
    fun defaultConstructor_setsExpectedDefaults() {
        val node = BasisInteractiveNode()

        assertNull(node.interactionSource)
        assertTrue(node.enabled)
        assertNull(node.role)
        assertNull(node.onClickLabel)
        assertNull(node.onLongClickLabel)
        assertNull(node.onLongClick)
        assertNull(node.onClick)
        assertNull(node.selected)
        assertNull(node.checked)
        assertNull(node.onCheckedChange)
        assertNotNull(node.activeInteractionSource)
    }

    @Test
    fun customConstructor_setsConfiguredValues() {
        val interactionSource = MutableInteractionSource()
        var clicked = false
        var longClicked = false
        var checkedValue = false

        val node =
            BasisInteractiveNode(
                interactionSource = interactionSource,
                enabled = false,
                role = Role.Checkbox,
                onClickLabel = "Toggle option",
                onLongClickLabel = "Show options",
                minTouchTarget = 56.dp,
                onLongClick = { longClicked = true },
                onClick = { clicked = true },
                selected = true,
                checked = false,
                onCheckedChange = { checkedValue = it },
            )

        assertSame(interactionSource, node.interactionSource)
        assertSame(interactionSource, node.activeInteractionSource)
        assertFalse(node.enabled)
        assertEquals(Role.Checkbox, node.role)
        assertEquals("Toggle option", node.onClickLabel)
        assertEquals("Show options", node.onLongClickLabel)
        assertEquals(56.dp, node.minTouchTarget)
        assertTrue(node.selected == true)
        assertFalse(node.checked == true)

        node.onClick?.invoke()
        assertTrue(clicked)

        node.onLongClick?.invoke()
        assertTrue(longClicked)

        node.onCheckedChange?.invoke(true)

        assertTrue(checkedValue)
    }

    @Test
    fun update_updatesPropertiesCorrectly() {
        val node = BasisInteractiveNode()
        val interactionSource = MutableInteractionSource()

        node.update(
            interactionSource = interactionSource,
            enabled = false,
            role = Role.Button,
            onClickLabel = "Submit",
            onLongClickLabel = "More actions",
            minTouchTarget = 48.dp,
            selected = false,
            checked = true,
        )

        assertSame(interactionSource, node.interactionSource)
        assertFalse(node.enabled)
        assertEquals(Role.Button, node.role)
        assertEquals("Submit", node.onClickLabel)
        assertEquals("More actions", node.onLongClickLabel)
        assertEquals(48.dp, node.minTouchTarget)
        assertFalse(node.selected == true)
        assertTrue(node.checked == true)
    }

    @Test
    fun defaults_exposeSensibleThresholds() {
        assertEquals(48.dp, BasisInteractiveNodeDefaults.DEFAULT_MIN_TOUCH_TARGET_DP)
        assertTrue(BasisInteractiveNodeDefaults.DEFAULT_ENABLED)
        assertEquals(500L, BasisInteractiveNodeDefaults.LONG_PRESS_TIMEOUT_MS)
        assertEquals(100L, BasisInteractiveNodeDefaults.TAP_TIMEOUT_MS)
    }
}
