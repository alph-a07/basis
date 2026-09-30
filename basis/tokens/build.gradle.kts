plugins {
    alias(libs.plugins.android.library)
    id("detekt-conventions")
    id("ktlint-conventions")
}

android {
    namespace = "io.github.alph_a07.basis.tokens"
    compileSdk {
        version = release(37)
    }

    defaultConfig {
        minSdk = 24

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
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
