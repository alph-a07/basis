# Basis Design Token Contracts

This document defines the semantic token vocabulary and contracts used
by Basis. A token is a named, reusable design decision with a resolvable
value. It defines token meaning, family structure, public vocabulary,
and boundaries; it does not define the Theme Resolution algorithm or
consumer input contracts.

## Contents

- [1. Token Model](#1-token-model)
    - [1.1 What a token is](#11-what-a-token-is)
    - [1.2 Tokens may be scalar or
      composite](#12-tokens-may-be-scalar-or-composite)
    - [1.3 Semantic tokens](#13-semantic-tokens)
    - [1.4 Token families](#14-token-families)
    - [1.5 Consumer-created tokens](#15-consumer-created-tokens)
- [2. Color](#2-color)
    - [2.1 Public color contracts](#21-public-color-contracts)
        - [Surface](#surface)
        - [Content](#content)
        - [Icon](#icon)
        - [Border](#border)
        - [Selection](#selection)
        - [Focus](#focus)
        - [Status](#status)
        - [Gradient](#gradient)
    - [2.2 Color boundaries](#22-color-boundaries)
- [3. Typography](#3-typography)
    - [3.1 Hierarchy](#31-hierarchy)
    - [3.2 Typography tokens](#32-typography-tokens)
    - [3.3 Font family](#33-font-family)
- [4. Spacing](#4-spacing)
    - [4.1 Public catalogue](#41-public-catalogue)
    - [4.2 Context](#42-context)
    - [4.3 Resolution](#43-resolution)
- [5. Radius](#5-radius)
    - [5.1 Public catalogue](#51-public-catalogue)
    - [5.2 Indexed hierarchy](#52-indexed-hierarchy)
    - [5.3 Boundary concepts](#53-boundary-concepts)
    - [5.4 Component geometry](#54-component-geometry)
- [6. Depth](#6-depth)
    - [6.1 Resolution](#61-resolution)
    - [6.2 Resolved value](#62-resolved-value)
- [7. Size](#7-size)
    - [7.1 Public catalogue](#71-public-catalogue)
    - [7.2 Icon](#72-icon)
    - [7.3 Avatar](#73-avatar)
    - [7.4 Dot](#74-dot)
    - [7.5 Control](#75-control)
    - [7.6 Boundaries](#76-boundaries)
- [8. Motion](#8-motion)
    - [8.1 Public catalogue](#81-public-catalogue)
        - [Feedback](#feedback)
        - [StateTransition](#statetransition)
        - [Transformation](#transformation)
        - [Expansion](#expansion)
        - [Reposition](#reposition)
        - [Emphasis](#emphasis)
    - [8.2 What is not a public Motion
      token](#82-what-is-not-a-public-motion-token)
    - [8.3 Resolved Motion value](#83-resolved-motion-value)
    - [8.4 Coordination](#84-coordination)
    - [8.5 AnimationSpec vs
      TransitionSpec](#85-animationspec-vs-transitionspec)
    - [8.6 Appearance customization](#86-appearance-customization)
    - [8.7 Accessibility and reduced
      motion](#87-accessibility-and-reduced-motion)
- [9. Cross-Family Principles](#9-cross-family-principles)
- [10. Resolution Examples](#10-resolution-examples)
    - [Scalar](#scalar)
    - [Scalar geometry](#scalar-geometry)
    - [Composite typography](#composite-typography)
    - [Composite control size](#composite-control-size)
    - [Composite motion](#composite-motion)
    - [Semantic depth](#semantic-depth)
- [11. Extensibility Rules](#11-extensibility-rules)
- [12. Current Public Token
  Catalogue](#12-current-public-token-catalogue)

------------------------------------------------------------------------

# 1. Token Model

## 1.1 What a token is

A token represents a reusable design decision.

Examples:

``` text
Spacing.Level3
    → 12dp
```

``` text
Radius.Level3
    → 12dp
```

``` text
Typography.Content.Level2
    → font family + size + weight + line height + letter spacing + color reference
```

The resolved value can change without changing the token's identity.

The governing test is:

> **Does changing the value leave the design concept intact?**

If yes, the concept is a viable token identity.

For example, `Spacing.Level3` may resolve to different concrete
magnitudes across themes while remaining the same design decision.
Conversely, a name such as `Spacing.16` encodes a concrete value and is
therefore not an appropriate token identity.

## 1.2 Tokens may be scalar or composite

A token may resolve to either a scalar value or a structured/composite
value.

Examples:

``` text
Spacing.Level3
    → 12dp
```

``` text
Typography.Content.Level2
    → {
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing,
        colorReference
      }
```

Motion tokens may similarly resolve to coordinated animation
specifications.

Composite tokens are still tokens because their identity represents one
coherent design decision.

## 1.3 Semantic tokens

A token is semantic when its identity expresses design meaning rather
than a concrete value.

Examples include:

``` text
content.default
Motion.Feedback
Typography.Content.Level2
```

A public primitive → semantic hierarchy is not required. Basis may use
internal values, generators, rules, and constraints without exposing all
of them as public tokens.

Not every reusable internal value becomes a public token.

## 1.4 Token families

Token families organize related design decisions.

Examples:

``` text
Spacing
├── Level1
├── Level2
└── ...

Radius
├── None
├── Level1
└── Full
```

A family is not a different species of token. Its members remain
ordinary tokens with stable identities and resolvable values.

Different token families are allowed to have different structures.

## 1.5 Consumer-created tokens

Consumers do not dynamically create new Basis token types.

Consumers may customize exposed token decisions through Appearance, but
they do not expand the token type system arbitrarily.

Basis may add future tokens when genuine system/component evidence
requires them.

# 2. Color

Color is a semantic token system.

Basis may reason about semantic dimensions internally, but only
deliberately designed combinations become public token contracts.

Potential internal semantic dimensions include:

- Role
- Context
- State
- Status

`Interactive` and `Selected` are contexts rather than roles.

Disabled is handled as state/context rather than automatically producing
duplicated disabled families.

Status is semantic meaning and is distinct from interaction state.

Focus ring may exist as its own semantic token.

Gradients are composite semantic tokens.

Categorical colors are generators/utilities rather than public tokens.

## 2.1 Public color contracts

### Surface

``` text
surface.default
surface.elevated
surface.recessed
surface.inverse
```

### Content

``` text
content.default
content.muted
content.inverse
```

### Icon

``` text
icon.default
icon.muted
icon.inverse
```

### Border

``` text
border.default
border.muted
border.strong
border.inverse
```

### Selection

``` text
selection.surface
selection.content
selection.border
```

### Focus

``` text
focus.ring
```

### Status

Status contracts use deliberate combinations of status meaning and
presentation role:

``` text
positive
negative
caution
info
```

with deliberate surface/content/icon/border contracts rather than an
unrestricted Cartesian product.

### Gradient

``` text
gradient.brand
gradient.surface
```

Gradients are composite semantic tokens.

## 2.2 Color boundaries

Basis does not expose every possible combination of:

``` text
role × context × state × status
```

as public tokens.

The public catalogue is intentionally curated.

The Color model is deliberately curated. Concrete values are resolved by
Theme Resolution and customization exposure is defined by the Appearance
contract.

# 3. Typography

Typography uses a role-centric semantic model rather than the
conventional Display/Headline/Title/Body/Label taxonomy.

The fundamental roles are:

``` text
Structure
Content
Metadata
```

Identity and Data do not receive independent typography roles.

Action and Status are product/interaction semantics rather than
typography roles.

## 3.1 Hierarchy

Hierarchy is ordinal and indexed.

``` text
Structure.Level1
Structure.Level2
Structure.Level3
Structure.Level4
Structure.Level5
Structure.Level6
```

``` text
Content.Level1
Content.Level2
Content.Level3
Content.Level4
Content.Level5
```

``` text
Metadata.Level1
Metadata.Level2
Metadata.Level3
```

The level index represents hierarchy within its role. It does not
prescribe concrete font size, weight, or color.

## 3.2 Typography tokens

Each role/level is a complete composite typography token.

Example:

``` text
Typography.Content.Level2
```

resolves to:

``` text
font family
font size
font weight
line height
letter spacing
semantic Color reference
```

Typography does not own a separate semantic color system. It references
the Basis Color system.

## 3.3 Font family

Basis has access to the Google Fonts collection.

Theme Resolution derives assignment of one or more font families to
typography tokens.

Font assignment may conceptually occur per role, per level, or both.
Exact precedence between role-level and level-level assignment remains
an implementation/detail question rather than a silently assumed
hierarchy.

Consumers may override font assignment through Appearance, including
consumer-provided fonts/BYOF.

# 4. Spacing

Spacing is an indexed hierarchy of reusable spatial magnitudes.

> **Spacing is an indexed hierarchy of reusable spatial magnitudes. Each
> level is a scalar spacing token whose resolved value is
> theme-dependent. Components and layouts determine contextual
> application of those magnitudes rather than creating semantic spacing
> tokens for each usage.**

## 4.1 Public catalogue

``` text
Spacing.Level1
Spacing.Level2
Spacing.Level3
Spacing.Level4
Spacing.Level5
Spacing.Level6
Spacing.Level7
Spacing.Level8
```

The public hierarchy contains eight levels.

The hierarchy is extensible when genuine system/component evidence
demonstrates a need for additional levels.

Consumers do not create new levels. Basis may introduce future levels
deliberately.

## 4.2 Context

Spacing does not use semantic names such as:

``` text
CardPadding
ButtonGap
ScreenMargin
```

Those would encode component/use-case semantics into the token
vocabulary.

Components determine where a spacing magnitude is applied.

## 4.3 Resolution

A spacing token resolves to a concrete magnitude:

``` text
Spacing.Level3
    ↓
12dp
```

The concrete scale and its resolution mechanics are separate from token
identity.

Potential resolution mechanisms such as fixed, proportional,
theme-derived, or responsive behavior remain value-resolution questions.

# 5. Radius

Radius is the public geometric token family within the broader Shape
space.

## 5.1 Public catalogue

``` text
Radius.None
Radius.Level1
Radius.Level2
Radius.Level3
Radius.Level4
Radius.Level5
Radius.Level6
Radius.Level7
Radius.Level8
Radius.Full
```

## 5.2 Indexed hierarchy

The indexed levels represent reusable magnitudes and do not prescribe
concrete dp values.

Example:

``` text
Radius.Level3
    ↓
12dp
```

## 5.3 Boundary concepts

`None` and `Full` are boundary concepts rather than ordinary indexed
magnitudes.

`Full` means enough radius to produce fully rounded geometry relative to
the component's bounds.

It is not simply another number in the same magnitude scale.

## 5.4 Component geometry

Components/layouts may compose radius decisions into concrete shapes,
including asymmetric shapes.

Basis does not need a public semantic token for every component-specific
shape.

Consumers may override exposed Radius token values through Appearance
with concrete values, but they do not create new token types.

# 6. Depth

Depth represents a perceptual layering relationship rather than simply
physical elevation.

The public contract is an indexed hierarchy:

``` text
Depth.Level1
Depth.Level2
...
Depth.LevelN
```

The number of levels is a value-resolution/design decision.

## 6.1 Resolution

A Depth level does not prescribe a particular rendering mechanism.

For example:

``` text
Depth.Level3
        ↓
Theme Resolution
        ↓
appropriate depth expression
```

Depending on component, theme, and environment, that expression may
involve:

- elevation
- outer shadow
- inset/recess treatment
- tonal/surface differentiation
- multiple coordinated mechanisms

The consumer does not choose which physical/rendering mechanism
represents the depth level.

Therefore:

> **Depth level is the semantic perceptual magnitude; elevation, shadow,
> inset, and related rendering mechanisms are implementation expressions
> of that magnitude.**

This also means Shadow/Elevation/Inset are not separate public token
families in the current model.

## 6.2 Resolved value

A resolved Depth value may be composite.

Its exact fields are defined by the depth contract.

# 7. Size

Size is a reusable dimensional decision describing the magnitude or
dimensions of a visual object or control.

``` text
Spacing → space between things
Size    → dimensions of things
Radius  → curvature of boundaries
Depth   → layering
Motion  → temporal/animated change
```

## 7.1 Public catalogue

``` text
Size.Icon.LevelN
Size.Avatar.LevelN
Size.Control.LevelN
Size.Dot.LevelN
```

Each family has its own indexed magnitude hierarchy. The number of
levels does not need to be identical across families.

## 7.2 Icon

Icon size is a scalar dimensional token.

``` text
Size.Icon.Level2
    ↓
20dp
```

The actual value is theme-resolved.

## 7.3 Avatar

Avatar size is a scalar dimensional token.

``` text
Size.Avatar.Level3
    ↓
40dp
```

Surrounding status indicators, spacing, typography, and other
relationships remain separate design decisions unless a component
contract explicitly composes them.

## 7.4 Dot

Dot size is a scalar dimensional token for small circular
indicators/visual dots.

Semantic meaning such as positive/negative/caution belongs to
Color/Status, while physical magnitude belongs to Size.

## 7.5 Control

Control size is a composite token.

A consumer selecting a control size is selecting a coherent dimensional
relationship, not merely an outer height.

Conceptually:

``` text
Size.Control.Level2
    ↓
{
    minHeight,
    horizontalPadding,
    verticalPadding,
    iconSize,
    ...
}
```

The constituent set is defined by the control-size contract.

Typography, Radius, and other token systems do not automatically become
constituents merely because they participate in a control.

The principle is:

> **A composite Size token is justified when its constituents must
> change together to preserve a coherent dimensional relationship.**

## 7.6 Boundaries

Touch target is not automatically a public Size token.

Touch target is partly an accessibility/interaction constraint and
remains distinct from visual dimensions.

Size is not a dumping ground for every component-specific dimension.

New Size families require evidence of a reusable cross-component
dimensional contract.

# 8. Motion

Motion covers discrete, system-defined animated visual behavior whose
implementation may involve `AnimationSpec`, `TransitionSpec`, duration,
easing, spring behavior, or related animation mechanisms.

Continuous user-controlled motion, repeating/indeterminate activity, and
progress animation are outside the public Motion token contract.

## 8.1 Public catalogue

``` text
Motion.Feedback
Motion.StateTransition
Motion.Transformation
Motion.Expansion
Motion.Reposition
Motion.Emphasis
```

These are semantic contracts, not animation mechanisms.

### Feedback

How an existing component acknowledges direct interaction.

### StateTransition

How an existing component moves between semantic states.

Examples:

``` text
unchecked → checked
off → on
unselected → selected
inactive → active
```

### Transformation

How a single component changes its visual form.

Examples include:

- visual shape change
- color change
- size change
- icon morph
- visual representation change

A semantic state change may cause a transformation, but the two concepts
are not identical.

### Expansion

How an existing component changes its spatial extent.

Examples include:

- accordion expansion/collapse
- expandable content
- changing container extent
- bottom-sheet expansion

### Reposition

How an existing visual object changes spatial location while remaining
conceptually the same object.

Examples include:

- list reordering
- layout rearrangement
- navigation indicator movement
- elements shifting after insertion/removal

### Emphasis

How motion temporarily increases perceptual attention.

Examples include:

- drawing attention to a newly changed value
- validation emphasis
- newly inserted content
- attention pulse

## 8.2 What is not a public Motion token

These are mechanisms/properties rather than semantic token identities:

``` text
duration
delay
easing
spring
AnimationSpec
TransitionSpec
fade
scale
slide
translation
rotation
```

Component-specific events such as `DialogEnter`, `ButtonPress`, or
`SwipeUp` are not automatically public tokens.

## 8.3 Resolved Motion value

Motion tokens are composite tokens.

A Motion token does not necessarily resolve to one primitive
`AnimationSpec`.

Instead:

``` text
Motion token
    ↓
Theme Resolution
    ↓
ResolvedMotion
    ↓
one or more coordinated animation tracks
```

Conceptually:

``` text
ResolvedMotion
├── Track
│   ├── target/property
│   └── animation behavior
├── Track
│   ├── target/property
│   └── animation behavior
└── ...
```

A transformation could resolve to:

``` text
Motion.Transformation
    ↓
{
    color: animation,
    shape: animation,
    size: animation
}
```

The exhaustive animatable-property vocabulary is not locked.

## 8.4 Coordination

Tracks belonging to one resolved Motion execute as one coherent motion
instance.

They may:

- share a lifecycle/start
- have independent animation behavior
- have different durations
- use different easing/spring characteristics
- be cancelled as one semantic motion operation

Basis does not currently require a general-purpose choreography/timeline
language.

## 8.5 AnimationSpec vs TransitionSpec

These are implementation details at the Compose boundary.

Basis conceptually resolves:

``` text
semantic Motion token
        ↓
implementation-neutral resolved motion
```

The Compose adapter then maps that result to appropriate APIs, which may
involve:

``` text
AnimationSpec<T>
Transition
AnimatedContent
other Compose animation APIs
```

The public Basis token contract does not depend on one specific Compose
animation API.

## 8.6 Appearance customization

Motion tokens are eligible for Appearance customization at the semantic
contract level.

Conceptually:

``` text
Appearance
    ↓
Motion.Feedback
```

is valid.

However, individual resolved mechanics are not automatically public
customization points:

``` text
Motion.Feedback.duration
Motion.Feedback.easing
Motion.Feedback.scale
```

are not exposed by default.

This preserves the semantic abstraction rather than turning Motion into
a collection of animation knobs.

Individual constituents may become exposed later if a deliberate
Appearance contract establishes them.

## 8.7 Accessibility and reduced motion

Reduced motion is not a Mood and is not a Motion token.

It is an accessibility constraint.

``` text
Motion intent
+
Theme customization
+
Accessibility constraints
        ↓
Theme Resolution
        ↓
valid ResolvedMotion
```

A reduced-motion requirement may cause animation to be removed,
simplified, shortened, or otherwise altered depending on the semantic
Motion contract.

Reduced motion should not be modeled simply as `duration = 0`.

A valid resolved theme must satisfy mandatory accessibility constraints.

# 9. Cross-Family Principles

The token families intentionally use different vocabularies because they
represent different design decisions.

``` text
Color        → semantic contracts
Typography   → semantic role + indexed hierarchy
Spacing      → indexed magnitude
Radius       → indexed magnitude + boundaries
Depth        → indexed perceptual magnitude
Size         → dimensional family + indexed magnitude
Motion       → semantic animation contracts
```

There is no requirement that all families become `Family.Level1`,
`Family.Level2`, etc., and there is no requirement that all resolved
values be scalar.

The correct vocabulary follows the design decision represented by the
family.

# 10. Resolution Examples

## Scalar

``` text
Spacing.Level3
    ↓
Theme Resolution
    ↓
12dp
```

## Scalar geometry

``` text
Radius.Level3
    ↓
Theme Resolution
    ↓
12dp
```

## Composite typography

``` text
Typography.Content.Level2
    ↓
Theme Resolution
    ↓
{
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    colorReference
}
```

## Composite control size

``` text
Size.Control.Level2
    ↓
Theme Resolution
    ↓
{
    minHeight,
    horizontalPadding,
    verticalPadding,
    iconSize,
    ...
}
```

## Composite motion

``` text
Motion.Transformation
    ↓
Theme Resolution
    ↓
{
    color: animation,
    shape: animation,
    size: animation
}
```

## Semantic depth

``` text
Depth.Level3
    ↓
Theme Resolution
    ↓
appropriate depth expression
```

The final expression may differ between themes, modes, and component
contexts.

# 11. Extensibility Rules

The public vocabulary is deliberately curated and may be extended when a
distinct reusable design decision is demonstrated.

A new token or family should be introduced only when there is evidence
of a distinct, reusable design decision that cannot be adequately
represented by an existing contract.

Basis may add future levels to indexed families when genuine
system/component requirements demonstrate the need.

Consumers do not dynamically create new token types or arbitrary new
levels.

Component-specific internal values and recipes may exist without
becoming public tokens.

The public token catalogue should remain smaller than the full internal
design space.

# 12. Current Public Token Catalogue

``` text
Color
├── surface.default
├── surface.elevated
├── surface.recessed
├── surface.inverse
├── content.default
├── content.muted
├── content.inverse
├── icon.default
├── icon.muted
├── icon.inverse
├── border.default
├── border.muted
├── border.strong
├── border.inverse
├── selection.surface
├── selection.content
├── selection.border
├── focus.ring
├── positive.*
├── negative.*
├── caution.*
├── info.*
├── gradient.brand
└── gradient.surface

Typography
├── Structure.Level1–Level6
├── Content.Level1–Level5
└── Metadata.Level1–Level3

Spacing
└── Level1–Level8

Radius
├── None
├── Level1–Level8
└── Full

Depth
└── Level1–LevelN

Size
├── Icon.LevelN
├── Avatar.LevelN
├── Control.LevelN
└── Dot.LevelN

Motion
├── Feedback
├── StateTransition
├── Transformation
├── Expansion
├── Reposition
└── Emphasis
```

This catalogue represents the current conceptual contract. Concrete
values and resolution mechanics are the next phase.
