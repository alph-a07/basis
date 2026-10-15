package io.github.alph_a07.basis.theme.intent

/**
 * Intent to guide theme selection and token defaults for a product or interaction.
 *
 * @property domains Product-domain labels, blended by conservative rules.
 * @property interactions Interaction-pattern labels, blended by weighted means.
 */
public data class DomainIntent(
    public val domains: Set<ProductDomain> = emptySet(),
    public val interactions: Set<InteractionPattern> = emptySet(),
)

/** Recognizable product contexts that seed trust, density, and risk priors. */
public enum class ProductDomain {
    /** Banking, investing, and money management. */
    Finance,

    /** Wellness, clinical, and care products. */
    Health,

    /** Community, messaging, and identity-driven products. */
    Social,

    /** Tools, trackers, and work-focused products. */
    Productivity,

    /** Stores, marketplaces, and purchasing flows. */
    Commerce,

    /** Streaming, news, and entertainment products. */
    Media,

    /** Learning, courses, and reference products. */
    Education,

    /** Booking, planning, and trip products. */
    Travel,

    /** Device, utility, and system-facing products. */
    Utilities,

    /** Anything outside the named domains. */
    Other,
}

/** Recognizable interaction contexts that seed density, motion, and input priors. */
public enum class InteractionPattern {
    /** Tables, charts, and dense record browsing. */
    DataNavigation,

    /** Long and multi-field input flows. */
    FormsEntry,

    /** Conversational, message-heavy surfaces. */
    ChatMessaging,

    /** Scroll-first streams of mixed content. */
    ContentFeed,

    /** Focused long-form reading. */
    ContentReading,

    /** Query-first finding and exploration. */
    SearchDiscovery,

    /** Visual grids of media items. */
    MediaBrowse,

    /** Live metrics and operational monitoring. */
    DashboardMonitoring,

    /** Cart, payment, and purchase completion. */
    CheckoutCommerce,

    /** Sign-in, sign-up, and first-run experiences. */
    AuthOnboarding,

    /** Configuration-heavy preference surfaces. */
    SettingsAdmin,
}
