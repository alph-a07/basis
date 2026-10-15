plugins {
    id("org.jetbrains.kotlin.jvm")
    alias(libs.plugins.detekt)
    alias(libs.plugins.ktlint)
}

group = "io.github.alph-a07"

kotlin {
    jvmToolchain(21)
}

dependencies {
    implementation(libs.ksp.api)
    testImplementation(kotlin("test"))
    testImplementation(libs.junit)
}

detekt {
    config.setFrom(rootProject.file("../config/detekt/detekt.yml"))
    buildUponDefaultConfig = true
}

ktlint {
    version.set(libs.versions.ktlint.get())
}
