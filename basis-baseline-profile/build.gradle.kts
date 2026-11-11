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

abstract class SyncBaselineProfileTask : DefaultTask() {
    @get:Internal
    abstract val buildDirectory: DirectoryProperty

    @get:Internal
    abstract val outputFile: RegularFileProperty

    @TaskAction
    fun sync() {
        val buildDir = buildDirectory.asFile.orNull
        val candidates =
            if (buildDir != null && buildDir.exists()) {
                buildDir.walkTopDown()
                    .filter {
                        it.isFile &&
                            (it.name == "basis-components-baseline-prof.txt" || it.name == "baseline-prof.txt")
                    }
                    .toList()
            } else {
                emptyList()
            }

        val source = candidates.firstOrNull()
        if (source != null && source.exists()) {
            val destination = outputFile.asFile.get()
            destination.parentFile.mkdirs()
            source.copyTo(destination, overwrite = true)
            logger.lifecycle("✅ Synced baseline profile to ${destination.absolutePath}")
        } else {
            logger.lifecycle("ℹ️ No generated baseline profile output found to sync.")
        }
    }
}

tasks.register<SyncBaselineProfileTask>("syncBaselineProfile") {
    group = "verification"
    description = "Copies generated baseline profiles into basis-components/src/main/baseline-prof.txt."
    buildDirectory.set(layout.buildDirectory)
    outputFile.set(rootProject.layout.projectDirectory.file("basis-components/src/main/baseline-prof.txt"))
}
