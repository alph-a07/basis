package io.github.alph_a07.basis.theme.intent

import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/** Maximum number of supporting colors honored from [IdentityIntent.supportingColors]. */
internal const val MAX_SUPPORTING_COLORS: Int = 4

/** Lower bound of a valid mood knob value. */
internal const val KNOB_MIN: Float = -1f

/** Upper bound of a valid mood knob value. */
internal const val KNOB_MAX: Float = 1f

/**
 * Mood knobs with values coerced into `[KNOB_MIN, KNOB_MAX]`; non-finite values become null so the
 * axis falls back to the preset.
 */
internal fun MoodKnobs.clamped(): MoodKnobs = MoodKnobs(
    warmth = clampKnob(warmth),
    chroma = clampKnob(chroma),
    contrast = clampKnob(contrast),
    density = clampKnob(density),
    roundness = clampKnob(roundness),
    typographyExpressiveness = clampKnob(typographyExpressiveness),
    motionEnergy = clampKnob(motionEnergy),
    playfulness = clampKnob(playfulness),
)

/**
 * Report paths of knobs that are non-finite or outside `[KNOB_MIN, KNOB_MAX]`, mapped to the raw
 * value as specified.
 */
internal fun MoodKnobs.violatingKnobs(): Map<String, Float> = knobEntries()
    .filter { (_, value) -> !value.isFinite() || value < KNOB_MIN || value > KNOB_MAX }

/** Whether a color spec carries enough signal to be converted during normalization. */
internal fun ColorSpec.isWellFormed(): Boolean = when (this) {
    is ColorSpec.Hex -> {
        value.matches(HEX_PATTERN)
    }

    is ColorSpec.Argb -> {
        true
    }

    is ColorSpec.Hsl -> {
        h.isFinite() && s.isFinite() && l.isFinite() && a.isFinite()
    }

    is Oklch -> {
        true
    }
}

/** Candidates in order, deduplicated and with role pins removed; pins win over duplicates. */
internal fun TypographyIdentity.dedupedCandidates(): List<FontFamilyRef> {
    val pins = setOfNotNull(structure, content, metadata)

    return candidates.distinct().filterNot { it in pins }
}

/** Whether presence was specified without a brand color to amplify. */
internal fun IdentityIntent.hasPresenceWithoutBrand(): Boolean =
    presence != null && brandColor == null

/** How many supporting colors exceed [MAX_SUPPORTING_COLORS]; zero when within the cap. */
internal fun IdentityIntent.excessSupportingColorCount(): Int =
    (supportingColors.size - MAX_SUPPORTING_COLORS).coerceAtLeast(0)

private fun clampKnob(value: Float?): Float? = when {
    value == null -> {
        null
    }

    !value.isFinite() -> {
        null
    }

    else -> {
        value.coerceIn(KNOB_MIN, KNOB_MAX)
    }
}

private val HEX_PATTERN = Regex("^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$")
