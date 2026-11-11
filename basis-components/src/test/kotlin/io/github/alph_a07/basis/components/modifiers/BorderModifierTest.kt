package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.theme.core.DpValue
import kotlin.test.assertNotNull
import org.junit.Test

/** Unit tests for [basisBorder]. */
class BorderModifierTest {

    @Test
    fun basisBorder_withDp_returnsModifier() {
        val modifier = Modifier.basisBorder(width = 1.dp, color = Color.Red, shape = RoundedCornerShape(4.dp))

        assertNotNull(modifier)
    }

    @Test
    fun basisBorder_withDpValue_returnsModifier() {
        val modifier = Modifier.basisBorder(width = DpValue(1f), color = Color.Red, shape = RoundedCornerShape(4.dp))

        assertNotNull(modifier)
    }

    @Test
    fun basisBorder_withBorderStroke_returnsModifier() {
        val stroke = BorderStroke(1.dp, Color.Red)
        val modifier = Modifier.basisBorder(border = stroke, shape = RoundedCornerShape(4.dp))

        assertNotNull(modifier)
    }
}
