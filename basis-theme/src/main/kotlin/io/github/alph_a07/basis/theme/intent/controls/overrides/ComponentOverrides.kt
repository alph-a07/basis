package io.github.alph_a07.basis.theme.intent.controls.overrides

import io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath
import io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath
import io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath
import io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath
import io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath
import io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath
import io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath

/**
 * Per-component style patches keyed by component id.
 *
 * Patches never carry raw colors, dimensions, or instance keys; they reference token paths and
 * are interpreted at component read time, most specific binding winning.
 *
 * @property byComponent Patches per component id, e.g. `ComponentId("button")`.
 */
public data class ComponentOverrides(
    public val byComponent: Map<ComponentId, ComponentOverride> = emptyMap(),
)

/**
 * One component's patch set across variants and states.
 *
 * Precedence at read time is [byVariantState], then [byVariant], then [byState], then [all];
 * irrelevant fields for a component are ignored.
 *
 * @property all Patch applied to every variant and state of the component.
 * @property byVariant Patches per variant id.
 * @property byState Patches per state id.
 * @property byVariantState Patches per variant-and-state combination.
 */
public data class ComponentOverride(
    public val all: ComponentStylePatch? = null,
    public val byVariant: Map<VariantId, ComponentStylePatch> = emptyMap(),
    public val byState: Map<StateId, ComponentStylePatch> = emptyMap(),
    public val byVariantState: Map<VariantStateKey, ComponentStylePatch> = emptyMap(),
)

/**
 * Split style patch: fields shared across component families plus a typed per-family extension.
 *
 * @property universal Fields with high hit-rate across most components.
 * @property extra Family-specific fields, opaque to theme core and interpreted only by the owning
 * component family.
 */
public data class ComponentStylePatch(
    public val universal: UniversalStylePatch? = null,
    public val extra: ComponentExtraPatch? = null,
)

/**
 * Fields common to a clear majority of components; irrelevant fields are ignored per component.
 *
 * Every field references a token path so patches stay theme-agnostic. A reference that does not
 * resolve to a known token is skipped, with an optional report entry.
 *
 * @property prominence Hierarchy tier of the component instance.
 * @property treatment Visual treatment family of the component instance.
 * @property surface Surface color path, e.g. [ColorTokenPath.SurfaceDefault].
 * @property content Content color path.
 * @property border Border color path.
 * @property radius Radius level path.
 * @property typography Typography role path.
 * @property padding Outer content padding spacing path.
 * @property gap Inner slot spacing path.
 */
public data class UniversalStylePatch(
    public val prominence: ProminenceTier? = null,
    public val treatment: Treatment? = null,
    public val surface: ColorTokenPath? = null,
    public val content: ColorTokenPath? = null,
    public val border: ColorTokenPath? = null,
    public val radius: RadiusTokenPath? = null,
    public val typography: TypographyTokenPath? = null,
    public val padding: SpacingTokenPath? = null,
    public val gap: SpacingTokenPath? = null,
)

/**
 * Family-specific patch fields; the sealed hierarchy grows with component coverage.
 */
public sealed interface ComponentExtraPatch {

    /**
     * Button-family fields beyond the universal patch.
     *
     * @property icon Icon color path.
     * @property iconSize Icon size level path.
     * @property controlSize Control size level path.
     * @property depth Depth level path.
     * @property motion Motion purpose path.
     */
    public data class Button(
        public val icon: ColorTokenPath? = null,
        public val iconSize: IconSizeTokenPath? = null,
        public val controlSize: ControlSizeTokenPath? = null,
        public val depth: DepthTokenPath? = null,
        public val motion: MotionTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Text-field-family fields beyond the universal patch.
     *
     * @property labelTypography Label typography role path.
     * @property placeholderContent Placeholder content color path.
     * @property leadingIcon Leading icon color path.
     * @property controlSize Control size level path.
     */
    public data class TextField(
        public val labelTypography: TypographyTokenPath? = null,
        public val placeholderContent: ColorTokenPath? = null,
        public val leadingIcon: ColorTokenPath? = null,
        public val controlSize: ControlSizeTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Switch-family fields beyond the universal patch.
     *
     * @property trackOn Track color path in the on state.
     * @property trackOff Track color path in the off state.
     * @property thumb Thumb color path.
     */
    public data class Switch(
        public val trackOn: ColorTokenPath? = null,
        public val trackOff: ColorTokenPath? = null,
        public val thumb: ColorTokenPath? = null,
    ) : ComponentExtraPatch

    /**
     * Dialog-family fields beyond the universal patch.
     *
     * @property scrim Scrim color path.
     * @property depth Depth level path.
     */
    public data class Dialog(
        public val scrim: ColorTokenPath? = null,
        public val depth: DepthTokenPath? = null,
    ) : ComponentExtraPatch
}

/** Hierarchy tier a component instance occupies. */
public enum class ProminenceTier {
    /** Primary actions and focal surfaces. */
    Primary,

    /** Supporting actions and secondary surfaces. */
    Secondary,

    /** Tertiary actions and recessive surfaces. */
    Tertiary,

    /** Minimal-presence actions such as icon-only or inline affordances. */
    Quiet,
}

/** Visual treatment family a component instance renders with. */
public enum class Treatment {
    /** Solid brand or role fill. */
    Fill,

    /** Bordered, transparent-bodied treatment. */
    Outline,

    /** Low-chroma tinted treatment. */
    Soft,

    /** Borderless, background-free treatment. */
    Ghost,

    /** High-contrast treatment for inverted surfaces. */
    Inverse,
}

/**
 * Stable identifier of one component family.
 *
 * @property value Component id, e.g. `"button"`.
 */
@JvmInline
public value class ComponentId(public val value: String) {
    init {
        require(value.isNotBlank()) { "ComponentId must not be blank." }
    }
}

/**
 * Stable identifier of one variant within a component family.
 *
 * @property value Variant id, e.g. `"primary"`.
 */
@JvmInline
public value class VariantId(public val value: String) {
    init {
        require(value.isNotBlank()) { "VariantId must not be blank." }
    }
}

/**
 * Stable identifier of one interaction state within a component family.
 *
 * @property value State id, e.g. `"pressed"`.
 */
@JvmInline
public value class StateId(public val value: String) {
    init {
        require(value.isNotBlank()) { "StateId must not be blank." }
    }
}

/**
 * Composite key addressing one variant in one state.
 *
 * @property variant Variant within the component family.
 * @property state Interaction state within the component family.
 */
public data class VariantStateKey(
    public val variant: VariantId,
    public val state: StateId,
)
