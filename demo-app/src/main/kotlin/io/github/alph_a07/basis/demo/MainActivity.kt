package io.github.alph_a07.basis.demo

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.text.BasicText
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.ComposeView
import io.github.alph_a07.basis.components.theme.BasisTheme

/**
 * Main entrance activity for the Basis demo application.
 */
public class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val composeView =
            ComposeView(this).apply {
                setContent {
                    BasisTheme {
                        Box(
                            modifier = Modifier.fillMaxSize(),
                            contentAlignment = Alignment.Center,
                        ) {
                            BasicText(
                                text = "Basis Demo",
                                style = BasisTheme.typography.structure.level2,
                            )
                        }
                    }
                }
            }

        setContentView(composeView)
    }
}
