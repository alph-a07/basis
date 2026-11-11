import java.util.Properties

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.compose.compiler)
    id("detekt-conventions")
    id("ktlint-conventions")
}

val basisVersion: String =
    run {
        val props = Properties()
        rootProject.file("gradle/version.properties").inputStream().use { props.load(it) }
        props.getProperty("basis.version") ?: "0.1.0"
    }

android {
    namespace = "io.github.alph_a07.basis.baselineprofile"
    group = "io.github.alph_a07"

    version = basisVersion

    compileSdk {
        version = release(37)
    }

    defaultConfig {
        minSdk = 24
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        testInstrumentationRunnerArguments["androidx.benchmark.suppressErrors"] =
            "EMULATOR,LOW-BATTERY,DEBUGGABLE,NOT-PROFILEABLE"
    }

    buildFeatures {
        compose = true
    }

    testOptions {
        unitTests.isReturnDefaultValues = true
    }
}

dependencies {
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.foundation)
    implementation(libs.compose.runtime)
    implementation(libs.compose.ui)
    implementation(project(":basis-components"))
    implementation(project(":basis-theme"))

    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.benchmark.macro.junit4)
}

tasks.register("syncBaselineProfile") {
    group = "verification"
    description = "Copies generated baseline profiles into basis-components/src/main/baseline-prof.txt."
    doLast {
        val candidates =
            fileTree(layout.buildDirectory.asFile.get()) {
                include("outputs/**/basis-components-baseline-prof.txt")
                include("outputs/**/baseline-prof.txt")
            }.files

        val source = candidates.firstOrNull()
        if (source != null && source.exists()) {
            val destination = rootProject.file("basis-components/src/main/baseline-prof.txt")
            destination.parentFile.mkdirs()
            source.copyTo(destination, overwrite = true)
            logger.lifecycle("✅ Synced baseline profile to ${destination.absolutePath}")
        } else {
            logger.lifecycle("ℹ️ No generated baseline profile output found to sync.")
        }
    }
}
