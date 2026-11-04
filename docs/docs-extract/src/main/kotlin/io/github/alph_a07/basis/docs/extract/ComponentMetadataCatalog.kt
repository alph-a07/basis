package io.github.alph_a07.basis.docs.extract

private const val ANATOMY_SCREENSHOT_WIDTH = 640
private const val ANATOMY_SCREENSHOT_HEIGHT = 320
private const val GALLERY_SPECIMEN_WIDTH = 320
private const val GALLERY_SPECIMEN_HEIGHT = 160

private const val CONTAINER_X = 160.0
private const val CONTAINER_Y = 80.0
private const val CONTAINER_WIDTH = 320.0
private const val CONTAINER_HEIGHT = 160.0

private const val RIPPLE_X = 260.0
private const val RIPPLE_Y = 110.0
private const val RIPPLE_WIDTH = 120.0
private const val RIPPLE_HEIGHT = 100.0

/**
 * Registry of component anatomy, interaction states, and specimen galleries.
 */
internal object ComponentMetadataCatalog {

    fun buildAnatomy(id: String): AnatomyDoc {
        if (id != "indication") {
            return AnatomyDoc(parts = emptyList())
        }

        val screenshot =
            ScreenshotSpec(
                lightUrl = "/assets/components/indication/indication-anatomy-light.svg",
                darkUrl = "/assets/components/indication/indication-anatomy-dark.svg",
                width = ANATOMY_SCREENSHOT_WIDTH,
                height = ANATOMY_SCREENSHOT_HEIGHT,
            )

        val doc =
            AnatomyDoc(
                parts = buildIndicationParts(),
                screenshot = screenshot,
                bounds = buildIndicationBounds(),
            )

        return doc
    }

    fun buildVariants(id: String): List<VariantDoc> {
        if (id != "indication") {
            return emptyList()
        }

        val variants =
            listOf(
                VariantDoc(
                    id = "default",
                    name = "Default",
                    description = "Standard dynamic indication matching the active theme.",
                ),
            )

        return variants
    }

    fun buildStates(id: String): List<StateDoc> {
        if (id != "indication") {
            return emptyList()
        }

        val states =
            listOf(
                StateDoc(
                    id = "resting",
                    name = "Resting",
                    description = "Neutral state; indication layer is completely transparent (alpha = 0).",
                ),
                StateDoc(
                    id = "hovered",
                    name = "Hovered",
                    description = "Pointer enters container bounds; renders a subtle state layer overlay (8% alpha).",
                ),
                StateDoc(
                    id = "pressed",
                    name = "Pressed",
                    description = "Active pointer touch; renders expanding ripple animation and high-emphasis overlay.",
                ),
                StateDoc(
                    id = "focused",
                    name = "Focused",
                    description = "Keyboard focus active; renders sustained focus state overlay conforming to shape.",
                ),
            )

        return states
    }

    fun buildGallery(id: String): List<GalleryEntry> {
        if (id != "indication") {
            return emptyList()
        }

        val states = listOf("resting", "hovered", "pressed", "focused")
        val modes = listOf("light", "dark")

        val gallery =
            states.flatMap { state ->
                modes.map { mode ->
                    GalleryEntry(
                        variant = "default",
                        state = state,
                        mode = mode,
                        url = "/assets/components/indication/indication-$state-$mode.svg",
                        width = GALLERY_SPECIMEN_WIDTH,
                        height = GALLERY_SPECIMEN_HEIGHT,
                    )
                }
            }

        return gallery
    }

    private fun buildIndicationParts(): List<PartDoc> {
        val parts =
            listOf(
                PartDoc(
                    id = "Container",
                    name = "Container Surface",
                    description =
                        "The underlying interactive surface bounds and shape to which the indication conforms.",
                    optional = false,
                ),
                PartDoc(
                    id = "StateLayer",
                    name = "State Layer",
                    description = "The semi-transparent highlight overlay tint adapting to theme colors for states.",
                    optional = false,
                ),
                PartDoc(
                    id = "FeedbackWave",
                    name = "Feedback Wave (Ripple)",
                    description = "The expanding ripple wavefront radiating outward from the interaction epicenter.",
                    optional = true,
                ),
            )

        return parts
    }

    private fun buildIndicationBounds(): Map<String, GeometryRect> {
        val bounds =
            mapOf(
                "Container" to
                    GeometryRect(
                        x = CONTAINER_X,
                        y = CONTAINER_Y,
                        width = CONTAINER_WIDTH,
                        height = CONTAINER_HEIGHT,
                    ),
                "StateLayer" to
                    GeometryRect(
                        x = CONTAINER_X,
                        y = CONTAINER_Y,
                        width = CONTAINER_WIDTH,
                        height = CONTAINER_HEIGHT,
                    ),
                "FeedbackWave" to
                    GeometryRect(
                        x = RIPPLE_X,
                        y = RIPPLE_Y,
                        width = RIPPLE_WIDTH,
                        height = RIPPLE_HEIGHT,
                    ),
            )

        return bounds
    }
}
