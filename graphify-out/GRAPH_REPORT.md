# Graph Report - basis  (2026-10-16)

## Corpus Check
- 31 files · ~115,988 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1370 nodes · 2989 edges · 91 communities (67 shown, 24 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 113 edges (avg confidence: 0.85)
- Token cost: 1,200 input · 450 output

## Community Hubs (Navigation)
- Linear sRGB & Gamut Mapping
- Token Path KSP Code Generator
- Mood Intent & Knob Entries
- Font Catalog & Pipeline Resolution
- Sp Font Size Lint Detector
- Override Stages Integration
- Oklch Color Space Conversions
- Prior Biases & Aesthetic Weights
- Motion Derivation & Constraint Enforcement
- Project Standards & Verification Gate
- Scalar Derivation & Token Scaling
- Path Override Dispatch Engine
- Color Contrast Repair & Enforcement
- Domain Intent & Interaction Patterns
- Normalized Intent & Resolution Tests
- Oklch Gradients & Typography Values
- Working Theme & Resolved Theme Models
- Font Role Planning & Resolution Report
- Font Control & Component Overrides
- Motion Easing & Spring Kinds
- Lint & Seed Test Assertions
- Basis Intent & Identity Models
- Basis Seed Tables Catalog
- Categorical Color Generation
- Typography Overrides Application
- Detekt Version Catalog Rule
- Font Catalog Generator Script
- Depth & Scalar Patch Application
- Font Catalog Entry Models
- Intent Normalization & Validation
- Token Path Naming & Formatting
- Gradle JVM & Android Config
- Scalar & Surface Overrides
- Typography Overrides & Role Patches
- Detekt Blank Line Before Return
- GitHub Issue Templates & Concepts
- Detekt Blank Line Last Statement Tests
- Theme Mode Color Overrides
- Intent Validation Checks
- Prior Vector Blending
- Google Font Catalog Reader & Loader
- Detekt Blank Line Last Statement Rule
- Detekt Mandatory Braces Rule
- Detekt Blank Line Return Tests
- Mode Controls & Generation
- Constraints Control & Validation
- Token Dimension Types
- Override Mode Scoping
- Motion Overrides Application
- Component Visual Treatments
- Size Tokens Definition
- Detekt Mandatory Braces Tests
- Detekt Version Catalog Tests
- Token KSP Processor Provider
- Basis Lint Issue Registry
- Color Spec Models
- UI Component Definitions
- Prominence Tiers
- Detekt RuleSet Provider
- Gradient Direction Kinds
- Gradle Wrapper Scripts
- Inline Validation Scripts
- Ktlint Gradle Conventions
- Git Commit Message Hook
- Git Pre-Commit Hook
- Git Pre-Push Hook
- Components Build Script
- Mood Profile Ref
- Detekt Rules Build Script
- Build Logic Gradle Config
- Build Logic Settings Config
- Demo App Build Script
- GitHub Blank Issues Config
- Root Settings Config
- Domain Interaction Patterns
- Depth & Elevation Conversions
- Dp & Dimension Conversions
- Oklch Color Conversion Unit Tests
- Dp Conversion Unit Tests
- Color Specifications & Formats
- CompositionLocal Theme Provider
- Oklch Color Specification

## God Nodes (most connected - your core abstractions)
1. `resolve()` - 39 edges
2. `ResolvePipelineTest` - 31 edges
3. `BasisTheme()` - 29 edges
4. `FontFamilyRegistry` - 22 edges
5. `DpValue` - 21 edges
6. `resolveMode()` - 21 edges
7. `ColorTokens` - 20 edges
8. `applyOverrides()` - 19 edges
9. `SpOnlyFontSizeDetector` - 18 edges
10. `WalkFailure` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Git Branch and Conventional Commit Workflow` --implemented_by--> `Branch Name Lint Workflow`  [INFERRED]
  CONTRIBUTING.md → .github/workflows/branch-name-lint.yml
- `Git Branch and Conventional Commit Workflow` --implemented_by--> `PR Title Lint Workflow`  [INFERRED]
  CONTRIBUTING.md → .github/workflows/pr-title-lint.yml
- `Binary Compatibility Validation` --enforces--> `Basis Public API Conventions`  [INFERRED]
  CONTRIBUTING.md → AGENTS.md
- `VersionCatalogUsageTest` --calls--> `VersionCatalogUsage`  [INFERRED]
  build-logic/basis-detekt-rules/src/test/kotlin/io/github/alph_a07/basis/detekt/VersionCatalogUsageTest.kt → build-logic/basis-detekt-rules/src/main/kotlin/io/github/alph_a07/basis/detekt/VersionCatalogUsage.kt
- `priorAesthetic()` --calls--> `PriorAesthetic`  [INFERRED]
  basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/resolution/domain/PriorCoupling.kt → basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/resolution/domain/PriorBiases.kt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Atomic Design Component Composition Hierarchy** — github_issue_template_new_atom_atom_concept, github_issue_template_new_molecule_molecule_concept, github_issue_template_new_component_component_concept [INFERRED]
- **Contribution Governance and Automated Workflow Triage** — github_workflows_branch_name_lint_workflow, github_workflows_pr_title_lint_workflow, github_workflows_label_pull_requests_workflow, github_pull_request_template_pr_template [INFERRED]
- **Continuous Verification and Quality Gate Pipeline** — github_workflows_ci_ci_pipeline, contributing_verify_all, config_detekt_detekt_configuration, contributing_binary_compatibility_validation [INFERRED]

## Communities (91 total, 24 thin omitted)

### Community 0 - "Linear sRGB & Gamut Mapping"
Cohesion: 0.07
Nodes (71): safeOklch(), mixOklch(), GradientDirection, AngleDeg, Horizontal, Vertical, OklchGradient, OklchStop (+63 more)

### Community 1 - "Token Path KSP Code Generator"
Cohesion: 0.05
Nodes (40): BasisTokenPathFamilyProcessor, KSClassDeclaration, SymbolProcessor, BasisTokenPathFamilyProcessorProvider, SymbolProcessor, FamilyEmitter, FamilyModel, PathMember (+32 more)

### Community 2 - "Mood Intent & Knob Entries"
Cohesion: 0.07
Nodes (47): assertnull, clamped(), clampKnob(), dedupedCandidates(), excessSupportingColorCount(), hasPresenceWithoutBrand(), isWellFormed(), FontFamilyRef (+39 more)

### Community 3 - "Font Catalog & Pipeline Resolution"
Cohesion: 0.08
Nodes (44): applyFontPlan(), clamp(), clampWeight(), FontRolePlan, TypographyTokenPath, TypographyTokens, offsetWeight(), roundedWeight() (+36 more)

### Community 4 - "Sp Font Size Lint Detector"
Cohesion: 0.06
Nodes (28): Detector, Issue, SpOnlyFontSizeDetector, UElementHandler, Detector, Issue, SpOnlyFontSizeDetectorTest, category (+20 more)

### Community 5 - "Override Stages Integration"
Cohesion: 0.06
Nodes (35): assertfalse, LinearSrgb, contrastRatio(), gamutMapped(), hueTowards(), isInGamut(), Oklch, relativeLuminance() (+27 more)

### Community 6 - "Oklch Color Space Conversions"
Cohesion: 0.25
Nodes (16): enforceConstraints(), EnforcementResult, WorkingTheme, clamped(), clampRadius(), clampSpacing(), enforceControlSizes(), DpValue (+8 more)

### Community 7 - "Prior Biases & Aesthetic Weights"
Cohesion: 0.09
Nodes (18): AutoCloseable, InjectedRegistry, ReporterParams, TaskFailureEntry, VerificationReporter, VerificationTracePrinter, BuildEventsListenerRegistry, BuildService (+10 more)

### Community 8 - "Motion Derivation & Constraint Enforcement"
Cohesion: 0.15
Nodes (38): applyColorPath(), applyDepthPath(), applyDpPath(), applyMotionPath(), applyPath(), applyPathOverrides(), applyTypographyPath(), ContentType (+30 more)

### Community 9 - "Project Standards & Verification Gate"
Cohesion: 0.12
Nodes (13): ProductDomain, Commerce, Education, Finance, Health, Media, Other, Productivity (+5 more)

### Community 10 - "Scalar Derivation & Token Scaling"
Cohesion: 0.17
Nodes (18): ColorModulators, deriveDepthTokens(), deriveRadiusTokens(), deriveSizeTokens(), deriveSpacingTokens(), ScalarModulators, deriveTypographyTokens(), TypographyModulators (+10 more)

### Community 11 - "Path Override Dispatch Engine"
Cohesion: 0.10
Nodes (18): DefaultFontBias, FontRolePlan, TypographyTokenPath, FontAssignmentReport, ReportEntry, ReportStatus, Absent, Honored (+10 more)

### Community 12 - "Color Contrast Repair & Enforcement"
Cohesion: 0.12
Nodes (21): avatarsizes, DepthSpec, DepthTokens, RadiusTokens, SizeTokens, SpacingTokens, scaled(), DepthTokens (+13 more)

### Community 13 - "Domain Intent & Interaction Patterns"
Cohesion: 0.16
Nodes (14): EmValue, LineHeightValue, ContentTypeOverrides, MetadataTypeOverrides, StructureTypeOverrides, TypeRolePatch, TypographyTokenOverrides, ContentType (+6 more)

### Community 14 - "Normalized Intent & Resolution Tests"
Cohesion: 0.18
Nodes (15): FontWeightValue, FontControl, FontFeatureSpec, WeightClamp, ComponentId, ComponentOverride, ComponentOverrides, ComponentStylePatch (+7 more)

### Community 15 - "Oklch Gradients & Typography Values"
Cohesion: 0.09
Nodes (27): AnimationSpec, BasisMotionLocals, toAnimationSpec(), toBasisMotionLocals(), toComposeEasing(), toFiniteAnimationSpec(), MotionConversionsTest, deriveMotionTokens() (+19 more)

### Community 16 - "Working Theme & Resolved Theme Models"
Cohesion: 0.22
Nodes (8): ThemeMode, Dark, Light, forMode(), T, WorkingTheme, ResolvedTheme, RadiusTokens

### Community 17 - "Font Role Planning & Resolution Report"
Cohesion: 0.33
Nodes (7): DomainIntent, MoodIntent, MoodKnobs, blendPriorVectors(), basis_theme_src_main_kotlin_io_github_alph_a07_basis_theme_resolution_domain_priorseed_priorgain, assertNear(), DomainMoodProjectionTest

### Community 18 - "Font Control & Component Overrides"
Cohesion: 0.48
Nodes (6): AvatarSizes, ControlSizes, DotSizes, IconSizes, SizeTokens, sizeTokens()

### Community 19 - "Motion Easing & Spring Kinds"
Cohesion: 0.17
Nodes (13): abs, assertequals, assertfailswith, assertnotnull, assertsame, asserttrue, DepthConversionsTest, color (+5 more)

### Community 20 - "Lint & Seed Test Assertions"
Cohesion: 0.13
Nodes (9): BasisIntent, BrandPresence, Balanced, Dominant, Strong, Subtle, IdentityIntent, TypographyIdentity (+1 more)

### Community 21 - "Basis Intent & Identity Models"
Cohesion: 0.18
Nodes (7): BasisSeedTables, NeutralSeed, StatusSeed, TypeSeedMetrics, MotionTokens, DepthSpec, SeedCatalogTest

### Community 22 - "Basis Seed Tables Catalog"
Cohesion: 0.27
Nodes (13): applyOverrides(), applyPatch(), applyTypographyOverrides(), ContentType, MetadataType, StructureType, TokenOverrides, TypeRole (+5 more)

### Community 23 - "Categorical Color Generation"
Cohesion: 0.26
Nodes (14): applyDepthOverrides(), applyPatch(), applyRadiusOverrides(), applySpacingOverrides(), DepthSpec, DepthTokens, RadiusTokens, SpacingTokens (+6 more)

### Community 24 - "Typography Overrides Application"
Cohesion: 0.22
Nodes (9): Rule, VersionCatalogUsage, debt, issue, KtBinaryExpression, KtCallExpression, ktnamereferenceexpression, ktstringtemplateexpression (+1 more)

### Community 25 - "Detekt Version Catalog Rule"
Cohesion: 0.22
Nodes (6): enumNameFor(), memberNameFor(), paramNameFor(), pathFor(), wrapKdocParagraph(), PathNamingTest

### Community 26 - "Font Catalog Generator Script"
Cohesion: 0.23
Nodes (8): applicationextension, applyJvmRelease(), javaReleaseOf(), resolveJvmTargetFrom(), CompileOptions, detekt, detektextension, libraryextension

### Community 27 - "Depth & Scalar Patch Application"
Cohesion: 0.15
Nodes (13): DurationValue, EasingKind, Accelerate, Decelerate, Emphasized, Linear, Spring, Standard (+5 more)

### Community 28 - "Font Catalog Entry Models"
Cohesion: 0.17
Nodes (10): SurfaceColorOverrides, AvatarSizeOverrides, ControlSizeOverrides, DepthOverrides, DepthSpecPatch, DotSizeOverrides, IconSizeOverrides, LevelSpacingOverrides (+2 more)

### Community 29 - "Intent Normalization & Validation"
Cohesion: 0.18
Nodes (8): PriorAesthetic, PriorSeedBiases, PriorStructural, AestheticWeights, priorAesthetic(), priorStructural(), StructuralWeights, MoodProfile

### Community 30 - "Token Path Naming & Formatting"
Cohesion: 0.10
Nodes (35): atan2, BasisBorderColors, BasisBrandColors, BasisColorLocals, BasisContentColors, BasisFocusColors, BasisIconColors, BasisSelectionColors (+27 more)

### Community 31 - "Gradle JVM & Android Config"
Cohesion: 0.30
Nodes (7): BlankLineBeforeReturn, Rule, KtExpression, ktifexpression, KtReturnExpression, ktwhenentry, psiwhitespace

### Community 32 - "Scalar & Surface Overrides"
Cohesion: 0.23
Nodes (12): Report or Request Issue Template, Issue Auto-Labeling Workflow, Atom UI Concept, New Atom Issue Template, Component UI Concept, New Component Issue Template, Molecule UI Concept, New Molecule Issue Template (+4 more)

### Community 33 - "Typography Overrides & Role Patches"
Cohesion: 0.18
Nodes (9): BasisKnobEntries, MoodPreset, Bold, Calm, Expressive, Minimal, Neutral, Playful (+1 more)

### Community 34 - "Detekt Blank Line Before Return"
Cohesion: 0.29
Nodes (7): KtElement, Rule, MandatoryBraces, codesmell, Entity, KtLoopExpression, KtTryExpression

### Community 36 - "Detekt Blank Line Last Statement Tests"
Cohesion: 0.20
Nodes (9): BorderColorOverrides, BrandColorOverrides, ColorTokenOverrides, ContentColorOverrides, FocusColorOverrides, GradientColorOverrides, IconColorOverrides, SelectionColorOverrides (+1 more)

### Community 37 - "Theme Mode Color Overrides"
Cohesion: 0.42
Nodes (9): isUnspecified(), MoodKnobs, MoodProfile, PriorAesthetic, moodBaseVector(), overlayMoodKnobs(), resolveMood(), stackMoodAesthetic() (+1 more)

### Community 38 - "Intent Validation Checks"
Cohesion: 0.31
Nodes (8): NeutralTargets, BrandPresence, FontRolePlan, Oklch, ThemeMode, WorkingTheme, seedWorkingTheme(), BasisSeedTables

### Community 39 - "Prior Vector Blending"
Cohesion: 0.36
Nodes (5): BlankLineBeforeLastStatement, KtElement, Rule, KtBlockExpression, KtFile

### Community 40 - "Google Font Catalog Reader & Loader"
Cohesion: 0.15
Nodes (12): ContentDefault, ContentInverse, ContentMuted, Explicit, TypeColorRef, composable, createcomposerule, customfontkey (+4 more)

### Community 41 - "Detekt Blank Line Last Statement Rule"
Cohesion: 0.50
Nodes (6): ConstraintsControl, ContrastConstraint, MinMaxLevels, MotionConstraint, TouchTargetConstraint, TypographyConstraints

### Community 42 - "Detekt Mandatory Braces Rule"
Cohesion: 0.11
Nodes (18): AssetManager, AssetFont, CustomFontKey, FontFamily, FontStyle, FontWeight, loadFontFamilyFromAssets(), registerAsset() (+10 more)

### Community 43 - "Detekt Blank Line Return Tests"
Cohesion: 0.31
Nodes (8): MoodProfile, PriorStructural, PriorVector, lerp(), ModulatorConstants, projectMoodModulators(), buildContext(), prioraesthetic

### Community 45 - "Constraints Control & Validation"
Cohesion: 0.11
Nodes (3): BasisThemeTest, ColorConversionsTest, TypographyConversionsTest

### Community 46 - "Token Dimension Types"
Cohesion: 0.38
Nodes (6): categorical(), CategoricalStrategy, AccessibleQualitative, BrandAnchored, EvenHue, CategoricalSwatch

### Community 47 - "Override Mode Scoping"
Cohesion: 0.43
Nodes (6): Both, DarkOnly, T, LightOnly, OverrideMode, Split

### Community 48 - "Motion Overrides Application"
Cohesion: 0.52
Nodes (6): applyMotionOverrides(), applyPatch(), MotionSpec, MotionTokens, TokenOverrides, MotionSpecPatch

### Community 49 - "Component Visual Treatments"
Cohesion: 0.25
Nodes (5): ModeControl, ModeGeneration, DarkOnly, LightOnly, Pair

### Community 50 - "Size Tokens Definition"
Cohesion: 0.33
Nodes (6): Treatment, Fill, Ghost, Inverse, Outline, Soft

### Community 51 - "Detekt Mandatory Braces Tests"
Cohesion: 0.25
Nodes (7): Color, Depth, Dp, Motion, OverrideValue, Typography, TokenOverrides

### Community 52 - "Detekt Version Catalog Tests"
Cohesion: 0.43
Nodes (7): clamped(), clampedAxis(), PriorAesthetic, PriorStructural, PriorVector, priorSeedBiases(), scaled()

### Community 55 - "Color Spec Models"
Cohesion: 0.21
Nodes (19): readThemeOutside(), BasisTheme(), buildAmbient(), requireAmbient(), selectTheme(), BasisThemeAmbient, BasisIntent, colors (+11 more)

### Community 56 - "UI Component Definitions"
Cohesion: 0.60
Nodes (4): BasisIssueRegistry, current_api, IssueRegistry, Vendor

### Community 57 - "Prominence Tiers"
Cohesion: 0.40
Nodes (5): Button, ComponentExtraPatch, Dialog, Switch, TextField

### Community 58 - "Detekt RuleSet Provider"
Cohesion: 0.40
Nodes (5): ProminenceTier, Primary, Quiet, Secondary, Tertiary

### Community 59 - "Gradient Direction Kinds"
Cohesion: 0.26
Nodes (7): assertthat, BasisRuleSetProvider, Config, files, lint, RuleSet, RuleSetProvider

### Community 60 - "Gradle Wrapper Scripts"
Cohesion: 0.16
Nodes (12): PriorGain, SPECIFIED, UNSPECIFIED, ThemeMode, ResolutionContext, domainReportEntries(), fontReport(), ReportEntry (+4 more)

### Community 61 - "Inline Validation Scripts"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 78 - "Build Logic Gradle Config"
Cohesion: 0.14
Nodes (17): AGENTS Coding Guide, Compliance Verification Gate, Conflict Resolution Policy, KDoc Documentation Standards, Basis Modular Architecture, Basis Public API Conventions, Testing Tasks & Execution, Basis Custom Detekt Ruleset (+9 more)

### Community 79 - "Build Logic Settings Config"
Cohesion: 0.17
Nodes (6): Builder, fontRegistry(), CustomFontKey, FontFamily, FontFamilyRegistryTest, FontFamilyRef

### Community 80 - "Demo App Build Script"
Cohesion: 0.33
Nodes (14): BasisContentType, BasisMetadataType, BasisStructureType, BasisTypographyLocals, toBasisContentType(), toBasisMetadataType(), toBasisStructureType(), toBasisTypographyLocals() (+6 more)

### Community 81 - "GitHub Blank Issues Config"
Cohesion: 0.27
Nodes (9): CustomFontKey, FontFamily, FontStyle, FontWeight, loadFontFamilyFromResource(), registerResource(), ResourceFont, ResourceFontTest (+1 more)

### Community 82 - "Root Settings Config"
Cohesion: 0.20
Nodes (7): BasisTokenPathFamily, Oklch, DpValue, DepthTokens, SpacingTokens, theme(), TokenContractsTest

### Community 83 - "Domain Interaction Patterns"
Cohesion: 0.17
Nodes (12): InteractionPattern, AuthOnboarding, ChatMessaging, CheckoutCommerce, ContentFeed, ContentReading, DashboardMonitoring, DataNavigation (+4 more)

### Community 84 - "Depth & Elevation Conversions"
Cohesion: 0.47
Nodes (5): Color, Dp, toElevationDp(), toShadowColor(), depthspec

### Community 85 - "Dp & Dimension Conversions"
Cohesion: 0.60
Nodes (4): Dp, toDp(), toDpValue(), DpValue

### Community 88 - "Color Specifications & Formats"
Cohesion: 0.50
Nodes (4): Argb, ColorSpec, Hex, Hsl

## Knowledge Gaps
- **129 isolated node(s):** `TokenValueTypes`, `ColorModulators`, `FontAssignmentReport`, `Catalog`, `Custom` (+124 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 334 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `FamilyEmitterTest` connect `Token Path KSP Code Generator` to `Motion Easing & Spring Kinds`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `ColorTokens` connect `Linear sRGB & Gamut Mapping` to `Working Theme & Resolved Theme Models`, `Domain Intent & Interaction Patterns`, `Detekt Blank Line Last Statement Tests`, `Override Stages Integration`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Are the 30 inferred relationships involving `resolve()` (e.g. with `.enforceContrastRepairsOwnedPairsInWorkingTheme()` and `.a11yFirstEnforcesFloorsAndReportsRepairs()`) actually correct?**
  _`resolve()` has 30 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `BasisTheme()` (e.g. with `.basisTheme_accessors_returnNonNullValues()` and `.basisTheme_registeredCustomFont_resolvesWithoutError()`) actually correct?**
  _`BasisTheme()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **What connects `TokenValueTypes`, `ColorModulators`, `FontAssignmentReport` to the rest of the system?**
  _129 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Linear sRGB & Gamut Mapping` be split into smaller, more focused modules?**
  _Cohesion score 0.06749027682452528 - nodes in this community are weakly interconnected._
- **Should `Token Path KSP Code Generator` be split into smaller, more focused modules?**
  _Cohesion score 0.05389942788316772 - nodes in this community are weakly interconnected._