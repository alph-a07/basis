package io.github.alph_a07.basis.theme.core.codegen

/**
 * Marks a token path family for code generation.
 *
 * @property prefix Stable dotted root of every generated path, e.g. `color` or `size.icon`.
 * @property kind Family descriptor for the generated KDoc, e.g. `color token`.
 * @property excludes Property names skipped by the walk, for groups deliberately kept
 * string-level rather than referenceable.
 * @property paramName Receiver parameter name of the generated `resolveIn` function; defaults to
 * the last segment of [prefix].
 * @property enumDocNote Extra sentence appended to the generated enum's KDoc.
 * @property resolveDocNote Extra clause appended to the generated `resolveIn` KDoc after a
 * semicolon, including its trailing period.
 */
@Target(AnnotationTarget.CLASS, AnnotationTarget.PROPERTY)
internal annotation class BasisTokenPathFamily(
    val prefix: String,
    val kind: String,
    val excludes: Array<String> = [],
    val paramName: String = "",
    val enumDocNote: String = "",
    val resolveDocNote: String = "",
)
