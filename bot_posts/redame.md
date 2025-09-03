# OmniBlog v3.1 Enhanced

Advanced automated blog content generation system with intelligent topic generation, comprehensive diagnostics and full JSON configuration.

## Key Features

### ✅ Core Functionality:

1. **Intelligent Topic Generation** - 50% AI-generated + 50% predefined topics (configurable)
2. **Full Diagnostic Logging** - All operations logged to `log.txt`
3. **Smart Image Matching** - AI selects graphics style based on topic category
4. **Complete JSON Configuration** - All prompts, weights, and settings in `config.json`
5. **Extensive Topic Pool** - 80+ predefined topics + unlimited AI-generated topics
6. **Flexible Content Strategy** - Configurable category weights and generation methods
7. **Advanced Validation** - Comprehensive quality checks with configurable parameters
8. **Robust Error Handling** - Configurable retry settings for all operations

## File Structure

```
omniblog/
├── omniblog_v3_1_enhanced.py   # Main script
├── config.json                 # Complete configuration
├── .env                       # Environment variables  
├── log.txt                    # Diagnostic logs
├── content_plan.json          # Publication schedule
└── backups/                   # Automatic backups
    └── YYYY-MM-DD/
        ├── slot_HHMMSS.json
        └── ...
```

## Configuration

### 1. Environment Variables (.env)
```bash
# Essential variables:
OPENAI_API_KEY=sk-...
GIT_PAT=ghp_...
GH_OWNER=YourGitHubUsername
GH_REPO=your-blog-repo

# Optional customization:
POSTS_DIR_REL=outstatic/content/posts
COVERS_DIR_REL=public/images
GH_BRANCH=main
```

### 2. Automatic Configuration
On first run, `config.json` is created with intelligent defaults. All settings are configurable without touching code.

## Topic Generation System

The system uses three intelligent methods for generating topics:

### 🎯 Generation Methods (Configurable Weights)

- **Predefined Topics (50% default)**: Uses curated topic pool + smart suffixes
- **AI-Generated Topics (50% default)**: GPT creates unique topics from keywords  
- **Custom Topics**: Manual topic specification (always available)

### 📊 Topic Categories (For Predefined Method)

When using predefined topics, system selects from weighted categories:

- **Technical (40% default)**: Implementation guides, protocols, architectures
- **Business (35% default)**: ROI analysis, strategy, management perspectives  
- **Mixed (25% default)**: Technology + business combined approaches

### 🔧 How It Works

```bash
# Auto-generated topic (system chooses method)
python omniblog_v3_1_enhanced.py add-slot --date "2025-01-20T09:00:00Z"

# Force GPT generation
python omniblog_v3_1_enhanced.py add-slot --date "2025-01-20T09:00:00Z" --force-method gpt_generated

# Force predefined topics
python omniblog_v3_1_enhanced.py add-slot --date "2025-01-20T09:00:00Z" --force-method predefined

# Use custom topic
python omniblog_v3_1_enhanced.py add-slot --date "2025-01-20T09:00:00Z" --topic "My Custom Topic"
```

## Intelligent Image Generation

System automatically recognizes topic category and applies appropriate visual style:

- **Technical**: Industrial illustrations, blueprint aesthetics
- **Business**: Professional environments, dashboards, meeting rooms
- **IoT**: Connected devices, sensors, network visualizations
- **AI**: Neural networks, futuristic algorithmic representations
- **MES**: Production monitoring, control room interfaces

## Diagnostics and Logging

All operations are thoroughly logged with configurable detail levels:

```
2025-01-15 10:30:15 - INFO - Starting slot publication
2025-01-15 10:30:16 - INFO - Topic generation method: gpt_generated
2025-01-15 10:30:17 - INFO - GPT generated topic: 'Smart Predictive Analytics in Manufacturing'
2025-01-15 10:30:25 - INFO - Article generated successfully (pl): 'Inteligentna analiza predykcyjna'
2025-01-15 10:30:26 - INFO - Using image prompt for category 'ai'
2025-01-15 10:30:35 - INFO - Cover image generated successfully (2,456,789 bytes)
2025-01-15 10:30:36 - INFO - Post smart-predictive-analytics published successfully
```

## Slot Status System

The system uses three slot statuses in `content_plan.json`:

- **`"published"`** = 🚀 **publish IMMEDIATELY** (regardless of date)
- **`"scheduled"`** = ⏰ **publish when scheduled date arrives** 
- **`"completed"`** = ✅ **already published** (automatically set after publication)

