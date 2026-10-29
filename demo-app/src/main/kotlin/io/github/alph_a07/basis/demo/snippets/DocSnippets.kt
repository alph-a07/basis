package io.github.alph_a07.basis.demo.snippets

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import io.github.alph_a07.basis.components.foundation.modifier.basisClickable
import io.github.alph_a07.basis.components.foundation.modifier.basisMinTouchTarget
import io.github.alph_a07.basis.components.foundation.modifier.basisSurface
import io.github.alph_a07.basis.components.theme.BasisTheme
import io.github.alph_a07.basis.components.theme.conversion.toDp
import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.intent.ControlIntent
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.IdentityIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverride
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentStylePatch
import io.github.alph_a07.basis.theme.intent.controls.overrides.UniversalStylePatch
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath

// region quickstart_button
@Composable
public fun BasisButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    Box(
        modifier =
            modifier
                .basisSurface(
                    shape = RoundedCornerShape(BasisTheme.radius.level2.toDp()),
                    color = BasisTheme.colors.brand.primary,
                )
                .basisClickable(onClick = onClick)
                .basisMinTouchTarget()
                .padding(
                    horizontal = BasisTheme.spacing.level4.toDp(),
                    vertical = BasisTheme.spacing.level2.toDp(),
                ),
    ) {
        content()
    }
}
// endregion quickstart_button

// region quickstart_app
@Composable
public fun QuickstartApp() {
    BasisTheme {
        Column(
            modifier =
                Modifier
                    .fillMaxSize()
                    .padding(BasisTheme.spacing.level4.toDp()),
        ) {
            Box(
                modifier =
                    Modifier
                        .basisSurface(
                            shape = RoundedCornerShape(BasisTheme.radius.level2.toDp()),
                            color = BasisTheme.colors.surface.elevated,
                        )
                        .padding(BasisTheme.spacing.level3.toDp()),
            ) {
                BasicText(
                    text = "Welcome to Basis",
                    style = BasisTheme.typography.content.level1,
                )
            }

            BasisButton(
                onClick = { /* trigger action */ },
                modifier = Modifier.padding(top = BasisTheme.spacing.level3.toDp()),
            ) {
                BasicText(
                    text = "Get Started",
                    style = BasisTheme.typography.content.level1,
                )
            }
        }
    }
}
// endregion quickstart_app

// region set_brand_intent
public val BrandIntent: BasisIntent =
    BasisIntent(
        identity =
            IdentityIntent(
                brandColor = ColorSpec.Hex("#0284C7"),
                presence = BrandPresence.Balanced,
            ),
    )
// endregion set_brand_intent

// region mood_domain_intent
public val FullAppIntent: BasisIntent =
    BasisIntent(
        identity =
            IdentityIntent(
                brandColor = ColorSpec.Hex("#0284C7"),
            ),
        mood =
            MoodIntent(
                preset = MoodPreset.Professional,
                knobs =
                    MoodKnobs(
                        density = 0.2f,
                        contrast = 0.15f,
                    ),
            ),
        domain =
            DomainIntent(
                domains = setOf(ProductDomain.Productivity),
                interactions = setOf(InteractionPattern.DataNavigation),
            ),
    )
// endregion mood_domain_intent

// region support_dark_mode
@Composable
public fun DarkModeApp() {
    // Defaults to isSystemInDarkTheme(), adapting to Android device settings
    BasisTheme(useDarkTheme = isSystemInDarkTheme()) {
        Box(
            modifier =
                Modifier
                    .fillMaxSize()
                    .basisSurface(
                        shape = RoundedCornerShape(0),
                        color = BasisTheme.colors.surface.default,
                    ),
        ) {
            BasicText(
                text = "Adapts automatically to system dark mode",
                style = BasisTheme.typography.content.level1,
            )
        }
    }
}
// endregion support_dark_mode

// region dark_mode_user_setting
public enum class AppThemeMode { Light, Dark, System }

@Composable
public fun UserSettingThemedApp(userSetting: AppThemeMode) {
    val isDark =
        when (userSetting) {
            AppThemeMode.Light -> false
            AppThemeMode.Dark -> true
            AppThemeMode.System -> isSystemInDarkTheme()
        }

    BasisTheme(useDarkTheme = isDark) {
        Box(
            modifier =
                Modifier
                    .fillMaxSize()
                    .basisSurface(
                        shape = RoundedCornerShape(0),
                        color = BasisTheme.colors.surface.default,
                    ),
        ) {
            BasicText(
                text = "Follows user preference setting",
                style = BasisTheme.typography.content.level1,
            )
        }
    }
}
// endregion dark_mode_user_setting

// region dark_mode_pinned
@Composable
public fun PinnedDarkModeApp() {
    // Pin UI to dark mode regardless of device settings
    BasisTheme(useDarkTheme = true) {
        Box(
            modifier =
                Modifier
                    .fillMaxSize()
                    .basisSurface(
                        shape = RoundedCornerShape(0),
                        color = BasisTheme.colors.surface.default,
                    ),
        ) {
            BasicText(
                text = "Always rendered with dark surface tokens",
                style = BasisTheme.typography.content.level1,
            )
        }
    }
}
// endregion dark_mode_pinned

// region customize_components
public val CustomInteractiveIntent: BasisIntent =
    BasisIntent(
        control =
            ControlIntent(
                components =
                    ComponentOverrides(
                        byComponent =
                            mapOf(
                                ComponentId.Interactive to
                                    ComponentOverride(
                                        all =
                                            ComponentStylePatch(
                                                universal =
                                                    UniversalStylePatch(
                                                        radius = RadiusTokenPath.Level2,
                                                    ),
                                            ),
                                    ),
                            ),
                    ),
            ),
    )
// endregion customize_components

// region check_theme_ci
public fun verifyThemeInCi() {
    val brandIntent =
        BasisIntent(
            identity =
                IdentityIntent(
                    brandColor = ColorSpec.Hex("#0284C7"),
                    presence = BrandPresence.Balanced,
                ),
        )

    val result = resolve(brandIntent)
    val entries = result.report.entries

    // Strict policy: fail on any rejected intent values
    val rejected = entries.filter { it.status == ReportStatus.Rejected }

    check(rejected.isEmpty()) {
        "Theme intent contains ${rejected.size} rejected inputs: " +
            rejected.joinToString { "${it.path}: ${it.message}" }
    }

    // Optional policy: verify or fail on constraint-overridden values
    val overridden = entries.filter { it.status == ReportStatus.OverriddenByConstraint }

    check(overridden.isEmpty()) {
        "Theme intent contains ${overridden.size} values modified by constraints: " +
            overridden.joinToString { "${it.path}: ${it.message}" }
    }
}
// endregion check_theme_ci
