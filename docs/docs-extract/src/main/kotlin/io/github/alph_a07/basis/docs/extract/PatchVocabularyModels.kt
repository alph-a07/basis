package io.github.alph_a07.basis.docs.extract

import kotlinx.serialization.Serializable

/**
 * Root documentation model for patch vocabulary covering universal fields, extra families, and token ladders.
 *
 * @property schemaVersion Semantic version of the vocabulary schema.
 * @property provenance Origin tag indicating document provenance.
 * @property source Git provenance tracking commit metadata.
 * @property universalFields Fields common to the majority of components.
 * @property extraFamilies Family-specific patch fields extending universal styling.
 * @property pathTypes Available token path types and their closed ladder of valid dotted paths.
 */
@Serializable
public data class PatchVocabularyDocument(
    public val schemaVersion: String,
    public val provenance: String,
    public val source: SourceCommit,
    public val universalFields: List<UniversalFieldDoc>,
    public val extraFamilies: List<ExtraFamilyDoc>,
    public val pathTypes: List<PathTypeDoc>,
)

/**
 * Descriptor for one universal styling field.
 *
 * @property name Field property name matching UniversalStylePatch.
 * @property type Field classification ("enum" or "tokenPath").
 * @property typeName Kotlin type identifier if an enum.
 * @property summary First-sentence KDoc documentation summary.
 * @property values Valid enum entry values if an enum field.
 * @property pathType Token path type identifier if a token path field.
 */
@Serializable
public data class UniversalFieldDoc(
    public val name: String,
    public val type: String,
    public val typeName: String? = null,
    public val summary: String,
    public val values: List<String>? = null,
    public val pathType: String? = null,
)

/**
 * Descriptor for a family-specific extra patch model.
 *
 * @property family Extra patch family name (e.g. Surface, Icon, Divider, Interactive, Spacer).
 * @property summary First-sentence KDoc documentation summary of the family.
 * @property fields Additional styling fields provided by this family.
 */
@Serializable
public data class ExtraFamilyDoc(
    public val family: String,
    public val summary: String,
    public val fields: List<ExtraFieldDoc>,
)

/**
 * Descriptor for a single family-specific extra field.
 *
 * @property name Field property name.
 * @property type Field classification ("tokenPath").
 * @property pathType Token path type identifier.
 * @property summary First-sentence KDoc documentation summary.
 */
@Serializable
public data class ExtraFieldDoc(
    public val name: String,
    public val type: String,
    public val pathType: String,
    public val summary: String,
)

/**
 * Closed ladder of valid dotted token paths for one path family.
 *
 * @property pathType Kotlin enum type name of the path family.
 * @property prefix Stable dotted prefix of the path family.
 * @property ladder Ordered list of valid dotted paths.
 */
@Serializable
public data class PathTypeDoc(
    public val pathType: String,
    public val prefix: String,
    public val ladder: List<String>,
)