### Example publication plan:
```json
{
  "version": 2,
  "timezone": "UTC", 
  "slots": [
    {
      "date": "2025-09-01T09:00:00Z",
      "topic": "Advanced Implementation Guide", 
      "status": "published",        // <- publish immediately
      "lang_policy": "triple-original"
    },
    {
      "date": "2025-09-05T10:00:00Z",
      "topic": null,                // <- will be auto-generated
      "status": "scheduled",        // <- wait until Sept 5
      "lang_policy": "translate"
    },
    {
      "date": "2025-08-30T09:00:00Z", 
      "topic": "Already Published",
      "status": "completed",        // <- skip this one
      "slug": "already-published"
    }
  ]
}
```

## Usage

### Basic Commands

```bash
# Add slot for scheduled publication (default status: scheduled)
python omniblog_v3_1_enhanced.py add-slot --date "2025-01-20T09:00:00Z" --topic "Implementation Guide" --lang-policy triple-original

# Add slot for IMMEDIATE publication (status: published)
python omniblog_v3_1_enhanced.py add-slot --date "2025-01-20T09:00:00Z" --topic "Quick Tutorial" --status published --lang-policy triple-original

# Publish ready slots (published + due scheduled)
python omniblog_v3_1_enhanced.py run-due

# Generate topic suggestions
python omniblog_v3_1_enhanced.py propose-topic --count 5 --method gpt_generated

# Test specific generation method
python omniblog_v3_1_enhanced.py test-article --method predefined
```

### Advanced CLI Commands

```bash
# Generate multiple topics for inspiration
python omniblog_v3_1_enhanced.py propose-topic --count 5 --method gpt_generated

# Test specific generation method
python omniblog_v3_1_enhanced.py test-article --method predefined
python omniblog_v3_1_enhanced.py test-article --method gpt_generated

# View current configuration
python omniblog_v3_1_enhanced.py show-config

# Advanced validation testing
python omniblog_v3_1_enhanced.py validate-articles --count 10

# Test image generation
python omniblog_v3_1_enhanced.py test-image --topic "Advanced Manufacturing Systems"
```

### Status Options

```bash
# Status "scheduled" (default) - publish when date arrives
--status scheduled

# Status "published" - publish immediately on next run-due
--status published
```

### Language Modes

- **triple-original**: 3 independent native articles (PL, EN, DE)
- **translate**: One base article + 2 translations

## Practical Example:
```bash
# Check current configuration
python omniblog_v3_1_enhanced.py show-config

# Add auto-generated topic slot
python omniblog_v3_1_enhanced.py add-slot --date "2025-09-02T10:00:00Z" --lang-policy triple-original

# Add immediate publication with custom topic
python omniblog_v3_1_enhanced.py add-slot --date "2025-09-02T10:00:00Z" --topic "Custom Implementation Guide" --status published

# Publish ready slots
python omniblog_v3_1_enhanced.py run-due
```

## Configuration Deep Dive

### Key Configuration Sections in `config.json`

#### Topic Generation Settings
```json
{
  "content": {
    "topic_generation": {
      "method_weights": {
        "predefined": 0.5,        // 50% predefined topics
        "gpt_generated": 0.5      // 50% AI-generated topics  
      },
      "gpt_keywords": ["automation", "IoT", "AI", ...] // Keywords for GPT
    },
    "topic_buckets": {
      "weights": {
        "technical": 0.4,         // 40% technical topics
        "business": 0.35,         // 35% business topics
        "mixed": 0.25            // 25% mixed topics
      },
      "topics": { ... },          // Predefined topic lists
      "suffixes": { ... }         // Category-specific suffixes
    }
  }
}
```

#### Validation Settings  
```json
{
  "settings": {
    "validation": {
      "min_title_length": 10,
      "max_title_length": 90,
      "min_article_words": 200,
      "max_article_words": 2000,
      "require_omnimes_mention": true
    },
    "retry_settings": {
      "max_article_retries": 3,
      "max_image_retries": 2,
      "retry_delay_seconds": 2
    }
  }
}
```

#### System Prompts
```json
{
  "prompts": {
    "system_prompts": {
      "pl": ["Polish expert prompt", "Additional instructions"],
      "en": ["English expert prompt", "Additional instructions"],
      "de": ["German expert prompt", "Additional instructions"]
    },
    "topic_generation_prompt": "GPT topic generation instructions"
  }
}
```

## Customization

### Adjusting Topic Generation Weights
Edit `config.json` to change generation probabilities:

```json
{
  "content": {
    "topic_generation": {
      "method_weights": {
        "predefined": 0.3,        // 30% predefined
        "gpt_generated": 0.7      // 70% AI-generated  
      }
    },
    "topic_buckets": {
      "weights": {
        "technical": 0.6,         // 60% technical
        "business": 0.3,          // 30% business
        "mixed": 0.1             // 10% mixed
      }
    }
  }
}
```

### Adding New Keywords for GPT
Expand the keyword pool:

