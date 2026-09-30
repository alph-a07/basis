plugins {
    alias(libs.plugins.kotlin.jvm)
    id("detekt-conventions")
    id("ktlint-conventions")
}

kotlin {
    jvmToolchain(21)
}

dependencies {
    testImplementation(libs.junit)
}
