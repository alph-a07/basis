package io.github.alph_a07.basis.components.foundation

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.IndicationNodeFactory
import androidx.compose.foundation.interaction.FocusInteraction
import androidx.compose.foundation.interaction.HoverInteraction
import androidx.compose.foundation.interaction.InteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
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
import androidx.compose.ui.layout.Measurable
import androidx.compose.ui.layout.MeasureResult
import androidx.compose.ui.layout.MeasureScope
import androidx.compose.ui.node.CompositionLocalConsumerModifierNode
import androidx.compose.ui.node.DelegatableNode
import androidx.compose.ui.node.DrawModifierNode
import androidx.compose.ui.node.LayoutModifierNode
import androidx.compose.ui.node.currentValueOf
import androidx.compose.ui.node.invalidateDraw
import androidx.compose.ui.unit.Constraints
import io.github.alph_a07.basis.components.annotation.BasisComponentDoc
import io.github.alph_a07.basis.components.theme.BasisTheme
import io.github.alph_a07.basis.components.theme.locals.LocalBasisContentColor
import io.github.alph_a07.basis.components.theme.locals.LocalBasisTheme
import io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment
import kotlin.math.hypot
import kotlin.time.Duration.Companion.milliseconds
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * Creates visual indication feedback (press, hover, and focus) derived from the active [BasisTheme].
 *
 * Implements [IndicationNodeFactory] to integrate with Compose Foundation's indication system.
 * Highlights dynamically adapt to [BasisTheme] colors, [LocalBasisContentColor], and optional
 * [Treatment] styling, ensuring high contrast across light and dark modes.
 *
 * @property color Explicit highlight color override. When [Color.Unspecified], resolves dynamically from the theme.
 * @property shape Optional clipping or boundary [Shape]; null defaults to rectangular bounds.
 * @property treatment Optional [Treatment] describing container styling for contrast-adaptive highlights.
 * @property bounded Whether indication drawing is constrained to layout bounds. Defaults to true.
 */
@BasisComponentDoc(
    id = "indication",
    family = "Foundation",
    role = "None",
    minTouchTargetDp = 0,
    respectsReducedMotion = true,
    quickStartSample =
        "val indication = rememberBasisIndication()\nBox(\n    modifier = Modifier\n" +
            "        .indication(interactionSource, indication)\n)",
)
public data class BasisIndication(
    public val color: Color = Color.Unspecified,
    public val shape: Shape? = null,
    public val treatment: Treatment? = null,
    public val bounded: Boolean = true,
) : IndicationNodeFactory {

    override fun create(interactionSource: InteractionSource): DelegatableNode =
        IndicationNode(
            interactionSource = interactionSource,
            color = color,
            shape = shape,
            treatment = treatment,
            bounded = bounded,
        )
}

/**
 * Creates and remembers a [BasisIndication] instance configured with [color], [shape], [treatment], and [bounded].
 *
 * @param color Explicit highlight color override. When [Color.Unspecified], resolves dynamically from the theme.
 * @param shape Optional clipping or boundary [Shape]; null defaults to rectangular bounds.
 * @param treatment Optional [Treatment] describing container styling for contrast-adaptive highlights.
 * @param bounded Whether indication drawing is constrained to layout bounds. Defaults to true.
 * @return Remembered [BasisIndication] instance.
 */
@Composable
public fun rememberBasisIndication(
    color: Color = Color.Unspecified,
    shape: Shape? = null,
    treatment: Treatment? = null,
    bounded: Boolean = true,
): BasisIndication = remember(color, shape, treatment, bounded) {
    BasisIndication(
        color = color,
        shape = shape,
        treatment = treatment,
        bounded = bounded,
    )
}

