#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os, re, json, argparse, random, base64, unicodedata, logging, traceback, time, subprocess, hashlib
from datetime import datetime, timedelta
from pathlib import Path
import requests
from uuid import uuid4
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None
    print("WARNING: PyYAML not installed. Install with: pip install pyyaml")

try:
    from dotenv import load_dotenv
    # 1) wczytaj .env z bieżącego katalogu
    load_dotenv(dotenv_path=Path(".env"), override=False)
    # 2) opcjonalnie: jeśli uruchamiasz skrypt z innego miejsca, spróbuj też z katalogu pliku
    load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env", override=False)
except Exception:
    pass  # jeśli brak python-dotenv, po prostu lecimy dalej

# ===================== LOGGING SETUP =====================
def setup_logging():
    """Konfiguruje logowanie do pliku log.txt i konsoli"""
    log_file = Path("log.txt")
    
    # Konfiguruj logowanie
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file, encoding='utf-8'),
            logging.StreamHandler()
        ]
    )
    
    logger = logging.getLogger(__name__)
    logger.info("=" * 50)
    logger.info("OmniBlog v3.1 Local - Start sesji")
    logger.info("=" * 50)
    return logger

# ===================== KONFIGURACJA =====================
def load_config():
    """Ładuje konfigurację z pliku config.json"""
    config_path = Path("config.json")
    
    if not config_path.exists():
        logger.warning(f"Plik konfiguracyjny {config_path} nie istnieje. Tworzę domyślny...")
        create_default_config(config_path)
    
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
        logger.info(f"Wczytano konfigurację z {config_path}")
        return config
    except Exception as e:
        logger.error(f"Błąd wczytywania konfiguracji: {e}")
        raise

def create_default_config(config_path):
    """Tworzy domyślny plik konfiguracyjny"""
    default_config = {}
    
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(default_config, f, ensure_ascii=False, indent=2)
    
    logger.info(f"Utworzono domyślny plik konfiguracyjny: {config_path}")

def validate_language_config():
    """Sprawdza czy konfiguracja języków nie ma duplikatów"""
    enabled = config["languages"]["enabled"]
    if len(enabled) != len(set(enabled)):
        duplicates = [lang for lang in enabled if enabled.count(lang) > 1]
        logger.error(f"DUPLIKATY W ENABLED_LANGUAGES: {duplicates}")
        raise ValueError(f"Duplikaty w enabled languages: {duplicates}")
    
    logger.info(f"Konfiguracja języków OK: {enabled}")
    return enabled

# Globalne zmienne
logger = setup_logging()
config = load_config()

# Waliduj konfigurację języków przy starcie
validate_language_config()

# ===================== USTAWIENIA Z ENV + CONFIG =====================
DEFAULT_WORDS = config["settings"]["default_words"]

# Katalogi/ścieżki
POSTS_DIR_REL = os.getenv("POSTS_DIR_REL", "outstatic/content/posts")
CONTENT_PLAN_PATH = Path(os.getenv("CONTENT_PLAN_PATH", "content_plan.json"))
COVERS_DIR_REL = os.getenv("COVERS_DIR_REL", "public/images")
CHECKPOINT_PATH = Path("checkpoint.json")

# Nowe ścieżki dla lokalnych plików
POSTS_DIR_LOCAL = Path(POSTS_DIR_REL)
COVERS_DIR_LOCAL = Path(COVERS_DIR_REL)
METADATA_JSON_PATH = Path("outstatic/content/metadata.json")
SCHEMA_JSON_PATH = Path("schema.json")

# pliki w repo
COVER_FALLBACKS = config["settings"]["cover_fallbacks"]

# Autor
AUTHOR = config["settings"]["author"]

# Git settings
GIT_AUTHOR_NAME = os.getenv("GIT_AUTHOR_NAME", "Martin Szerment")
GIT_AUTHOR_EMAIL = os.getenv("GIT_AUTHOR_EMAIL", "mszerment@multiprojekt.pl")

# Kategorie/tematy z konfiguracji
TAGS_BASE = config["content"]["tags_base"]

# Języki z konfiguracji
PRIMARY_LANG = config["languages"]["primary"]
ENABLED_LANGUAGES = config["languages"]["enabled"]

# ===================== NOWE FUNKCJE LOKALNEGO ZARZĄDZANIA =====================

def ensure_directories():
    """Upewnia się że wszystkie potrzebne katalogi istnieją"""
    directories = [POSTS_DIR_LOCAL, COVERS_DIR_LOCAL, METADATA_JSON_PATH.parent]
    
    for dir_path in directories:
        if not dir_path.exists():
            dir_path.mkdir(parents=True, exist_ok=True)
            logger.info(f"Utworzono katalog: {dir_path}")

def get_current_git_commit():
    """Pobiera aktualny commit hash z git w katalogu PROJECT_ROOT"""
    try:
        result = subprocess.run(['git', 'rev-parse', 'HEAD'], 
                              capture_output=True, text=True, check=True, cwd=PROJECT_ROOT)
        commit_hash = result.stdout.strip()
        logger.info(f"Aktualny commit: {commit_hash}")
        return commit_hash
    except Exception as e:
        logger.warning(f"Nie udało się pobrać commit hash: {e}")
        return None

def generate_content_hash(content):
    """Generuje hash na podstawie zawartości pliku"""
    content_bytes = content.encode('utf-8') if isinstance(content, str) else content
    hash_obj = hashlib.sha256(content_bytes)
    # Zwracamy pierwsze 10 cyfr jak w przykładzie
    return str(int(hash_obj.hexdigest()[:8], 16))

def load_metadata_json():
    """Ładuje metadata.json lub tworzy pusty jeśli nie istnieje"""
    if METADATA_JSON_PATH.exists():
        try:
            with open(METADATA_JSON_PATH, 'r', encoding='utf-8') as f:
                metadata = json.load(f)
            logger.info(f"Wczytano metadata.json ({len(metadata)} wpisów)")
            return metadata
        except Exception as e:
            logger.error(f"Błąd wczytywania metadata.json: {e}")
            return {}
    else:
        logger.info("metadata.json nie istnieje, tworzę nowy")
        return {}

