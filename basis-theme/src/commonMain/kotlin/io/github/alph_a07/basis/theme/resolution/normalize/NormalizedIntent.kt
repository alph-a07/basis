package io.github.alph_a07.basis.theme.resolution.normalize

import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.intent.ControlIntent
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.TypographyIdentity
import io.github.alph_a07.basis.theme.intent.isSpecified
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Intent after validation and unit conversion, shared by every generated theme mode.
 *
 * @property brandColor Brand anchor after conversion and gamut mapping, null when unspecified.
 * @property supportingColors Supporting anchors after conversion, capped at three.
 * @property presence Presence as specified, meaningful only when [brandColor] is present.
 * @property typography Brand type intent with deduplicated candidates.
 * @property mood Mood intent carrying optional preset and clamped knobs.
 * @property domain Product and interaction influences as specified.
 * @property control Handoff controls as specified.
 * @property deriveColors Whether to derive colors from brand, mood and domain signals.
 * @property entries Diagnostics recorded while normalizing.
 */
internal data class NormalizedIntent(
    val brandColor: Oklch?,
    val supportingColors: List<Oklch>,
    val presence: BrandPresence?,
    val typography: TypographyIdentity,
    val mood: MoodIntent,
    val domain: DomainIntent,
    val control: ControlIntent?,
    val deriveColors: Boolean,
    val entries: List<ReportEntry>,
) {
    val preset: MoodPreset? get() = mood.preset
    val knobs: MoodKnobs get() = mood.knobs ?: MoodKnobs()

    /** Whether any brand, mood, or domain intent signal is explicitly specified. */
    val isSpecified: Boolean
        get() =
            mood.isSpecified() ||
                domain.domains.isNotEmpty() ||
                domain.interactions.isNotEmpty() ||
                brandColor != null

    /** Every catalog or custom family the consumer asked for, pins first. */
    val requestedFonts: List<FontFamilyRef>
        get() =
            listOfNotNull(typography.structure, typography.content, typography.metadata) +
                typography.candidates
}
