# Basis context graph: schema

Single source of truth for the format of `.context/`. The build/update prompts and `AGENTS.md` refer to this file and never restate it. If they disagree with this file, this file wins.

## Layout

```
.context/
  graph.json     the graph: all nodes and edges, canonical JSON (never hand-edited)
  graph.sh       CLI: navigate, check, and (on explicit request only) write
  SCHEMA.md      this file
  prompts/       build.md, update.md (run only on an explicit request)
```

Requires `jq` (>= 1.6) and `git`. `bash .context/graph.sh help` lists every command.

## Node IDs and kinds

`<prefix>-<slug>`: lowercase `a-z`, `0-9`, hyphens. The node's key in `graph.json` is its id.

| kind | prefix | slug | what it is |
| --- | --- | --- | --- |
| module | `module-` | Gradle path without the leading colon; colons, underscores, dots become hyphens (`:demo:app` → `module-demo-app`) | one per Gradle module in `settings.gradle*` |
| package | `pkg-` | module short name + package dir (`pkg-tokens-color`) | a package dir with its own responsibility or invariants; not every dir gets one |
| component | `cmp-` | component or token-group name (`cmp-button`) | a public UI component (or family: base + variants) or a token group |
| concept | `concept-` | the idea (`concept-theming-derivation`) | a cross-cutting idea spanning several nodes; keep these few |

## Shape

```json
{
  "schema_version": 1,
  "nodes": {
    "pkg-tokens-color": {
      "kind": "package",
      "title": "Color tokens",
      "summary": "One line, at most 120 chars, no trailing period",
      "anchors": [{ "path": "<repo-relative path>", "sha": "<40-hex, stamped by graph.sh>" }],
      "depends_on": ["pkg-tokens-shape"],
      "related": ["concept-theming-derivation"],
      "purpose": "1-3 sentences. What it is, what it owns, what it explicitly does not own.",
      "public_surface": [{ "symbol": "Oklch", "note": "a few words" }],
      "invariants": [{ "rule": "Never imports theme/", "source": "AGENTS.md §2" }],
      "rationale": { "text": "Why it is shaped this way", "source": "KDoc on Oklch.kt" },
      "gotchas": ["Non-obvious trap for an editor"]
    }
  }
}
```

All eleven node fields are required and no others are allowed. `graph.sh put` and `graph.sh check` enforce this.

### Fields

- `summary` <= 120 chars, no trailing period. `purpose` <= 400 chars.
- `public_surface[].symbol`: a bare identifier that exists **verbatim** in the anchored code (`Oklch`, `Modifier.basisClickable`). Dotted names are matched on the last segment. `check` greps for every one. Names only, not signatures. `note` is a few words.
- `invariants[]`: a rule that must hold for this code, with a `source`: either an anchored path that shows it, or an `AGENTS.md` section. No source, no invariant.
- `rationale`: `null` when nothing evidences it (this is the honest default). Otherwise `{text, source}` where `source` is KDoc, README/docs, a commit message, or "user, <date>" for something the user told you. Never infer or invent a rationale.
- `gotchas[]`: only things that would actually mislead someone editing this code. `[]` when none.
- Empty is written as `[]` or `null`, never left out.

## Anchors

An anchor is a path plus the git object SHA of that path at `HEAD`. The SHA is content-addressed, so it survives rebases and squash merges, and staleness needs nothing beyond git.

- **You never write SHAs.** When you `put` a node you give anchors as plain path strings; `graph.sh` reads `git rev-parse HEAD:<path>` and stamps them. It refuses paths that don't exist, aren't in `HEAD`, or have uncommitted changes, so the tree must be committed first.
- Paths are repo-relative, no leading `./`, no trailing slash.
- Anchor `src/main` code, not tests or build output, unless the node is about tests.
- Prefer the **narrowest** anchor that covers the node's claims, because anything that changes an anchor's content makes the node stale:
    - **module** nodes anchor the module's build file (and at most one entry-point file), not the whole module directory.
    - a **package** node whose directory contains child nodes anchors its own files, not the directory.
    - a **component** anchors the files that define it.
- A node is **stale** when `git rev-parse HEAD:<path>` no longer equals the recorded `sha`. `check`/`stale` print `STALE <id>: <path> old=<sha> new=<sha>`. To see what changed: `git diff <old> <new>`; it works directly on the two SHAs. If the old object is gone (`git cat-file -e <old>` fails), re-read the anchored code in full.

## Edges

- `depends_on`: this node's code actually uses the other node's code (Gradle project dependency or imports). Direction is dependent → dependency. Must be acyclic (`check` enforces it). Only real dependencies, never "conceptually nearby".
- `related`: looser links worth following. Optional, and not required to be symmetric.
- Reverse edges are not stored; `graph.sh used-by <id>` computes them.

## Navigation (read-only, cheap; use these instead of opening `graph.json`)

| command | answers |
| --- | --- |
| `overview [kind]` | what exists: one line per node, `id [kind] summary` |
| `for-path <path> ...` | which nodes cover this file/dir (or sit inside it) |
| `node <id> [field ...]` | one node; name fields (`purpose invariants`) to read only those |
| `deps <id> [--all]` | what it depends on (direct, or transitive) |
| `used-by <id> [--all]` | what depends on it (direct, or transitive): blast radius |
| `stale [id ...]` | only STALE / ORPHAN / UNTRACKED problems |
| `check [id ...]` | every consistency check; no ids = whole graph + module coverage |

## Writing (only when explicitly asked to build/update the graph)

| command | effect |
| --- | --- |
| `put <id>` | node JSON on stdin (anchors as path strings). Validates, stamps SHAs, merges, rewrites canonically. Invalid input is rejected and the graph is left untouched. Also how you update a node: resubmit the full node. |
| `restamp <id> ...` | re-stamp SHAs to `HEAD` **after you re-read the code and the prose is still accurate** |
| `rm <id>` | delete a node (warns about nodes that still reference it) |
| `fmt` | rewrite `graph.json` in canonical form |

Never hand-edit `graph.json`: the script owns its formatting (sorted keys, 2-space indent), so diffs stay minimal and `check` can tell when something bypassed it.

## Style limits

- No pasted source, no line numbers, no "currently"/date claims, no file-size claims. All of these rot.
- State facts as facts. Anything unverified is left out, not hedged.
- Don't duplicate one node's content in another; link with an edge.