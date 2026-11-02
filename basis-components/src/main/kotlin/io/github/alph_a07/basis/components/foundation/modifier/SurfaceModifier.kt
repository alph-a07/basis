package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc
import io.github.alph_a07.basis.components.theme.conversion.toElevationDp
import io.github.alph_a07.basis.components.theme.conversion.toShadowColor
import io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec

/**
 * Applies surface styling including optional depth shadow, background color, shape clipping, and border.
 *
 * @param shape Corner [Shape] for clipping, border, and shadow.
 * @param color Fill [Color] for the surface background.
 * @param border Optional [BorderStroke] drawn along the shape outline.
 * @param depth Optional [DepthSpec] defining elevation and shadow intensity.
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-surface",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = false,
    sampleCode =
        "Box(\n" +
            "    modifier = Modifier\n" +
            "        .basisSurface(\n" +
            "            shape = BasisTheme.shapes.medium,\n" +
            "            color = BasisTheme.colors.surfaceElevated,\n" +
            "            depth = BasisTheme.depth.level1,\n" +
            "            border = BorderStroke(1.dp, BasisTheme.colors.outlineVariant)\n" +
            "        )\n" +
            "        .padding(BasisTheme.spacing.md)\n" +
            ") {\n" +
            "    Text(\"Elevated Surface Container\")\n" +
            "}",
)
public fun Modifier.basisSurface(
    shape: Shape,
    color: Color,
    border: BorderStroke? = null,
    depth: DepthSpec? = null,
): Modifier {
    var modifier: Modifier = basisModifier()

    if (depth != null && depth.elevation.value > 0f) {
        modifier =
            modifier.shadow(
                elevation = depth.toElevationDp(),
                shape = shape,
                clip = false,
                ambientColor = depth.toShadowColor(),
                spotColor = depth.toShadowColor(),
            )
    }

    modifier = modifier.clip(shape).background(color, shape)

    if (border != null) {
        modifier = modifier.border(border, shape)
    }

    return modifier
}
