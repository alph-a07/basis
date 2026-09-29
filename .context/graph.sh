#!/usr/bin/env bash
# Basis context graph CLI. Needs: bash, git, jq (>= 1.6). No AI, no network.
#
# READ (safe any time):
#   overview [kind]              one line per node: id [kind] summary
#   node <id> [field ...]        node JSON; optionally only the named fields
#   deps <id> [--all]            what <id> depends on (direct, or transitive)
#   used-by <id> [--all]         what depends on <id> (direct, or transitive)
#   for-path <path> ...          nodes whose anchors cover / sit inside a path
#   stale [id ...]               only STALE/ORPHAN/UNTRACKED problems
#   check [id ...]               every consistency check (see codes below)
#
# WRITE (only when the user explicitly asked to build/update the graph):
#   put <id>                     node JSON on stdin; validates, stamps anchor SHAs, merges
#   rm <id>                      delete a node
#   restamp <id> ...             re-stamp anchor SHAs to HEAD (prose verified as still accurate)
#   fmt                          rewrite graph.json in canonical form
#
# check codes:
#   JSON / FORMAT   graph.json unparsable / not canonical (run: fmt)
#   SHAPE           node violates SCHEMA.md
#   STALE           anchor content changed since the recorded sha (trust the code, not the node)
#   ORPHAN          anchor path no longer exists
#   UNTRACKED       anchor path exists but is not in HEAD
#   DANGLING-EDGE   depends_on/related points at a missing node
#   SELF-EDGE       node lists itself
#   CYCLE           depends_on cycle (lists nodes in or beneath it)
#   UNKNOWN-SYMBOL  public_surface symbol not found in the node's anchors
#   NO-MODULE-NODE  Gradle module in settings has no module-<slug> node
# Not checked (needs a human): whether the prose is actually true.
# Exit: 0 clean | 1 problems | 2 setup error

set -u
root=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "SETUP not inside a git repo"; exit 2; }
cd "$root" || exit 2
command -v jq >/dev/null 2>&1 || { echo "SETUP jq is required (brew install jq | apt install jq)"; exit 2; }
G=.context/graph.json

need_graph() {
  [ -f "$G" ] || { echo "SETUP $G not found"; exit 2; }
  jq -e . "$G" >/dev/null 2>&1 || { echo "JSON $G: not valid JSON"; exit 1; }
}

# ---------------------------------------------------------------- jq programs

