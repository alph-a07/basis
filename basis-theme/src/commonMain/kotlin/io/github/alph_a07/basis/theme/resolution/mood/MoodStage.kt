package io.github.alph_a07.basis.theme.resolution.mood

import io.github.alph_a07.basis.theme.intent.isSpecified
import io.github.alph_a07.basis.theme.resolution.ResolutionContext
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStage

/** Mood stage applying mood setpoints to the unified profile. */
internal object MoodStage {
    /**
     * Resolves mood setpoints and updates [ResolutionContext.profile].
     *
     * @param context Resolution context holding normalized mood intent and theme profile.
     */
    fun process(context: ResolutionContext) {
        val mood = context.normalized.mood
        context.profile = blendMoodInfluence(context.profile, mood)

        val specified = mood.isSpecified()
        val entry =
            ReportEntry(
                path = "mood",
                stage = ResolutionStage.Mood,
                status = if (specified) ReportStatus.Honored else ReportStatus.Absent,
                message =
                    if (specified) {
                        "Mood profile applied to theme profile."
                    } else {
                        "No mood signal; the profile stays neutral."
                    },
            )
        context.report(entry)
    }
}
