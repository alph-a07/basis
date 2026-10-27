package io.github.alph_a07.basis.theme.resolution.constants

import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.resolution.ThemeProfile

/**
 * Product domain label presets to its [ThemeProfile] behavioral setpoint.
 *
 * Values are setpoints in `[-1, 1]`; `Other` is [ThemeProfile.NEUTRAL] (no opinion).
 * Accessed via [Map.getValue] so a missing entry fails fast instead of silently
 * washing out the blend.
 */
internal val PRODUCT_DOMAIN_INFLUENCES: Map<ProductDomain, ThemeProfile> =
    mapOf(
        ProductDomain.Finance to
            ThemeProfile(
                riskSensitivity = 0.80f,
                trustStrictness = 0.75f,
                dataDensity = 0.55f,
                contentVelocity = -0.30f,
                socialPresence = -0.50f,
                transactionality = 0.40f,
                mediaRichness = -0.40f,
                inputHeaviness = 0.35f,
            ),
        ProductDomain.Health to
            ThemeProfile(
                riskSensitivity = 0.70f,
                trustStrictness = 0.80f,
                dataDensity = 0.20f,
                contentVelocity = -0.35f,
                socialPresence = -0.20f,
                transactionality = -0.10f,
                mediaRichness = -0.20f,
                inputHeaviness = 0.40f,
            ),
        ProductDomain.Social to
            ThemeProfile(
                riskSensitivity = -0.30f,
                trustStrictness = -0.20f,
                dataDensity = -0.10f,
                contentVelocity = 0.70f,
                socialPresence = 0.85f,
                transactionality = -0.10f,
                mediaRichness = 0.45f,
                inputHeaviness = -0.10f,
            ),
        ProductDomain.Productivity to
            ThemeProfile(
                riskSensitivity = 0.10f,
                trustStrictness = 0.35f,
                dataDensity = 0.65f,
                contentVelocity = -0.15f,
                socialPresence = -0.40f,
                transactionality = -0.20f,
                mediaRichness = -0.35f,
                inputHeaviness = 0.55f,
            ),
        ProductDomain.Commerce to
            ThemeProfile(
                riskSensitivity = 0.25f,
                trustStrictness = 0.40f,
                dataDensity = 0.15f,
                contentVelocity = 0.35f,
                socialPresence = 0.10f,
                transactionality = 0.85f,
                mediaRichness = 0.40f,
                inputHeaviness = 0.30f,
            ),
        ProductDomain.Media to
            ThemeProfile(
                riskSensitivity = -0.20f,
                trustStrictness = -0.10f,
                dataDensity = -0.20f,
                contentVelocity = 0.50f,
                socialPresence = 0.20f,
                transactionality = 0.10f,
                mediaRichness = 0.90f,
                inputHeaviness = -0.20f,
            ),
        ProductDomain.Education to
            ThemeProfile(
                riskSensitivity = 0.15f,
                trustStrictness = 0.50f,
                dataDensity = 0.25f,
                contentVelocity = -0.10f,
                socialPresence = -0.15f,
                transactionality = -0.30f,
                mediaRichness = 0.15f,
                inputHeaviness = 0.35f,
            ),
        ProductDomain.Travel to
            ThemeProfile(
                riskSensitivity = 0.10f,
                trustStrictness = 0.25f,
                dataDensity = -0.05f,
                contentVelocity = 0.30f,
                socialPresence = 0.15f,
                transactionality = 0.45f,
                mediaRichness = 0.55f,
                inputHeaviness = 0.20f,
            ),
        ProductDomain.Utilities to
            ThemeProfile(
                riskSensitivity = 0.20f,
                trustStrictness = 0.30f,
                dataDensity = 0.10f,
                contentVelocity = -0.40f,
                socialPresence = -0.55f,
                transactionality = -0.20f,
                mediaRichness = -0.50f,
                inputHeaviness = 0.15f,
            ),
        ProductDomain.Other to ThemeProfile.NEUTRAL,
    )

/**
 * Interaction pattern label presets to its [ThemeProfile] behavioral setpoint.
 *
 * Values are setpoints in `[-1, 1]`. Accessed via [Map.getValue] so a missing
 * entry fails fast instead of silently washing out the blend.
 */
