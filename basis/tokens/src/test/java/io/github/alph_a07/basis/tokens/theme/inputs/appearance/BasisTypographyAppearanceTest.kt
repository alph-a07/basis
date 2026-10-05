package io.github.alph_a07.basis.tokens.theme.inputs.appearance

import io.github.alph_a07.basis.tokens.theme.BasisThemeInputs
import io.github.alph_a07.basis.tokens.theme.resolution.BasisThemeResolver
import io.github.alph_a07.basis.tokens.theme.resolution.assertFailure
import io.github.alph_a07.basis.tokens.theme.resolution.contract.ResolutionFailure
import io.github.alph_a07.basis.tokens.vocabulary.size.BasisControlSize
import io.github.alph_a07.basis.tokens.vocabulary.size.BasisControlSizeSpec
import io.github.alph_a07.basis.tokens.vocabulary.size.ResolvedControlSize
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisFontFamily
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTextStyle
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTextStyleSpec
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyLevel
import io.github.alph_a07.basis.tokens.vocabulary.typography.BasisTypographyRole
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * What a consumer may say about typography, and what Basis refuses before resolution starts.
 *
 * Refusing malformed customization here rather than during resolution is deliberate: a request Basis
 * cannot interpret should not reach the point where it can influence a value, and the exception
 * names what was wrong with it.
 */
class BasisTypographyAppearanceTest {
    @Test
    fun aSpecificationMayPinDownAsLittleAsOneConstituent() {
        val spec = BasisTextStyleSpec(fontSizeSp = 20f)
        assertEquals(20f, spec.fontSizeSp)
        assertNull(spec.lineHeightSp)
        assertNull(spec.colorRole)
    }

    @Test
    fun aSpecificationCannotStateAFamily() {
        // Family assignment has exactly two scopes of its own. A third, equally specific route to
        // the same decision would leave a consumer's two contradictory statements unanswerable.
        assertEquals(
            setOf("fontSizeSp", "lineHeightSp", "fontWeight", "letterSpacingSp", "colorRole"),
            BasisTextStyleSpec::class.java.declaredFields.filterNot { it.isSynthetic }.map { it.name }.toSet(),
        )
    }

    @Test
    fun aSpecificationExposesEveryTypographyConstituentExceptTheFamily() {
        // A specification shadows the resolved token's constituents, so the two field lists have to
        // agree by hand. Deriving one from the other means a constituent added to the token cannot
        // be quietly left out of what a consumer may specify.
        val constituents = BasisTextStyle::class.java.declaredFields
            .filterNot { it.isSynthetic }
            .map { it.name }
            .toSet()
        val exposed = BasisTextStyleSpec::class.java.declaredFields
            .filterNot { it.isSynthetic }
            .map { it.name }
            .toSet()
        assertEquals(constituents - "fontFamily", exposed)
    }

    @Test
    fun aLevelOutsideTheCatalogueIsRefusedByResolution() {
        val failure = resolve(
            BasisAppearance(
                typography = BasisTypographyAppearance(
                    tokens = mapOf(
                        BasisTypographyLevel(BasisTypographyRole.Metadata, 4) to BasisTextStyleSpec(fontSizeSp = 12f),
                    ),
                ),
            ),
        )
        assertEquals("InvalidAppearance", failure.category)
        assertTrue(failure.causes.any { it.contains("do not exist") })
    }

    @Test
    fun aFamilyAssignmentNamingAnAbsentLevelIsRefusedByResolution() {
        assertEquals(
            "InvalidAppearance",
            resolve(
                BasisAppearance(
                    typography = BasisTypographyAppearance(
                        fontFamilies = BasisFontFamilyAppearance(
                            byLevel = mapOf(
                                BasisTypographyLevel(BasisTypographyRole.Structure, 7) to BasisFontFamily("Custom"),
                            ),
                        ),
                    ),
                ),
            ).category,
        )
    }

    @Test
    fun aNonPositiveSizeIsRefusedByResolution() {
        assertEquals(
            "InvalidAppearance",
            resolve(
                BasisAppearance(
                    typography = BasisTypographyAppearance(
                        tokens = mapOf(
                            BasisTypographyLevel(BasisTypographyRole.Content, 2) to BasisTextStyleSpec(fontSizeSp = 0f),
                        ),
                    ),
                ),
            ).category,
        )
    }

    /**
     * Resolves a theme declaring only [appearance], and returns what resolution reported.
     *
     * @param appearance The customization to resolve with.
     * @return The failure the resolution produced.
     */
    private fun resolve(appearance: BasisAppearance): ResolutionFailure =
        assertFailure(BasisThemeResolver.resolve(BasisThemeInputs(appearance = appearance)).result)

    @Test
    fun aLevelScopedFamilyRefinesTheRoleScopedOne() {
        val appearance = BasisFontFamilyAppearance(
            byRole = mapOf(BasisTypographyRole.Structure to BasisFontFamily("Serif")),
            byLevel = mapOf(
                BasisTypographyLevel(BasisTypographyRole.Structure, 1) to BasisFontFamily("Display"),
            ),
        )
        assertEquals("Display", appearance.resolve(BasisTypographyRole.Structure, 1)?.name)
        assertEquals("Serif", appearance.resolve(BasisTypographyRole.Structure, 2)?.name)
        assertNull(appearance.resolve(BasisTypographyRole.Content, 1))
    }
}

/**
 * Every composite a consumer can override accepts a partial form of it.
 *
 * Whole-value override and partial override are the same shape across families, so a constituent
 * added to a composite cannot be left out of what a consumer may state.
 */
class CompositeSpecificationTest {
    @Test
    fun aControlSizeSpecificationCoversEveryConstituent() {
        assertEquals(
            ResolvedControlSize::class.java.declaredFields.filterNot { it.isSynthetic }.map { it.name }.toSet(),
            BasisControlSizeSpec::class.java.declaredFields.filterNot { it.isSynthetic }.map { it.name }.toSet(),
        )
    }

    @Test
    fun aNegativeControlDimensionIsRefusedByResolution() {
        assertEquals(
            "InvalidAppearance",
            assertFailure(
                BasisThemeResolver.resolve(
                    BasisThemeInputs(
                        appearance = BasisAppearance(
                            size = BasisSizeAppearance(
                                overrides = mapOf(BasisControlSize.Level1 to BasisControlSizeSpec(minHeight = -1)),
                            ),
                        ),
                    ),
                ).result,
            ).category,
        )
    }
}
