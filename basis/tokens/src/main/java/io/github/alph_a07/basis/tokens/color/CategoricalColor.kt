package io.github.alph_a07.basis.tokens.color

/** Tuning parameters for categorical color generation. */
data class BasisCategoricalTuning(
    /** Lightness for the palette's light mode. */
    val paletteLightnessLight: Float = 0.65f,
    /** Lightness for the palette's dark mode. */
    val paletteLightnessDark: Float = 0.72f,
    /** Minimum chroma for the palette's colors. */
    val paletteMinChroma: Float = 0.14f,
    /** Lightness for the "soft" variant in light mode. */
    val softLightnessLight: Float = 0.92f,
    /** Lightness for the "soft" variant in dark mode. */
    val softLightnessDark: Float = 0.28f,
    /** Chroma scale factor for the "soft" variant. */
    val softChromaScale: Float = 0.35f,
)

/**
 * Builds a single contrast-safe categorical color for one mode, given a non-empty list of seed hues.
 * @param index The index of the color to generate. Must be >= 0.
 * @param seedHues A non-empty list of seed hues to base the color generation on.
 * @param isDark Whether the color is for dark mode (true) or light mode (false).
 * @param tuning Optional tuning parameters for the categorical color generation.
 * @return A [BasisColor] representing the generated categorical color.
 */
fun categoricalColor(
    index: Int,
    seedHues: List<BasisColor>,
    isDark: Boolean,
    tuning: BasisCategoricalTuning = BasisCategoricalTuning(),
): BasisColor {
    require(index >= 0) { "categoricalColor index must be >= 0, got $index" }
    require(seedHues.isNotEmpty()) { "categoricalColor requires at least one seed hue." }

    val anchors = seedHues.map { it.toOklch() }
    val fixedChroma = anchors.maxOf { it.c }.coerceAtLeast(tuning.paletteMinChroma)
    val hue = if (index < anchors.size) {
        anchors[index].h
    } else {
        val overflowSteps = index - anchors.size + 1
        anchors.last().rotateHue(GOLDEN_ANGLE_DEGREES * overflowSteps).h
    }

    val lightness = if (isDark) tuning.paletteLightnessDark else tuning.paletteLightnessLight
    return Oklch(lightness, fixedChroma, hue).toBasisColor()
}

/**
 * Builds a list of contrast-safe categorical colors for one mode, given a non-empty list of seed hues.
 * @param seedHues A non-empty list of seed hues to base the color generation on.
 * @param count The number of colors to generate. Must be > 0.
 * @param isDark Whether the colors are for dark mode (true) or light mode (false).
 * @param tuning Optional tuning parameters for the categorical color generation.
 * @return A list of [BasisColor] representing the generated categorical colors.
 */
fun categoricalPalette(
    seedHues: List<BasisColor>,
    count: Int,
    isDark: Boolean,
    tuning: BasisCategoricalTuning = BasisCategoricalTuning(),
): List<BasisColor> {
    require(count > 0) { "categoricalPalette count must be > 0, got $count" }
    return (0 until count).map { categoricalColor(it, seedHues, isDark, tuning) }
}

/**
 * Builds a "soft" variant of the given categorical colors, adjusting lightness and chroma for a more muted appearance.
 * @param colors The list of categorical colors to soften.
 * @param isDark Whether the colors are for dark mode (true) or light mode (false).
 * @param tuning Optional tuning parameters for the categorical color generation.
 * @return A list of [BasisColor] representing the softened categorical colors.
 */
fun softVariant(
    colors: List<BasisColor>,
    isDark: Boolean,
    tuning: BasisCategoricalTuning = BasisCategoricalTuning(),
): List<BasisColor> {
    val lightness = if (isDark) tuning.softLightnessDark else tuning.softLightnessLight
    return colors.map { color ->
        val oklch = color.toOklch()
        Oklch(l = lightness, c = oklch.c * tuning.softChromaScale, h = oklch.h).toBasisColor()
    }
}

/** Returns the safe contrast content color on a given [BasisColor] */
fun contentOn(color: BasisColor): BasisColor = color.contentOn()