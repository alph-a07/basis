plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.compose.compiler)
    id("detekt-conventions")
    id("ktlint-conventions")
}

android {
    namespace = "io.github.alph_a07.basis.demo"

    compileSdk {
        version = release(37)
    }

    defaultConfig {
        applicationId = "io.github.alph_a07.basis.demo"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = project(":basis-components").version.toString()
    }

    buildFeatures {
        compose = true
    }

    buildTypes {
        release {
            optimization {
                enable = false
            }
        }
    }
}

dependencies {
    lintChecks(project(":basis-lint"))
    implementation(project(":basis-components"))
    implementation(project(":basis-theme"))
    implementation(libs.androidx.appcompat)
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.foundation)
    implementation(libs.compose.runtime)
    implementation(libs.compose.ui)
    implementation(libs.compose.ui.tooling.preview)
    debugImplementation(libs.compose.ui.tooling)
    // Note: build-logic holds common Gradle config (detekt/ktlint conventions); basis-lint holds lint rules
}
