package io.github.alph_a07.basis.ksp.family

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Pins the emitted Kotlin source for a realistic family against the shape consumers compile
 * against: enum header, dotted path literals, `resolveIn` signature, and lint-safe line lengths.
 */
internal class FamilyEmitterTest {

    private val motionModel =
        FamilyModel(
            enumName = "MotionTokenPath",
            kind = "motion purpose",
            prefix = "motion",
            paramName = "motion",
            enumDocNote = "",
            resolveDocNote = "",
            receiverSimpleName = "MotionTokens",
            receiverFqn = "io.github.alph_a07.basis.theme.motion.MotionTokens",
            returnSimpleName = "MotionSpec",
            returnFqn = "io.github.alph_a07.basis.theme.motion.MotionSpec",
            returnNullable = false,
            resolveNoun = "spec",
            members =
                listOf(
                    PathMember("Feedback", "motion.feedback", listOf("feedback")),
                    PathMember("StateTransition", "motion.stateTransition", listOf("stateTransition")),
                    PathMember("Transformation", "motion.transformation", listOf("transformation")),
                    PathMember("Expansion", "motion.expansion", listOf("expansion")),
                    PathMember("Reposition", "motion.reposition", listOf("reposition")),
                    PathMember("Emphasis", "motion.emphasis", listOf("emphasis")),
                ),
        )

    @Test
    fun emitsPackageImportsAndEnumHeader() {
        val source = FamilyEmitter.emit(motionModel)
        assertTrue(source.startsWith("package io.github.alph_a07.basis.theme.tokens.core\n"))
        assertTrue(source.contains("import io.github.alph_a07.basis.theme.motion.MotionSpec\n"))
        assertTrue(source.contains("import io.github.alph_a07.basis.theme.motion.MotionTokens\n"))
        assertTrue(
            source.contains(
                "public enum class MotionTokenPath(public val path: String) {",
            ),
        )
    }

    @Test
    fun emitsEveryPathLiteralInDeclarationOrder() {
        val source = FamilyEmitter.emit(motionModel)
        val entries =
            source.lineSequence()
                .filter { it.startsWith("    ") && it.contains("(\"motion.") }
                .toList()
        assertEquals(
            listOf(
                "    Feedback(\"motion.feedback\"),",
                "    StateTransition(\"motion.stateTransition\"),",
                "    Transformation(\"motion.transformation\"),",
                "    Expansion(\"motion.expansion\"),",
                "    Reposition(\"motion.reposition\"),",
                "    Emphasis(\"motion.emphasis\"),",
            ),
            entries,
        )
    }

    @Test
    fun emitsResolveInSignatureAndBranches() {
        val source = FamilyEmitter.emit(motionModel)
        assertTrue(
            source.contains(
                "public fun MotionTokenPath.resolveIn(motion: MotionTokens): MotionSpec = when (this) {",
            ),
        )
        assertTrue(source.contains("    MotionTokenPath.StateTransition -> motion.stateTransition\n"))
        assertTrue(source.trimEnd().endsWith("}"))
    }

    @Test
    fun emittedSourceHasNoLineBeyondKtlintLimit() {
        val source = FamilyEmitter.emit(motionModel)
        val overlong = source.lineSequence().filter { it.length > 120 }.toList()
        assertTrue(overlong.isEmpty(), "lines exceed 120 chars: $overlong")
    }

    @Test
    fun colorStyleDocNotesAndNullableReturnRender() {
        val colorModel =
            motionModel.copy(
                enumName = "ColorTokenPath",
                kind = "color token",
                prefix = "color",
                paramName = "colors",
                enumDocNote =
                    "Gradient paths are not referenceable here and remain string-level for " +
                        "reports and the secondary map.",
                resolveDocNote = "brand anchors absent from the theme resolve to null.",
                receiverSimpleName = "ColorTokens",
                receiverFqn = "io.github.alph_a07.basis.theme.tokens.color.ColorTokens",
                returnSimpleName = "Oklch",
                returnFqn = "io.github.alph_a07.basis.theme.color.Oklch",
                returnNullable = true,
                resolveNoun = "leaf",
                members =
                    listOf(
                        PathMember("SurfaceDefault", "color.surface.default", listOf("surface", "default")),
                        PathMember(
                            "BrandSecondary",
                            "color.brand.secondary",
                            listOf("brand", "secondary"),
                        ),
                    ),
            )
        val source = FamilyEmitter.emit(colorModel)
        assertTrue(
            source.contains(
                "public fun ColorTokenPath.resolveIn(colors: ColorTokens): Oklch? = when (this) {",
            ),
        )
        assertTrue(source.contains("    ColorTokenPath.SurfaceDefault -> colors.surface.default\n"))
        assertTrue(source.contains(" * Resolves this identifier to its leaf in [colors];"))
        assertTrue(source.contains("brand anchors absent from the theme resolve to null."))
        assertTrue(source.contains("Gradient paths are not referenceable here"))
    }
}
