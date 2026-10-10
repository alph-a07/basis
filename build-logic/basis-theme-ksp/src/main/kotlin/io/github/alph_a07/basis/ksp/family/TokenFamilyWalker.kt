package io.github.alph_a07.basis.ksp.family

import com.google.devtools.ksp.symbol.KSClassDeclaration
import com.google.devtools.ksp.symbol.KSFile
import com.google.devtools.ksp.symbol.KSType
import com.google.devtools.ksp.symbol.KSValueParameter
import com.google.devtools.ksp.symbol.Nullability

/** Configuration of one path family, read from its `@BasisTokenPathFamily` annotation. */
internal data class FamilyConfig(
    val prefix: String,
    val kind: String,
    val excludes: List<String>,
    val paramName: String,
    val enumDocNote: String,
    val resolveDocNote: String,
)

/** A walk that cannot produce a valid family; the processor reports it as a build error. */
internal class WalkFailure(val reason: String) : Exception(reason)

/** The rendered family model plus every source file the walk read, for KSP dependencies. */
internal data class WalkResult(val model: FamilyModel, val sources: Set<KSFile>)

/**
 * Depth-first walk over a token data-class tree that builds the enum entries: constructor
 * properties in declaration order, leaf types stop the descent, nested groups recurse, and any
 * other type fails the walk.
 */
internal object TokenFamilyWalker {

    fun walk(receiver: KSClassDeclaration, config: FamilyConfig): WalkResult {
        val state = WalkState(config)
        state.descend(receiver, emptyList())
        state.checkComplete()
        return WalkResult(state.modelFor(receiver), state.sources)
    }

    private class WalkState(private val config: FamilyConfig) {
        val members = mutableListOf<PathMember>()
        val sources = mutableSetOf<KSFile>()
        private var leafFqn: String? = null
        private var leafNullable = false

        fun descend(type: KSClassDeclaration, segments: List<String>) {
            type.containingFile?.let(sources::add)
            val qualifiedName = type.qualifiedName?.asString() ?: "?"
            val constructor =
                type.primaryConstructor
                    ?: throw WalkFailure("Token path type '$qualifiedName' has no primary constructor.")
            constructor.parameters.forEach { parameter ->
                val name =
                    parameter.name?.asString()
                        ?: throw WalkFailure("Unnamed constructor parameter on '$qualifiedName'.")
                if (name !in config.excludes) {
                    visit(parameter, type, segments, name)
                }
            }
        }

        private fun visit(
            parameter: KSValueParameter,
            owner: KSClassDeclaration,
            segments: List<String>,
            name: String,
        ) {
            val resolved = parameter.type.resolve()
            val declaration = resolved.declaration as? KSClassDeclaration
            val fqn = declaration?.qualifiedName?.asString()
            val noun = fqn?.let(TokenLeafTypes.nouns::get)
            when {
                declaration != null && fqn != null && noun != null -> {
                    addLeaf(declaration, fqn, resolved, segments + name)
                }
                declaration != null && declaration.primaryConstructor != null -> {
                    descend(declaration, segments + name)
                }
                else -> {
                    throw WalkFailure(
                        "Token path walk reached '" + (fqn ?: resolved.toString()) + "' beneath '" +
                            (owner.qualifiedName?.asString() ?: "?") +
                            "', which is neither a known token leaf nor a walkable token group.",
                    )
                }
            }
        }

        private fun addLeaf(
            declaration: KSClassDeclaration,
            fqn: String,
            resolved: KSType,
            segments: List<String>,
        ) {
            val current = leafFqn
            if (current == null) {
                leafFqn = fqn
            } else if (current != fqn) {
                throw WalkFailure("A path family must have one leaf type, found '$current' and '$fqn'.")
            }
            if (resolved.nullability == Nullability.NULLABLE) {
                leafNullable = true
            }
            declaration.containingFile?.let(sources::add)
            members +=
                PathMember(
                    entryName = memberNameFor(segments),
                    path = pathFor(config.prefix, segments),
                    segments = segments,
                )
        }

        fun checkComplete() {
            if (members.isEmpty()) {
                throw WalkFailure("Family '${config.prefix}' has no leaves; check the token tree shape.")
            }
            val duplicate = members.groupBy { it.entryName }.filterValues { it.size > 1 }.keys
            if (duplicate.isNotEmpty()) {
                throw WalkFailure("Family '${config.prefix}' produces duplicate entries: $duplicate.")
            }
        }

        fun modelFor(receiver: KSClassDeclaration): FamilyModel {
            val leaf = checkNotNull(leafFqn) { "Family '${config.prefix}' has no leaf type." }
            val receiverFqn =
                receiver.qualifiedName?.asString()
                    ?: throw WalkFailure("Token path receiver has no qualified name.")
            return FamilyModel(
                enumName = enumNameFor(receiver.simpleName.asString()),
                kind = config.kind,
                prefix = config.prefix,
                paramName = paramNameFor(config.prefix, config.paramName),
                enumDocNote = config.enumDocNote,
                resolveDocNote = config.resolveDocNote,
                receiverSimpleName = receiver.simpleName.asString(),
                receiverFqn = receiverFqn,
                returnSimpleName = leaf.substringAfterLast('.'),
                returnFqn = leaf,
                returnNullable = leafNullable,
                resolveNoun = TokenLeafTypes.nouns.getValue(leaf),
                members = members,
            )
        }
    }
}
