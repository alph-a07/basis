plugins {
    alias(libs.plugins.kotlin.jvm)
    id("detekt-conventions")
    id("ktlint-conventions")
}

version = project(":basis-components").version.toString()

val lintApi: Configuration by configurations.creating

configurations {
    compileOnly { extendsFrom(lintApi) }
    testImplementation { extendsFrom(lintApi) }
}

dependencies {
    lintApi(libs.androidx.lint.api)

    testImplementation(libs.androidx.lint.tests)
    testImplementation(libs.junit)
}
