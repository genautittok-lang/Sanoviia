# Sannovia Pflege

## Overview

Sannovia Pflege is a premium multilingual healthcare services website for a professional home care service in Hannover, Germany. The website serves as a digital presence offering details about ambulatory care, LVAD medical technology support, and psychosocial assistance. Features include a glassmorphism design aesthetic, 5-language support, and an AI-powered assistant.

## User Preferences

- Premium, luxurious ("шикарно") design aesthetic
- Multi-language support (German, English, Russian, Ukrainian, Arabic)
- AI assistant with medical disclaimer logic
- Teal/turquoise color palette

## Recent Changes (December 2024)

- Complete multilingual system with 5 languages (DE, EN, RU, UA, AR)
- Premium glassmorphism design with floating animations
- AI Assistant integration with language-aware responses
- RTL support for Arabic language
- HTML lang attribute updates dynamically with language selection

## System Architecture

### Frontend Architecture
The website uses a **static multi-page architecture** with traditional HTML, CSS, and JavaScript.

**Key files:**
- `index.html` - Home page with hero and services overview
- `leistungen.html` - Services page
- `ueber-uns.html` - About page with expertise cards
- `kontakt.html` - Contact page with phone/email/WhatsApp
- `style.css` - Premium glassmorphism styling
- `script.js` - Language switching, navigation, chat functionality
- `translations.js` - All translations for 5 languages

### Backend Architecture
- `server.js` - Node.js HTTP server with AI chat API endpoint
- Uses Replit AI Integration (OpenAI gpt-4o) for language-aware chat responses
- Serves static files on port 5000

### Design System
- **Colors:** Teal primary (#2a9d8f), Dark teal (#1e7a6e), Secondary (#264653)
- **Glassmorphism:** Blur effects, transparent backgrounds, subtle borders
- **Animations:** Floating AI badge, card hover effects, smooth transitions
- **Typography:** Inter font family

### Multilingual System
- Languages: German (DE), English (EN), Russian (RU), Ukrainian (UA), Arabic (AR)
- `data-i18n` attributes for text content
- `data-i18n-placeholder` for input placeholders
- localStorage persistence for language preference
- RTL layout support for Arabic
- Dynamic HTML lang attribute updates

### AI Assistant
- Floating badge in bottom-right corner
- Language-aware responses (responds in selected language)
- Medical disclaimer logic - never diagnoses
- Information about services and general medication advice
- Directs users to contact page (+49 123 456 789) for professional help

## External Dependencies

- **Google Fonts API:** Inter font family
- **Unsplash Images:** Hero background image
- **Replit AI Integration:** OpenAI gpt-4o for chat responses
- **WhatsApp Integration:** Direct messaging links

## Development

Run with: `node server.js`
Website available on port 5000