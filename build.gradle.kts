import io.gitlab.arturbosch.detekt.Detekt
import io.gitlab.arturbosch.detekt.extensions.DetektExtension

// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.android.library) apply false
    alias(libs.plugins.android.lint) apply false
    alias(libs.plugins.kotlin.jvm) apply false
    alias(libs.plugins.detekt)
    alias(libs.plugins.ktlint) apply false
    alias(libs.plugins.ksp) apply false
    alias(libs.plugins.vanniktech.maven.publish)
    id("verify-all-conventions")
}

@Suppress("basis.VersionCatalogUsage")
dependencies {
    detektPlugins("io.github.alph-a07:basis-detekt-rules:0.1.0")
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

    coordinates("io.github.alph-a07", "basis", "0.1.0")

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
