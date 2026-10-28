@file:Suppress("UnusedPrivateProperty")

package io.github.alph_a07.basis.theme.core.format

internal actual fun Double.toFloat32(): Float {
    val d = this

    return js("Math.fround(d)").unsafeCast<Float>()
}

internal actual fun Float.coerceToFloat32(): Float {
    val f = this

    return js("Math.fround(f)").unsafeCast<Float>()
}
