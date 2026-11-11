import org.gradle.api.tasks.Exec

/*
 * Test aggregates are intentionally separate from `verifyAll`: this plugin owns
 * test selection while the verification plugin owns quality-gate reporting.
 */

val unitTests =
    tasks.register("unitTests") {
        group = "verification"
        description = "Runs all JVM, JS, and Android unit tests across every module."
    }

val integrationTests =
    tasks.register("integrationTests") {
        group = "verification"
        description = "Runs connected Android and integration test tasks across every module."
    }

val docsTests =
    tasks.register("docsTests") {
        group = "verification"
        description = "Runs documentation model and documentation site test suites."
    }

val allTests =
    tasks.register("allTests") {
        group = "verification"
        description = "Runs all unit, integration, and documentation tests."
        dependsOn(unitTests, integrationTests, docsTests)
    }

val tests =
    tasks.register("tests") {
        group = "verification"
        description = "Compatibility alias for allTests."
        dependsOn(allTests)
    }

gradle.projectsEvaluated {
    val docsModelTests =
        tasks.register<Exec>("docsModelTests") {
            group = "verification"
            description = "Runs documentation model validation tests."
            workingDir(rootProject.file("docs/docs-model"))
            commandLine("npm", "test")
        }
    val docsSiteTests =
        tasks.register<Exec>("docsSiteTests") {
            group = "verification"
            description = "Runs documentation site checks and tests."
            workingDir(rootProject.file("docs/docs-site"))
            commandLine("npm", "test")
        }
    docsTests.configure {
        dependsOn(docsModelTests, docsSiteTests)
    }

    allprojects.forEach { module ->
        if (module == project) return@forEach
        val moduleTaskPrefix =
            module.path
                .removePrefix(":")
                .replace(":", "-")
                .split("-")
                .joinToString("") { it.replaceFirstChar(Char::uppercaseChar) }
        val moduleUnitTests = moduleTaskPrefix + "UnitTests"
        val moduleIntegrationTests = moduleTaskPrefix + "IntegrationTests"
        val moduleAllTests = moduleTaskPrefix + "Tests"
        val availableUnitTasks = module.tasks.names.filter { it == "test" || it.endsWith("UnitTest") }
        val availableIntegrationTasks =
            module.tasks.names.filter {
                it == "connectedDebugAndroidTest" ||
                    it.startsWith("integrationTest") ||
                    it.endsWith("AndroidTest")
            }
        if (availableUnitTasks.isNotEmpty()) {
            tasks.register(moduleUnitTests) {
                group = "verification"
                description = "Runs unit tests for ${module.path}."
                dependsOn(availableUnitTasks.map { module.tasks.named(it) })
            }
            unitTests.configure {
                dependsOn(tasks.named(moduleUnitTests))
            }
        }
        if (availableIntegrationTasks.isNotEmpty()) {
            tasks.register(moduleIntegrationTests) {
                group = "verification"
                description = "Runs integration tests for ${module.path}."
                dependsOn(availableIntegrationTasks.map { module.tasks.named(it) })
            }
            integrationTests.configure {
                dependsOn(tasks.named(moduleIntegrationTests))
            }
        }
        if (availableUnitTasks.isNotEmpty() || availableIntegrationTasks.isNotEmpty()) {
            tasks.register(moduleAllTests) {
                group = "verification"
                description = "Runs all tests for ${module.path}."
                if (availableUnitTasks.isNotEmpty()) dependsOn(tasks.named(moduleUnitTests))
                if (availableIntegrationTasks.isNotEmpty()) dependsOn(tasks.named(moduleIntegrationTests))
            }
        }

        val testTask = module.tasks.findByName("test")
        val androidTestTask = module.tasks.findByName("connectedDebugAndroidTest")
        if (testTask != null && androidTestTask != null) {
            androidTestTask.mustRunAfter(testTask)
        }
    }

    val buildLogic = gradle.includedBuild("build-logic")
    unitTests.configure {
        dependsOn(buildLogic.task(":basis-theme-ksp:test"))
    }
}
