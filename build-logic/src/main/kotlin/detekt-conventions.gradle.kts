import com.android.build.api.dsl.ApplicationExtension
import com.android.build.api.dsl.CompileOptions
import com.android.build.api.dsl.LibraryExtension
import io.gitlab.arturbosch.detekt.Detekt
import io.gitlab.arturbosch.detekt.extensions.DetektExtension

plugins {
    id("io.gitlab.arturbosch.detekt")
}

val projectJvmRelease = JavaVersion.VERSION_21

fun javaReleaseOf(value: Any): String? = when (value) {
    is JavaVersion ->
        if (value == JavaVersion.VERSION_1_8) "1.8" else value.toString().removePrefix("VERSION_")

    is String -> value.takeIf { it.isNotBlank() }
    else -> null
}

fun applyJvmRelease(compileOptions: CompileOptions) {
    compileOptions.sourceCompatibility = projectJvmRelease
    compileOptions.targetCompatibility = projectJvmRelease
}

val defaultJvmTarget = javaReleaseOf(projectJvmRelease)!!

extensions.configure<DetektExtension> {
    config.setFrom(rootProject.file("config/detekt/detekt.yml"))
    buildUponDefaultConfig = true
    // detekt's built-in default omits `androidTest`, leaving instrumentation sources unanalysed.
    source.setFrom(
        files(
            "src/main/java",
            "src/main/kotlin",
            "src/test/java",
            "src/test/kotlin",
            "src/androidTest/java",
            "src/androidTest/kotlin",
        ),
    )
}

val detektTasks = tasks.withType<Detekt>()

var moduleJvmTarget: Provider<String> = provider { defaultJvmTarget }

// Define the exact attribute Gradle is complaining about in the error log
val artifactTypeAttr = Attribute.of("artifactType", String::class.java)

fun wireAndroidClasspath(configName: String) {
    detektTasks.configureEach {
        jvmTarget = moduleJvmTarget.get()
        val config = configurations.findByName(configName)
        if (config != null) {
            // Explicitly extract ONLY the classes jar to prevent AGP ambiguity in app modules
            val classFiles = config.incoming.artifactView {
                attributes {
                    attribute(artifactTypeAttr, "android-classes-jar")
                }
            }.files
            classpath.setFrom(classFiles)
        }

        reports {
            html.required.set(true)
            xml.required.set(true)
            txt.required.set(false)
            sarif.required.set(false)
        }
    }
}

fun wireJvmClasspath(configName: String) {
    detektTasks.configureEach {
        jvmTarget = moduleJvmTarget.get()
        val config = configurations.findByName(configName)
        if (config != null) {
            classpath.setFrom(config)
        }

        reports {
            html.required.set(true)
            xml.required.set(true)
            txt.required.set(false)
            sarif.required.set(false)
        }
    }
}

fun resolveJvmTargetFrom(androidCompileOptions: CompileOptions) {
    moduleJvmTarget = provider {
        javaReleaseOf(androidCompileOptions.targetCompatibility) ?: defaultJvmTarget
    }
}

pluginManager.withPlugin("com.android.application") {
    val compileOptions = extensions.getByType<ApplicationExtension>().compileOptions
    applyJvmRelease(compileOptions)
    resolveJvmTargetFrom(compileOptions)
    wireAndroidClasspath("debugCompileClasspath")
}

pluginManager.withPlugin("com.android.library") {
    val compileOptions = extensions.getByType<LibraryExtension>().compileOptions
    applyJvmRelease(compileOptions)
    resolveJvmTargetFrom(compileOptions)
    wireAndroidClasspath("debugCompileClasspath")
}

pluginManager.withPlugin("org.jetbrains.kotlin.jvm") {
    wireJvmClasspath("compileClasspath")
}
