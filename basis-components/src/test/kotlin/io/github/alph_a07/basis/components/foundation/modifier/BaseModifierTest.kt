package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.ui.Modifier
import kotlin.test.assertNotNull
import kotlin.test.assertSame
import org.junit.Test

/** Unit tests for [basisModifier]. */
class BaseModifierTest {

    @Test
    fun basisModifier_returnsModifier() {
        val modifier = Modifier.basisModifier()

        assertNotNull(modifier)
    }

    @Test
    fun basisModifier_chainsOnExistingModifier() {
        val initial = Modifier
        val result = initial.basisModifier()

        assertSame(initial, result)
    }
}
