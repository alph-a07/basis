import React, { useState, useMemo } from 'react';
import { FONTS_CATALOG, evaluateFontEligibility, type FontItem } from '../fonts/catalog.js';
import type { FontFamilyRefInput } from '../state/serialize.js';

interface TypographyProps {
  label: string;
  summary: string;
  value?: {
    candidates?: FontFamilyRefInput[];
    structure?: FontFamilyRefInput | null;
    content?: FontFamilyRefInput | null;
    metadata?: FontFamilyRefInput | null;
  } | null;
  onChange: (value: any) => void;
  disabled?: boolean;
}

const CATALOG_DISCRIMINATOR = 'io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Catalog';

export const Typography: React.FC<TypographyProps> = ({
  label,
  summary,
  value,
  onChange,
  disabled = false,
}) => {
  const current = value || {};
  const [shortlistOnly, setShortlistOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePin = (role: 'structure' | 'content' | 'metadata', fontId: string) => {
    const next = { ...current };
    if (!fontId) {
      delete next[role];
    } else {
      next[role] = { type: CATALOG_DISCRIMINATOR, id: fontId };
    }
    onChange(next);
  };

  const handleCandidatesChange = (fontId: string, isChecked: boolean) => {
    const nextCandidates = [...(Array.isArray(current.candidates) ? current.candidates : [])];
    if (isChecked) {
      if (!nextCandidates.some((c) => c.id === fontId)) {
        nextCandidates.push({ type: CATALOG_DISCRIMINATOR, id: fontId });
      }
    } else {
      const idx = nextCandidates.findIndex((c) => c.id === fontId);
      if (idx >= 0) nextCandidates.splice(idx, 1);
    }
    onChange({ ...current, candidates: nextCandidates });
  };

  const hasAnyPin = Boolean(
    current.structure || current.content || current.metadata || (Array.isArray(current.candidates) && current.candidates.length > 0)
  );

  // Available fonts for structure, content, metadata
  const filteredFonts = useMemo(() => {
    let list = FONTS_CATALOG;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((f) => f.family.toLowerCase().includes(q) || f.category.includes(q));
    }
    return list;
  }, [searchQuery]);

  return (
    <div className={`studio-control-field typography-control ${disabled ? 'is-disabled' : ''}`}>
      <div className="control-header">
        <label className="control-label" title={summary}>
          {label}
        </label>
        {hasAnyPin && (
          <button
            type="button"
            className="control-reset-btn"
            onClick={() => onChange(null)}
            aria-label="Reset all typography pins"
            disabled={disabled}
          >
            Reset
          </button>
        )}
      </div>

      <div className="typography-role-pins">
        {/* Structure Pin */}
        <div className="role-pin-row">
          <label htmlFor="typography-structure-select" className="role-pin-label">
            Heading (Structure):
          </label>
          <select
            id="typography-structure-select"
            aria-label="Heading structure typography font pin"
            className="role-pin-select"
            value={current.structure?.id || ''}
            disabled={disabled}
            onChange={(e) => handlePin('structure', e.target.value)}
          >
            <option value="">Default (Inherit / Inter)</option>
            {filteredFonts.map((f) => {
              const elig = evaluateFontEligibility(f, 'structure');
              if (shortlistOnly && !elig.eligible) return null;
              return (
                <option
                  key={f.id}
                  value={f.id}
                  disabled={!elig.eligible}
                  title={elig.eligible ? 'Eligible' : elig.reason}
                >
                  {f.family} ({f.category}){!elig.eligible ? ` [Ineligible: ${elig.reason}]` : ''}
                </option>
              );
            })}
          </select>
        </div>

        {/* Content Pin */}
        <div className="role-pin-row">
          <label htmlFor="typography-content-select" className="role-pin-label">
            Body (Content):
          </label>
          <select
            id="typography-content-select"
            aria-label="Body content typography font pin"
            className="role-pin-select"
            value={current.content?.id || ''}
            disabled={disabled}
            onChange={(e) => handlePin('content', e.target.value)}
          >
            <option value="">Default (Inherit / Inter)</option>
            {filteredFonts.map((f) => {
              const elig = evaluateFontEligibility(f, 'content');
              if (shortlistOnly && !elig.eligible) return null;
              return (
                <option
                  key={f.id}
                  value={f.id}
                  disabled={!elig.eligible}
                  title={elig.eligible ? 'Eligible' : elig.reason}
                >
                  {f.family} ({f.category}){!elig.eligible ? ` [Ineligible: ${elig.reason}]` : ''}
                </option>
              );
            })}
          </select>
        </div>

        {/* Metadata Pin */}
        <div className="role-pin-row">
          <label htmlFor="typography-metadata-select" className="role-pin-label">
            Caption (Metadata):
          </label>
          <select
            id="typography-metadata-select"
            aria-label="Caption metadata typography font pin"
            className="role-pin-select"
            value={current.metadata?.id || ''}
            disabled={disabled}
            onChange={(e) => handlePin('metadata', e.target.value)}
          >
            <option value="">Default (Inherit / Inter)</option>
            {filteredFonts.map((f) => {
              const elig = evaluateFontEligibility(f, 'metadata');
              if (shortlistOnly && !elig.eligible) return null;
              return (
                <option
                  key={f.id}
                  value={f.id}
                  disabled={!elig.eligible}
                  title={elig.eligible ? 'Eligible' : elig.reason}
                >
                  {f.family} ({f.category}){!elig.eligible ? ` [Ineligible: ${elig.reason}]` : ''}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Shortlist filter toggle */}
      <div className="typography-filter-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px 0' }}>
        <label className="filter-checkbox-label" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={shortlistOnly}
            onChange={(e) => setShortlistOnly(e.target.checked)}
          />
          <span>Shortlisted by basis-theme rules</span>
        </label>
        <span style={{ fontSize: '11px', opacity: 0.6 }}>{FONTS_CATALOG.length} Google fonts</span>
      </div>

      {/* Candidates Exploration (Sample of top eligible fonts) */}
      <div className="typography-candidates-section">
        <span className="candidates-subheading">Candidate Pool:</span>
        <div className="candidate-chips-wrap">
          {filteredFonts.slice(0, 20).map((font) => {
            const isCandidate = (current.candidates || []).some((c) => c.id === font.id);
            return (
              <label
                key={font.id}
                className={`candidate-chip ${isCandidate ? 'is-selected' : ''}`}
                title={`${font.family} (${font.category})`}
              >
                <input
                  type="checkbox"
                  checked={isCandidate}
                  disabled={disabled}
                  onChange={(e) => handleCandidatesChange(font.id, e.target.checked)}
                />
                <span className="chip-name">{font.family}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
