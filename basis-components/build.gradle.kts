plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.compose.compiler)
    id("detekt-conventions")
    id("ktlint-conventions")
    alias(libs.plugins.binary.compatibility.validator)
    alias(libs.plugins.android.bcv.bridge)
}

android {
    namespace = "io.github.alph_a07.basis.components"
    group = "io.github.alph_a07"

    version = "0.1.0"

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

    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.core.ktx)
    implementation(libs.material)
    lintChecks(project(":basis-lint"))
    implementation(project(":basis-theme"))
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(libs.androidx.junit)
}
