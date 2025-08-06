# Nature Lovers - Gardening Services Website

## Overview

Nature Lovers is a professional gardening services website that offers landscaping, plant care, and premium plant sales. The site provides a comprehensive platform for customers to explore gardening services, purchase plants, register for services, and contact the business. Built as a modern, responsive static website with integrated email functionality for customer communication and lead generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a **multi-page static website architecture** using vanilla HTML, CSS, and JavaScript. Key design decisions include:

- **Static HTML Pages**: Five main pages (index, services, plants, register, contact) for clear content separation and SEO optimization
- **Responsive Design**: Mobile-first CSS approach using CSS Grid and Flexbox for cross-device compatibility
- **Component-Based CSS**: Modular CSS structure with CSS custom properties (variables) for consistent theming
- **Progressive Enhancement**: Core functionality works without JavaScript, with enhanced features added via JS

### Styling System
- **CSS Variables**: Centralized color scheme, typography, and spacing for maintainable theming
- **Design Tokens**: Predefined color palette (primary green themes, secondary colors, gradients)
- **Typography**: Poppins font family with standardized font-size and weight scales
- **Component Methodology**: BEM-like naming convention for CSS classes

### JavaScript Architecture
- **Modular Structure**: Separate files for different concerns (script.js for UI, email.js for communication)
- **Event-Driven**: DOM manipulation through event listeners for navigation, forms, and user interactions
- **Form Handling**: Client-side validation and submission processing

### Email Integration Pattern
- **EmailJS Integration**: Third-party service for client-side email sending without backend server
- **Template-Based**: Predefined email templates for registration and contact forms
- **Configuration Object**: Centralized email settings for easy maintenance

## External Dependencies

### Frontend Libraries
- **Google Fonts**: Poppins font family for consistent typography
- **Font Awesome**: Icon library (v6.0.0) for UI icons and visual elements

### Email Service Integration
- **EmailJS**: Client-side email service for form submissions and customer communication
  - Service handles contact form submissions
  - Registration form processing
  - Template-based email generation
  - No server-side email infrastructure required

### Content Delivery Networks
- **Google Fonts CDN**: Typography assets delivery
- **Cloudflare CDN**: Font Awesome icons delivery
- **jsDelivr CDN**: EmailJS library delivery

### Browser APIs
- **DOM API**: Core JavaScript functionality for page interactions
- **FormData API**: Form processing and data extraction
- **Local Storage**: Potential client-side data persistence (future enhancement)

The architecture prioritizes simplicity, performance, and ease of deployment while providing a professional user experience for a gardening services business.