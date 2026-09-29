# Task: update the Basis context + knowledge graph

This message is my explicit request to update the graph. That permission covers this task only.

Read `AGENTS.md` and `.context/SCHEMA.md` first and follow the schema exactly. You change the graph **only** through `bash .context/graph.sh` (`put`, `restamp`, `rm`). Never open or hand-edit `.context/graph.json`, never type a SHA, and never touch source, build files, `AGENTS.md`, `SCHEMA.md` or `graph.sh`. Do not commit or push.

**SCOPE:** all stale nodes
<!-- To narrow, replace the line above with node ids and/or paths, e.g. `SCOPE: pkg-tokens-color, basis-tokens/src/main/kotlin/.../theme` -->

Work token-cheaply: touch only what the worklist says. Don't re-read or rewrite nodes that are still fresh.

## Preconditions: stop with a short report if any fails

1. The graph exists and is non-empty (`bash .context/graph.sh overview`). Otherwise stop and tell me to use `.context/prompts/build.md`.
2. `git status --porcelain` is clean outside `.context/`. SHAs are read from `HEAD` and `put`/`restamp` refuse dirty anchors. If source is dirty, tell me to commit first.

## Phase 1: build the worklist (deterministic, no guessing)

1. Run `bash .context/graph.sh check` (or `check <ids>` for a narrowed SCOPE). Collect, within SCOPE:
    - **stale**: `STALE <id>: <path> old=<sha> new=<sha>`. The anchored code changed.
    - **orphan**: `ORPHAN <id>: <path>`. The anchored path is gone.
    - **structural**: `UNTRACKED`, `NO-MODULE-NODE`, `DANGLING-EDGE`, `SELF-EDGE`, `CYCLE`, `UNKNOWN-SYMBOL`, `SHAPE`, `FORMAT`. The graph is inconsistent with itself or the code.
2. Find **missing** coverage: modules from `settings.gradle*`, and package dirs / public components with no node. Use `graph.sh for-path <dir>` to see what covers a path.
3. Present the worklist as a short list: one line per item with its category and reason. Then continue. **Stop and ask first** only if it includes deleting, renaming, splitting or merging nodes, or has more than ~15 items. For those, wait for my go-ahead.

## Phase 2: refresh stale nodes

For each stale node, for each stale anchor:

1. See what changed with the printed SHAs: `git diff --stat <old> <new>`, then the patch if it's small. If `git cat-file -e <old>` fails, the old object is gone: re-read the anchored code in full.
2. Read the node: `bash .context/graph.sh node <id>`. Also `used-by <id>` if the change may affect dependents.
3. Re-read the current anchored code that the change touched, plus anything the node's claims depend on.
4. Decide:
    - **Prose is now wrong or incomplete**: resubmit the full node with `put`. Start from the `node <id>` output, change **only** what's wrong (`purpose`, `public_surface`, `invariants`, `depends_on`, `summary`, ...), and leave everything else byte-for-byte identical so the diff stays small. Convert `anchors` to plain path strings (for example `graph.sh node <id> | jq '.anchors |= map(.path) | ...'`), because `put` stamps fresh SHAs itself.
    - **Prose is still fully accurate**: run `bash .context/graph.sh restamp <id>`. Report it as "verified, no prose change".

Hard rule: `put` and `restamp` are the act of re-verification. Never call `restamp` for a node whose code you didn't re-read.

## Phase 3: orphans and missing

- **Orphan**: propose delete, re-anchor (the path moved: name the new path), or merge. Apply only what I approve. If the path clearly moved (`git diff -M --name-status <old>..HEAD` confirms it), re-anchor via `put` and report it.
- **Missing**: create nodes per SCHEMA and the build prompt's rules (facts only from code read in this run, `rationale: null` unless evidenced, no SHAs typed). If it's a new module or more than 3 new nodes, show the node plan and wait for approval first.

## Phase 4: verify, loop until clean

Run `bash .context/graph.sh check`. Fix every problem with `put`/`rm`, never by editing `graph.sh` and never by restamping without re-reading. Repeat until it prints `OK`.

## Phase 5: report (short)

Per node touched: `id`: what changed in the prose (or "verified, no prose change"). Then:
- nodes created / deleted / re-anchored,
- new `rationale: null` nodes,
- rule violations from `AGENTS.md` you noticed in code (list, don't fix),
- the final `check` output line.