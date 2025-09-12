#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
art.py — masowe poprawki frontmatter dla Outstatic (.md)
Uruchom w katalogu z artykułami:  python art.py

Co robi:
  1) Update autora w frontmatter:
        author:
          name: "Martin Szerment"
          picture: "https://avatars.githubusercontent.com/u/166378457?v=4"
  2) Indeksuje i czyści tagi:
        - usuwa puste/undefined/null
        - deduplikuje (preferuje angielskie wartości)
        - value 'Temat' lub 'Kategoria' -> 'Industry 5.0'
  3) Każdy oryginał zapisuje do backup/<rel_path>.md
  4) Zapisuje indeks tagów do tags_index.json (stan sprzed zmian)

Wymagania:
    pip install pyyaml
"""

import json
import os
import re
import shutil
from pathlib import Path
from typing import Dict, List, Tuple, Any

import yaml

# ===================== KONFIGURACJA =====================
AUTHOR_NAME = "Martin Szerment"
AUTHOR_PICTURE = "/images/martin.png"

# katalog startowy = bieżący (uruchamiaj w miejscu, gdzie są artykuły)
START_DIR = Path(".").resolve()
BACKUP_ROOT = START_DIR / "backup"
TAGS_INDEX_PATH = START_DIR / "tags_index.json"
# ========================================================

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n?", re.DOTALL)


def is_english_like(s: str) -> bool:
    """Heurystyka 'angielskości' — ASCII-only."""
    if not isinstance(s, str):
        return False
    try:
        s.encode("ascii")
        return True
    except Exception:
        return False


def split_frontmatter_and_body(text: str) -> Tuple[Dict[str, Any], str]:
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    fm_text = m.group(1)
    body = text[m.end():]
    data = yaml.safe_load(fm_text) or {}
    if not isinstance(data, dict):
        data = {}
    return data, body


def join_frontmatter_and_body(fm: Dict[str, Any], body: str) -> str:
    fm_yaml = yaml.safe_dump(fm, allow_unicode=True, sort_keys=False)
    return f"---\n{fm_yaml}---\n{body}"


def load_md(path: Path) -> Tuple[Dict[str, Any], str, str]:
    text = path.read_text(encoding="utf-8")
    fm, body = split_frontmatter_and_body(text)
    return fm, body, text


def ensure_backup(path: Path, original_text: str) -> None:
    rel = path.relative_to(START_DIR)
    backup_path = BACKUP_ROOT / rel
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    backup_path.write_text(original_text, encoding="utf-8")


def save_md(path: Path, fm: Dict[str, Any], body: str) -> None:
    path.write_text(join_frontmatter_and_body(fm, body), encoding="utf-8")


def normalize_tag_item(item: Any) -> Dict[str, Any]:
    """Zwraca słownik {label, value}. Dla stringów duplikuje wartość."""
    if item is None:
        return {}
    if isinstance(item, str):
        s = item.strip()
        return {"label": s, "value": s} if s else {}
    if isinstance(item, dict):
        out = {}
        if "label" in item and isinstance(item["label"], (str, int, float)):
            out["label"] = str(item["label"]).strip()
        if "value" in item and isinstance(item["value"], (str, int, float)):
            out["value"] = str(item["value"]).strip()
        return out
    return {}


def clean_and_dedupe_tags(raw_tags: Any) -> List[Dict[str, str]]:
    """Usuwa puste/undefined, deduplikuje (preferuje angielskie), mapuje Temat/Kategoria -> Industry 5.0."""
    if not raw_tags:
        return []
    # Znormalizuj wejście do listy słowników
    items = raw_tags if isinstance(raw_tags, list) else [raw_tags]
    tags = [normalize_tag_item(t) for t in items]

    cleaned: List[Dict[str, str]] = []
    for t in tags:
        lbl = (t.get("label") or "").strip()
        val = (t.get("value") or "").strip()
        if not lbl and not val:
            continue
        if val.lower() in {"", "undefined", "null", "none"}:
            continue

        # mapowanie wartości
        if val.lower() in {"temat", "kategoria"}:
            val = "Industry 5.0"

        cleaned.append({"label": lbl or val, "value": val or lbl})

    if not cleaned:
        return []

    # deduplikacja po value (case-insensitive), preferuj angielskie
    by_key: Dict[str, Dict[str, str]] = {}
    for t in cleaned:
        key = (t["value"] or "").strip().lower()
        if key in by_key:
            prev = by_key[key]
            if is_english_like(t["value"]) and not is_english_like(prev.get("value", "")):
                by_key[key] = t
        else:
            by_key[key] = t

    return list(by_key.values())


def update_author_in_fm(fm: Dict[str, Any]) -> bool:
    """Ustawia autora wg konfiguracji. Zwraca True, jeśli coś zmieniono."""
    author = fm.get("author")
    if not isinstance(author, dict):
        author = {}
    changed = False
    if author.get("name") != AUTHOR_NAME:
        author["name"] = AUTHOR_NAME
        changed = True
    if author.get("picture") != AUTHOR_PICTURE:
        author["picture"] = AUTHOR_PICTURE
        changed = True
    if changed:
        fm["author"] = author
    return changed


def find_md_files(root: Path) -> List[Path]:
    return [p for p in root.rglob("*.md") if p.is_file() and not str(p).startswith(str(BACKUP_ROOT))]


def main():
    files = find_md_files(START_DIR)
    tag_index: Dict[str, List[Dict[str, str]]] = {}
    changed_author = changed_tags = 0

    for md in files:
        fm, body, original_text = load_md(md)

        # zbuduj indeks tagów (stan PRZED zmianami)
        slug = fm.get("slug") or md.stem
        raw_tags = fm.get("tags")
        if isinstance(raw_tags, list):
            tag_index[slug] = [normalize_tag_item(t) for t in raw_tags]
        elif isinstance(raw_tags, (dict, str)):
            tag_index[slug] = [normalize_tag_item(raw_tags)]
        else:
            tag_index[slug] = []

        a_changed = update_author_in_fm(fm)
        new_tags = clean_and_dedupe_tags(fm.get("tags"))
        t_changed = new_tags != (fm.get("tags") or [])
        if t_changed:
            fm["tags"] = new_tags

        if a_changed or t_changed:
            # zapisz oryginał do backup, a następnie nadpisz plik poprawioną wersją
            ensure_backup(md, original_text)
            save_md(md, fm, body)

        changed_author += int(a_changed)
        changed_tags += int(t_changed)

    # zapisz indeks tagów (stan sprzed zmian)
    TAGS_INDEX_PATH.write_text(json.dumps(tag_index, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"✅ Przetworzono plików: {len(files)}")
    print(f"✍️  Zmieniono autora w: {changed_author}")
    print(f"🏷️  Poprawiono tagi w: {changed_tags}")
    print(f"📄 Indeks tagów zapisany do: {TAGS_INDEX_PATH}")
    print(f"🗂️  Oryginały zapisane w katalogu: {BACKUP_ROOT}")


if __name__ == "__main__":
    main()
