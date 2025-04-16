# UG Podvelezje

Modern, mobile-first responsive website for the citizens' association "UG Podvelezje" built with Angular and SCSS.

## Features

- Server-Side Rendering (SSR) using Angular Universal
- Mobile-first responsive design
- Component-based architecture
- Optimized for performance and SEO

## Design Tokens

- **Primary Color**: #043C2F
- **Secondary Color**: #DFD5BA

## Development Setup

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ug-podvelezje

# Install dependencies
npm install
```

### Development Server

```bash
# Run the development server
npm run dev
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
# Build for production with SSR
npm run build:ssr
```

### Running in Production Mode

```bash
# Start the SSR server
npm run serve:ssr
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # Services
│   │   ├── assets/            # Static assets
│   │   ├── styles/            # Global styles
│   │   │   ├── abstracts/    # Variables, mixins
│   │   │   ├── base/         # Base styles
│   │   │   ├── components/   # Component styles
```

## Features Implemented

- Hero section with image slideshow
- Responsive navigation with mobile menu
- Mobile-first, responsive layout

## License

This project is licensed under the MIT License.
