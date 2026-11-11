package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlin.test.assertNotNull
import org.junit.Test

/** Unit tests for [basisFocusable]. */
class FocusableModifierTest {

    @Test
    fun basisFocusable_enabled_returnsModifier() {
        val modifier = Modifier.basisFocusable(enabled = true, shape = RoundedCornerShape(4.dp))

        assertNotNull(modifier)
    }

    @Test
    fun basisFocusable_disabled_returnsModifier() {
        val modifier = Modifier.basisFocusable(enabled = false)

        assertNotNull(modifier)
    }
}
