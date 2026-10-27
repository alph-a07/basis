package io.github.alph_a07.basis.theme.resolution.enforce

import io.github.alph_a07.basis.theme.core.SpValue
import io.github.alph_a07.basis.theme.resolution.fonts.FontCatalogEntry
import io.github.alph_a07.basis.theme.resolution.fonts.GoogleFontCatalog
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.resolution.report.ResolutionStage
import io.github.alph_a07.basis.theme.tokens.typography.ContentType
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.MetadataType
import io.github.alph_a07.basis.theme.tokens.typography.StructureType
import io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef
import io.github.alph_a07.basis.theme.tokens.typography.TypeRole
import io.github.alph_a07.basis.theme.tokens.typography.TypographyTokens

/**
 * Enforces hardware and optical readability floors onto rendered typography.
 *
 * Text sizes are guaranteed not to drop below the readable floor [floor] or the font's
 * hardware optical frequency threshold [FontCatalogEntry.minOpticalSizeDp]. Low-fill display
 * families in Light mode are protected against dilution onto muted content colors.
 *
 * @param typography Derived typography tree.
 * @param floor Smallest allowed rendered text size.
 * @param isDark Whether the active mode is Dark mode.
 * @param entries Accumulator of report entries for actual overrides.
 * @return The typography tree with every size and color constraint enforced.
 */
internal fun enforceTypographyConstraints(
    typography: TypographyTokens,
    floor: SpValue,
    isDark: Boolean,
    entries: MutableList<ReportEntry>,
): TypographyTokens {
    fun role(current: TypeRole, path: String): TypeRole {
        val entry = (current.family as? FontFamilyRef.Catalog)?.let { GoogleFontCatalog.find(it.id) }
        val opticalFloor = entry?.minOpticalSizeDp ?: floor.value
        val effectiveFloor = maxOf(floor.value, opticalFloor)

        var role = current
        if (role.size.value < effectiveFloor) {
            val message =
                if (opticalFloor > floor.value) {
                    "Display font size raised to optical legibility floor."
                } else {
                    "Text size raised to the minimum readable size."
                }

            entries +=
                ReportEntry(
                    path = path,
                    stage = ResolutionStage.Enforce,
                    status = ReportStatus.OverriddenByConstraint,
                    message = message,
                    requested = "${role.size.value}",
                    enforced = "$effectiveFloor",
                )

            role = role.copy(size = SpValue(effectiveFloor))
        }

        if (!isDark && entry != null && entry.opticalDensity < LOW_OPTICAL_DENSITY_THRESHOLD) {
            if (role.color == TypeColorRef.ContentMuted) {
                entries +=
                    ReportEntry(
                        path = "$path.color",
                        stage = ResolutionStage.Enforce,
                        status = ReportStatus.OverriddenByConstraint,
                        message =
                            "Low-fill font in light mode promoted to default content color for optical legibility.",
                        requested = "content.muted",
                        enforced = "content.default",
                    )

                role = role.copy(color = TypeColorRef.ContentDefault)
            }
        }

        return role
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

private const val LOW_OPTICAL_DENSITY_THRESHOLD: Float = 0.35f
