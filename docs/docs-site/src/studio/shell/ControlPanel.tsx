import React, { useState, useMemo } from 'react';
import type { BasisIntentState } from '../state/serialize.js';
import { Color } from '../controls/Color.js';
import { ColorList } from '../controls/ColorList.js';
import { Choice } from '../controls/Choice.js';
import { MultiChoice } from '../controls/MultiChoice.js';
import { Toggle } from '../controls/Toggle.js';
import { Knob } from '../controls/Knob.js';
import { Typography } from '../controls/Typography.js';
import { PathMap } from '../controls/PathMap.js';
import { JsonEditor } from '../controls/JsonEditor.js';
import type { ControlDefinition } from '../controls/registry.js';
import {
  RAIL_CATEGORIES,
  PRIMARY_KNOBS,
  ADVANCED_KNOBS,
  type RailCategory,
} from '../config/studio-ui.js';
import type { ThemeViolation } from '../state/resolveClient.js';

interface ControlPanelProps {
  intent: BasisIntentState;
  registry: Map<string, ControlDefinition>;
  onSet: (pointer: string, value: any, immediate?: boolean) => void;
  onUnset: (pointer: string) => void;
  onResetAll: () => void;
  activeCategory?: RailCategory;
  onSelectCategory?: (cat: RailCategory) => void;
  violations?: ThemeViolation[];
  effectiveKnobs?: Record<string, string | number>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  intent,
  registry,
  onSet,
  onUnset,
  onResetAll,
  activeCategory: propActiveCategory,
  onSelectCategory,
  violations = [],
  effectiveKnobs = {},
}) => {
  const [internalCategory, setInternalCategory] = useState<RailCategory>('mood');
  const [showAdvancedKnobs, setShowAdvancedKnobs] = useState(false);

  const activeCategory = propActiveCategory || internalCategory;

  const handleCategoryChange = (cat: RailCategory) => {
    setInternalCategory(cat);
    onSelectCategory?.(cat);
  };

  // Map violations to categories
  const violationCountsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const v of violations) {
      const clean = v.path.replace(/^\//, '');
      const seg = clean.split('/')[0];
      if (seg === 'control') {
        const sub = clean.split('/')[1];
        counts[sub] = (counts[sub] || 0) + 1;
      } else {
        counts[seg] = (counts[seg] || 0) + 1;
      }
    }
    return counts;
  }, [violations]);

  // Compute "set" counts per category
  const setCountsByCategory = useMemo(() => {
    const counts: Record<RailCategory, number> = {
      mood: 0,
      identity: 0,
      domain: 0,
      mode: 0,
      fonts: 0,
      constraints: 0,
      tokens: 0,
      components: 0,
    };

    // Mood
    if (intent.mood?.preset) counts.mood++;
    if (intent.mood?.knobs) {
      for (const val of Object.values(intent.mood.knobs)) {
        if (val !== null && val !== undefined) counts.mood++;
      }
    }

    // Identity
    if (intent.identity?.brandColor) counts.identity++;
    if (intent.identity?.supportingColors?.length) counts.identity++;
    if (intent.identity?.presence) counts.identity++;
    if (intent.identity?.deriveColors === false) counts.identity++;

    // Domain
    if (intent.domain?.domains?.length) counts.domain += intent.domain.domains.length;
    if (intent.domain?.interactions?.length) counts.domain += intent.domain.interactions.length;

    // Mode
    if (intent.control?.mode?.targets?.length || intent.control?.mode?.preferred) counts.mode++;

    // Fonts
    if (intent.identity?.typography) counts.fonts++;
    if (intent.control?.fonts?.levelFamilies && Object.keys(intent.control.fonts.levelFamilies).length) counts.fonts++;

    // Constraints
    if (intent.control?.constraints && Object.keys(intent.control.constraints).length) counts.constraints++;

    // Tokens
    if (intent.control?.tokens?.paths && Object.keys(intent.control.tokens.paths).length) counts.tokens++;

    // Components
    if (intent.control?.components?.byComponent && Object.keys(intent.control.components.byComponent).length) counts.components++;

    return counts;
  }, [intent]);

  // Render controls for selected category
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'mood': {
        const presetCtrl = registry.get('/mood/preset');
        return (
          <div className="category-content-pane">
            {presetCtrl && (
              <Choice
                label={presetCtrl.label}
                summary={presetCtrl.summary}
                choices={presetCtrl.choices || []}
                value={intent.mood?.preset || null}
                onChange={(val) => {
                  if (val === null) onUnset('/mood/preset');
                  else onSet('/mood/preset', val);
                }}
              />
            )}

            <div className="knobs-section">
              <h4 className="controls-group-title">Primary Knobs</h4>
              {PRIMARY_KNOBS.map((name) => {
                const pointer = `/mood/knobs/${name}`;
                const ctrl = registry.get(pointer);
                if (!ctrl) return null;
                const currentVal = intent.mood?.knobs?.[name];
                return (
                  <Knob
                    key={pointer}
                    name={name}
                    label={ctrl.label}
                    summary={ctrl.summary}
                    min={ctrl.min ?? -1}
                    max={ctrl.max ?? 1}
                    step={ctrl.step ?? 0.05}
                    value={currentVal !== undefined ? currentVal : null}
                    effectiveValue={effectiveKnobs[name]}
                    onChange={(val, immediate) => onSet(pointer, val, immediate)}
                    onReset={() => onUnset(pointer)}
                  />
                );
              })}

              <button
                type="button"
                className="studio-btn btn-secondary btn-sm advanced-knobs-toggle"
                onClick={() => setShowAdvancedKnobs(!showAdvancedKnobs)}
                aria-expanded={showAdvancedKnobs}
              >
                {showAdvancedKnobs ? '▲ Hide Advanced Knobs' : '▼ Show Advanced Knobs (4)'}
              </button>

              {showAdvancedKnobs && (
                <div className="advanced-knobs-group">
                  {ADVANCED_KNOBS.map((name) => {
                    const pointer = `/mood/knobs/${name}`;
                    const ctrl = registry.get(pointer);
                    if (!ctrl) return null;
                    const currentVal = intent.mood?.knobs?.[name];
                    return (
                      <Knob
                        key={pointer}
                        name={name}
                        label={ctrl.label}
                        summary={ctrl.summary}
                        min={ctrl.min ?? -1}
                        max={ctrl.max ?? 1}
                        step={ctrl.step ?? 0.05}
                        value={currentVal !== undefined ? currentVal : null}
                        effectiveValue={effectiveKnobs[name]}
                        onChange={(val, immediate) => onSet(pointer, val, immediate)}
                        onReset={() => onUnset(pointer)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'identity': {
        const brandColorCtrl = registry.get('/identity/brandColor');
        const supportingColorsCtrl = registry.get('/identity/supportingColors');
        const presenceCtrl = registry.get('/identity/presence');
        const deriveColorsCtrl = registry.get('/identity/deriveColors');

        const hasBrandColor = Boolean(intent.identity?.brandColor?.value);

        return (
          <div className="category-content-pane">
            {brandColorCtrl && (
              <Color
                id="brandColor"
                label={brandColorCtrl.label}
                summary={brandColorCtrl.summary}
                value={intent.identity?.brandColor || null}
                onChange={(val) => {
                  if (val === null) onUnset('/identity/brandColor');
                  else onSet('/identity/brandColor', val);
                }}
              />
            )}

            {supportingColorsCtrl && (
              <ColorList
                label={supportingColorsCtrl.label}
                summary={supportingColorsCtrl.summary}
                value={intent.identity?.supportingColors || []}
                maxCount={3}
                onChange={(val) => {
                  if (!val || val.length === 0) onUnset('/identity/supportingColors');
                  else onSet('/identity/supportingColors', val);
                }}
              />
            )}

            {presenceCtrl && (
              <div className="control-wrapper-with-explanation">
                <Choice
                  label={presenceCtrl.label}
                  summary={presenceCtrl.summary}
                  choices={presenceCtrl.choices || []}
                  value={intent.identity?.presence || null}
                  disabled={!hasBrandColor}
                  onChange={(val) => {
                    if (val === null) onUnset('/identity/presence');
                    else onSet('/identity/presence', val);
                  }}
                />
                {!hasBrandColor && (
                  <p className="control-disabled-explanation">
                    Brand presence requires a brand color to be set first.
                  </p>
                )}
              </div>
            )}

            {deriveColorsCtrl && (
              <Toggle
                id="derive-colors"
                label={deriveColorsCtrl.label}
                summary={deriveColorsCtrl.summary}
                checked={intent.identity?.deriveColors !== false}
                onChange={(val) => onSet('/identity/deriveColors', val)}
              />
            )}
          </div>
        );
      }

      case 'domain': {
        const domainsCtrl = registry.get('/domain/domains');
        const interactionsCtrl = registry.get('/domain/interactions');

        return (
          <div className="category-content-pane">
            {domainsCtrl && (
              <MultiChoice
                label={domainsCtrl.label}
                summary={domainsCtrl.summary}
                choices={domainsCtrl.choices || []}
                values={intent.domain?.domains || []}
                onChange={(val) => {
                  if (!val || val.length === 0) onUnset('/domain/domains');
                  else onSet('/domain/domains', val);
                }}
              />
            )}

            {interactionsCtrl && (
              <MultiChoice
                label={interactionsCtrl.label}
                summary={interactionsCtrl.summary}
                choices={interactionsCtrl.choices || []}
                values={intent.domain?.interactions || []}
                onChange={(val) => {
                  if (!val || val.length === 0) onUnset('/domain/interactions');
                  else onSet('/domain/interactions', val);
                }}
              />
            )}
          </div>
        );
      }

      case 'mode': {
        const modeTargets = intent.control?.mode?.targets || ['Light', 'Dark'];
        const preferred = intent.control?.mode?.preferred || 'Light';

        return (
          <div className="category-content-pane">
            <Choice
              label="Preferred Color Mode"
              summary="Preferred start mode for runtime theme generation"
              choices={[
                { id: 'Light', label: 'Light', summary: 'Leans toward light theme mode.' },
                { id: 'Dark', label: 'Dark', summary: 'Leans toward dark theme mode.' },
              ]}
              value={preferred}
              onChange={(val) => {
                onSet('/control/mode/preferred', val);
              }}
            />

            <MultiChoice
              label="Target Generated Modes"
              summary="Modes generated into CSS and runtime artifacts"
              choices={[
                { id: 'Light', label: 'Light Mode', summary: 'Delivers light theme mode in the resolved pair.' },
                { id: 'Dark', label: 'Dark Mode', summary: 'Delivers dark theme mode in the resolved pair.' },
              ]}
              values={modeTargets}
              onChange={(val) => {
                onSet('/control/mode/targets', val);
              }}
            />
          </div>
        );
      }

      case 'fonts': {
        const typographyCtrl = registry.get('/identity/typography');

        return (
          <div className="category-content-pane">
            {typographyCtrl && (
              <Typography
                label={typographyCtrl.label}
                summary={typographyCtrl.summary}
                value={intent.identity?.typography || null}
                onChange={(val) => {
                  if (!val) onUnset('/identity/typography');
                  else onSet('/identity/typography', val);
                }}
              />
            )}
          </div>
        );
      }

      case 'constraints': {
        const minTouchTarget = intent.control?.constraints?.minTouchTarget;
        const targetValue = typeof minTouchTarget === 'number' ? minTouchTarget : 48;

        return (
          <div className="category-content-pane">
            <div className="studio-control-field">
              <label className="control-label" title="Minimum interactive touch target size in pixels (e.g. 48px)">
                Minimum Touch Target (px)
              </label>
              <input
                type="number"
                className="studio-input"
                min="24"
                max="64"
                step="4"
                value={targetValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onSet('/control/constraints/minTouchTarget', val);
                }}
              />
            </div>
          </div>
        );
      }

      case 'tokens': {
        const paths = intent.control?.tokens?.paths || {};

        return (
          <div className="category-content-pane">
            <PathMap
              label="Token Overrides"
              summary="Direct token path overrides (e.g. color.surface.default -> #123456)"
              paths={paths}
              onChange={(val) => {
                if (!val || Object.keys(val).length === 0) onUnset('/control/tokens/paths');
                else onSet('/control/tokens/paths', val);
              }}
            />
          </div>
        );
      }

      case 'components': {
        const byComponent = intent.control?.components?.byComponent || {};

        return (
          <div className="category-content-pane">
            <div className="studio-control-field">
              <label className="control-label" title="Raw JSON editor for ComponentStylePatch by component scope">
                Component Style Patches
              </label>
              <textarea
                className="studio-input"
                rows={8}
                value={JSON.stringify(byComponent, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    if (!parsed || Object.keys(parsed).length === 0) onUnset('/control/components/byComponent');
                    else onSet('/control/components/byComponent', parsed);
                  } catch {
                    // Ignore syntax errors while typing
                  }
                }}
              />
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <aside className="studio-left-pane" aria-label="Controls Panel" data-part="left-pane">
      {/* Pane Header Row */}
      <div className="left-pane-header">
        <div className="pane-title-group">
          <h2 className="pane-title">Controls</h2>
          <p className="pane-desc">Edit BasisIntent parameters in real-time</p>
        </div>
        <button
          type="button"
          className="studio-btn btn-secondary btn-sm"
          onClick={onResetAll}
          title="Reset the whole intent (undoable)"
        >
          Reset
        </button>
      </div>

      {/* Category Rail + Content Workspace */}
      <div className="left-pane-body">
        {/* Sub-sidebar Category Rail */}
        <nav className="category-rail" role="tablist" aria-label="Intent Categories">
          {RAIL_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const setCount = setCountsByCategory[cat.id] || 0;
            const hasViolation = (violationCountsByCategory[cat.id] || 0) > 0;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                data-category={cat.id}
                aria-selected={isSelected}
                className={`rail-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
                title={cat.description}
              >
                <span className="rail-item-label">{cat.label}</span>
                <div className="rail-badges">
                  {setCount > 0 && <span className="rail-set-count">{setCount}</span>}
                  {hasViolation && <span className="rail-violation-dot" title="Violation in this category" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Active Category Content Area */}
        <div className="category-content-container" role="tabpanel">
          {renderCategoryContent()}
        </div>
      </div>
    </aside>
  );
};
