# Graph Report - basis  (2026-10-21)

## Corpus Check
- 195 files · ~126,227 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 24 file(s) not represented in the graph (top: (none) 11, .properties 3, .xml 2)

## Summary
- 1450 nodes · 3808 edges · 132 communities (63 shown, 69 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 169 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bbfa59c9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DerivationWeights
- BasisTokenPathFamilyProcessor.kt
- DomainIntent
- FontAssignment.kt
- SpOnlyFontSizeDetector.kt
- Oklch
- ScalarEnforcement.kt
- verify-all-conventions.gradle.kts
- TokenPathsTest.kt
- NeutralColorSynthesis.kt
- .process
- FontFamilyRef
- ResolutionContext
- GoogleFontId
- IntentContractsTest.kt
- MotionConversions.kt
- ColorBases.kt
- MoodIntent
- ScalarDerivation.kt
- .emit
- BrandPresence
- NeutralTargets.kt
- FontCatalogDerivation.kt
- DomainMoodInfluenceTest.kt
- VersionCatalogUsage.kt
- PathNamingTest
- detekt-conventions.gradle.kts
- EasingKind
- TokenOverrides
- MotionSpec
- ColorTokens
- BlankLineBeforeReturn
- Restrict Tracking Issues Workflow
- MoodPreset
- BlankLineBeforeReturn.kt
- BlankLineBeforeLastStatementTest
- ThemeMode
- ColorDerivation.kt
- TokenFamilyWalker.kt
- BlankLineBeforeLastStatement
- customfontkey
- ControlIntent
- assertequals
- prioraesthetic
- BlankLineBeforeReturnTest
- BasisIntent
- CategoricalStrategy
- OverrideMode
- MotionTokens
- generate_font_catalog.py
- .get
- calculateDerivationWeights
- ThemeProfile
- MandatoryBracesTest
- TokenContractsTest.kt
- BasisTheme.kt
- BasisIssueRegistry.kt
- FontCatalogReader
- GoogleFontCatalog
- test
- modegeneration
- gradlew
- ref_fs
- ktlint-conventions.gradle.kts
- commit-msg
- pre-commit
- pre-push
- TokenSequence
- Blank Issues Configuration
- AGENTS Coding Guide
- WalkFailure
- FontCatalogEntry
- .emit
- DpValue
- InteractionPattern
- depthspec
- DomainMoodInfluenceTest
- GoogleFontsCategory
- BasisTokenPathFamilyProcessorProvider.kt
- ResolvedFonts
- LocalBasisTheme.kt
- .instance
- avatarsizes
- basis_theme_src_main_kotlin_io_github_alph_a07_basis_theme_resolution_domain_priorseed_priorgain
- bordercolors
- brandcolors
- brandpresence
- componentid
- componentoverride
- componentstylepatch
- contentcolors
- contenttype
- contrastconstraint
- controlsizes
- dotsizes
- focuscolors
- googlefontcatalog
- gradientdirection
- iconcolors
- iconsizes
- interactionpattern
- metadatatype
- moodknobs
- moodpreset
- oklchstop
- priorseedbiases
- productdomain
- prominencetier
- reportentry
- reportstatus
- resolve
- selectioncolors
- springparams
- stateid
- statuscolors
- structuretype
- surfacecolors
- touchtargetconstraint
- treatment
- typerole
- universalstylepatch
- variantid

## God Nodes (most connected - your core abstractions)
1. `BasisIntent` - 90 edges
2. `resolve()` - 88 edges
3. `Oklch` - 71 edges
4. `DpValue` - 53 edges
5. `ReportEntry` - 52 edges
6. `FontFamilyRef` - 47 edges
7. `GoogleFontId` - 44 edges
8. `ThemeMode` - 40 edges
9. `IdentityIntent` - 38 edges
10. `MoodIntent` - 33 edges

## Surprising Connections (you probably didn't know these)
- `toDpValue()` --references--> `DpValue`  [EXTRACTED]
  basis-components/src/main/kotlin/io/github/alph_a07/basis/components/theme/conversion/DpConversions.kt → basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/core/DpValue.kt
- `BasisTheme()` --references--> `ComponentOverrides`  [EXTRACTED]
  basis-components/src/main/kotlin/io/github/alph_a07/basis/components/theme/BasisTheme.kt → basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/intent/controls/overrides/ComponentOverrides.kt
- `BasisTheme()` --references--> `ResolutionReport`  [EXTRACTED]
  basis-components/src/main/kotlin/io/github/alph_a07/basis/components/theme/BasisTheme.kt → basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/resolution/report/ResolutionReport.kt
- `BasisTheme()` --references--> `ResolvedTheme`  [EXTRACTED]
  basis-components/src/main/kotlin/io/github/alph_a07/basis/components/theme/BasisTheme.kt → basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/tokens/core/ResolvedTheme.kt
- `BasisTheme()` --references--> `ResolvedThemePair`  [EXTRACTED]
  basis-components/src/main/kotlin/io/github/alph_a07/basis/components/theme/BasisTheme.kt → basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/tokens/core/ResolvedThemePair.kt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Atomic Design Component Composition Hierarchy** — github_issue_template_new_atom_atom_concept, github_issue_template_new_molecule_molecule_concept, github_issue_template_new_component_component_concept [INFERRED]
- **Contribution Governance and Automated Workflow Triage** — github_workflows_branch_name_lint_workflow, github_workflows_pr_title_lint_workflow, github_workflows_label_pull_requests_workflow, github_pull_request_template_pr_template [INFERRED]
- **Continuous Verification and Quality Gate Pipeline** — github_workflows_ci_ci_pipeline, contributing_verify_all, config_detekt_detekt_configuration, contributing_binary_compatibility_validation [INFERRED]

## Communities (132 total, 69 thin omitted)

### Community 0 - "DerivationWeights"
Cohesion: 0.27
Nodes (17): mixOklch(), deriveColorTokens(), deriveFocus(), deriveBorders(), deriveContents(), deriveIcons(), deriveSelection(), deriveStatus() (+9 more)

### Community 1 - "BasisTokenPathFamilyProcessor.kt"
Cohesion: 0.20
Nodes (12): BasisTokenPathFamilyProcessor, KSClassDeclaration, SymbolProcessor, FamilyConfig, codegenerator, dependencies, KSAnnotated, KSAnnotation (+4 more)

### Community 2 - "DomainIntent"
Cohesion: 0.18
Nodes (7): DomainIntent, normalizeIntent(), presenceReportEntries(), supportingColors(), toOklch(), NormalizeStage, ColorDerivationGateTest

### Community 3 - "FontAssignment.kt"
Cohesion: 0.26
Nodes (11): fallbackEntry(), TypographyTokenPath, lockEntries(), pinned(), resolveFontRoles(), resolveLadderFallback(), NormalizedIntent, candidate_expressiveness_weight (+3 more)

### Community 4 - "SpOnlyFontSizeDetector.kt"
Cohesion: 0.06
Nodes (28): Detector, Issue, SpOnlyFontSizeDetector, UElementHandler, Detector, Issue, SpOnlyFontSizeDetectorTest, category (+20 more)

### Community 5 - "Oklch"
Cohesion: 0.06
Nodes (39): atan2, ColorConversionsTest, LinearSrgb, Oklch, argbToOklch(), hexToOklch(), hslToOklch(), hueSector() (+31 more)

### Community 6 - "ScalarEnforcement.kt"
Cohesion: 0.54
Nodes (6): MinMaxLevels, clamped(), clampRadius(), clampSpacing(), enforceControlSizes(), raised()

### Community 7 - "verify-all-conventions.gradle.kts"
Cohesion: 0.09
Nodes (18): AutoCloseable, InjectedRegistry, ReporterParams, TaskFailureEntry, VerificationReporter, VerificationTracePrinter, BuildEventsListenerRegistry, BuildService (+10 more)

### Community 8 - "TokenPathsTest.kt"
Cohesion: 0.05
Nodes (84): EmValue, FontWeightValue, LineHeightValue, SpValue, Depth, Motion, OverrideValue, Typography (+76 more)

### Community 9 - "NeutralColorSynthesis.kt"
Cohesion: 0.07
Nodes (34): ProductDomain, Commerce, Education, Finance, Health, Media, Other, Productivity (+26 more)

### Community 10 - ".process"
Cohesion: 0.35
Nodes (6): deriveDepthTokens(), deriveRadiusTokens(), deriveSpacingTokens(), ScalarWeights, toScalarWeights(), ScalarDerivationTest

### Community 11 - "FontFamilyRef"
Cohesion: 0.35
Nodes (6): AssignedLadders, CandidateAssigner, candidateEntry(), Catalog, Custom, FontFamilyRef

### Community 12 - "ResolutionContext"
Cohesion: 0.15
Nodes (10): BaseStage, baseDepthTokens(), baseRadiusTokens(), baseSpacingTokens(), ControlStage, DeriveStage, EnforceStage, FontStage (+2 more)

### Community 13 - "GoogleFontId"
Cohesion: 0.17
Nodes (5): GoogleFontDownloaderTest, IdentityIntent, TypographyIdentity, DefaultFontBias, GoogleFontId

### Community 14 - "IntentContractsTest.kt"
Cohesion: 0.07
Nodes (48): assertnull, asserttrue, Argb, ColorSpec, Hex, Hsl, FontControl, FontFeatureSpec (+40 more)

### Community 15 - "MotionConversions.kt"
Cohesion: 0.21
Nodes (14): AnimationSpec, BasisMotionLocals, T, toAnimationSpec(), toBasisMotionLocals(), toComposeEasing(), toFiniteAnimationSpec(), fastoutlinearineasing (+6 more)

### Community 16 - "ColorBases.kt"
Cohesion: 0.17
Nodes (21): base_brand_chroma, safeOklch(), baseBorderColors(), baseColorTokens(), baseContentColors(), baseIconColors(), baseSelectionColors(), baseStatus() (+13 more)

### Community 17 - "MoodIntent"
Cohesion: 0.18
Nodes (5): BasisKnobEntries, isSpecified(), MoodIntent, MoodKnobs, FontAssignmentTest

### Community 18 - "ScalarDerivation.kt"
Cohesion: 0.49
Nodes (8): baseSizeTokens(), deriveSizeTokens(), AvatarSizes, ControlSizes, DotSizes, IconSizes, SizeTokens, sizeTokens()

### Community 19 - ".emit"
Cohesion: 0.21
Nodes (5): FamilyEmitter, FamilyModel, PathMember, TokenValueTypes, FamilyEmitterTest

### Community 20 - "BrandPresence"
Cohesion: 0.18
Nodes (10): BrandPresence, Balanced, Dominant, Strong, Subtle, brandAnchors(), inferPresenceFromChroma(), resolveBrandTints() (+2 more)

### Community 21 - "NeutralTargets.kt"
Cohesion: 0.09
Nodes (22): border_chroma, border_dark, border_light, border_muted_dark, border_muted_light, border_strong_dark, border_strong_light, elevated_dark (+14 more)

### Community 22 - "FontCatalogDerivation.kt"
Cohesion: 0.09
Nodes (22): catalog_tie_epsilon, content_optical_density_floor, content_round_weight, content_text_affinity_floor, content_trust_weight, datadensity01, metadata_affinity_floor, metadata_density_weight (+14 more)

### Community 23 - "DomainMoodInfluenceTest.kt"
Cohesion: 0.17
Nodes (14): isUnspecified(), InfluenceWeights, StructuralWeights, applyMoodKnobs(), blendMoodInfluence(), MoodInfluenceGain, SPECIFIED, UNSPECIFIED (+6 more)

### Community 24 - "VersionCatalogUsage.kt"
Cohesion: 0.30
Nodes (6): Rule, VersionCatalogUsage, KtBinaryExpression, KtCallExpression, ktnamereferenceexpression, ktstringtemplateexpression

### Community 25 - "PathNamingTest"
Cohesion: 0.20
Nodes (6): enumNameFor(), memberNameFor(), paramNameFor(), pathFor(), wrapKdocParagraph(), PathNamingTest

### Community 26 - "detekt-conventions.gradle.kts"
Cohesion: 0.23
Nodes (8): applicationextension, applyJvmRelease(), javaReleaseOf(), resolveJvmTargetFrom(), CompileOptions, detekt, detektextension, libraryextension

### Community 27 - "EasingKind"
Cohesion: 0.20
Nodes (8): EasingKind, Accelerate, Decelerate, Emphasized, Linear, Spring, Standard, BaseTables

### Community 28 - "TokenOverrides"
Cohesion: 0.17
Nodes (14): AvatarSizeOverrides, ControlSizeOverrides, DepthOverrides, DepthSpecPatch, DotSizeOverrides, IconSizeOverrides, RadiusOverrides, SizeOverrides (+6 more)

### Community 29 - "MotionSpec"
Cohesion: 0.26
Nodes (10): MotionConversionsTest, DurationValue, MotionSpec, SpringParams, biased(), enforceMotion(), reducedFeedback(), reducedSpatial() (+2 more)

### Community 30 - "ColorTokens"
Cohesion: 0.11
Nodes (33): BasisBorderColors, BasisBrandColors, BasisColorLocals, BasisContentColors, BasisFocusColors, BasisIconColors, BasisSelectionColors, BasisStatusColors (+25 more)

### Community 32 - "Restrict Tracking Issues Workflow"
Cohesion: 0.23
Nodes (12): Report or Request Issue Template, Issue Auto-Labeling Workflow, Atom UI Concept, New Atom Issue Template, Component UI Concept, New Component Issue Template, Molecule UI Concept, New Molecule Issue Template (+4 more)

### Community 33 - "MoodPreset"
Cohesion: 0.22
Nodes (8): MoodPreset, Bold, Calm, Expressive, Minimal, Neutral, Playful, Professional

### Community 34 - "BlankLineBeforeReturn.kt"
Cohesion: 0.17
Nodes (16): Rule, KtElement, Rule, MandatoryBraces, codesmell, debt, Entity, issue (+8 more)

### Community 36 - "ThemeMode"
Cohesion: 0.17
Nodes (20): ThemeMode, Dark, Light, BorderColorOverrides, BrandColorOverrides, ColorTokenOverrides, ContentColorOverrides, FocusColorOverrides (+12 more)

### Community 37 - "ColorDerivation.kt"
Cohesion: 0.22
Nodes (14): GradientDirection, AngleDeg, Horizontal, Vertical, OklchGradient, OklchStop, flatGradient(), deriveGradients() (+6 more)

### Community 38 - "TokenFamilyWalker.kt"
Cohesion: 0.27
Nodes (8): KSClassDeclaration, KSValueParameter, TokenFamilyWalker, WalkResult, WalkState, ksfile, KSType, nullability

### Community 39 - "BlankLineBeforeLastStatement"
Cohesion: 0.33
Nodes (4): BlankLineBeforeLastStatement, KtElement, Rule, KtFile

### Community 41 - "ControlIntent"
Cohesion: 0.14
Nodes (8): ControlIntent, ConstraintsControl, ContrastConstraint, MotionConstraint, TouchTargetConstraint, TypographyConstraints, ModeControl, IntentContractsTest

### Community 42 - "assertequals"
Cohesion: 0.06
Nodes (44): abs, assertequals, assertfailswith, assertfalse, assertnotnull, assertsame, AssetManager, AssetFont (+36 more)

### Community 45 - "BasisIntent"
Cohesion: 0.15
Nodes (5): BasisThemeTest, BasisTheme(), BasisIntent, resolve(), ResolvePipelineTest

### Community 46 - "CategoricalStrategy"
Cohesion: 0.38
Nodes (6): categorical(), CategoricalStrategy, AccessibleQualitative, BrandAnchored, EvenHue, CategoricalSwatch

### Community 47 - "OverrideMode"
Cohesion: 0.43
Nodes (6): Both, DarkOnly, T, LightOnly, OverrideMode, Split

### Community 48 - "MotionTokens"
Cohesion: 0.24
Nodes (7): MotionOverrides, MotionSpecPatch, applyMotionOverrides(), applyPatch(), deriveMotionTokens(), MotionTokens, roundtoint

### Community 49 - "generate_font_catalog.py"
Cohesion: 0.16
Nodes (14): BytesIO, csv, gzip, io, json, os, canonical_id(), main() (+6 more)

### Community 50 - ".get"
Cohesion: 0.19
Nodes (3): BaseNeutrals, BaseSchema, BaseTablesTest

### Community 51 - "calculateDerivationWeights"
Cohesion: 0.23
Nodes (10): DerivationConstants, calculateAccentChroma(), calculateDepthScale(), calculateDerivationWeights(), calculateEmphasisBoost(), calculateLightnessDelta(), calculateWeightBias(), lerp() (+2 more)

### Community 52 - "ThemeProfile"
Cohesion: 0.26
Nodes (10): toThemeProfile(), averageF(), blendDomainInfluence(), clamped(), combineDomainAndInteractions(), mergeOrNull(), weighted(), ThemeProfile (+2 more)

### Community 54 - "TokenContractsTest.kt"
Cohesion: 0.44
Nodes (10): BorderColors, ContentColors, FocusColors, GradientColors, IconColors, SelectionColors, StatusColors, colorTokens() (+2 more)

### Community 55 - "BasisTheme.kt"
Cohesion: 0.13
Nodes (17): readThemeOutside(), buildAmbient(), requireAmbient(), selectTheme(), BasisThemeAmbient, ResolutionReport, ResolvedTheme, ResolvedThemePair (+9 more)

### Community 56 - "BasisIssueRegistry.kt"
Cohesion: 0.60
Nodes (4): BasisIssueRegistry, current_api, IssueRegistry, Vendor

### Community 57 - "FontCatalogReader"
Cohesion: 0.24
Nodes (6): FontCatalogReader, bufferedinputstream, ByteArray, DataInputStream, gzipinputstream, inputstream

### Community 58 - "GoogleFontCatalog"
Cohesion: 0.18
Nodes (5): GoogleFontCatalog, content_affinity_floor, metadata_affinity_pool_floor, structure_affinity_floor, top_candidate_pool_size

### Community 59 - "test"
Cohesion: 0.21
Nodes (6): assertthat, VersionCatalogUsageTest, Config, files, lint, test

### Community 61 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 78 - "AGENTS Coding Guide"
Cohesion: 0.14
Nodes (17): AGENTS Coding Guide, Compliance Verification Gate, Conflict Resolution Policy, KDoc Documentation Standards, Basis Modular Architecture, Basis Public API Conventions, Testing Tasks & Execution, Basis Custom Detekt Ruleset (+9 more)

### Community 79 - "WalkFailure"
Cohesion: 0.38
Nodes (6): WalkFailure, KnobEntriesWalker, KnobWalkResult, KSClassDeclaration, KSValueParameter, Exception

### Community 81 - ".emit"
Cohesion: 0.27
Nodes (4): KnobEntriesEmitter, KnobEntriesModel, KnobEntry, KnobEntriesEmitterTest

### Community 82 - "DpValue"
Cohesion: 0.13
Nodes (7): DepthConversionsTest, DpConversionsTest, BasisTokenPathFamily, DpValue, scaled(), DepthSpec, dp

### Community 83 - "InteractionPattern"
Cohesion: 0.15
Nodes (12): InteractionPattern, AuthOnboarding, ChatMessaging, CheckoutCommerce, ContentFeed, ContentReading, DashboardMonitoring, DataNavigation (+4 more)

### Community 86 - "GoogleFontsCategory"
Cohesion: 0.25
Nodes (7): FontAxis, GoogleFontsCategory, Display, Handwriting, Monospace, SansSerif, Serif

### Community 87 - "BasisTokenPathFamilyProcessorProvider.kt"
Cohesion: 0.53
Nodes (4): BasisTokenPathFamilyProcessorProvider, SymbolProcessor, SymbolProcessorEnvironment, SymbolProcessorProvider

### Community 90 - ".instance"
Cohesion: 0.60
Nodes (3): BasisRuleSetProvider, RuleSet, RuleSetProvider

## Knowledge Gaps
- **110 isolated node(s):** `Light`, `Dark`, `EvenHue`, `BrandAnchored`, `AccessibleQualitative` (+105 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 411 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **69 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Oklch` connect `Oklch` to `DerivationWeights`, `DomainIntent`, `ThemeMode`, `ColorDerivation.kt`, `TokenSequence`, `TokenPathsTest.kt`, `ControlIntent`, `assertequals`, `CategoricalStrategy`, `IntentContractsTest.kt`, `ColorBases.kt`, `MoodIntent`, `DpValue`, `BrandPresence`, `TokenContractsTest.kt`, `BasisTheme.kt`, `ColorTokens`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `GoogleFontId` connect `GoogleFontId` to `TokenPathsTest.kt`, `ControlIntent`, `assertequals`, `IntentContractsTest.kt`, `MoodIntent`, `GoogleFontsCategory`, `TokenContractsTest.kt`, `FontCatalogReader`, `GoogleFontCatalog`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `DpValue` connect `DpValue` to `ScalarEnforcement.kt`, `TokenPathsTest.kt`, `ControlIntent`, `assertequals`, `.process`, `ResolutionContext`, `BasisIntent`, `IntentContractsTest.kt`, `ScalarDerivation.kt`, `.get`, `TokenContractsTest.kt`, `BasisTheme.kt`, `EasingKind`, `TokenOverrides`, `ColorTokens`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Are the 58 inferred relationships involving `resolve()` (e.g. with `.deriveColorsFalseYieldsAchromaticNeutralsAndBrand()` and `.deriveColorsTrueWithFinanceDomainYieldsNearFinanceHue()`) actually correct?**
  _`resolve()` has 58 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `Oklch` (e.g. with `categorical()` and `.toArgb_blackAndWhite()`) actually correct?**
  _`Oklch` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Light`, `Dark`, `EvenHue` to the rest of the system?**
  _110 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SpOnlyFontSizeDetector.kt` be split into smaller, more focused modules?**
  _Cohesion score 0.06033182503770739 - nodes in this community are weakly interconnected._