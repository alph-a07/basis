plugins {
    `kotlin-dsl`
    alias(libs.plugins.detekt)
    alias(libs.plugins.ktlint)
}

dependencies {
    compileOnly(libs.detekt.gradle.plugin)
    compileOnly(libs.ktlint.gradle)
    compileOnly(libs.android.gradle.plugin)
}

detekt {
    config.setFrom(file("../config/detekt/detekt.yml"))
    buildUponDefaultConfig = true
}

ktlint {
    version.set(libs.versions.ktlint.get())
}

// Workaround to exclude generated code from ktlint checks
afterEvaluate {
    tasks.withType<org.jlleitschuh.gradle.ktlint.tasks.BaseKtLintCheckTask>().configureEach {
        setSource(
            files("src/main/kotlin", "src/test/kotlin").asFileTree.matching {
                include("**/*.kt", "**/*.kts")
            },
        )
    }
}
