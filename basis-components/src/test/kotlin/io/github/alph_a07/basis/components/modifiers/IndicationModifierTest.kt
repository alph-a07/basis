package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.shape.CircleShape
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertNotNull
import org.junit.Test

/** Unit tests for indication creation and equality within [basisIndication]. */
class IndicationModifierTest {

    @Test
    fun createBasisIndication_returnsNonNullFactory() {
        val factory = createBasisIndication(color = Color.Red, shape = CircleShape)

        assertNotNull(factory)
    }

    @Test
    fun factory_equalsAndHashCode_honorsValueEquality() {
        val factory1 = createBasisIndication(color = Color.Blue, shape = RectangleShape)
        val factory2 = createBasisIndication(color = Color.Blue, shape = RectangleShape)
        val factory3 = createBasisIndication(color = Color.Red, shape = RectangleShape)

        assertEquals(factory1, factory2)
        assertEquals(factory1.hashCode(), factory2.hashCode())

        assertNotEquals(factory1, factory3)
    }
}
