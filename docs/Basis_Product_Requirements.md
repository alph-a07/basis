# Basis — Product Requirements Document

**Product:** Basis  
**Tagline:** A stable, simple, configurable design system for Jetpack Compose  
**Platform:** Android, Jetpack Compose  
**Current SDK target:** minSdk 24, targetSdk 36, compileSdk 37  
**License:** Apache-2.0

## 1. Product Definition

Basis is a configurable design system library for Jetpack Compose.

Its purpose is to let a consumer move from design intent to a coherent, usable UI without requiring either:

- a complete pre-existing design system, or
- hundreds of component-level styling parameters.

Basis should provide the flexibility of a highly configurable design system while keeping the public API semantic, constrained, and maintainable.

The consumer experience is the primary design constraint.

## 2. Core Product Principle

> Design the consumer experience first, then make the theme/token architecture capable of delivering it.

Every consumer should have a natural entry point into one coherent resolution pipeline.

Supported starting points include:

- no explicit visual direction;
- a rough visual vibe;
- brand colors;
- supporting colors;
- a desired level of brand presence;
- a mood;
- a product domain;
- explicit component/family preferences;
- a partially specified design system;
- a highly specified design system expressed through Basis-supported inputs.

There is no separate "bring your own design system" resolver.

## 3. Product Goals

### G1 — Ready to use

A consumer should be able to install Basis and build a coherent application without first becoming a design-system expert.

### G2 — Meaningful customization

Consumers should be able to change high-value visual decisions without exposing arbitrary styling parameters on every component.

### G3 — Coherent resolution

Changing one input should produce a coherent theme rather than a collection of independently styled components.

### G4 — Extensible component coverage

Basis should cover common application UI across:

- actions;
- inputs;
- selection;
- navigation;
- overlays;
- feedback;
- content;
- lists;
- data;
- date/time;
- adaptive layouts;
- interaction patterns.

### G5 — Accessibility by construction

Accessibility should be built into foundational interaction primitives and component contracts rather than treated as a final polish pass.

### G6 — Performance

Components should behave predictably under Compose recomposition and large/dynamic data sets.

### G7 — Stable API

Public APIs should expose semantic intent and remain resistant to implementation-driven API growth.

## 4. Non-Goals

Basis does not aim to:

- reproduce every Material 3 component/API;
- expose arbitrary per-instance styling;
- become an application architecture framework;
- own application business logic;
- provide domain-specific components in core;
- become a navigation/router framework;
- become a full media framework;
- import arbitrary external token JSON;
- import arbitrary Material 3 schemes;
- encode product-specific design decisions into the core component library.

Domain-specific UI should be composed from Basis capabilities.

## 5. Consumer Input Model

### Identity

Identity includes:

- brand colors;
- supporting colors;
- brand presence.

Identity supplies direction. It does not directly assign semantic roles.

### Mood

Mood consists of:

- one primary named mood;
- continuous dimensions that refine the mood.

Current initial mood profiles:

- Calm;
- Refined;
- Energetic;
- Playful.

Mood may influence visual character such as:

- colorfulness;
- shape softness;
- typographic expressiveness;
- depth;
- visual complexity.

Mood does not override accessibility constraints or explicit specifications.

### Domain

Domain provides theme-relevant product context.

It must not model application business logic.

### Appearance

Appearance is the consumer-facing mechanism for deliberate visual customization.

It can target:

- tokens;
- composite-token properties;
- token groups;
- supported component/family configuration.

It does not provide arbitrary styling escape hatches.

## 6. Theme Resolution

Basis uses one resolver with multiple entry paths.

Conceptually:

```text
Identity
Mood
Domain
Appearance
Explicit specifications
Constraints
        ↓
Theme Resolution
        ↓
ResolvedTheme
        ↓
Components
```

The resolver:

- preserves the meaning of each input;
- reconciles them coherently;
- lets more-specific information refine expression;
- keeps explicit specifications authoritative;
- keeps hard constraints authoritative;
- produces a complete valid resolved theme.

The Resolution Graph is the decision graph.

There is no separate DesignDecision layer.

## 7. Token Requirements

A design token is:

> A named, reusable design decision with a resolvable value.

Tokens may be scalar or composite.

Basis owns the public token vocabulary.

Current token families include:

- Color semantic;
- Typography;
- Spacing;
- Radius/Shape;
- Depth;
- Motion;
- Size.

Typography is role-centric:

- Structure 1–6;
- Content 1–5;
- Metadata 1–3.

A typography token resolves family, size, weight, line height, letter spacing, and semantic color reference.

A resolved theme may use multiple font families simultaneously. Font
family is a Theme Resolution decision and may vary by typography role or
level. More-specific level assignment refines role-scoped assignment for
font family.

Identity, Mood, and Domain may influence font-family resolution where the
relevant resolution contract declares them applicable; Mood's
`typographicExpressiveness` is one such signal. Appearance may explicitly
customize exposed family assignments, subject to mandatory Constraints.

The public model must not become a Cartesian product of every semantic dimension.

## 8. Component Model

Basis separates:

```text
Foundational
Compound
Public
Deferred
Rejected
```

A component may be both foundational and public.

A capability does not automatically require a separate implementation type.

For example:

```text
PasswordField
→ TextField configuration

AlertDialog
→ Dialog semantic composition

DateRangePicker
→ Calendar + range selection + picker shell

LoadingButton
→ Button runtime state
```

This prevents component-count inflation.

## 9. Public Component Contract

Public APIs should expose:

- semantic variants;
- semantic sizes;
- content;
- runtime state;
- behavior;
- accessibility semantics;
- supported adaptive behavior.

