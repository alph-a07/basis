import React, { useState, useMemo } from 'react';
import { TokenPreview } from './previews/PreviewDispatcher.js';

interface TokensTabProps {
  tokens: Record<string, string>;
  kinds: Record<string, string>;
  groups: Record<string, string>;
  onCopyNotification?: (msg: string) => void;
}

export const TokensTab: React.FC<TokensTabProps> = ({
  tokens,
  kinds,
  groups,
  onCopyNotification,
}) => {
  const [search, setSearch] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Group tokens by family from facade metadata
  const groupedTokens = useMemo(() => {
    const map: Record<string, Array<{ name: string; value: string; kind: string }>> = {};

    for (const [name, value] of Object.entries(tokens)) {
      if (search && !name.toLowerCase().includes(search.toLowerCase()) && !value.toLowerCase().includes(search.toLowerCase())) {
        continue;
      }
      const group = groups[name] || 'other';
      const kind = kinds[name] || 'other';

      if (!map[group]) {
        map[group] = [];
      }
      map[group].push({ name, value, kind });
    }

    // Sort tokens within groups
    for (const group of Object.keys(map)) {
      map[group].sort((a, b) => a.name.localeCompare(b.name));
    }

    return map;
  }, [tokens, groups, kinds, search]);

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const copyTokenName = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedToken(name);
      if (onCopyNotification) onCopyNotification(`Copied token: ${name}`);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      setCopiedToken(name);
    }
  };

  const groupKeys = Object.keys(groupedTokens).sort();
  const totalVisibleTokens = groupKeys.reduce((acc, k) => acc + groupedTokens[k].length, 0);

  return (
    <div className="studio-tokens-tab" data-part="tokens-tab">
      {/* Search Header */}
      <div className="tokens-search-header">
        <div className="tokens-search-input-wrapper">
          <svg className="tokens-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="tokens-search-input"
            placeholder="Search resolved tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" className="tokens-search-clear" onClick={() => setSearch('')}>
              ×
            </button>
          )}
        </div>
        <span className="tokens-count-badge">{totalVisibleTokens} tokens</span>
      </div>

      {/* Grouped Token Families */}
      <div className="tokens-families-list">
        {groupKeys.length === 0 ? (
          <div className="tokens-empty-state">No matching tokens found for "{search}"</div>
        ) : (
          groupKeys.map((group) => {
            const isCollapsed = !!collapsedGroups[group];
            const tokenList = groupedTokens[group];

            return (
              <div key={group} className="token-family-group">
                <button
                  type="button"
                  className="token-family-header"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={!isCollapsed}
                >
                  <span className="family-title">
                    <span className="family-toggle-arrow">{isCollapsed ? '▶' : '▼'}</span>
                    <span className="family-name">{group}</span>
                  </span>
                  <span className="family-badge">{tokenList.length}</span>
                </button>

                {!isCollapsed && (
                  <div className="token-rows-list">
                    {tokenList.map(({ name, value, kind }) => (
                      <div
                        key={name}
                        className="token-row"
                        onClick={() => copyTokenName(name)}
                        title="Click to copy token name"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            copyTokenName(name);
                          }
                        }}
                      >
                        <div className="token-info">
                          <span className="token-name">{name}</span>
                          <span className="token-raw-value">{value}</span>
                        </div>

                        <div className="token-preview-wrapper" onClick={(e) => e.stopPropagation()}>
                          <TokenPreview tokenName={name} value={value} kind={kind} />
                        </div>

                        {copiedToken === name && <span className="token-copied-pill">Copied</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
