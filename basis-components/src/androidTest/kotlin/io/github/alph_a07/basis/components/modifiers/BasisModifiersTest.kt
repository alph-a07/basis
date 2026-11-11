package io.github.alph_a07.basis.components.modifiers

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.assert
import androidx.compose.ui.test.assertHeightIsEqualTo
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.assertWidthIsEqualTo
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasContentDescription
import androidx.compose.ui.test.isOn
import androidx.compose.ui.test.isSelectable
import androidx.compose.ui.test.isSelected
import androidx.compose.ui.test.isToggleable
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.performClick
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.theme.BasisTheme
import io.github.alph_a07.basis.components.theme.locals.LocalBasisContentColor
import io.github.alph_a07.basis.theme.core.DpValue
import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.ControlIntent
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import io.github.alph_a07.basis.theme.intent.controls.TouchTargetConstraint
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import org.junit.Rule
import org.junit.Test

/**
 * Instrumentation UI tests for internal foundation (T0) infrastructure across theme configurations.
 */
class BasisModifiersTest {

    @get:Rule
    val composeRule = createComposeRule()

    @Test
    fun localBasisContentColor_default_isUnspecified() {
        var observedColor = Color.Magenta

        composeRule.setContent {
            observedColor = LocalBasisContentColor.current
        }

        assertEquals(Color.Unspecified, observedColor)
    }

