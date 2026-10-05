package io.github.alph_a07.basis.tokens.theme.inputs.domain

import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Domain names broad product contexts rather than industries or visual styles.
 */
class BasisDomainTest {
    @Test
    fun theCatalogueCoversTheBroadProductContexts() {
        val names = BasisDomainKind.entries.map { it.name }
        assertEquals(
            listOf(
                "Finance",
                "Commerce",
                "Social",
                "Messaging",
                "Productivity",
                "Technical",
                "Healthcare",
                "Education",
                "Travel",
                "Media",
                "Enterprise",
                "Creative",
            ),
            names,
        )
    }

    @Test
    fun domainIsOneProductLevelKindRatherThanAHierarchy() {
        val domain = BasisDomain(BasisDomainKind.Finance)
        assertEquals(BasisDomainKind.Finance, domain.kind)
    }

    @Test
    fun aContextIsNamedByKindAloneAndCarriesNoTokenValues() {
        val properties = BasisDomain::class.java.methods
            .mapNotNull { it.name.takeIf { name -> name.startsWith("get") && it.parameterCount == 0 } }
            .map { it.removePrefix("get").lowercase() }
            .filter { it != "class" }
        assertEquals(listOf("kind"), properties)
    }
}
