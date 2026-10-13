package io.github.alph_a07.basis.theme.resolution.normalize

import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.intent.ControlIntent
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.TypographyIdentity
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Intent after validation and unit conversion, shared by every generated theme mode.
 *
 * @property brandColor Brand anchor after conversion and gamut mapping, null when unspecified.
 * @property supportingColors Supporting anchors after conversion, capped at four.
 * @property presence Presence as specified, meaningful only when [brandColor] is present.
 * @property typography Brand type intent with deduplicated candidates.
 * @property preset Mood preset as specified, null when unspecified.
 * @property knobs Clamped mood knobs; null axes inherit the preset.
 * @property domain Product and interaction priors as specified.
 * @property control Handoff controls as specified.
 * @property entries Diagnostics recorded while normalizing.
 */
internal data class NormalizedIntent(
    val brandColor: Oklch?,
    val supportingColors: List<Oklch>,
    val presence: BrandPresence?,
    val typography: TypographyIdentity,
    val preset: MoodPreset?,
    val knobs: MoodKnobs,
    val domain: DomainIntent,
    val control: ControlIntent?,
    val entries: List<ReportEntry>,
) {
    /** Every catalog or custom family the consumer asked for, pins first. */
    val requestedFonts: List<FontFamilyRef>
        get() =
            listOfNotNull(typography.structure, typography.content, typography.metadata) +
                typography.candidates
}
