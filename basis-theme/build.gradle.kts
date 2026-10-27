plugins {
    alias(libs.plugins.kotlin.multiplatform)
    alias(libs.plugins.ksp)
    id("detekt-conventions")
    id("ktlint-conventions")
}

kotlin {
    explicitApi()
    jvmToolchain(21)
    jvm()
    js {
        nodejs()
    }

    sourceSets {
        commonTest.dependencies {
            implementation(kotlin("test"))
        }
        jvmTest.dependencies {
            implementation(kotlin("test"))
            implementation(libs.junit)
        }
        jsTest.dependencies {
            implementation(kotlin("test"))
        }
    }
}

dependencies {
    add("kspCommonMainMetadata", "io.github.alph-a07:basis-theme-ksp")
}

afterEvaluate {
    val kspMetadataDir = layout.buildDirectory.dir("generated/ksp/metadata/commonMain/kotlin")
    val commonMain = kotlin.sourceSets.getByName("commonMain")
    commonMain.kotlin.srcDir(kspMetadataDir)
}

tasks.matching { it.name.startsWith("ksp") && it.name != "kspCommonMainKotlinMetadata" }.configureEach {
    dependsOn("kspCommonMainKotlinMetadata")
}

tasks.named("compileKotlinJvm") {
    dependsOn("kspCommonMainKotlinMetadata")
}

tasks.named("compileKotlinJs") {
    dependsOn("kspCommonMainKotlinMetadata")
}

tasks.matching {
    it.name.startsWith("runKtlintCheckOver") ||
        it.name.startsWith("runKtlintFormatOver") ||
        it.name.startsWith("detekt")
}.configureEach {
    dependsOn("kspCommonMainKotlinMetadata")
}

tasks.register("test") {
    group = "verification"
    description = "Runs the multiplatform tests."
    dependsOn("jvmTest", "jsTest")
}
