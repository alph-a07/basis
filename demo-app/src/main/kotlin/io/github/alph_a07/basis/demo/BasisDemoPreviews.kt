package io.github.alph_a07.basis.demo

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import io.github.alph_a07.basis.components.theme.BasisTheme

@Preview(name = "Light Mode - Neutral", showBackground = true)
@Composable
internal fun BasisDemoAppLightPreview() {
    BasisTheme(useDarkTheme = false) {
        BasisDemoApp()
    }
}

@Preview(name = "Dark Mode - Neutral", showBackground = true)
@Composable
internal fun BasisDemoAppDarkPreview() {
    BasisTheme(useDarkTheme = true) {
        BasisDemoApp()
    }
}
