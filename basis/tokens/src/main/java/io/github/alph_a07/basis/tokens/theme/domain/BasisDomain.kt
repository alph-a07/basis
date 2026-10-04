package io.github.alph_a07.basis.tokens.theme.domain

/**
 * A broad product context that is relevant to design resolution.
 *
 * A kind names a design-relevant problem space, not an industry and not a visual style. Selecting
 * a kind never implies a particular color, type scale, spacing scale or component; it tells
 * Theme Resolution which contextual signals are relevant, such as information density, numerical
 * readability, comparison requirements or transactional context. Theme Resolution then decides how
 * those signals shape the resolved theme.
 *
 * The catalogue covers broad product contexts. It is intentionally shallow: it is not an
 * application business hierarchy, so a consumer cannot nest a domain inside another to describe
 * their own product structure.
 *
 * Basis extends this catalogue when genuine cross-product context justifies a new entry.
 */
enum class BasisDomainKind {
    /** Numerical and transactional context where figures must be read and compared precisely. */
    Finance,

    /** Product catalogues and purchasing flows. */
    Commerce,

    /** Profiles, feeds and relationship-driven interaction. */
    Social,

    /** Conversation and direct communication. */
    Messaging,

    /** Task, document and schedule management. */
    Productivity,

    /** Developer tooling and technical interfaces, where information density is high. */
    Technical,

    /** Care and clinical context, where legibility and clarity carry high consequence. */
    Healthcare,

    /** Teaching and study contexts. */
    Education,

    /** Booking, itineraries and destination context. */
    Travel,

    /** Audio, video and rich media consumption. */
    Media,

    /** Internal administration and operational back-office tools. */
    Enterprise,

    /** Portfolio, studio and showcase work, where visual expression leads. */
    Creative,
}

/**
 * The broad product context that should inform design resolution.
 *
 * Domain supplies context, not style. It exists so that a product can influence resolution across
 * whichever token families are relevant to it — color, typography, spacing, radius, depth, motion
 * and size — without the consumer having to spell out token values for each.
 *
 * A domain is product-level rather than structural: it describes the kind of product, not the
 * hierarchy of the application that hosts it. Modelling a product that genuinely spans several
 * contexts is an open catalogue question, so this contract describes a single context rather than
 * assuming a hierarchy or a precedence rule between multiple kinds.
 *
 * @property kind The product context.
 */
data class BasisDomain(
    val kind: BasisDomainKind,
)
