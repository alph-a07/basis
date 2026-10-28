package io.github.alph_a07.basis.theme.resolution.parity

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.core.SpValue
import io.github.alph_a07.basis.theme.core.ThemeMode
import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.core.color.Oklch
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
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import io.github.alph_a07.basis.theme.intent.controls.ContrastConstraint
import io.github.alph_a07.basis.theme.intent.controls.ModeControl
import io.github.alph_a07.basis.theme.intent.controls.MotionConstraint
import io.github.alph_a07.basis.theme.intent.controls.TouchTargetConstraint
import io.github.alph_a07.basis.theme.intent.controls.TypographyConstraints
import io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue
import io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath

data class CorpusCase(
    val id: String,
    val intent: BasisIntent,
)

object ParityCorpus {
    val cases: List<CorpusCase> = buildCorpus()

    @Suppress("LongMethod")
    private fun buildCorpus(): List<CorpusCase> {
        val list = mutableListOf<CorpusCase>()

        // 1. Empty / Default
        list += CorpusCase("empty_default", BasisIntent())

        // 2. Each Mood Preset
        for (preset in MoodPreset.entries) {
            list +=
                CorpusCase(
                    "mood_preset_${preset.name.lowercase()}",
                    BasisIntent(mood = MoodIntent(preset = preset)),
                )
        }

        // 3. Each ProductDomain
        for (domain in ProductDomain.entries) {
            list +=
                CorpusCase(
                    "domain_${domain.name.lowercase()}",
                    BasisIntent(domain = DomainIntent(domains = setOf(domain))),
                )
        }

        // 4. Each InteractionPattern
        for (pattern in InteractionPattern.entries) {
            list +=
                CorpusCase(
                    "interaction_${pattern.name.lowercase()}",
                    BasisIntent(domain = DomainIntent(interactions = setOf(pattern))),
                )
        }

        // 5. Domain + Interaction Blends
        list +=
            CorpusCase(
                "blend_finance_forms",
                BasisIntent(
                    domain =
                        DomainIntent(
                            domains = setOf(ProductDomain.Finance),
                            interactions = setOf(InteractionPattern.FormsEntry),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "blend_social_media_chat",
                BasisIntent(
                    domain =
                        DomainIntent(
                            domains = setOf(ProductDomain.Social, ProductDomain.Media),
                            interactions = setOf(InteractionPattern.ChatMessaging, InteractionPattern.ContentFeed),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "blend_commerce_checkout",
                BasisIntent(
                    domain =
                        DomainIntent(
                            domains = setOf(ProductDomain.Commerce),
                            interactions = setOf(InteractionPattern.CheckoutCommerce),
                        ),
                ),
            )

        // 6. Brand Colors
        list +=
            CorpusCase(
                "brand_achromatic_gray",
                BasisIntent(identity = IdentityIntent(brandColor = ColorSpec.Hex("#808080"))),
            )
        list +=
            CorpusCase(
                "brand_achromatic_black",
                BasisIntent(identity = IdentityIntent(brandColor = ColorSpec.Hex("#000000"))),
            )
        list +=
            CorpusCase(
                "brand_achromatic_white",
                BasisIntent(identity = IdentityIntent(brandColor = ColorSpec.Hex("#FFFFFF"))),
            )
        list +=
            CorpusCase(
                "brand_out_of_gamut_high_chroma",
                BasisIntent(identity = IdentityIntent(brandColor = Oklch(0.7f, 0.45f, 150f))),
            )
        list +=
            CorpusCase(
                "brand_with_supporting_single",
                BasisIntent(
                    identity =
                        IdentityIntent(
                            brandColor = ColorSpec.Hex("#1976D2"),
                            supportingColors = listOf(ColorSpec.Hex("#388E3C")),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "brand_with_supporting_three",
                BasisIntent(
                    identity =
                        IdentityIntent(
                            brandColor = ColorSpec.Hex("#1976D2"),
                            supportingColors =
                                listOf(
                                    ColorSpec.Hex("#388E3C"),
                                    ColorSpec.Hex("#F57C00"),
                                    ColorSpec.Hex("#7B1FA2"),
                                ),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "brand_with_supporting_excess",
                BasisIntent(
                    identity =
                        IdentityIntent(
                            brandColor = ColorSpec.Hex("#1976D2"),
                            supportingColors =
                                listOf(
                                    ColorSpec.Hex("#388E3C"),
                                    ColorSpec.Hex("#F57C00"),
                                    ColorSpec.Hex("#7B1FA2"),
                                    ColorSpec.Hex("#D32F2F"),
                                ),
                        ),
                ),
            )
        for (presence in BrandPresence.entries) {
            list +=
                CorpusCase(
                    "brand_presence_${presence.name.lowercase()}",
                    BasisIntent(
                        identity =
                            IdentityIntent(
                                brandColor = ColorSpec.Hex("#0066CC"),
                                presence = presence,
                            ),
                    ),
                )
        }
        list +=
            CorpusCase(
                "brand_derive_colors_false",
                BasisIntent(identity = IdentityIntent(deriveColors = false)),
            )

        // 7. Knob extremes at ±1 and non-finite values
        list +=
            CorpusCase(
                "knobs_extreme_positive_one",
                BasisIntent(
                    mood =
                        MoodIntent(
                            knobs =
                                MoodKnobs(
                                    warmth = 1f,
                                    chroma = 1f,
                                    contrast = 1f,
                                    density = 1f,
                                    roundness = 1f,
                                    typographyExpressiveness = 1f,
                                    motionEnergy = 1f,
                                    playfulness = 1f,
                                ),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "knobs_extreme_negative_one",
                BasisIntent(
                    mood =
                        MoodIntent(
                            knobs =
                                MoodKnobs(
                                    warmth = -1f,
                                    chroma = -1f,
                                    contrast = -1f,
                                    density = -1f,
                                    roundness = -1f,
                                    typographyExpressiveness = -1f,
                                    motionEnergy = -1f,
                                    playfulness = -1f,
                                ),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "knobs_extreme_mixed",
                BasisIntent(
                    mood =
                        MoodIntent(
                            knobs =
                                MoodKnobs(
                                    warmth = 1f,
                                    chroma = -1f,
                                    contrast = 1f,
                                    density = -1f,
                                    roundness = 1f,
                                    typographyExpressiveness = -1f,
                                    motionEnergy = 1f,
                                    playfulness = -1f,
                                ),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "knobs_non_finite_nan_and_infinity",
                BasisIntent(
                    mood =
                        MoodIntent(
                            knobs =
                                MoodKnobs(
                                    warmth = Float.NaN,
                                    chroma = Float.POSITIVE_INFINITY,
                                    contrast = Float.NEGATIVE_INFINITY,
                                    density = 2.5f,
                                    roundness = -3.0f,
                                ),
                        ),
                ),
            )

        // 8. Constraints
        list +=
            CorpusCase(
                "constraints_high_contrast",
                BasisIntent(
                    control =
                        ControlIntent(
                            constraints =
                                ConstraintsControl(
                                    minContrast = ContrastConstraint(7.0f),
                                ),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "constraints_touch_target_and_scale",
                BasisIntent(
                    control =
                        ControlIntent(
                            constraints =
                                ConstraintsControl(
                                    minTouchTarget = TouchTargetConstraint(DpValue(56f)),
                                    typography = TypographyConstraints(minReadableSize = SpValue(14f)),
                                ),
                        ),
                ),
            )
        list +=
            CorpusCase(
                "constraints_motion_reduced",
                BasisIntent(
                    control =
                        ControlIntent(
                            constraints =
                                ConstraintsControl(
                                    motion = MotionConstraint(preferReducedMotion = true),
                                ),
                        ),
                ),
            )

        // 9. Mode combinations
        list +=
            CorpusCase(
                "mode_light_only",
                BasisIntent(control = ControlIntent(mode = ModeControl(targets = setOf(ThemeMode.Light)))),
            )
        list +=
            CorpusCase(
                "mode_dark_only",
                BasisIntent(control = ControlIntent(mode = ModeControl(targets = setOf(ThemeMode.Dark)))),
            )
        list +=
            CorpusCase(
                "mode_light_and_dark",
                BasisIntent(
                    control = ControlIntent(mode = ModeControl(targets = setOf(ThemeMode.Light, ThemeMode.Dark))),
                ),
            )

        // 10. Overrides
        list +=
            CorpusCase(
                "overrides_token_color_and_radius",
                BasisIntent(
                    control =
                        ControlIntent(
                            tokens =
                                TokenOverrides(
                                    paths =
                                        mapOf(
                                            ColorTokenPath.BrandPrimary.path to
                                                OverrideValue.Color(Oklch(0.4f, 0.2f, 250f)),
                                            RadiusTokenPath.Level4.path to OverrideValue.Dp(DpValue(16f)),
                                            SpacingTokenPath.Level4.path to OverrideValue.Dp(DpValue(24f)),
                                        ),
                                ),
                        ),
                ),
            )

        return list
    }
}
