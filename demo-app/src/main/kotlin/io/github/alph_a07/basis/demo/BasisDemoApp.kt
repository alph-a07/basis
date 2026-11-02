package io.github.alph_a07.basis.demo

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.foundation.modifier.basisBorder
import io.github.alph_a07.basis.components.foundation.modifier.basisClickable
import io.github.alph_a07.basis.components.foundation.modifier.basisFocusRing
import io.github.alph_a07.basis.components.foundation.modifier.basisMinTouchTarget
import io.github.alph_a07.basis.components.foundation.modifier.basisSelectable
import io.github.alph_a07.basis.components.foundation.modifier.basisSurface
import io.github.alph_a07.basis.components.foundation.modifier.basisToggleable
import io.github.alph_a07.basis.components.theme.BasisTheme
import io.github.alph_a07.basis.components.theme.conversion.toDp
import io.github.alph_a07.basis.theme.core.color.ColorSpec
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.BrandPresence
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.IdentityIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.resolution.resolve

/**
 * End-to-end interactive demo screen showing theme resolution and foundation integration.
 *
 * Demonstrates [resolve] -> [BasisTheme] -> Surface, Text, Selection, Toggleable, and Clickable.
 */
@Composable
public fun BasisDemoApp() {
    var isDarkTheme by remember { mutableStateOf(false) }
    var selectedPresetIndex by remember { mutableIntStateOf(0) }
    var clickCount by remember { mutableIntStateOf(0) }
    var isChecked by remember { mutableStateOf(true) }

    val currentIntent = DEMO_PRESETS[selectedPresetIndex].second
    val resolvedPair = remember(currentIntent) { resolve(currentIntent) }

    BasisTheme(pair = resolvedPair, useDarkTheme = isDarkTheme) {
        val rootShape = RoundedCornerShape(0.dp)

        Column(
            modifier =
                Modifier
                    .fillMaxSize()
                    .basisSurface(
                        shape = rootShape,
                        color = BasisTheme.colors.surface.default,
                    )
                    .padding(BasisTheme.spacing.level4.toDp())
                    .verticalScroll(rememberScrollState()),
        ) {
            DemoHeaderSection()
            Spacer(modifier = Modifier.height(BasisTheme.spacing.level4.toDp()))

            DemoModeSection(
                isDarkTheme = isDarkTheme,
                onToggleDark = { isDarkTheme = !isDarkTheme },
            )
            Spacer(modifier = Modifier.height(BasisTheme.spacing.level4.toDp()))

            DemoPresetsSection(
                selectedIndex = selectedPresetIndex,
                onSelectPreset = { selectedPresetIndex = it },
            )
            Spacer(modifier = Modifier.height(BasisTheme.spacing.level5.toDp()))

            DemoInteractiveSection(
                clickCount = clickCount,
                onClick = { clickCount++ },
                isChecked = isChecked,
                onToggleChecked = { isChecked = it },
            )
            Spacer(modifier = Modifier.height(BasisTheme.spacing.level4.toDp()))

            DemoStatusSection()
        }
    }
}

@Composable
private fun DemoHeaderSection() {
    BasicText(
        text = "Basis Foundation Demo",
        style = BasisTheme.typography.structure.level2,
    )
    Spacer(modifier = Modifier.height(BasisTheme.spacing.level1.toDp()))

    BasicText(
        text = "Live theme resolution paired with accessible Compose foundations.",
        style = BasisTheme.typography.content.level2,
    )
}

@Composable
private fun DemoModeSection(
    isDarkTheme: Boolean,
    onToggleDark: () -> Unit,
) {
    val chipShape = RoundedCornerShape(BasisTheme.radius.level4.toDp())

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        BasicText(
            text = "Mode: ${if (isDarkTheme) "Dark" else "Light"}",
            style = BasisTheme.typography.structure.level4,
        )

        Box(
            modifier =
                Modifier
                    .basisSurface(
                        shape = chipShape,
                        color = BasisTheme.colors.surface.elevated,
                    )
                    .basisBorder(
                        width = 1.dp,
                        color = BasisTheme.colors.border.default,
                        shape = chipShape,
                    )
                    .basisClickable(role = Role.Button, onClickLabel = "Toggle Dark Mode") {
                        onToggleDark()
                    }
                    .basisMinTouchTarget()
                    .padding(
                        horizontal = BasisTheme.spacing.level3.toDp(),
                        vertical = BasisTheme.spacing.level2.toDp(),
                    ),
        ) {
            BasicText(
                text = if (isDarkTheme) "☀️ Switch to Light" else "🌙 Switch to Dark",
                style = BasisTheme.typography.content.level2,
            )
        }
    }
}

