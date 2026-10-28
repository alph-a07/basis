package io.github.alph_a07.basis.docs.extract

import kotlinx.serialization.Serializable

/**
 * Root documentation model for intent vocabulary mirroring the BasisIntent tree.
 *
 * @property schemaVersion Semantic version of the document schema.
 * @property provenance Origin tag indicating whether this document was generated or fixture.
 * @property source Git provenance tracking commit metadata.
 * @property identity Brand identity axis choices and constraints.
 * @property mood Preset archetypes and feel knob definitions.
 * @property domain Product domains and interaction pattern influences.
 * @property control Fine-grained override and governance controls.
 */
@Serializable
public data class IntentDocument(
    public val schemaVersion: String,
    public val provenance: String,
    public val source: SourceCommit,
    public val identity: IdentityDoc,
    public val mood: MoodDoc,
    public val domain: DomainDoc,
    public val control: ControlDoc,
)

/**
 * Commit metadata for reproducible provenance tracking.
 *
 * @property commit Git commit SHA of the source tree.
 */
@Serializable
public data class SourceCommit(
    public val commit: String,
)

/**
 * Brand identity documentation model.
 *
 * @property presence Supported brand presence tiers.
 * @property supportingColors Supporting color count constraint.
 * @property fields Intake fields declared on the identity axis.
 */
@Serializable
public data class IdentityDoc(
    public val presence: List<ChoiceDoc>,
    public val supportingColors: SupportingColorsDoc,
    public val fields: List<FieldDoc>,
)

/**
 * Supporting color limits.
 *
 * @property max Maximum number of supporting colors accepted during resolution.
 */
@Serializable
public data class SupportingColorsDoc(
    public val max: Int,
)

/**
 * Single choice item representing an enum entry or archetypal option.
 *
 * @property id Identifier matching the Kotlin declaration name.
 * @property label Human-readable Title Case display label.
 * @property summary First-sentence KDoc documentation summary.
 */
@Serializable
public data class ChoiceDoc(
    public val id: String,
    public val label: String,
    public val summary: String,
)

/**
 * Field descriptor on an intent axis.
 *
 * @property id Kotlin property identifier name.
 * @property label Human-readable Title Case display label.
 * @property summary First-sentence KDoc documentation summary.
 */
@Serializable
public data class FieldDoc(
    public val id: String,
    public val label: String,
    public val summary: String,
)

/**
 * Mood axis archetypes and feel knobs.
 *
 * @property presets Archetypal mood profiles.
 * @property knobs Sparse per-axis feel knobs.
 */
@Serializable
public data class MoodDoc(
    public val presets: List<ChoiceDoc>,
    public val knobs: List<KnobDoc>,
)

/**
 * Single feel knob definition with polar labels and bounds.
 *
 * @property id Knob identifier matching the Kotlin property name.
 * @property label Human-readable Title Case display label.
 * @property summary First-sentence KDoc documentation summary.
 * @property negativeLabel Negative pole label parsed from KDoc toward clause.
 * @property positiveLabel Positive pole label parsed from KDoc toward clause.
 * @property min Minimum allowed knob value (-1.0).
 * @property max Maximum allowed knob value (1.0).
 */
@Serializable
public data class KnobDoc(
    public val id: String,
    public val label: String,
    public val summary: String,
    public val negativeLabel: String,
    public val positiveLabel: String,
    public val min: Double,
    public val max: Double,
)

/**
 * Product domain and interaction pattern influences.
 *
 * @property domains Recognizable product industry contexts.
 * @property interactions Recognizable UI interaction workflows.
 */
@Serializable
public data class DomainDoc(
    public val domains: List<ChoiceDoc>,
    public val interactions: List<ChoiceDoc>,
)

/**
 * Control axis documentation.
 *
 * @property fields Declared fine-grained control fields.
 */
@Serializable
public data class ControlDoc(
    public val fields: List<FieldDoc>,
)
