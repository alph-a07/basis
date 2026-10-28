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
        commonMain {
            kotlin.srcDir(layout.buildDirectory.dir("generated/ksp/metadata/commonMain/kotlin"))
        }
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

tasks.matching {
    it.name.startsWith("compileKotlin") ||
        it.name.startsWith("runKtlint") ||
        it.name.startsWith("detekt") ||
        (it.name.startsWith("ksp") && it.name != "kspCommonMainKotlinMetadata")
}.configureEach {
    dependsOn("kspCommonMainKotlinMetadata")
}

tasks.register("test") {
    group = "verification"
    description = "Runs the multiplatform tests."
    dependsOn("jvmTest", "jsTest")
}

tasks.register<Test>("updateGolden") {
    group = "verification"
    description = "Generates expected parity outputs from the JVM reference into ParityGoldens.kt."
    dependsOn("compileTestKotlinJvm")
    val jvmTestTask = tasks.named<Test>("jvmTest").get()
    classpath = jvmTestTask.classpath
    testClassesDirs = jvmTestTask.testClassesDirs
    filter {
        includeTestsMatching("*ParityGoldenGeneratorTest*")
    }
    systemProperty("basis.parity.update", "true")
    systemProperty("basis.parity.dir", projectDir.resolve("src/commonTest/kotlin").absolutePath)
}
