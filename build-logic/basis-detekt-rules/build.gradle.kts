import java.util.Properties

plugins {
    id("org.jetbrains.kotlin.jvm")
    alias(libs.plugins.detekt)
    alias(libs.plugins.ktlint)
}

val basisVersion: String =
    run {
        val props = Properties()
        rootProject.file("../gradle/version.properties").inputStream().use { props.load(it) }
        props.getProperty("basis.version") ?: "0.1.0"
    }

group = "io.github.alph-a07"
version = basisVersion

kotlin {
    jvmToolchain(21)
}

dependencies {
    compileOnly(libs.detekt.api)

    testImplementation(kotlin("test"))
    testImplementation(libs.junit)
    testImplementation(libs.detekt.test)
    testImplementation(libs.assertj.core)
}

detekt {
    config.setFrom(rootProject.file("../config/detekt/detekt.yml"))
    buildUponDefaultConfig = true
}

ktlint {
    version.set(libs.versions.ktlint.get())
}
