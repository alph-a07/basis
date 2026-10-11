package io.github.alph_a07.basis.theme.resolution.domain

import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.ProductDomain

/** Weight of the product domains when both domains and interaction patterns contribute. */
private const val DOMAIN_BLEND_WEIGHT: Float = 0.45f

/** Weight of the interaction patterns when both domain and interaction patterns contribute. */
private const val INTERACTION_BLEND_WEIGHT: Float = 0.55f

/**
 * Deterministic multi-select blend of product domain and interaction patterns priors.
 *
 * @param intent Selected [DomainIntent] - domains and interactions.
 * @return Blended vector clamped per dimension to `[-1, 1]`; [PriorVector.ZERO]
 * when nothing is selected.
 */
public fun blendPriorVectors(intent: DomainIntent): PriorVector {
    val domainVectors = intent.domains.map { it.toPriorVector() }
    val interactionVectors = intent.interactions.map { it.toPriorVector() }

    val domainGroup = domainVectors.mergePriorsOrNull()
    val interactionGroup = interactionVectors.mergePriorsOrNull()

    val blended =
        when {
            domainVectors.isEmpty() && interactionVectors.isEmpty() -> {
                PriorVector.ZERO
            }
            domainGroup != null && interactionGroup != null -> {
                combineGroups(domainGroup, interactionGroup)
            }
            domainGroup != null -> {
                domainGroup
            }
            else -> {
                interactionGroup ?: PriorVector.ZERO
            }
        }

    return blended.clamped()
}

private fun List<PriorVector>.mergePriorsOrNull(): PriorVector? {
    val risks = map { it.riskSensitivity }
    val trusts = map { it.trustStrictness }

    val merged =
        when {
            isEmpty() -> {
                null
            }
            size == 1 -> {
                first()
            }
            else -> {
                PriorVector(
                    riskSensitivity = risks.max(),
                    trustStrictness = trusts.max(),
                    dataDensity = map { it.dataDensity }.averageF(),
                    contentVelocity = map { it.contentVelocity }.averageF(),
                    socialPresence = map { it.socialPresence }.averageF(),
                    transactionality = map { it.transactionality }.averageF(),
                    mediaRichness = map { it.mediaRichness }.averageF(),
                    inputHeaviness = map { it.inputHeaviness }.averageF(),
                )
            }
        }

    return merged
}

private fun combineGroups(domain: PriorVector, interaction: PriorVector): PriorVector = PriorVector(
    riskSensitivity = maxOf(domain.riskSensitivity, interaction.riskSensitivity),
    trustStrictness = maxOf(domain.trustStrictness, interaction.trustStrictness),
    dataDensity = weighted(domain.dataDensity, interaction.dataDensity),
    contentVelocity = weighted(domain.contentVelocity, interaction.contentVelocity),
    socialPresence = weighted(domain.socialPresence, interaction.socialPresence),
    transactionality = weighted(domain.transactionality, interaction.transactionality),
    mediaRichness = weighted(domain.mediaRichness, interaction.mediaRichness),
    inputHeaviness = weighted(domain.inputHeaviness, interaction.inputHeaviness),
)

private fun weighted(domain: Float, interaction: Float): Float =
    DOMAIN_BLEND_WEIGHT * domain + INTERACTION_BLEND_WEIGHT * interaction

private fun List<Float>.averageF(): Float {
    val mean =
        when {
            isEmpty() -> {
                0f
            }
            else -> {
                sum() / size
            }
        }

    return mean
}

private fun PriorVector.clamped(): PriorVector = PriorVector(
    riskSensitivity = riskSensitivity.coerceIn(-1f, 1f),
    trustStrictness = trustStrictness.coerceIn(-1f, 1f),
    dataDensity = dataDensity.coerceIn(-1f, 1f),
    contentVelocity = contentVelocity.coerceIn(-1f, 1f),
    socialPresence = socialPresence.coerceIn(-1f, 1f),
    transactionality = transactionality.coerceIn(-1f, 1f),
    mediaRichness = mediaRichness.coerceIn(-1f, 1f),
    inputHeaviness = inputHeaviness.coerceIn(-1f, 1f),
)

/** Contributing [DomainIntent] labels behind a blended [PriorVector], for resolution reports. */
public fun DomainIntent.contributors(): List<String> =
    domains.map { ProductDomain::class.simpleName + "." + it.name } +
        interactions.map { InteractionPattern::class.simpleName + "." + it.name }
