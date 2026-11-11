/*
 * `verifyAll` runs every check CI runs, across every module and the `build-logic` included build.
 * `fixAll` runs all available auto-correct tasks (ktlintFormat, lintFix) across the project.
 */

import java.io.OutputStream
import java.util.concurrent.CopyOnWriteArrayList
import org.gradle.api.logging.LogLevel
import org.gradle.api.logging.Logging
import org.gradle.api.tasks.JavaExec
import org.gradle.tooling.Failure
import org.gradle.tooling.events.FinishEvent
import org.gradle.tooling.events.OperationCompletionListener
import org.gradle.tooling.events.task.TaskFailureResult
import org.gradle.tooling.events.task.TaskFinishEvent
import org.gradle.tooling.events.task.TaskSkippedResult
import org.gradle.tooling.events.task.TaskSuccessResult

val verifyAllChecks = listOf("assemble", "lint", "detekt", "ktlintCheck", "releaseApiCheck")
val fixAllChecks = listOf("ktlintFormat", "lintFix")

val verifyAll =
    tasks.register("verifyAll") {
        group = "verification"
        description = "Runs assemble, lint, detekt, ktlint and releaseApiCheck across every build."
    }

val fixAll =
    tasks.register("fixAll") {
        group = "formatting"
        description = "Attempts to auto-fix formatting and linting issues (ktlintFormat, lintFix)."
    }

val releaseApiDump =
    tasks.register("releaseApiDump") {
        group = "verification"
        description = "Dumps public API signatures to committed .api baseline files across modules."
    }

val releaseApiCheck =
    tasks.register("releaseApiCheck") {
        group = "verification"
        description = "Validates public API signatures against committed .api baseline files across modules."
        mustRunAfter(releaseApiDump)
    }

interface ReporterParams : BuildServiceParameters {
    val rootDirPath: Property<String>
}

private data class TaskFailureEntry(
    val taskPath: String,
    val failureMessages: List<String>,
)

private data class TaskSummary(
    val taskPath: String,
)

private object PipelineOutput {
    private val logger = Logging.getLogger("Basis pipeline")

    fun line(message: String = "") {
        logger.error(message)
    }
}

private object PipelineStyle {
    private const val ANSI_BOLD = "\u001B[1m"
    private const val ANSI_DIM = "\u001B[2m"
    private const val ANSI_RED = "\u001B[31m"
    private const val ANSI_GREEN = "\u001B[32m"
    private const val ANSI_YELLOW = "\u001B[33m"
    private const val ANSI_CYAN = "\u001B[36m"
    private const val ANSI_RESET = "\u001B[0m"
    private const val ANSI_WHITE_ON_RED = "\u001B[97;41m"

    fun style(message: String, code: String): String =
        if (colorsEnabled) "$code$message$ANSI_RESET" else message

    fun location(location: String, absoluteBase: String): String {
        val match = Regex("(.+):(\\d+)(?::(\\d+))?$").matchEntire(location) ?: return location
        val sourcePath = match.groupValues[1]
        val line = match.groupValues[2]
        val column = match.groupValues.getOrNull(3).orEmpty()
        val file = if (File(sourcePath).isAbsolute) File(sourcePath) else File(absoluteBase, sourcePath)
        val suffix = ":$line${column.takeIf { it.isNotEmpty() }?.let { ":$it" } ?: ""}"
        val visible = "${file.absolutePath}$suffix"
        if (!colorsEnabled) return visible
        val target = "${file.toURI()}$suffix"
        return "\u001B]8;;$target\u001B\\${ANSI_CYAN}$visible$ANSI_RESET\u001B]8;;\u001B\\"
    }

    fun diagnostic(message: String, absoluteBase: String): String {
        val locationPattern = Regex("(/[^\\s:]+|src/[^\\s:]+):(\\d+)(?::(\\d+))?")
        return locationPattern.replace(message) { match ->
            location(match.value, absoluteBase)
        }
    }

    fun section(icon: String, title: String, count: Int, code: String): String =
        "${style(icon, code)}  ${style(title, ANSI_BOLD)} ${style("($count)", ANSI_DIM)}"

