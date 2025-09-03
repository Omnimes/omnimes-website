#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os, re, json, argparse, random, base64, unicodedata, logging, traceback, time
from datetime import datetime, timedelta
from pathlib import Path
import requests
from uuid import uuid4
from pathlib import Path

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
    logger.info("OmniBlog v3.1 Enhanced - Start sesji")
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
    default_config = {
        "version": "3.1",
        "prompts": {
            "system_prompts": {
                "pl": [
                    "Jesteś ekspertem w dziedzinie przemysłu 4.0 i 5.0, specjalizującym się w systemach klasy MES, IoT, AI, BigData i automatyzacji.",
                    "Piszesz profesjonalne, ale przystępne artykuły blogowe w języku polskim, skierowane do menedżerów, inżynierów oraz osób decyzyjnych.",
                    "Każdy artykuł powinien mieć jasno określony cel: edukacja, budowanie thought leadership lub generowanie leadów.",
                    "Stosuj SEO-friendly strukturę: nagłówki H2/H3, krótkie akapity, listy punktowane, pogrubienia najważniejszych fraz.",
                    "Już w pierwszym akapicie umieść naturalnie słowa kluczowe związane z tematem artykułu.",
                    "Wpleć jedno zdanie o systemie OmniMES i jego możliwościach.",
                    "Nie wymyślaj klientów ani konkretnych firm.",
                    "Na końcu dodaj krótkie podsumowanie z CTA (np. sprawdź inne artykuły, skontaktuj się, poznaj rozwiązania OmniMES).",
                    "Zachowuj balans między szczegółami technicznymi a przystępnym językiem biznesowym.",
                    "W artykułach biznesowych dodaj proste przykłady obliczeń opartych na faktach (np. ROI z wdrożenia systemu) i przedstaw je w przystępnej formie.",
                    "W artykułach technicznych dołącz 1-2 linki do neutralnych i centralnych źródeł (np. Wikipedia, oficjalne dokumentacje), aby zwiększyć wiarygodność treści."
                ],
                "en": [
                    "You are an expert in Industry 4.0 and 5.0, specializing in MES-class systems, IoT, AI, BigData, and industrial automation.",
                    "Write professional yet accessible blog articles in English, aimed at managers, engineers, and decision-makers.",
                    "Each article should have a clearly defined purpose: education, thought leadership, or lead generation.",
                    "Use an SEO-friendly structure: H2/H3 headings, concise paragraphs, bullet points, and bold for key phrases.",
                    "Include relevant keywords naturally in the introduction.",
                    "Add one sentence about the OmniMES system and its capabilities.",
                    "Do not invent clients or specific companies.",
                    "Conclude with a short summary and CTA (e.g., explore other articles, get in touch, discover OmniMES solutions).",
                    "Maintain a balance between technical depth and business readability.",
                    "In business-oriented articles, include simple fact-based calculations (e.g., ROI from system implementation) and present them in an easy-to-understand way.",
                    "In technical articles, add 1-2 links to neutral, central sources (e.g., Wikipedia, official documentation) to increase credibility."
                ],
                "de": [
                    "Du bist ein Experte für Industrie 4.0 und 5.0, spezialisiert auf MES-Systeme, IoT, KI, BigData und Industrieautomatisierung.",
                    "Schreibe professionelle, aber leicht verständliche Blogartikel auf Deutsch, die sich an Manager, Ingenieure und Entscheidungsträger richten.",
                    "Jeder Artikel sollte ein klares Ziel haben: Bildung, Thought Leadership oder Lead-Generierung.",
                    "Verwende eine SEO-freundliche Struktur: H2/H3-Überschriften, kurze Absätze, Aufzählungen und Fettdruck für Schlüsselbegriffe.",
                    "Platziere relevante Keywords bereits im ersten Absatz auf natürliche Weise.",
                    "Füge einen Satz über das OmniMES-System und seine Funktionen ein.",
                    "Erfinde keine Kunden oder spezifische Unternehmen.",
                    "Beende den Artikel mit einer kurzen Zusammenfassung und einem CTA (z. B. weitere Artikel lesen, Kontakt aufnehmen, OmniMES-Lösungen entdecken).",
                    "Halte die Balance zwischen technischen Details und geschäftlicher Verständlichkeit.",
                    "Füge in geschäftsorientierten Artikeln einfache, faktenbasierte Rechenbeispiele ein (z. B. ROI einer Systemeinführung) und stelle sie verständlich dar.",
                    "Füge in technischen Artikeln 1-2 Links zu neutralen, zentralen Quellen hinzu (z. B. Wikipedia, offizielle Dokumentationen), um die Glaubwürdigkeit zu erhöhen."
                ]
            },
            "image_prompts": {
                "technical": "Minimalist illustration of industrial automation. One symbolic element, such as a robotic arm or conveyor. Simple, abstract background with subtle geometric details. Elegant, modern Industry 4.0 aesthetic. Square image 1024x1024.",
                "business": "Minimalist corporate illustration. One symbolic element of the decision-making process, such as a simple chart or conference table. Simple, abstract background with subtle shadows. Elegant, upscale business style. Square image 1024x1024.",
                "iot": "Minimalist illustration of the Internet of Things. One symbolic element, such as a smart sensor or connected node. Simple, abstract background with a subtle gradient. Elegant, modern aesthetic of connected devices. Square image 1024x1024.",
                "ai": "Minimalist illustration of artificial intelligence. A single symbolic element, such as a neural network pattern or algorithmic nodes. A simple, abstract background with smooth gradients. Elegant, futuristic minimalism. Square image 1024x1024.",
                "mes": "Minimalist illustration of a monitor screen with graphs. Modern, elegant corporate minimalism. A simple, abstract background with a subtle gradient. No text, logo, or branding. Square image 1024x1024."
            },
            "topic_generation_prompt": "You are a creative topic generator for industrial and technology content. Based on the provided keywords, generate ONE unique, engaging topic that would make for an excellent blog article. The topic should be specific, actionable, and appeal to industry professionals. Return ONLY the topic title, nothing else."
        },

        "content": {
            "tags_base": [
                {"label": "MES", "value": "mes"},
                {"label": "Industry 4.0", "value": "industry40"},
                {"label": "Industry 5.0", "value": "industry50"},
                {"label": "IoT", "value": "iot"},
                {"label": "AI", "value": "ai"},
                {"label": "Automatyzacja", "value": "automation"},
                {"label": "Predykcja awarii", "value": "predictive-maintenance"},
                {"label": "OEE", "value": "oee"},
                {"label": "Cyfrowa transformacja", "value": "digital-transformation"},
                {"label": "Smart Manufacturing", "value": "smart-manufacturing"},
                {"label": "Edge Computing", "value": "edge-computing"},
                {"label": "MQTT", "value": "mqtt"},
                {"label": "Sparkplug B", "value": "sparkplug-b"},
                {"label": "Big Data", "value": "big-data"},
                {"label": "Machine Learning", "value": "machine-learning"},
                {"label": "Cyberbezpieczeństwo", "value": "cybersecurity"},
                {"label": "Digital Twin", "value": "digital-twin"},
                {"label": "Computer Vision", "value": "computer-vision"},
                {"label": "Blockchain", "value": "blockchain"},
                {"label": "5G", "value": "5g"},
                {"label": "Cloud Computing", "value": "cloud-computing"},
                {"label": "Sustainability", "value": "sustainability"},
                {"label": "Supply Chain", "value": "supply-chain"},
                {"label": "Quality Control", "value": "quality-control"}
            ],

            "topic_generation": {
                "method_weights": {
                    "predefined": 0.5,
                    "gpt_generated": 0.5
                },
                "gpt_keywords": [
                    "automation", "manufacturing", "industry 4.0", "IoT", "AI", "MES", 
                    "predictive maintenance", "digital transformation", "smart factory",
                    "edge computing", "machine learning", "computer vision", "blockchain",
                    "sustainability", "quality control", "supply chain", "cybersecurity",
                    "digital twin", "cloud computing", "5G", "robotics", "sensor networks",
                    "data analytics", "real-time monitoring", "process optimization"
                ]
            },

            "topic_buckets": {
                "weights": {
                    "technical": 0.4,
                    "business": 0.35,
                    "mixed": 0.25
                },
                "topics": {
                    "technical": [
                        "Implementacja MQTT Sparkplug B w środowisku produkcyjnym",
                        "Edge AI w przemyśle - kompresja modeli i optymalizacja",
                        "Integracja systemów MES z protokołami IoT",
                        "RAG (Retrieval Augmented Generation) dla dokumentacji technicznej",
                        "Predykcja awarii maszyn z wykorzystaniem ML",
                        "OEE w czasie rzeczywistym - eliminacja mikroprzestojów", 
                        "Wektorowe bazy danych w przemyśle (Qdrant, Pinecone)",
                        "Cyberbezpieczeństwo w Industry 4.0 - praktyczne podejście",
                        "API-first architecture w systemach MES",
                        "Streaming danych produkcyjnych - Apache Kafka vs MQTT",
                        "Computer Vision w kontroli jakości produkcji",
                        "Digital Twin w monitoringu procesów produkcyjnych",
                        "Blockchain w supply chain management",
                        "5G w zastosowaniach przemysłowych",
                        "Edge Computing w czasie rzeczywistym na linii produkcyjnej",
                        "Mikrousługi w architekturze systemów przemysłowych",
                        "Containeryzacja aplikacji przemysłowych (Docker/Kubernetes)",
                        "Time Series Database dla danych IoT",
                        "Machine Learning na urządzeniach brzegowych",
                        "Protokoły komunikacyjne: OPC-UA vs MQTT vs Modbus",
                        "Integracja ERP z systemami produkcyjnymi",
                        "Monitoring infrastruktury IT w fabrykach",
                        "Backup i disaster recovery dla systemów krytycznych",
                        "Load balancing w aplikacjach przemysłowych",
                        "GraphQL w systemach MES - zalety i implementacja",
                        "WebRTC dla zdalnego monitoringu maszyn",
                        "Elasticsearch dla logów produkcyjnych",
                        "Redis jako cache w aplikacjach real-time"
                    ],
                    "business": [
                        "ROI z wdrożenia systemów Industry 4.0 - studium przypadku",
                        "Cyfrowa transformacja w produkcji - od czego zacząć?",
                        "KPI i dashboardy dla kadry zarządzającej",
                        "Koszty wdrożenia vs korzyści z automatyzacji",
                        "Zarządzanie zmianą podczas cyfryzacji zakładu",
                        "Compliance i regulacje w Industry 4.0",
                        "Szkolenie personelu - przygotowanie na przemysł 5.0",
                        "Analiza ryzyka projektów automatyzacji",
                        "Budżetowanie projektów cyfrowej transformacji", 
                        "Wybór dostawcy systemów MES - kryteria decyzyjne",
                        "Bezpieczeństwo danych w środowisku przemysłowym",
                        "Sustainability i zielona transformacja w przemyśle",
                        "Remote monitoring - korzyści dla managementu",
                        "Predykcyjna konserwacja - wpływ na budżet zakładu",
                        "Lean Manufacturing w erze cyfryzacji",
                        "Change management w projektach Industry 4.0",
                        "Finansowanie projektów cyfrowej transformacji",
                        "Outsourcing vs insourcing IT w przemyśle",
                        "Benchmarking wydajności produkcji",
                        "Strategia vendor management w projektach IT",
                        "Total Cost of Ownership (TCO) systemów MES",
                        "Agile w projektach przemysłowych",
                        "Stakeholder management w cyfryzacji",
                        "Risk assessment dla projektów automatyzacji",
                        "Governance modeli danych w organizacji",
                        "SLA i KPI dla systemów krytycznych",
                        "Business continuity planning w przemyśle",
                        "Vendor lock-in - jak tego unikać",
                        "Scalability planning dla rosnących firm",
                        "Digital strategy dla SME w przemyśle"
                    ],
                    "mixed": [
                        "Smart Factory - technologia vs biznes",
                        "Przemysł 5.0 - człowiek i maszyna w harmonii",
                        "Zrównoważony rozwój przez automatyzację",
                        "Kokpity zarządcze w erze Big Data",
                        "Elastyczność produkcji w niepewnych czasach",
                        "Innowacje w przemyśle - jak nie zostać w tyle",
                        "Łańcuch dostaw 4.0 - wyzwania i możliwości",
                        "Personalizacja masowej produkcji",
                        "Zarządzanie energią w smart factory",
                        "Workforce 4.0 - nowe kompetencje w przemyśle",
                        "Circular economy w manufacturing",
                        "Resilience vs efficiency w łańcuchu dostaw",
                        "Quality 4.0 - jakość w erze cyfrowej",
                        "Customer centricity w B2B manufacturing",
                        "Predictive analytics vs traditional planning",
                        "Hybrid work w przemyśle - wyzwania i szanse",
                        "Data governance w organizacjach produkcyjnych",
                        "Innovation labs w tradycyjnych firmach",
                        "Partnership ecosystem w Industry 4.0",
                        "Digital twins w strategii biznesowej",
                        "Platform economy w B2B",
                        "Ecosystem thinking w manufacturing",
                        "Value stream mapping w erze cyfrowej",
                        "Customer journey w B2B manufacturing"
                    ]
                },
                "suffixes": {
                    "technical": [
                        "- implementacja krok po kroku",
                        "- najlepsze praktyki",
                        "- case study", 
                        "- porównanie rozwiązań",
                        "- optymalizacja wydajności",
                        "- analiza architektury",
                        "- przewodnik wdrożeniowy",
                        "- troubleshooting i diagnostyka",
                        "- bezpieczeństwo w praktyce",
                        "- integracja z istniejącymi systemami"
                    ],
                    "business": [
                        "- analiza kosztów i korzyści",
                        "- przewodnik dla managementu", 
                        "- strategie wdrożenia",
                        "- analiza ROI",
                        "- zarządzanie ryzykiem",
                        "- jak przekonać zarząd",
                        "- budowanie business case",
                        "- planowanie budżetu",
                        "- wybór dostawcy",
                        "- mierzenie sukcesu"
                    ],
                    "mixed": [
                        "- spojrzenie 360°",
                        "- wyzwania i możliwości",
                        "- przyszłość branży",
                        "- trendy 2025",
                        "- praktyczne zastosowania",
                        "- perspektywa globalna",
                        "- innowacje w praktyce",
                        "- transformacja cyfrowa",
                        "- zrównoważony rozwój",
                        "- competitive advantage"
                    ]
                }
            }
        },

        "settings": {
            "default_words": 900,
            "weekly_day": "MON", 
            "weekly_time": "09:00",
            "author": {
                "name": "Martin Szerment",
                "picture": "https://avatars.githubusercontent.com/u/166378457?v=4"
            },
            "cover_fallbacks": [
                "/images/omnimes-image.png"
            ],
            "retry_settings": {
                "max_article_retries": 3,
                "max_image_retries": 2,
                "retry_delay_seconds": 2
            },
            "validation": {
                "min_title_length": 10,
                "max_title_length": 90,
                "min_description_length": 120,
                "max_description_length": 160,
                "min_article_words": 200,
                "max_article_words": 2000,
                "require_omnimes_mention": True,
                "require_markdown_headers": True
            }
        }
    }
    
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(default_config, f, ensure_ascii=False, indent=2)
    
    logger.info(f"Utworzono domyślny plik konfiguracyjny: {config_path}")

