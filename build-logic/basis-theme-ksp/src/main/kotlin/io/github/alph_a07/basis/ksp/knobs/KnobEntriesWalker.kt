package io.github.alph_a07.basis.ksp.knobs

import com.google.devtools.ksp.symbol.KSClassDeclaration
import com.google.devtools.ksp.symbol.KSFile
import com.google.devtools.ksp.symbol.KSValueParameter
import com.google.devtools.ksp.symbol.Nullability
import io.github.alph_a07.basis.ksp.family.WalkFailure

/** Expected leaf type of every knob axis. */
private const val NULLABLE_FLOAT = "kotlin.Float"

/**
 * Flat walk over a knob data class that builds the entry map: primary constructor properties in
 * declaration order, every one a nullable `Float`, with the dotted path rooted at prefix.
 */
internal object KnobEntriesWalker {

    fun walk(receiver: KSClassDeclaration, prefix: String): KnobWalkResult {
        val qualifiedName = receiver.qualifiedName?.asString()
            ?: throw WalkFailure("Knob entries receiver has no qualified name.")
        checkPrefix(prefix)
        val entries = entriesOf(receiver, qualifiedName, prefix)
        val sources = mutableSetOf<KSFile>()
        receiver.containingFile?.let(sources::add)
        return KnobWalkResult(
            KnobEntriesModel(
                packageName = receiver.packageName.asString(),
                receiverSimpleName = receiver.simpleName.asString(),
                entries = entries,
            ),
            sources,
        )
    }

    private fun checkPrefix(prefix: String) {
        if (prefix.isEmpty()) throw WalkFailure("Knob entries prefix must not be empty.")
    }

    private fun entriesOf(
        receiver: KSClassDeclaration,
        qualifiedName: String,
        prefix: String,
    ): List<KnobEntry> {
        val constructor = receiver.primaryConstructor
            ?: throw WalkFailure("Knob entries type '$qualifiedName' has no primary constructor.")
        val entries = constructor.parameters.map { parameter ->
            walkParameter(parameter, qualifiedName, prefix)
        }
        if (entries.isEmpty()) {
            throw WalkFailure("Knob entries '$qualifiedName' has no properties.")
        }
        return entries
    }

    private fun walkParameter(
        parameter: KSValueParameter,
        qualifiedName: String,
        prefix: String,
    ): KnobEntry {
        val name = parameter.name?.asString()
            ?: throw WalkFailure("Unnamed constructor parameter on '$qualifiedName'.")
        val resolved = parameter.type.resolve()
        val declaration = resolved.declaration.qualifiedName?.asString()
        if (declaration != NULLABLE_FLOAT || resolved.nullability != Nullability.NULLABLE) {
            throw WalkFailure(
                "Knob entries property '$qualifiedName.$name' must be a nullable Float.",
            )
        }
        return KnobEntry(propertyName = name, path = "$prefix.$name")
    }
}

/** The rendered knob model plus every source file the walk read, for KSP dependencies. */
internal data class KnobWalkResult(val model: KnobEntriesModel, val sources: Set<KSFile>)
