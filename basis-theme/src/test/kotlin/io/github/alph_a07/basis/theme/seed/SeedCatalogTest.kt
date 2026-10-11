package io.github.alph_a07.basis.theme.seed

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class SeedCatalogTest {
    @Test
    fun tablesLoad() {
        val tables = BasisSeedCatalog.tables()
        assertEquals(1, tables.version)
        assertEquals(8, tables.spacing.size)
        assertEquals(8, tables.radiusLevels.size)
        assertEquals(4, tables.depth.size)
        assertEquals(5, tables.iconSizes.size)
        assertEquals(5, tables.avatarSizes.size)
        assertEquals(5, tables.controlSizes.size)
        assertEquals(3, tables.dotSizes.size)
    }

    @Test
    fun lightAndDarkNeutralsIndependent() {
        val t = BasisSeedCatalog.tables()
        assertEquals(0.98f, t.lightNeutrals.surfaceL, 0.001f)
        assertEquals(0.16f, t.darkNeutrals.surfaceL, 0.001f)
        assertEquals(0.20f, t.lightNeutrals.contentL, 0.001f)
        assertEquals(0.93f, t.darkNeutrals.contentL, 0.001f)
    }

    @Test
    fun statusSeedsDualDefined() {
        val t = BasisSeedCatalog.tables()
        assertEquals(0.94f, t.statusLight.positiveSurfaceL, 0.001f)
        assertEquals(0.28f, t.statusDark.positiveSurfaceL, 0.001f)
    }

    @Test
    fun unknownVersionRejected() {
        assertFailsWith<IllegalArgumentException> {
            BasisSeedCatalog.tables(99)
        }
    }

    @Test
    fun versionBumpPathDocumented() {
        assertEquals(1, BasisSeedCatalog.CURRENT)
    }
}