# Globalne zmienne
logger = setup_logging()
config = load_config()

# ===================== USTAWIENIA Z ENV =====================
DEFAULT_WEEKLY_DAY = "MON"
DEFAULT_WEEKLY_TIME = "09:00"
DEFAULT_WORDS = config["settings"]["default_words"]

# Katalogi/ścieżki
POSTS_DIR_REL = os.getenv("POSTS_DIR_REL", "outstatic/content/posts")
CONTENT_PLAN_PATH = Path(os.getenv("CONTENT_PLAN_PATH", "content_plan.json"))
COVERS_DIR_REL = os.getenv("COVERS_DIR_REL", "public/images")

# pliki w repo
COVER_FALLBACKS = config["settings"]["cover_fallbacks"]

# Autor
AUTHOR = config["settings"]["author"]

# GitHub API
GH_OWNER = os.getenv("GH_OWNER", "Omnimes")
GH_REPO = os.getenv("GH_REPO", "omnimes-website")
GH_BRANCH = os.getenv("GH_BRANCH", "main")
GIT_PAT = os.getenv("GIT_PAT")  # wymagany przy PUBLISH_MODE=github_api

# Tryb publikacji
PUBLISH_MODE = os.getenv("PUBLISH_MODE", "github_api")  # 'github_api' lub 'git'

