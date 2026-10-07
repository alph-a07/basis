plugins {
    alias(libs.plugins.kotlin.jvm)
    id("detekt-conventions")
    id("ktlint-conventions")
}

kotlin {
    explicitApi()
    jvmToolchain(21)
}

dependencies {
    testImplementation(libs.junit)
}
