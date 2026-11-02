package io.github.alph_a07.basis.demo

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.ui.platform.ComposeView

/**
 * Main entrance activity for the Basis foundation demo application.
 */
public class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val composeView =
            ComposeView(this).apply {
                setContent {
                    BasisDemoApp()
                }
            }

        setContentView(composeView)
    }
}
