package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.shape.CircleShape
import androidx.compose.ui.Modifier
import kotlin.test.assertNotNull
import org.junit.Test

/** Unit tests for [basisClip]. */
class ClipModifierTest {

    @Test
    fun basisClip_returnsModifier() {
        val modifier = Modifier.basisClip(CircleShape)

        assertNotNull(modifier)
    }
}
