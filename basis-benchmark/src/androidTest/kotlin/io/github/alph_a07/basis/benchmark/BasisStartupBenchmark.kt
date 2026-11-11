package io.github.alph_a07.basis.benchmark

import androidx.benchmark.macro.ExperimentalMacrobenchmarkApi
import androidx.benchmark.macro.FrameTimingMetric
import androidx.benchmark.macro.StartupMode
import androidx.benchmark.macro.StartupTimingMetric
import androidx.benchmark.macro.junit4.MacrobenchmarkRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@OptIn(ExperimentalMacrobenchmarkApi::class)
@RunWith(AndroidJUnit4::class)
class BasisStartupBenchmark {

    @get:Rule
    val benchmarkRule = MacrobenchmarkRule()

    /**
     * Measures the cold-start frame timing of the Basis demo application.
     *
     * This covers the "first composition" scenario from `G10`: launching the app from a cold
     * process and recording frame timing until the first frame is drawn. The demo application
     * renders the Basis component catalog, so this measures end-to-end composition of real
     * Basis components under the Basis theme.
     *
     * Run this on a physical reference device (never an emulator) via
     * `:basis-benchmark:connectedDebugAndroidTest` in a release-like build with the baseline
     * profile applied. Record P50/P95/P99 `frameDurationCpuMs` and compare against the 16.6 ms
     * (60 Hz) frame budget.
     */
    @Test
    fun demoAppColdStartup_frameTiming() = benchmarkRule.measureRepeated(
        packageName = "io.github.alph_a07.basis.demo",
        metrics = listOf(StartupTimingMetric(), FrameTimingMetric()),
        iterations = 5,
        startupMode = StartupMode.COLD,
        setupBlock = {
            pressHome()
        },
    ) {
        startActivityAndWait()
    }
}
