package io.github.alph_a07.basis.ksp.family

/** Known token value types a path walk may stop at, mapped to their `resolveIn` KDoc noun. */
internal object TokenLeafTypes {
    val nouns: Map<String, String> =
        mapOf(
            "io.github.alph_a07.basis.theme.color.Oklch" to "leaf",
            "io.github.alph_a07.basis.theme.tokens.typography.TypeRole" to "role",
            "io.github.alph_a07.basis.theme.core.DpValue" to "level",
            "io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec" to "spec",
            "io.github.alph_a07.basis.theme.motion.MotionSpec" to "spec",
        )
}

/** One generated enum entry: its name, stable dotted path, and resolver segments below the root. */
internal data class PathMember(
    val entryName: String,
    val path: String,
    val segments: List<String>,
)

/** Everything the emitter needs to render one path family file. */
internal data class FamilyModel(
    val enumName: String,
    val kind: String,
    val prefix: String,
    val paramName: String,
    val enumDocNote: String,
    val resolveDocNote: String,
    val receiverSimpleName: String,
    val receiverFqn: String,
    val returnSimpleName: String,
    val returnFqn: String,
    val returnNullable: Boolean,
    val resolveNoun: String,
    val members: List<PathMember>,
) {
    /** The rendered return type, including a trailing `?` when any leaf is nullable. */
    val returnType: String
        get() =
            returnSimpleName +
                if (returnNullable) {
                    "?"
                } else {
                    ""
                }
}
