package io.github.alph_a07.basis.theme.core.format

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class NumberFormattingTest {

    @Test
    fun formatsBasicDoubles() {
        assertEquals("0", formatDeterministic(0.0))
        assertEquals("1", formatDeterministic(1.0))
        assertEquals("1.25", formatDeterministic(1.25))
        assertEquals("-0.5", formatDeterministic(-0.5))
        assertEquals("0.1235", formatDeterministic(0.123456))
        assertEquals("0.0001", formatDeterministic(0.0001))
        assertEquals("0", formatDeterministic(0.00001))
    }

    @Test
    fun formatsBasicFloats() {
        assertEquals("0", formatDeterministic(0f))
        assertEquals("1", formatDeterministic(1f))
        assertEquals("1.5", formatDeterministic(1.5f))
        assertEquals("-2.75", formatDeterministic(-2.75f))
        assertEquals("0.7", formatDeterministic(0.7f))
    }

    @Test
    fun handlesZeroDecimals() {
        assertEquals("1", formatDeterministic(1.49, maxDecimals = 0))
        assertEquals("2", formatDeterministic(1.5, maxDecimals = 0))
        assertEquals("-2", formatDeterministic(-1.5, maxDecimals = 0))
        assertEquals("0", formatDeterministic(0.4, maxDecimals = 0))
    }

    @Test
    fun handlesSpecialValues() {
        assertEquals("NaN", formatDeterministic(Double.NaN))
        assertEquals("Infinity", formatDeterministic(Double.POSITIVE_INFINITY))
        assertEquals("-Infinity", formatDeterministic(Double.NEGATIVE_INFINITY))
        assertEquals("0", formatDeterministic(-0.0))
    }

    @Test
    fun rejectsNegativeMaxDecimals() {
        assertFailsWith<IllegalArgumentException> {
            formatDeterministic(1.0, maxDecimals = -1)
        }
    }
}
