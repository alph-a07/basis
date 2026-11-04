package io.github.alph_a07.basis.docs.extract

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * Top-level components catalog document model matching components.schema.json v0.2.0.
 *
 * @property schemaVersion Semantic schema version.
 * @property provenance Origin of the document.
 * @property source Source repository commit metadata.
 * @property components Catalog of Basis components, atoms, and modifiers.
 */
@Serializable
public data class ComponentsDocument(
    val schemaVersion: String = "0.2.0",
    val provenance: String = "generated",
    val source: SourceCommit,
    val components: List<ComponentDocEntry>,
)

/**
 * Documentation entity for a single Basis component, atom, or modifier.
 */
@Serializable
public data class ComponentDocEntry(
    val id: String,
    val name: String,
    val family: String,
    val kind: String,
    val lifecycle: LifecycleDoc,
    val summary: String,
    val description: String,
    @SerialName("package")
    val packageName: String,
    val sourceUrl: String,
    val overview: OverviewDoc,
    val api: ApiDoc,
    val overrides: OverridesDoc,
    val accessibility: AccessibilityDoc,
)

/**
 * Lifecycle stability state.
 */
@Serializable
public data class LifecycleDoc(
    val status: String,
    val addedIn: String,
)

/**
 * Overview section documentation model.
 */
@Serializable
public data class OverviewDoc(
    val quickStartSample: String,
    val anatomy: AnatomyDoc,
    val variants: List<VariantDoc> = emptyList(),
    val states: List<StateDoc> = emptyList(),
    val gallery: List<GalleryEntry> = emptyList(),
)

/**
 * Screenshot asset specifications for anatomy and specimen previews.
 */
@Serializable
public data class ScreenshotSpec(
    val lightUrl: String,
    val darkUrl: String,
    val width: Int,
    val height: Int,
)

/**
 * Normalized geometry rectangle for anatomy callout bounds.
 */
@Serializable
public data class GeometryRect(
    val x: Double,
    val y: Double,
    val width: Double,
    val height: Double,
)

/**
 * Screenshot specimen gallery entry for a variant, state, and mode combination.
 */
@Serializable
public data class GalleryEntry(
    val variant: String,
    val state: String,
    val mode: String,
    val url: String,
    val width: Int,
    val height: Int,
)

/**
 * Anatomy section specification model.
 */
@Serializable
public data class AnatomyDoc(
    val parts: List<PartDoc> = emptyList(),
    val screenshot: ScreenshotSpec? = null,
    val bounds: Map<String, GeometryRect>? = null,
)

/**
 * Anatomical part model.
 */
@Serializable
public data class PartDoc(
    val id: String,
    val name: String,
    val description: String,
    val optional: Boolean = false,
)

/**
 * Variant descriptor model.
 */
@Serializable
public data class VariantDoc(
    val id: String,
    val name: String,
    val description: String? = null,
)

/**
 * Interactive state descriptor model.
 */
@Serializable
public data class StateDoc(
    val id: String,
    val name: String,
    val description: String? = null,
)

/**
 * API signatures and samples section model.
 */
@Serializable
public data class ApiDoc(
    val signatures: List<SignatureDoc>,
    val samples: List<SampleDoc> = emptyList(),
)

/**
 * Function signature documentation model.
 */
@Serializable
public data class SignatureDoc(
    val name: String,
    val declaration: String,
    val parameters: List<ParameterDoc>,
    val returnType: String = "Modifier",
    val kdoc: String,
)

/**
 * Function parameter documentation model.
 */
@Serializable
public data class ParameterDoc(
    val name: String,
    val type: String,
    val defaultValue: String? = null,
    val description: String,
    val optional: Boolean,
)

/**
 * API usage sample model.
 */
@Serializable
public data class SampleDoc(
    val id: String,
    val title: String,
    val code: String,
    val description: String? = null,
)

/**
 * Component overrides metadata model.
 */
@Serializable
public data class OverridesDoc(
    val universalFields: List<String> = emptyList(),
    val matrix: List<MatrixEntryDoc> = emptyList(),
)

/**
 * Overrides matrix entry model.
 */
@Serializable
public data class MatrixEntryDoc(
    val variant: String,
    val state: String,
    val supportedFields: List<String>,
)

/**
 * Accessibility documentation model.
 */
@Serializable
public data class AccessibilityDoc(
    val role: String,
    val touchTarget: TouchTargetDoc,
    val reducedMotion: ReducedMotionDoc,
    val keyboardNavigation: List<String> = emptyList(),
    val report: AccessibilityReport,
)

/**
 * Touch target documentation model.
 */
@Serializable
public data class TouchTargetDoc(
    val minWidthDp: Int,
    val minHeightDp: Int,
    val enforced: Boolean = false,
)

/**
 * Reduced motion documentation model.
 */
@Serializable
public data class ReducedMotionDoc(
    val respectsReducedMotion: Boolean,
    val fallbackDescription: String? = null,
)

/**
 * Accessibility verification report model.
 */
@Serializable
public data class AccessibilityReport(
    val status: String = "pass",
    val checks: List<String>,
    val version: String = "0.2.0",
)