def save_metadata_json(metadata):
    """Zapisuje metadata.json"""
    try:
        ensure_directories()
        with open(METADATA_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
        logger.info(f"Zapisano metadata.json ({len(metadata)} wpisów)")
    except Exception as e:
        logger.error(f"Błąd zapisywania metadata.json: {e}")
        raise

def add_to_metadata(slug, post_data, lang, published_iso, cover_image, file_path):
    """Dodaje wpis do metadata.json"""
    metadata = load_metadata_json()
    
    # Pobierz aktualny commit (może być None jeśli nie udało się pobrać)
    current_commit = get_current_git_commit()
    
    # Wygeneruj hash na podstawie zawartości
    post_content = json.dumps(post_data, ensure_ascii=False, sort_keys=True)
    content_hash = generate_content_hash(post_content)
    
    metadata_entry = {
        "__outstatic": {
            "commit": current_commit or "pending",  # będzie zaktualizowane po push
            "hash": content_hash,
            "path": str(file_path)
        },
        "author": {
            "name": AUTHOR["name"],
            "picture": AUTHOR["picture"]
        },
        "collection": "posts",
        "coverImage": cover_image,
        "description": post_data.get('description', ''),
        "lang": lang,
        "publishedAt": published_iso,
        "slug": slug,
        "status": "published",
        "tags": post_data.get('tags', []),
        "title": post_data.get('title', '')
    }
    
    metadata[slug] = metadata_entry
    save_metadata_json(metadata)
    logger.info(f"Dodano {slug} do metadata.json")

def load_schema_json():
    """Ładuje schema.json lub tworzy pusty jeśli nie istnieje"""
    if SCHEMA_JSON_PATH.exists():
        try:
            with open(SCHEMA_JSON_PATH, 'r', encoding='utf-8') as f:
                schema = json.load(f)
            logger.info(f"Wczytano schema.json")
            return schema
        except Exception as e:
            logger.error(f"Błąd wczytywania schema.json: {e}")
            return {}
    else:
        logger.info("schema.json nie istnieje, tworzę nowy")
        return {}

def save_schema_json(schema):
    """Zapisuje schema.json"""
    try:
        with open(SCHEMA_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(schema, f, ensure_ascii=False, indent=2)
        logger.info("Zapisano schema.json")
    except Exception as e:
        logger.error(f"Błąd zapisywania schema.json: {e}")
        raise

def add_tags_to_schema(tags):
    """Dodaje brakujące tagi do schema.json"""
    schema = load_schema_json()
    
    # Upewnij się że istnieje struktura dla tagów
    if 'tags' not in schema:
        schema['tags'] = []
    
    existing_values = {tag.get('value') for tag in schema['tags'] if isinstance(tag, dict)}
    added_count = 0
    
    for tag in tags:
        if isinstance(tag, dict) and 'value' in tag and 'label' in tag:
            if tag['value'] not in existing_values:
                schema['tags'].append({
                    "value": tag['value'],
                    "label": tag['label']
                })
                existing_values.add(tag['value'])
                added_count += 1
                logger.info(f"Dodano tag do schema.json: {tag['label']} ({tag['value']})")
    
    if added_count > 0:
        save_schema_json(schema)
        logger.info(f"Dodano {added_count} nowych tagów do schema.json")
    else:
        logger.info("Wszystkie tagi już istnieją w schema.json")

def count_pending_articles():
    """Liczy artykuły do publikacji z content_plan.json"""
    try:
        plan = load_plan()
        due = due_slots(plan)
        count = len(due)
        logger.info(f"Artykuły do publikacji: {count}")
        return count
    except Exception as e:
        logger.error(f"Błąd liczenia artykułów: {e}")
        return 0

def execute_git_operations(article_count):
    """Wykonuje operacje git: add, commit, push"""
    try:
        logger.info(f"Rozpoczynam operacje git dla {article_count} artykułów")
        
        # git add .
        subprocess.run(['git', 'add', '.'], check=True)
        logger.info("Wykonano: git add .")
        
        # git commit
        commit_message = f"Dodanie artykułów {article_count}"
        subprocess.run(['git', 'commit', '-m', commit_message,
                       f'--author={GIT_AUTHOR_NAME} <{GIT_AUTHOR_EMAIL}>'], check=True)
        logger.info(f"Wykonano: git commit -m '{commit_message}'")
        
        # Pobierz nowy commit hash
        new_commit = get_current_git_commit()
        
        # Zaktualizuj metadata.json z nowym commit hash
        if new_commit:
            update_metadata_commit_hash(new_commit)
        
        # git push
        subprocess.run(['git', 'push'], check=True)
        logger.info("Wykonano: git push")
        
        logger.info("Wszystkie operacje git zakończone pomyślnie")
        return True
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Błąd operacji git: {e}")
        return False
    except Exception as e:
        logger.error(f"Nieoczekiwany błąd git: {e}")
        return False

def update_metadata_commit_hash(new_commit):
    """Aktualizuje commit hash w metadata.json po wykonaniu commit"""
    try:
        metadata = load_metadata_json()
        updated_count = 0
        
        for slug, entry in metadata.items():
            if (isinstance(entry, dict) and 
                '__outstatic' in entry and 
                entry['__outstatic'].get('commit') == 'pending'):
                entry['__outstatic']['commit'] = new_commit
                updated_count += 1
        
        if updated_count > 0:
            save_metadata_json(metadata)
            logger.info(f"Zaktualizowano commit hash w {updated_count} wpisach metadata.json")
    except Exception as e:
        logger.error(f"Błąd aktualizacji commit hash: {e}")

# ===================== CHECKPOINT SYSTEM =====================
def save_checkpoint(current_slot_index, total_slots, published_slots, failed_slots, articles_created=0):
    """Zapisuje checkpoint z aktualnym stanem publikacji"""
    checkpoint = {
        "timestamp": datetime.utcnow().isoformat(),
        "current_slot_index": current_slot_index,
        "total_slots": total_slots,
        "published_count": len(published_slots),
        "failed_count": len(failed_slots),
        "published_slots": published_slots,
        "failed_slots": failed_slots,
        "articles_created": articles_created
    }
    
    try:
        with open(CHECKPOINT_PATH, 'w', encoding='utf-8') as f:
            json.dump(checkpoint, f, ensure_ascii=False, indent=2)
        logger.info(f"Checkpoint zapisany: slot {current_slot_index}/{total_slots}, artykuły utworzone: {articles_created}")
    except Exception as e:
        logger.error(f"Błąd zapisywania checkpoint: {e}")

def load_checkpoint():
    """Wczytuje ostatni checkpoint"""
    if not CHECKPOINT_PATH.exists():
        return None
    
    try:
        with open(CHECKPOINT_PATH, 'r', encoding='utf-8') as f:
            checkpoint = json.load(f)
        logger.info(f"Wczytano checkpoint: slot {checkpoint['current_slot_index']}/{checkpoint['total_slots']}")
        return checkpoint
    except Exception as e:
        logger.error(f"Błąd wczytywania checkpoint: {e}")
        return None

def clear_checkpoint():
    """Usuwa checkpoint po zakończeniu publikacji"""
    try:
        if CHECKPOINT_PATH.exists():
            CHECKPOINT_PATH.unlink()
            logger.info("Checkpoint wyczyszczony")
    except Exception as e:
        logger.error(f"Błąd czyszczenia checkpoint: {e}")

# ===================== UTILS (zachowane z oryginalnego kodu) =====================
def env(name, default=None, required=False):
    v = os.getenv(name, default)
    if required and not v:
        logger.error(f"Brak wymaganej zmiennej środowiskowej: {name}")
        raise RuntimeError(f"Missing env var: {name}")
    return v

def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text[:120]

def iso_z(dt: datetime):
    return dt.replace(microsecond=0).isoformat() + "Z"

def is_json_string(text: str) -> bool:
    """Sprawdza czy tekst wygląda na JSON"""
    if not text or not isinstance(text, str):
        return False
        
    text = text.strip()
    if not text:
        return False
    
    if text.startswith('{') and text.endswith('}'):
        try:
            json.loads(text)
            return True
        except:
            pass
    
    json_indicators = ['"title":', '"body":', '"description":', '"tags":']
    return any(indicator in text for indicator in json_indicators)

def clean_article_body(body: str) -> str:
    """Czyści treść artykułu z JSON-a i innych artefaktów"""
    if not body or not isinstance(body, str):
        return ""
    
    body = body.strip()
    
    if is_json_string(body):
        logger.warning("Wykryto JSON w treści artykułu, próbuję wyczyścić")
        try:
            json_data = json.loads(body)
            if isinstance(json_data, dict) and 'body' in json_data:
                body = json_data['body']
                logger.info("Wyciągnięto treść z JSON body")
            else:
                logger.warning("Nie można wyciągnąć treści z JSON body")
                return ""
        except:
            logger.error("Nie można sparsować JSON w body")
            return ""
    
    # Usuń pozostałe artefakty JSON
    body = re.sub(r'^\s*\{.*?\}\s*', '', body, flags=re.DOTALL)
    body = re.sub(r'"title":\s*"[^"]*"', '', body)
    body = re.sub(r'"body":\s*"', '', body)
    body = re.sub(r'"tags":\s*\[.*?\]', '', body, flags=re.DOTALL)
    
    # Usuń escape characters
    body = body.replace('\\"', '"')
    body = body.replace('\\n', '\n')
    
    # Normalizuj białe znaki
    body = re.sub(r'\n\s*\n\s*\n', '\n\n', body)
    body = body.strip()
    
    return body

def extract_json(block: str):
    """Ulepszona funkcja do wyciągania JSON z odpowiedzi OpenAI"""
    logger.info(f"Rozpoczynam parsowanie JSON. Długość bloku: {len(block)} znaków")
    
    # Usuń markdown code blocks
    cleaned = re.sub(r'```json\s*', '', block)
    cleaned = re.sub(r'```\s*$', '', cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r'^```.*$', '', cleaned, flags=re.MULTILINE)
    cleaned = cleaned.strip()
    
    # Usuń tekst przed i po JSON
    first_brace = cleaned.find('{')
    last_brace = cleaned.rfind('}')
    
    if first_brace != -1 and last_brace != -1 and last_brace > first_brace:
        json_candidate = cleaned[first_brace:last_brace + 1]
    else:
        json_candidate = cleaned
    
    # Spróbuj różne metody wydobycia JSON
    extraction_methods = [
        lambda x: json_candidate,
        lambda x: re.search(r'\{.*\}', x, re.DOTALL).group(0) if re.search(r'\{.*\}', x, re.DOTALL) else None,
        lambda x: re.search(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', x, re.DOTALL).group(0) if re.search(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', x, re.DOTALL) else None,
    ]
    
    for i, method in enumerate(extraction_methods, 1):
        try:
            json_text = method(cleaned)
            if not json_text or json_text.strip() == '':
                continue
                
            json_text = json_text.strip()
            logger.info(f"Metoda {i}: Próbuję sparsować JSON ({len(json_text)} znaków)")
            
            parsed = json.loads(json_text)
            
            required_keys = ['title', 'body']
            if all(key in parsed for key in required_keys):
                body = parsed.get('body', '')
                if isinstance(body, str) and not is_json_string(body):
                    logger.info(f"Metoda {i}: Sukces! JSON poprawnie sparsowany")
                    return parsed
                else:
                    logger.warning(f"Metoda {i}: Body wygląda na JSON, pomijam")
                    continue
            else:
                logger.warning(f"Metoda {i}: JSON sparsowany ale brak wymaganych kluczy: {list(parsed.keys())}")
                continue
                
        except json.JSONDecodeError as e:
            logger.warning(f"Metoda {i}: Błąd parsowania JSON: {e}")
            continue
        except Exception as e:
            logger.warning(f"Metoda {i}: Nieoczekiwany błąd: {e}")
            continue
    
    logger.error("Wszystkie metody ekstrakcji JSON zawiodły")
    return None

# ===================== OPENAI (zachowane z oryginalnego kodu) =====================
def openai_client():
    try:
        from openai import OpenAI
        client = OpenAI(api_key=env("OPENAI_API_KEY", required=True))
        logger.info("Klient OpenAI zainicjalizowany pomyślnie")
        return client
    except Exception as e:
        logger.error(f"Błąd inicjalizacji klienta OpenAI: {e}")
        raise

def determine_topic_category(topic):
    """Określa kategorię tematu na podstawie słów kluczowych"""
    topic_lower = topic.lower()
    
    tech_keywords = ['mqtt', 'api', 'ml', 'ai', 'algorithm', 'protocol', 'integration', 'rag', 'vector', 'edge']
    business_keywords = ['roi', 'cost', 'budget', 'manager', 'compliance', 'training', 'risk', 'kpi']
    iot_keywords = ['iot', 'sensor', 'device', 'connectivity', 'sparkplug']
    ai_keywords = ['ai', 'machine learning', 'neural', 'prediction', 'computer vision']
    mes_keywords = ['mes', 'manufacturing', 'production', 'oee', 'monitoring']
    
    if any(keyword in topic_lower for keyword in ai_keywords):
        return 'ai'
    elif any(keyword in topic_lower for keyword in iot_keywords):
        return 'iot'
    elif any(keyword in topic_lower for keyword in mes_keywords):
        return 'mes'
    elif any(keyword in topic_lower for keyword in tech_keywords):
        return 'technical'
    elif any(keyword in topic_lower for keyword in business_keywords):
        return 'business'
    else:
        return 'technical'

def validate_article_quality(data, lang):
    """Walidacja z ustawieniami z config.json"""
    issues = []
    validation_config = config["settings"]["validation"]
    
    title = data.get('title', '')
    min_title = validation_config["min_title_length"]
    max_title = validation_config["max_title_length"]
    
    if len(title) > max_title:
        issues.append(f"Tytuł za długi: {len(title)} znaków (max {max_title})")
    if len(title) < min_title:
        issues.append(f"Tytuł za krótki: {len(title)} znaków (min {min_title})")
    
    body = data.get('body', '')
    if is_json_string(body):
        issues.append("Treść zawiera JSON")
    
    word_count = len(body.split())
    min_words = validation_config["min_article_words"]
    max_words = validation_config["max_article_words"]
    
    if word_count < min_words:
        issues.append(f"Artykuł za krótki: {word_count} słów (min {min_words})")
    if word_count > max_words:
        issues.append(f"Artykuł za długi: {word_count} słów (max {max_words})")
    
    if validation_config["require_markdown_headers"] and not re.search(r'^#+\s', body, re.MULTILINE):
        issues.append("Brak nagłówków markdown w treści")
    
    if validation_config["require_omnimes_mention"] and 'omnimes' not in body.lower():
        issues.append("Brak wzmianki o OmniMES")
    
    description = data.get('description', '')
    min_desc = validation_config["min_description_length"]
    max_desc = validation_config["max_description_length"]
    
    if len(description) > max_desc:
        issues.append(f"Opis SEO za długi: {len(description)} znaków (max {max_desc})")
    if len(description) < min_desc:
        issues.append(f"Opis SEO za krótki: {len(description)} znaków (min {min_desc})")
    
    if issues:
        logger.warning(f"Problemy z jakością artykułu ({lang}): {', '.join(issues)}")
        return False, issues
    else:
        logger.info(f"Artykuł przeszedł walidację jakości ({lang})")
        return True, []

def gen_article_lang(topic, lang=None, target_words=None):
    """Poprawiona funkcja generowania artykułu z konfiguracją z config.json"""
    if lang is None:
        lang = PRIMARY_LANG
    if target_words is None:
        target_words = DEFAULT_WORDS
    
    logger.info(f"Generowanie artykułu: '{topic}' w języku {lang} (~{target_words} słów)")
    
    try:
        cli = openai_client()
        
        # Pobierz ustawienia OpenAI z konfiguracji
        openai_config = config["openai"]
        model = openai_config["model"]
        temperature = openai_config["temperature"]["article_generation"]
        max_tokens = openai_config["max_tokens"]["article_generation"]
        
        # Pobierz prompt systemowy z konfiguracji
        system_prompts = config["prompts"]["system_prompts"][lang]
        sys = " ".join(system_prompts)
        
        # Jeśli język nie jest polski, najpierw przetłumacz temat
        if lang != PRIMARY_LANG:
            logger.info(f"Tłumaczenie tematu na język: {lang}")
            topic = translate_topic(topic, lang)
            logger.info(f"Przetłumaczony temat: {topic}")
            # Użyj niższej temperatury dla tłumaczeń
            temperature = openai_config["temperature"]["translation"]
        
        user = f"""
Napisz kompletny artykuł (~{target_words} słów) na temat: "{topic}"

BARDZO WAŻNE: Zwróć TYLKO poprawny obiekt JSON w następującym formacie. Bez dodatkowego tekstu, bez wyjaśnień, bez formatowania markdown dla całości.

Wymagany format JSON:
{{
    "title": "tytuł artykułu (maksymalnie 90 znaków)",
    "description": "opis SEO (140-160 znaków)", 
    "seo_keywords": ["lista", "słów", "kluczowych"],
    "tags": [{{"label":"Nazwa", "value":"wartość"}}],
    "body": "treść artykułu w formacie Markdown z naturalną wzmianką o systemie OmniMES"
}}

Pole "body" musi zawierać TYLKO czyste formatowanie Markdown (nagłówki, tekst, listy), BEZ cudzysłowów JSON na początku/końcu.

Zwróć TYLKO ten obiekt JSON, nic więcej!
        """
        
        r = cli.chat.completions.create(
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
            messages=[
                {"role": "system", "content": sys},
                {"role": "user", "content": user}
            ]
        )
        
        content = r.choices[0].message.content.strip()
        logger.info(f"Otrzymano odpowiedź OpenAI dla języka {lang}")
        logger.info(f"Długość odpowiedzi: {len(content)} znaków")
        
        data = extract_json(content)
        
        if not data:
            logger.error(f"Nie udało się wyodrębnić JSON z odpowiedzi OpenAI dla języka {lang}")
            with open(f"debug_response_{lang}_{datetime.now().strftime('%H%M%S')}.txt", "w", encoding="utf-8") as f:
                f.write(f"TOPIC: {topic}\n")
                f.write(f"LANG: {lang}\n")
                f.write("=" * 50 + "\n")
                f.write(content)
            
            raise RuntimeError(f"Nie udało się sparsować odpowiedzi OpenAI dla języka {lang}")
        
        # Waliduj i oczyść treść artykułu
        if 'body' in data:
            original_body = data['body']
            cleaned_body = clean_article_body(original_body)
            
            if not cleaned_body or len(cleaned_body.strip()) < 100:
                logger.error(f"Treść artykułu jest pusta lub za krótka po czyszczeniu ({lang})")
                raise RuntimeError(f"Nieprawidłowa treść artykułu dla języka {lang}")
            
            data['body'] = cleaned_body
            logger.info(f"Treść artykułu oczyszczona ({lang}): {len(cleaned_body)} znaków")
        
        # Sprawdź wymagane pola
        required_fields = ['title', 'body']
        for field in required_fields:
            if field not in data or not data[field] or len(str(data[field]).strip()) == 0:
                logger.error(f"Brak wymaganego pola '{field}' w danych artykułu ({lang})")
                raise RuntimeError(f"Brak pola {field} dla języka {lang}")
        
        # Ustaw domyślne wartości dla opcjonalnych pól
        data["slug"] = slugify(data["title"])
        if "tags" not in data or not data["tags"]:
            data["tags"] = TAGS_BASE[:4]
        if "description" not in data or not data["description"]:
            data["description"] = f"Artykuł na temat: {topic}"[:160]
        if "seo_keywords" not in data or not data["seo_keywords"]:
            data["seo_keywords"] = ["MES", "Industry 4.0", "automatyzacja"]
            
        logger.info(f"Artykuł wygenerowany pomyślnie ({lang}): '{data['title']}'")
        logger.info(f"Długość treści artykułu ({lang}): {len(data['body'])} znaków")
        
        return data
        
    except Exception as e:
        logger.error(f"Błąd generowania artykułu ({lang}): {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise

def retry_article_generation(topic, lang=None, target_words=None):
    """Generuj artykuł z retry settings z config.json"""
    if lang is None:
        lang = PRIMARY_LANG
    if target_words is None:
        target_words = config["settings"]["default_words"]
        
    retry_config = config["settings"]["retry_settings"]
    max_retries = retry_config["max_article_retries"]
    delay = retry_config["retry_delay_seconds"]
    
    for attempt in range(max_retries):
        try:
            logger.info(f"Próba generowania artykułu {attempt + 1}/{max_retries} ({lang})")
            
            data = gen_article_lang(topic, lang, target_words)
            
            # Waliduj jakość
            is_valid, issues = validate_article_quality(data, lang)
            if not is_valid and attempt < max_retries - 1:
                logger.warning(f"Artykuł nie przeszedł walidacji, próbuję ponownie. Problemy: {issues}")
                continue
            
            return data
            
        except Exception as e:
            logger.error(f"Próba {attempt + 1} nieudana ({lang}): {e}")
            if attempt == max_retries - 1:
                raise
            else:
                logger.info(f"Czekam {delay} sekund przed kolejną próbą...")
                time.sleep(delay)
    
    raise RuntimeError(f"Nie udało się wygenerować artykułu po {max_retries} próbach")

def translate_topic(topic, target_lang):
    """Tłumaczy temat na język docelowy"""
    try:
        cli = openai_client()
        openai_config = config["openai"]
        lang_names = config["languages"]["names"]
        
        ln = lang_names[target_lang]
        
        r = cli.chat.completions.create(
            model=openai_config["model"],
            temperature=openai_config["temperature"]["translation"],
            messages=[
                {"role": "system", "content": f"Translate the following topic/title to {ln}. Return only the translation, nothing else."},
                {"role": "user", "content": topic}
            ]
        )
        return r.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"Błąd tłumaczenia tematu na {target_lang}: {e}")
        return topic

def translate_md(md_text, target_lang):
    logger.info(f"Tłumaczenie tekstu na język: {target_lang}")
    try:
        cli = openai_client()
        openai_config = config["openai"]
        lang_names = config["languages"]["names"]
        
        ln = lang_names[target_lang]
        sys = ("Tłumacz poniższy Markdown zachowując nagłówki/linki/formatowanie. "
               "Zachowaj ton SEO; dostosuj gramatykę do języka docelowego; bez halucynacji.")
               
        r = cli.chat.completions.create(
            model=openai_config["model"],
            temperature=openai_config["temperature"]["translation"],
            max_tokens=openai_config["max_tokens"]["translation"],
            messages=[
                {"role": "system", "content": sys},
                {"role": "user", "content": f"Przetłumacz na {ln}. Zwróć tylko Markdown."},
                {"role": "user", "content": md_text}
            ]
        )
        
        result = r.choices[0].message.content.strip()
        logger.info(f"Tłumaczenie na {target_lang} ukończone")
        return result
    except Exception as e:
        logger.error(f"Błąd tłumaczenia na {target_lang}: {e}")
        raise

# ===================== TOPIC GENERATION (zachowane) =====================
def generate_topic_from_keywords(keywords_list):
    """Generuje temat używając GPT na podstawie słów kluczowych"""
    logger.info("Generowanie tematu przez GPT na podstawie słów kluczowych")
    
    try:
        cli = openai_client()
        openai_config = config["openai"]
        
        selected_keywords = random.sample(keywords_list, min(random.randint(3, 5), len(keywords_list)))
        keywords_str = ", ".join(selected_keywords)
        
        prompt = config["prompts"]["topic_generation_prompt"]
        
        r = cli.chat.completions.create(
            model=openai_config["model"],
            temperature=openai_config["temperature"]["topic_generation"],
            max_tokens=openai_config["max_tokens"]["topic_generation"],
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": f"Keywords: {keywords_str}"}
            ]
        )
        
        topic = r.choices[0].message.content.strip()
        logger.info(f"GPT wygenerował temat: '{topic}' na podstawie słów: {keywords_str}")
        return topic
        
    except Exception as e:
        logger.error(f"Błąd generowania tematu przez GPT: {e}")
        return propose_topic_predefined()

def propose_topic_predefined():
    """Generuje temat na podstawie predefined topics + sufiksy z config.json"""
    logger.info("Generowanie tematu z predefined topics")
    
    weights_config = config["content"]["topic_buckets"]["weights"]
    categories = list(weights_config.keys())
    weights = [weights_config[cat] for cat in categories]
    
    category = random.choices(categories, weights=weights)[0]
    
    topics = config["content"]["topic_buckets"]["topics"][category]
    suffixes = config["content"]["topic_buckets"]["suffixes"][category]
    
    base_topic = random.choice(topics)
    suffix = random.choice(suffixes)
    
    final_topic = f"{base_topic} {suffix}"
    
    logger.info(f"Wygenerowany temat ({category}): {final_topic}")
    return final_topic

def choose_topic_generation_method():
    """Decyduje czy użyć GPT czy predefined topics na podstawie wag z config"""
    method_weights = config["content"]["topic_generation"]["method_weights"]
    
    methods = list(method_weights.keys())
    weights = [method_weights[method] for method in methods]
    
    chosen_method = random.choices(methods, weights=weights)[0]
    
    logger.info(f"Wybrana metoda generowania tematu: {chosen_method}")
    return chosen_method

def propose_topic():
    """Główna funkcja generowania tematu - wybiera metodę i generuje"""
    method = choose_topic_generation_method()
    
    if method == "gpt_generated":
        keywords = config["content"]["topic_generation"]["gpt_keywords"]
        return generate_topic_from_keywords(keywords)
    else:  # predefined
        return propose_topic_predefined()

# ===================== IMAGES (zachowane ale lokalnie) =====================
def gen_cover_png_bytes(topic: str) -> bytes:
    """Generuje okładkę z retry settings z config.json"""
    logger.info(f"Generowanie okładki dla tematu: '{topic}'")
    
    retry_config = config["settings"]["retry_settings"]
    max_retries = retry_config["max_image_retries"]
    openai_config = config["openai"]
    
    for attempt in range(max_retries):
        try:
            cli = openai_client()
            
            category = determine_topic_category(topic)
            image_prompt_template = config["prompts"]["image_prompts"][category]
            
            prompt = image_prompt_template.format(topic=topic[:100])
            
            if len(prompt) > 400:
                prompt = prompt[:397] + "..."
                
            logger.info(f"Próba {attempt + 1}: Używam promptu dla kategorii '{category}'")
            
            img = cli.images.generate(
                model=openai_config["image_model"],
                prompt=prompt,
                size=openai_config["image_size"],
                quality=openai_config["image_quality"],
                response_format="b64_json",
                style=openai_config["image_style"]
            )
            
            if not img.data or not img.data[0].b64_json:
                raise ValueError("OpenAI nie zwróciło danych obrazka")
                
            result = base64.b64decode(img.data[0].b64_json)
            logger.info(f"Okładka wygenerowana pomyślnie ({len(result)} bajtów)")
            return result
            
        except Exception as e:
            logger.error(f"Próba {attempt + 1} generowania okładki nieudana: {e}")
            if attempt == max_retries - 1:
                logger.error("Wszystkie próby generowania okładki nieudane")
                raise
            else:
                time.sleep(2)

def pick_fallback_cover() -> str:
    cover = random.choice(COVER_FALLBACKS)
    logger.info(f"Użyto fallback okładki: {cover}")
    return cover

def save_cover_locally(slug: str, png_bytes: bytes) -> str:
    """Zapisuje okładkę lokalnie i zwraca ścieżkę web"""
    ensure_directories()
    
    filename = f"{slug}.png"
    local_path = COVERS_DIR_LOCAL / filename
    
    try:
        with open(local_path, 'wb') as f:
            f.write(png_bytes)
        
        # Zwróć ścieżkę web
        if COVERS_DIR_REL.startswith("public/"):
            web_path = "/" + COVERS_DIR_REL[len("public/"):] + f"/{filename}"
        else:
            web_path = "/" + COVERS_DIR_REL.strip("/") + f"/{filename}"
            
        logger.info(f"Okładka zapisana lokalnie: {local_path} -> {web_path}")
        return web_path
        
    except Exception as e:
        logger.error(f"Błąd zapisywania okładki lokalnie: {e}")
        raise

# ===================== RENDER .MD (zmodyfikowane) =====================
def yaml_escape(value):
    """Escapuje wartość dla YAML z proper handling"""
    if not isinstance(value, str):
        return str(value)
    
    # Usuń potencjalne problematyczne cudzysłowy z początku i końca (z JSON)
    if value.startswith('"') and value.endswith('"') and len(value) > 2:
        value = value[1:-1]
        logger.info("Usunięto cudzysłowy z wartości podczas YAML escape")
    
    # Jeśli zawiera specjalne znaki YAML, użyj double quotes z escapowaniem
    if any(char in value for char in ['"', "'", '\n', '\r', ':', '[', ']', '{', '}', '|', '>', '#', '@', '`']):
        # Escapuj double quotes i backslashes
        escaped = value.replace('\\', '\\\\').replace('"', '\\"')
        return f'"{escaped}"'
    else:
        return f'"{value}"'  # Zawsze używaj double quotes dla bezpieczeństwa

def render_frontmatter(post, lang, published_iso, cover_image, group_id=None):
    """Poprawiona funkcja z proper YAML formatting"""
    tags = post.get("tags") or TAGS_BASE
    
    if yaml:
        # Użyj PyYAML jeśli dostępne
        try:
            # Przygotuj dane do YAML
            tags_list = []
            for t in tags:
                tags_list.append({
                    'label': str(t.get("label", "")),
                    'value': str(t.get("value", ""))
                })
            
            frontmatter_data = {
                'title': str(post['title']),
                'status': 'published',
                'author': {
                    'name': str(AUTHOR['name']),
                    'picture': str(AUTHOR['picture'])
                },
                'slug': str(post['slug']),
                'description': str(post.get('description', '')),
                'coverImage': str(cover_image),
                'tags': tags_list,
                'lang': str(lang),
                'publishedAt': str(published_iso)
            }
            
            if group_id:
                frontmatter_data['groupId'] = str(group_id)
            
            # Użyj yaml.dump do proper formatowania
            yaml_content = yaml.dump(frontmatter_data, 
                                    default_flow_style=False, 
                                    allow_unicode=True,
                                    sort_keys=False,
                                    width=1000)  # Zapobiega łamaniu długich linii
            
            return "---\n" + yaml_content + "---\n"
            
        except Exception as e:
            logger.error(f"Błąd generowania YAML frontmatter: {e}")
            # Fallback do prostego formatowania
            pass
    
    # Fallback bez PyYAML lub gdy PyYAML zawiedzie
    tags_str = ", ".join([
        "{ 'label': %s, 'value': %s }" % (yaml_escape(t["label"]), yaml_escape(t["value"]))
        for t in tags
    ])
    
    fm = [
        "---",
        f"title: {yaml_escape(post['title'])}",
        f"status: 'published'",
        f"author:",
        f"  name: {yaml_escape(AUTHOR['name'])}",
        f"  picture: {yaml_escape(AUTHOR['picture'])}",
        f"slug: {yaml_escape(post['slug'])}",
        f"description: {yaml_escape(post.get('description', ''))}",
        f"coverImage: {yaml_escape(cover_image)}",
        f"tags: [ {tags_str} ]",
        f"lang: '{lang}'",
        f"publishedAt: '{published_iso}'",
    ]
    
    if group_id:
        fm.append(f"groupId: {yaml_escape(group_id)}")
    
    fm.extend(["---", ""])
    return "\n".join(fm)

def validate_article_before_render(post, lang):
    """Sprawdza artykuł przed renderowaniem i czyści problematyczne znaki"""
    
    # Sprawdź tytuł
    title = post.get('title', '')
    if not title:
        raise ValueError("Brak tytułu artykułu")
    
    # Wyczyść niepotrzebne cudzysłowy z tytułu (może pochodzić z JSON)
    if title.startswith('"') and title.endswith('"') and len(title) > 2:
        title = title[1:-1]  # Usuń cudzysłowy z początku i końca
        post['title'] = title
        logger.info(f"Usunięto cudzysłowy z tytułu: {title}")
    
    # Sprawdź inne pola
    description = post.get('description', '')
    if description.startswith('"') and description.endswith('"') and len(description) > 2:
        description = description[1:-1]
        post['description'] = description
        logger.info("Usunięto cudzysłowy z opisu")
    
    # Sprawdź body na obecność JSON
    body = post.get('body', '')
    if is_json_string(body):
        logger.error("Wykryto JSON w body podczas walidacji przed renderowaniem!")
        raise ValueError("Body zawiera JSON zamiast Markdown")
    
    return post

def render_md(post, lang, published_iso, cover_image, group_id=None):
    """Poprawiona funkcja renderowania z dodatkową walidacją"""
    
    # Waliduj i wyczyść artykuł
    post = validate_article_before_render(post, lang)
    
    body = post.get("body", "")
    if is_json_string(body):
        logger.error("KRYTYCZNY BŁĄD: Wykryto JSON w treści artykułu podczas renderowania!")
        logger.error(f"Treść: {body[:200]}...")
        
        cleaned_body = clean_article_body(body)
        if cleaned_body and len(cleaned_body.strip()) > 100:
            logger.warning("Udało się wyczyścić treść z JSON")
            post["body"] = cleaned_body
            body = cleaned_body
        else:
            raise RuntimeError("Nie można wyczyścić treści artykułu z JSON")
    
    frontmatter = render_frontmatter(post, lang, published_iso, cover_image, group_id)
    body = body.rstrip() + "\n"
    
    result = frontmatter + body
    
    # Finalna walidacja
    if '"title":' in result or '"body":' in result:
        logger.error("BŁĄD: Wykryto struktury JSON w finalnym pliku .md!")
        lines = result.split('\n')
        for i, line in enumerate(lines):
            if '"title":' in line or '"body":' in line:
                logger.error(f"Linia {i+1}: {line}")
        raise RuntimeError("Wygenerowany plik .md zawiera JSON")
    
    logger.info(f"Wygenerowano plik .md o długości {len(result)} znaków")
    return result

# ===================== PLANER (zachowane) =====================
def load_plan():
    logger.info(f"Ładowanie planu z: {CONTENT_PLAN_PATH}")
    if CONTENT_PLAN_PATH.exists():
        try:
            plan = json.loads(CONTENT_PLAN_PATH.read_text(encoding="utf-8"))
            logger.info(f"Plan wczytany pomyślnie. Slotów: {len(plan.get('slots', []))}")
            return plan
        except Exception as e:
            logger.error(f"Błąd wczytywania planu: {e}")
            return {"version": 2, "timezone": "UTC", "slots": []}
    else:
        logger.info("Plan nie istnieje. Tworzę nowy.")
        return {"version": 2, "timezone": "UTC", "slots": []}

def save_plan(plan):
    logger.info(f"Zapisywanie planu do: {CONTENT_PLAN_PATH}")
    try:
        CONTENT_PLAN_PATH.parent.mkdir(parents=True, exist_ok=True)
        CONTENT_PLAN_PATH.write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")
        logger.info("Plan zapisany pomyślnie")
    except Exception as e:
        logger.error(f"Błąd zapisywania planu: {e}")
        raise

def due_slots(plan):
    """
    Znajduje sloty gotowe do publikacji na podstawie statusu:
    
    - "published" = publikuj NATYCHMIAST bez względu na datę  
    - "scheduled" = publikuj TYLKO gdy nadejdzie zaplanowana data
    - "completed" = już opublikowany, pomijaj
    """
    now = datetime.utcnow().replace(microsecond=0)
    out = []
    for s in plan.get("slots", []):
        status = s.get("status", "scheduled")
        
        if status == "published":
            out.append(s)
            logger.info(f"Slot z statusem 'published' dodany do publikacji: {s.get('topic', 'brak tematu')}")
            
        elif status == "scheduled":
            dt = datetime.fromisoformat(s["date"].replace("Z", ""))
            if dt <= now:
                out.append(s)
                logger.info(f"Slot zaplanowany na {s['date']} jest gotowy do publikacji: {s.get('topic', 'brak tematu')}")
            else:
                logger.info(f"Slot zaplanowany na {s['date']} jeszcze czeka: {s.get('topic', 'brak tematu')}")
                
        elif status == "completed":
            logger.info(f"Slot już opublikowany (completed), pomijam: {s.get('topic', 'brak tematu')}")
            continue
    
    logger.info(f"Znaleziono {len(out)} slotów do publikacji")
    return sorted(out, key=lambda x: x["date"])

# Unikalność slugów w trakcie jednego runu
_SEEN = set()

def ensure_unique_slug(slug):
    base = slug
    i = 2
    while slug in _SEEN:
        slug = f"{base}-{i}"
        i += 1
    _SEEN.add(slug)
    return slug

def backup_and_validate_before_publish(slot):
    """Backup i walidacja przed publikacją"""
    backup_dir = Path("backups") / datetime.now().strftime("%Y-%m-%d")
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    backup_file = backup_dir / f"slot_{datetime.now().strftime('%H%M%S')}.json"
    backup_file.write_text(json.dumps(slot, ensure_ascii=False, indent=2), encoding="utf-8")
    
    logger.info(f"Backup slotu zapisany: {backup_file}")

# ===================== PUBLIKACJA LOKALNA =====================
def put_post_local(slug: str, body_md: str, post_data, lang, published_iso, cover_image):
    """Zapisuje post lokalnie i dodaje do metadata"""
    ensure_directories()
    
    file_path = POSTS_DIR_LOCAL / f"{slug}.md"
    rel_path = POSTS_DIR_REL + "/" + f"{slug}.md"
    
    logger.info(f"Zapisywanie posta lokalnie: {file_path}")
    
    try:
        # Zapisz plik .md
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(body_md)
        
        # Dodaj tagi do schema.json
        if post_data.get('tags'):
            add_tags_to_schema(post_data['tags'])
        
        # Dodaj do metadata.json
        add_to_metadata(slug, post_data, lang, published_iso, cover_image, rel_path)
        
        logger.info(f"Post {slug} zapisany lokalnie pomyślnie")
        
    except Exception as e:
        logger.error(f"Błąd zapisywania posta lokalnie {slug}: {e}")
        raise

def publish_one(slot, articles_created_count):
    """Ulepszona wersja publish_one z lokalnym zapisem"""
    logger.info("=" * 30)
    logger.info(f"ROZPOCZĘCIE PUBLIKACJI SLOTU")
    logger.info(f"Data: {slot['date']}")
    logger.info(f"Temat: {slot.get('topic', 'brak')}")
    logger.info(f"Artykuły utworzone dotychczas: {articles_created_count}")
    logger.info("=" * 30)
    
    articles_created_in_slot = 0
    
    try:
        backup_and_validate_before_publish(slot)
        
        topic = slot["topic"] or propose_topic()
        when_dt = datetime.fromisoformat(slot["date"].replace("Z", ""))
        when_iso = iso_z(when_dt)
        lang_policy = (slot.get("lang_policy") or "translate").lower()
        
        logger.info(f"Tryb językowy: {lang_policy}")
        
        # DEBUG: Pokazuj dokładnie które języki będą przetwarzane
        logger.info(f"ENABLED_LANGUAGES: {ENABLED_LANGUAGES}")
        logger.info(f"PRIMARY_LANG: {PRIMARY_LANG}")

        # Okładka wspólna dla zestawu
        try:
            cover_slug_seed = slugify(topic) or f"post-{when_dt.date()}"
            logger.info(f"Generowanie okładki dla slug: {cover_slug_seed}")
            png = gen_cover_png_bytes(topic)
            cover_path = save_cover_locally(cover_slug_seed, png)
        except Exception as e:
            logger.warning(f"Błąd generowania okładki, używam fallback: {e}")
            cover_path = pick_fallback_cover()

        if lang_policy == "triple-original":
            logger.info("Tryb triple-original: generowanie 3 niezależnych artykułów")
            group_id = str(uuid4())

            # Generuj dla wszystkich włączonych języków
            for lang in ENABLED_LANGUAGES:
                logger.info(f"Generowanie artykułu dla języka: {lang}")
                
                try:
                    data = retry_article_generation(topic, lang=lang)
                    data["slug"] = ensure_unique_slug(data["slug"])
                    lang_md = render_md(data, lang, when_iso, cover_path, group_id)
                    put_post_local(data["slug"], lang_md, data, lang, when_iso, cover_path)
                    articles_created_in_slot += 1
                    logger.info(f"Artykuł dla języka {lang} zapisany lokalnie: {data['slug']}")
                    
                except Exception as e:
                    logger.error(f"Błąd generowania artykułu dla języka {lang}: {e}")
                    logger.warning(f"Pomijam język {lang} i kontynuuję z pozostałymi")
                    continue

            # Ustaw slug główny na język podstawowy
            slot["slug"] = slugify(topic)

        else:
            # Tryb 'translate' - język polski główny
            logger.info("Tryb translate: generowanie PL + tłumaczenia")
            
            # DEBUG: Sprawdź listę języków do tłumaczenia
            languages_to_translate = [lang for lang in ENABLED_LANGUAGES if lang != PRIMARY_LANG]
            logger.info(f"Języki do tłumaczenia: {languages_to_translate}")
            
            # Główny artykuł w języku polskim
            logger.info(f"Generowanie głównego artykułu w języku: {PRIMARY_LANG}")
            data_pl = retry_article_generation(topic, lang=PRIMARY_LANG)
            data_pl["slug"] = ensure_unique_slug(data_pl["slug"])
            pl_md = render_md(data_pl, PRIMARY_LANG, when_iso, cover_path)
            put_post_local(data_pl["slug"], pl_md, data_pl, PRIMARY_LANG, when_iso, cover_path)
            articles_created_in_slot += 1
            logger.info(f"Główny artykuł ({PRIMARY_LANG}) zapisany lokalnie: {data_pl['slug']}")

            # Tłumacz na inne języki
            for lang in languages_to_translate:
                logger.info(f"=== Rozpoczynam tłumaczenie na język: {lang} ===")
                
                topic_translated = translate_topic(topic, lang)
                logger.info(f"Temat przetłumaczony na {lang}: {topic_translated}")
                
                translated_body = translate_md(data_pl["body"], lang)
                logger.info(f"Treść przetłumaczona na {lang}: {len(translated_body)} znaków")

                data_lang = {
                    "title": topic_translated,
                    "description": data_pl["description"],
                    "tags": data_pl.get("tags", TAGS_BASE),
                    "body": translated_body,
                    "slug": ensure_unique_slug(slugify(topic_translated))
                }

                lang_md = render_md(data_lang, lang, when_iso, cover_path)
                put_post_local(data_lang["slug"], lang_md, data_lang, lang, when_iso, cover_path)
                articles_created_in_slot += 1
                
                logger.info(f"=== Tłumaczenie na język {lang} zakończone: {data_lang['slug']} ===")

            slot["slug"] = data_pl["slug"]

        slot["topic"] = topic
        slot["status"] = "completed"
        
        logger.info("=" * 30)
        logger.info("SLOT OPUBLIKOWANY POMYŚLNIE (LOKALNIE)")
        logger.info(f"Temat: {topic}")
        logger.info(f"Slug główny: {slot['slug']}")
        logger.info(f"Artykuły utworzone w tym slocie: {articles_created_in_slot}")
        logger.info("Status zmieniony na: completed")
        logger.info("=" * 30)
        
        return articles_created_in_slot

    except Exception as e:
        logger.error("=" * 30)
        logger.error("BŁĄD PUBLIKACJI SLOTU")
        logger.error(f"Temat: {slot.get('topic', 'brak')}")
        logger.error(f"Błąd: {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        logger.error("=" * 30)
        raise

# ===================== CLI (zmodyfikowane) =====================
def main():
    logger.info("Uruchomienie OmniBlog v3.1 Local")
    
    try:
        ap = argparse.ArgumentParser("OmniBlog v3.1 Local — lokalne generowanie artykułów z git push")
        sub = ap.add_subparsers(dest="cmd", required=True)

        sp2 = sub.add_parser("add-slot", help="dodaj pojedynczy slot")
        sp2.add_argument("--date", required=True)
        sp2.add_argument("--topic", default=None, help="własny temat (opcjonalnie)")
        sp2.add_argument("--lang-policy", default=None, choices=["translate", "triple-original"])
        sp2.add_argument("--status", default="scheduled", choices=["scheduled", "published"],
                        help="scheduled = publikuj w zaplanowanej dacie, published = publikuj natychmiast")
        sp2.add_argument("--force-method", default=None, choices=["predefined", "gpt_generated"],
                        help="wymuś metodę generowania tematu")

        sp3 = sub.add_parser("run-due", help="publikuje wszystkie sloty lokalnie i wykonuje git push")
        sp3.add_argument("--auto", action="store_true", 
                        help="automatyczne wykonanie bez pytania o potwierdzenie")
        sp3.add_argument("--continue", dest="continue_from_checkpoint", action="store_true",
                        help="kontynuuj od ostatniego checkpointu")
        sp3.add_argument("--no-push", action="store_true",
                        help="nie wykonuj git push (tylko lokalne pliki)")
        
        sp4 = sub.add_parser("propose-topic", help="proponuje losowy temat")
        sp4.add_argument("--method", default=None, choices=["predefined", "gpt_generated"],
                        help="wybierz metodę generowania")
        sp4.add_argument("--count", type=int, default=1, help="liczba tematów do wygenerowania")
        
        sp5 = sub.add_parser("test-image", help="testuje generowanie obrazka")
        sp5.add_argument("--topic", required=True, help="temat do wygenerowania obrazka")

        sp6 = sub.add_parser("update-config", help="aktualizuje config.json z nowymi ustawieniami")
        
        sp7 = sub.add_parser("test-article", help="testuje generowanie artykułu bez publikacji")
        sp7.add_argument("--topic", default=None, help="temat do testu (opcjonalnie)")
        sp7.add_argument("--lang", default=None, choices=ENABLED_LANGUAGES, help="język artykułu")
        sp7.add_argument("--method", default=None, choices=["predefined", "gpt_generated"])

        sp8 = sub.add_parser("validate-articles", help="testuje i waliduje generowanie artykułów")
        sp8.add_argument("--count", type=int, default=3, help="liczba testów do wykonania")
        
        sp9 = sub.add_parser("show-config", help="wyświetla aktualne ustawienia generacji tematów")
        
        sp10 = sub.add_parser("check-published", help="sprawdza które sloty zostały opublikowane")
        
        sp11 = sub.add_parser("check-files", help="sprawdza stan plików lokalnych")

        args = ap.parse_args()
        logger.info(f"Wykonywanie komendy: {args.cmd}")

        plan = load_plan()

        if args.cmd == "add-slot":
            if args.topic:
                topic = args.topic
                logger.info(f"Używam własnego tematu: {topic}")
            else:
                if args.force_method:
                    if args.force_method == "gpt_generated":
                        keywords = config["content"]["topic_generation"]["gpt_keywords"]
                        topic = generate_topic_from_keywords(keywords)
                    else:
                        topic = propose_topic_predefined()
                else:
                    topic = propose_topic()
            
            slot = {
                "date": args.date,
                "topic": topic,
                "status": args.status,
                "lang_policy": args.lang_policy or "translate",
                "slug": None
            }
            plan["slots"].append(slot)
            save_plan(plan)
            logger.info(f"Dodano slot: {slot}")
            print("Dodano slot:", slot)
            
            if args.status == "published":
                print("💡 Slot ma status 'published' - zostanie opublikowany przy następnym 'run-due'!")
            else:
                print(f"⏰ Slot ma status 'scheduled' - zostanie opublikowany {args.date} lub później")

        elif args.cmd == "propose-topic":
            print(f"Generowanie {args.count} tematów...")
            for i in range(args.count):
                if args.method:
                    if args.method == "gpt_generated":
                        keywords = config["content"]["topic_generation"]["gpt_keywords"]
                        topic = generate_topic_from_keywords(keywords)
                    else:
                        topic = propose_topic_predefined()
                else:
                    topic = propose_topic()
                
                print(f"{i+1}. {topic}")

        elif args.cmd == "test-article":
            test_topic = args.topic if args.topic else propose_topic()
            test_lang = args.lang if args.lang else PRIMARY_LANG
            
            if args.method:
                if args.method == "gpt_generated":
                    keywords = config["content"]["topic_generation"]["gpt_keywords"]
                    test_topic = generate_topic_from_keywords(keywords)
                elif args.method == "predefined":
                    test_topic = propose_topic_predefined()
            
            try:
                logger.info(f"=== TEST GENEROWANIA ARTYKUŁU: {test_topic} ({test_lang}) ===")
                
                data = retry_article_generation(test_topic, lang=test_lang)
                
                logger.info("=== WYNIKI TESTU ===")
                logger.info(f"Title: {data['title']}")
                logger.info(f"Description: {data['description']}")
                logger.info(f"Tags: {data['tags']}")
                logger.info(f"Body length: {len(data['body'])} chars")
                logger.info(f"Body preview: {data['body'][:200]}...")
                
                # Test renderowania
                test_md = render_md(data, test_lang, "2025-09-01T10:00:00Z", "/images/test.png")
                
                # Zapisz do pliku testowego
                test_file = Path(f"test_article_{test_lang}.md")
                test_file.write_text(test_md, encoding="utf-8")
                
                logger.info(f"Plik testowy zapisany jako: {test_file}")
                logger.info("=== KONIEC TESTU ===")
                
                print(f"Test zakończony! Sprawdź plik: {test_file}")
                
            except Exception as e:
                logger.error(f"Błąd testu: {e}")
                logger.error(f"Traceback: {traceback.format_exc()}")

        elif args.cmd == "show-config":
            print("=== AKTUALNE USTAWIENIA ===")
            
            print(f"Język główny: {PRIMARY_LANG}")
            print(f"Włączone języki: {', '.join(ENABLED_LANGUAGES)}")
            
            print(f"\nModel OpenAI: {config['openai']['model']}")
            print(f"Temperatury: Artykuły={config['openai']['temperature']['article_generation']}, "
                  f"Tematy={config['openai']['temperature']['topic_generation']}, "
                  f"Tłumaczenia={config['openai']['temperature']['translation']}")
            
            method_weights = config["content"]["topic_generation"]["method_weights"]
            print(f"\nMetody generacji tematów:")
            for method, weight in method_weights.items():
                print(f"  {method}: {weight*100:.0f}%")
            
            category_weights = config["content"]["topic_buckets"]["weights"]
            print(f"\nWagi kategorii (dla metody predefined):")
            for category, weight in category_weights.items():
                topic_count = len(config["content"]["topic_buckets"]["topics"][category])
                suffix_count = len(config["content"]["topic_buckets"]["suffixes"][category])
                print(f"  {category}: {weight*100:.0f}% ({topic_count} tematów, {suffix_count} sufiksów)")

        elif args.cmd == "check-published":
            published_actual = 0
            scheduled_past = 0
            
            now = datetime.utcnow().replace(microsecond=0)
            
            print("=== SPRAWDZANIE STATUSU SLOTÓW ===")
            
            for slot in plan.get("slots", []):
                date = slot["date"]
                status = slot.get("status", "scheduled")
                slug = slot.get("slug")
                
                slot_date = datetime.fromisoformat(date.replace("Z", ""))
                is_past = slot_date <= now
                
                if status == "completed":
                    published_actual += 1
                    print(f"✅ {date[:10]} - COMPLETED ({slug or 'brak slug'})")
                elif is_past and status == "scheduled":
                    scheduled_past += 1
                    print(f"⚠️ {date[:10]} - SCHEDULED ale data minęła")
                else:
                    print(f"⏳ {date[:10]} - SCHEDULED (przyszłość)")
            
            print(f"\n=== PODSUMOWANIE ===")
            print(f"Sloty oznaczone jako COMPLETED: {published_actual}")
            print(f"Sloty SCHEDULED z przeszłą datą: {scheduled_past}")
            print(f"Razem slotów: {len(plan.get('slots', []))}")
            
            if scheduled_past > 0:
                print(f"\n⚠️ {scheduled_past} slotów może być już opublikowanych ale nie oznaczonych!")

        elif args.cmd == "check-files":
            print("=== SPRAWDZANIE PLIKÓW LOKALNYCH ===")
            
            # Sprawdź katalogi
            directories = [POSTS_DIR_LOCAL, COVERS_DIR_LOCAL, METADATA_JSON_PATH.parent]
            for dir_path in directories:
                exists = "✅ ISTNIEJE" if dir_path.exists() else "❌ BRAK"
                print(f"Katalog {dir_path}: {exists}")
            
            # Sprawdź pliki konfiguracyjne
            config_files = [METADATA_JSON_PATH, SCHEMA_JSON_PATH, CONTENT_PLAN_PATH]
            for file_path in config_files:
                if file_path.exists():
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                        count = len(data) if isinstance(data, dict) else len(data.get('slots', []))
                        print(f"📄 {file_path.name}: ✅ ({count} wpisów)")
                    except:
                        print(f"📄 {file_path.name}: ⚠️ BŁĄD ODCZYTU")
                else:
                    print(f"📄 {file_path.name}: ❌ BRAK")
            
            # Sprawdź artykuły
            if POSTS_DIR_LOCAL.exists():
                md_files = list(POSTS_DIR_LOCAL.glob("*.md"))
                print(f"\n📰 Artykuły (.md): {len(md_files)} plików")
                if md_files:
                    print("   Przykłady:")
                    for f in md_files[:5]:
                        size_kb = f.stat().st_size // 1024
                        print(f"   - {f.name} ({size_kb} KB)")
            
            # Sprawdź okładki
            if COVERS_DIR_LOCAL.exists():
                png_files = list(COVERS_DIR_LOCAL.glob("*.png"))
                print(f"\n🖼️ Okładki (.png): {len(png_files)} plików")
                if png_files:
                    print("   Przykłady:")
                    for f in png_files[:5]:
                        size_kb = f.stat().st_size // 1024
                        print(f"   - {f.name} ({size_kb} KB)")

        elif args.cmd == "run-due":
            due = due_slots(plan)
            if not due:
                logger.info("Brak slotów do publikacji")
                print("Brak slotów do publikacji.")
                return

            # Sprawdź checkpoint
            checkpoint = None
            start_index = 0
            published_slots = []
            failed_slots = []
            total_articles_created = 0
            
            if args.continue_from_checkpoint:
                checkpoint = load_checkpoint()
                if checkpoint:
                    start_index = checkpoint["current_slot_index"]
                    published_slots = checkpoint.get("published_slots", [])
                    failed_slots = checkpoint.get("failed_slots", [])
                    total_articles_created = checkpoint.get("articles_created", 0)
                    print(f"📄 Kontynuowanie od slotu {start_index + 1}/{len(due)}")
                    print(f"Dotychczas opublikowanych: {len(published_slots)}, nieudanych: {len(failed_slots)}")
                    print(f"Artykuły utworzone dotychczas: {total_articles_created}")
                else:
                    print("Brak checkpointu do kontynuowania.")

            # Pokazuj sloty do publikacji
            if start_index == 0:
                print(f"Znaleziono {len(due)} slotów do publikacji:")
                for i, slot in enumerate(due, 1):
                    date = slot["date"][:10]
                    topic = slot.get("topic") or "temat zostanie wygenerowany"
                    print(f"  {i}. {date} - {topic}")
            else:
                remaining = len(due) - start_index
                print(f"Pozostało {remaining} slotów do publikacji (kontynuacja):")
                for i, slot in enumerate(due[start_index:], start_index + 1):
                    date = slot["date"][:10]
                    topic = slot.get("topic") or "temat zostanie wygenerowany"
                    print(f"  {i}. {date} - {topic}")
            
            # Auto mode lub pytanie
            if not args.auto:
                remaining_count = len(due) - start_index
                push_info = "(bez git push)" if args.no_push else "(z git push na końcu)"
                response = input(f"\nCzy chcesz opublikować {remaining_count} slotów lokalnie {push_info}? (y/N): ")
                if response.lower() not in ['y', 'yes', 'tak']:
                    print("Anulowano.")
                    return
            else:
                remaining_count = len(due) - start_index
                push_info = "(bez git push)" if args.no_push else "(z git push na końcu)"
                print(f"Tryb automatyczny: publikuję {remaining_count} slotów lokalnie {push_info}...")

            logger.info(f"Rozpoczynanie lokalnej publikacji {len(due) - start_index} slotów (od indeksu {start_index})")
            published_count = len(published_slots)
            
            for i, slot in enumerate(due[start_index:], start_index):
                try:
                    print(f"\n[{i+1}/{len(due)}] Publikuję lokalnie slot {slot['date'][:10]}...")
                    
                    # Zapisz checkpoint przed publikacją
                    save_checkpoint(i, len(due), published_slots, failed_slots, total_articles_created)
                    
                    articles_in_slot = publish_one(slot, total_articles_created)
                    total_articles_created += articles_in_slot
                    published_count += 1
                    
                    published_slots.append({
                        "date": slot.get("date"),
                        "topic": slot.get("topic"),
                        "slug": slot.get("slug"),
                        "articles_created": articles_in_slot
                    })
                    
                    # Zapisz plan natychmiast po udanym slocie
                    save_plan(plan)
                    logger.info(f"Plan zapisany po slocie {slot.get('date', 'unknown')}")
                    
                    print(f"✅ Slot {i+1} opublikowany lokalnie ({articles_in_slot} artykułów)")
                    
                except KeyboardInterrupt:
                    print(f"\n⚠️ Przerwano przez użytkownika po {published_count} opublikowanych slotach")
                    save_plan(plan)
                    save_checkpoint(i, len(due), published_slots, failed_slots, total_articles_created)
                    logger.warning(f"Publikacja przerwana przez użytkownika. Opublikowano: {published_count}, Artykuły: {total_articles_created}")
                    print("💡 Użyj --continue aby kontynuować od tego miejsca")
                    break
                    
                except Exception as e:
                    logger.error(f"Błąd publikacji slotu {slot.get('date', 'unknown')}: {e}")
                    failed_slots.append({
                        "date": slot.get("date"),
                        "topic": slot.get("topic"),
                        "error": str(e)
                    })
                    print(f"❌ Slot {i+1} nieudany: {str(e)[:100]}...")
                    continue
            
            # Podsumowanie lokalnej publikacji
            print(f"\n=== PODSUMOWANIE LOKALNEJ PUBLIKACJI ===")
            print(f"✅ Opublikowane sloty: {published_count}/{len(due)}")
            print(f"📄 Utworzone artykuły: {total_articles_created}")
            
            if failed_slots:
                print(f"❌ Nieudane sloty: {len(failed_slots)}")
                for failed in failed_slots:
                    print(f"   - {failed['date'][:10]}: {failed['error'][:50]}...")
            
            # Git operations - wykonaj tylko jeśli auto_push włączony
            if should_push and total_articles_created > 0:
                print(f"\n=== OPERACJE GIT ===")
                print(f"auto_push: true - wykonuję automatyczne git operations")
                print(f"Wykonuję git add, commit i push dla {total_articles_created} artykułów...")
                
                git_success = execute_git_operations(total_articles_created)
                
                if git_success:
                    print("✅ Git operations zakończone pomyślnie!")
                    print("🎉 Artykuły zostały opublikowane w repozytorium!")
                else:
                    print("❌ Błąd podczas operacji git - sprawdź log.txt")
                    print("💡 Pliki zostały utworzone lokalnie, ale nie zostały wysłane do repozytorium")
            elif not should_push and total_articles_created > 0:
                if args.no_push:
                    print("\n⚠️ Git operations pominięte - użyto flagi --no-push")
                else:
                    print("\n⚠️ Git operations pominięte - auto_push: false w config.json")
                print("📁 Artykuły zostały zapisane tylko lokalnie:")
                print(f"   - {total_articles_created} plików .md w {POSTS_DIR_LOCAL}")
                print(f"   - Okładki w {COVERS_DIR_LOCAL}")
                print(f"   - Zaktualizowane metadata.json i schema.json")
                print("")
                print("💡 Aby opublikować ręcznie, wykonaj:")
                print("   git add .")
                print(f'   git commit -m "Dodanie artykułów {total_articles_created}"')
                print("   git push")
            else:
                print("\n⚠️ Brak artykułów do przetworzenia")
            
            # Wyczyść checkpoint jeśli wszystko ukończone
            if published_count + len(failed_slots) == len(due):
                clear_checkpoint()
                print("\n🎉 Wszystkie sloty przetworzone - checkpoint wyczyszczony")
            
            logger.info(f"Ukończono publikację lokalną. Opublikowano: {published_count}/{len(due)}, nieudane: {len(failed_slots)}, artykuły: {total_articles_created}")
            print(f"\n📄 Sprawdź szczegóły w log.txt")

        elif args.cmd == "test-image":
            try:
                logger.info(f"Test generowania obrazka dla: {args.topic}")
                png_bytes = gen_cover_png_bytes(args.topic)
                
                test_path = Path(f"test_image_{slugify(args.topic)}.png")
                test_path.write_bytes(png_bytes)
                
                print(f"Obrazek wygenerowany i zapisany jako: {test_path}")
                logger.info(f"Test obrazka zakończony pomyślnie: {test_path}")
            except Exception as e:
                logger.error(f"Błąd testu obrazka: {e}")
                raise

        elif args.cmd == "validate-articles":
            print(f"Uruchamiam {args.count} testów walidacji artykułów...")
            success_count = 0
            
            for i in range(args.count):
                topic = propose_topic()
                try:
                    print(f"Test {i+1}: Generuję '{topic[:50]}...'")
                    data = retry_article_generation(topic, PRIMARY_LANG)
                    is_valid, issues = validate_article_quality(data, PRIMARY_LANG)
                    
                    if is_valid:
                        print(f"Test {i+1}: ✅ OK - {data['title'][:50]}...")
                        success_count += 1
                    else:
                        print(f"Test {i+1}: ⚠️ PROBLEMY - {', '.join(issues[:2])}...")
                        success_count += 1
                        
                except Exception as e:
                    print(f"Test {i+1}: ❌ BŁĄD - {str(e)[:50]}...")
                    
                if i < args.count - 1:
                    time.sleep(1)
            
            print(f"\nWyniki: {success_count}/{args.count} testów zakończonych sukcesem")

        elif args.cmd == "update-config":
            try:
                if Path("config.json").exists():
                    Path("config.json").rename("config_backup.json")
                    print("Stary config.json został zapisany jako config_backup.json")
                
                create_default_config(Path("config.json"))
                print("Config.json został zaktualizowany!")
                print("Nowe funkcje:")
                print("✅ Pełna konfiguracja OpenAI (model, temperatury, tokeny)")
                print("✅ Konfigurowalne języki i język główny")
                print("✅ Wszystkie ustawienia w JSON")
            except Exception as e:
                logger.error(f"Błąd aktualizacji config: {e}")
                raise

    except Exception as e:
        logger.error(f"Błąd głównej funkcji: {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise
    finally:
        logger.info("Zakończenie sesji OmniBlog v3.1 Local")

if __name__ == "__main__":
    main()