    fun failureBadge(): String = style(" ✗ FAILED ", ANSI_WHITE_ON_RED)

    val boldCode: String
        get() = ANSI_BOLD

    val dimCode: String
        get() = ANSI_DIM

    val redCode: String
        get() = ANSI_RED

    val greenCode: String
        get() = ANSI_GREEN

    val yellowCode: String
        get() = ANSI_YELLOW

    val cyanCode: String
        get() = ANSI_CYAN

    private val colorsEnabled: Boolean
        get() = System.getenv("BASIS_PIPELINE_COLOR") == "1"
}

abstract class VerificationReporter : BuildService<ReporterParams>, OperationCompletionListener, AutoCloseable {
    private val errors = CopyOnWriteArrayList<TaskFailureEntry>()
    private val successes = CopyOnWriteArrayList<TaskSummary>()
    private val cached = CopyOnWriteArrayList<TaskSummary>()
    private val skipped = CopyOnWriteArrayList<TaskSummary>()
    private val notableTasks =
        setOf(
            "assemble",
            "test",
            "lint",
            "detekt",
            "ktlintCheck",
            "releaseApiCheck",
            "ktlintFormat",
            "lintFix",
            "connectedDebugAndroidTest",
            "releaseApiDump",
        )
    private val isNotableTask: (String) -> Boolean = { taskPath ->
        val taskName = taskPath.substringAfterLast(":")
        notableTasks.any { taskPath.endsWith(":$it") } ||
            taskName in notableTasks ||
            taskName.startsWith("lint") ||
            taskName.startsWith("ktlint") ||
            taskName.startsWith("test") ||
            taskName.startsWith("connected") ||
            taskName.startsWith("integrationTest") ||
            taskName.startsWith("generate") ||
            taskName.endsWith("Tests") ||
            taskName.endsWith("UnitTests") ||
            taskName.endsWith("IntegrationTests")
    }

    override fun onFinish(event: FinishEvent) {
        val taskEvent = event as? TaskFinishEvent ?: return
        val path = taskEvent.descriptor.taskPath
        val summary = TaskSummary(path)
        when (val result = taskEvent.result) {
            is TaskFailureResult -> {
                val messages = mutableListOf<String>()
                result.failures.forEach { collectFailureMessages(it, messages) }
                errors.add(TaskFailureEntry(path, messages))
            }

            is TaskSkippedResult -> {
                skipped.add(summary)
            }

            is TaskSuccessResult ->
                if (result.isUpToDate || result.isFromCache) {
                    cached.add(summary)
                } else {
                    successes.add(summary)
                }
        }
    }