Public APIs should not expose arbitrary:

- colors;
- padding;
- radius;
- elevation;
- animation specifications;
- internal modifiers.

## 10. Component State Model

Components must distinguish:

### Variant

Semantic presentation mode.

### Configuration

Structural or behavioral setup.

### Runtime state

Current interaction/application condition.

### Content

Consumer-provided data.

State should not become a new visual component type unless the responsibility genuinely differs.

## 11. Theme Flexibility Requirements

Theme flexibility is a first-class product requirement.

A consumer should be able to configure high-value design decisions globally and at supported family/component scopes.

The system must support partial customization.

Customization should not require consumers to reproduce the entire theme.

The system should preserve coherent defaults for all unspecified values.

### Family/tier model

The current direction uses:

- component families;
- prominence tiers where meaningful;
- treatment as a separate property.

Where supported, precedence is:

```text
family + tier
    >
family
    >
tier
    >
global
```

Conflicts must be deterministic and diagnosable.

The model must not require every family to support every tier.

## 12. Accessibility Requirements

Every interactive public component must provide:

- meaningful semantics;
- correct enabled/disabled semantics;
- focusability where applicable;
- keyboard interaction where applicable;
- touch interaction;
- state announcements;
- sufficient contrast;
- adequate touch target;
- support for large text;
- RTL correctness;
- reduced-motion behavior.

TalkBack behavior must be tested as a first-class acceptance criterion.

Consumers should also be able to use public interaction primitives to inherit Basis accessibility behavior in their own composed components.

## 13. Minimum Touch Target

Basis should enforce a shared sizing contract rather than private per-component minimums.

The sizing system includes:

- `MIN_TOUCH_TARGET`;
- icon sizes;
- control heights;
- other shared size decisions.

Interactive targets must meet the Basis minimum touch-target contract even when the visible glyph/icon is smaller.

The visual object and the interactive hit target are separate concerns.

## 14. Performance Requirements

Components must be designed for Compose's recomposition model.

Requirements include:

- stable parameters where appropriate;
- immutable state models where appropriate;
- no unnecessary object allocation during recomposition;
- no expensive computation in composable bodies;
- no side effects during composition;
- lazy containers for large collections;
- stable keys for dynamic collections;
- derived state for derived UI values where beneficial;
- remember only when it provides meaningful identity/cost benefits;
- avoid unnecessary recomposition through correct state ownership.

Performance optimization must not make the API or state model unnecessarily complex.

## 15. State Management Requirements

State ownership must follow the component's responsibility.

A component should distinguish:

```text
stateless rendering
vs
stateful convenience API
```

Preferred design:

```kotlin
BasisTextField(
    value = value,
    onValueChange = ...
)
```

Optional convenience APIs may exist where they genuinely improve ergonomics.

Internal UI state should not be duplicated when the consumer owns the source of truth.

Transient interaction state may remain internal where appropriate.

State hoisting must preserve:

- unidirectional data flow;
- testability;
- predictable recomposition;
- consumer control.

## 16. Testing Requirements

Every public component requires testing appropriate to its behavior.

### Unit tests

For:

- state transitions;
- transformations;
- validation;
- token/configuration resolution;
- pure logic.

### UI/instrumentation tests

For:

- interaction;
- semantics;
- focus;
- keyboard;
- touch;
- TalkBack-relevant semantics;
- dynamic state.

### Visual tests

For:

- variants;
- states;
- light/dark;
- theme configurations;
- typography;
- density/layout;
- appearance customization.

### Accessibility tests

For:

- semantics tree;
- touch target;
- state descriptions;
- content descriptions;
- traversal;
- focus;
- contrast.

### Performance tests

For:

- large lists;
- dynamic updates;
- repeated state changes;
- recomposition-sensitive components;
- expensive content.

TTD/TDD should be applied wherever behavior can be specified independently of implementation, especially foundational interaction, state, resolution, validation, and accessibility behavior.

## 17. Documentation Requirements

Each public component requires:

- purpose;
- when to use;
- when not to use;
- anatomy;
- API;
- variants;
- configurations;
- states;
- accessibility behavior;
- theming behavior;
- examples;
- common composition patterns;
- performance considerations;
- testing expectations.

The documentation site should include live previews where practical.

## 18. Demo Application

The demo app is a product validation environment, not merely a showcase.

It must exercise:

- component coverage;
- theme resolution;
- appearance customization;
- light/dark;
- accessibility;
- dynamic content;
- edge cases;
- adaptive layouts;
- domain stress scenarios.

## 19. Quality Gates

A public component is shippable only when:

```text
Consumer responsibility defined
        +
Anatomy defined
        +
State model defined
        +
Theme mapping defined
        +
Accessibility validated
        +
Touch target validated
        +
Performance reviewed
        +
Tests pass
        +
Visual regression passes
        +
Public API reviewed
        +
Documentation complete
```

## 20. Success Criteria

Basis succeeds when a consumer can:

1. Start with minimal design input.
2. Obtain a coherent theme.
3. Build real application screens from the public component catalogue.
4. Customize meaningful visual decisions without arbitrary styling APIs.
5. Preserve accessibility when customizing.
6. Build dynamic interfaces without fighting the state model.
7. Extend the system through composition.
8. Add future Basis capabilities without destabilizing existing consumers.

## 21. Release Philosophy

Do not optimize for component count.

Optimize for:

```text
coverage
+
coherence
+
flexibility
+
accessibility
+
performance
+
API stability
+
extensibility
```

A smaller coherent API is preferable to a larger catalogue of overlapping components.
