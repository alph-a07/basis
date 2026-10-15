# Graph Report - basis  (2026-10-15)

## Corpus Check
- 12 files · ~108,541 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1262 nodes · 2650 edges · 83 communities (57 shown, 26 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

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
- Font Role Plan Ref
- Mood Profile Ref
- Typography Token Path Ref
- Basis Intent Ref
- Theme Mode Ref
- Working Theme Ref
- IO Package Ref
- GitHub Blank Issues Config

## God Nodes (most connected - your core abstractions)
1. `resolve()` - 57 edges
2. `ResolvePipelineTest` - 31 edges
3. `FontAssignmentTest` - 25 edges
4. `DpValue` - 21 edges
5. `ColorTokens` - 20 edges
6. `applyOverrides()` - 19 edges
7. `SpOnlyFontSizeDetector` - 18 edges
8. `WalkFailure` - 17 edges
9. `safeOklch()` - 17 edges
10. `ControlIntent` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Compliance Verification Gate` --semantically_similar_to--> `VerifyAll Quality Gate`  [INFERRED] [semantically similar]
  AGENTS.md → CONTRIBUTING.md
- `Git Branch and Conventional Commit Workflow` --implemented_by--> `Branch Name Lint Workflow`  [INFERRED]
  CONTRIBUTING.md → .github/workflows/branch-name-lint.yml
- `Git Branch and Conventional Commit Workflow` --implemented_by--> `PR Title Lint Workflow`  [INFERRED]
  CONTRIBUTING.md → .github/workflows/pr-title-lint.yml
- `Binary Compatibility Validation` --enforces--> `Basis Public API Conventions`  [INFERRED]
  CONTRIBUTING.md → AGENTS.md
- `VersionCatalogUsageTest` --calls--> `VersionCatalogUsage`  [INFERRED]
  build-logic/basis-detekt-rules/src/test/kotlin/io/github/alph_a07/basis/detekt/VersionCatalogUsageTest.kt → build-logic/basis-detekt-rules/src/main/kotlin/io/github/alph_a07/basis/detekt/VersionCatalogUsage.kt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Atomic Design Component Composition Hierarchy** — github_issue_template_new_atom_atom_concept, github_issue_template_new_molecule_molecule_concept, github_issue_template_new_component_component_concept [INFERRED]
- **Contribution Governance and Automated Workflow Triage** — github_workflows_branch_name_lint_workflow, github_workflows_pr_title_lint_workflow, github_workflows_label_pull_requests_workflow, github_pull_request_template_pr_template [INFERRED]
- **Continuous Verification and Quality Gate Pipeline** — github_workflows_ci_ci_pipeline, contributing_verify_all, config_detekt_detekt_configuration, contributing_binary_compatibility_validation [INFERRED]

## Communities (83 total, 26 thin omitted)

### Community 0 - "Linear sRGB & Gamut Mapping"
Cohesion: 0.06
Nodes (77): LinearSrgb, safeOklch(), gamutMapped(), hueTowards(), isInGamut(), Oklch, mixOklch(), relativeLuminance() (+69 more)

### Community 1 - "Token Path KSP Code Generator"
Cohesion: 0.06
Nodes (36): BasisTokenPathFamilyProcessor, KSClassDeclaration, SymbolProcessor, FamilyEmitter, FamilyModel, PathMember, TokenValueTypes, FamilyConfig (+28 more)

### Community 2 - "Mood Intent & Knob Entries"
Cohesion: 0.06
Nodes (47): BasisKnobEntries, DomainIntent, MoodIntent, MoodKnobs, MoodPreset, Bold, Calm, Expressive (+39 more)

### Community 3 - "Font Catalog & Pipeline Resolution"
Cohesion: 0.07
Nodes (6): contrastRatio(), ControlIntent, GoogleFontCatalog, resolve(), FontAssignmentTest, ResolvePipelineTest

### Community 4 - "Sp Font Size Lint Detector"
Cohesion: 0.06
Nodes (28): Detector, Issue, SpOnlyFontSizeDetector, UElementHandler, Detector, Issue, SpOnlyFontSizeDetectorTest, category (+20 more)

### Community 5 - "Override Stages Integration"
Cohesion: 0.07
Nodes (43): applycoloroverrides, applydepthoverrides, applyfontplan, applymotionoverrides, applypathoverrides, applyradiusoverrides, applyspacingoverrides, applytypographyoverrides (+35 more)

### Community 6 - "Oklch Color Space Conversions"
Cohesion: 0.08
Nodes (38): atan2, argbToOklch(), channel(), hexToOklch(), hslToOklch(), hueSector(), Oklch, srgbToOklch() (+30 more)

### Community 7 - "Prior Biases & Aesthetic Weights"
Cohesion: 0.11
Nodes (32): abs, PriorAesthetic, PriorSeedBiases, PriorStructural, AestheticWeights, priorAesthetic(), priorStructural(), StructuralWeights (+24 more)

### Community 8 - "Motion Derivation & Constraint Enforcement"
Cohesion: 0.08
Nodes (36): deriveMotionTokens(), MotionTokens, enforceConstraints(), EnforcementResult, WorkingTheme, biased(), enforceMotion(), MotionSpec (+28 more)

### Community 9 - "Project Standards & Verification Gate"
Cohesion: 0.07
Nodes (31): AGENTS Coding Guide, Compliance Verification Gate, Conflict Resolution Policy, KDoc Documentation Standards, Basis Modular Architecture, Basis Public API Conventions, AutoCloseable, InjectedRegistry (+23 more)

### Community 10 - "Scalar Derivation & Token Scaling"
Cohesion: 0.08
Nodes (34): avatarsizes, deriveDepthTokens(), deriveRadiusTokens(), deriveSizeTokens(), deriveSpacingTokens(), DepthSpec, DepthTokens, RadiusTokens (+26 more)

### Community 11 - "Path Override Dispatch Engine"
Cohesion: 0.15
Nodes (38): applyColorPath(), applyDepthPath(), applyDpPath(), applyMotionPath(), applyPath(), applyPathOverrides(), applyTypographyPath(), ContentType (+30 more)

### Community 12 - "Color Contrast Repair & Enforcement"
Cohesion: 0.15
Nodes (18): assertfalse, ContrastRepairResult, Oklch, liftLightness(), meetsContrast(), repairContrast(), ContrastPair, enforceContrast() (+10 more)

### Community 13 - "Domain Intent & Interaction Patterns"
Cohesion: 0.08
Nodes (24): InteractionPattern, AuthOnboarding, ChatMessaging, CheckoutCommerce, ContentFeed, ContentReading, DashboardMonitoring, DataNavigation (+16 more)

### Community 14 - "Normalized Intent & Resolution Tests"
Cohesion: 0.11
Nodes (20): assertnotnull, assertnull, FontFamilyRef, NormalizedIntent, BasisIntent, brandpresence, componentid, componentoverride (+12 more)

### Community 15 - "Oklch Gradients & Typography Values"
Cohesion: 0.17
Nodes (17): Oklch, OklchGradient, OklchStop, EmValue, FontWeightValue, LineHeightValue, CustomFontKey, GoogleFontId (+9 more)

### Community 16 - "Working Theme & Resolved Theme Models"
Cohesion: 0.17
Nodes (11): BasisTokenPathFamily, DpValue, WorkingTheme, ResolvedTheme, DepthSpec, DepthTokens, RadiusTokens, SizeTokens (+3 more)

### Community 17 - "Font Role Planning & Resolution Report"
Cohesion: 0.13
Nodes (15): FontRolePlan, TypographyTokenPath, FontAssignmentReport, ReportEntry, ReportStatus, Absent, Honored, Modulated (+7 more)

### Community 18 - "Font Control & Component Overrides"
Cohesion: 0.24
Nodes (15): FontControl, FontFeatureSpec, WeightClamp, ComponentId, ComponentOverride, ComponentOverrides, ComponentStylePatch, StateId (+7 more)

### Community 19 - "Motion Easing & Spring Kinds"
Cohesion: 0.14
Nodes (15): DurationValue, EasingKind, Accelerate, Decelerate, Emphasized, Linear, Spring, Standard (+7 more)

### Community 20 - "Lint & Seed Test Assertions"
Cohesion: 0.24
Nodes (8): assertequals, assertfailswith, assertthat, asserttrue, Config, files, lint, test

### Community 21 - "Basis Intent & Identity Models"
Cohesion: 0.14
Nodes (9): BasisIntent, BrandPresence, Balanced, Dominant, Strong, Subtle, IdentityIntent, TypographyIdentity (+1 more)

### Community 22 - "Basis Seed Tables Catalog"
Cohesion: 0.19
Nodes (5): BasisSeedTables, NeutralSeed, StatusSeed, TypeSeedMetrics, SeedCatalogTest

### Community 23 - "Categorical Color Generation"
Cohesion: 0.18
Nodes (11): categorical(), CategoricalStrategy, AccessibleQualitative, BrandAnchored, EvenHue, CategoricalSwatch, ThemeMode, Dark (+3 more)

### Community 24 - "Typography Overrides Application"
Cohesion: 0.27
Nodes (13): applyOverrides(), applyPatch(), applyTypographyOverrides(), ContentType, MetadataType, StructureType, TokenOverrides, TypeRole (+5 more)

### Community 25 - "Detekt Version Catalog Rule"
Cohesion: 0.22
Nodes (9): Rule, VersionCatalogUsage, codesmell, debt, issue, KtBinaryExpression, KtCallExpression, ktnamereferenceexpression (+1 more)

### Community 26 - "Font Catalog Generator Script"
Cohesion: 0.18
Nodes (13): BytesIO, gzip, io, json, os, canonical_id(), main(), Generates the vendored Google Fonts catalog binary asset for basis-theme.… (+5 more)

### Community 27 - "Depth & Scalar Patch Application"
Cohesion: 0.29
Nodes (12): applyDepthOverrides(), applyPatch(), applyRadiusOverrides(), applySpacingOverrides(), DepthSpec, DepthTokens, RadiusTokens, SpacingTokens (+4 more)

### Community 28 - "Font Catalog Entry Models"
Cohesion: 0.18
Nodes (9): FontAxis, GoogleFontsCategory, Display, Handwriting, Monospace, SansSerif, Serif, FontCatalogReader (+1 more)

### Community 29 - "Intent Normalization & Validation"
Cohesion: 0.36
Nodes (12): deduped(), knobReportEntries(), BasisIntent, Oklch, ReportEntry, normalizeIntent(), presenceReportEntries(), supportingColors() (+4 more)

### Community 30 - "Token Path Naming & Formatting"
Cohesion: 0.22
Nodes (6): enumNameFor(), memberNameFor(), paramNameFor(), pathFor(), wrapKdocParagraph(), PathNamingTest

### Community 31 - "Gradle JVM & Android Config"
Cohesion: 0.23
Nodes (8): applicationextension, applyJvmRelease(), javaReleaseOf(), resolveJvmTargetFrom(), CompileOptions, detekt, detektextension, libraryextension

### Community 32 - "Scalar & Surface Overrides"
Cohesion: 0.17
Nodes (10): SurfaceColorOverrides, AvatarSizeOverrides, ControlSizeOverrides, DepthOverrides, DepthSpecPatch, DotSizeOverrides, IconSizeOverrides, LevelSpacingOverrides (+2 more)

### Community 33 - "Typography Overrides & Role Patches"
Cohesion: 0.17
Nodes (10): ContentTypeOverrides, MetadataTypeOverrides, StructureTypeOverrides, TypeRolePatch, TypographyTokenOverrides, ContentDefault, ContentInverse, ContentMuted (+2 more)

### Community 34 - "Detekt Blank Line Before Return"
Cohesion: 0.30
Nodes (7): BlankLineBeforeReturn, Rule, KtExpression, ktifexpression, KtReturnExpression, ktwhenentry, severity

### Community 35 - "GitHub Issue Templates & Concepts"
Cohesion: 0.23
Nodes (12): Report or Request Issue Template, Issue Auto-Labeling Workflow, Atom UI Concept, New Atom Issue Template, Component UI Concept, New Component Issue Template, Molecule UI Concept, New Molecule Issue Template (+4 more)

### Community 37 - "Theme Mode Color Overrides"
Cohesion: 0.20
Nodes (9): BorderColorOverrides, BrandColorOverrides, ColorTokenOverrides, ContentColorOverrides, FocusColorOverrides, GradientColorOverrides, IconColorOverrides, SelectionColorOverrides (+1 more)

### Community 38 - "Intent Validation Checks"
Cohesion: 0.24
Nodes (9): clamped(), clampKnob(), dedupedCandidates(), excessSupportingColorCount(), hasPresenceWithoutBrand(), isWellFormed(), FontFamilyRef, MoodKnobs (+1 more)

### Community 39 - "Prior Vector Blending"
Cohesion: 0.29
Nodes (8): averageF(), clamped(), combineGroups(), PriorVector, mergePriorsOrNull(), weighted(), interactionpattern, productdomain

### Community 40 - "Google Font Catalog Reader & Loader"
Cohesion: 0.22
Nodes (7): DefaultFontBias, FontFamilyRef, bufferedinputstream, datainputstream, GoogleFontId, gzipinputstream, inputstream

### Community 41 - "Detekt Blank Line Last Statement Rule"
Cohesion: 0.31
Nodes (6): BlankLineBeforeLastStatement, KtElement, Rule, KtBlockExpression, KtFile, psiwhitespace

### Community 42 - "Detekt Mandatory Braces Rule"
Cohesion: 0.33
Nodes (6): KtElement, Rule, MandatoryBraces, Entity, KtLoopExpression, KtTryExpression

### Community 44 - "Mode Controls & Generation"
Cohesion: 0.25
Nodes (5): ModeControl, ModeGeneration, DarkOnly, LightOnly, Pair

### Community 45 - "Constraints Control & Validation"
Cohesion: 0.43
Nodes (6): ConstraintsControl, ContrastConstraint, MinMaxLevels, MotionConstraint, TouchTargetConstraint, TypographyConstraints

### Community 46 - "Token Dimension Types"
Cohesion: 0.25
Nodes (7): Color, Depth, Dp, Motion, OverrideValue, Typography, TokenOverrides

### Community 47 - "Override Mode Scoping"
Cohesion: 0.43
Nodes (6): Both, DarkOnly, T, LightOnly, OverrideMode, Split

### Community 48 - "Motion Overrides Application"
Cohesion: 0.52
Nodes (6): applyMotionOverrides(), applyPatch(), MotionSpec, MotionTokens, TokenOverrides, MotionSpecPatch

### Community 49 - "Component Visual Treatments"
Cohesion: 0.33
Nodes (6): Treatment, Fill, Ghost, Inverse, Outline, Soft

### Community 50 - "Size Tokens Definition"
Cohesion: 0.53
Nodes (5): AvatarSizes, ControlSizes, DotSizes, IconSizes, sizeTokens()

### Community 53 - "Token KSP Processor Provider"
Cohesion: 0.53
Nodes (4): BasisTokenPathFamilyProcessorProvider, SymbolProcessor, SymbolProcessorEnvironment, SymbolProcessorProvider

### Community 54 - "Basis Lint Issue Registry"
Cohesion: 0.60
Nodes (4): BasisIssueRegistry, current_api, IssueRegistry, Vendor

### Community 55 - "Color Spec Models"
Cohesion: 0.40
Nodes (4): Argb, ColorSpec, Hex, Hsl

### Community 56 - "UI Component Definitions"
Cohesion: 0.40
Nodes (5): Button, ComponentExtraPatch, Dialog, Switch, TextField

### Community 57 - "Prominence Tiers"
Cohesion: 0.40
Nodes (5): ProminenceTier, Primary, Quiet, Secondary, Tertiary

### Community 58 - "Detekt RuleSet Provider"
Cohesion: 0.60
Nodes (3): BasisRuleSetProvider, RuleSet, RuleSetProvider

### Community 59 - "Gradient Direction Kinds"
Cohesion: 0.50
Nodes (4): GradientDirection, AngleDeg, Horizontal, Vertical

### Community 60 - "Gradle Wrapper Scripts"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

## Knowledge Gaps
- **134 isolated node(s):** `TokenValueTypes`, `ColorModulators`, `FontAssignmentReport`, `Catalog`, `Custom` (+129 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 325 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `FamilyEmitterTest` connect `Token Path KSP Code Generator` to `Lint & Seed Test Assertions`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `seedColorTokens()` connect `Linear sRGB & Gamut Mapping` to `Scalar Derivation & Token Scaling`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 49 inferred relationships involving `resolve()` (e.g. with `.enforceContrastRepairsOwnedPairsInWorkingTheme()` and `.anyCatalogFamilyCanBePinnedViaControl()`) actually correct?**
  _`resolve()` has 49 INFERRED edges - model-reasoned connections that need verification._
- **What connects `TokenValueTypes`, `ColorModulators`, `FontAssignmentReport` to the rest of the system?**
  _134 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Linear sRGB & Gamut Mapping` be split into smaller, more focused modules?**
  _Cohesion score 0.057852844107940206 - nodes in this community are weakly interconnected._
- **Should `Token Path KSP Code Generator` be split into smaller, more focused modules?**
  _Cohesion score 0.05964912280701754 - nodes in this community are weakly interconnected._
- **Should `Mood Intent & Knob Entries` be split into smaller, more focused modules?**
  _Cohesion score 0.058384547848990345 - nodes in this community are weakly interconnected._