plugins {
    alias(libs.plugins.android.library)
    id("detekt-conventions")
    id("ktlint-conventions")
    alias(libs.plugins.binary.compatibility.validator)
    alias(libs.plugins.android.bcv.bridge)
}

android {
    namespace = "io.github.alph_a07.basis"
    group = "io.github.alph_a07"

    version = "0.1.0"

    compileSdk {
        version = release(37)
    }

    defaultConfig {
        minSdk = 24

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
}

kotlin {
    explicitApi()
}

androidBcvBridge {
    variant.set("release")
}

dependencies {
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.core.ktx)
    implementation(libs.material)
    lintChecks(project(":basis-lint"))
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(libs.androidx.junit)
}
