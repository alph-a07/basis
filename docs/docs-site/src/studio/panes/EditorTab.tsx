import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { json } from '@codemirror/lang-json';
import { autocompletion } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import {
  kotlinLanguage,
  studioSyntaxHighlighting,
  jsonCompletionSource,
} from './editorSupport.js';
import type { BasisIntentState } from '../state/serialize.js';
import type { ThemeViolation } from '../state/resolveClient.js';

interface EditorTabProps {
  intent: BasisIntentState;
  onApplyIntent: (intent: BasisIntentState) => void;
  violations?: ThemeViolation[];
  onCopyNotification?: (msg: string) => void;
}

export const EditorTab: React.FC<EditorTabProps> = ({
  intent,
  onApplyIntent,
  violations = [],
  onCopyNotification,
}) => {
  const [mode, setMode] = useState<'json' | 'kotlin'>('json');
  const [parseError, setParseError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const lastDispatchedJsonRef = useRef<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasUserEditsRef = useRef(false);

  // Canonical JSON text
  const canonicalJson = JSON.stringify(intent, null, 2);

  // Generate readable Kotlin representation of current intent
  const generateKotlinExport = useCallback((intentObj: BasisIntentState): string => {
    const lines: string[] = ['// Auto-generated BasisIntent Kotlin export', 'val intent = BasisIntent('];

    if (intentObj.identity) {
      lines.push('    identity = IdentityIntent(');
      if (intentObj.identity.brandColor) {
        lines.push(`        brandColor = ColorSpec.Hex("${intentObj.identity.brandColor.value}"),`);
      }
      if (intentObj.identity.presence) {
        lines.push(`        presence = BrandPresence.${intentObj.identity.presence},`);
      }
      if (intentObj.identity.deriveColors !== undefined) {
        lines.push(`        deriveColors = ${intentObj.identity.deriveColors},`);
      }
      lines.push('    ),');
    }

    if (intentObj.mood) {
      lines.push('    mood = MoodIntent(');
      if (intentObj.mood.preset) {
        lines.push(`        preset = MoodPreset.${intentObj.mood.preset},`);
      }
      if (intentObj.mood.knobs) {
        lines.push('        knobs = MoodKnobs(');
        for (const [k, v] of Object.entries(intentObj.mood.knobs)) {
          lines.push(`            ${k} = ${v}f,`);
        }
        lines.push('        ),');
      }
      lines.push('    ),');
    }

    if (intentObj.domain) {
      lines.push('    domain = DomainIntent(');
      if (intentObj.domain.domains?.length) {
        lines.push(`        domains = setOf(${intentObj.domain.domains.map((d: string) => `ProductDomain.${d}`).join(', ')}),`);
      }
      if (intentObj.domain.interactions?.length) {
        lines.push(`        interactions = setOf(${intentObj.domain.interactions.map((i: string) => `InteractionPattern.${i}`).join(', ')}),`);
      }
      lines.push('    ),');
    }

    lines.push(')');
    return lines.join('\n');
  }, []);

  // Initialize CodeMirror editor
  useEffect(() => {
    if (!containerRef.current) return;

    const initialContent = mode === 'json' ? canonicalJson : generateKotlinExport(intent);
    lastDispatchedJsonRef.current = canonicalJson;

    const languageExtensions =
      mode === 'json'
        ? [
            json(),
            autocompletion({
              override: [jsonCompletionSource],
              defaultKeymap: true,
            }),
          ]
        : [kotlinLanguage];

    const state = EditorState.create({
      doc: initialContent,
      extensions: [
        basicSetup,
        ...languageExtensions,
        studioSyntaxHighlighting,
        EditorView.theme({
          '&': { height: '100%', fontSize: '12px' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && mode === 'json') {
            hasUserEditsRef.current = true;
            const text = update.state.doc.toString();

            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current);
            }

            debounceTimerRef.current = setTimeout(() => {
              try {
                const parsed = JSON.parse(text);
                setParseError(null);
                lastDispatchedJsonRef.current = JSON.stringify(parsed, null, 2);
                onApplyIntent(parsed);
                hasUserEditsRef.current = false;
              } catch (e: any) {
                setParseError(e.message || 'Invalid JSON syntax');
              }
            }, 400);
          }
        }),
        EditorView.editable.of(mode === 'json'),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    editorViewRef.current = view;

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      view.destroy();
      editorViewRef.current = null;
    };
  }, [mode]);

  // Sync external intent changes into CodeMirror editor
  useEffect(() => {
    if (!editorViewRef.current) return;
    if (mode === 'kotlin') {
      const kotlinText = generateKotlinExport(intent);
      const currentDoc = editorViewRef.current.state.doc.toString();
      if (currentDoc !== kotlinText) {
        editorViewRef.current.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: kotlinText },
        });
      }
      return;
    }

    // In JSON mode: only replace if user is not actively typing invalid text
    if (!hasUserEditsRef.current && canonicalJson !== lastDispatchedJsonRef.current) {
      lastDispatchedJsonRef.current = canonicalJson;
      const currentDoc = editorViewRef.current.state.doc.toString();
      if (currentDoc !== canonicalJson) {
        editorViewRef.current.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: canonicalJson },
        });
      }
    }
  }, [canonicalJson, intent, mode, generateKotlinExport]);

  const handleCopy = async () => {
    if (!editorViewRef.current) return;
    const text = editorViewRef.current.state.doc.toString();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (onCopyNotification) onCopyNotification(`Copied ${mode.toUpperCase()} source`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
    }
  };

  const handleFormat = () => {
    if (!editorViewRef.current || mode !== 'json') return;
    try {
      const current = editorViewRef.current.state.doc.toString();
      const formatted = JSON.stringify(JSON.parse(current), null, 2);
      editorViewRef.current.dispatch({
        changes: { from: 0, to: current.length, insert: formatted },
      });
      setParseError(null);
    } catch (e: any) {
      setParseError(e.message || 'Cannot format invalid JSON');
    }
  };

  return (
    <div className="studio-editor-tab" data-part="editor-tab">
      {/* Top Bar inside Editor */}
      <div className="editor-controls-bar">
        <div className="editor-mode-toggle" role="radiogroup" aria-label="Editor language mode">
          <button
            type="button"
            className="editor-mode-btn"
            data-active={mode === 'json'}
            onClick={() => setMode('json')}
          >
            JSON
          </button>
          <button
            type="button"
            className="editor-mode-btn"
            data-active={mode === 'kotlin'}
            onClick={() => setMode('kotlin')}
          >
            Kotlin
          </button>
        </div>

        <div className="editor-actions">
          {mode === 'json' && (
            <button
              type="button"
              className="studio-btn btn-secondary btn-sm"
              onClick={handleFormat}
              title="Format JSON"
            >
              Format
            </button>
          )}
          <button
            type="button"
            className="studio-btn btn-secondary btn-sm"
            onClick={handleCopy}
            title={`Copy ${mode.toUpperCase()} source`}
          >
            {copied ? 'Copied!' : 'Copy source'}
          </button>
        </div>
      </div>

      {/* Kotlin Notice Note */}
      {mode === 'kotlin' && (
        <div className="editor-notice-banner" role="status">
          <span className="notice-icon">ℹ</span>
          <span>
            Editing Kotlin is not available yet (Kotlin parser not implemented in facade; read-only mode active).
          </span>
        </div>
      )}

      {/* Diagnostics / Error Banner */}
      {parseError && (
        <div className="editor-error-banner" role="alert">
          <span className="error-icon">⚠</span>
          <span className="error-msg">{parseError}</span>
        </div>
      )}

      {/* Facade Violations mapped into editor banner */}
      {violations.length > 0 && (
        <div className="editor-violations-banner">
          {violations.map((v, i) => (
            <div key={i} className="editor-violation-item">
              <code>{v.path}</code>: {v.message}
            </div>
          ))}
        </div>
      )}

      {/* CodeMirror Mounting Container */}
      <div className="editor-codemirror-wrapper" ref={containerRef} />
    </div>
  );
};
