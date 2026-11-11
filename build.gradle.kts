import io.gitlab.arturbosch.detekt.Detekt
import io.gitlab.arturbosch.detekt.extensions.DetektExtension
import java.util.Properties

// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.android.library) apply false
    alias(libs.plugins.android.lint) apply false
    alias(libs.plugins.kotlin.jvm) apply false
    alias(libs.plugins.kotlin.multiplatform) apply false
    alias(libs.plugins.kotlin.serialization) apply false
    alias(libs.plugins.detekt)
    alias(libs.plugins.ktlint) apply false
    alias(libs.plugins.ksp) apply false
    alias(libs.plugins.vanniktech.maven.publish)
    id("verify-all-conventions")
    id("test-conventions")
}

val basisVersion: String =
    run {
        val props = Properties()
        file("gradle/version.properties").inputStream().use { props.load(it) }
        props.getProperty("basis.version") ?: "0.1.0"
    }

@Suppress("basis.VersionCatalogUsage")
dependencies {
    detektPlugins("io.github.alph-a07:basis-detekt-rules:$basisVersion")
}

extensions.configure<DetektExtension> {
    config.setFrom(file("config/detekt/detekt.yml"))
    buildUponDefaultConfig = true

    source.setFrom(files("settings.gradle.kts", "build.gradle.kts"))
}

tasks.withType<Detekt>().configureEach {
    include("**/*.kts")

    reports {
        html.required.set(true)
        xml.required.set(true)
        txt.required.set(false)
        sarif.required.set(false)
    }
}

mavenPublishing {
    publishToMavenCentral()
    signAllPublications()

    coordinates("io.github.alph-a07", "basis", project(":basis-components").version.toString())

    pom {
        name.set("Basis")
        description.set("A stable, simple, configurable design system for Jetpack Compose.")
        url.set("https://github.com/alph-a07/basis")

        licenses {
            license {
                name.set("The Apache License, Version 2.0")
                url.set("https://www.apache.org/licenses/LICENSE-2.0.txt")
            }
        }

        developers {
            developer {
                id.set("alph-a07")
                name.set("Jeel Patel")
                url.set("https://github.com/alph-a07")
            }
        }

        scm {
            url.set("https://github.com/alph-a07/basis")
            connection.set("scm:git:git://github.com/alph-a07/basis.git")
            developerConnection.set("scm:git:ssh://git@github.com/alph-a07/basis.git")
        }
    }
}

tasks.register("installGitHooks") {
    group = "git hooks"
    description = "Points git at the versioned .githooks directory and makes the scripts executable."

    val hookFiles = fileTree(".githooks").files
    val rootDir = layout.projectDirectory.asFile

    doLast {
        val exitCode = ProcessBuilder("git", "config", "core.hooksPath", ".githooks")
            .directory(rootDir)
            .inheritIO()
            .start()
            .waitFor()
        check(exitCode == 0) { "git config core.hooksPath failed (exit code $exitCode)" }

        hookFiles.forEach { it.setExecutable(true) }

        println("✅ Git hooks installed — commit-msg, pre-commit and pre-push are now active.")
    }
}

tasks.register("generateIntentJson") {
    group = "documentation"
    description = "Delegates to :docs:docs-extract:generateIntentJson."
    dependsOn(":docs:docs-extract:generateIntentJson")
}

tasks.register("generatePatchVocabulary") {
    group = "documentation"
    description = "Delegates to :docs:docs-extract:generatePatchVocabulary."
    dependsOn(":docs:docs-extract:generatePatchVocabulary")
}

tasks.register("syncBaselineProfile") {
    group = "verification"
    description = "Delegates to :basis-baseline-profile:syncBaselineProfile."
    dependsOn(":basis-baseline-profile:syncBaselineProfile")
}

tasks.register<Exec>("generateCiReport") {
    group = "verification"
    description = "Generates GitHub Actions visual summary, performance, coverage, and Public API matrix report."
    workingDir = rootDir
    commandLine = listOf("python3", "scripts/generate_ci_report.py")
}
