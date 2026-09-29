# Task: build the Basis context + knowledge graph

This message is my explicit request to create the graph. That permission covers this task only.

Read `AGENTS.md` and `.context/SCHEMA.md` first and follow the schema exactly. You write the graph **only** through `bash .context/graph.sh put <id>`. Never open or hand-edit `.context/graph.json`, never type a SHA, and never touch source, build files, `AGENTS.md`, `SCHEMA.md` or `graph.sh`. Do not commit or push.

## Preconditions: check, and stop with a short report if any fails

1. `bash .context/graph.sh help` runs (jq and git present).
2. The graph is empty: `.context/graph.json` doesn't exist, or `bash .context/graph.sh overview` prints nothing. If nodes exist, stop and tell me to use `.context/prompts/update.md` (or ask whether I want a full rebuild).
3. `git status --porcelain` is clean outside `.context/` and `AGENTS.md`. SHAs are read from `HEAD`, and `put` refuses dirty anchors anyway. If it's dirty, tell me to commit first.

## Phase 1: discover (read-only, cheap)

- `settings.gradle(.kts)`: list every module. For each module's build file: plugins, project dependencies, external dependencies.
- Per module: source-set dirs, base package, package tree to depth 3, file counts (`git ls-files <dir> | wc -l`), any README/docs.
- Note where "why" evidence lives: KDoc, README/docs, `git log --oneline -20 -- <path>`.
- Don't read every source file yet. Read only what you need to size and group nodes.

## Phase 2: node plan, then STOP

Present one table: `id | kind | anchors | one-line purpose | depends_on`. Then list:
- counts per kind,
- anything you're unsure how to group or split, as options with your reasoning, not a locked choice,
- directories you plan to leave uncovered, and why.

Then **stop and wait for my approval or edits. Write nothing before that.**

Sizing guidance for the plan:
- Exactly one `module-` node per Gradle module, anchored on that module's build file (see SCHEMA "Anchors").
- `pkg-` nodes for package dirs with their own responsibility or invariants, not for every directory.
- `cmp-` nodes group a component with its variants. Anchor the narrowest files.
- `concept-` nodes only for ideas that genuinely span several nodes; keep them few.
- Prefer fewer, sharper nodes over many thin ones.

## Phase 3: write nodes (after approval)

For each node in the approved plan (order doesn't matter):

1. Read the anchored code. For large anchors: list the files, then read public declarations and KDoc.
2. Submit it:

   ```
   bash .context/graph.sh put <id> <<'EOF'
   { ...node JSON per SCHEMA, anchors as path strings... }
   EOF
   ```

3. If `put` rejects it, read the `SHAPE`/`PUT` lines, fix the JSON, resubmit. A rejection leaves the graph untouched.

Rules:
- Facts come only from code you read in this run. `public_surface` symbols are copied verbatim from the code.
- `rationale` is `null` unless you have cited evidence. Don't infer motives.
- Every invariant needs a `source` (an anchored path, or an `AGENTS.md` section).
- `depends_on` reflects real imports/Gradle deps you observed, not proximity.
- If you notice code that violates a rule in `AGENTS.md`, don't fix it and don't bury it in a node. Collect it for the final report.
- Respect the size limits. No pasted source, no line numbers.

## Phase 4: verify, loop until clean

Run `bash .context/graph.sh check`. Fix every problem by resubmitting the node with `put` (or `rm` for a node that shouldn't exist). Never edit `graph.sh`. Repeat until it prints `OK`.

Then check what the script can't:
- Every node in the approved plan exists and nothing outside the plan was added (`overview`).
- Every module has a node, and every approved package/component/concept is covered.
- Every non-null `rationale` cites a real source.

## Phase 5: report (short)

- Node counts per kind, and the final `check` output line.
- How many `rationale: null` nodes, and which, so I can fill them in.
- Rule violations you noticed in code, as a list. Not fixed.
- Anything from the plan you couldn't do, and why.