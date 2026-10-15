package io.github.alph_a07.basis.theme.resolution

import io.github.alph_a07.basis.theme.intent.BasisIntent
import io.github.alph_a07.basis.theme.intent.ControlIntent
import io.github.alph_a07.basis.theme.intent.DomainIntent
import io.github.alph_a07.basis.theme.intent.IdentityIntent
import io.github.alph_a07.basis.theme.intent.InteractionPattern
import io.github.alph_a07.basis.theme.intent.MoodIntent
import io.github.alph_a07.basis.theme.intent.MoodKnobs
import io.github.alph_a07.basis.theme.intent.MoodPreset
import io.github.alph_a07.basis.theme.intent.ProductDomain
import io.github.alph_a07.basis.theme.intent.TypographyIdentity
import io.github.alph_a07.basis.theme.intent.controls.FontControl
import io.github.alph_a07.basis.theme.resolution.fonts.DefaultFontBias
import io.github.alph_a07.basis.theme.resolution.fonts.FontCatalogReader
import io.github.alph_a07.basis.theme.resolution.fonts.GoogleFontCatalog
import io.github.alph_a07.basis.theme.resolution.fonts.GoogleFontsCategory
import io.github.alph_a07.basis.theme.resolution.report.ReportStatus
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath
import io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef
import io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class FontAssignmentTest {

    @Test
    fun catalogLoadsAllVendoredFamilies() {
        val all = GoogleFontCatalog.all
        assertEquals(EXPECTED_CATALOG_COUNT, all.size)

        for (entry in all) {
            assertTrue(entry.familyName.isNotBlank())
            assertTrue(entry.googleFontsKey.isNotBlank())
            assertTrue(entry.displayAffinity in 0f..1f)
            assertTrue(entry.textAffinity in 0f..1f)
            assertTrue(entry.metaAffinity in 0f..1f)
            assertTrue(entry.expressiveness in 0f..1f)
            assertTrue(entry.roundness in 0f..1f)
        }
    }

    @Test
    fun catalogLookupIsCaseAndWhitespaceInsensitive() {
        val interLower = GoogleFontCatalog.find(GoogleFontId("inter"))
        val interUpper = GoogleFontCatalog.find(GoogleFontId("Inter"))
        assertNotNull(interLower)
        assertEquals(interLower, interUpper)
        assertEquals("Inter", interLower.familyName)

        val openSansKebab = GoogleFontCatalog.find(GoogleFontId("open-sans"))
        val openSansSpaced = GoogleFontCatalog.find(GoogleFontId("Open Sans"))
        val openSansSnake = GoogleFontCatalog.find(GoogleFontId("open_sans"))
        assertNotNull(openSansKebab)
        assertEquals(openSansKebab, openSansSpaced)
        assertEquals(openSansKebab, openSansSnake)
        assertEquals("Open Sans", openSansKebab.familyName)
    }

    @Test
    fun categoryIndexAndAffinityPoolsArePopulated() {
        val sans = GoogleFontCatalog.byCategory(GoogleFontsCategory.SansSerif)
        val serifs = GoogleFontCatalog.byCategory(GoogleFontsCategory.Serif)
        val displays = GoogleFontCatalog.byCategory(GoogleFontsCategory.Display)

        assertTrue(sans.isNotEmpty())
        assertTrue(serifs.isNotEmpty())
        assertTrue(displays.isNotEmpty())

        assertTrue(GoogleFontCatalog.topStructureCandidates.isNotEmpty())
        assertTrue(GoogleFontCatalog.topContentCandidates.isNotEmpty())
        assertTrue(GoogleFontCatalog.topMetadataCandidates.isNotEmpty())
    }

    @Test
    fun pinsWinOverCandidates() {
        val playfair = FontFamilyRef.Catalog(GoogleFontId("playfair-display"))
        val inter = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val roboto = FontFamilyRef.Catalog(GoogleFontId("roboto"))
        val lato = FontFamilyRef.Catalog(GoogleFontId("lato"))

        val identity =
            IdentityIntent(
                typography =
                    TypographyIdentity(
                        structure = playfair,
                        candidates = listOf(inter, roboto, lato),
                    ),
            )
        val pair = resolve(BasisIntent(identity = identity))

        assertEquals(playfair, pair.report.fontAssignments.structure)
        assertEquals(inter, pair.report.fontAssignments.content)
        assertEquals(roboto, pair.report.fontAssignments.metadata)
        assertEquals(listOf(lato), pair.report.fontAssignments.unusedCandidates)

        val structureEntry = pair.report.entries.first { it.path == "typography.structure" }
        assertEquals(ReportStatus.Honored, structureEntry.status)
    }

    @Test
    fun singleCandidateReuseFillsUnpinnedLadders() {
        val inter = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val identity = IdentityIntent(typography = TypographyIdentity(candidates = listOf(inter)))
        val pair = resolve(BasisIntent(identity = identity))

        val assignments = pair.report.fontAssignments
        assertEquals(inter, assignments.structure)
        assertEquals(inter, assignments.content)
        assertEquals(inter, assignments.metadata)
        assertTrue(assignments.unusedCandidates.isEmpty())

        val structureEntry = pair.report.entries.first { it.path == "typography.structure" }
        val contentEntry = pair.report.entries.first { it.path == "typography.content" }
        val metadataEntry = pair.report.entries.first { it.path == "typography.metadata" }

        assertEquals(ReportStatus.Modulated, structureEntry.status)
        assertEquals(ReportStatus.Modulated, contentEntry.status)
        assertEquals(ReportStatus.Modulated, metadataEntry.status)
        assertTrue(contentEntry.message.contains("Single candidate reused"))
        assertTrue(metadataEntry.message.contains("Single candidate reused"))
    }

    @Test
    fun singleCandidateWithPinReusesForRemainingLadders() {
        val playfair = FontFamilyRef.Catalog(GoogleFontId("playfair-display"))
        val inter = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val identity =
            IdentityIntent(
                typography =
                    TypographyIdentity(
                        structure = playfair,
                        candidates = listOf(inter),
                    ),
            )
        val pair = resolve(BasisIntent(identity = identity))

        val assignments = pair.report.fontAssignments
        assertEquals(playfair, assignments.structure)
        assertEquals(inter, assignments.content)
        assertEquals(inter, assignments.metadata)
        assertTrue(assignments.unusedCandidates.isEmpty())

        val contentEntry = pair.report.entries.first { it.path == "typography.content" }
        val metadataEntry = pair.report.entries.first { it.path == "typography.metadata" }

        assertEquals(ReportStatus.Modulated, contentEntry.status)
        assertEquals(ReportStatus.Modulated, metadataEntry.status)
        assertTrue(metadataEntry.message.contains("Single candidate reused"))
    }

    @Test
    fun candidateScoringAssignsByAffinities() {
        val inter = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val playfair = FontFamilyRef.Catalog(GoogleFontId("playfair-display"))
        val identity = IdentityIntent(typography = TypographyIdentity(candidates = listOf(inter, playfair)))
        val pair = resolve(BasisIntent(identity = identity))

        val assignments = pair.report.fontAssignments
        assertEquals(playfair, assignments.structure)
        assertEquals(inter, assignments.content)
        assertEquals(DefaultFontBias.METADATA, assignments.metadata)
        assertTrue(assignments.unusedCandidates.isEmpty())
    }

    @Test
    fun unusedCandidatesAreRecordedInReport() {
        val inter = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val roboto = FontFamilyRef.Catalog(GoogleFontId("roboto"))
        val openSans = FontFamilyRef.Catalog(GoogleFontId("open-sans"))
        val lato = FontFamilyRef.Catalog(GoogleFontId("lato"))
        val identity =
            IdentityIntent(
                typography = TypographyIdentity(candidates = listOf(inter, roboto, openSans, lato)),
            )
        val pair = resolve(BasisIntent(identity = identity))

        val assignments = pair.report.fontAssignments
        assertEquals(inter, assignments.structure)
        assertEquals(roboto, assignments.content)
        assertEquals(openSans, assignments.metadata)
        assertEquals(listOf(lato), assignments.unusedCandidates)
    }

    @Test
    fun emptyIntentDerivesDefaultSansFallbacks() {
        val neutralPair = resolve(BasisIntent())
        val neutralAssignments = neutralPair.report.fontAssignments

        assertEquals(DefaultFontBias.TEXT, neutralAssignments.structure)
        assertEquals(DefaultFontBias.TEXT, neutralAssignments.content)
        assertEquals(DefaultFontBias.METADATA, neutralAssignments.metadata)
    }

    @Test
    fun dynamicCatalogDerivationRespondsToExpressiveness() {
        val expressivePair =
            resolve(
                BasisIntent(
                    mood =
                        MoodIntent(
                            preset = MoodPreset.Bold,
                            knobs = MoodKnobs(typographyExpressiveness = 0.8f),
                        ),
                ),
            )
        val assignments = expressivePair.report.fontAssignments
        val structureRef = assignments.structure as FontFamilyRef.Catalog
        val structureEntry = GoogleFontCatalog.find(structureRef.id)
        assertNotNull(structureEntry)
        assertTrue(structureEntry.displayAffinity >= 0.70f)
        assertTrue(structureEntry.expressiveness >= 0.50f)

        val contentRef = assignments.content as FontFamilyRef.Catalog
        val contentEntry = GoogleFontCatalog.find(contentRef.id)
        assertNotNull(contentEntry)
        assertTrue(contentEntry.textAffinity >= 0.70f)
        assertTrue(!contentEntry.mono)

        val metaRef = assignments.metadata as FontFamilyRef.Catalog
        val metaEntry = GoogleFontCatalog.find(metaRef.id)
        assertNotNull(metaEntry)
        assertTrue(metaEntry.metaAffinity >= 0.65f)
    }

    @Test
    fun dynamicCatalogDerivationRespondsToRoundness() {
        val roundPair =
            resolve(
                BasisIntent(
                    mood = MoodIntent(knobs = MoodKnobs(roundness = 0.9f)),
                ),
            )
        val roundAssignments = roundPair.report.fontAssignments
        val roundStructure = GoogleFontCatalog.find((roundAssignments.structure as FontFamilyRef.Catalog).id)
        assertNotNull(roundStructure)
        assertTrue(
            roundStructure.roundness >= 0.80f,
            "Structure font must have high roundness, was ${roundStructure.roundness}",
        )

        val sharpPair =
            resolve(
                BasisIntent(
                    mood = MoodIntent(knobs = MoodKnobs(roundness = -0.9f)),
                ),
            )
        val sharpAssignments = sharpPair.report.fontAssignments
        val sharpStructure = GoogleFontCatalog.find((sharpAssignments.structure as FontFamilyRef.Catalog).id)
        assertNotNull(sharpStructure)
        assertTrue(
            sharpStructure.roundness <= 0.20f,
            "Structure font must have low roundness/sharpness, was ${sharpStructure.roundness}",
        )
    }

    @Test
    fun dynamicDerivationIsIdempotentAndReliable() {
        val intent =
            BasisIntent(
                mood = MoodIntent(preset = MoodPreset.Playful, knobs = MoodKnobs(warmth = 0.4f, roundness = 0.8f)),
            )
        val run1 = resolve(intent).report.fontAssignments
        val run2 = resolve(intent).report.fontAssignments
        val run3 = resolve(intent).report.fontAssignments

        assertEquals(run1.structure, run2.structure)
        assertEquals(run1.content, run2.content)
        assertEquals(run1.metadata, run2.metadata)

        assertEquals(run2.structure, run3.structure)
        assertEquals(run2.content, run3.content)
        assertEquals(run2.metadata, run3.metadata)
    }

    @Test
    fun anyCatalogFamilyCanBePinnedViaIdentity() {
        val pacifico = FontFamilyRef.Catalog(GoogleFontId("pacifico"))
        val mono = FontFamilyRef.Catalog(GoogleFontId("jetbrains-mono"))
        val merriweather = FontFamilyRef.Catalog(GoogleFontId("merriweather"))

        val identity =
            IdentityIntent(
                typography =
                    TypographyIdentity(
                        structure = pacifico,
                        content = merriweather,
                        metadata = mono,
                    ),
            )
        val pair = resolve(BasisIntent(identity = identity))

        val assignments = pair.report.fontAssignments
        assertEquals(pacifico, assignments.structure)
        assertEquals(merriweather, assignments.content)
        assertEquals(mono, assignments.metadata)

        val light = pair.light
        assertNotNull(light)
        assertEquals(pacifico, light.typography.structure.level1.family)
        assertEquals(merriweather, light.typography.content.level1.family)
        assertEquals(mono, light.typography.metadata.level1.family)
    }

    @Test
    fun anyCatalogFamilyCanBePinnedViaControl() {
        val pacifico = FontFamilyRef.Catalog(GoogleFontId("pacifico"))
        val controls =
            FontControl(
                levelFamilies = mapOf(TypographyTokenPath.StructureLevel1 to pacifico),
            )
        val pair = resolve(BasisIntent(control = ControlIntent(fonts = controls)))

        val light = pair.light
        assertNotNull(light)
        assertEquals(pacifico, light.typography.structure.level1.family)
        assertEquals(DefaultFontBias.TEXT, light.typography.structure.level2.family)

        val lockEntry = pair.report.entries.first { it.path == "typography.structure.level1" }
        assertEquals(ReportStatus.Honored, lockEntry.status)
    }

    @Test
    fun customFontKeysPreservedWithoutNetwork() {
        val customKey = CustomFontKey("corp-display-sans")
        val customRef = FontFamilyRef.Custom(customKey)
        val identity = IdentityIntent(typography = TypographyIdentity(structure = customRef))
        val pair = resolve(BasisIntent(identity = identity))

        val assignments = pair.report.fontAssignments
        assertEquals(customRef, assignments.structure)

        val light = pair.light
        assertNotNull(light)
        assertEquals(customRef, light.typography.structure.level1.family)
    }

    @Test
    fun dynamicDerivationRespondsToProductDomainPriors() {
        val financePair =
            resolve(
                BasisIntent(
                    domain = DomainIntent(domains = setOf(ProductDomain.Finance)),
                ),
            )
        val financeAssignments = financePair.report.fontAssignments
        val structureRef = financeAssignments.structure as FontFamilyRef.Catalog
        val structureEntry = GoogleFontCatalog.find(structureRef.id)
        assertNotNull(structureEntry)
        assertTrue(structureEntry.expressiveness <= 0.60f)

        val contentRef = financeAssignments.content as FontFamilyRef.Catalog
        val contentEntry = GoogleFontCatalog.find(contentRef.id)
        assertNotNull(contentEntry)
        assertTrue(contentEntry.textAffinity >= 0.85f)
        assertTrue(!contentEntry.mono)

        val dataPair =
            resolve(
                BasisIntent(
                    domain = DomainIntent(interactions = setOf(InteractionPattern.DataNavigation)),
                ),
            )
        val dataAssignments = dataPair.report.fontAssignments
        val metaRef = dataAssignments.metadata as FontFamilyRef.Catalog
        val metaEntry = GoogleFontCatalog.find(metaRef.id)
        assertNotNull(metaEntry)
        assertTrue(metaEntry.metaAffinity >= 0.75f)
    }

    @Test
    fun dynamicDerivationRespondsToArchetypePresets() {
        val minimalPair = resolve(BasisIntent(mood = MoodIntent(preset = MoodPreset.Minimal)))
        val minimalAssignments = minimalPair.report.fontAssignments
        val minimalStructure = GoogleFontCatalog.find((minimalAssignments.structure as FontFamilyRef.Catalog).id)
        assertNotNull(minimalStructure)
        assertTrue(minimalStructure.expressiveness <= 0.50f)

        val expressivePair = resolve(BasisIntent(mood = MoodIntent(preset = MoodPreset.Expressive)))
        val expressiveAssignments = expressivePair.report.fontAssignments
        val expressiveStructure = GoogleFontCatalog.find((expressiveAssignments.structure as FontFamilyRef.Catalog).id)
        assertNotNull(expressiveStructure)
        assertTrue(expressiveStructure.displayAffinity >= 0.70f)
        assertTrue(expressiveStructure.expressiveness >= 0.40f)

        val playfulPair = resolve(BasisIntent(mood = MoodIntent(preset = MoodPreset.Playful)))
        val playfulAssignments = playfulPair.report.fontAssignments
        val playfulStructure = GoogleFontCatalog.find((playfulAssignments.structure as FontFamilyRef.Catalog).id)
        assertNotNull(playfulStructure)
        assertTrue(playfulStructure.roundness >= 0.70f)
    }

    @Test
    fun dynamicDerivationFillsGapsWhenSomeLaddersArePinned() {
        val playfair = FontFamilyRef.Catalog(GoogleFontId("playfair-display"))
        val intent =
            BasisIntent(
                identity = IdentityIntent(typography = TypographyIdentity(structure = playfair)),
                mood = MoodIntent(knobs = MoodKnobs(roundness = 0.9f)),
            )
        val pair = resolve(intent)
        val assignments = pair.report.fontAssignments

        assertEquals(playfair, assignments.structure)

        val contentRef = assignments.content as FontFamilyRef.Catalog
        val contentEntry = GoogleFontCatalog.find(contentRef.id)
        assertNotNull(contentEntry)
        assertTrue(contentEntry.roundness >= 0.80f)

        val structureEntry = pair.report.entries.first { it.path == "typography.structure" }
        assertEquals(ReportStatus.Honored, structureEntry.status)

        val contentEntryReport = pair.report.entries.first { it.path == "typography.content" }
        assertEquals(ReportStatus.Absent, contentEntryReport.status)
        assertTrue(contentEntryReport.message.contains("derived dynamically from catalog based on intent"))
    }

    @Test
    fun dynamicDerivationFillsGapsWhenTwoCandidatesProvidedForThreeLadders() {
        val playfair = FontFamilyRef.Catalog(GoogleFontId("playfair-display"))
        val inter = FontFamilyRef.Catalog(GoogleFontId("inter"))
        val intent =
            BasisIntent(
                identity = IdentityIntent(typography = TypographyIdentity(candidates = listOf(inter, playfair))),
                mood = MoodIntent(preset = MoodPreset.Bold, knobs = MoodKnobs(typographyExpressiveness = 0.8f)),
            )
        val pair = resolve(intent)
        val assignments = pair.report.fontAssignments

        assertEquals(playfair, assignments.structure)
        assertEquals(inter, assignments.content)

        val metaRef = assignments.metadata as FontFamilyRef.Catalog
        val metaEntry = GoogleFontCatalog.find(metaRef.id)
        assertNotNull(metaEntry)
        assertTrue(metaEntry.metaAffinity >= 0.65f)

        val metadataEntryReport = pair.report.entries.first { it.path == "typography.metadata" }
        assertEquals(ReportStatus.Absent, metadataEntryReport.status)
        assertTrue(metadataEntryReport.message.contains("derived dynamically from catalog based on intent"))
    }

    @Test
    fun dynamicDerivationWithPolarExtremeKnobs() {
        val maxRoundedPair =
            resolve(
                BasisIntent(
                    mood =
                        MoodIntent(
                            knobs =
                                MoodKnobs(
                                    roundness = 1.0f,
                                    typographyExpressiveness = 1.0f,
                                ),
                        ),
                ),
            )
        val maxRoundedStructure =
            GoogleFontCatalog.find(
                (maxRoundedPair.report.fontAssignments.structure as FontFamilyRef.Catalog).id,
            )
        assertNotNull(maxRoundedStructure)
        assertTrue(maxRoundedStructure.roundness >= 0.80f)

        val maxSharpPair =
            resolve(
                BasisIntent(
                    mood =
                        MoodIntent(
                            knobs =
                                MoodKnobs(
                                    roundness = -1.0f,
                                    typographyExpressiveness = -1.0f,
                                ),
                        ),
                ),
            )
        val maxSharpStructure =
            GoogleFontCatalog.find(
                (maxSharpPair.report.fontAssignments.structure as FontFamilyRef.Catalog).id,
            )
        assertNotNull(maxSharpStructure)
        assertTrue(maxSharpStructure.roundness <= 0.20f)
        assertTrue(maxSharpStructure.expressiveness <= 0.40f)
    }

    @Test
    fun dynamicDerivationPriorsMultiSelectDomainBlend() {
        val blendedIntent =
            BasisIntent(
                domain =
                    DomainIntent(
                        domains = setOf(ProductDomain.Finance, ProductDomain.Health),
                        interactions = setOf(InteractionPattern.FormsEntry),
                    ),
            )
        val pair = resolve(blendedIntent)
        val assignments = pair.report.fontAssignments

        val structureRef = assignments.structure as FontFamilyRef.Catalog
        val structureEntry = GoogleFontCatalog.find(structureRef.id)
        assertNotNull(structureEntry)
        assertTrue(structureEntry.expressiveness <= 0.50f)

        val contentRef = assignments.content as FontFamilyRef.Catalog
        val contentEntry = GoogleFontCatalog.find(contentRef.id)
        assertNotNull(contentEntry)
        assertTrue(contentEntry.textAffinity >= 0.85f)
    }

    @Test
    fun categoryFromCodeDecodesAllSupportedCodes() {
        assertEquals(
            GoogleFontsCategory.SansSerif,
            FontCatalogReader.categoryFromCode(FontCatalogReader.CATEGORY_CODE_SANS_SERIF),
        )
        assertEquals(
            GoogleFontsCategory.Serif,
            FontCatalogReader.categoryFromCode(FontCatalogReader.CATEGORY_CODE_SERIF),
        )
        assertEquals(
            GoogleFontsCategory.Display,
            FontCatalogReader.categoryFromCode(FontCatalogReader.CATEGORY_CODE_DISPLAY),
        )
        assertEquals(
            GoogleFontsCategory.Handwriting,
            FontCatalogReader.categoryFromCode(FontCatalogReader.CATEGORY_CODE_HANDWRITING),
        )
        assertEquals(
            GoogleFontsCategory.Monospace,
            FontCatalogReader.categoryFromCode(FontCatalogReader.CATEGORY_CODE_MONOSPACE),
        )

        assertFailsWith<IllegalStateException> {
            FontCatalogReader.categoryFromCode(99)
        }
    }

    @Test
    fun weightsCountIsValidOnAllEntries() {
        for (entry in GoogleFontCatalog.all) {
            assertTrue(entry.weightsCount >= 1, "Entry ${entry.id.value} must have at least 1 weight")
        }
    }

    @Test
    fun goldenDynamicDerivationStabilityAcrossArchetypes() {
        // Default / neutral archetype
        val defaultPair = resolve(BasisIntent())
        val defaultAssignments = defaultPair.report.fontAssignments
        assertEquals("inter", (defaultAssignments.structure as FontFamilyRef.Catalog).id.value)
        assertEquals("inter", (defaultAssignments.content as FontFamilyRef.Catalog).id.value)
        assertEquals("inter", (defaultAssignments.metadata as FontFamilyRef.Catalog).id.value)

        // Expressive / playful archetype
        val expressivePair =
            resolve(
                BasisIntent(
                    mood =
                        MoodIntent(
                            knobs =
                                MoodKnobs(
                                    roundness = 1.0f,
                                    typographyExpressiveness = 1.0f,
                                ),
                        ),
                ),
            )
        val exprAssignments = expressivePair.report.fontAssignments
        assertEquals("doto", (exprAssignments.structure as FontFamilyRef.Catalog).id.value)

        // Telemetry / dense data archetype prefers monospace for metadata
        val devPair =
            resolve(
                BasisIntent(
                    domain =
                        DomainIntent(
                            domains = setOf(ProductDomain.Productivity),
                            interactions = setOf(InteractionPattern.DataNavigation),
                        ),
                ),
            )
        val devAssignments = devPair.report.fontAssignments
        val metaEntry = GoogleFontCatalog.find((devAssignments.metadata as FontFamilyRef.Catalog).id)
        assertNotNull(metaEntry)
        assertTrue(metaEntry.mono, "High density developer archetype should select monospace metadata ladder")
    }

    private companion object {
        private const val EXPECTED_CATALOG_COUNT: Int = 656
    }
}