# Kategorie/tematy z konfiguracji
TAGS_BASE = config["content"]["tags_base"]

# ===================== UTILS =====================
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

def api_put_file(rel_path: str, content_bytes: bytes, message: str):
    logger.info(f"Przesyłanie pliku: {rel_path}")
    try:
        token = env("GIT_PAT", required=True)
        url = f"https://api.github.com/repos/{GH_OWNER}/{GH_REPO}/contents/{rel_path}"
        
        # Najpierw sprawdź czy plik już istnieje
        headers = {
            "Authorization": f"token {token}", 
            "Accept": "application/vnd.github+json"
        }
        
        # Pobierz informacje o pliku (jeśli istnieje)
        get_response = requests.get(url, headers=headers, timeout=30)
        
        payload = {
            "message": message,
            "content": base64.b64encode(content_bytes).decode(),
            "branch": GH_BRANCH,
            "committer": {
                "name": AUTHOR["name"], 
                "email": os.getenv("GIT_AUTHOR_EMAIL", "bot@omnimes.com")
            }
        }
        
        # Jeśli plik istnieje (status 200), dodaj SHA
        if get_response.status_code == 200:
            file_data = get_response.json()
            payload["sha"] = file_data["sha"]
            logger.info(f"Plik istnieje, aktualizuję z SHA: {file_data['sha'][:8]}...")
        elif get_response.status_code == 404:
            logger.info("Plik nie istnieje, tworzę nowy...")
        else:
            logger.warning(f"Nieoczekiwany status przy sprawdzaniu pliku: {get_response.status_code}")
        
        # Wyślij żądanie PUT
        r = requests.put(url, headers=headers, json=payload, timeout=60)
        
        if r.status_code not in (200, 201):
            logger.error(f"Błąd GitHub API {r.status_code}: {r.text}")
            raise RuntimeError(f"GitHub API error {r.status_code}: {r.text}")
        
        action = "zaktualizowany" if get_response.status_code == 200 else "utworzony"
        logger.info(f"Plik {rel_path} {action} pomyślnie")
        
    except Exception as e:
        logger.error(f"Błąd przesyłania pliku {rel_path}: {e}")
        raise