    override fun close() {
        PipelineOutput.line(
            "\n${PipelineStyle.style("◆", PipelineStyle.cyanCode)} " +
                PipelineStyle.style("Basis pipeline report", PipelineStyle.boldCode),
        )
        printTaskGroup("Completed", "✓", successes)
        printTaskGroup("Cached", "↻", cached)
        printWarnings()
        if (errors.isNotEmpty()) {
            printFailures()
            PipelineOutput.line(
                "\n${PipelineStyle.style(
                    "✗  Pipeline completed with failures.",
                    PipelineStyle.redCode,
                )}",
            )
        } else {
            PipelineOutput.line(
                "\n${PipelineStyle.style(
                    "✓  Pipeline completed successfully.",
                    PipelineStyle.greenCode,
                )}",
            )
        }
    }

    private fun printTaskGroup(title: String, icon: String, tasks: List<TaskSummary>) {
        val notable = tasks.filter { isNotableTask(it.taskPath) }.sortedBy { it.taskPath }
        if (notable.isEmpty()) return
        val color = if (icon == "✓") PipelineStyle.greenCode else PipelineStyle.cyanCode
        PipelineOutput.line("\n  ${PipelineStyle.section(icon, title, notable.size, color)}")
        notable.forEach { summary ->
            val task = summary.taskPath.substringAfterLast(":")
            val module = summary.taskPath.substringBeforeLast(":").removePrefix(":").ifEmpty { "root" }
            PipelineOutput.line("     ${PipelineStyle.style(module, PipelineStyle.dimCode)}  $task")
        }
    }

    private fun printWarnings() {
        val skippedPrimary = skipped.filter { isNotableTask(it.taskPath) }
        if (skippedPrimary.isNotEmpty()) {
            PipelineOutput.line(
                "\n  ${PipelineStyle.section("!", "Skipped", skippedPrimary.size, PipelineStyle.yellowCode)}",
            )
            skippedPrimary.sortedBy { it.taskPath }.forEach {
                PipelineOutput.line(
                    "     ${PipelineStyle.style(it.taskPath, PipelineStyle.dimCode)}  " +
                        "no source, rules, or device available",
                )
            }
        }
    }

    private fun printFailures() {
        PipelineOutput.line(
            "\n  ${PipelineStyle.section("✗", "Failed", errors.size, PipelineStyle.redCode)}",
        )
        errors.sortedBy { it.taskPath }.forEach { entry ->
            PipelineOutput.line(
                "\n     ${PipelineStyle.failureBadge()} " +
                    PipelineStyle.style(entry.taskPath, PipelineStyle.boldCode),
            )
            val absoluteBase =
                VerificationTracePrinter.resolveBasePath(entry.taskPath, parameters.rootDirPath.get())
            val taskName = entry.taskPath.substringAfterLast(":")
            VerificationTracePrinter.printTaskTrace(taskName, absoluteBase, entry.failureMessages)
        }
    }

    private fun collectFailureMessages(failure: Failure, collector: MutableList<String>) {
        failure.message?.takeIf { it.isNotBlank() }?.let { collector.add(it) }
        failure.causes.forEach { collectFailureMessages(it, collector) }
    }
}

internal object VerificationTracePrinter {
    fun resolveBasePath(taskPath: String, rootDir: String): String {
        val modulePath = taskPath.substringBeforeLast(":")
        val relativeDir =
            if (modulePath.isEmpty()) {
                ""
            } else {
                modulePath.replace(":", "/")
            }

        return if (relativeDir.isEmpty()) {
            rootDir
        } else {
            "$rootDir/$relativeDir"
        }
    }

    fun printTaskTrace(
        taskName: String,
        absoluteBase: String,
        failureMessages: List<String>,
    ) {
        try {
            when {
                taskName.contains("detekt") -> printDetektTrace(absoluteBase)
                taskName.contains("ktlint") -> printKtlintTrace(taskName, absoluteBase, failureMessages)
                taskName.contains("connected") -> printConnectedTestTrace(absoluteBase, failureMessages)
                taskName.contains("test") -> printUnitTestTrace(absoluteBase, failureMessages)
                taskName.contains("lint") -> printLintTrace(absoluteBase)
                else -> printGenericTaskTrace(absoluteBase, failureMessages)
            }
        } catch (e: java.io.IOException) {
            PipelineOutput.line("    | ↳ Failed to read trace file: ${e.message}")
        } catch (e: SecurityException) {
            PipelineOutput.line("    | ↳ Permission denied reading trace file: ${e.message}")
        }
    }

    private fun printDetektTrace(absoluteBase: String) {
        val report = File("$absoluteBase/build/reports/detekt/detekt.txt")
        if (report.exists() && report.readText().isNotBlank()) {
            PipelineOutput.line(
                report.readLines().joinToString("\n") {
                    "    | ${PipelineStyle.diagnostic(it, absoluteBase)}"
                },
            )
        } else {
            PipelineOutput.line("    | ↳ Report generated at: file://$absoluteBase/build/reports/detekt/detekt.html")
        }
    }

