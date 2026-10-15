# Graph Report - basis  (2026-10-15)

## Corpus Check
- 51 files · ~101,452 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1146 nodes · 2480 edges · 78 communities (58 shown, 20 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 87 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Color Token Path Overrides & Mixers
- Token Path KSP Code Generator
- Color Spec Models & Oklch Assertions
- Oklch Color Space Conversions
- Sp Font Size Lint Detector
- Linear sRGB & Gamut Mapping
- Color Contrast Repair & Enforcement
- Project Standards & Verification Gate
- Path Override Dispatch Engine
- Domain Intent & Interaction Patterns
- Color & Typography Modulators
- Font Role Planning & Resolution Report
- Scalar Tokens Derivation & Scaling
- Typography Token Path & Values
- Font Control & Component Overrides
- Motion Easing & Duration Values
- Theme Modes & Scoped Overrides
- Domain Mood Projection & Tests
- Oklch Gradients & Size Tokens
- Lint & Seed Test Assertions
- Basis Intent & Identity Models
- Basis Seed Tables Catalog
- Typography Overrides Application
- Depth & Scalar Patch Application
- Detekt Version Catalog Rule
- Token Path Naming & Formatting
- Gradle JVM & Android Config
- Motion Specs & Spring Physics
- Scalar & Surface Overrides
- Prior Biases & Aesthetic Weights
- Prior Vector Blending
- Detekt Blank Line Before Return
- GitHub Issue Templates & Concepts
- Mood Presets & Knob Entries
- Detekt Mandatory Braces Rule
- Detekt Blank Line Last Statement Tests
- Theme Mode Color Overrides
- Mood Knobs Projection & Profiles
- Neutral Targets & Working Theme
- Detekt Blank Line Last Statement Rule
- Type Color References & Overrides
- Constraints Control & Validation
- Scalar Derivation & Modulators
- Mood Modulators & Projections
- Detekt Blank Line Return Tests
- Knob Entries Code Generator
- Categorical Color Palettes
- Override Mode Scoping
- Motion Overrides Application
- Mode Generation Controls
- Component Visual Treatments
- Token Path Dimension Types
- Prior Seed Math & Clamping
- Detekt Mandatory Braces Tests
- Detekt Version Catalog Tests
- Token KSP Processor Provider
- Basis Lint Issue Registry
- UI Component Definitions
- Prominence Tiers
- Detekt RuleSet Provider
- Prior Gain Values
- Gradle Wrapper Scripts
- Inline Validation Scripts
- Ktlint Gradle Conventions
- Git Commit Message Hook
- Git Pre-Commit Hook
- Git Pre-Push Hook
- IO Package Ref
- GitHub Blank Issues Config

## God Nodes (most connected - your core abstractions)
1. `resolve()` - 39 edges
2. `ResolvePipelineTest` - 31 edges
3. `DpValue` - 21 edges
4. `resolveMode()` - 21 edges
5. `ColorTokens` - 20 edges
6. `applyOverrides()` - 19 edges
7. `SpOnlyFontSizeDetector` - 18 edges
8. `safeOklch()` - 17 edges
9. `WalkFailure` - 17 edges
10. `theme()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Compliance Verification Gate` --semantically_similar_to--> `VerifyAll Quality Gate`  [INFERRED] [semantically similar]
  AGENTS.md → CONTRIBUTING.md
- `Git Branch and Conventional Commit Workflow` --implemented_by--> `Branch Name Lint Workflow`  [INFERRED]
  CONTRIBUTING.md → .github/workflows/branch-name-lint.yml
- `Git Branch and Conventional Commit Workflow` --implemented_by--> `PR Title Lint Workflow`  [INFERRED]
  CONTRIBUTING.md → .github/workflows/pr-title-lint.yml
- `Binary Compatibility Validation` --enforces--> `Basis Public API Conventions`  [INFERRED]
  CONTRIBUTING.md → AGENTS.md
- `categorical()` --calls--> `Oklch`  [INFERRED]
  basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/core/color/Categorical.kt → basis-theme/src/main/kotlin/io/github/alph_a07/basis/theme/core/color/Oklch.kt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Atomic Design Component Composition Hierarchy** — github_issue_template_new_atom_atom_concept, github_issue_template_new_molecule_molecule_concept, github_issue_template_new_component_component_concept [INFERRED]
- **Contribution Governance and Automated Workflow Triage** — github_workflows_branch_name_lint_workflow, github_workflows_pr_title_lint_workflow, github_workflows_label_pull_requests_workflow, github_pull_request_template_pr_template [INFERRED]
- **Continuous Verification and Quality Gate Pipeline** — github_workflows_ci_ci_pipeline, contributing_verify_all, config_detekt_detekt_configuration, contributing_binary_compatibility_validation [INFERRED]

## Communities (78 total, 20 thin omitted)

### Community 0 - "Color Token Path Overrides & Mixers"
Cohesion: 0.07
Nodes (64): safeOklch(), mixOklch(), applyColorOverrides(), applyOverrides(), ColorTokenPath, T, ThemeMode, orOverride() (+56 more)

### Community 1 - "Token Path KSP Code Generator"
Cohesion: 0.07
Nodes (32): BasisTokenPathFamilyProcessor, KSClassDeclaration, SymbolProcessor, FamilyEmitter, FamilyModel, PathMember, TokenValueTypes, FamilyConfig (+24 more)

### Community 2 - "Color Spec Models & Oklch Assertions"
Cohesion: 0.06
Nodes (56): assertnotnull, assertnull, Argb, ColorSpec, Hex, Hsl, clamped(), clampKnob() (+48 more)

### Community 3 - "Oklch Color Space Conversions"
Cohesion: 0.07
Nodes (45): atan2, argbToOklch(), channel(), hexToOklch(), hslToOklch(), hueSector(), Oklch, srgbToOklch() (+37 more)

### Community 4 - "Sp Font Size Lint Detector"
Cohesion: 0.06
Nodes (28): Detector, Issue, SpOnlyFontSizeDetector, UElementHandler, Detector, Issue, SpOnlyFontSizeDetectorTest, category (+20 more)

### Community 5 - "Linear sRGB & Gamut Mapping"
Cohesion: 0.09
Nodes (16): abs, LinearSrgb, contrastRatio(), gamutMapped(), hueTowards(), isInGamut(), Oklch, relativeLuminance() (+8 more)

### Community 6 - "Color Contrast Repair & Enforcement"
Cohesion: 0.09
Nodes (36): assertfalse, ContrastRepairResult, Oklch, liftLightness(), meetsContrast(), repairContrast(), ContrastPair, enforceContrast() (+28 more)

### Community 7 - "Project Standards & Verification Gate"
Cohesion: 0.07
Nodes (31): AGENTS Coding Guide, Compliance Verification Gate, Conflict Resolution Policy, KDoc Documentation Standards, Basis Modular Architecture, Basis Public API Conventions, AutoCloseable, InjectedRegistry (+23 more)

### Community 8 - "Path Override Dispatch Engine"
Cohesion: 0.15
Nodes (38): applyColorPath(), applyDepthPath(), applyDpPath(), applyMotionPath(), applyPath(), applyPathOverrides(), applyTypographyPath(), ContentType (+30 more)

### Community 9 - "Domain Intent & Interaction Patterns"
Cohesion: 0.07
Nodes (25): InteractionPattern, AuthOnboarding, ChatMessaging, CheckoutCommerce, ContentFeed, ContentReading, DashboardMonitoring, DataNavigation (+17 more)

### Community 10 - "Color & Typography Modulators"
Cohesion: 0.13
Nodes (24): ColorModulators, deriveTypographyTokens(), TypographyModulators, brandAnchors(), io, MoodModulators, ThemeMode, ResolutionContext (+16 more)

### Community 11 - "Font Role Planning & Resolution Report"
Cohesion: 0.10
Nodes (18): DefaultFontBias, FontRolePlan, TypographyTokenPath, FontAssignmentReport, ReportEntry, ReportStatus, Absent, Honored (+10 more)

### Community 12 - "Scalar Tokens Derivation & Scaling"
Cohesion: 0.15
Nodes (18): avatarsizes, deriveDepthTokens(), DepthSpec, DepthTokens, scaled(), DepthTokens, io, RadiusTokens (+10 more)

### Community 13 - "Typography Token Path & Values"
Cohesion: 0.15
Nodes (16): BasisTokenPathFamily, DpValue, EmValue, FontWeightValue, LineHeightValue, ContentTypeOverrides, MetadataTypeOverrides, StructureTypeOverrides (+8 more)

### Community 14 - "Font Control & Component Overrides"
Cohesion: 0.16
Nodes (15): FontControl, FontFeatureSpec, WeightClamp, ComponentId, ComponentOverride, ComponentOverrides, ComponentStylePatch, StateId (+7 more)

### Community 15 - "Motion Easing & Duration Values"
Cohesion: 0.14
Nodes (17): EasingKind, Accelerate, Decelerate, Emphasized, Linear, Spring, Standard, deriveMotionTokens() (+9 more)

### Community 16 - "Theme Modes & Scoped Overrides"
Cohesion: 0.16
Nodes (13): ThemeMode, Dark, Light, forMode(), T, WorkingTheme, ResolvedTheme, DepthSpec (+5 more)

### Community 17 - "Domain Mood Projection & Tests"
Cohesion: 0.29
Nodes (8): DomainIntent, MoodIntent, MoodKnobs, PriorVector, basis_theme_src_main_kotlin_io_github_alph_a07_basis_theme_resolution_domain_priorseed_priorgain, priorSeedBiases(), assertNear(), DomainMoodProjectionTest

### Community 18 - "Oklch Gradients & Size Tokens"
Cohesion: 0.22
Nodes (14): GradientDirection, AngleDeg, Horizontal, Vertical, OklchGradient, OklchStop, AvatarSizes, ControlSizes (+6 more)

### Community 19 - "Lint & Seed Test Assertions"
Cohesion: 0.24
Nodes (8): assertequals, assertfailswith, assertthat, asserttrue, Config, files, lint, test

### Community 20 - "Basis Intent & Identity Models"
Cohesion: 0.13
Nodes (9): BasisIntent, BrandPresence, Balanced, Dominant, Strong, Subtle, IdentityIntent, TypographyIdentity (+1 more)

### Community 21 - "Basis Seed Tables Catalog"
Cohesion: 0.19
Nodes (5): BasisSeedTables, NeutralSeed, StatusSeed, TypeSeedMetrics, SeedCatalogTest

### Community 22 - "Typography Overrides Application"
Cohesion: 0.27
Nodes (13): applyOverrides(), applyPatch(), applyTypographyOverrides(), ContentType, MetadataType, StructureType, TokenOverrides, TypeRole (+5 more)

### Community 23 - "Depth & Scalar Patch Application"
Cohesion: 0.29
Nodes (12): applyDepthOverrides(), applyPatch(), applyRadiusOverrides(), applySpacingOverrides(), DepthSpec, DepthTokens, RadiusTokens, SpacingTokens (+4 more)

### Community 24 - "Detekt Version Catalog Rule"
Cohesion: 0.24
Nodes (8): Rule, VersionCatalogUsage, debt, KtBinaryExpression, KtCallExpression, ktnamereferenceexpression, ktstringtemplateexpression, severity

### Community 25 - "Token Path Naming & Formatting"
Cohesion: 0.22
Nodes (6): enumNameFor(), memberNameFor(), paramNameFor(), pathFor(), wrapKdocParagraph(), PathNamingTest

### Community 26 - "Gradle JVM & Android Config"
Cohesion: 0.23
Nodes (8): applicationextension, applyJvmRelease(), javaReleaseOf(), resolveJvmTargetFrom(), CompileOptions, detekt, detektextension, libraryextension

### Community 27 - "Motion Specs & Spring Physics"
Cohesion: 0.24
Nodes (8): DurationValue, MotionSpec, SpringParams, MotionOverrides, MotionSpecPatch, BasisSeedCatalog, MotionTokens, current

### Community 28 - "Scalar & Surface Overrides"
Cohesion: 0.17
Nodes (10): SurfaceColorOverrides, AvatarSizeOverrides, ControlSizeOverrides, DepthOverrides, DepthSpecPatch, DotSizeOverrides, IconSizeOverrides, LevelSpacingOverrides (+2 more)

### Community 29 - "Prior Biases & Aesthetic Weights"
Cohesion: 0.20
Nodes (8): PriorAesthetic, PriorSeedBiases, PriorStructural, AestheticWeights, priorAesthetic(), priorStructural(), StructuralWeights, MoodProfile

### Community 30 - "Prior Vector Blending"
Cohesion: 0.30
Nodes (11): averageF(), blendPriorVectors(), clamped(), combineGroups(), contributors(), PriorVector, mergePriorsOrNull(), weighted() (+3 more)

### Community 31 - "Detekt Blank Line Before Return"
Cohesion: 0.30
Nodes (7): BlankLineBeforeReturn, Rule, KtExpression, ktifexpression, KtReturnExpression, ktwhenentry, psiwhitespace

### Community 32 - "GitHub Issue Templates & Concepts"
Cohesion: 0.23
Nodes (12): Report or Request Issue Template, Issue Auto-Labeling Workflow, Atom UI Concept, New Atom Issue Template, Component UI Concept, New Component Issue Template, Molecule UI Concept, New Molecule Issue Template (+4 more)

### Community 33 - "Mood Presets & Knob Entries"
Cohesion: 0.18
Nodes (9): BasisKnobEntries, MoodPreset, Bold, Calm, Expressive, Minimal, Neutral, Playful (+1 more)

### Community 34 - "Detekt Mandatory Braces Rule"
Cohesion: 0.29
Nodes (7): KtElement, Rule, MandatoryBraces, codesmell, Entity, KtLoopExpression, KtTryExpression

### Community 36 - "Theme Mode Color Overrides"
Cohesion: 0.20
Nodes (9): BorderColorOverrides, BrandColorOverrides, ColorTokenOverrides, ContentColorOverrides, FocusColorOverrides, GradientColorOverrides, IconColorOverrides, SelectionColorOverrides (+1 more)

### Community 37 - "Mood Knobs Projection & Profiles"
Cohesion: 0.42
Nodes (9): isUnspecified(), MoodKnobs, MoodProfile, PriorAesthetic, moodBaseVector(), overlayMoodKnobs(), resolveMood(), stackMoodAesthetic() (+1 more)

### Community 38 - "Neutral Targets & Working Theme"
Cohesion: 0.31
Nodes (8): NeutralTargets, BrandPresence, FontRolePlan, Oklch, ThemeMode, WorkingTheme, seedWorkingTheme(), BasisSeedTables

### Community 39 - "Detekt Blank Line Last Statement Rule"
Cohesion: 0.31
Nodes (6): BlankLineBeforeLastStatement, KtElement, Rule, issue, KtBlockExpression, KtFile

### Community 40 - "Type Color References & Overrides"
Cohesion: 0.22
Nodes (7): Oklch, ContentDefault, ContentInverse, ContentMuted, Explicit, TypeColorRef, TypeRole

### Community 41 - "Constraints Control & Validation"
Cohesion: 0.50
Nodes (6): ConstraintsControl, ContrastConstraint, MinMaxLevels, MotionConstraint, TouchTargetConstraint, TypographyConstraints

### Community 42 - "Scalar Derivation & Modulators"
Cohesion: 0.22
Nodes (8): deriveRadiusTokens(), deriveSizeTokens(), deriveSpacingTokens(), RadiusTokens, SizeTokens, SpacingTokens, ScalarModulators, scalarModulators()

### Community 43 - "Mood Modulators & Projections"
Cohesion: 0.31
Nodes (8): MoodProfile, PriorStructural, PriorVector, lerp(), ModulatorConstants, projectMoodModulators(), prioraesthetic, roundtoint

### Community 45 - "Knob Entries Code Generator"
Cohesion: 0.31
Nodes (4): KnobEntriesEmitter, KnobEntriesModel, KnobEntry, KnobEntriesEmitterTest

### Community 46 - "Categorical Color Palettes"
Cohesion: 0.38
Nodes (6): categorical(), CategoricalStrategy, AccessibleQualitative, BrandAnchored, EvenHue, CategoricalSwatch

### Community 47 - "Override Mode Scoping"
Cohesion: 0.43
Nodes (6): Both, DarkOnly, T, LightOnly, OverrideMode, Split

### Community 48 - "Motion Overrides Application"
Cohesion: 0.52
Nodes (6): applyMotionOverrides(), applyPatch(), MotionSpec, MotionTokens, TokenOverrides, MotionSpecPatch

### Community 49 - "Mode Generation Controls"
Cohesion: 0.33
Nodes (5): ModeControl, ModeGeneration, DarkOnly, LightOnly, Pair

### Community 50 - "Component Visual Treatments"
Cohesion: 0.33
Nodes (6): Treatment, Fill, Ghost, Inverse, Outline, Soft

### Community 51 - "Token Path Dimension Types"
Cohesion: 0.33
Nodes (6): Color, Depth, Dp, Motion, OverrideValue, Typography

### Community 52 - "Prior Seed Math & Clamping"
Cohesion: 0.53
Nodes (5): clamped(), clampedAxis(), PriorAesthetic, PriorStructural, scaled()

### Community 55 - "Token KSP Processor Provider"
Cohesion: 0.53
Nodes (4): BasisTokenPathFamilyProcessorProvider, SymbolProcessor, SymbolProcessorEnvironment, SymbolProcessorProvider

### Community 56 - "Basis Lint Issue Registry"
Cohesion: 0.60
Nodes (4): BasisIssueRegistry, current_api, IssueRegistry, Vendor

### Community 57 - "UI Component Definitions"
Cohesion: 0.40
Nodes (5): Button, ComponentExtraPatch, Dialog, Switch, TextField

### Community 58 - "Prominence Tiers"
Cohesion: 0.40
Nodes (5): ProminenceTier, Primary, Quiet, Secondary, Tertiary

### Community 59 - "Detekt RuleSet Provider"
Cohesion: 0.60
Nodes (3): BasisRuleSetProvider, RuleSet, RuleSetProvider

### Community 60 - "Prior Gain Values"
Cohesion: 0.50
Nodes (3): PriorGain, SPECIFIED, UNSPECIFIED

### Community 61 - "Gradle Wrapper Scripts"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

## Knowledge Gaps
- **129 isolated node(s):** `ColorModulators`, `DepthOverrides`, `MotionOverrides`, `PriorSeedBiases`, `AestheticWeights` (+124 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 278 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `FamilyEmitterTest` connect `Token Path KSP Code Generator` to `Lint & Seed Test Assertions`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `PathNamingTest` connect `Token Path Naming & Formatting` to `Lint & Seed Test Assertions`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `priorSeedBiases()` connect `Domain Mood Projection & Tests` to `Color & Typography Modulators`, `Color Spec Models & Oklch Assertions`, `Prior Seed Math & Clamping`, `Prior Gain Values`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 30 inferred relationships involving `resolve()` (e.g. with `.enforceContrastRepairsOwnedPairsInWorkingTheme()` and `.a11yFirstEnforcesFloorsAndReportsRepairs()`) actually correct?**
  _`resolve()` has 30 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ColorModulators`, `DepthOverrides`, `MotionOverrides` to the rest of the system?**
  _129 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Color Token Path Overrides & Mixers` be split into smaller, more focused modules?**
  _Cohesion score 0.0727078321304464 - nodes in this community are weakly interconnected._
- **Should `Token Path KSP Code Generator` be split into smaller, more focused modules?**
  _Cohesion score 0.0710085933966531 - nodes in this community are weakly interconnected._