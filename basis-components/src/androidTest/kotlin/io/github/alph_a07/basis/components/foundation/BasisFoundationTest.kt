package io.github.alph_a07.basis.components.foundation

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.test.assertHeightIsEqualTo
import androidx.compose.ui.test.assertWidthIsEqualTo
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.performClick
import androidx.compose.ui.unit.dp
import io.github.alph_a07.basis.components.foundation.modifier.basisClickable
import io.github.alph_a07.basis.components.foundation.modifier.basisFocusRing
import io.github.alph_a07.basis.components.foundation.modifier.basisIndication
import io.github.alph_a07.basis.components.foundation.modifier.basisMinTouchTarget
import io.github.alph_a07.basis.components.foundation.modifier.basisSelectable
import io.github.alph_a07.basis.components.foundation.modifier.basisToggleable
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
class BasisFoundationTest {

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
}
