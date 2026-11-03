package io.github.alph_a07.basis.components.annotation

/**
 * Metadata annotation for Basis component documentation generation.
 *
 * @property id Kebab-case identifier for documentation routing.
 * @property family Component taxonomy family name.
 * @property role Compose accessibility semantics role name.
 * @property minTouchTargetDp Minimum physical touch target width and height in dp (0 if not applicable).
 * @property respectsReducedMotion Whether the component respects reduced motion user settings.
 * @property quickStartSample Idiomatic Compose call-site usage snippet.
 */
@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.SOURCE)
public annotation class BasisComponentDoc(
    val id: String = "",
    val family: String = "Foundation",
    val role: String = "None",
    val minTouchTargetDp: Int = 0,
    val respectsReducedMotion: Boolean = true,
    val quickStartSample: String = "",
)