```json
{
  "content": {
    "topic_generation": {
      "gpt_keywords": [
        "automation", "IoT", "AI", 
        "your-new-keyword", "another-keyword"
      ]
    }
  }
}
```

### Adding New Topic Categories
Extend predefined topics:

```json
{
  "content": {
    "topic_buckets": {
      "topics": {
        "technical": [
          "Your new technical topic",
          "Another technical topic"
        ]
      },
      "suffixes": {
        "technical": [
          "- your custom suffix",
          "- another suffix approach"
        ]
      }
    }
  }
}
```

### Customizing Validation Rules
Adjust quality requirements:

```json
{
  "settings": {
    "validation": {
      "min_title_length": 15,           // Stricter title minimum
      "max_title_length": 80,           // Shorter title maximum
      "min_article_words": 300,         // Longer articles
      "require_omnimes_mention": false  // Remove mention requirement
    }
  }
}
```

## Monitoring and Troubleshooting

### Checking Logs
```bash
# Last 50 lines
tail -50 log.txt

# Error logs only
grep "ERROR" log.txt

# Topic generation logs
grep "Generated topic" log.txt

# Publication status
grep "SLOT.*PUBLISHED" log.txt
```

### Publication Status Monitoring
```bash
# Check scheduled slots
cat content_plan.json | jq '.slots[] | select(.status == "scheduled")'

# Check completed slots  
cat content_plan.json | jq '.slots[] | select(.status == "completed")'

# View current config summary
python omniblog_v3_1_enhanced.py show-config
```

### Performance Optimization
```bash
# Test generation performance
time python omniblog_v3_1_enhanced.py propose-topic --count 10

# Validate article quality in batch
python omniblog_v3_1_enhanced.py validate-articles --count 20
```

## Troubleshooting

### OpenAI Errors
- Check API limits and usage
- Verify API key in `.env`
- Monitor model availability

### GitHub Errors
- Check PAT token permissions
- Verify repository access
- Confirm branch names

### Topic Generation Issues  
- Use `--method` flag to test specific approaches
- Check keyword lists in config
- Verify topic pool sizes

### Image Generation Problems
- Use `test-image` for debugging
- Check DALL-E 3 availability
- Monitor API quotas

## Example Output

### Successful Run
```
=== CURRENT TOPIC GENERATION SETTINGS ===
Topic generation methods:
  predefined: 50%
  gpt_generated: 50%

Category weights (for predefined method):
  technical: 40% (28 topics, 10 suffixes)
  business: 35% (30 topics, 10 suffixes)
  mixed: 25% (24 topics, 10 suffixes)

GPT keywords (25 words):
  automation, manufacturing, industry 4.0, IoT, AI...

Generated topic: "Predictive Quality Control Systems - implementation roadmap"
Article generated successfully (pl): 'Systemy predykcyjnej kontroli jakości'
Cover image generated successfully (2,456,789 bytes)
Post predictive-quality-control-systems published successfully
```

## Backup and Recovery

### Automatic Backups
System automatically creates backups before each publication:
```
backups/
├── 2025-01-15/
│   ├── slot_103015.json
│   ├── slot_103145.json
│   └── slot_103312.json
└── 2025-01-16/
    └── slot_090030.json
```

### Manual Backup
```bash
# Backup configuration
cp config.json config_backup_$(date +%Y%m%d).json
cp content_plan.json plan_backup_$(date +%Y%m%d).json

# Backup logs
cp log.txt log_backup_$(date +%Y%m%d).txt
```

### Recovery
```bash
# Restore from backup
cp config_backup_20250115.json config.json
cp plan_backup_20250115.json content_plan.json
```

## Advanced Features

### Batch Operations
```bash
# Generate multiple slots at once
for date in 2025-01-{20..25}; do
  python omniblog_v3_1_enhanced.py add-slot --date "${date}T09:00:00Z" --lang-policy triple-original
done
```

### Configuration Testing
```bash
# Test different configurations
python omniblog_v3_1_enhanced.py show-config
python omniblog_v3_1_enhanced.py validate-articles --count 5
python omniblog_v3_1_enhanced.py propose-topic --count 10
```

## Support

For issues, check in order:
1. **Logs**: `tail -50 log.txt`
2. **Configuration**: `python omniblog_v3_1_enhanced.py show-config`
3. **Environment**: Verify `.env` variables
4. **API Status**: Check OpenAI/GitHub API limits
5. **Permissions**: Verify GitHub PAT permissions

### Common Solutions
- **Topic repetition**: Increase GPT weight or add more keywords
- **Generation failures**: Check retry settings and API limits  
- **Image errors**: Test with simple topics, check DALL-E quotas
- **Publication failures**: Verify GitHub permissions and repository structure

---
*OmniBlog v3.1 Enhanced - Intelligent automated content generation system with advanced topic intelligence*