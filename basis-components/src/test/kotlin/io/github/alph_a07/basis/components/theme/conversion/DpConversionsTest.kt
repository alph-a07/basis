package io.github.alph_a07.basis.components.theme.conversion

import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.theme.core.DpValue
import kotlin.test.assertEquals
import org.junit.Test

/**
 * Unit tests for [DpValue] and Compose [androidx.compose.ui.unit.Dp] bidirectional conversion.
 */
class DpConversionsTest {

    @Test
    fun toDp_convertsValueCorrectly() {
        val dpValue = DpValue(24f)
        val dp = dpValue.toDp()

        assertEquals(24.dp, dp)
    }

    @Test
    fun toDpValue_convertsDpCorrectly() {
        val dp = 16.dp
        val dpValue = dp.toDpValue()

        assertEquals(16f, dpValue.value)
    }

    @Test
    fun roundTrip_preservesMagnitude() {
        val original = DpValue(48.5f)
        val roundTripped = original.toDp().toDpValue()

        assertEquals(original.value, roundTripped.value)
    }
}
