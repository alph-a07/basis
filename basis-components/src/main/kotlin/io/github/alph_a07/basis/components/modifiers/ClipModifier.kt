package io.github.alph_a07.basis.components.modifiers

import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Shape
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc

/**
 * Clips the element content to the specified [shape].
 *
 * @param shape [Shape] to clip the content bounds to.
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-clip",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = false,
    sampleCode =
        "Box(\n" +
            "    modifier = Modifier\n" +
            "        .size(64.dp)\n" +
            "        .basisClip(CircleShape)\n" +
            ") {\n" +
            "    Image(bitmap = avatarBitmap, contentDescription = \"Avatar\")\n" +
            "}",
)
public fun Modifier.basisClip(
    shape: Shape,
): Modifier = basisModifier().clip(shape)
