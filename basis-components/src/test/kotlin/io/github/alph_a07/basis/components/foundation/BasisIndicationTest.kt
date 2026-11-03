package io.github.alph_a07.basis.components.foundation

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue
import org.junit.Test

/** Unit tests for [BasisIndication] configuration, value equality, and [BasisIndicationDefaults]. */
class BasisIndicationTest {

    @Test
    fun defaultConstructor_setsExpectedDefaults() {
        val indication = BasisIndication()

        assertEquals(Color.Unspecified, indication.color)
        assertNull(indication.shape)
        assertNull(indication.treatment)
        assertTrue(indication.bounded)
    }

    @Test
    fun customConstructor_setsConfiguredValues() {
        val shape = RoundedCornerShape(8.dp)
        val indication =
            BasisIndication(
                color = Color.Red,
                shape = shape,
                treatment = Treatment.Inverse,
                bounded = false,
            )

        assertEquals(Color.Red, indication.color)
        assertEquals(shape, indication.shape)
        assertEquals(Treatment.Inverse, indication.treatment)
        assertFalse(indication.bounded)
    }

    @Test
    fun equalsAndHashCode_honorsValueEquality() {
        val indication1 =
            BasisIndication(
                color = Color.Cyan,
                shape = CircleShape,
                treatment = Treatment.Fill,
                bounded = true,
            )
        val indication2 =
            BasisIndication(
                color = Color.Cyan,
                shape = CircleShape,
                treatment = Treatment.Fill,
                bounded = true,
            )
        val indicationDifferentColor = indication1.copy(color = Color.Magenta)
        val indicationDifferentShape = indication1.copy(shape = RectangleShape)
        val indicationDifferentTreatment = indication1.copy(treatment = Treatment.Outline)
        val indicationDifferentBounded = indication1.copy(bounded = false)

        assertEquals(indication1, indication2)
        assertEquals(indication1.hashCode(), indication2.hashCode())

        assertNotEquals(indication1, indicationDifferentColor)
        assertNotEquals(indication1, indicationDifferentShape)
        assertNotEquals(indication1, indicationDifferentTreatment)
        assertNotEquals(indication1, indicationDifferentBounded)
    }

    @Test
    fun create_returnsDelegatableNode() {
        val indication = BasisIndication()
        val interactionSource = MutableInteractionSource()

        val node = indication.create(interactionSource)

        assertNotNull(node)
    }

    @Test
    fun defaults_exposeSensibleThresholds() {
        assertEquals(0.12f, BasisIndicationDefaults.PRESSED_ALPHA)
        assertEquals(0.04f, BasisIndicationDefaults.HOVERED_ALPHA)
        assertEquals(0.10f, BasisIndicationDefaults.FOCUSED_ALPHA)
        assertEquals(1.5.dp, BasisIndicationDefaults.HoverStrokeWidth)
        assertEquals(2.dp, BasisIndicationDefaults.FocusStrokeWidth)
        assertEquals(0.6f, BasisIndicationDefaults.RADIUS_EXPANSION_RATIO)
        assertEquals(0.40f, BasisIndicationDefaults.MIN_RADIUS_FRACTION)
        assertEquals(80L, BasisIndicationDefaults.MIN_PRESS_HOLD_MS)
        assertEquals(0.72f, BasisIndicationDefaults.PRESS_SPRING_DAMPING)
        assertEquals(280f, BasisIndicationDefaults.PRESS_SPRING_STIFFNESS)
        assertEquals(80, BasisIndicationDefaults.FILL_CROSS_FADE_MS)
        assertEquals(160, BasisIndicationDefaults.FADE_OUT_MS)
        assertEquals(120, BasisIndicationDefaults.CANCEL_FADE_MS)
        assertEquals(80, BasisIndicationDefaults.HOVER_IN_MS)
        assertEquals(120, BasisIndicationDefaults.HOVER_OUT_MS)
        assertEquals(100, BasisIndicationDefaults.FOCUS_IN_MS)
        assertEquals(140, BasisIndicationDefaults.FOCUS_OUT_MS)
    }
}