private class IndicationNode(
    private val interactionSource: InteractionSource,
    private val color: Color,
    private val shape: Shape?,
    private val treatment: Treatment?,
    private val bounded: Boolean,
) : Modifier.Node(), DrawModifierNode, LayoutModifierNode, CompositionLocalConsumerModifierNode {

    private var currentSize: Size = Size.Zero
    private var pressOrigin: Offset? = null
    private val circleRadius = Animatable(0f)
    private val circleFillFraction = Animatable(0f)
    private val globalAlpha = Animatable(0f)
    private val hoverAlpha = Animatable(0f)
    private val focusAlpha = Animatable(0f)

    private var activePressJob: Job? = null
    private var activeReleaseJob: Job? = null

    private val isReducedMotion: Boolean
        get() = currentValueOf(LocalBasisTheme)?.constraints?.motion?.preferReducedMotion == true

    override fun MeasureScope.measure(
        measurable: Measurable,
        constraints: Constraints,
    ): MeasureResult {
        val placeable = measurable.measure(constraints)
        currentSize = Size(placeable.width.toFloat(), placeable.height.toFloat())

        return layout(placeable.width, placeable.height) {
            placeable.placeRelative(0, 0)
        }
    }

    override fun onAttach() {
        coroutineScope.launch {
            interactionSource.interactions.collect { interaction ->
                when (interaction) {
                    is PressInteraction.Press -> onPress(interaction.pressPosition)
                    is PressInteraction.Release -> onRelease()
                    is PressInteraction.Cancel -> onCancel()
                    is HoverInteraction.Enter ->
                        onInteractionAlpha(
                            animatable = hoverAlpha,
                            active = true,
                            targetAlpha = BasisIndicationDefaults.HOVERED_ALPHA,
                            inDuration = BasisIndicationDefaults.HOVER_IN_MS,
                            outDuration = BasisIndicationDefaults.HOVER_OUT_MS,
                        )
                    is HoverInteraction.Exit ->
                        onInteractionAlpha(
                            animatable = hoverAlpha,
                            active = false,
                            targetAlpha = BasisIndicationDefaults.HOVERED_ALPHA,
                            inDuration = BasisIndicationDefaults.HOVER_IN_MS,
                            outDuration = BasisIndicationDefaults.HOVER_OUT_MS,
                        )
                    is FocusInteraction.Focus ->
                        onInteractionAlpha(
                            animatable = focusAlpha,
                            active = true,
                            targetAlpha = BasisIndicationDefaults.FOCUSED_ALPHA,
                            inDuration = BasisIndicationDefaults.FOCUS_IN_MS,
                            outDuration = BasisIndicationDefaults.FOCUS_OUT_MS,
                        )
                    is FocusInteraction.Unfocus ->
                        onInteractionAlpha(
                            animatable = focusAlpha,
                            active = false,
                            targetAlpha = BasisIndicationDefaults.FOCUSED_ALPHA,
                            inDuration = BasisIndicationDefaults.FOCUS_IN_MS,
                            outDuration = BasisIndicationDefaults.FOCUS_OUT_MS,
                        )
                }
            }
        }
    }

    private fun onPress(origin: Offset) {
        activePressJob?.cancel()
        activeReleaseJob?.cancel()
        pressOrigin = origin

        activePressJob =
            coroutineScope.launch {
                val width = if (currentSize.width > 0f) currentSize.width else FALLBACK_DIMENSION_PX
                val height = if (currentSize.height > 0f) currentSize.height else FALLBACK_DIMENSION_PX
                val maxRadius =
                    hypot(width.toDouble(), height.toDouble()).toFloat() *
                        BasisIndicationDefaults.RADIUS_EXPANSION_RATIO

                if (isReducedMotion) {
                    circleFillFraction.snapTo(0f)
                    circleRadius.snapTo(maxRadius)
                    globalAlpha.snapTo(1f)

                    invalidateDraw()
                } else {
                    circleFillFraction.snapTo(0f)
                    globalAlpha.snapTo(1f)

                    circleRadius.animateTo(
                        targetValue = maxRadius,
                        animationSpec =
                            spring(
                                dampingRatio = BasisIndicationDefaults.PRESS_SPRING_DAMPING,
                                stiffness = BasisIndicationDefaults.PRESS_SPRING_STIFFNESS,
                            ),
                    ) {
                        invalidateDraw()
                    }
                }
            }
    }

    private fun onRelease() {
        val pressJob = activePressJob

        activeReleaseJob =
            coroutineScope.launch {
                pressJob?.join()
                val width = if (currentSize.width > 0f) currentSize.width else FALLBACK_DIMENSION_PX
                val height = if (currentSize.height > 0f) currentSize.height else FALLBACK_DIMENSION_PX
                val maxRadius =
                    hypot(width.toDouble(), height.toDouble()).toFloat() *
                        BasisIndicationDefaults.RADIUS_EXPANSION_RATIO
                val minRadius = maxRadius * BasisIndicationDefaults.MIN_RADIUS_FRACTION

                if (isReducedMotion) {
                    globalAlpha.animateTo(
                        targetValue = 0f,
                        animationSpec = tween(durationMillis = BasisIndicationDefaults.FILL_CROSS_FADE_MS),
                    ) {
                        invalidateDraw()
                    }
                } else {
                    if (circleRadius.value < minRadius) {
                        circleRadius.snapTo(minRadius)

                        invalidateDraw()
                    }

                    circleFillFraction.animateTo(
                        targetValue = 1f,
                        animationSpec = tween(durationMillis = BasisIndicationDefaults.FILL_CROSS_FADE_MS),
                    ) {
                        invalidateDraw()
                    }

                    delay(BasisIndicationDefaults.MIN_PRESS_HOLD_MS.milliseconds)

                    globalAlpha.animateTo(
                        targetValue = 0f,
                        animationSpec = tween(durationMillis = BasisIndicationDefaults.FADE_OUT_MS),
                    ) {
                        invalidateDraw()
                    }
                }

                circleRadius.snapTo(0f)
                pressOrigin = null
                activePressJob = null

                activeReleaseJob = null
            }
    }

    private fun onCancel() {
        activePressJob?.cancel()
        activeReleaseJob?.cancel()

        activePressJob =
            coroutineScope.launch {
                circleRadius.snapTo(0f)

                globalAlpha.animateTo(
                    targetValue = 0f,
                    animationSpec = tween(durationMillis = BasisIndicationDefaults.CANCEL_FADE_MS),
                ) {
                    invalidateDraw()
                }
            }
    }

    private fun onInteractionAlpha(
        animatable: Animatable<Float, *>,
        active: Boolean,
        targetAlpha: Float,
        inDuration: Int,
        outDuration: Int,
    ) {
        coroutineScope.launch {
            val target = if (active) targetAlpha else 0f

            if (isReducedMotion) {
                animatable.snapTo(target)

                invalidateDraw()
            } else {
                val duration = if (active) inDuration else outDuration

                animatable.animateTo(
                    targetValue = target,
                    animationSpec = tween(durationMillis = duration),
                ) {
                    invalidateDraw()
                }
            }
        }
    }

    private fun ContentDrawScope.resolveIndicationColor(): Color {
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

    private inline fun ContentDrawScope.withIndicationClip(crossinline block: ContentDrawScope.() -> Unit) {
        if (!bounded) {
            block()

            return
        }

        if (shape != null) {
            when (val outline = shape.createOutline(size, layoutDirection, this)) {
                is Outline.Rectangle ->
                    clipRect(
                        left = outline.rect.left,
                        top = outline.rect.top,
                        right = outline.rect.right,
                        bottom = outline.rect.bottom,
                    ) {
                        this@withIndicationClip.block()
                    }

                is Outline.Rounded -> {
                    val path = Path().apply { addRoundRect(outline.roundRect) }

                    clipPath(path) {
                        this@withIndicationClip.block()
                    }
                }

                is Outline.Generic ->
                    clipPath(outline.path) {
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

        withIndicationClip {
            val resolvedColor = resolveIndicationColor()
            val ambient = currentValueOf(LocalBasisTheme)

            if (hoverAlpha.value > 0f) {
                val strokePx = BasisIndicationDefaults.HoverStrokeWidth.toPx()
                val hoverColor = resolvedColor.copy(alpha = hoverAlpha.value)

                if (shape != null) {
                    val outline = shape.createOutline(size, layoutDirection, this)

                    drawOutline(outline = outline, color = hoverColor, style = Stroke(width = strokePx))
                } else {
                    drawRect(color = hoverColor, style = Stroke(width = strokePx))
                }
            }

            if (focusAlpha.value > 0f) {
                val strokePx = BasisIndicationDefaults.FocusStrokeWidth.toPx()
                val focusBaseColor = ambient?.colors?.focus?.ring ?: resolvedColor
                val focusColor = focusBaseColor.copy(alpha = focusAlpha.value)

                if (shape != null) {
                    val outline = shape.createOutline(size, layoutDirection, this)

                    drawOutline(outline = outline, color = focusColor, style = Stroke(width = strokePx))
                } else {
                    drawRect(color = focusColor, style = Stroke(width = strokePx))
                }
            }

            if (globalAlpha.value > 0f && circleRadius.value > 0f) {
                val effectiveAlpha = BasisIndicationDefaults.PRESSED_ALPHA * globalAlpha.value
                val circlePart = (1f - circleFillFraction.value) * effectiveAlpha
                val origin = pressOrigin ?: center

                if (circlePart > 0f) {
                    drawCircle(
                        color = resolvedColor.copy(alpha = circlePart),
                        radius = circleRadius.value,
                        center = origin,
                    )
                }

                val fillPart = circleFillFraction.value * effectiveAlpha

                if (fillPart > 0f) {
                    val fillColor = resolvedColor.copy(alpha = fillPart)

                    if (shape != null) {
                        val outline = shape.createOutline(size, layoutDirection, this)

                        drawOutline(outline = outline, color = fillColor)
                    } else {
                        drawRect(color = fillColor)
                    }
                }
            }
        }
    }

    private companion object {
        private const val FALLBACK_DIMENSION_PX: Float = 100f
    }
}
