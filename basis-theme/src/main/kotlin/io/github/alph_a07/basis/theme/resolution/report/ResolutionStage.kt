package io.github.alph_a07.basis.theme.resolution.report

/** Pipeline stage that produced a [ReportEntry]. */
public enum class ResolutionStage {
    /** Input normalization and validation. */
    Normalize,

    /** Domain and interaction influence blending. */
    Domain,

    /** Mood profile projection. */
    Mood,

    /** Brand anchor application. */
    Identity,

    /** Font family assignment. */
    Fonts,

    /** Base token table population. */
    Base,

    /** Token family derivation. */
    Derive,

    /** Control override application. */
    Control,

    /** Hard-constraint enforcement. */
    Enforce,

    /** Final emit. */
    Emit,
}
