package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStageId
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Raises every rendered text size to the readable floor.
 *
 * @param typography Derived typography tree.
 * @param floor Smallest allowed rendered text size.
 * @param entries Accumulator of report entries for actual raises.
 * @return The typography tree with every size at or above the floor.
 */
internal fun enforceTextSizes(
    typography: TypographyTokens,
    floor: DpValue,
    entries: MutableList<ReportEntry>,
): TypographyTokens {
    fun role(current: TypeRole, path: String): TypeRole {
        if (current.size.value >= floor.value) {
            return current
        }

        entries +=
            ReportEntry(
                path = path,
                stage = ResolutionStageId.Enforce,
                status = ReportStatus.OverriddenByConstraint,
                message = "Text size raised to the minimum readable size.",
                requested = "${current.size.value}",
                enforced = "${floor.value}",
            )

        return current.copy(size = floor)
    }

    return typography.copy(
        structure =
            StructureType(
                level1 = role(typography.structure.level1, "typography.structure.level1"),
                level2 = role(typography.structure.level2, "typography.structure.level2"),
                level3 = role(typography.structure.level3, "typography.structure.level3"),
                level4 = role(typography.structure.level4, "typography.structure.level4"),
                level5 = role(typography.structure.level5, "typography.structure.level5"),
                level6 = role(typography.structure.level6, "typography.structure.level6"),
            ),
        content =
            ContentType(
                level1 = role(typography.content.level1, "typography.content.level1"),
                level2 = role(typography.content.level2, "typography.content.level2"),
                level3 = role(typography.content.level3, "typography.content.level3"),
                level4 = role(typography.content.level4, "typography.content.level4"),
                level5 = role(typography.content.level5, "typography.content.level5"),
            ),
        metadata =
            MetadataType(
                level1 = role(typography.metadata.level1, "typography.metadata.level1"),
                level2 = role(typography.metadata.level2, "typography.metadata.level2"),
                level3 = role(typography.metadata.level3, "typography.metadata.level3"),
            ),
    )
}
