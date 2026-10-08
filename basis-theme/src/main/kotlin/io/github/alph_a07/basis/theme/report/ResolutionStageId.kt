package io.github.alph_a07.basis.theme.report

/** Pipeline stage that produced a [ReportEntry]. */
public enum class ResolutionStageId {
    /** Input normalization and validation. */
    Normalize,

    /** Default and domain-prior seeding. */
    Seed,

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
