package io.github.alph_a07.basis.theme.intent

import io.github.alph_a07.basis.theme.color.ColorSpec
import io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef

/**
 * Brand-defining inputs: who the product is, independent of feel, priors, or floors.
 *
 * All fields are optional. [presence] is meaningful only when a brand color anchors it, and
 * [supportingColors] act as secondary brand anchors.
 *
 * @property brandColor Primary brand color, in any supported intake color space.
 * @property supportingColors Secondary brand anchors; at most four are honored and extras are
 * rejected during normalization.
 * @property presence How evident the brand color should be in semantic roles. `null` equivalents to [BrandPresence.Balanced].
 * @property typography Brand typeface intent, as candidates, role pins, or both.
 */
public data class IdentityIntent(
    public val brandColor: ColorSpec? = null,
    public val supportingColors: List<ColorSpec> = emptyList(),
    public val presence: BrandPresence? = null,
    public val typography: TypographyIdentity? = null,
)

/** How evident brand color is in semantic roles; a branding decision, not a mood or energy setting. */
public enum class BrandPresence {
    /** Brand color reaches selection, focus, and gradients only. */
    Subtle,

    /** Subtle surfaces plus a brand-filled primary call to action. */
    Balanced,

    /** [Balanced] plus elevated tint and stronger borders. */
    Strong,

    /** [Balanced] plus a mild tint on the default surface as well. */
    Dominant,
}

/**
 * A flexible identity intend for brand typography.
 * Provides fields to express both a ranked list of candidate families and explicit pins for each type ladder.
 *
 * @property candidates Ordered candidate families, strongest first.
 * @property structure Family pinned to the structure (heading) ladder.
 * @property content Family pinned to the content (body) ladder.
 * @property metadata Family pinned to the metadata (caption and label) ladder.
 */
public data class TypographyIdentity(
    public val candidates: List<FontFamilyRef> = emptyList(),
    public val structure: FontFamilyRef? = null,
    public val content: FontFamilyRef? = null,
    public val metadata: FontFamilyRef? = null,
)
