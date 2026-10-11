package io.github.alph_a07.basis.theme.resolution.domain

import io.github.alph_a07.basis.theme.intent.ProductDomain

/** Product Domain → PriorVector lookup. */
@Suppress("LongMethod")
public fun ProductDomain.toPriorVector(): PriorVector = when (this) {
    ProductDomain.Finance -> {
        PriorVector(
            riskSensitivity = 0.80f,
            trustStrictness = 0.75f,
            dataDensity = 0.55f,
            contentVelocity = -0.30f,
            socialPresence = -0.50f,
            transactionality = 0.40f,
            mediaRichness = -0.40f,
            inputHeaviness = 0.35f,
        )
    }

    ProductDomain.Health -> {
        PriorVector(
            riskSensitivity = 0.70f,
            trustStrictness = 0.80f,
            dataDensity = 0.20f,
            contentVelocity = -0.35f,
            socialPresence = -0.20f,
            transactionality = -0.10f,
            mediaRichness = -0.20f,
            inputHeaviness = 0.40f,
        )
    }

    ProductDomain.Social -> {
        PriorVector(
            riskSensitivity = -0.30f,
            trustStrictness = -0.20f,
            dataDensity = -0.10f,
            contentVelocity = 0.70f,
            socialPresence = 0.85f,
            transactionality = -0.10f,
            mediaRichness = 0.45f,
            inputHeaviness = -0.10f,
        )
    }

    ProductDomain.Productivity -> {
        PriorVector(
            riskSensitivity = 0.10f,
            trustStrictness = 0.35f,
            dataDensity = 0.65f,
            contentVelocity = -0.15f,
            socialPresence = -0.40f,
            transactionality = -0.20f,
            mediaRichness = -0.35f,
            inputHeaviness = 0.55f,
        )
    }

    ProductDomain.Commerce -> {
        PriorVector(
            riskSensitivity = 0.25f,
            trustStrictness = 0.40f,
            dataDensity = 0.15f,
            contentVelocity = 0.35f,
            socialPresence = 0.10f,
            transactionality = 0.85f,
            mediaRichness = 0.40f,
            inputHeaviness = 0.30f,
        )
    }

    ProductDomain.Media -> {
        PriorVector(
            riskSensitivity = -0.20f,
            trustStrictness = -0.10f,
            dataDensity = -0.20f,
            contentVelocity = 0.50f,
            socialPresence = 0.20f,
            transactionality = 0.10f,
            mediaRichness = 0.90f,
            inputHeaviness = -0.20f,
        )
    }

    ProductDomain.Education -> {
        PriorVector(
            riskSensitivity = 0.15f,
            trustStrictness = 0.50f,
            dataDensity = 0.25f,
            contentVelocity = -0.10f,
            socialPresence = -0.15f,
            transactionality = -0.30f,
            mediaRichness = 0.15f,
            inputHeaviness = 0.35f,
        )
    }

    ProductDomain.Travel -> {
        PriorVector(
            riskSensitivity = 0.10f,
            trustStrictness = 0.25f,
            dataDensity = -0.05f,
            contentVelocity = 0.30f,
            socialPresence = 0.15f,
            transactionality = 0.45f,
            mediaRichness = 0.55f,
            inputHeaviness = 0.20f,
        )
    }

    ProductDomain.Utilities -> {
        PriorVector(
            riskSensitivity = 0.20f,
            trustStrictness = 0.30f,
            dataDensity = 0.10f,
            contentVelocity = -0.40f,
            socialPresence = -0.55f,
            transactionality = -0.20f,
            mediaRichness = -0.50f,
            inputHeaviness = 0.15f,
        )
    }

    ProductDomain.Other -> {
        PriorVector()
    }
}