    @Test
    fun localBasisContentColor_lightMode_propagatesLightContentColor() {
        var observedColor: Color? = null
        var expectedColor: Color? = null

        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                expectedColor = BasisTheme.colors.content.default

                CompositionLocalProvider(LocalBasisContentColor provides BasisTheme.colors.content.default) {
                    observedColor = LocalBasisContentColor.current
                }
            }
        }

        assertNotNull(expectedColor)

        assertEquals(expectedColor, observedColor)
    }

    @Test
    fun localBasisContentColor_darkMode_propagatesDarkContentColor() {
        var observedColor: Color? = null
        var expectedColor: Color? = null

        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = true) {
                expectedColor = BasisTheme.colors.content.default

                CompositionLocalProvider(LocalBasisContentColor provides BasisTheme.colors.content.default) {
                    observedColor = LocalBasisContentColor.current
                }
            }
        }

        assertNotNull(expectedColor)

        assertEquals(expectedColor, observedColor)
    }

    @Test
    fun basisMinTouchTarget_expandsSmallElementToMinimum48dp() {
        composeRule.setContent {
            Box(
                modifier =
                    Modifier
                        .testTag("small-box")
                        .basisMinTouchTarget(48.dp)
                        .size(24.dp),
            )
        }

        composeRule.onNodeWithTag("small-box")
            .assertWidthIsEqualTo(48.dp)
            .assertHeightIsEqualTo(48.dp)
    }

    @Test
    fun basisMinTouchTarget_elevatedThemeConstraint_expandsTo56dp() {
        val intent =
            BasisIntent(
                control =
                    ControlIntent(
                        constraints =
                            ConstraintsControl(
                                minTouchTarget = TouchTargetConstraint(DpValue(56f)),
                            ),
                    ),
            )

        composeRule.setContent {
            BasisTheme(intent = intent, useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("constrained-box")
                            .basisMinTouchTarget()
                            .size(20.dp),
                )
            }
        }

        composeRule.onNodeWithTag("constrained-box")
            .assertWidthIsEqualTo(56.dp)
            .assertHeightIsEqualTo(56.dp)
    }

    @Test
    fun basisMinTouchTarget_largeElement_doesNotShrink() {
        composeRule.setContent {
            Box(
                modifier =
                    Modifier
                        .testTag("large-box")
                        .basisMinTouchTarget(48.dp)
                        .size(64.dp),
            )
        }

        composeRule.onNodeWithTag("large-box")
            .assertWidthIsEqualTo(64.dp)
            .assertHeightIsEqualTo(64.dp)
    }

    @Test
    fun basisIndication_attachesToNodeWithoutError() {
        val interactionSource = MutableInteractionSource()

        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("indication-box")
                            .basisIndication(interactionSource = interactionSource)
                            .size(32.dp),
                )
            }
        }

        composeRule.onNodeWithTag("indication-box").assertExists()
    }

    @Test
    fun basisClickable_receivesClickEventUnderTheme() {
        var clickCount = 0

        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("clickable-box")
                            .basisClickable(role = Role.Button, onClickLabel = "Test click") {
                                clickCount++
                            }
                            .size(32.dp),
                )
            }
        }

        composeRule.onNodeWithTag("clickable-box").performClick()

        assertEquals(1, clickCount)

        composeRule.onNodeWithTag("clickable-box")
            .assertWidthIsEqualTo(48.dp)
            .assertHeightIsEqualTo(48.dp)
    }

    @Test
    fun basisSelectable_togglesSelectionState() {
        var selectedState = false

        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("selectable-box")
                            .basisSelectable(selected = selectedState, role = Role.RadioButton) {
                                selectedState = !selectedState
                            }
                            .size(28.dp),
                )
            }
        }

        composeRule.onNodeWithTag("selectable-box").performClick()

        assertEquals(true, selectedState)
    }

    @Test
    fun basisToggleable_togglesCheckedState() {
        var checkedState = false

        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("toggleable-box")
                            .basisToggleable(value = checkedState, role = Role.Checkbox) {
                                checkedState = it
                            }
                            .size(28.dp),
                )
            }
        }

        composeRule.onNodeWithTag("toggleable-box").performClick()

        assertEquals(true, checkedState)
    }

    @Test
    fun basisFocusRing_attachesWithoutErrorUnderLightTheme() {
        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("light-focus-box")
                            .basisFocusRing(shape = RoundedCornerShape(8.dp))
                            .size(40.dp),
                )
            }
        }

        composeRule.onNodeWithTag("light-focus-box").assertExists()
    }

    @Test
    fun basisFocusRing_attachesWithoutErrorUnderDarkTheme() {
        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = true) {
                Box(
                    modifier =
                        Modifier
                            .testTag("dark-focus-box")
                            .basisFocusRing(shape = RoundedCornerShape(8.dp))
                            .size(40.dp),
                )
            }
        }

        composeRule.onNodeWithTag("dark-focus-box").assertExists()
    }

    @Test
    fun basisClickable_talkBackSemantics_exposesRoleAndClickLabel() {
        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("accessible-button")
                            .basisClickable(
                                role = Role.Button,
                                onClickLabel = "Perform action",
                                onClick = {},
                            ),
                )
            }
        }

        composeRule.onNodeWithTag("accessible-button")
            .assert(SemanticsMatcher.expectValue(SemanticsProperties.Role, Role.Button))
            .assert(hasClickAction())
    }

    @Test
    fun basisClickable_disabledState_exposesDisabledSemantics() {
        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("disabled-clickable")
                            .basisClickable(
                                enabled = false,
                                role = Role.Button,
                                onClick = {},
                            ),
                )
            }
        }

        composeRule.onNodeWithTag("disabled-clickable")
            .assertIsNotEnabled()
    }

    @Test
    fun basisToggleable_talkBackSemantics_exposesRoleAndToggleState() {
        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("accessible-toggle")
                            .basisToggleable(
                                value = true,
                                role = Role.Checkbox,
                                onValueChange = {},
                            ),
                )
            }
        }

        composeRule.onNodeWithTag("accessible-toggle")
            .assert(SemanticsMatcher.expectValue(SemanticsProperties.Role, Role.Checkbox))
            .assert(isToggleable())
            .assert(isOn())
    }

    @Test
    fun basisSelectable_talkBackSemantics_exposesRoleAndSelectionState() {
        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("accessible-select")
                            .basisSelectable(
                                selected = true,
                                role = Role.RadioButton,
                                onClick = {},
                            ),
                )
            }
        }

        composeRule.onNodeWithTag("accessible-select")
            .assert(SemanticsMatcher.expectValue(SemanticsProperties.Role, Role.RadioButton))
            .assert(isSelectable())
            .assert(isSelected())
    }

    @Test
    fun basisClearAndSetSemantics_talkBackBarrier_setsContentDescription() {
        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("semantic-barrier")
                            .basisClearAndSetSemantics {
                                contentDescription = "Summary container"
                            },
                )
            }
        }

        composeRule.onNodeWithTag("semantic-barrier")
            .assert(hasContentDescription("Summary container"))
    }

    @Test
    fun basisModifier_appliesSuccessfully() {
        composeRule.setContent {
            BasisTheme(intent = BasisIntent(), useDarkTheme = false) {
                Box(
                    modifier =
                        Modifier
                            .testTag("base-modifier-box")
                            .basisModifier()
                            .size(24.dp),
                )
            }
        }

        composeRule.onNodeWithTag("base-modifier-box")
            .assertWidthIsEqualTo(24.dp)
            .assertHeightIsEqualTo(24.dp)
    }
}
