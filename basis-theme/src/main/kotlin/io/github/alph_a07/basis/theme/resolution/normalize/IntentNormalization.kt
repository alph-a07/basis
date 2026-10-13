package io.github.alph_a07.basis.theme.resolution.normalize

import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.IdentityIntent
import io.github.alph_a07.basis.theme.intent.MAX_SUPPORTING_COLORS
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.TypographyIdentity
import io.github.alph_a07.basis.theme.intent.clamped
import io.github.alph_a07.basis.theme.intent.dedupedCandidates
import io.github.alph_a07.basis.theme.intent.excessSupportingColorCount
import io.github.alph_a07.basis.theme.intent.hasPresenceWithoutBrand
import io.github.alph_a07.basis.theme.intent.isWellFormed
import io.github.alph_a07.basis.theme.intent.violatingKnobs
import io.github.alph_a07.basis.theme.resolution.color.gamutMapped
import io.github.alph_a07.basis.theme.resolution.color.toOklchOrNull
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStageId

/**
 * Validates and converts intent before any mode is seeded.
 *
 * @param intent Consumer intent, every axis optional.
 * @return Normalized intent plus diagnostics for every rejected or adjusted input.
 */
internal fun normalizeIntent(intent: BasisIntent): NormalizedIntent {
    val entries = mutableListOf<ReportEntry>()
    val identity = intent.identity ?: IdentityIntent()
    val brand = identity.brandColor.toOklch(BRAND_COLOR_PATH, entries)

    entries += knobReportEntries(intent.mood?.knobs?.violatingKnobs())
    entries += presenceReportEntries(identity)

    return NormalizedIntent(
        brandColor = brand,
        supportingColors = supportingColors(identity, entries),
        presence = if (brand == null) null else identity.presence,
        typography = identity.typography.deduped(),
        preset = intent.mood?.preset,
        knobs = intent.mood?.knobs?.clamped() ?: MoodKnobs(),
        domain = intent.domain ?: DomainIntent(),
        control = intent.control,
        entries = entries,
    )
}

private fun supportingColors(identity: IdentityIntent, entries: MutableList<ReportEntry>): List<Oklch> {
    val excess = identity.excessSupportingColorCount()
    if (excess > 0) {
        entries +=
            ReportEntry(
                path = SUPPORTING_COLORS_PATH,
                stage = ResolutionStageId.Normalize,
                status = ReportStatus.Rejected,
                message = "At most $MAX_SUPPORTING_COLORS supporting colors are honored.",
                requested = identity.supportingColors.size.toString(),
                enforced = MAX_SUPPORTING_COLORS.toString(),
            )
    }

    val converted = mutableListOf<Oklch>()

    identity.supportingColors.take(MAX_SUPPORTING_COLORS).forEachIndexed { index, spec ->
        val path = "$SUPPORTING_COLORS_PATH[$index]"
        spec.toOklch(path, entries)?.let { converted += it }
    }

    return converted
}

private fun ColorSpec?.toOklch(path: String, entries: MutableList<ReportEntry>): Oklch? {
    if (this == null) {
        return null
    }

    if (!isWellFormed()) {
        entries +=
            ReportEntry(
                path = path,
                stage = ResolutionStageId.Normalize,
                status = ReportStatus.Rejected,
                message = "Color specification could not be interpreted.",
                requested = toString(),
            )
        return null
    }

    val converted = toOklchOrNull()?.gamutMapped()
    entries +=
        ReportEntry(
            path = path,
            stage = ResolutionStageId.Normalize,
            status = ReportStatus.Honored,
            message = "Color converted to OKLCH and mapped into the sRGB gamut.",
            requested = toString(),
            enforced = converted?.toString(),
        )

    return converted
}

private fun knobReportEntries(violating: Map<String, Float>?): List<ReportEntry> = violating
    ?.map { (axis, value) ->
        ReportEntry(
            path = "$KNOBS_PATH.$axis",
            stage = ResolutionStageId.Normalize,
            status = ReportStatus.Rejected,
            message = "Knob value is not finite or outside [-1, 1]; the axis falls back to the preset.",
            requested = value.toString(),
        )
    }
    ?: emptyList()

private fun presenceReportEntries(identity: IdentityIntent): List<ReportEntry> {
    if (!identity.hasPresenceWithoutBrand()) {
        return emptyList()
    }

    return listOf(
        ReportEntry(
            path = PRESENCE_PATH,
            stage = ResolutionStageId.Normalize,
            status = ReportStatus.Modulated,
            message = "Presence has no brand color to amplify and is ignored.",
            requested = identity.presence?.name,
        ),
    )
}

private fun TypographyIdentity?.deduped(): TypographyIdentity {
    if (this == null) {
        return TypographyIdentity()
    }

    return copy(candidates = dedupedCandidates())
}

/** Report path of the brand color input. */
private const val BRAND_COLOR_PATH: String = "identity.brandColor"

/** Report path root of the supporting color inputs. */
private const val SUPPORTING_COLORS_PATH: String = "identity.supportingColors"

/** Report path of the presence input. */
private const val PRESENCE_PATH: String = "identity.presence"

/** Report path root of the mood knob inputs. */
private const val KNOBS_PATH: String = "mood.knobs"