@Composable
private fun DemoPresetsSection(
    selectedIndex: Int,
    onSelectPreset: (Int) -> Unit,
) {
    BasicText(
        text = "Design Intent Preset",
        style = BasisTheme.typography.structure.level4,
    )
    Spacer(modifier = Modifier.height(BasisTheme.spacing.level2.toDp()))

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(BasisTheme.spacing.level2.toDp()),
    ) {
        DEMO_PRESETS.forEachIndexed { index, (label, _) ->
            DemoPresetChip(
                label = label,
                isSelected = selectedIndex == index,
                onClick = { onSelectPreset(index) },
            )
        }
    }
}

@Composable
private fun DemoPresetChip(
    label: String,
    isSelected: Boolean,
    onClick: () -> Unit,
) {
    val chipShape = RoundedCornerShape(BasisTheme.radius.level4.toDp())
    val chipBg =
        if (isSelected) {
            BasisTheme.colors.selection.surface
        } else {
            BasisTheme.colors.surface.recessed
        }

    Box(
        modifier =
            Modifier
                .basisSurface(shape = chipShape, color = chipBg)
                .basisBorder(
                    width = if (isSelected) 2.dp else 1.dp,
                    color =
                        if (isSelected) {
                            BasisTheme.colors.brand.primary
                        } else {
                            BasisTheme.colors.border.default
                        },
                    shape = chipShape,
                )
                .basisSelectable(
                    selected = isSelected,
                    role = Role.RadioButton,
                    onClick = onClick,
                )
                .basisMinTouchTarget()
                .padding(
                    horizontal = BasisTheme.spacing.level3.toDp(),
                    vertical = BasisTheme.spacing.level2.toDp(),
                ),
    ) {
        BasicText(
            text = label,
            style = BasisTheme.typography.metadata.level1,
        )
    }
}

@Composable
private fun DemoInteractiveSection(
    clickCount: Int,
    onClick: () -> Unit,
    isChecked: Boolean,
    onToggleChecked: (Boolean) -> Unit,
) {
    val cardShape = RoundedCornerShape(BasisTheme.radius.level3.toDp())

    Box(
        modifier =
            Modifier
                .fillMaxWidth()
                .basisSurface(
                    shape = cardShape,
                    color = BasisTheme.colors.surface.elevated,
                )
                .basisBorder(
                    width = 1.dp,
                    color = BasisTheme.colors.border.default,
                    shape = cardShape,
                )
                .padding(BasisTheme.spacing.level4.toDp()),
    ) {
        Column {
            BasicText(
                text = "Interactive Surface Foundation",
                style = BasisTheme.typography.structure.level3,
            )
            Spacer(modifier = Modifier.height(BasisTheme.spacing.level2.toDp()))
            BasicText(
                text = "Surfaces adaptively map resolved OKLCH brand, contrast, and elevation.",
                style = BasisTheme.typography.content.level1,
            )
            Spacer(modifier = Modifier.height(BasisTheme.spacing.level4.toDp()))

            DemoButtonSpecimen(clickCount = clickCount, onClick = onClick)
            Spacer(modifier = Modifier.height(BasisTheme.spacing.level3.toDp()))

            DemoToggleSpecimen(isChecked = isChecked, onToggleChecked = onToggleChecked)
        }
    }
}

@Composable
private fun DemoButtonSpecimen(
    clickCount: Int,
    onClick: () -> Unit,
) {
    val buttonShape = RoundedCornerShape(BasisTheme.radius.level2.toDp())

    Box(
        modifier =
            Modifier
                .basisSurface(
                    shape = buttonShape,
                    color = BasisTheme.colors.brand.primary,
                )
                .basisFocusRing(shape = buttonShape)
                .basisClickable(role = Role.Button, onClickLabel = "Increment count") {
                    onClick()
                }
                .basisMinTouchTarget()
                .padding(
                    horizontal = BasisTheme.spacing.level4.toDp(),
                    vertical = BasisTheme.spacing.level3.toDp(),
                ),
    ) {
        BasicText(
            text = "Tapped $clickCount times",
            style =
                BasisTheme.typography.content.level1.copy(
                    color = BasisTheme.colors.content.inverse,
                ),
        )
    }
}

