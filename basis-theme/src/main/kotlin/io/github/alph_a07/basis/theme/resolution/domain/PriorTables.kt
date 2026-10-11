package io.github.alph_a07.basis.theme.resolution.domain

import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.ProductDomain

/**
 * Product domain label presets to its [PriorVector] setpoint.
 *
 * Values are setpoints in `[-1, 1]`; `Other` is [PriorVector.ZERO] (no opinion).
 * Accessed via [Map.getValue] so a missing entry fails fast instead of silently
 * washing out the blend.
 */
public val PRODUCT_DOMAIN_VECTORS: Map<ProductDomain, PriorVector> =
    mapOf(
        ProductDomain.Finance to
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
                riskSensitivity = 0.20f,
                trustStrictness = 0.30f,
                dataDensity = 0.10f,
                contentVelocity = -0.40f,
                socialPresence = -0.55f,
                transactionality = -0.20f,
                mediaRichness = -0.50f,
                inputHeaviness = 0.15f,
            ),
        ProductDomain.Other to PriorVector.ZERO,
    )

/**
 * Interaction pattern label presets to its [PriorVector] setpoint.
 *
 * Values are setpoints in `[-1, 1]`. Accessed via [Map.getValue] so a missing
 * entry fails fast instead of silently washing out the blend.
 */
public val INTERACTION_VECTORS: Map<InteractionPattern, PriorVector> =
    mapOf(
        InteractionPattern.DataNavigation to
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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
            PriorVector(
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

/** Product domain label to its locked [PriorVector] setpoint. */
public fun ProductDomain.toPriorVector(): PriorVector = PRODUCT_DOMAIN_VECTORS.getValue(this)

/** Interaction pattern label to its locked [PriorVector] setpoint. */
public fun InteractionPattern.toPriorVector(): PriorVector = INTERACTION_VECTORS.getValue(this)
