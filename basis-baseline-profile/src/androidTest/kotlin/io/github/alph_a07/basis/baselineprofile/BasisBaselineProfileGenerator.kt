package io.github.alph_a07.basis.baselineprofile

import androidx.benchmark.macro.ExperimentalMacrobenchmarkApi
import androidx.benchmark.macro.junit4.BaselineProfileRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import io.github.alph_a07.basis.components.theme.BasisTheme
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@OptIn(ExperimentalMacrobenchmarkApi::class)
@RunWith(AndroidJUnit4::class)
class BasisBaselineProfileGenerator {

    @get:Rule
    val baselineProfileRule = BaselineProfileRule()

    /**
     * Generates a baseline profile covering the Basis component interactions exercised by the
     * demo application.
     *
     * Launching the demo app composes the Basis component catalog under [BasisTheme], so this
     * records the code paths for real component first-composition. Run against a physical
     * reference device (never an emulator) with the demo app installed, via
     * `:basis-baseline-profile:connectedDebugAndroidTest`.
     *
     * The generated profile is written to `build/outputs/bgp/baseline-prof.txt`. Commit the
     * produced profile to `basis-components/src/main/baseline-prof.txt` so AGP bundles it into
     * the library AAR and R8 can optimize the shipped components.
     */
    @Test
    fun generateComponentBaselineProfile() = baselineProfileRule.collect(
        packageName = "io.github.alph_a07.basis.demo",
        outputFilePrefix = "basis-components",
        profileBlock = {
            pressHome()

            startActivityAndWait()
        },
    )
}
