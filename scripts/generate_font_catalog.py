#!/usr/bin/env python3
"""
Generates the vendored Google Fonts catalog binary asset for basis-theme.

Fetches the complete Google Fonts catalog metadata, filters to the top 500 most
popular families, enforces the Additive Retention Guarantee (never drops a previously
vendored family), derives typographic affinity metrics (displayAffinity, textAffinity,
metaAffinity, expressiveness, roundness), and serializes to:
basis-theme/src/main/resources/basis/fonts/google-fonts-catalog.bin.gz
"""

import gzip
import io
import json
import os
import struct
import urllib.request

METADATA_URL = "https://fonts.google.com/metadata/fonts"
OUTPUT_FILE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "basis-theme",
    "src",
    "main",
    "resources",
    "basis",
    "fonts",
    "google-fonts-catalog.bin.gz",
)

CAT_MAP = {
    "Sans Serif": 0,
    "Serif": 1,
    "Display": 2,
    "Handwriting": 3,
    "Monospace": 4,
}


def canonical_id(name: str) -> str:
    name_lower = name.lower()
    clean = "".join(
        c if (c.isalnum() or c in ("-", "_", " ")) else "-" for c in name_lower
    )
    fid = "-".join(clean.replace("_", "-").split()).strip("-")
    return fid if fid else "font"


def read_existing_ids(file_path: str) -> set:
    """Reads all previously vendored family IDs from the binary catalog asset."""
    if not os.path.exists(file_path):
        return set()
    try:
        with gzip.open(file_path, "rb") as f:
            magic = f.read(4)
            if magic != b"BFNT":
                return set()
            version, count = struct.unpack(">HI", f.read(6))
            ids = set()
            for _ in range(count):
                id_len = struct.unpack(">H", f.read(2))[0]
                fid = f.read(id_len).decode("utf-8")
                ids.add(fid)

                fn_len = struct.unpack(">H", f.read(2))[0]
                f.read(fn_len)

                gfk_len = struct.unpack(">H", f.read(2))[0]
                f.read(gfk_len)

                # Skip category (1), flags (1), weightsCount (1 if version >= 2), affinities (5 * 4 = 20)
                skip_len = 23 if version >= 2 else 22
                f.read(skip_len)

                axis_count = struct.unpack(">H", f.read(2))[0]
                for _ in range(axis_count):
                    tag_len = struct.unpack(">H", f.read(2))[0]
                    f.read(tag_len)
                    f.read(12)
            return ids
    except Exception as e:
        print(f"Notice: Could not read existing catalog at {file_path}: {e}")
        return set()


def write_utf(buffer: io.BytesIO, value: str) -> None:
    encoded = value.encode("utf-8")
    buffer.write(struct.pack(">H", len(encoded)))
    buffer.write(encoded)


