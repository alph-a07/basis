package io.github.alph_a07.basis.theme.resolution.domain

import io.github.alph_a07.basis.theme.resolution.ResolutionContext
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStage

/** Domain stage blending domain and interaction influences into the context profile. */
internal object DomainStage {
    /**
     * Blends domain influences and writes the resulting profile to [context].
     *
     * @param context Resolution context holding normalized domain intent.
     */
    fun process(context: ResolutionContext) {
        context.profile = blendDomainInfluence(context.normalized.domain)

        val contributors = context.normalized.domain.contributors()
        val entry =
            if (contributors.isEmpty()) {
                ReportEntry(
                    path = "domain",
                    stage = ResolutionStage.Domain,
                    status = ReportStatus.Absent,
                    message = "No domain or interaction selected; influences carry no opinion.",
                )
            } else {
                ReportEntry(
                    path = "domain",
                    stage = ResolutionStage.Domain,
                    status = ReportStatus.Honored,
                    message = "Domain and interaction influences blended into theme profile.",
                    enforced = contributors.joinToString(),
                )
            }
        context.report(entry)
    }
}
