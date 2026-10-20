package io.github.alph_a07.basis.theme.resolution.report

/** Pipeline stage that produced a [ReportEntry]. */
public enum class ResolutionStage {
    /** Input normalization and validation. */
    Normalize,

    /** Domain and interaction influence blending. */
    Domain,

    /** Base token table population. */
    Base,

    /** Brand anchor application. */
    Identity,

    /** Mood profile projection. */
    Mood,

    /** Token family derivation. */
    Derive,

    /** Font family assignment. */
    Fonts,

    /** Control override application. */
    Control,

    /** Hard-constraint enforcement. */
    Enforce,

    /** Final emit. */
    Emit,
}
