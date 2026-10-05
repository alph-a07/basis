package io.github.alph_a07.basis.tokens.vocabulary.size

/**
 * Pins down selected constituents of a control size.
 *
 * A `null` constituent expresses no preference for it, leaving that constituent to resolution. A
 * supplied constituent is an explicit requirement: resolution keeps it unless a mandatory
 * constraint makes it unsatisfiable.
 *
 * @property minHeight The control's minimum visual height in density-independent pixels, or `null`
 *   to leave it to the resolver.
 * @property horizontalPadding The interior padding on the leading and trailing edges, in
 *   density-independent pixels, or `null` to leave it to the resolver.
 * @property verticalPadding The interior padding on the top and bottom edges, in density-independent
 *   pixels, or `null` to leave it to the resolver.
 * @property iconSize The size of a leading or trailing icon, in density-independent pixels, or
 *   `null` to leave it to the resolver.
 */
data class BasisControlSizeSpec(
    val minHeight: Int? = null,
    val horizontalPadding: Int? = null,
    val verticalPadding: Int? = null,
    val iconSize: Int? = null,
)
