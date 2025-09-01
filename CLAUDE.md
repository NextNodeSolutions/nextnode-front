# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development Workflow

```bash
# Start development server with hot reload
pnpm dev

# Build for production (includes astro check)
pnpm build

# Preview production build locally
pnpm preview
```

### Code Quality Pipeline

Run these commands in order after development work:

```bash
# 1. Lint code with @nextnode/eslint-plugin
pnpm lint

# 2. Type checking (Astro + TypeScript)
pnpm type-check

# 3. Run test suite
pnpm test

# 4. Test with coverage reports
pnpm test:coverage
```

### Testing Commands

```bash
# Watch mode for active development
pnpm test:watch

# Interactive test UI
pnpm test:ui

# Fast type check (skips astro check)
pnpm type-check:fast
```

## Architecture Overview

### Core Technology Stack

- **Astro 5.x** with React integration for selective hydration
- **Tailwind CSS v4** for styling with design tokens
- **TypeScript** in strict mode throughout
- **Vitest** for testing with jsdom environment
- **Node.js adapter** for standalone server deployment

### Key Architectural Patterns

#### 1. Internationalization (i18n) System

- **Manual routing**: URLs like `/en/page` and `/fr/page`
- **Middleware-driven**: `src/middleware.ts` handles locale detection and URL mapping
- **Unified t() function**: Works both server-side (Astro) and client-side (React)
- **Translation files**: Structured dictionaries in `src/i18n/locales/`
- **Context injection**: Middleware injects `locale` and `t` into `context.locals`

#### 2. Configuration Management

- **Environment-based configs**: JSON files in `config/{dev,prod,test}.json`
- **Type-safe access**: Via `src/lib/config/` with dot notation (`getConfig('email.from')`)
- **Runtime loading**: Dynamic config resolution based on NODE_ENV

#### 3. Component Organization

```
src/components/
├── common/          # Shared utility components
├── features/        # Business logic components
│   ├── marketing/   # Marketing-related features
│   ├── workflow/    # Complex workflow visualizations
│   └── pricing/     # Pricing page components
├── layout/          # Header, footer, navigation
└── ui/             # Base design system components
```

#### 4. State Management

- **React hooks**: Custom hooks in `src/hooks/` for client-side state
- **Modal management**: Centralized modal state with `useModalState`
- **Keyboard shortcuts**: `useKeyboardShortcuts` for accessibility
- **No external state library**: Pure React patterns

#### 5. Email System

- **React Email**: Components in `emails/` directory
- **Resend integration**: Production email delivery
- **Template system**: Reusable email components with type safety
- **API endpoint**: `/api/send-email.ts` for form submissions

### Performance Optimizations

#### Bundle Splitting (astro.config.mjs)

- **Vendor chunks**: React, Radix UI, utilities separated
- **Feature-based splitting**: Workflow and marketing components
- **Icon isolation**: Lucide React in separate chunk

#### SSR + Selective Hydration

- **Server-side rendering** for initial page load
- **Client components** only when interactivity needed
- **Progressive enhancement** approach

### Development Patterns

#### Import Standards

- **ES modules only**: Never use `require()`
- **Arrow functions**: `const fn = () => {}` preferred
- **Destructuring**: Used extensively for clean code
- **Strong typing**: No `any` types allowed, minimal `unknown`

#### Component Patterns

- **Astro components**: `.astro` for static/SSR content
- **React components**: `.tsx` for interactive features
- **Props interfaces**: Defined per component with TypeScript
- **Tailwind composition**: Design tokens via CSS custom properties

#### Testing Strategy

- **Component testing**: React Testing Library + Vitest
- **Integration tests**: For complex features like workflow journey
- **Type testing**: Via TypeScript compilation
- **Coverage tracking**: V8 provider with JSON output

## Environment Configuration

### Required Environment Variables

- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 4321)
- `URL`: Public site URL for canonical links

### Config Files Structure

```
config/
├── default.json     # Base configuration
├── dev.json         # Development overrides
├── prod.json        # Production settings
└── test.json        # Test environment
```

### TypeScript Definitions Structure

```
types/
├── config.d.ts      # Configuration type definitions
├── env.d.ts         # Environment and Astro global types
├── global.d.ts      # Global type definitions
└── plans.ts         # Pricing plan type definitions
```

## Common Development Workflows

### Adding New Features

1. Create components in appropriate `src/components/features/` subdirectory
2. Add translations to both `en/` and `fr/` locale files
3. Update routing in `src/pages/[locale]/` if needed
4. Add tests in same directory as component
5. Run quality pipeline: `pnpm lint && pnpm type-check && pnpm test`

### Internationalization Updates

- Edit `src/i18n/locales/{en,fr}/` dictionary files
- Use dot notation keys (e.g., `home.hero.title`)
- Test with both `/en/` and `/fr/` URL prefixes
- Verify middleware locale detection works correctly

### Email Template Development

1. Create React Email component in `emails/` directory
2. Add to template exports in `src/lib/email/templates/index.ts`
3. Test rendering via `/api/send-email` endpoint
4. Configure Resend API key for production

## Critical Implementation Details

### Middleware Architecture (Recently Refactored)

The middleware system has been decomposed into specialized modules in `src/lib/middleware/`:

#### Core Middleware Modules

1. **`i18n.ts`**: Internationalization handling
    - Locale detection from URL path and Accept-Language header
    - Translation context setup for both Astro and React components
    - Fallback locale management

2. **`url-mapping.ts`**: URL path processing
    - Route mapping and normalization
    - Locale prefix handling (`/en/`, `/fr/`)
    - Internal navigation and redirects

3. **`logging.ts`**: Request/response logging
    - Structured request logging with correlation IDs
    - Error tracking and performance monitoring
    - Integration with @nextnode/logger

4. **`metrics.ts`**: Performance metrics collection
    - Page view tracking
    - Response time measurement
    - User interaction analytics

5. **`utils.ts`**: Shared middleware utilities
    - Common helper functions
    - Validation and parsing utilities
    - Error handling patterns

#### Middleware Request Flow

1. **URL processing**: Route normalization and locale extraction
2. **I18n setup**: Language detection and translation context injection
3. **Metrics collection**: Performance tracking and analytics
4. **Logging**: Structured request/response logging
5. **Context injection**: Middleware injects `locale` and `t` into `context.locals`

### Workflow Journey Component

- **Complex interactive visualization** in `src/components/features/workflow/`
- **SVG animations** with coordinated state management
- **Modal system** for step details with keyboard navigation
- **Mobile responsive** with separate timeline component

### Build Process

1. `astro check` validates Astro components and routing
2. TypeScript compilation with strict mode (types/ directory)
3. Tailwind CSS v4 processing with design tokens
4. Vite bundling with custom chunk strategy
5. Node.js adapter for standalone deployment

### Deployment Configuration

#### Railway Platform

- **Configuration**: `railway.toml` with Docker builder
- **Health checks**: Built-in endpoint monitoring at `/`
- **Restart policies**: Automatic failure recovery
- **Environment**: Production-optimized settings
- **Watch patterns**: Optimized file change detection

#### Docker Multi-stage Build

- **Base stage**: Node.js environment setup
- **Build stage**: Dependency installation and compilation
- **Production stage**: Optimized runtime with minimal footprint
- **Health check**: Integrated container health monitoring

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
