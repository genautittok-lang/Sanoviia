# Sannovia Pflege

## Overview

Professional multilingual healthcare services website for Ihor Liubchyk, M.Sc., GuK — a freelance specialized nurse in Hannover offering LVAD/VAC/PICC-Line treatment nursing (SGB V) and advisory services (§37.3 SGB XI) as a subcontractor. Features glassmorphism design, 5-language support, and an AI-powered assistant.

## Real Contact Information

- **Name:** Ihor Liubchyk, M.Sc., GuK
- **Phone:** +49 176 32755364
- **Email:** info@sannovia-pflege.de
- **Address:** Domagkweg 38, 30627 Hannover
- **Legal:** Services provided as Subunternehmer — no own Kassenzulassung

## User Preferences

- Premium design aesthetic
- Multi-language support (German, English, Russian, Ukrainian, Arabic)
- AI assistant with medical disclaimer logic
- Teal/turquoise color palette

## System Architecture

### Frontend Architecture
Static multi-page architecture with HTML, CSS, and JavaScript.

**Key files:**
- `index.html` - Home page with hero, services overview, highlights strip
- `leistungen.html` - Detailed services page (SGB V treatment + §37.3 advisory)
- `ueber-uns.html` - About page with qualifications profile
- `kontakt.html` - Contact page with phone/email/WhatsApp/address
- `impressum.html` - Legal imprint (German-only, standard practice)
- `datenschutz.html` - Privacy policy (German-only, standard practice)
- `style.css` - Premium glassmorphism styling
- `script.js` - Language switching, navigation, chat functionality
- `translations.js` - Complete translations for all 5 languages (~900 lines)

### Backend Architecture
- `server.js` - Node.js HTTP server with AI chat API endpoint
- Uses Replit AI Integration (OpenAI gpt-4o) for language-aware chat responses
- Serves static files on port 5000

### Design System
- **Colors:** Teal primary (#2a9d8f), Dark teal (#1e7a6e), Secondary (#264653)
- **Glassmorphism:** Blur effects, transparent backgrounds, subtle borders
- **Animations:** Floating AI badge, card hover effects, smooth transitions
- **Typography:** Inter font family
- **Logo:** `attached_assets/IMG_20251224_204554_946_1766605607682.jpg`

### Multilingual System
- Languages: German (DE), English (EN), Russian (RU), Ukrainian (UA), Arabic (AR)
- `data-i18n` attributes for all visible text content
- `data-i18n-placeholder` for input placeholders
- localStorage persistence for language preference
- RTL layout support for Arabic
- Dynamic HTML lang attribute updates
- All user-visible text is translatable (except Impressum/Datenschutz which stay German per legal convention)

### AI Assistant
- Floating badge in bottom-right corner
- Language-aware responses (responds in selected language)
- Medical disclaimer logic - never diagnoses
- Information about Ihor Liubchyk's services and qualifications
- Directs users to contact (+49 176 32755364) for professional help

## External Dependencies

- **Google Fonts API:** Inter font family
- **Replit AI Integration:** OpenAI gpt-4o for chat responses
- **WhatsApp Integration:** Direct messaging links (wa.me)
- **Google Maps:** Address link

## Development

Run with: `node server.js`
Website available on port 5000
