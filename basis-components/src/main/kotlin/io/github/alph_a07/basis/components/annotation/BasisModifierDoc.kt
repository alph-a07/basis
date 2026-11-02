package io.github.alph_a07.basis.components.annotation

/**
 * Metadata annotation for Basis foundation modifier documentation generation.
 *
 * @property id Kebab-case identifier for documentation routing.
 * @property role Compose accessibility semantics role name.
 * @property minTouchTargetDp Minimum physical touch target width and height in dp.
 * @property touchTargetEnforced Whether the 48dp minimum touch target is strictly enforced.
 * @property respectsReducedMotion Whether the modifier respects reduced motion user settings.
 * @property sampleCode Idiomatic Compose call-site usage snippet.
 */
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.SOURCE)
public annotation class BasisModifierDoc(
    val id: String = "",
    val role: String = "None",
    val minTouchTargetDp: Int = 0,
    val touchTargetEnforced: Boolean = false,
    val respectsReducedMotion: Boolean = false,
    val sampleCode: String = "",
)
