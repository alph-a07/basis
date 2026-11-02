package io.github.alph_a07.basis.theme.core

/**
 * Declares the lifecycle metadata and version boundaries of a public API declaration.
 *
 * @property addedIn Release version in which this symbol was introduced (valid SemVer).
 * @property deprecatedIn Release version in which this symbol was marked deprecated with
 * [DeprecationLevel.WARNING], or empty if not deprecated.
 * @property discontinuedIn Release version in which this symbol was discontinued with
 * [DeprecationLevel.ERROR] or [DeprecationLevel.HIDDEN], or empty if not discontinued.
 */
@Target(
    AnnotationTarget.CLASS,
    AnnotationTarget.FUNCTION,
    AnnotationTarget.PROPERTY,
    AnnotationTarget.CONSTRUCTOR,
    AnnotationTarget.TYPEALIAS,
)
@Retention(AnnotationRetention.BINARY)
public annotation class Lifecycle(
    public val addedIn: String,
    public val deprecatedIn: String = "",
    public val discontinuedIn: String = "",
)
