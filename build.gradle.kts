import com.vanniktech.maven.publish.SonatypeHost

// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.android.library) apply false
    alias(libs.plugins.detekt) apply false
    alias(libs.plugins.vanniktech.maven.publish)
}

mavenPublishing {
    publishToMavenCentral(SonatypeHost.CENTRAL_PORTAL)
    signAllPublications()

    coordinates("io.github.alph-a07", "basis", "0.1.0")

    pom {
        name.set("Basis")
        description.set("A stable, simple, configurable design system for Jetpack Compose.")
        url.set("https://github.com/alph-a07/basis")

        licenses {
            license {
                name.set("The Apache License, Version 2.0")
                url.set("https://www.apache.org/licenses/LICENSE-2.0.txt")
            }
        }

        developers {
            developer {
                id.set("alph-a07")
                name.set("Jeel Patel")
                url.set("https://github.com/alph-a07")
            }
        }

        scm {
            url.set("https://github.com/alph-a07/basis")
            connection.set("scm:git:git://github.com/alph-a07/basis.git")
            developerConnection.set("scm:git:ssh://git@github.com/alph-a07/basis.git")
        }
    }
}