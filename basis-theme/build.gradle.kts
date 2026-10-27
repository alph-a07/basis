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

    sourceSets {
        jvmTest.dependencies {
            implementation(kotlin("test"))
            implementation(libs.junit)
        }
    }
}

dependencies {
    add("kspCommonMainMetadata", "io.github.alph-a07:basis-theme-ksp")
    add("kspJvm", "io.github.alph-a07:basis-theme-ksp")
}

afterEvaluate {
    val kspMetadataDir = layout.buildDirectory.dir("generated/ksp/metadata/commonMain/kotlin")
    val kspJvmDir = layout.buildDirectory.dir("generated/ksp/jvm/jvmMain/kotlin")
    val commonMain = kotlin.sourceSets.getByName("commonMain")
    commonMain.kotlin.srcDir(kspMetadataDir)
    commonMain.kotlin.srcDir(kspJvmDir)
    val jvmMain = kotlin.sourceSets.getByName("jvmMain")
    val filtered = jvmMain.kotlin.srcDirs.filter { !it.path.contains("generated/ksp") }
    jvmMain.kotlin.setSrcDirs(filtered)
}

tasks.matching { it.name.startsWith("ksp") && it.name != "kspCommonMainKotlinMetadata" }.configureEach {
    if (tasks.findByName("kspCommonMainKotlinMetadata") != null) {
        dependsOn("kspCommonMainKotlinMetadata")
    }
}

tasks.named("compileKotlinJvm") {
    dependsOn("kspKotlinJvm")
}

tasks.matching {
    it.name.startsWith("runKtlintCheckOver") ||
        it.name.startsWith("runKtlintFormatOver") ||
        it.name.startsWith("detekt")
}.configureEach {
    dependsOn("kspKotlinJvm")
}

tasks.register("test") {
    group = "verification"
    description = "Runs the jvm tests."
    dependsOn("jvmTest")
}