read -r -d '' SHAPE_JQ <<'JQ'
def pre: {module:"module-", package:"pkg-", component:"cmp-", concept:"concept-"};
def isstr: type == "string";
def nonempty: isstr and length > 0;
def strarr: type == "array" and all(.[]; isstr);
def fields: ["kind","title","summary","anchors","depends_on","related","purpose","public_surface","invariants","rationale","gotchas"];
def problems($id; $n):
  if ($n | type) != "object" then "node must be an object" else
    (($n | keys) - fields | .[] | "unknown field: \(.)"),
    ((fields - ($n | keys))[] | "missing field: \(.)"),
    ( if (pre[($n.kind | tostring)] // null) == null then "kind must be module|package|component|concept"
      elif ($id | startswith(pre[($n.kind | tostring)])) | not then "id must start with \(pre[($n.kind | tostring)]) for kind \($n.kind)"
      else empty end ),
    ( if ($n.title | nonempty) | not then "title must be a non-empty string" else empty end ),
    ( if ($n.summary | nonempty) | not then "summary must be a non-empty string"
      elif ($n.summary | length) > 120 then "summary is over 120 chars"
      elif ($n.summary | endswith(".")) then "summary must not end with a period"
      else empty end ),
    ( if ($n.anchors | type) != "array" or ($n.anchors | length) == 0 then "anchors must be a non-empty array"
      elif any($n.anchors[]; (type != "object") or ((.path | nonempty) | not) or (((.sha | isstr) and (.sha | test("^[0-9a-f]{40}$"))) | not))
        then "each anchor needs a path and a 40-hex sha"
      else empty end ),
    ( if ($n.depends_on | strarr) | not then "depends_on must be an array of ids" else empty end ),
    ( if ($n.related | strarr) | not then "related must be an array of ids" else empty end ),
    ( if ($n.purpose | nonempty) | not then "purpose must be a non-empty string"
      elif ($n.purpose | length) > 400 then "purpose is over 400 chars"
      else empty end ),
    ( if ($n.public_surface | type) != "array"
         or any($n.public_surface[]; (type != "object") or ((.symbol | nonempty) | not) or (((.symbol | test("^[A-Za-z_][A-Za-z0-9_.]*$"))) | not) or ((.note | isstr) | not))
        then "public_surface must be an array of {symbol, note}; symbol is a bare identifier"
      else empty end ),
    ( if ($n.invariants | type) != "array"
         or any($n.invariants[]; (type != "object") or ((.rule | nonempty) | not) or ((.source | nonempty) | not))
        then "invariants must be an array of {rule, source}"
      else empty end ),
    ( if $n.rationale == null then empty
      elif ($n.rationale | type) != "object" or (($n.rationale.text | nonempty) | not) or (($n.rationale.source | nonempty) | not)
        then "rationale must be null or {text, source}"
      else empty end ),
    ( if ($n.gotchas | strarr) | not then "gotchas must be an array of strings" else empty end )
  end;
( if .schema_version != 1 then "SHAPE graph: schema_version must be 1" else empty end ),
( if (.nodes | type) != "object" then "SHAPE graph: nodes must be an object"
  else (.nodes | to_entries[] | .key as $id | problems($id; .value) | "SHAPE \($id): \(.)") end )
JQ

read -r -d '' EDGE_JQ <<'JQ'
. as $g
| .nodes | to_entries[] | .key as $id | .value as $n
| (($n.depends_on // [])[] | {t: "depends_on", to: .}), (($n.related // [])[] | {t: "related", to: .})
| if .to == $id then "SELF-EDGE \($id): \(.t) lists itself"
  elif $g.nodes[.to] == null then "DANGLING-EDGE \($id): \(.t) -> \(.to) has no node"
  else empty end
JQ

read -r -d '' CYCLE_JQ <<'JQ'
(.nodes | map_values(.depends_on // [])) as $g
| { rem: $g }
| until(.stop;
    (.rem | keys) as $k
    | ([.rem | to_entries[] | select(all(.value[]; . as $d | ($k | index($d)) == null)) | .key]) as $free
    | if ($free | length) == 0 or ($k | length) == 0 then .stop = true
      else .rem |= with_entries(select(.key as $x | ($free | index($x)) == null)) end)
| .rem | keys | if length > 0 then "CYCLE graph: in or beneath a depends_on cycle: \(join(", "))" else empty end
JQ

canon() { jq -S --indent 2 .; }

# ---------------------------------------------------------------- read commands

cmd_overview() {
  need_graph
  jq -r --arg k "${1:-}" '
    .nodes | to_entries
    | sort_by((.value.kind as $k | ["module","package","component","concept"] | index($k)), .key)[]
    | select($k == "" or .value.kind == $k)
    | "\(.key) [\(.value.kind)] \(.value.summary)"' "$G"
}

cmd_node() {
  need_graph
  local id=${1:-}; [ -n "$id" ] || { echo "usage: node <id> [field ...]"; exit 2; }
  shift
  jq -e --arg id "$id" '.nodes[$id] != null' "$G" >/dev/null || { echo "NO-NODE $id"; exit 1; }
  jq --arg id "$id" --argjson f "$(jq -cn '$ARGS.positional' --args "$@")" '
    .nodes[$id] as $n
    | if ($f | length) == 0 then $n else ($n | with_entries(select(.key as $k | $f | index($k)))) end' "$G"
}

cmd_deps() {
  need_graph
  local id=${1:-} all=false; [ -n "$id" ] || { echo "usage: deps <id> [--all]"; exit 2; }
  [ "${2:-}" = "--all" ] && all=true
  jq -r --arg id "$id" --argjson all "$all" '
    . as $g
    | def direct($x): ($g.nodes[$x].depends_on // []);
      def reach($ids): (($ids + [$ids[] | direct(.)[]]) | unique) as $n
        | if ($n | length) == ($ids | length) then $ids else reach($n) end;
      (if $all then reach(direct($id)) else direct($id) end) | sort[]
      | . as $i | "\($i) [\($g.nodes[$i].kind // "?")] \($g.nodes[$i].summary // "(no node)")"' "$G"
}

cmd_usedby() {
  need_graph
  local id=${1:-} all=false; [ -n "$id" ] || { echo "usage: used-by <id> [--all]"; exit 2; }
  [ "${2:-}" = "--all" ] && all=true
  jq -r --arg id "$id" --argjson all "$all" '
    . as $g
    | def rev($x): [$g.nodes | to_entries[] | select(any((.value.depends_on // [])[]; . == $x)) | .key];
      def reach($ids): (($ids + [$ids[] | rev(.)[]]) | unique) as $n
        | if ($n | length) == ($ids | length) then $ids else reach($n) end;
      (if $all then reach(rev($id)) else rev($id) end) | sort[]
      | . as $i | "\($i) [\($g.nodes[$i].kind // "?")] \($g.nodes[$i].summary // "(no node)")"' "$G"
}

cmd_forpath() {
  need_graph
  [ $# -gt 0 ] || { echo "usage: for-path <path> ..."; exit 2; }
  local p
  for p in "$@"; do
    p=${p#./}; p=${p%/}
    jq -r --arg p "$p" '
      .nodes | to_entries[]
      | select(any(.value.anchors[]; .path as $a | ($a == $p) or ($p | startswith($a + "/")) or ($a | startswith($p + "/"))))
      | "\(.key) [\(.value.kind)] \(.value.summary)"' "$G"
  done | sort -u
}

# ---------------------------------------------------------------- check

cmd_check() {
  need_graph
  local bad=0 count=0 id p s cur sym key found anyexist ids full=1 out
  report() { echo "$*"; bad=1; }

  jq -e . "$G" >/dev/null 2>&1 || { echo "JSON $G: not valid JSON"; exit 1; }

  if [ $# -gt 0 ]; then ids="$*"; full=0
  else ids=$(jq -r '.nodes | keys[]' "$G"); fi

  if [ "$full" -eq 1 ]; then
    cmp -s <(canon < "$G") "$G" || report "FORMAT $G: not canonical (run: bash .context/graph.sh fmt)"
    out=$(jq -r "$SHAPE_JQ" "$G");  [ -z "$out" ] || report "$out"
    out=$(jq -r "$EDGE_JQ" "$G");   [ -z "$out" ] || report "$out"
    out=$(jq -r "$CYCLE_JQ" "$G");  [ -z "$out" ] || report "$out"
  fi

  for id in $ids; do
    if [ "$(jq --arg id "$id" '.nodes[$id] != null' "$G")" != "true" ]; then report "NO-NODE $id: not in graph"; continue; fi
    count=$((count + 1))
    anyexist=0
    while IFS=$'\t' read -r p s; do
      [ -n "$p" ] || continue
      if [ ! -e "$p" ]; then report "ORPHAN $id: $p no longer exists"; continue; fi
      anyexist=1
      cur=$(git rev-parse "HEAD:$p" 2>/dev/null || true)
      if [ -z "$cur" ]; then report "UNTRACKED $id: $p is not in HEAD"; continue; fi
      [ "$cur" = "$s" ] || report "STALE $id: $p old=$s new=$cur"
    done < <(jq -r --arg id "$id" '.nodes[$id].anchors[]? | "\(.path)\t\(.sha)"' "$G")

    if [ "$anyexist" -eq 1 ]; then
      while IFS= read -r sym; do
        [ -n "$sym" ] || continue
        key=${sym##*.}; found=0
        while IFS= read -r p; do
          if [ -n "$p" ] && [ -e "$p" ] && grep -rqwF -- "$key" "$p"; then found=1; break; fi
        done < <(jq -r --arg id "$id" '.nodes[$id].anchors[]?.path' "$G")
        [ "$found" -eq 1 ] || report "UNKNOWN-SYMBOL $id: $sym not found in its anchors"
      done < <(jq -r --arg id "$id" '.nodes[$id].public_surface[]?.symbol' "$G")
    fi
  done

  if [ "$full" -eq 1 ]; then
    local sf m slug
    for sf in settings.gradle.kts settings.gradle; do
      [ -f "$sf" ] || continue
      while IFS= read -r m; do
        [ -n "$m" ] || continue
        slug=$(printf '%s' "$m" | sed 's/:/-/g' | tr 'A-Z_.' 'a-z--')
        [ "$(jq --arg id "module-$slug" '.nodes[$id] != null' "$G")" = "true" ] \
          || report "NO-MODULE-NODE module-$slug: Gradle module :$m has no node"
      done < <(grep -oE "[\"']:[A-Za-z0-9_.:-]+[\"']" "$sf" | sed -E "s/^[\"']://; s/[\"']\$//" | sort -u)
    done
  fi

  [ "$bad" -eq 0 ] && echo "OK $count node(s) checked"
  exit "$bad"
}

cmd_stale() {
  need_graph
  local out
  out=$(cmd_check "$@" | grep -E '^(STALE|ORPHAN|UNTRACKED|NO-NODE) ')
  if [ -z "$out" ]; then echo "OK no stale nodes"; else echo "$out"; exit 1; fi
}

# ---------------------------------------------------------------- write commands

# stamp: reads anchor paths on stdin, prints a JSON array of {path, sha} (from HEAD).
# Refuses paths that are missing, not in HEAD, or have uncommitted changes.
stamp() {
  local p sha out='[]'
  while IFS= read -r p; do
    [ -n "$p" ] || continue
    p=${p#./}; p=${p%/}
    [ -e "$p" ] || { echo "anchor path not found: $p" >&2; return 1; }
    sha=$(git rev-parse "HEAD:$p" 2>/dev/null) || { echo "$p is not in HEAD (commit it first)" >&2; return 1; }
    [ -z "$(git status --porcelain -- "$p")" ] || { echo "$p has uncommitted changes (commit first; SHAs are read from HEAD)" >&2; return 1; }
    out=$(printf '%s' "$out" | jq -c --arg p "$p" --arg s "$sha" '. + [{path: $p, sha: $s}]')
  done
  printf '%s' "$out"
}

write_graph() { # stdin: new graph JSON -> canonical file, atomically
  local tmp; tmp=$(mktemp .context/.graph.XXXXXX) || exit 2
  if canon > "$tmp"; then mv "$tmp" "$G"; else rm -f "$tmp"; echo "write failed"; exit 1; fi
}

cmd_put() {
  local id=${1:-} in paths stamped node out
  [ -n "$id" ] || { echo "usage: put <id>   (node JSON on stdin)"; exit 2; }
  mkdir -p .context
  in=$(cat)
  printf '%s' "$in" | jq -e 'type == "object"' >/dev/null 2>&1 || { echo "PUT $id: stdin is not a JSON object"; exit 1; }
  paths=$(printf '%s' "$in" | jq -r '(.anchors // [])[] | if type == "string" then . else (.path // empty) end')
  [ -n "$paths" ] || { echo "PUT $id: anchors must list at least one path"; exit 1; }
  stamped=$(stamp <<< "$paths") || { echo "PUT $id: refused"; exit 1; }
  node=$(printf '%s' "$in" | jq -c --argjson a "$stamped" '.anchors = $a')
  out=$(jq -n --arg id "$id" --argjson n "$node" '{schema_version: 1, nodes: {($id): $n}}' | jq -r "$SHAPE_JQ")
  if [ -n "$out" ]; then echo "$out"; echo "PUT $id: rejected, graph unchanged"; exit 1; fi
  [ -f "$G" ] || printf '{"schema_version":1,"nodes":{}}\n' > "$G"
  jq --arg id "$id" --argjson n "$node" '.nodes[$id] = $n' "$G" | write_graph
  echo "PUT ok $id ($(printf '%s' "$stamped" | jq 'length') anchor(s) stamped)"
}

cmd_rm() {
  need_graph
  local id=${1:-} users
  [ -n "$id" ] || { echo "usage: rm <id>"; exit 2; }
  [ "$(jq --arg id "$id" '.nodes[$id] != null' "$G")" = "true" ] || { echo "NO-NODE $id"; exit 1; }
  users=$(jq -r --arg id "$id" '.nodes | to_entries[] | select(any(((.value.depends_on // []) + (.value.related // []))[]; . == $id)) | .key' "$G" | tr '\n' ' ')
  jq --arg id "$id" 'del(.nodes[$id])' "$G" | write_graph
  echo "RM ok $id"
  [ -z "$users" ] || echo "WARN still referenced by: $users(fix their edges; check will flag them)"
}

cmd_restamp() {
  need_graph
  [ $# -gt 0 ] || { echo "usage: restamp <id> ..."; exit 2; }
  local id stamped
  for id in "$@"; do
    [ "$(jq --arg id "$id" '.nodes[$id] != null' "$G")" = "true" ] || { echo "NO-NODE $id"; exit 1; }
    stamped=$(jq -r --arg id "$id" '.nodes[$id].anchors[].path' "$G" | stamp) || { echo "RESTAMP $id: refused"; exit 1; }
    jq --arg id "$id" --argjson a "$stamped" '.nodes[$id].anchors = $a' "$G" | write_graph
    echo "RESTAMP ok $id"
  done
}

cmd_fmt() { need_graph; canon < "$G" | write_graph; echo "FMT ok"; }

cmd_help() { sed -n '2,/^# Exit:/p' "$0" | sed 's/^# \{0,1\}//'; }

cmd=${1:-help}; [ $# -gt 0 ] && shift
case "$cmd" in
  overview) cmd_overview "$@" ;;
  node)     cmd_node "$@" ;;
  deps)     cmd_deps "$@" ;;
  used-by)  cmd_usedby "$@" ;;
  for-path) cmd_forpath "$@" ;;
  check)    cmd_check "$@" ;;
  stale)    cmd_stale "$@" ;;
  put)      cmd_put "$@" ;;
  rm)       cmd_rm "$@" ;;
  restamp)  cmd_restamp "$@" ;;
  fmt)      cmd_fmt ;;
  help|-h|--help) cmd_help ;;
  *) echo "unknown command: $cmd"; cmd_help; exit 2 ;;
esac