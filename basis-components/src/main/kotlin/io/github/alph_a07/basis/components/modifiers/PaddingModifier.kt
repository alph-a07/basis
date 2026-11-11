package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc
import io.github.alph_a07.basis.components.theme.conversion.toDp
import io.github.alph_a07.basis.theme.core.DpValue

/**
 * Applies horizontal and vertical padding using Basis token dimensions.
 *
 * @param horizontal Optional horizontal padding in [DpValue].
 * @param vertical Optional vertical padding in [DpValue].
 * @return Configured [Modifier].
 */
@BasisModifierDoc(
    id = "basis-padding",
    role = "None",
    minTouchTargetDp = 0,
    touchTargetEnforced = false,
    respectsReducedMotion = false,
    sampleCode =
        "Box(\n" +
            "    modifier = Modifier\n" +
            "        .basisPadding(\n" +
            "            horizontal = BasisTheme.spacing.level3,\n" +
            "            vertical = BasisTheme.spacing.level2\n" +
            "        )\n" +
            ") {\n" +
            "    BasicText(\"Token Spaced Content\")\n" +
            "}",
)
public fun Modifier.basisPadding(
    horizontal: DpValue? = null,
    vertical: DpValue? = null,
): Modifier = basisModifier().padding(
    horizontal = horizontal?.toDp() ?: 0.dp,
    vertical = vertical?.toDp() ?: 0.dp,
)

/**
 * Applies directional padding along individual edges using Basis token dimensions.
 *
 * @param start Optional leading edge padding in [DpValue].
 * @param top Optional top edge padding in [DpValue].
 * @param end Optional trailing edge padding in [DpValue].
 * @param bottom Optional bottom edge padding in [DpValue].
 * @return Configured [Modifier].
 */
public fun Modifier.basisPadding(
    start: DpValue? = null,
    top: DpValue? = null,
    end: DpValue? = null,
    bottom: DpValue? = null,
): Modifier = basisModifier().padding(
    start = start?.toDp() ?: 0.dp,
    top = top?.toDp() ?: 0.dp,
    end = end?.toDp() ?: 0.dp,
    bottom = bottom?.toDp() ?: 0.dp,
)

/**
 * Applies uniform padding along all edges using a Basis token dimension.
 *
 * @param all Uniform padding in [DpValue].
 * @return Configured [Modifier].
 */
public fun Modifier.basisPadding(
    all: DpValue,
): Modifier = basisModifier().padding(all.toDp())