def main() -> None:
    print(f"Fetching Google Fonts metadata from {METADATA_URL}...")
    req = urllib.request.Request(METADATA_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())

    all_families = data.get("familyMetadataList", [])
    print(f"Loaded {len(all_families)} families from Google Fonts.")

    # Read previously vendored IDs to guarantee zero breaking changes for existing consumers
    existing_ids = read_existing_ids(OUTPUT_FILE)
    print(f"Found {len(existing_ids)} previously vendored IDs in local catalog.")

    # Filter to Latin script families to eliminate non-Latin families (CJK, Arabic, emoji, etc.)
    latin_families = [
        f
        for f in all_families
        if "latin" in f.get("subsets", [])
        and f.get("primaryScript") in ("", "Latn", None)
    ]
    print(f"Filtered {len(latin_families)} Latin script families from {len(all_families)} total.")

    # Sort Latin families by popularity rank (smaller number = higher popularity)
    sorted_by_pop = sorted(latin_families, key=lambda f: f.get("popularity", 999999))
    top_500 = sorted_by_pop[:500]
    top_500_ids = {canonical_id(f["family"]) for f in top_500}

    # Additive Retention Guarantee: Top 500 UNION any previously vendored ID
    fetched_ids = {canonical_id(f["family"]) for f in all_families}
    missing_upstream = existing_ids - fetched_ids
    if missing_upstream:
        print(
            f"WARNING: The following previously vendored families are no longer in Google Fonts metadata: {missing_upstream}"
        )

    target_ids = top_500_ids.union(existing_ids)
    preserved_count = len(target_ids) - len(top_500_ids)
    if preserved_count > 0:
        print(
            f"Additive Retention: Preserved {preserved_count} previously vendored families outside top 500."
        )

    # Filter families to target IDs and sort by popularity
    families = [f for f in sorted_by_pop if canonical_id(f["family"]) in target_ids]
    if len(families) < len(target_ids):
        already_in_families = {canonical_id(f["family"]) for f in families}
        missing_from_latin = [
            f
            for f in all_families
            if canonical_id(f["family"]) in target_ids
            and canonical_id(f["family"]) not in already_in_families
        ]
        families.extend(missing_from_latin)
        families = sorted(families, key=lambda f: f.get("popularity", 999999))
    print(f"Selected {len(families)} families for vendored catalog.")

    buf = io.BytesIO()
    buf.write(b"BFNT")
    buf.write(struct.pack(">H", 2))  # format version 2
    buf.write(struct.pack(">I", len(families)))

    for f in families:
        family = f["family"]
        name_lower = family.lower()
        cat_str = f.get("category", "Sans Serif")
        stroke = f.get("stroke", "")
        classifs = f.get("classifications", [])
        axes = f.get("axes", [])
        axes_tags = [a["tag"] for a in axes]
        distinct_weights = {k.rstrip("i") for k in f.get("fonts", {}).keys()}
        weights_count = max(1, len(distinct_weights))

        fid = canonical_id(family)
        gf_key = family.replace(" ", "+")
        cat = CAT_MAP.get(cat_str, 0)

        is_serif = (
            cat == 1 or stroke in ("Serif", "Slab Serif") or "serif" in name_lower
        )
        is_mono = (
            cat == 4
            or "Monospace" in classifs
        )
        is_display = (
            cat == 2
            or "Display" in classifs
            or any(k in name_lower for k in ["display", "poster", "banner", "headline"])
        )
        is_handwriting = (
            cat == 3
            or "Handwriting" in classifs
            or any(
                k in name_lower
                for k in ["handwriting", "script", "brush", "calligraphy"]
            )
        )

        # roundness heuristics derived from variation axes and morphological design descriptors
        is_round = (
            "ROND" in axes_tags
            or "SOFT" in axes_tags
            or any(
                k in name_lower
                for k in [
                    "rounded",
                    "round",
                    "soft",
                    "bubble",
                    "circular",
                ]
            )
        )
        is_sharp = stroke == "Slab Serif" or any(
            k in name_lower
            for k in [
                "sharp",
                "slab",
                "square",
                "block",
                "pixel",
            ]
        )
        if is_round:
            roundness = 0.90
        elif is_sharp:
            roundness = 0.15
        else:
            roundness = 0.50

        # expressiveness heuristics based on typographic role, optical size, and weight extremes
        if is_handwriting:
            expr = 0.92
        elif is_display:
            expr = 0.85
        elif is_serif:
            expr = (
                0.60
                if (weights_count <= 2 or "display" in name_lower)
                else (0.45 if "opsz" in axes_tags else 0.35)
            )
        elif is_mono:
            expr = 0.28
        else:
            if (
                any(
                    k in name_lower
                    for k in ["black", "ultra", "poster", "headline"]
                )
                or weights_count <= 2
            ):
                expr = 0.65
            elif roundness >= 0.85:
                expr = 0.45
            elif "opsz" in axes_tags:
                expr = 0.30
            else:
                expr = 0.20

        # displayAffinity heuristics based on headline suitability, display cuts, and contrast
        if is_display:
            disp = 0.95
        elif is_handwriting:
            disp = 0.85
        elif is_sharp or stroke == "Slab Serif":
            disp = 0.75
        elif is_serif:
            disp = 0.70 if ("opsz" in axes_tags or weights_count <= 2) else 0.60
        elif is_mono:
            disp = 0.20
        else:
            if (
                any(
                    k in name_lower
                    for k in [
                        "black",
                        "ultra",
                        "poster",
                        "headline",
                        "condensed",
                        "compressed",
                        "wide",
                        "expanded",
                    ]
                )
                or weights_count <= 2
            ):
                disp = 0.80
            elif "opsz" in axes_tags:
                disp = 0.70
            else:
                disp = 0.45

        # textAffinity heuristics based on weight depth, body legibility, and optical sizing
        if is_handwriting:
            text = 0.05
        elif is_display:
            text = 0.10
        elif is_mono:
            text = 0.35
        elif is_serif:
            text = 0.75
            if weights_count >= 8 or "wght" in axes_tags:
                text += 0.08
            if "opsz" in axes_tags:
                text += 0.04
            if weights_count <= 2:
                text -= 0.20
        else:
            text = 0.80
            if weights_count >= 12 or ("wght" in axes_tags and weights_count >= 8):
                text += 0.10
            elif weights_count >= 6 or "wght" in axes_tags:
                text += 0.06
            elif weights_count >= 4:
                text += 0.03
            if "opsz" in axes_tags:
                text += 0.04
            if weights_count <= 2:
                text -= 0.25
            text = min(0.95, text)

        # metaAffinity heuristics prioritizing monospace telemetry and compact UI clarity
        if is_handwriting or is_display:
            meta = 0.05
        elif is_mono:
            meta = 0.82
        elif any(k in name_lower for k in ["condensed", "narrow"]):
            meta = 0.80
        elif is_serif:
            meta = 0.35
        else:
            meta = 0.75
            if weights_count >= 8 or "wght" in axes_tags:
                meta += 0.08
            if "opsz" in axes_tags:
                meta += 0.04
            meta = min(0.88, meta)

        write_utf(buf, fid)
        write_utf(buf, family)
        write_utf(buf, gf_key)
        buf.write(struct.pack(">B", cat))

        flags = (1 if is_serif else 0) | ((1 if is_mono else 0) << 1)
        buf.write(struct.pack(">B", flags))
        buf.write(struct.pack(">B", min(255, max(1, weights_count))))

        buf.write(struct.pack(">fffff", float(disp), float(text), float(meta), float(expr), float(roundness)))

        buf.write(struct.pack(">H", len(axes)))
        for ax in axes:
            write_utf(buf, ax.get("tag", ""))
            buf.write(
                struct.pack(
                    ">fff",
                    float(ax.get("min", 0.0)),
                    float(ax.get("max", 0.0)),
                    float(ax.get("defaultValue", 0.0)),
                )
            )

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with gzip.open(OUTPUT_FILE, "wb") as f_out:
        f_out.write(buf.getvalue())

    print(f"Wrote {os.path.getsize(OUTPUT_FILE)} bytes ({len(families)} families) to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
