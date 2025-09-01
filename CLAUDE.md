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

### Middleware Request Flow

1. **URL mapping**: Handles locale prefixes and internal navigation
2. **I18n initialization**: Sets up translation context per request
3. **Metrics collection**: Records page views and response times
4. **Error tracking**: Logs structured request/response data

### Workflow Journey Component

- **Complex interactive visualization** in `src/components/features/workflow/`
- **SVG animations** with coordinated state management
- **Modal system** for step details with keyboard navigation
- **Mobile responsive** with separate timeline component

### Build Process

1. `astro check` validates Astro components and routing
2. TypeScript compilation with strict mode
3. Tailwind CSS processing with v4 features
4. Vite bundling with custom chunk strategy
5. Node.js adapter for standalone deployment

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.