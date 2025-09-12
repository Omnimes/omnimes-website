#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
urls.py — generator linków do ręcznego indeksowania w Google Search Console
Uruchom w katalogu z artykułami:  python urls.py

Wymagania:
    pip install pyyaml
"""

import csv
import re
import unicodedata
from pathlib import Path
from typing import Any, Dict, Tuple

import yaml

# ================== KONFIGURACJA ==================
BASE_URL = "https://www.omnimes.com"
# jeśli adresy mają inny prefiks, zmień tutaj:
LANG_PREFIX = {
    "pl": "/pl",
    "en": "/en",
    "de": "/de",
}
START_DIR = Path(".").resolve()
EXCLUDE_DIRS = {"backup"}  # nie skanujemy kopii
# ==================================================

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n?", re.DOTALL)


def slugify(text: str) -> str:
    """Prosty, bezpieczny slug: ascii, małe litery, '-' zamiast spacji, bez dubli."""
    if not text:
        return ""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"[\s_-]+", "-", text).strip("-")
    return text


def split_frontmatter_and_body(raw: str) -> Tuple[Dict[str, Any], str]:
    m = FRONTMATTER_RE.match(raw)
    if not m:
        return {}, raw
    fm_text = m.group(1)
    body = raw[m.end():]
    data = yaml.safe_load(fm_text) or {}
    if not isinstance(data, dict):
        data = {}
    return data, body


def iter_md_files(root: Path):
    for p in root.rglob("*.md"):
        if not p.is_file():
            continue
        # pomiń katalogi z listy wykluczeń
        try:
            if any(part in EXCLUDE_DIRS for part in p.relative_to(root).parts):
                continue
        except ValueError:
            pass
        yield p


def build_url(lang: str, slug: str) -> str:
    lang = (lang or "").lower()
    slug = slugify(slug)
    prefix = LANG_PREFIX.get(lang, "/pl")  # domyślnie pl
    return f"{BASE_URL}{prefix}/{slug}" if slug else f"{BASE_URL}{prefix}"


def main():
    out_all_txt = START_DIR / "urls_gsc.txt"
    out_csv = START_DIR / "urls_gsc.csv"
    out_lang_txt = {
        "pl": START_DIR / "urls_pl.txt",
        "en": START_DIR / "urls_en.txt",
        "de": START_DIR / "urls_de.txt",
    }

    all_urls = []
    rows = []
    per_lang = {"pl": [], "en": [], "de": []}

    for md in iter_md_files(START_DIR):
        raw = md.read_text(encoding="utf-8", errors="ignore")
        fm, _ = split_frontmatter_and_body(raw)

        lang = (fm.get("lang") or "").strip().lower() or "pl"
        title = (fm.get("title") or "").strip()
        slug = (fm.get("slug") or "").strip()

        # fallbacki
        if not slug:
            if title:
                slug = slugify(title)
            else:
                slug = slugify(md.stem)

        url = build_url(lang, slug)

        all_urls.append(url)
        rows.append(
            {
                "lang": lang,
                "title": title or md.stem,
                "slug": slug,
                "url": url,
                "relpath": str(md.relative_to(START_DIR)),
            }
        )
        if lang in per_lang:
            per_lang[lang].append(url)

    # TXT: wszystkie
    out_all_txt.write_text("\n".join(all_urls) + "\n", encoding="utf-8")

    # TXT per język
    for lng, path in out_lang_txt.items():
        if per_lang[lng]:
            path.write_text("\n".join(per_lang[lng]) + "\n", encoding="utf-8")

    # CSV
    with out_csv.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["lang", "title", "slug", "url", "relpath"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✅ Wygenerowano {len(all_urls)} adresów URL")
    print(f"• Wszystkie: {out_all_txt}")
    print(f"• CSV:       {out_csv}")
    for lng, path in out_lang_txt.items():
        print(f"• {lng.upper()}:     {path} ({len(per_lang[lng])})")


if __name__ == "__main__":
    main()