    private fun printKtlintTrace(
        taskName: String,
        absoluteBase: String,
        failureMessages: List<String>,
    ) {
        val reportsDir = File("$absoluteBase/build/reports/ktlint")
        val report =
            File(reportsDir, taskName)
                .resolve("$taskName.txt")
                .takeIf { it.isFile }
                ?: reportsDir
                    .walkTopDown()
                    .filter { it.isFile && it.extension == "txt" }
                    .firstOrNull { it.nameWithoutExtension == taskName }
        val content = report?.readText()?.trim().orEmpty()
        if (content.isNotEmpty()) {
            PipelineOutput.line("    | --- ${report?.name ?: "$taskName.txt"} ---")
            PipelineOutput.line(
                content.lines().joinToString("\n") {
                    "    | ${PipelineStyle.diagnostic(it, absoluteBase)}"
                },
            )
        } else {
            val diagnostic = failureMessages.firstOrNull { it.isNotBlank() }
            if (diagnostic != null) {
                PipelineOutput.line("    | ↳ ${PipelineStyle.diagnostic(diagnostic, absoluteBase)}")
            } else {
                PipelineOutput.line("    | ↳ KtLint failed without a text report.")
            }
        }
    }

    private fun printConnectedTestTrace(absoluteBase: String, failureMessages: List<String>) {
        val deviceFailure = failureMessages.firstOrNull { isDeviceFailure(it) }
        if (deviceFailure != null) {
            PipelineOutput.line("    | ↳ 📱 Device Error: No connected Android device or emulator was found!")
            PipelineOutput.line("    |   $deviceFailure")
            PipelineOutput.line("    |   Please attach an Android device via USB/Wi-Fi or start an emulator.")
            return
        }

        val reportFile = File("$absoluteBase/build/reports/androidTests/connected/index.html")
        if (reportFile.exists()) {
            PipelineOutput.line("    | ↳ Instrumentation tests failed. See the report at:")
            PipelineOutput.line("    |   file://$absoluteBase/build/reports/androidTests/connected/index.html")
        } else {
            PipelineOutput.line("    | ↳ Instrumentation tests failed to execute:")
            failureMessages.forEach { PipelineOutput.line("    |   $it") }
        }
    }

    private fun isDeviceFailure(message: String): Boolean =
        message.contains("DeviceException") ||
            message.contains("No online devices found") ||
            message.contains("Connected device with serial") ||
            message.contains("not online") ||
            message.contains("device not found", ignoreCase = true)

    private fun printUnitTestTrace(absoluteBase: String, failureMessages: List<String>) {
        val testsDir = File("$absoluteBase/build/reports/tests")
        val htmlReports =
            if (testsDir.exists()) {
                testsDir.walkTopDown().filter { it.name == "index.html" }.toList()
            } else {
                emptyList()
            }
        if (htmlReports.isNotEmpty()) {
            PipelineOutput.line("    | ↳ There were failing tests. See the full trace at:")
            htmlReports.forEach { PipelineOutput.line("    |   file://${it.absolutePath}") }
        } else {
            PipelineOutput.line("    | ↳ Tests failed to execute:")
            failureMessages.forEach { PipelineOutput.line("    |   $it") }
        }
    }

    private fun printLintTrace(absoluteBase: String) {
        PipelineOutput.line("    | ↳ Android Lint found errors. See the exact lines at:")
        PipelineOutput.line("    |   file://$absoluteBase/build/reports/lint-results.html")
    }

    private fun printGenericTaskTrace(absoluteBase: String, failureMessages: List<String>) {
        val detail =
            failureMessages
                .asSequence()
                .filterNot { it.startsWith("Execution failed for task") }
                .filterNot { it.startsWith("A failure occurred while executing") }
                .filterNot { it.startsWith("Failed to") }
                .firstOrNull()
        val location = SourceLocationFinder.find(absoluteBase, failureMessages, detail)
        PipelineOutput.line(
            "    ├─ ${PipelineStyle.style("reason", PipelineStyle.dimCode)}   " +
                (detail ?: "Task execution failed"),
        )
        if (location != null) {
            PipelineOutput.line(
                "    └─ ${PipelineStyle.style("location", PipelineStyle.dimCode)} " +
                    PipelineStyle.location(location, absoluteBase),
            )
        } else {
            PipelineOutput.line("    └─ details  Run with --info or --debug for the full diagnostic trace.")
        }
    }
}

