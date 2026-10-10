package io.github.alph_a07.basis.theme.intent

import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import io.github.alph_a07.basis.theme.intent.controls.FontControl
import io.github.alph_a07.basis.theme.intent.controls.ModeControl
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides

/**
 * Intent to drive fine-grained control over a resolved theme.
 *
 * @property tokens Sparse typed leaf overrides mirroring the token tree; [TokenOverrides.paths] is
 * the secondary path-map form for codegen and migrations.
 * @property components Per-component, variant, and state style patches.
 * @property mode Preferred color mode and which modes are generated.
 * @property fonts Deep type locks such as per-level families and weight clamps; brand-level
 * typography identity belongs to [TypographyIdentity].
 * @property constraints Non-negotiable floors applied after all overrides.
 */
public data class ControlIntent(
    public val tokens: TokenOverrides? = null,
    public val components: ComponentOverrides? = null,
    public val mode: ModeControl? = null,
    public val fonts: FontControl? = null,
    public val constraints: ConstraintsControl? = null,
)
