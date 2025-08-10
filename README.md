# UG Podvelezje

[![Angular](https://img.shields.io/badge/Angular-19.2.14-DD0031?style=flat-square&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-007ACC?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8.0-B7178C?style=flat-square&logo=reactivex)](https://rxjs.dev/)
[![SCSS](https://img.shields.io/badge/SCSS-CSS3-CF649A?style=flat-square&logo=sass)](https://sass-lang.com/)
[![SSR](https://img.shields.io/badge/SSR-Angular_Universal-DD0031?style=flat-square)](https://angular.io/guide/universal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Modern, mobile-first responsive website for the citizens' association "UG Podvelezje" built with Angular 19 and SCSS. The project features Server-Side Rendering (SSR) with Angular Universal and follows Angular's official style guide.

## 🚀 Features

- **Server-Side Rendering (SSR)** using Angular Universal with client hydration
- **Mobile-first responsive design** with SCSS and breakpoint system
- **Lazy-loaded news module** for optimized performance
- **Component-based architecture** with reusable UI components
- **TypeScript strict mode** with proper type checking
- **Bosnian locale support** (bs) with proper date and number formatting
- **SEO optimized** structure and meta tags
- **Progressive Web App** ready architecture

## 🎨 Design System

- **Primary Color**: `#0f3727` (Dark green from logo)
- **Secondary Color**: `#e5ddbd` (Beige from logo)
- **Font Stack**: 'Roboto', 'Segoe UI', sans-serif
- **Breakpoints**: 576px (sm), 768px (md), 992px (lg), 1200px (xl)

## 📋 Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- **Angular CLI** (installed globally): `npm install -g @angular/cli`

## 🛠️ Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd ug-podvelezje

# Install dependencies
npm install

# Start development server
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change source files.

## 📜 Available Scripts

```bash
# Development
npm start              # Start development server
npm run watch          # Build and watch for changes

# Production
npm run build          # Build for production with SSR
npm run serve:ssr:ug-podvelezje  # Serve SSR build

# Testing
npm test               # Run unit tests
ng test               # Run tests with Angular CLI
```

## 🏗️ Project Architecture

### Routing Structure
- **Main Routes**: Home (`/`), About (`/about`), Contact (`/contact`), Projects (`/projects`), Heroes (`/heroes`)
- **Lazy-loaded Module**: News module (`/news`) with child routes for list and detail views
- **Dynamic Routes**: Project details at `/projects/:id`
- **Fallback**: Undefined routes redirect to home

### Component Structure
```
src/app/
├── components/          # Reusable UI components
│   ├── navbar/          # Main navigation with mobile support
│   ├── hero/            # Hero section with slideshow
│   ├── footer/          # Site footer
│   ├── contact/         # Contact form component
│   ├── join-us/         # Membership information & form
│   ├── projects/        # Projects showcase
│   ├── project-detail/  # Individual project details
│   ├── membership-form/ # Membership registration form
│   └── scroll-to-top/   # Scroll to top utility
├── pages/               # Page-level components
│   ├── home/            # Landing page
│   ├── about/           # About us page
│   ├── contact/         # Contact page
│   └── heroes/          # Heroes page
├── news/                # Lazy-loaded news module
│   ├── news-list/       # News listing with pagination
│   ├── news-detail/     # Individual news article
│   └── news-card/       # News preview card
├── services/            # Application services
├── interfaces/          # TypeScript interfaces
└── pipes/               # Custom pipes
```

### Services & Data Management
- **NewsService**: News data with pagination, filtering, and search
- **ProjectsService**: Project data with category and status filtering
- **HeroesService**: Heroes data management
- **HeroSlideshowService**: Hero section slideshow control
- **BrowserService**: Browser detection utilities

All services use mock data for static content delivery without backend dependencies.

### SCSS Architecture
```
src/styles/
├── abstracts/
│   ├── _variables.scss  # Design tokens, colors, spacing
│   └── _mixins.scss     # Reusable SCSS mixins
├── base/
│   ├── _reset.scss      # CSS reset
│   └── _typography.scss # Typography definitions
└── components/          # Component-specific styles
```

## 🧪 Testing

The project uses Jasmine and Karma for unit testing:

```bash
# Run tests once
npm test

# Run tests in watch mode
ng test

# Generate code coverage
ng test --code-coverage
```

## 🌐 Deployment

The project is configured for SSR deployment:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Serve the SSR application**:
   ```bash
   npm run serve:ssr:ug-podvelezje
   ```

The built application will be available in the `dist/` directory.

## 🔧 Development Guidelines

### Code Quality
- Use TypeScript strict mode
- Follow Angular style guide
- Implement proper error handling
- Use reactive forms for user input
- Apply OnPush change detection where beneficial

### Performance Optimization
- Lazy load feature modules
- Use `trackBy` functions with `*ngFor`
- Optimize images with proper sizing
- Implement proper caching strategies

### Mobile-First Approach
- Design for mobile screens first
- Use CSS Grid and Flexbox for layouts
- Test across different screen sizes
- Ensure touch-friendly interactions

## 📦 Dependencies

### Core Dependencies
- **Angular 19.2.14** - Main framework
- **RxJS 7.8.0** - Reactive programming
- **TypeScript 5.7.2** - Type-safe JavaScript
- **Zone.js 0.15.0** - Change detection
- **Express 4.18.2** - SSR server

### Development Dependencies
- **Angular CLI 19.2.14** - Build tooling
- **Jasmine & Karma** - Testing framework
- **Angular DevKit** - Build tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**UG Podvelezje** - Citizens' Association

For questions about this project or the organization, please use the contact form on the website.