internal val INTERACTION_INFLUENCES: Map<InteractionPattern, ThemeProfile> =
    mapOf(
        InteractionPattern.DataNavigation to
            ThemeProfile(
                riskSensitivity = 0.20f,
                trustStrictness = 0.25f,
                dataDensity = 0.85f,
                contentVelocity = -0.20f,
                socialPresence = -0.40f,
                transactionality = -0.10f,
                mediaRichness = -0.30f,
                inputHeaviness = 0.30f,
            ),
        InteractionPattern.FormsEntry to
            ThemeProfile(
                riskSensitivity = 0.15f,
                trustStrictness = 0.30f,
                dataDensity = 0.35f,
                contentVelocity = -0.35f,
                socialPresence = -0.30f,
                transactionality = 0.10f,
                mediaRichness = -0.40f,
                inputHeaviness = 0.85f,
            ),
        InteractionPattern.ChatMessaging to
            ThemeProfile(
                riskSensitivity = -0.10f,
                trustStrictness = 0f,
                dataDensity = -0.20f,
                contentVelocity = 0.55f,
                socialPresence = 0.70f,
                transactionality = -0.20f,
                mediaRichness = 0.10f,
                inputHeaviness = 0.40f,
            ),
        InteractionPattern.ContentFeed to
            ThemeProfile(
                riskSensitivity = -0.20f,
                trustStrictness = -0.15f,
                dataDensity = -0.15f,
                contentVelocity = 0.85f,
                socialPresence = 0.50f,
                transactionality = -0.10f,
                mediaRichness = 0.45f,
                inputHeaviness = -0.20f,
            ),
        InteractionPattern.ContentReading to
            ThemeProfile(
                riskSensitivity = -0.10f,
                trustStrictness = 0.20f,
                dataDensity = -0.25f,
                contentVelocity = -0.30f,
                socialPresence = -0.20f,
                transactionality = -0.30f,
                mediaRichness = 0.10f,
                inputHeaviness = -0.30f,
            ),
        InteractionPattern.SearchDiscovery to
            ThemeProfile(
                riskSensitivity = 0f,
                trustStrictness = 0.10f,
                dataDensity = 0.40f,
                contentVelocity = 0.35f,
                socialPresence = -0.10f,
                transactionality = 0.10f,
                mediaRichness = -0.10f,
                inputHeaviness = 0.45f,
            ),
        InteractionPattern.MediaBrowse to
            ThemeProfile(
                riskSensitivity = -0.15f,
                trustStrictness = -0.10f,
                dataDensity = -0.25f,
                contentVelocity = 0.40f,
                socialPresence = 0.15f,
                transactionality = 0.15f,
                mediaRichness = 0.90f,
                inputHeaviness = -0.25f,
            ),
        InteractionPattern.DashboardMonitoring to
            ThemeProfile(
                riskSensitivity = 0.35f,
                trustStrictness = 0.40f,
                dataDensity = 0.80f,
                contentVelocity = 0.15f,
                socialPresence = -0.45f,
                transactionality = -0.15f,
                mediaRichness = -0.20f,
                inputHeaviness = 0.20f,
            ),
        InteractionPattern.CheckoutCommerce to
            ThemeProfile(
                riskSensitivity = 0.40f,
                trustStrictness = 0.55f,
                dataDensity = 0.20f,
                contentVelocity = -0.10f,
                socialPresence = -0.20f,
                transactionality = 0.90f,
                mediaRichness = 0.20f,
                inputHeaviness = 0.50f,
            ),
        InteractionPattern.AuthOnboarding to
            ThemeProfile(
                riskSensitivity = 0.45f,
                trustStrictness = 0.60f,
                dataDensity = -0.20f,
                contentVelocity = -0.25f,
                socialPresence = -0.15f,
                transactionality = 0.20f,
                mediaRichness = -0.20f,
                inputHeaviness = 0.55f,
            ),
        InteractionPattern.SettingsAdmin to
            ThemeProfile(
                riskSensitivity = 0.15f,
                trustStrictness = 0.35f,
                dataDensity = 0.50f,
                contentVelocity = -0.40f,
                socialPresence = -0.50f,
                transactionality = -0.30f,
                mediaRichness = -0.45f,
                inputHeaviness = 0.40f,
            ),
    )

/** Product domain label to its locked [ThemeProfile] behavioral setpoint. */
internal fun ProductDomain.toThemeProfile(): ThemeProfile = PRODUCT_DOMAIN_INFLUENCES.getValue(this)

/** Interaction pattern label to its locked [ThemeProfile] behavioral setpoint. */
internal fun InteractionPattern.toThemeProfile(): ThemeProfile = INTERACTION_INFLUENCES.getValue(this)

/** Weight of the product domains when both domains and interaction patterns contribute. */
internal const val DOMAIN_BLEND_WEIGHT: Float = 0.45f

/** Weight of the interaction patterns when both domain and interaction patterns contribute. */
internal const val INTERACTION_BLEND_WEIGHT: Float = 0.55f
