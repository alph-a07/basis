plugins {
    alias(libs.plugins.kotlin.multiplatform)
    alias(libs.plugins.kotlin.serialization)
    id("detekt-conventions")
    id("ktlint-conventions")
}

kotlin {
    explicitApi()

    js {
        browser {
            testTask {
                enabled = false
            }
        }
        nodejs()
        binaries.library()
        generateTypeScriptDefinitions()
    }

    sourceSets {
        commonMain.dependencies {
            implementation(project(":basis-theme"))
            implementation(libs.kotlinx.serialization.json)
        }
        commonTest.dependencies {
            implementation(kotlin("test"))
        }
    }
}

tasks.register("test") {
    group = "verification"
    description = "Runs the JS runtime tests."
    dependsOn("jsTest")
}
