import org.jlleitschuh.gradle.ktlint.KtlintExtension

plugins {
    id("org.jlleitschuh.gradle.ktlint")
}

extensions.configure<KtlintExtension> {
    version.set(
        extensions.getByType<VersionCatalogsExtension>().named("libs")
            .findVersion("ktlint").get().requiredVersion,
    )
}
