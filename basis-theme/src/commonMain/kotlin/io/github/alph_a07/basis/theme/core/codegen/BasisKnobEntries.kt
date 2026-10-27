package io.github.alph_a07.basis.theme.core.codegen

/**
 * Marks a knob entry data class for code generation.
 *
 * @property prefix Stable dotted root of every generated path, e.g. `mood.knobs`.
 */
@Target(AnnotationTarget.CLASS)
internal annotation class BasisKnobEntries(
    val prefix: String,
)
