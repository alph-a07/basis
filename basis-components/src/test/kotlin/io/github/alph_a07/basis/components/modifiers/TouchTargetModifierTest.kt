package io.github.alph_a07.basis.components.modifiers

import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.theme.core.DpValue
import kotlin.test.assertNotNull
import org.junit.Test

/** Unit tests for [basisMinTouchTarget]. */
class TouchTargetModifierTest {

    @Test
    fun basisMinTouchTarget_default_returnsModifier() {
        val modifier = Modifier.basisMinTouchTarget()

        assertNotNull(modifier)
    }

    @Test
    fun basisMinTouchTarget_withDp_returnsModifier() {
        val modifier = Modifier.basisMinTouchTarget(min = 48.dp)

        assertNotNull(modifier)
    }

    @Test
    fun basisMinTouchTarget_withDpValue_returnsModifier() {
        val modifier = Modifier.basisMinTouchTarget(min = DpValue(48f))

        assertNotNull(modifier)
    }
}
