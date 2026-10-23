package io.github.alph_a07.basis.components.theme

import io.github.alph_a07.basis.components.theme.conversion.toBasisColorLocals
import io.github.alph_a07.basis.components.theme.conversion.toBasisMotionLocals
import io.github.alph_a07.basis.components.theme.conversion.toBasisTypographyLocals
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import io.github.alph_a07.basis.theme.intent.controls.TouchTargetConstraint
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.resolution.resolve
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import kotlin.test.assertEquals
import kotlin.test.assertNull
import org.junit.Test

internal class BasisThemeAmbientTest {

    private val resolvedTheme: ResolvedTheme = resolve(BasisIntent()).light!!

    @Test
    fun defaultConstraints_holdsEmptyConstraints() {
        val ambient =
            createAmbient(
                constraints = ConstraintsControl(),
            )

        assertNull(ambient.constraints.minTouchTarget)
    }

    @Test
    fun customConstraints_holdsConfiguredTouchTarget() {
        val constraints =
            ConstraintsControl(
                minTouchTarget = TouchTargetConstraint(DpValue(56f)),
            )
        val ambient =
            createAmbient(
                constraints = constraints,
            )

        assertEquals(56f, ambient.constraints.minTouchTarget?.minSize?.value)
    }

    private fun createAmbient(constraints: ConstraintsControl): BasisThemeAmbient = BasisThemeAmbient(
        theme = resolvedTheme,
        colors = resolvedTheme.color.toBasisColorLocals(),
        typography =
            resolvedTheme.typography.toBasisTypographyLocals(
                resolvedTheme.color,
                FontFamilyRegistry.Default,
            ),
        spacing = resolvedTheme.spacing,
        radius = resolvedTheme.radius,
        depth = resolvedTheme.depth,
        size = resolvedTheme.size,
        motion = resolvedTheme.motion.toBasisMotionLocals(),
        componentOverrides = ComponentOverrides(),
        report = null,
        constraints = constraints,
    )
}