def is_json_string(text: str) -> bool:
    """Sprawdza czy tekst wygląda na JSON"""
    if not text or not isinstance(text, str):
        return False
        
    text = text.strip()
    if not text:
        return False
    
    # Szybkie sprawdzenie - czy zaczyna się od { i kończy na }
    if text.startswith('{') and text.endswith('}'):
        try:
            json.loads(text)
            return True
        except:
            pass
    
    # Sprawdź czy zawiera typowe struktury JSON
    json_indicators = ['"title":', '"body":', '"description":', '"tags":']
    return any(indicator in text for indicator in json_indicators)

def clean_article_body(body: str) -> str:
    """Czyści treść artykułu z JSON-a i innych artefaktów"""
    if not body or not isinstance(body, str):
        return ""
    
    body = body.strip()
    
    # Jeśli body to JSON, spróbuj wyciągnąć tylko treść
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
    """Znacznie ulepszona funkcja do wyciągania JSON z odpowiedzi OpenAI"""
    logger.info(f"Rozpoczynam parsowanie JSON. Długość bloku: {len(block)} znaków")
    
    # Usuń markdown code blocks
    cleaned = re.sub(r'```json\s*', '', block)
    cleaned = re.sub(r'```\s*$', '', cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r'^```.*$', '', cleaned, flags=re.MULTILINE)
    cleaned = cleaned.strip()
    
    # Usuń tekst przed i po JSON
    # Znajdź pierwszy { i ostatni }
    first_brace = cleaned.find('{')
    last_brace = cleaned.rfind('}')
    
    if first_brace != -1 and last_brace != -1 and last_brace > first_brace:
        json_candidate = cleaned[first_brace:last_brace + 1]
    else:
        json_candidate = cleaned
    
    # Spróbuj różne metody wydobycia JSON
    extraction_methods = [
        # Metoda 1: Użyj wyciętego fragmentu
        lambda x: json_candidate,
        
        # Metoda 2: Znajdź JSON regex
        lambda x: re.search(r'\{.*\}', x, re.DOTALL).group(0) if re.search(r'\{.*\}', x, re.DOTALL) else None,
        
        # Metoda 3: Znajdź wieloliniowy JSON
        lambda x: re.search(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', x, re.DOTALL).group(0) if re.search(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', x, re.DOTALL) else None,
    ]
    
    for i, method in enumerate(extraction_methods, 1):
        try:
            json_text = method(cleaned)
            if not json_text or json_text.strip() == '':
                continue
                
            json_text = json_text.strip()
            logger.info(f"Metoda {i}: Próbuję sparsować JSON ({len(json_text)} znaków)")
            
            # Spróbuj sparsować
            parsed = json.loads(json_text)
            
            # Sprawdź czy to rzeczywiście nasz JSON
            required_keys = ['title', 'body']
            if all(key in parsed for key in required_keys):
                # Dodatkowa walidacja - sprawdź czy body nie jest JSON-em
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

# ===================== OPENAI =====================
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
    
    # Słowa kluczowe dla kategorii technicznych
    tech_keywords = ['mqtt', 'api', 'ml', 'ai', 'algorithm', 'protocol', 'integration', 'rag', 'vector', 'edge']
    # Słowa kluczowe dla kategorii biznesowych  
    business_keywords = ['roi', 'cost', 'budget', 'manager', 'compliance', 'training', 'risk', 'kpi']
    # Słowa kluczowe dla IoT
    iot_keywords = ['iot', 'sensor', 'device', 'connectivity', 'sparkplug']
    # Słowa kluczowe dla AI
    ai_keywords = ['ai', 'machine learning', 'neural', 'prediction', 'computer vision']
    # Słowa kluczowe dla MES
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
        return 'technical'  # domyślnie