private object SourceLocationFinder {
    fun find(
        absoluteBase: String,
        failureMessages: List<String>,
        detail: String?,
    ): String? {
        val reportedLocation =
            failureMessages
                .firstOrNull { it.startsWith("Location:") }
                ?.removePrefix("Location:")
                ?.trim()
        val symbol =
            Regex("Unresolved reference ['’](.+?)['’]")
                .find(detail.orEmpty())
                ?.groupValues
                ?.getOrNull(1)
        val sourceRoot = File(absoluteBase, "src")
        return when {
            reportedLocation != null -> reportedLocation
            symbol == null || !sourceRoot.isDirectory -> null
            else -> findSourceLocation(sourceRoot, absoluteBase, symbol)
        }
    }

    private fun findSourceLocation(
        sourceRoot: File,
        absoluteBase: String,
        symbol: String,
    ): String? {
        val symbolPattern = Regex("\\b${Regex.escape(symbol)}\\b")
        var location: String? = null
        for (file in sourceRoot.walkTopDown()) {
            if (file.isFile && file.extension in setOf("kt", "kts")) {
                val lineNumber =
                    file.useLines { lines ->
                        lines.indexOfFirst { line -> symbolPattern.containsMatchIn(line) }
                    }
                if (lineNumber >= 0) {
                    location = "${file.relativeTo(File(absoluteBase)).path}:${lineNumber + 1}"
                    break
                }
            }
        }
        return location
    }
}

interface InjectedRegistry {
    @get:Inject
    val registry: BuildEventsListenerRegistry
}

val invokedTasks = gradle.startParameter.taskNames.map { it.substringAfterLast(':') }
val styledTaskNames =
    setOf(
        verifyAll.name,
        fixAll.name,
        "allTests",
        "unitTests",
        "integrationTests",
        "docsTests",
        "tests",
        "detekt",
        "ktlintCheck",
        "ktlintFormat",
        "lint",
        "lintFix",
        "connectedDebugAndroidTest",
        "generateDocsJson",
        "generateComponentsJson",
        "generateIntentJson",
        "generatePatchVocabulary",
        "check",
    )
val isPipelineActive =
    invokedTasks.any {
        it in styledTaskNames ||
            it.startsWith("lint") ||
            it.startsWith("ktlint") ||
            it.startsWith("test") ||
            it.startsWith("connected") ||
            it.startsWith("integrationTest") ||
            it.startsWith("generate") ||
            it.endsWith("Tests") ||
            it.endsWith("UnitTests") ||
            it.endsWith("IntegrationTests")
    }

if (isPipelineActive) {
    gradle.startParameter.isContinueOnFailure = true
    if (gradle.startParameter.logLevel == LogLevel.LIFECYCLE) {
        gradle.startParameter.logLevel = LogLevel.QUIET
    }
    allprojects {
        logging.captureStandardOutput(LogLevel.DEBUG)
        logging.captureStandardError(LogLevel.DEBUG)
        tasks.withType<JavaExec>().configureEach {
            doFirst {
                standardOutput = OutputStream.nullOutputStream()
                errorOutput = OutputStream.nullOutputStream()
            }
        }
    }

    val listenerRegistry = project.objects.newInstance(InjectedRegistry::class.java).registry
    val reporter =
        gradle.sharedServices.registerIfAbsent("verificationReporter", VerificationReporter::class.java) {
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
        if (module != project && "releaseApiDump" in module.tasks.names) {
            releaseApiDump.configure { dependsOn(module.tasks.named("releaseApiDump")) }
        }
        if (module != project && "releaseApiCheck" in module.tasks.names) {
            releaseApiCheck.configure { dependsOn(module.tasks.named("releaseApiCheck")) }
        }

        val dumpTask = module.tasks.findByName("releaseApiDump")
        val checkTask = module.tasks.findByName("releaseApiCheck")
        if (dumpTask != null && checkTask != null) {
            checkTask.mustRunAfter(dumpTask)
        }
    }

    val buildLogic = gradle.includedBuild("build-logic")
    verifyAll.configure {
        dependsOn(buildLogic.task(":detekt"), buildLogic.task(":ktlintCheck"))
        dependsOn(buildLogic.task(":basis-theme-ksp:detekt"))
        dependsOn(buildLogic.task(":basis-theme-ksp:ktlintCheck"))
    }
    fixAll.configure { dependsOn(buildLogic.task(":ktlintFormat")) }
}
