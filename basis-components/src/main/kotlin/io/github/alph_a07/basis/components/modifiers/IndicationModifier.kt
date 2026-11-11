package io.github.alph_a07.basis.components.modifiers

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.AnimationVector1D
import androidx.compose.animation.core.tween
import androidx.compose.foundation.IndicationNodeFactory
import androidx.compose.foundation.indication
import androidx.compose.foundation.interaction.FocusInteraction
import androidx.compose.foundation.interaction.HoverInteraction
import androidx.compose.foundation.interaction.InteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Outline
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.drawOutline
import androidx.compose.ui.graphics.drawscope.ContentDrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.clipPath
import androidx.compose.ui.graphics.drawscope.clipRect
import androidx.compose.ui.graphics.isSpecified
import androidx.compose.ui.node.CompositionLocalConsumerModifierNode
import androidx.compose.ui.node.DelegatableNode
import androidx.compose.ui.node.DrawModifierNode
import androidx.compose.ui.node.currentValueOf
import androidx.compose.ui.node.invalidateDraw
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.annotation.BasisModifierDoc
import io.github.alph_a07.basis.components.theme.locals.LocalBasisContentColor
import io.github.alph_a07.basis.components.theme.locals.LocalBasisTheme
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import kotlin.time.Duration.Companion.milliseconds
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

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
            "        .basisIndication(\n" +
            "            interactionSource = interactionSource,\n" +
            "            shape = RoundedCornerShape(BasisTheme.radius.level2.toDp())\n" +
            "        )\n" +
            "        .basisClickable(interactionSource = interactionSource) { /* action */ }\n" +
            ") {\n" +
            "    BasicText(\"Custom Indication Box\")\n" +
            "}",
)
public fun Modifier.basisIndication(
    interactionSource: InteractionSource,
    shape: Shape? = null,
): Modifier = basisModifier().indication(
    interactionSource = interactionSource,
    indication = BasisIndicationNodeFactory(shape = shape),
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
        BasisIndicationNodeFactory(
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
): IndicationNodeFactory = BasisIndicationNodeFactory(
    color = color,
    shape = shape,
    treatment = treatment,
    bounded = bounded,
)

internal object BasisIndicationDefaults {
    const val PRESSED_ALPHA: Float = 0.10f
    const val HOVERED_ALPHA: Float = 0.04f
    const val FOCUSED_ALPHA: Float = 0.10f
    val HoverStrokeWidth: Dp = 1.5.dp
    val FocusStrokeWidth: Dp = 2.dp
    const val PRESS_IN_MS: Int = 45
    const val PRESS_OUT_MS: Int = 140
    const val MIN_TAP_HOLD_MS: Long = 75L
    const val HOVER_IN_MS: Int = 60
    const val HOVER_OUT_MS: Int = 100
    const val FOCUS_IN_MS: Int = 80
    const val FOCUS_OUT_MS: Int = 120
}

internal data class BasisIndicationNodeFactory(
    val color: Color = Color.Unspecified,
    val shape: Shape? = null,
    val treatment: Treatment? = null,
    val bounded: Boolean = true,
) : IndicationNodeFactory {

    override fun create(interactionSource: InteractionSource): DelegatableNode =
        BasisIndicationNode(
            interactionSource = interactionSource,
            color = color,
            shape = shape,
            treatment = treatment,
            bounded = bounded,
        )
}

private class BasisIndicationNode(
    private val interactionSource: InteractionSource,
    private val color: Color,
    private val shape: Shape?,
    private val treatment: Treatment?,
    private val bounded: Boolean,
) : Modifier.Node(), DrawModifierNode, CompositionLocalConsumerModifierNode {

    private val hoverAlpha = Animatable(0f)
    private val focusAlpha = Animatable(0f)
    private val pressAlpha = Animatable(0f)

    private var pressAlphaJob: Job? = null
    private var hoverAlphaJob: Job? = null
    private var focusAlphaJob: Job? = null

    private var cachedOutline: Outline? = null
    private var cachedOutlineSize: Size = Size.Unspecified
    private var cachedOutlineLayoutDirection: LayoutDirection? = null
    private var cachedPath: Path? = null

    private val isReducedMotion: Boolean
        get() = currentValueOf(LocalBasisTheme)?.constraints?.motion?.preferReducedMotion == true

    override fun onAttach() {
        coroutineScope.launch {
            interactionSource.interactions.collect { interaction ->
                handleInteraction(interaction)
            }
        }
    }

    private fun handleInteraction(interaction: androidx.compose.foundation.interaction.Interaction) {
        when (interaction) {
            is PressInteraction -> handlePress(interaction)

            is HoverInteraction.Enter ->
                launchAlphaAnimation(
                    hoverAlpha,
                    BasisIndicationDefaults.HOVERED_ALPHA,
                    BasisIndicationDefaults.HOVER_IN_MS,
                )

            is HoverInteraction.Exit ->
                launchAlphaAnimation(hoverAlpha, 0f, BasisIndicationDefaults.HOVER_OUT_MS)

            is FocusInteraction.Focus ->
                launchAlphaAnimation(
                    focusAlpha,
                    BasisIndicationDefaults.FOCUSED_ALPHA,
                    BasisIndicationDefaults.FOCUS_IN_MS,
                )

            is FocusInteraction.Unfocus ->
                launchAlphaAnimation(focusAlpha, 0f, BasisIndicationDefaults.FOCUS_OUT_MS)
        }
    }

    private fun handlePress(interaction: PressInteraction) {
        when (interaction) {
            is PressInteraction.Press -> {
                pressAlphaJob?.cancel()

                pressAlphaJob =
                    coroutineScope.launch {
                        animateAlpha(
                            animatable = pressAlpha,
                            targetAlpha = BasisIndicationDefaults.PRESSED_ALPHA,
                            duration = BasisIndicationDefaults.PRESS_IN_MS,
                        )
                    }
            }

            is PressInteraction.Release -> {
                val currentJob = pressAlphaJob

                pressAlphaJob =
                    coroutineScope.launch {
                        currentJob?.join()

                        if (pressAlpha.value < BasisIndicationDefaults.PRESSED_ALPHA) {
                            animateAlpha(
                                animatable = pressAlpha,
                                targetAlpha = BasisIndicationDefaults.PRESSED_ALPHA,
                                duration = BasisIndicationDefaults.PRESS_IN_MS,
                            )
                        }

                        delay(BasisIndicationDefaults.MIN_TAP_HOLD_MS.milliseconds)

                        animateAlpha(
                            animatable = pressAlpha,
                            targetAlpha = 0f,
                            duration = BasisIndicationDefaults.PRESS_OUT_MS,
                        )
                    }
            }

            is PressInteraction.Cancel -> {
                pressAlphaJob?.cancel()

                pressAlphaJob =
                    coroutineScope.launch {
                        animateAlpha(
                            animatable = pressAlpha,
                            targetAlpha = 0f,
                            duration = BasisIndicationDefaults.PRESS_OUT_MS,
                        )
                    }
            }
        }
    }

    private fun launchAlphaAnimation(
        animatable: Animatable<Float, AnimationVector1D>,
        targetAlpha: Float,
        duration: Int,
    ) {
        when (animatable) {
            hoverAlpha -> {
                hoverAlphaJob?.cancel()

                hoverAlphaJob = coroutineScope.launch { animateAlpha(animatable, targetAlpha, duration) }
            }

            focusAlpha -> {
                focusAlphaJob?.cancel()

                focusAlphaJob = coroutineScope.launch { animateAlpha(animatable, targetAlpha, duration) }
            }
        }
    }

    private suspend fun animateAlpha(
        animatable: Animatable<Float, AnimationVector1D>,
        targetAlpha: Float,
        duration: Int,
    ) {
        if (isReducedMotion) {
            animatable.snapTo(targetAlpha)

            invalidateDraw()
        } else {
            animatable.animateTo(
                targetValue = targetAlpha,
                animationSpec = tween(durationMillis = duration),
            ) {
                invalidateDraw()
            }
        }
    }

    private fun resolveIndicationColor(): Color {
        if (color.isSpecified) return color

        val ambient = currentValueOf(LocalBasisTheme)
        val ambientContent = currentValueOf(LocalBasisContentColor)

        return when (treatment) {
            Treatment.Inverse -> ambient?.colors?.content?.inverse ?: Color.White
            Treatment.Fill -> {
                if (ambientContent.isSpecified) {
                    ambientContent
                } else {
                    ambient?.colors?.content?.inverse ?: Color.White
                }
            }

            Treatment.Soft, Treatment.Outline, Treatment.Ghost -> {
                ambient?.colors?.brand?.primary
                    ?: if (ambientContent.isSpecified) {
                        ambientContent
                    } else {
                        ambient?.colors?.content?.default ?: Color.Black
                    }
            }

            null -> {
                if (ambientContent.isSpecified) {
                    ambientContent
                } else {
                    ambient?.colors?.content?.default ?: Color.Black
                }
            }
        }
    }

    private fun ContentDrawScope.obtainOutline(): Outline? {
        val currentShape = shape ?: return null

        if (cachedOutline == null || cachedOutlineSize != size || cachedOutlineLayoutDirection != layoutDirection) {
            val outline = currentShape.createOutline(size, layoutDirection, this)
            cachedOutline = outline
            cachedOutlineSize = size
            cachedOutlineLayoutDirection = layoutDirection

            cachedPath =
                when (outline) {
                    is Outline.Rounded -> Path().apply { addRoundRect(outline.roundRect) }
                    is Outline.Generic -> outline.path
                    is Outline.Rectangle -> null
                }
        }

        return cachedOutline
    }

    private inline fun ContentDrawScope.withIndicationClip(
        outline: Outline?,
        crossinline block: ContentDrawScope.() -> Unit,
    ) {
        if (!bounded) {
            block()

            return
        }

        if (outline != null) {
            val path = cachedPath

            if (path != null) {
                clipPath(path) {
                    this@withIndicationClip.block()
                }
            } else {
                clipRect(
                    left = outline.bounds.left,
                    top = outline.bounds.top,
                    right = outline.bounds.right,
                    bottom = outline.bounds.bottom,
                ) {
                    this@withIndicationClip.block()
                }
            }
        } else {
            clipRect {
                this@withIndicationClip.block()
            }
        }
    }

    override fun ContentDrawScope.draw() {
        drawContent()

        val pAlpha = pressAlpha.value
        val hAlpha = hoverAlpha.value
        val fAlpha = focusAlpha.value

        if (pAlpha <= 0f && hAlpha <= 0f && fAlpha <= 0f) return

        val outline = obtainOutline()

        withIndicationClip(outline) {
            val resolvedColor = resolveIndicationColor()
            val ambient = currentValueOf(LocalBasisTheme)

            if (pAlpha > 0f) {
                val fillColor = resolvedColor.copy(alpha = pAlpha)

                if (outline != null) {
                    drawOutline(outline = outline, color = fillColor)
                } else {
                    drawRect(color = fillColor)
                }
            }

            if (hAlpha > 0f) {
                val strokePx = BasisIndicationDefaults.HoverStrokeWidth.toPx()
                val hoverColor = resolvedColor.copy(alpha = hAlpha)

                if (outline != null) {
                    drawOutline(outline = outline, color = hoverColor, style = Stroke(width = strokePx))
                } else {
                    drawRect(color = hoverColor, style = Stroke(width = strokePx))
                }
            }

            if (fAlpha > 0f) {
                val strokePx = BasisIndicationDefaults.FocusStrokeWidth.toPx()
                val focusBaseColor = ambient?.colors?.focus?.ring ?: resolvedColor
                val focusColor = focusBaseColor.copy(alpha = fAlpha)

                if (outline != null) {
                    drawOutline(outline = outline, color = focusColor, style = Stroke(width = strokePx))
                } else {
                    drawRect(color = focusColor, style = Stroke(width = strokePx))
                }
            }
        }
    }
}