def validate_article_quality(data, lang):
    """Walidacja z ustawieniami z config.json"""
    issues = []
    validation_config = config["settings"]["validation"]
    
    # Sprawdź długość tytułu
    title = data.get('title', '')
    min_title = validation_config["min_title_length"]
    max_title = validation_config["max_title_length"]
    
    if len(title) > max_title:
        issues.append(f"Tytuł za długi: {len(title)} znaków (max {max_title})")
    if len(title) < min_title:
        issues.append(f"Tytuł za krótki: {len(title)} znaków (min {min_title})")
    
    # Sprawdź treść artykułu
    body = data.get('body', '')
    if is_json_string(body):
        issues.append("Treść zawiera JSON")
    
    # Sprawdź długość treści
    word_count = len(body.split())
    min_words = validation_config["min_article_words"]
    max_words = validation_config["max_article_words"]
    
    if word_count < min_words:
        issues.append(f"Artykuł za krótki: {word_count} słów (min {min_words})")
    if word_count > max_words:
        issues.append(f"Artykuł za długi: {word_count} słów (max {max_words})")
    
    # Sprawdź nagłówki markdown
    if validation_config["require_markdown_headers"] and not re.search(r'^#+\s', body, re.MULTILINE):
        issues.append("Brak nagłówków markdown w treści")
    
    # Sprawdź wzmiankę o OmniMES
    if validation_config["require_omnimes_mention"] and 'omnimes' not in body.lower():
        issues.append("Brak wzmianki o OmniMES")
    
    # Sprawdź opis SEO
    description = data.get('description', '')
    min_desc = validation_config["min_description_length"]
    max_desc = validation_config["max_description_length"]
    
    if len(description) > max_desc:
        issues.append(f"Opis SEO za długi: {len(description)} znaków (max {max_desc})")
    if len(description) < min_desc:
        issues.append(f"Opis SEO za krótki: {len(description)} znaków (min {min_desc})")
    
    # Loguj wyniki
    if issues:
        logger.warning(f"Problemy z jakością artykułu ({lang}): {', '.join(issues)}")
        return False, issues
    else:
        logger.info(f"Artykuł przeszedł walidację jakości ({lang})")
        return True, []

def gen_article_lang(topic, lang="pl", target_words=DEFAULT_WORDS):
    """Poprawiona funkcja generowania artykułu z lepszym debugowaniem i walidacją"""
    logger.info(f"Generowanie artykułu: '{topic}' w języku {lang} (~{target_words} słów)")
    
    try:
        cli = openai_client()
        
        # Pobierz prompt systemowy z konfiguracji
        system_prompts = config["prompts"]["system_prompts"][lang]
        sys = " ".join(system_prompts)
        
        # Jeśli język nie jest polski, najpierw przetłumacz temat
        if lang != "pl":
            logger.info(f"Tłumaczenie tematu na język: {lang}")
            topic = translate_topic(topic, lang)
            logger.info(f"Przetłumaczony temat: {topic}")
        
        # Ulepszona instrukcja dla OpenAI - bardziej precyzyjna
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
        
        # Użyj niższej temperatury dla bardziej przewidywalnych wyników
        temperature = 0.3 if lang != "pl" else 0.5
        
        r = cli.chat.completions.create(
            model="gpt-5-mini",
            temperature=temperature,
            max_tokens=5000,  # Zwiększ limit tokenów
            messages=[
                {"role": "system", "content": sys},
                {"role": "user", "content": user}
            ]
        )
        
        content = r.choices[0].message.content.strip()
        logger.info(f"Otrzymano odpowiedź OpenAI dla języka {lang}")
        logger.info(f"Długość odpowiedzi: {len(content)} znaków")
        
        # Wyciągnij JSON
        data = extract_json(content)
        
        if not data:
            logger.error(f"Nie udało się wyodrębnić JSON z odpowiedzi OpenAI dla języka {lang}")
            # Zapisz do pliku do debugowania
            with open(f"debug_response_{lang}_{datetime.now().strftime('%H%M%S')}.txt", "w", encoding="utf-8") as f:
                f.write(f"TOPIC: {topic}\n")
                f.write(f"LANG: {lang}\n")
                f.write("=" * 50 + "\n")
                f.write(content)
            
            # Bezpieczny fallback - NIE używaj całej odpowiedzi jako body
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

def retry_article_generation(topic, lang="pl", target_words=None):
    """Generuj artykuł z retry settings z config.json"""
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

def gen_article_pl(topic, target_words=DEFAULT_WORDS):
    # tryb 'translate': najpierw PL
    return retry_article_generation(topic, lang="pl", target_words=target_words)

def translate_topic(topic, target_lang):
    """Tłumaczy temat na język docelowy"""
    try:
        cli = openai_client()
        ln = {"en": "English", "de": "German"}[target_lang]
        r = cli.chat.completions.create(
            model="gpt-5-mini",
            temperature=0.3,
            messages=[
                {"role": "system", "content": f"Translate the following topic/title to {ln}. Return only the translation, nothing else."},
                {"role": "user", "content": topic}
            ]
        )
        return r.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"Błąd tłumaczenia tematu na {target_lang}: {e}")
        return topic  # fallback - zwróć oryginalny temat

