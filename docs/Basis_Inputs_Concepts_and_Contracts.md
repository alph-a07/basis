# Basis --- Inputs Concepts & Contracts

This document defines the five Basis theme-system input concepts:
Identity, Mood, Domain, Appearance, and Constraints. It establishes
their meanings, boundaries, representations, ownership, optionality, and
cross-input invariants. It does not define component APIs, token
taxonomy, or Theme Resolution mechanics.

## Contents

-   [1. Input Classification](#1-input-classification)
    -   [1.1 Intent inputs](#11-intent-inputs)
    -   [1.2 Explicit customization](#12-explicit-customization)
    -   [1.3 Validity boundaries](#13-validity-boundaries)
-   [2. Identity](#2-identity)
    -   [2.1 Definition](#21-definition)
    -   [2.2 Contract](#22-contract)
        -   [Brand colors](#brand-colors)
        -   [Supporting colors](#supporting-colors)
        -   [Brand presence](#brand-presence)
    -   [2.3 Boundaries](#23-boundaries)
    -   [2.4 Interaction with other
        inputs](#24-interaction-with-other-inputs)
-   [3. Mood](#3-mood)
    -   [3.1 Definition](#31-definition)
    -   [3.2 Representation](#32-representation)
    -   [3.3 Dimensions](#33-dimensions)
        -   [Colorfulness](#colorfulness)
        -   [Shape softness](#shape-softness)
        -   [Typographic expressiveness](#typographic-expressiveness)
        -   [Depth](#depth)
        -   [Visual complexity](#visual-complexity)
    -   [3.4 Named profiles](#34-named-profiles)
    -   [3.5 Single profile](#35-single-profile)
    -   [3.6 Professional](#36-professional)
    -   [3.7 Boundaries](#37-boundaries)
-   [4. Domain](#4-domain)
    -   [4.1 Definition](#41-definition)
    -   [4.2 Contract](#42-contract)
    -   [4.3 Granularity](#43-granularity)
    -   [4.4 Domain influence](#44-domain-influence)
    -   [4.5 Boundaries](#45-boundaries)
    -   [4.6 Cross-domain products](#46-cross-domain-products)
-   [5. Appearance](#5-appearance)
    -   [5.1 Definition](#51-definition)
    -   [5.2 Core principle](#52-core-principle)
    -   [5.3 Token customization](#53-token-customization)
    -   [5.4 Scalar token customization](#54-scalar-token-customization)
    -   [5.5 Composite token
        customization](#55-composite-token-customization)
    -   [5.6 Token-family/group
        customization](#56-token-familygroup-customization)
    -   [5.7 Component customization](#57-component-customization)
    -   [5.8 What Appearance cannot do](#58-what-appearance-cannot-do)
    -   [5.9 Appearance and intent](#59-appearance-and-intent)
    -   [5.10 Appearance versus derived
        values](#510-appearance-versus-derived-values)
-   [6. Constraints](#6-constraints)
    -   [6.1 Definition](#61-definition)
    -   [6.2 Contract](#62-contract)
    -   [6.3 Accessibility](#63-accessibility)
    -   [6.4 Reduced motion](#64-reduced-motion)
    -   [6.5 Contrast and legibility](#65-contrast-and-legibility)
    -   [6.6 Constraint authority](#66-constraint-authority)
    -   [6.7 Unsatisfiable resolution](#67-unsatisfiable-resolution)
-   [7. Cross-Input Rules](#7-cross-input-rules)
    -   [No semantic collapse](#no-semantic-collapse)
-   [8. Optionality](#8-optionality)
-   [9. Input Ownership](#9-input-ownership)
-   [11. Boundary with Theme
    Resolution](#11-boundary-with-theme-resolution)

------------------------------------------------------------------------

# 1. Input Classification

The inputs have different semantic responsibilities.

## 1.1 Intent inputs

Identity, Mood, and Domain collectively provide **Design Intent**.

``` text
Identity + Mood + Domain
          ↓
     Design Intent
```

They describe what the product is trying to express.

They do not directly specify token values.

## 1.2 Explicit customization

Appearance represents explicit visual customization.

It allows the consumer to deliberately tune the public Basis
design-system surface.

Appearance does not redefine the meaning of Identity, Mood, or Domain.

## 1.3 Validity boundaries

Constraints represent requirements that a resolved theme must satisfy.

They are not aesthetic preferences.

A mandatory constraint cannot simply be overridden because another input
is more explicit.

# 2. Identity

## 2.1 Definition

Identity represents high-level visual identity: the visual material
associated with the product or brand and the desired prominence of that
identity.

Identity consists of:

``` text
Identity
├── Brand colors
├── Supporting colors
└── Brand presence
```

Identity is optional.

It is primarily useful for consumers who want Basis to derive a theme
from a rough or partial understanding of their brand.

## 2.2 Contract

Conceptually:

``` kotlin
data class Identity(
    val brandColors: List<Color>,
    val supportingColors: List<Color>,
    val brandPresence: BrandPresence,
)

enum class BrandPresence {
    Subtle,
    Balanced,
    Prominent,
}
```

### Brand colors

Brand colors are colors that constitute the core visual identity.

Contract:

-   Zero or more colors.
-   Multiple colors are allowed.
-   They are identity material, not semantic color roles.
-   Ordering has no semantic meaning.
-   Basis may derive semantic Color roles from them during resolution.
-   A brand color is not inherently a primary, action, surface, accent,
    or other semantic role.

### Supporting colors

Supporting colors are additional colors that belong to the product's
broader visual identity but are not core brand material.

Contract:

-   Zero or more colors.
-   Multiple colors are allowed.
-   They are identity material, not semantic color roles.
-   Ordering has no semantic meaning.
-   They do not automatically become secondary, accent, surface, or
    other semantic roles.

The distinction is:

``` text
Brand
    = core identity material

Supporting
    = supplementary identity material
```

The distinction does not encode semantic UI hierarchy.

### Brand presence

Brand presence communicates how prominently the product identity should
manifest visually.

``` text
Subtle
Balanced
Prominent
```

It is an ordinal design-intent input.

It does not directly specify:

-   percentage of branded UI
-   a specific color role
-   component usage
-   surface usage
-   saturation
-   typography
-   layout

The resolver determines how the requested prominence manifests across
the token system.

## 2.3 Boundaries

Identity does not contain:

``` text
primaryColor
secondaryColor
accentColor
buttonColor
surfaceColor
textColor
```

Those are semantic or resolved decisions, not identity inputs.

Identity does not:

-   assign semantic Color roles;
-   define component usage;
-   define typography;
-   define shape;
-   define spacing;
-   define hierarchy;
-   directly specify token values.

## 2.4 Interaction with other inputs

Identity provides visual material.

Mood determines desired visual character.

Domain provides product-context signals.

Appearance may subsequently customize the resulting visual expression.

Constraints establish validity boundaries.

For example:

``` text
Identity → brand color exists
Mood → desired visual character
Domain → product context
Appearance → explicit visual adjustment
Constraints → required validity
```

These inputs answer different questions and should not be collapsed into
one contract.

# 3. Mood

## 3.1 Definition

Mood represents the desired emotional and visual character of the
product.

Mood is distinct from:

-   Identity
-   Domain
-   Appearance
-   semantic meaning
-   component hierarchy
-   accessibility constraints

Mood is an intent input rather than a collection of direct token values.

## 3.2 Representation

Mood has:

1.  one primary named profile;
2.  continuous underlying dimensions for refinement.

Conceptually:

``` kotlin
data class Mood(
    val profile: MoodProfile,
    val dimensions: MoodDimensions,
)
```

``` kotlin
enum class MoodProfile {
    Calm,
    Refined,
    Energetic,
    Playful,
}
```

``` kotlin
data class MoodDimensions(
    val colorfulness: Float,
    val shapeSoftness: Float,
    val typographicExpressiveness: Float,
    val depth: Float,
    val visualComplexity: Float,
)
```

The exact numeric normalization and profile vectors belong to
resolution/data implementation.

## 3.3 Dimensions

### Colorfulness

``` text
muted / restrained ↔ vivid / expressive
```

### Shape softness

``` text
sharp / angular ↔ rounded / soft
```

### Typographic expressiveness

``` text
neutral / understated ↔ distinctive / expressive
```

### Depth

``` text
flat / minimal ↔ layered / dimensional
```

### Visual complexity

``` text
minimal / quiet ↔ rich / decorative
```

These dimensions define the Mood model.

Motion is not part of the Mood dimension model.

## 3.4 Named profiles

Named profiles:

-   Calm
-   Refined
-   Energetic
-   Playful

A named profile represents a starting position in the dimensional space.

It is not a rigid visual preset.

A profile must be translatable into coherent, deterministic downstream
preferences before it can be considered a valid Basis profile.

## 3.5 Single profile

Mood does not stack multiple named profiles.

For example, the consumer does not conceptually provide:

``` text
Calm + Playful + Refined
```

Instead, a single profile is refined through the underlying dimensions.

This avoids ambiguous profile precedence.

## 3.6 Professional

Professional is intentionally not part of the current named Mood profile
set.

The qualities associated with professional presentation---such as
credibility, competence, order, and professional character---remain
independent/unassigned rather than being prematurely encoded as a Mood
profile.

## 3.7 Boundaries

Mood does not:

-   specify token values;
-   assign semantic Color roles;
-   specify exact typography;
-   specify exact radius;
-   specify exact spacing;
-   specify accessibility behavior;
-   override mandatory Constraints.

Mood may influence typography-family resolution through
`typographicExpressiveness` when the relevant Theme Resolution node
declares that dimension applicable. The dimension expresses desired
typographic character; it does not name or directly select a concrete
font family.

# 4. Domain

## 4.1 Definition

Domain represents broad, product-level context that is relevant to
design resolution.

It is not a business-domain model.

It exists only to provide context that can meaningfully affect design
decisions.

Examples of design-relevant domain context include:

-   information density;
-   numerical readability;
-   comparison requirements;
-   transactional context;
-   relationship/social context;
-   content-heavy interaction;
-   precision requirements.

Domain must not turn an industry label into a fixed visual style.

For example:

``` text
Finance ≠ automatically blue/green/cards
```

Instead:

``` text
Finance
   ↓
design-relevant contextual signals
   ↓
Theme Resolution
```

## 4.2 Contract

Conceptually:

``` kotlin
data class Domain(
    val kind: DomainKind,
)
```

The final implementation of `DomainKind` and the supported catalogue
remain separate from the conceptual contract.

The domain model covers broad product contexts including:

-   Finance
-   Commerce
-   Social
-   Messaging
-   Productivity
-   Developer/technical
-   Healthcare
-   Education
-   Travel
-   Media
-   Enterprise/admin
-   Creative/portfolio

This list is not yet a final public catalogue.

## 4.3 Granularity

Domain is product-level.

It should not become a representation of the application's business
hierarchy.

Avoid:

``` text
Finance
└── Budgeting
    └── Monthly budget
```

Such structures belong to application/business modelling rather than the
Basis theme system.

## 4.4 Domain influence

Domain may influence resolution across any token family where product
context is relevant:

``` text
Color
Typography
Spacing
Radius
Depth
Motion
Size
```

However, Domain does not directly assign token values.

For example:

``` text
Domain.Finance
       ↓
contextual resolution preference
       ↓
resolved Typography / Spacing / Color / ...
```

not:

``` text
Domain.Finance
       ↓
Spacing.Level3 = 12dp
```

## 4.5 Boundaries

Domain does not:

-   encode business logic;
-   define application data models;
-   prescribe visual style directly;
-   directly assign token values;
-   replace Mood or Identity;
-   replace Appearance.

## 4.6 Cross-domain products

Products that genuinely span multiple domains remain an open
catalogue/model question.

The current contract does not introduce arbitrary hierarchical or
multi-domain structures solely to solve this case.

# 5. Appearance

## 5.1 Definition

Appearance is the explicit visual customization surface exposed by
Basis.

It exists for consumers who want to:

-   tune a generated theme;
-   partially customize a Basis theme;
-   provide an established design system;
-   control selected token or component contracts.

Appearance is not a second theme-intent system.

It is explicit customization over the public Basis vocabulary.

## 5.2 Core principle

Basis controls what is customizable.

Consumers do not receive an unrestricted styling escape hatch.

Therefore:

``` text
Appearance
    = supported customization surface
```

not:

``` text
Appearance
    = arbitrary styling
```

## 5.3 Token customization

The current public token families are:

``` text
Color
Typography
Spacing
Radius
Depth
Motion
Size
```

Appearance may expose customization for deliberately supported parts of
these families.

Conceptually:

``` text
Appearance
├── Color
├── Typography
├── Spacing
├── Radius
├── Depth
├── Motion
└── Size
```

The exact exposure catalogue is an implementation/public-API decision
and grows as token contracts are finalized.

## 5.4 Scalar token customization

A scalar token may be explicitly overridden.

For example:

``` text
Radius.Level3 → explicit value
Spacing.Level2 → explicit value
```

The consumer changes the resolved value of an existing Basis token.

They do not create a new token type.

## 5.5 Composite token customization

Tokens may be composite.

Examples include:

-   Typography tokens;
-   Control Size tokens;
-   Motion tokens;
-   Elevation/depth expressions;
-   structured easing/spring values;
-   gradient tokens.

Appearance therefore conceptually supports:

``` text
whole composite token override
```

and, where Basis deliberately exposes it:

``` text
constituent-property override
```

For example:

``` text
Typography.Content.Level2
Typography.Content.Level2.fontWeight
```

The fact that a token is composite does not automatically make every
internal constituent public.

For Typography, Basis may deliberately expose font-family customization
at role and level scopes. Where both apply to font-family assignment,
the more-specific level scope refines the role scope:

``` text
Typography.Structure
    <
Typography.Structure.Level1
```

This is a typography-family specificity rule, not a universal Appearance
precedence rule for every token family.

## 5.6 Token-family/group customization

Appearance may expose customization at group/family scopes where Basis
deliberately defines such a contract.

Examples of conceptual scope include:

``` text
Typography
Typography.Content
Typography.Content.Level2
Typography.Content.Level2.fontWeight
```

The exact precedence between overlapping scopes is intentionally not
defined yet.

It will be designed after the token and component public surfaces are
sufficiently established.

## 5.7 Component customization

Public Basis components do not expose arbitrary instance styling.

Avoid contracts such as:

``` kotlin
BasisButton(
    color = ...,
    radius = ...,
)
```

unless such properties are deliberately part of the component API.

Instead, components consume resolved Basis tokens.

Appearance may expose component-specific or component-family
customization where Basis deliberately chooses to make such a contract
public.

Conceptually:

``` text
Appearance
├── Token customization
└── Component customization
```

The exact component API belongs to the Components phase.

## 5.8 What Appearance cannot do

Appearance cannot:

-   create new token types;
-   redefine the semantic meaning of an existing token;
-   arbitrarily style component instances;
-   automatically expose internal implementation values;
-   change Identity, Mood, or Domain;
-   bypass mandatory Constraints.

For example, if `Color.Interactive` is not a public Basis token,
Appearance cannot create that contract merely by supplying a value.

## 5.9 Appearance and intent

Appearance can be used together with intent:

``` text
Identity + Mood + Domain + Appearance
```

or independently:

``` text
Appearance only
```

The latter is the first-class Bring-Your-Own-Design-System path.

The resolver remains the same in both cases.

## 5.10 Appearance versus derived values

Appearance is explicit, but explicit customization does not imply
permission to violate mandatory constraints.

Conceptually:

``` text
Intent
   +
Appearance
   ↓
candidate resolution
   ↓
Constraint validation
   ↓
valid resolved theme
```

If an explicit Appearance customization makes the requested result
unsatisfiable under mandatory constraints, the system must not silently
violate the constraint.

# 6. Constraints

## 6.1 Definition

Constraints are authoritative validity requirements.

They define what a resolved theme must satisfy.

They are fundamentally different from preferences:

``` text
Mood        → desired character
Appearance  → explicit customization
Constraint  → must remain true
```

Aesthetic intent cannot silently override a mandatory constraint.

## 6.2 Contract

Conceptually:

``` kotlin
data class Constraints(
    val accessibility: AccessibilityConstraints,
)
```

The exact public constraint catalogue remains open.

Accessibility is the first established constraint area.

## 6.3 Accessibility

The constraint model includes:

-   reduced motion;
-   contrast/legibility requirements.

The final API and standard-specific representation are deferred until
the relevant token families and accessibility implementation are
designed.

## 6.4 Reduced motion

Reduced motion is a Constraint.

It is not:

-   a Mood dimension;
-   a Motion token;
-   a consumer styling preference.

When reduced motion is required, Motion resolution must produce an
expression that satisfies the requirement.

This does not mean simply:

``` text
duration = 0
```

The implementation may need to:

-   remove motion;
-   simplify motion;
-   replace a motion pattern;
-   reduce its perceptual effect;
-   otherwise adapt the resolved motion contract.

The Motion semantic token remains intact.

## 6.5 Contrast and legibility

Contrast/legibility requirements constrain resolved Color relationships.

Appearance may explicitly request a color, but the final result must
still satisfy mandatory contrast requirements where applicable.

The exact contrast requirements, applicability rules, and
standard-specific ratios are implementation-level accessibility
decisions.

## 6.6 Constraint authority

A mandatory constraint is authoritative.

Conceptually:

``` text
candidate theme
      ↓
constraint validation
      ↓
valid
  or
unsatisfiable
```

The resolver must not silently weaken a mandatory constraint because:

-   Mood prefers something else;
-   Domain prefers something else;
-   Identity supplies a conflicting palette;
-   Appearance explicitly requests a conflicting value.

## 6.7 Unsatisfiable resolution

If the applicable authoritative inputs cannot produce a valid theme,
resolution must fail or return an explicit unsatisfiable result.

It must not silently return an invalid theme.

The exact failure representation is still open.

# 7. Cross-Input Rules

The inputs intentionally have different semantic boundaries.

  -----------------------------------------------------------------------
  Input                   Provides                Does not directly
                                                  provide
  ----------------------- ----------------------- -----------------------
  Identity                visual identity         semantic roles or
                          material + brand        component styling
                          prominence              

  Mood                    visual character        concrete token values

  Domain                  design-relevant product industry-specific
                          context                 visual prescriptions

  Appearance              explicit supported      arbitrary styling or
                          customization           new token types

  Constraints             validity requirements   aesthetic direction
  -----------------------------------------------------------------------

## No semantic collapse

These concepts should not be merged simply because they eventually
influence the same token.

For example:

``` text
Identity.BrandColor
```

does not become a Color semantic token until resolution interprets it.

Similarly:

``` text
Mood.Colorfulness
```

is not itself a Color token.

And:

``` text
Constraints.ReducedMotion
```

is not a Motion token.

Each retains its own meaning through resolution.

# 8. Optionality

Intent inputs are independently optional.

A consumer may provide:

``` text
Identity
Mood
Domain
```

in any useful subset.

Appearance is independently optional.

Constraints may have defaults and/or environment-derived requirements
depending on the final implementation.

The architecture therefore supports:

``` text
Identity + Mood + Domain
Identity + Appearance
Mood + Appearance
Domain + Appearance
Appearance only
...
```

without creating separate resolution pipelines.

The important invariant is that the resolver interprets the information
actually supplied rather than requiring consumers to manufacture intent
they do not have.

# 9. Input Ownership

The current conceptual ownership model is:

``` text
Identity
    consumer-provided identity material

Mood
    consumer-provided intent, interpreted through Basis profiles/dimensions

Domain
    consumer-provided product context interpreted through Basis domain profiles

Appearance
    consumer-provided explicit customization through Basis-owned public contracts

Constraints
    authoritative requirements supplied by consumer, accessibility configuration,
    environment, or other legitimate sources as defined by the final implementation
```

Basis owns the vocabulary and interpretation rules.

Consumers supply information within those contracts.

Consumers do not extend the vocabulary dynamically.

------------------------------------------------------------------------

# 11. Boundary with Theme Resolution

These contracts define what each input means and what information it may
carry. They do not define how the Theme Resolution Engine combines
inputs, generates candidates, evaluates dependencies, or selects
resolved values. Those responsibilities belong to the Theme Resolution
architecture.
