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
        versionName = "0.1.0"
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
    implementation(platform(libs.compose.bom))
    // Note: build-logic holds common Gradle config (detekt/ktlint conventions); basis-lint holds lint rules
}
