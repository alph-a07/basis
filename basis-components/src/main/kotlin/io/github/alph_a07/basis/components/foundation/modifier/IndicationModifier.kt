package io.github.alph_a07.basis.components.foundation.modifier

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.IndicationNodeFactory
import androidx.compose.foundation.indication
import androidx.compose.foundation.interaction.HoverInteraction
import androidx.compose.foundation.interaction.InteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.drawOutline
import androidx.compose.ui.graphics.drawscope.ContentDrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
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
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.theme.locals.LocalBasisContentColor
import kotlin.math.hypot
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
public fun Modifier.basisIndication(
    interactionSource: InteractionSource,
    shape: Shape? = null,
): Modifier = basisModifier().indication(interactionSource, createBasisIndication(shape = shape))

internal fun createBasisIndication(
    color: Color = Color.Unspecified,
    shape: Shape? = null,
): IndicationNodeFactory = DefaultIndicationNodeFactory(color, shape)

private data class DefaultIndicationNodeFactory(
    private val color: Color,
    private val shape: Shape?,
) : IndicationNodeFactory {

    override fun create(interactionSource: InteractionSource): DelegatableNode =
        DefaultIndicationNode(interactionSource, color, shape)

    override fun hashCode(): Int = 31 * color.hashCode() + (shape?.hashCode() ?: 0)

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is DefaultIndicationNodeFactory) return false

        return color == other.color && shape == other.shape
    }
}

private class DefaultIndicationNode(
    private val interactionSource: InteractionSource,
    private val color: Color,
    private val shape: Shape?,
) : Modifier.Node(), DrawModifierNode, LayoutModifierNode, CompositionLocalConsumerModifierNode {

    private var currentSize: Size = Size.Zero
    private var pressOrigin: Offset? = null
    private val circleRadius = Animatable(0f)
    private val circleFillFraction = Animatable(0f)
    private val globalAlpha = Animatable(0f)
    private val hoverAlpha = Animatable(0f)

    private var activePressJob: Job? = null
    private var activeReleaseJob: Job? = null

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
                    is HoverInteraction.Enter -> onHover(hovered = true)
                    is HoverInteraction.Exit -> onHover(hovered = false)
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
                circleFillFraction.snapTo(0f)
                globalAlpha.snapTo(1f)
                val maxRadius =
                    hypot(currentSize.width.toDouble(), currentSize.height.toDouble()).toFloat() *
                        RADIUS_EXPANSION_RATIO

                circleRadius.animateTo(
                    targetValue = maxRadius,
                    animationSpec =
                        spring(
                            dampingRatio = PRESS_SPRING_DAMPING,
                            stiffness = PRESS_SPRING_STIFFNESS,
                        ),
                ) {
                    invalidateDraw()
                }
            }
    }

    private fun onRelease() {
        val pressJob = activePressJob

        activeReleaseJob =
            coroutineScope.launch {
                pressJob?.join()
                val maxRadius =
                    hypot(currentSize.width.toDouble(), currentSize.height.toDouble()).toFloat() *
                        RADIUS_EXPANSION_RATIO
                val minRadius = maxRadius * MIN_RADIUS_FRACTION
                if (circleRadius.value < minRadius) {
                    circleRadius.snapTo(minRadius)

                    invalidateDraw()
                }

                circleFillFraction.animateTo(
                    targetValue = 1f,
                    animationSpec = tween(durationMillis = FILL_CROSS_FADE_MS),
                ) {
                    invalidateDraw()
                }

                delay(MIN_PRESS_HOLD_MS.milliseconds)

                globalAlpha.animateTo(
                    targetValue = 0f,
                    animationSpec = tween(durationMillis = FADE_OUT_MS),
                ) {
                    invalidateDraw()
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
                    animationSpec = tween(durationMillis = CANCEL_FADE_MS),
                ) {
                    invalidateDraw()
                }
            }
    }

    private fun onHover(hovered: Boolean) {
        coroutineScope.launch {
            val target = if (hovered) HOVERED_ALPHA else 0f
            val duration = if (hovered) HOVER_IN_MS else HOVER_OUT_MS

            hoverAlpha.animateTo(
                targetValue = target,
                animationSpec = tween(durationMillis = duration),
            ) {
                invalidateDraw()
            }
        }
    }

    override fun ContentDrawScope.draw() {
        drawContent()

        val resolvedColor = if (color.isSpecified) color else currentValueOf(LocalBasisContentColor)

        if (hoverAlpha.value > 0f) {
            val strokePx = HOVER_STROKE_DP.dp.toPx()
            val hoverColor = resolvedColor.copy(alpha = hoverAlpha.value)

            if (shape != null) {
                val outline = shape.createOutline(size, layoutDirection, this)

                drawOutline(outline = outline, color = hoverColor, style = Stroke(width = strokePx))
            } else {
                drawRect(color = hoverColor, style = Stroke(width = strokePx))
            }
        }

        if (globalAlpha.value > 0f && circleRadius.value > 0f) {
            val effectiveAlpha = PRESSED_ALPHA * globalAlpha.value
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

    private companion object {
        private const val PRESSED_ALPHA: Float = 0.12f
        private const val HOVERED_ALPHA: Float = 0.03f
        private const val HOVER_STROKE_DP: Float = 1.5f
        private const val RADIUS_EXPANSION_RATIO: Float = 0.6f
        private const val MIN_RADIUS_FRACTION: Float = 0.40f
        private const val MIN_PRESS_HOLD_MS: Long = 80L
        private const val PRESS_SPRING_DAMPING: Float = 0.72f
        private const val PRESS_SPRING_STIFFNESS: Float = 280f
        private const val FILL_CROSS_FADE_MS: Int = 80
        private const val FADE_OUT_MS: Int = 160
        private const val CANCEL_FADE_MS: Int = 120
        private const val HOVER_IN_MS: Int = 80
        private const val HOVER_OUT_MS: Int = 120
    }
}
