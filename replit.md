# Sannovia Pflege

## Overview

Sannovia Pflege is a German healthcare services website that provides information about professional care and support services. The website serves as a digital presence for a care service provider, offering details about their ambulatory care, household assistance, and daily life support services. It's designed as a simple, professional website to help potential clients learn about services and make contact.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The website uses a **static multi-page architecture** with traditional HTML, CSS, and JavaScript. This approach was chosen for its simplicity, fast loading times, and ease of maintenance for a small business website.

**Key architectural decisions:**
- **Multi-page structure**: Separate HTML files for each main section (home, services, about, contact)
- **Shared styling**: Single CSS file (`style.css`) for consistent design across all pages
- **Fixed navigation**: Sticky header navigation for easy access to all sections
- **Mobile-first responsive design**: Uses viewport meta tags and flexible layouts
- **External font integration**: Google Fonts (Inter) for professional typography

### Backend Architecture
The backend uses a **minimal Node.js HTTP server** approach rather than a full framework. This was chosen to keep the deployment lightweight while still providing proper content serving.

**Key architectural decisions:**
- **Simple HTTP server**: Basic Node.js `http` module for serving static files
- **Route-based file serving**: Manual routing to serve appropriate HTML files based on URL paths
- **Cache prevention**: Headers set to prevent caching issues in development/iframe environments
- **Single port deployment**: Runs on port 5000 with external accessibility

### Content Strategy
- **Image integration**: Uses Unsplash API for high-quality stock photography
- **German localization**: All content and UI elements are in German language
- **Service-focused content**: Three main service categories with visual cards
- **Contact integration**: Multiple contact methods (phone, email, WhatsApp)

### Styling Approach
- **Modern CSS practices**: CSS Grid and Flexbox for layouts
- **Color scheme**: Healthcare-appropriate blue color palette (#0077b6, #023e8a)
- **Typography hierarchy**: Inter font family with multiple weights
- **Visual effects**: Gradient overlays, subtle shadows, and smooth transitions

## External Dependencies

### Third-party Services
- **Google Fonts API**: Provides the Inter font family for consistent typography
- **Unsplash Images API**: Supplies high-quality stock photography for healthcare/care contexts
- **WhatsApp Integration**: Direct links to WhatsApp messaging for instant contact

### Content Delivery
- **External image hosting**: All images served from Unsplash CDN for performance
- **Font delivery**: Google Fonts CDN for web font loading
- **No database**: Static content approach eliminates need for database systems

### Development Dependencies
- **Node.js runtime**: Required for the simple HTTP server
- **No build process**: Direct serving of static files without compilation steps
- **No package manager dependencies**: Pure Node.js implementation without external npm packages