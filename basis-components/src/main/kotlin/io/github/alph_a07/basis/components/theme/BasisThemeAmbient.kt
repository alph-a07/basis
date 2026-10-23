package io.github.alph_a07.basis.components.theme

import androidx.compose.ui.text.TextStyle
import io.github.alph_a07.basis.components.theme.font.FontFamilyRegistry
import io.github.alph_a07.basis.components.theme.locals.BasisColorLocals
import io.github.alph_a07.basis.components.theme.locals.BasisMotionLocals
import io.github.alph_a07.basis.components.theme.locals.BasisTypographyLocals
import io.github.alph_a07.basis.theme.intent.ControlIntent
import io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl
import io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides
import io.github.alph_a07.basis.theme.resolution.report.ResolutionReport
import io.github.alph_a07.basis.theme.tokens.core.ResolvedTheme
import io.github.alph_a07.basis.theme.tokens.scalars.DepthTokens
import io.github.alph_a07.basis.theme.tokens.scalars.RadiusTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SizeTokens
import io.github.alph_a07.basis.theme.tokens.scalars.SpacingTokens

/**
 * Resolved theme values held in the composition ambient.
 *
 * Both the OKLCH source-of-truth [theme] and the Compose-ready accessor trees are carried so
 * components read through typed accessors while advanced consumers can reach raw tokens via
 * [BasisTheme.current].
 *
 * When nested under another [BasisTheme], an ambient completely replaces any outer ambient for its
 * subtree without merging.
 *
 * @property theme OKLCH source-of-truth retained for diagnostics and advanced access.
 * @property colors Compose-ready color locals converted at the theme entry boundary.
 * @property typography Compose-ready typography locals with [TextStyle] per type role.
 * @property spacing Spacing ladder, passed through unchanged.
 * @property radius Corner radius ladder, passed through unchanged.
 * @property depth Elevation and shadow ladder, passed through unchanged.
 * @property size Icon, avatar, control, and dot size ladders.
 * @property motion Semantic motion purpose specs.
 * @property componentOverrides Per-component overrides from [ControlIntent].
 * @property report Optional public diagnostics; present when the host chose to pass the report
 * through. Components must not depend on its presence.
 * @property constraints Hard constraints controls from [ConstraintsControl], including touch target and
 * contrast floors.
 * @property fontRegistry Registry mapping font references to Compose font families.
 */
public data class BasisThemeAmbient(
    public val theme: ResolvedTheme,
    public val colors: BasisColorLocals,
    public val typography: BasisTypographyLocals,
    public val spacing: SpacingTokens,
    public val radius: RadiusTokens,
    public val depth: DepthTokens,
    public val size: SizeTokens,
    public val motion: BasisMotionLocals,
    public val componentOverrides: ComponentOverrides,
    public val report: ResolutionReport?,
    public val constraints: ConstraintsControl = ConstraintsControl(),
    public val fontRegistry: FontFamilyRegistry = FontFamilyRegistry.Default,
)