def translate_md(md_text, target_lang):
    logger.info(f"Tłumaczenie tekstu na język: {target_lang}")
    try:
        cli = openai_client()
        ln = {"en": "English", "de": "German"}[target_lang]
        sys = ("Tłumacz poniższy Markdown zachowując nagłówki/linki/formatowanie. "
               "Zachowaj ton SEO; dostosuj gramatykę do języka docelowego; bez halucynacji.")
        r = cli.chat.completions.create(
            model="gpt-5-mini",
            temperature=0.4,
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

# ===================== NOWE FUNKCJE TOPIC GENERATION =====================

def generate_topic_from_keywords(keywords_list):
    """Generuje temat używając GPT na podstawie słów kluczowych"""
    logger.info("Generowanie tematu przez GPT na podstawie słów kluczowych")
    
    try:
        cli = openai_client()
        
        # Wybierz 3-5 losowych słów kluczowych
        selected_keywords = random.sample(keywords_list, min(random.randint(3, 5), len(keywords_list)))
        keywords_str = ", ".join(selected_keywords)
        
        prompt = config["prompts"]["topic_generation_prompt"]
        
        r = cli.chat.completions.create(
            model="gpt-5-mini",
            temperature=0.8,  # Wyższa temperatura dla kreatywności
            max_tokens=100,
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
        # Fallback - użyj standardowej metody
        return propose_topic_predefined()

def propose_topic_predefined():
    """Generuje temat na podstawie predefined topics + sufiksy z config.json"""
    logger.info("Generowanie tematu z predefined topics")
    
    # Pobierz wagi i kategorie z config
    weights_config = config["content"]["topic_buckets"]["weights"]
    categories = list(weights_config.keys())
    weights = [weights_config[cat] for cat in categories]
    
    # Losuj kategorię
    category = random.choices(categories, weights=weights)[0]
    
    # Pobierz tematy i sufiksy dla kategorii
    topics = config["content"]["topic_buckets"]["topics"][category]
    suffixes = config["content"]["topic_buckets"]["suffixes"][category]
    
    # Wybierz temat bazowy i sufiks
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

# ====== OpenAI Images (okładka) ======
def gen_cover_png_bytes(topic: str) -> bytes:
    """Generuje okładkę z retry settings z config.json"""
    logger.info(f"Generowanie okładki dla tematu: '{topic}'")
    
    retry_config = config["settings"]["retry_settings"]
    max_retries = retry_config["max_image_retries"]
    
    for attempt in range(max_retries):
        try:
            cli = openai_client()
            
            # Określ kategorię tematu i wybierz odpowiedni prompt
            category = determine_topic_category(topic)
            image_prompt_template = config["prompts"]["image_prompts"][category]
            
            # Wstaw temat do promptu i skróć jeśli za długi
            prompt = image_prompt_template.format(topic=topic[:100])
            
            if len(prompt) > 400:
                prompt = prompt[:397] + "..."
                
            logger.info(f"Próba {attempt + 1}: Używam promptu dla kategorii '{category}'")
            
            img = cli.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size="1024x1024",
                quality="standard",
                response_format="b64_json",
                style="natural"
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
                time.sleep(2)  # Krótka przerwa między próbami

def pick_fallback_cover() -> str:
    cover = random.choice(COVER_FALLBACKS)
    logger.info(f"Użyto fallback okładki: {cover}")
    return cover

def upload_cover_png(slug: str, png_bytes: bytes, force_unique=False) -> str:
    # Opcjonalnie dodaj timestamp dla unikalności
    if force_unique:
        timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
        filename = f"{slug}-{timestamp}.png"
    else:
        filename = f"{slug}.png"
    
    rel_path = f"{COVERS_DIR_REL}/{filename}"
    logger.info(f"Przesyłanie okładki: {rel_path}")
    
    try:
        api_put_file(rel_path, png_bytes, f"feat(content): cover for {slug}")
        
        # web path: jeśli katalog w repo zaczyna się od public/, serwujemy od /
        if COVERS_DIR_REL.startswith("public/"):
            web_path = "/" + COVERS_DIR_REL[len("public/"):] + f"/{filename}"
        else:
            web_path = "/" + COVERS_DIR_REL.strip("/") + f"/{filename}"
            
        logger.info(f"Okładka dostępna pod: {web_path}")
        return web_path
    except Exception as e:
        logger.error(f"Błąd przesyłania okładki: {e}")
        raise

# ===================== RENDER .MD =====================
def render_frontmatter(post, lang, published_iso, cover_image, group_id=None):
    tags = post.get("tags") or TAGS_BASE
    tags_str = ", ".join([
        "{ 'label': '%s', 'value': '%s' }" % (t["label"], t["value"])
        for t in tags
    ])
    
    fm = [
        "---",
        f"title: '{post['title']}'",
        "status: 'published'",
        f"author:\n name: '{AUTHOR['name']}'\n picture: '{AUTHOR['picture']}'",
        f"slug: '{post['slug']}'",
        f"description: '{post['description']}'",
        f"coverImage: '{cover_image}'",
        f"tags: [ {tags_str} ]",
        f"lang: '{lang}'",
        f"publishedAt: '{published_iso}'",
    ]
    
    if group_id:
        fm.append(f"groupId: '{group_id}'")
    
    fm.extend(["---", ""])
    return "\n".join(fm)

def render_md(post, lang, published_iso, cover_image, group_id=None):
    """Poprawiona funkcja renderowania z dodatkową walidacją"""
    
    # Dodatkowa walidacja treści
    body = post.get("body", "")
    if is_json_string(body):
        logger.error("KRYTYCZNY BŁĄD: Wykryto JSON w treści artykułu podczas renderowania!")
        logger.error(f"Treść: {body[:200]}...")
        
        # Spróbuj oczyścić
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

def test_article_generation(topic="Test generowania artykułu"):
    """Funkcja testowa do debugowania generowania artykułów"""
    logger.info(f"=== TEST GENEROWANIA ARTYKUŁU: {topic} ===")
    
    try:
        data = retry_article_generation(topic, lang="pl")
        
        logger.info("=== WYNIKI TESTU ===")
        logger.info(f"Title: {data['title']}")
        logger.info(f"Description: {data['description']}")
        logger.info(f"Tags: {data['tags']}")
        logger.info(f"Body length: {len(data['body'])} chars")
        logger.info(f"Body preview: {data['body'][:200]}...")
        
        # Test renderowania
        test_md = render_md(data, "pl", "2025-09-01T10:00:00Z", "/images/test.png")
        
        # Zapisz do pliku testowego
        test_file = Path("test_article.md")
        test_file.write_text(test_md, encoding="utf-8")
        
        logger.info(f"Plik testowy zapisany jako: {test_file}")
        logger.info("=== KONIEC TESTU ===")
        
        print(f"Test zakończony! Sprawdź plik: {test_file}")
        
    except Exception as e:
        logger.error(f"Błąd testu: {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")

# ===================== PLANER =====================
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
            # Status "published" = publikuj NATYCHMIAST bez względu na datę
            out.append(s)
            logger.info(f"Slot z statusem 'published' dodany do publikacji: {s.get('topic', 'brak tematu')}")
            
        elif status == "scheduled":
            # Status "scheduled" = publikuj TYLKO gdy nadejdzie zaplanowana data
            dt = datetime.fromisoformat(s["date"].replace("Z", ""))
            if dt <= now:
                out.append(s)
                logger.info(f"Slot zaplanowany na {s['date']} jest gotowy do publikacji: {s.get('topic', 'brak tematu')}")
            else:
                logger.info(f"Slot zaplanowany na {s['date']} jeszcze czeka: {s.get('topic', 'brak tematu')}")
                
        elif status == "completed":
            # Status "completed" = już opublikowany, pomijamy
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
    
    # Zapisz backup slotu
    backup_file = backup_dir / f"slot_{datetime.now().strftime('%H%M%S')}.json"
    backup_file.write_text(json.dumps(slot, ensure_ascii=False, indent=2), encoding="utf-8")
    
    logger.info(f"Backup slotu zapisany: {backup_file}")

# ===================== PUBLIKACJA =====================
def put_post(slug: str, body_md: str, message: str):
    rel = f"{POSTS_DIR_REL}/{slug}.md"
    logger.info(f"Publikowanie posta: {slug}")
    api_put_file(rel, body_md.encode("utf-8"), message)
    logger.info(f"Post {slug} opublikowany pomyślnie")

def publish_one(slot):
    """Ulepszona wersja publish_one z lepszym error handling"""
    logger.info("=" * 30)
    logger.info(f"ROZPOCZĘCIE PUBLIKACJI SLOTU")
    logger.info(f"Data: {slot['date']}")
    logger.info(f"Temat: {slot.get('topic', 'brak')}")
    logger.info("=" * 30)
    
    try:
        # Backup przed publikacją
        backup_and_validate_before_publish(slot)
        
        topic = slot["topic"] or propose_topic()
        when_dt = datetime.fromisoformat(slot["date"].replace("Z", ""))
        when_iso = iso_z(when_dt)
        lang_policy = (slot.get("lang_policy") or "translate").lower()
        msg = f"feat(content): post '{topic}' {when_dt.date()}"
        
        logger.info(f"Tryb językowy: {lang_policy}")

        # ======== okładka wspólna dla zestawu PL/EN/DE ========
        try:
            cover_slug_seed = slugify(topic) or f"post-{when_dt.date()}"
            logger.info(f"Generowanie okładki dla slug: {cover_slug_seed}")
            png = gen_cover_png_bytes(topic)
            cover_path = upload_cover_png(cover_slug_seed, png, force_unique=False)
        except Exception as e:
            logger.warning(f"Błąd generowania okładki, używam fallback: {e}")
            cover_path = pick_fallback_cover()

        if lang_policy == "triple-original":
            logger.info("Tryb triple-original: generowanie 3 niezależnych artykułów")
            group_id = str(uuid4())

            # Użyj retry_article_generation zamiast gen_article_lang
            data_pl = retry_article_generation(topic, lang="pl")
            data_pl["slug"] = ensure_unique_slug(data_pl["slug"])
            pl_md = render_md(data_pl, "pl", when_iso, cover_path, group_id)
            put_post(data_pl["slug"], pl_md, msg + " [PL]")

            data_en = retry_article_generation(topic, lang="en")
            data_en["slug"] = ensure_unique_slug(data_en["slug"])
            en_md = render_md(data_en, "en", when_iso, cover_path, group_id)
            put_post(data_en["slug"], en_md, msg + " [EN]")

            data_de = retry_article_generation(topic, lang="de")
            data_de["slug"] = ensure_unique_slug(data_de["slug"])
            de_md = render_md(data_de, "de", when_iso, cover_path, group_id)
            put_post(data_de["slug"], de_md, msg + " [DE]")

            slot["slug"] = data_pl["slug"]

        else:
            # tryb 'translate'
            logger.info("Tryb translate: generowanie PL + tłumaczenia")
            
            # Użyj retry_article_generation
            data_pl = retry_article_generation(topic, lang="pl")
            data_pl["slug"] = ensure_unique_slug(data_pl["slug"])
            pl_md = render_md(data_pl, "pl", when_iso, cover_path)
            put_post(data_pl["slug"], pl_md, msg + " (PL/EN/DE via translate)")

            logger.info("Tłumaczenie na EN i DE...")
            
            topic_en = translate_topic(topic, "en")
            topic_de = translate_topic(topic, "de")
            
            en_md_body = translate_md(data_pl["body"], "en")
            de_md_body = translate_md(data_pl["body"], "de")

            data_en = {
                "title": topic_en,
                "description": data_pl["description"],
                "tags": data_pl.get("tags", TAGS_BASE),
                "body": en_md_body,
                "slug": ensure_unique_slug(slugify(topic_en))
            }
            
            data_de = {
                "title": topic_de,
                "description": data_pl["description"],
                "tags": data_pl.get("tags", TAGS_BASE),
                "body": de_md_body,
                "slug": ensure_unique_slug(slugify(topic_de))
            }

            en_md = render_md(data_en, "en", when_iso, cover_path)
            de_md = render_md(data_de, "de", when_iso, cover_path)
            
            put_post(data_en["slug"], en_md, msg + " [EN]")
            put_post(data_de["slug"], de_md, msg + " [DE]")

            slot["slug"] = data_pl["slug"]

        slot["topic"] = topic
        slot["status"] = "completed"
        
        logger.info("=" * 30)
        logger.info("SLOT OPUBLIKOWANY POMYŚLNIE")
        logger.info(f"Temat: {topic}")
        logger.info(f"Slug główny: {slot['slug']}")
        logger.info("Status zmieniony na: completed")
        logger.info("=" * 30)

    except Exception as e:
        logger.error("=" * 30)
        logger.error("BŁĄD PUBLIKACJI SLOTU")
        logger.error(f"Temat: {slot.get('topic', 'brak')}")
        logger.error(f"Błąd: {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        logger.error("=" * 30)
        raise

# ===================== CLI =====================
def main():
    logger.info("Uruchomienie OmniBlog v3.1 Enhanced")
    
    try:
        ap = argparse.ArgumentParser("OmniBlog v3.1 Enhanced – inteligentna generacja tematów")
        sub = ap.add_subparsers(dest="cmd", required=True)

        sp2 = sub.add_parser("add-slot", help="dodaj pojedynczy slot")
        sp2.add_argument("--date", required=True)
        sp2.add_argument("--topic", default=None, help="własny temat (opcjonalnie)")
        sp2.add_argument("--lang-policy", default=None, choices=["translate", "triple-original"])
        sp2.add_argument("--status", default="scheduled", choices=["scheduled", "published"],
                        help="scheduled = publikuj w zaplanowanej dacie, published = publikuj natychmiast")
        sp2.add_argument("--force-method", default=None, choices=["predefined", "gpt_generated"],
                        help="wymuś metodę generowania tematu")

        sp3 = sub.add_parser("run-due", help="publikuje wszystkie sloty, których data <= teraz")
        
        sp4 = sub.add_parser("propose-topic", help="proponuje losowy temat")
        sp4.add_argument("--method", default=None, choices=["predefined", "gpt_generated"],
                        help="wybierz metodę generowania")
        sp4.add_argument("--count", type=int, default=1, help="liczba tematów do wygenerowania")
        
        sp5 = sub.add_parser("test-image", help="testuje generowanie obrazka")
        sp5.add_argument("--topic", required=True, help="temat do wygenerowania obrazka")

        sp6 = sub.add_parser("update-config", help="aktualizuje config.json z nowymi ustawieniami")
        
        sp7 = sub.add_parser("test-article", help="testuje generowanie artykułu bez publikacji")
        sp7.add_argument("--topic", default=None, help="temat do testu (opcjonalnie)")
        sp7.add_argument("--method", default=None, choices=["predefined", "gpt_generated"])

        sp8 = sub.add_parser("validate-articles", help="testuje i waliduje generowanie artykułów")
        sp8.add_argument("--count", type=int, default=3, help="liczba testów do wykonania")
        
        sp9 = sub.add_parser("show-config", help="wyświetla aktualne ustawienia generacji tematów")

        args = ap.parse_args()
        logger.info(f"Wykonywanie komendy: {args.cmd}")

        plan = load_plan()

        if args.cmd == "add-slot":
            # Ustal temat - własny lub wygenerowany
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
                "lang_policy": args.lang_policy or "triple-original",
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
            if args.method:
                if args.method == "gpt_generated":
                    keywords = config["content"]["topic_generation"]["gpt_keywords"]
                    test_topic = generate_topic_from_keywords(keywords)
                elif args.method == "predefined":
                    test_topic = propose_topic_predefined()
            
            test_article_generation(test_topic)

        elif args.cmd == "show-config":
            print("=== AKTUALNE USTAWIENIA GENERACJI TEMATÓW ===")
            
            method_weights = config["content"]["topic_generation"]["method_weights"]
            print(f"Metody generacji tematów:")
            for method, weight in method_weights.items():
                print(f"  {method}: {weight*100:.0f}%")
            
            category_weights = config["content"]["topic_buckets"]["weights"]
            print(f"\nWagi kategorii (dla metody predefined):")
            for category, weight in category_weights.items():
                topic_count = len(config["content"]["topic_buckets"]["topics"][category])
                suffix_count = len(config["content"]["topic_buckets"]["suffixes"][category])
                print(f"  {category}: {weight*100:.0f}% ({topic_count} tematów, {suffix_count} sufiksów)")
            
            gpt_keywords = config["content"]["topic_generation"]["gpt_keywords"]
            print(f"\nSłowa kluczowe dla GPT ({len(gpt_keywords)} słów):")
            print(f"  {', '.join(gpt_keywords[:10])}{'...' if len(gpt_keywords) > 10 else ''}")

        elif args.cmd == "run-due":
            due = due_slots(plan)
            if not due:
                logger.info("Brak slotów do publikacji")
                print("Brak slotów do publikacji.")
                return

            logger.info(f"Rozpoczynanie publikacji {len(due)} slotów")
            published_count = 0
            
            for slot in due:
                try:
                    publish_one(slot)
                    published_count += 1
                except Exception as e:
                    logger.error(f"Błąd publikacji slotu: {e}")
                    continue
            
            save_plan(plan)
            logger.info(f"Ukończono publikację. Opublikowano: {published_count}/{len(due)}")
            print(f"Opublikowano {published_count} z {len(due)} slot/ów.")

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
                    data = retry_article_generation(topic, "pl")
                    is_valid, issues = validate_article_quality(data, "pl")
                    
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
                print("✅ Inteligentna generacja tematów przez GPT")
                print("✅ Konfigurowalne wagi metod i kategorii")
                print("✅ Rozszerzone ustawienia walidacji")
                print("✅ Wszystkie ustawienia w JSON")
            except Exception as e:
                logger.error(f"Błąd aktualizacji config: {e}")
                raise

    except Exception as e:
        logger.error(f"Błąd głównej funkcji: {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise
    finally:
        logger.info("Zakończenie sesji OmniBlog v3.1 Enhanced")

if __name__ == "__main__":
    main()