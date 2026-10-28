package io.github.alph_a07.basis.docs.extract

import java.io.File

/**
 * Resolves the git commit hash for deterministic provenance stamping.
 */
public object GitCommitLocator {

    /**
     * Locates the current git commit SHA, falling back to [fallback] if git is unavailable.
     *
     * @param rootDir Root directory where git commands should execute.
     * @param fallback Default commit hash returned on failure or non-git environments.
     * @return Hexadecimal commit SHA string or [fallback].
     */
    public fun currentCommit(rootDir: File, fallback: String = "dev"): String = try {
        val process =
            ProcessBuilder("git", "rev-parse", "HEAD")
                .directory(rootDir)
                .redirectErrorStream(true)
                .start()
        val output = process.inputStream.bufferedReader().use { it.readText().trim() }
        val exitCode = process.waitFor()

        if (exitCode == 0 && output.isNotBlank()) output else fallback
    } catch (_: Exception) {
        fallback
    }
}
