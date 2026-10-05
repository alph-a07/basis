package io.github.alph_a07.basis.tokens.vocabulary.typography

import io.github.alph_a07.basis.tokens.vocabulary.color.BasisColorRole
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Typography is role-centric: Structure 1-6, Content 1-5 and Metadata 1-3.
 */
class TypographyTokensTest {
    @Test
    fun theThreeRolesAreTheWholeVocabulary() {
        assertEquals(
            listOf(BasisTypographyRole.Structure, BasisTypographyRole.Content, BasisTypographyRole.Metadata),
            BasisTypographyRole.entries.toList(),
        )
    }

    @Test
    fun eachRoleHasItsEstablishedNumberOfLevels() {
        assertEquals(6, STRUCTURE_LEVEL_COUNT)
        assertEquals(5, CONTENT_LEVEL_COUNT)
        assertEquals(3, METADATA_LEVEL_COUNT)
    }

    @Test
    fun everyLevelUpToItsRoleCountExistsAndBeyondItDoesNot() {
        for (role in BasisTypographyRole.entries) {
            val count = when (role) {
                BasisTypographyRole.Structure -> STRUCTURE_LEVEL_COUNT
                BasisTypographyRole.Content -> CONTENT_LEVEL_COUNT
                BasisTypographyRole.Metadata -> METADATA_LEVEL_COUNT
            }
            for (index in 1..count) {
                assertTrue("$role.$index should exist", BasisTypographyLevel(role, index).exists)
            }
            assertTrue(
                "$role.${count + 1} should not exist",
                !BasisTypographyLevel(role, count + 1).exists,
            )
        }
    }

    @Test
    fun aTypographyRoleIsACompositeCarryingAColorReference() {
        val style = BasisTextStyle(
            fontFamily = BasisFontFamily("Reading"),
            fontSizeSp = 16f,
            lineHeightSp = 24f,
            fontWeight = 400,
            letterSpacingSp = 0f,
            colorRole = BasisColorRole.ContentDefault,
        )

        assertEquals(BasisFontFamily("Reading"), style.fontFamily)
        assertEquals(BasisColorRole.ContentDefault, style.colorRole)
    }

    @Test
    fun aLevelIndexStartsAtOne() {
        val failure = runCatching {
            BasisTypographyLevel(BasisTypographyRole.Content, 0)
        }.exceptionOrNull()

        assertTrue(failure is IllegalArgumentException)
    }
}

/**
 * A resolved theme may assign several font families, at role scope, level scope, or both.
 */
class BasisFontFamilyAssignmentTest {
    private val displaySans = BasisFontFamily("DisplaySans")
    private val displaySerif = BasisFontFamily("DisplaySerif")
    private val reading = BasisFontFamily("Reading")

    @Test
    fun anUnassignedLevelDefersToTheResolverDefault() {
        val assignment = BasisFontFamilyAssignment()

        assertNull(assignment.familyFor(BasisTypographyLevel(BasisTypographyRole.Content, 1)))
    }

    @Test
    fun aRoleAssignmentAppliesToEveryLevelOfThatRole() {
        val assignment = BasisFontFamilyAssignment(
            byRole = mapOf(BasisTypographyRole.Structure to displaySans),
        )

        for (index in 1..STRUCTURE_LEVEL_COUNT) {
            assertEquals(
                displaySans,
                assignment.familyFor(BasisTypographyLevel(BasisTypographyRole.Structure, index)),
            )
        }
        assertNull(assignment.familyFor(BasisTypographyLevel(BasisTypographyRole.Content, 1)))
    }

    @Test
    fun levelScopeRefinesRoleScope() {
        val assignment = BasisFontFamilyAssignment(
            byRole = mapOf(BasisTypographyRole.Structure to displaySans),
            byLevel = mapOf(BasisTypographyLevel(BasisTypographyRole.Structure, 1) to displaySerif),
        )

        assertEquals(
            displaySerif,
            assignment.familyFor(BasisTypographyLevel(BasisTypographyRole.Structure, 1)),
        )
        assertEquals(
            displaySans,
            assignment.familyFor(BasisTypographyLevel(BasisTypographyRole.Structure, 2)),
        )
        assertEquals(
            displaySans,
            assignment.familyFor(BasisTypographyLevel(BasisTypographyRole.Structure, 3)),
        )
    }

    @Test
    fun severalFamiliesCoexistAcrossRoles() {
        val assignment = BasisFontFamilyAssignment(
            byRole = mapOf(
                BasisTypographyRole.Structure to displaySans,
                BasisTypographyRole.Content to reading,
                BasisTypographyRole.Metadata to reading,
            ),
        )

        val families = BasisTypographyRole.entries
            .flatMap { role -> assignment.familiesFor(role).values }
            .toSet()

        assertEquals(setOf(displaySans, reading), families)
    }

    @Test
    fun familiesForRoleCoversExactlyItsLevels() {
        val assignment = BasisFontFamilyAssignment(
            byRole = mapOf(BasisTypographyRole.Metadata to reading),
        )

        assertEquals(METADATA_LEVEL_COUNT, assignment.familiesFor(BasisTypographyRole.Metadata).size)
    }

    @Test
    fun assigningALevelThatDoesNotExistIsRejected() {
        val failure = runCatching {
            BasisFontFamilyAssignment(
                byLevel = mapOf(
                    BasisTypographyLevel(BasisTypographyRole.Metadata, METADATA_LEVEL_COUNT + 1) to reading,
                ),
            )
        }.exceptionOrNull()

        assertTrue(failure is IllegalArgumentException)
    }

    @Test
    fun aFontFamilyReferenceNeedsAName() {
        val failure = runCatching { BasisFontFamily("  ") }.exceptionOrNull()

        assertTrue(failure is IllegalArgumentException)
    }
}
