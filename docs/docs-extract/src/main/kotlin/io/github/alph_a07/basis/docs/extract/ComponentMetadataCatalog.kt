package io.github.alph_a07.basis.docs.extract

import java.io.File
import kotlinx.serialization.json.Json

/**
 * Registry of component anatomy, interaction states, and specimen galleries.
 */
internal object ComponentMetadataCatalog {

    fun buildAnatomy(id: String, projectRoot: File? = null): AnatomyDoc {
        val root = projectRoot ?: resolveProjectRoot(File("."))
        val anatomyFile = File(root, "docs/docs-site/public/assets/components/$id/anatomy.json")
        if (anatomyFile.exists()) {
            val jsonCodec = Json { ignoreUnknownKeys = true }
            val doc = jsonCodec.decodeFromString<AnatomyDoc>(anatomyFile.readText())

            return doc
        }

        return AnatomyDoc(parts = emptyList())
    }

    @Suppress("UnusedParameter")
    fun buildVariants(id: String): List<VariantDoc> = emptyList()

    @Suppress("UnusedParameter")
    fun buildStates(id: String): List<StateDoc> = emptyList()

    @Suppress("UnusedParameter")
    fun buildGallery(id: String): List<GalleryEntry> = emptyList()
}