@Composable
private fun DemoToggleSpecimen(
    isChecked: Boolean,
    onToggleChecked: (Boolean) -> Unit,
) {
    val buttonShape = RoundedCornerShape(BasisTheme.radius.level2.toDp())

    Row(
        modifier =
            Modifier
                .fillMaxWidth()
                .basisSurface(
                    shape = buttonShape,
                    color = BasisTheme.colors.surface.recessed,
                )
                .basisToggleable(
                    value = isChecked,
                    role = Role.Checkbox,
                    onValueChange = onToggleChecked,
                )
                .basisMinTouchTarget()
                .padding(BasisTheme.spacing.level3.toDp()),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        BasicText(
            text = "Toggleable Foundation Specimen",
            style = BasisTheme.typography.content.level2,
        )

        BasicText(
            text = if (isChecked) "☑ Enabled" else "☐ Disabled",
            style = BasisTheme.typography.metadata.level1,
        )
    }
}

@Composable
private fun DemoStatusSection() {
    BasicText(
        text = "Semantic Status Tokens",
        style = BasisTheme.typography.structure.level4,
    )
    Spacer(modifier = Modifier.height(BasisTheme.spacing.level2.toDp()))

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(BasisTheme.spacing.level3.toDp()),
    ) {
        StatusBadge(
            label = "Positive",
            bgColor = BasisTheme.colors.positive.surface,
            fgColor = BasisTheme.colors.positive.content,
        )
        StatusBadge(
            label = "Caution",
            bgColor = BasisTheme.colors.caution.surface,
            fgColor = BasisTheme.colors.caution.content,
        )
        StatusBadge(
            label = "Negative",
            bgColor = BasisTheme.colors.negative.surface,
            fgColor = BasisTheme.colors.negative.content,
        )

        StatusBadge(
            label = "Info",
            bgColor = BasisTheme.colors.info.surface,
            fgColor = BasisTheme.colors.info.content,
        )
    }
}

@Composable
private fun StatusBadge(
    label: String,
    bgColor: Color,
    fgColor: Color,
) {
    val badgeShape = RoundedCornerShape(BasisTheme.radius.level4.toDp())

    Box(
        modifier =
            Modifier
                .basisSurface(shape = badgeShape, color = bgColor)
                .padding(
                    horizontal = BasisTheme.spacing.level3.toDp(),
                    vertical = BasisTheme.spacing.level1.toDp(),
                ),
    ) {
        BasicText(
            text = label,
            style = BasisTheme.typography.metadata.level2.copy(color = fgColor),
        )
    }
}

private val DEMO_PRESETS: List<Pair<String, BasisIntent>> =
    listOf(
        "Neutral" to BasisIntent(),
        "Electric" to
            BasisIntent(
                identity =
                    IdentityIntent(
                        brandColor = ColorSpec.Hex("#0284C7"),
                        presence = BrandPresence.Strong,
                    ),
            ),
        "Fintech" to
            BasisIntent(
                identity =
                    IdentityIntent(
                        brandColor = ColorSpec.Hex("#0F52BA"),
                        presence = BrandPresence.Dominant,
                    ),
                mood =
                    MoodIntent(
                        preset = MoodPreset.Bold,
                        knobs =
                            MoodKnobs(
                                density = 0.4f,
                                contrast = 0.3f,
                            ),
                    ),
                domain =
                    DomainIntent(
                        domains = setOf(ProductDomain.Finance),
                        interactions = setOf(InteractionPattern.DashboardMonitoring),
                    ),
            ),
        "Calm" to
            BasisIntent(
                identity =
                    IdentityIntent(
                        brandColor = ColorSpec.Hex("#10B981"),
                        presence = BrandPresence.Balanced,
                    ),
                mood = MoodIntent(preset = MoodPreset.Calm),
                domain =
                    DomainIntent(
                        domains = setOf(ProductDomain.Health),
                    ),
            ),
    )
