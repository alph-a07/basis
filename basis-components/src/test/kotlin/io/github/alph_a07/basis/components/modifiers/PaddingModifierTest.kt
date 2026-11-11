package io.github.alph_a07.basis.components.modifiers

import androidx.compose.ui.Modifier
import io.github.alph_a07.basis.theme.core.DpValue
import kotlin.test.assertNotNull
import org.junit.Test

/** Unit tests for [basisPadding]. */
class PaddingModifierTest {

    @Test
    fun basisPadding_directional_returnsModifier() {
        val modifier =
            Modifier.basisPadding(
                start = DpValue(8f),
                top = DpValue(12f),
                end = DpValue(16f),
                bottom = DpValue(20f),
            )

        assertNotNull(modifier)
    }

    @Test
    fun basisPadding_symmetric_returnsModifier() {
        val modifier =
            Modifier.basisPadding(
                horizontal = DpValue(8f),
                vertical = DpValue(12f),
            )

        assertNotNull(modifier)
    }

    @Test
    fun basisPadding_all_returnsModifier() {
        val modifier = Modifier.basisPadding(all = DpValue(16f))

        assertNotNull(modifier)
    }
}
