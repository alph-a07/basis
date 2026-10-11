package io.github.alph_a07.basis.theme.resolution.domain

import io.github.alph_a07.basis.theme.intent.InteractionPattern

/** Interaction Patterns → PriorVector lookup. */
@Suppress("LongMethod")
public fun InteractionPattern.toPriorVector(): PriorVector = when (this) {
    InteractionPattern.DataNavigation -> {
        PriorVector(
            riskSensitivity = 0.20f,
            trustStrictness = 0.25f,
            dataDensity = 0.85f,
            contentVelocity = -0.20f,
            socialPresence = -0.40f,
            transactionality = -0.10f,
            mediaRichness = -0.30f,
            inputHeaviness = 0.30f,
        )
    }

    InteractionPattern.FormsEntry -> {
        PriorVector(
            riskSensitivity = 0.15f,
            trustStrictness = 0.30f,
            dataDensity = 0.35f,
            contentVelocity = -0.35f,
            socialPresence = -0.30f,
            transactionality = 0.10f,
            mediaRichness = -0.40f,
            inputHeaviness = 0.85f,
        )
    }

    InteractionPattern.ChatMessaging -> {
        PriorVector(
            riskSensitivity = -0.10f,
            trustStrictness = 0f,
            dataDensity = -0.20f,
            contentVelocity = 0.55f,
            socialPresence = 0.70f,
            transactionality = -0.20f,
            mediaRichness = 0.10f,
            inputHeaviness = 0.40f,
        )
    }

    InteractionPattern.ContentFeed -> {
        PriorVector(
            riskSensitivity = -0.20f,
            trustStrictness = -0.15f,
            dataDensity = -0.15f,
            contentVelocity = 0.85f,
            socialPresence = 0.50f,
            transactionality = -0.10f,
            mediaRichness = 0.45f,
            inputHeaviness = -0.20f,
        )
    }

    InteractionPattern.ContentReading -> {
        PriorVector(
            riskSensitivity = -0.10f,
            trustStrictness = 0.20f,
            dataDensity = -0.25f,
            contentVelocity = -0.30f,
            socialPresence = -0.20f,
            transactionality = -0.30f,
            mediaRichness = 0.10f,
            inputHeaviness = -0.30f,
        )
    }

    InteractionPattern.SearchDiscovery -> {
        PriorVector(
            riskSensitivity = 0f,
            trustStrictness = 0.10f,
            dataDensity = 0.40f,
            contentVelocity = 0.35f,
            socialPresence = -0.10f,
            transactionality = 0.10f,
            mediaRichness = -0.10f,
            inputHeaviness = 0.45f,
        )
    }

    InteractionPattern.MediaBrowse -> {
        PriorVector(
            riskSensitivity = -0.15f,
            trustStrictness = -0.10f,
            dataDensity = -0.25f,
            contentVelocity = 0.40f,
            socialPresence = 0.15f,
            transactionality = 0.15f,
            mediaRichness = 0.90f,
            inputHeaviness = -0.25f,
        )
    }

    InteractionPattern.DashboardMonitoring -> {
        PriorVector(
            riskSensitivity = 0.35f,
            trustStrictness = 0.40f,
            dataDensity = 0.80f,
            contentVelocity = 0.15f,
            socialPresence = -0.45f,
            transactionality = -0.15f,
            mediaRichness = -0.20f,
            inputHeaviness = 0.20f,
        )
    }

    InteractionPattern.CheckoutCommerce -> {
        PriorVector(
            riskSensitivity = 0.40f,
            trustStrictness = 0.55f,
            dataDensity = 0.20f,
            contentVelocity = -0.10f,
            socialPresence = -0.20f,
            transactionality = 0.90f,
            mediaRichness = 0.20f,
            inputHeaviness = 0.50f,
        )
    }

    InteractionPattern.AuthOnboarding -> {
        PriorVector(
            riskSensitivity = 0.45f,
            trustStrictness = 0.60f,
            dataDensity = -0.20f,
            contentVelocity = -0.25f,
            socialPresence = -0.15f,
            transactionality = 0.20f,
            mediaRichness = -0.20f,
            inputHeaviness = 0.55f,
        )
    }

    InteractionPattern.SettingsAdmin -> {
        PriorVector(
            riskSensitivity = 0.15f,
            trustStrictness = 0.35f,
            dataDensity = 0.50f,
            contentVelocity = -0.40f,
            socialPresence = -0.50f,
            transactionality = -0.30f,
            mediaRichness = -0.45f,
            inputHeaviness = 0.40f,
        )
    }
}
