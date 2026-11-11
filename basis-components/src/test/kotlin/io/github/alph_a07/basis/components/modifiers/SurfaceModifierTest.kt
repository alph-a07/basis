package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import kotlin.test.assertNotNull
import org.junit.Test

/** Unit tests for [basisSurface]. */
class SurfaceModifierTest {

    @Test
    fun basisSurface_defaultClip_returnsModifier() {
        val modifier =
            Modifier.basisSurface(
                shape = RoundedCornerShape(8.dp),
                color = Color.White,
            )

        assertNotNull(modifier)
    }

    @Test
    fun basisSurface_unclipped_returnsModifier() {
        val modifier =
            Modifier.basisSurface(
                shape = RoundedCornerShape(8.dp),
                color = Color.White,
                clip = false,
            )

        assertNotNull(modifier)
    }

    @Test
    fun basisSurface_withBorder_returnsModifier() {
        val modifier =
            Modifier.basisSurface(
                shape = RoundedCornerShape(8.dp),
                color = Color.White,
                border = BorderStroke(1.dp, Color.Black),
            )

        assertNotNull(modifier)
    }
}
