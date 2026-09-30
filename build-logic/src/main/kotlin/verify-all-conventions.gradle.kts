/*
 * `verifyAll` runs every check CI runs, across every module and the `build-logic` included build, as a
 * single pre-commit gate. `releaseApiCheck` fails on an intentional public-API change by design;
 * regenerate the baseline only deliberately.
 */

/** The checks `verifyAll` runs, in CI order. */
val verifyAllChecks = listOf("assemble", "test", "lint", "detekt", "ktlintCheck", "releaseApiCheck")

val verifyAll = tasks.register("verifyAll") {
    group = "verification"
    description = "Runs assemble, test, lint, detekt, ktlint and releaseApiCheck across every build, matching CI."
}

// Depends through `named` rather than `findByName`, which stays lazy: realising a task registered by a
// convention plugin while configuring fails, because AGP has not finalised `targetCompatibility`.
gradle.projectsEvaluated {
    allprojects.forEach { module ->
        verifyAllChecks
            .filter { check -> check in module.tasks.names }
            .forEach { check -> verifyAll.configure { dependsOn(module.tasks.named(check)) } }
    }

    val buildLogic = gradle.includedBuild("build-logic")
    verifyAll.configure { dependsOn(buildLogic.task(":detekt"), buildLogic.task(":ktlintCheck")) }

    // A check no project supplies would leave the gate green without having run it. Scoped to the
    // requests selecting the gate, so an ordinary build is unaffected.
    if (verifyAll.name in gradle.startParameter.taskNames.map { it.substringAfterLast(':') }) {
        val supplied = allprojects.flatMapTo(mutableSetOf()) { it.tasks.names }
        val absent = verifyAllChecks.filterNot { check -> check in supplied }
        check(absent.isEmpty()) {
            "verifyAll: no project supplies ${absent.joinToString()}. " +
                "A check this gate is meant to run is no longer registered."
        }
    }
}
