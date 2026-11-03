package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.foundation.IndicationNodeFactory
import androidx.compose.foundation.indication
import androidx.compose.foundation.interaction.InteractionSource
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc
import io.github.alph_a07.basis.components.foundation.BasisIndication
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment

/**
 * Draws visual indication (press and hover feedback) conforming to [shape] using the content color.
 *
 * @param interactionSource [InteractionSource] emitting interactions to draw indications for.
 * @param shape Optional [Shape] to clip the indication outline to.
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-indication",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = true,
    sampleCode =
        "val interactionSource = remember { MutableInteractionSource() }\n\n" +
            "Box(\n" +
            "    modifier = Modifier\n" +
            "        .basisIndication(interactionSource, shape = RoundedCornerShape(8.dp))\n" +
            "        .clickable(interactionSource = interactionSource, indication = null) { /* action */ }\n" +
            ") {\n" +
            "    Text(\"Custom Indication Box\")\n" +
            "}",
)
public fun Modifier.basisIndication(
    interactionSource: InteractionSource,
    shape: Shape? = null,
): Modifier = basisModifier().indication(
    interactionSource = interactionSource,
    indication = BasisIndication(shape = shape),
)

/**
 * Draws visual indication (press, hover, and focus feedback) conforming to [shape] using theme-resolved colors.
 *
 * @param interactionSource [InteractionSource] emitting interactions to draw indications for.
 * @param shape Optional [Shape] to clip the indication outline to.
 * @param color Explicit indication highlight [Color]. Defaults to [Color.Unspecified].
 * @param treatment Optional [Treatment] describing container styling for contrast-adaptive highlights.
 * @param bounded Whether indication drawing is constrained to layout bounds. Defaults to true.
 * @return Configured [Modifier].
 */
public fun Modifier.basisIndication(
    interactionSource: InteractionSource,
    shape: Shape? = null,
    color: Color = Color.Unspecified,
    treatment: Treatment? = null,
    bounded: Boolean = true,
): Modifier = basisModifier().indication(
    interactionSource = interactionSource,
    indication =
        BasisIndication(
            color = color,
            shape = shape,
            treatment = treatment,
            bounded = bounded,
        ),
)

internal fun createBasisIndication(
    color: Color = Color.Unspecified,
    shape: Shape? = null,
    treatment: Treatment? = null,
    bounded: Boolean = true,
): IndicationNodeFactory = BasisIndication(
    color = color,
    shape = shape,
    treatment = treatment,
    bounded = bounded,
)
