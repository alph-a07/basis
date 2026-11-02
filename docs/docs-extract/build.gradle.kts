plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.serialization)
    id("detekt-conventions")
    id("ktlint-conventions")
}

kotlin {
    explicitApi()
}

dependencies {
    implementation(project(":basis-theme"))
    implementation(libs.kotlinx.serialization.json)

    testImplementation(kotlin("test"))
}

val generateIntentJsonTask =
    tasks.register<JavaExec>("generateIntentJson") {
        group = "documentation"
        description = "Generates intent.json from basis-theme Kotlin sources and KDoc."
        classpath = sourceSets["main"].runtimeClasspath
        mainClass.set("io.github.alph_a07.basis.docs.extract.GenerateIntentJsonKt")
        args(
            rootProject.file("basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/intent").absolutePath,
            rootProject.file("build/docs-model/intent.json").absolutePath,
            rootProject.file("docs/docs-model/fixtures/intent.fixture.json").absolutePath,
        )
    }

val generatePatchVocabularyTask =
    tasks.register<JavaExec>("generatePatchVocabulary") {
        group = "documentation"
        description = "Generates patch-vocabulary.json from UniversalStylePatch, ComponentExtraPatch and token ladders."
        classpath = sourceSets["main"].runtimeClasspath
        mainClass.set("io.github.alph_a07.basis.docs.extract.GeneratePatchVocabularyKt")
        args(
            rootProject.file(
                "basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/intent/controls/overrides",
            ).absolutePath,
            rootProject.file("build/docs-model/patch-vocabulary.json").absolutePath,
            rootProject.file("docs/docs-model/fixtures/patch-vocabulary.fixture.json").absolutePath,
        )
    }

val generateComponentsJsonTask =
    tasks.register<JavaExec>("generateComponentsJson") {
        group = "documentation"
        description = "Generates components.json from basis-components Kotlin sources, KDoc, and annotations."
        classpath = sourceSets["main"].runtimeClasspath
        mainClass.set("io.github.alph_a07.basis.docs.extract.GenerateComponentsJsonKt")
        args(
            rootProject.file(
                "basis-components/src/main/kotlin/io/github/alph_a07/basis/components/foundation/modifier",
            ).absolutePath,
            rootProject.file("build/docs-model/components.json").absolutePath,
            rootProject.file("docs/docs-model/fixtures/components.fixture.json").absolutePath,
        )
    }
