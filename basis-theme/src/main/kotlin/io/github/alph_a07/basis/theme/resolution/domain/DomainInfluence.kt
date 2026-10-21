package io.github.alph_a07.basis.theme.resolution.domain

import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.resolution.ThemeProfile
import io.github.alph_a07.basis.theme.resolution.tables.DOMAIN_BLEND_WEIGHT
import io.github.alph_a07.basis.theme.resolution.tables.INTERACTION_BLEND_WEIGHT
import io.github.alph_a07.basis.theme.resolution.tables.toThemeProfile

/**
 * Deterministic multi-select blend of product domain and interaction pattern influences.
 *
 * @param intent Selected [DomainIntent] containing domains and interactions.
 * @return Blended profile clamped per dimension to `[-1, 1]`; [ThemeProfile.NEUTRAL]
 * when nothing is selected.
 */
internal fun blendInfluenceProfiles(intent: DomainIntent): ThemeProfile {
    val domainProfiles = intent.domains.map { it.toThemeProfile() }
    val interactionProfiles = intent.interactions.map { it.toThemeProfile() }

    val domainGroup = domainProfiles.mergeOrNull()
    val interactionGroup = interactionProfiles.mergeOrNull()

    val blended =
        when {
            domainProfiles.isEmpty() && interactionProfiles.isEmpty() -> {
                ThemeProfile.NEUTRAL
            }

            domainGroup != null && interactionGroup != null -> {
                combineDomainAndInteractions(domainGroup, interactionGroup)
            }

            domainGroup != null -> {
                domainGroup
            }

            else -> {
                interactionGroup ?: ThemeProfile.NEUTRAL
            }
        }

    return blended.clamped()
}

/** Contributing [DomainIntent] labels behind a blended [ThemeProfile], for resolution reports. */
internal fun DomainIntent.contributors(): List<String> =
    domains.map { ProductDomain::class.simpleName + "." + it.name } +
        interactions.map { InteractionPattern::class.simpleName + "." + it.name }

private fun List<ThemeProfile>.mergeOrNull(): ThemeProfile? {
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
                ThemeProfile(
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

private fun combineDomainAndInteractions(domain: ThemeProfile, interaction: ThemeProfile): ThemeProfile =
    ThemeProfile(
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

private fun ThemeProfile.clamped(): ThemeProfile = copy(
    riskSensitivity = riskSensitivity.coerceIn(-1f, 1f),
    trustStrictness = trustStrictness.coerceIn(-1f, 1f),
    dataDensity = dataDensity.coerceIn(-1f, 1f),
    contentVelocity = contentVelocity.coerceIn(-1f, 1f),
    socialPresence = socialPresence.coerceIn(-1f, 1f),
    transactionality = transactionality.coerceIn(-1f, 1f),
    mediaRichness = mediaRichness.coerceIn(-1f, 1f),
    inputHeaviness = inputHeaviness.coerceIn(-1f, 1f),
)
