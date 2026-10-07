/*
 * `verifyAll` runs every check CI runs, across every module and the `build-logic` included build.
 * `fixAll` runs all available auto-correct tasks (ktlintFormat, lintFix) across the project.
 */

import java.util.concurrent.CopyOnWriteArrayList
import org.gradle.tooling.events.FinishEvent
import org.gradle.tooling.events.OperationCompletionListener
import org.gradle.tooling.events.task.TaskFailureResult
import org.gradle.tooling.events.task.TaskFinishEvent
import org.gradle.tooling.events.task.TaskSkippedResult
import org.gradle.tooling.events.task.TaskSuccessResult

val verifyAllChecks = listOf("assemble", "test", "lint", "detekt", "ktlintCheck", "releaseApiCheck")
val fixAllChecks = listOf("ktlintFormat", "lintFix")

val verifyAll = tasks.register("verifyAll") {
    group = "verification"
    description = "Runs assemble, test, lint, detekt, ktlint and releaseApiCheck across every build."
}

val fixAll = tasks.register("fixAll") {
    group = "formatting"
    description = "Attempts to auto-fix formatting and linting issues (ktlintFormat, lintFix)."
}

interface ReporterParams : BuildServiceParameters {
    val rootDirPath: Property<String>
}

abstract class VerificationReporter : BuildService<ReporterParams>, OperationCompletionListener, AutoCloseable {
    private val errors = CopyOnWriteArrayList<String>()
    private val successes = CopyOnWriteArrayList<String>()
    private val cached = CopyOnWriteArrayList<String>()
    private val skipped = CopyOnWriteArrayList<String>()
    private val primaryChecks = setOf("test", "lint", "detekt", "ktlintCheck", "releaseApiCheck")

    override fun onFinish(event: FinishEvent) {
        if (event is TaskFinishEvent) {
            val path = event.descriptor.taskPath
            when (val result = event.result) {
                is TaskFailureResult -> errors.add(path)
                is TaskSkippedResult -> skipped.add(path)
                is TaskSuccessResult -> {
                    if (result.isUpToDate || result.isFromCache) cached.add(path) else successes.add(path)
                }
            }
        }
    }

    override fun close() {
        printExecutionSummary()
        printWarnings()
        if (errors.isNotEmpty()) {
            printFailures()
        } else {
            println(" 🎉 ALL PIPELINE TASKS PASSED! ")
            println("━".repeat(80) + "\n")
        }
    }

    private fun printExecutionSummary() {
        println("\n" + "━".repeat(80))
        println(" 📊 PIPELINE EXECUTION SUMMARY ")
        println("━".repeat(80))
        println(" ✅ SUCCESS : ${successes.size} tasks executed")
        println(" ♻️ CACHED  : ${cached.size} tasks up-to-date or from cache")
        println(" ⏭️ SKIPPED : ${skipped.size} tasks")
        println(" ❌ FAILED  : ${errors.size} tasks")
        println("━".repeat(80))
    }

    private fun printWarnings() {
        val skippedPrimary = skipped.filter { path -> primaryChecks.any { path.endsWith(":$it") } }
        if (skippedPrimary.isNotEmpty()) {
            println(" 🟡 NOTABLE WARNINGS:")
            skippedPrimary.forEach { println("    ⚠️ $it (Skipped - No source files or rules found)") }
            println("━".repeat(80))
        }
    }

    private fun printFailures() {
        println(" 🔴 DETAILED FAILURES & TRACES:")
        errors.forEach { path ->
            println("\n ❌ $path")
            val absoluteBase = resolveBasePath(path)
            val taskName = path.substringAfterLast(":")
            printTaskTrace(taskName, absoluteBase)
        }
        println("\n" + "━".repeat(80) + "\n")
    }

    private fun resolveBasePath(taskPath: String): String {
        val modulePath = taskPath.substringBeforeLast(":")
        val relativeDir = if (modulePath.isEmpty()) "" else modulePath.replace(":", "/")
        val rootDir = parameters.rootDirPath.get()
        return if (relativeDir.isEmpty()) rootDir else "$rootDir/$relativeDir"
    }

    private fun printTaskTrace(taskName: String, absoluteBase: String) {
        try {
            when {
                taskName.contains("detekt") -> printDetektTrace(absoluteBase)
                taskName.contains("ktlint") -> printKtlintTrace(absoluteBase)
                taskName.contains("test") -> {
                    println("    | ↳ There were failing tests. See the full trace at:")
                    println("    |   file://$absoluteBase/build/reports/tests/test/index.html")
                }

                taskName.contains("lint") -> {
                    println("    | ↳ Android Lint found errors. See the exact lines at:")
                    println("    |   file://$absoluteBase/build/reports/lint-results.html")
                }

                else -> println("    | ↳ Task failed. Scroll up for standard stacktrace.")
            }
        } catch (e: java.io.IOException) {
            println("    | ↳ Failed to read trace file: ${e.message}")
        } catch (e: SecurityException) {
            println("    | ↳ Permission denied reading trace file: ${e.message}")
        }
    }

    private fun printDetektTrace(absoluteBase: String) {
        val report = File("$absoluteBase/build/reports/detekt/detekt.txt")
        if (report.exists() && report.readText().isNotBlank()) {
            println(report.readLines().joinToString("\n") { "    | $it" })
        } else {
            println("    | ↳ Report generated at: file://$absoluteBase/build/reports/detekt/detekt.html")
        }
    }

    private fun printKtlintTrace(absoluteBase: String) {
        val reportsDir = File("$absoluteBase/build/reports/ktlint")
        var foundViolation = false
        if (reportsDir.exists()) {
            reportsDir.walkTopDown().filter { it.extension == "txt" }.forEach { file ->
                val content = file.readText().trim()
                if (content.isNotEmpty()) {
                    foundViolation = true
                    println("    | --- ${file.name} ---")
                    println(content.lines().joinToString("\n") { "    | $it" })
                }
            }
        }
        if (!foundViolation) {
            println("    | ↳ Could not extract text trace. Check standard output above.")
        }
    }
}

interface InjectedRegistry {
    @get:Inject
    val registry: BuildEventsListenerRegistry
}

val invokedTasks = gradle.startParameter.taskNames.map { it.substringAfterLast(':') }
val isPipelineActive = verifyAll.name in invokedTasks || fixAll.name in invokedTasks

if (isPipelineActive) {
    gradle.startParameter.isContinueOnFailure = true

    val listenerRegistry = project.objects.newInstance(InjectedRegistry::class.java).registry
    val reporter = gradle.sharedServices.registerIfAbsent("verificationReporter", VerificationReporter::class.java) {
        parameters.rootDirPath.set(project.rootDir.absolutePath)
    }
    listenerRegistry.onTaskCompletion(reporter)
}

gradle.projectsEvaluated {
    allprojects.forEach { module ->
        verifyAllChecks.filter { it in module.tasks.names }.forEach { check ->
            verifyAll.configure { dependsOn(module.tasks.named(check)) }
        }
        fixAllChecks.filter { it in module.tasks.names }.forEach { check ->
            fixAll.configure { dependsOn(module.tasks.named(check)) }
        }
    }

    val buildLogic = gradle.includedBuild("build-logic")
    verifyAll.configure { dependsOn(buildLogic.task(":detekt"), buildLogic.task(":ktlintCheck")) }
    fixAll.configure { dependsOn(buildLogic.task(":ktlintFormat")) }
}
