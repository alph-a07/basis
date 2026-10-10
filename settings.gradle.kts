@file:Suppress("basis.VersionCatalogUsage")

pluginManagement {
    includeBuild("build-logic")

    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }

    plugins {
        id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
    }
}

plugins {
    id("org.gradle.toolchains.foojay-resolver-convention")
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)

    repositories {
        google()
        mavenCentral()
    }
}

// Contains the build logic for the project and custom plugins
includeBuild("build-logic") {
    dependencySubstitution {
        substitute(module("io.github.alph-a07:basis-detekt-rules"))
            .using(project(":basis-detekt-rules"))
    }
}

rootProject.name = "Basis"
include(":demo-app")
include(":basis-theme")
include(":basis-components")
include(":basis-lint")
