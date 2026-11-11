import java.util.Properties

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.compose.compiler)
    id("detekt-conventions")
    id("ktlint-conventions")
    alias(libs.plugins.binary.compatibility.validator)
    alias(libs.plugins.android.bcv.bridge)
}

val basisVersion: String =
    run {
        val props = Properties()
        rootProject.file("gradle/version.properties").inputStream().use { props.load(it) }
        props.getProperty("basis.version") ?: "0.1.0"
    }

android {
    namespace = "io.github.alph_a07.basis.components"
    group = "io.github.alph_a07"

    version = basisVersion

    compileSdk {
        version = release(37)
    }

    defaultConfig {
        minSdk = 24

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }

    testOptions {
        unitTests.isReturnDefaultValues = true
    }
}

kotlin {
    explicitApi()
}

androidBcvBridge {
    variant.set("release")
}

dependencies {

    implementation(platform(libs.compose.bom))
    implementation(libs.compose.foundation)
    implementation(libs.compose.runtime)
    implementation(libs.compose.ui)
    implementation(libs.compose.ui.text.google.fonts)
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.core.ktx)
    implementation(libs.material)

    lintChecks(project(":basis-lint"))
    implementation(project(":basis-theme"))

    testImplementation(libs.kotlin.test)
    testImplementation(libs.junit)

    androidTestImplementation(libs.kotlin.test)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(platform(libs.compose.bom))
    androidTestImplementation(libs.compose.ui.test.junit4)
    debugImplementation(libs.compose.ui.test.manifest)
}

val syncComponentScreenshotsTask =
    tasks.register<Exec>("syncComponentScreenshots") {
        group = "documentation"
        description =
            "Pulls rendered component screenshots and anatomy metadata from the connected device into docs assets."
        val androidComponents =
            project.extensions.getByType(
                com.android.build.api.variant.LibraryAndroidComponentsExtension::class.java,
            )
        val adbProvider = androidComponents.sdkComponents.adb
        val targetDir = rootProject.file("docs/docs-site/public/assets/components/indication")

        doFirst {
            targetDir.mkdirs()
            executable = adbProvider.get().asFile.absolutePath
            args("pull", "/sdcard/Download/screenshots/indication/.", targetDir.absolutePath)
        }
    }
