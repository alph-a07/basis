package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.core.color.Oklch
import io.github.alph_a07.basis.theme.core.color.contrastRatio
import io.github.alph_a07.basis.theme.resolution.enforce.enforceContrast
import io.github.alph_a07.basis.theme.resolution.enforce.meetsContrast
import io.github.alph_a07.basis.theme.resolution.enforce.ownedContrastPairs
import io.github.alph_a07.basis.theme.resolution.enforce.repairContrast
import io.github.alph_a07.basis.theme.resolution.report.ReportEntry
import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.resolveIn
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class ColorEnforcementTest {

    @Test
    fun alreadyMeetingContrastReturnsUnchanged() {
        val fg = Oklch(l = 0.95f, c = 0.02f, h = 100f)
        val bg = Oklch(l = 0.1f, c = 0.02f, h = 100f)
        val minRatio = 4.5f

        assertTrue(meetsContrast(fg, bg, minRatio))
        val result = repairContrast(fg, bg, minRatio, isDark = true, backgroundLocked = false)

        assertEquals(fg, result.foreground)
        assertEquals(bg, result.background)
    }

    @Test
    fun lightnessAloneLiftsForegroundWithoutRelaxingChroma() {
        val fg = Oklch(l = 0.5f, c = 0.15f, h = 250f)
        val bg = Oklch(l = 0.1f, c = 0.02f, h = 250f)
        val minRatio = 4.5f

        assertFalse(meetsContrast(fg, bg, minRatio))
        val result = repairContrast(fg, bg, minRatio, isDark = true, backgroundLocked = false)

        assertTrue(meetsContrast(result.foreground, result.background, minRatio))
        assertEquals(bg, result.background)
        assertEquals(fg.c, result.foreground.c, 0.01f)
    }

    @Test
    fun lockedBackgroundPreventsBackgroundShiftWhenExtremeContrastNeeded() {
        val fg = Oklch(l = 0.5f, c = 0.05f, h = 250f)
        val bg = Oklch(l = 0.52f, c = 0.05f, h = 250f)
        val extremeRatio = 20f

        val resultLocked = repairContrast(fg, bg, extremeRatio, isDark = true, backgroundLocked = true)
        assertEquals(bg, resultLocked.background)

        val resultUnlocked = repairContrast(fg, bg, extremeRatio, isDark = true, backgroundLocked = false)
        assertTrue(resultUnlocked.background.l < bg.l)
    }

    @Test
    fun ownedContrastPairsContainsExpectedEntries() {
        val pairs = ownedContrastPairs()
        assertTrue(pairs.isNotEmpty())
        assertTrue(
            pairs.any {
                it.foregroundPath == "color.content.default" && it.backgroundPath == "color.surface.default"
            },
        )
        assertTrue(
            pairs.any {
                it.foregroundPath == "color.focus.ring" && it.backgroundPath == "color.surface.default"
            },
        )
        assertTrue(
            pairs.any {
                it.foregroundPath == "color.positive.icon" && it.backgroundPath == "color.positive.surface"
            },
        )
    }

    @Test
    fun enforceContrastRepairsOwnedPairsInThemeDraft() {
        val intent = io.github.alph_a07.basis.theme.intent.BasisIntent()
        val pair = resolve(intent)
        val lightTheme = pair.light
        requireNotNull(lightTheme)

        val entries = mutableListOf<ReportEntry>()
        val enforced =
            enforceContrast(
                color = lightTheme.color,
                minRatio = 4.5f,
                lockedColorPaths = emptySet(),
                isDark = false,
                entries = entries,
            )

        ownedContrastPairs().forEach { contrastPair ->
            val fgToken = ColorTokenPath.entries.first { it.path == contrastPair.foregroundPath }
            val bgToken = ColorTokenPath.entries.first { it.path == contrastPair.backgroundPath }
            val fg = fgToken.resolveIn(enforced)
            val bg = bgToken.resolveIn(enforced)
            requireNotNull(fg)
            requireNotNull(bg)

            val minRatio = if (fgToken == ColorTokenPath.FocusRing) 3f else 4.5f
            assertTrue(
                contrastRatio(fg, bg) >= minRatio,
                "Pair ${contrastPair.foregroundPath} on ${contrastPair.backgroundPath} below ratio",
            )
        }
    }

    @Test
    fun terminalBehaviorReportsBestEffortWhenRatioCannotBeMet() {
        val fg = Oklch(l = 0.5f, c = 0.05f, h = 250f)
        val bg = Oklch(l = 0.52f, c = 0.05f, h = 250f)
        val impossibleRatio = 20f

        val result = repairContrast(fg, bg, impossibleRatio, isDark = true, backgroundLocked = true)
        assertFalse(result.ratioMet)
        assertTrue(result.achievedRatio > 0f)
        assertTrue(result.achievedRatio < impossibleRatio)
    }

    @Test
    fun contentHierarchySeparationPreserved() {
        val intent = io.github.alph_a07.basis.theme.intent.BasisIntent()
        val pair = resolve(intent)
        val lightTheme = pair.light
        requireNotNull(lightTheme)

        val flattenedContent =
            lightTheme.color.content.copy(
                default = Oklch(l = 0.40f, c = 0f, h = 0f),
                muted = Oklch(l = 0.43f, c = 0f, h = 0f),
            )
        val modifiedColor = lightTheme.color.copy(content = flattenedContent)

        val entries = mutableListOf<ReportEntry>()
        val enforced =
            enforceContrast(
                color = modifiedColor,
                minRatio = 4.5f,
                lockedColorPaths = emptySet(),
                isDark = false,
                entries = entries,
            )

        val deltaL = kotlin.math.abs(enforced.content.default.l - enforced.content.muted.l)
        assertTrue(deltaL >= 0.12f - 1e-4f, "Lightness separation deltaL ($deltaL) must be >= 0.12f")
        assertTrue(entries.any { it.path == "color.content.muted" })
    }
}
