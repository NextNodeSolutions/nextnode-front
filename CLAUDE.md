# CLAUDE.md - Nextnode Front

This file provides guidance to Claude Code when working specifically with the Nextnode Front project.

## MCP Context7 Configuration

**IMPORTANT**: Always use MCP context7 server for documentation lookup in PRIORITY for the following technologies:

### Priority Documentation Sources (MCP Context7)

- **JavaScript/TypeScript**: Use MCP context7 docs for ES6+, TypeScript features, async/await patterns
- **Astro**: Use MCP context7 docs for Astro framework, SSR, islands architecture, middleware
- **React**: Use MCP context7 docs for React 19+, hooks, component patterns, testing
- **Tailwind CSS**: Use MCP context7 docs for Tailwind v4, utilities, configuration, custom styles
- **Node.js**: Use MCP context7 docs for Node.js APIs, modules, performance patterns
- **Vite**: Use MCP context7 docs for build configuration, plugins, optimization
- **Vitest**: Use MCP context7 docs for testing patterns, mocking, coverage
- **ESLint/Prettier**: Use MCP context7 docs for configuration, rules, formatting

When a user asks about any of these technologies, **ALWAYS query MCP context7 FIRST** before using general knowledge.

## Project Overview

**Nextnode Front** is the company homepage built with modern web technologies for optimal performance and developer experience.

### Technology Stack

- **Framework**: Astro 5+ (SSR mode with Node.js adapter)
- **UI Library**: React 19+ for interactive components
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite
- **Language**: TypeScript (strict configuration)
- **Testing**: Vitest with jsdom environment + @testing-library/react
- **Build**: Vite with Astro integration
- **Internationalization**: i18next (English/French support)

### Development Commands

```bash
# Development
pnpm dev                    # Start dev server on http://localhost:4321
pnpm build                  # Build for production (runs type check first)
pnpm preview               # Preview production build

# Code Quality
pnpm lint                  # Run ESLint with max warnings 0
pnpm lint:fix              # Auto-fix ESLint issues
pnpm format                # Format code with Prettier
pnpm type-check           # TypeScript type checking (astro sync + tsc)

# Testing
pnpm test                  # Run tests once
pnpm test:watch           # Run tests in watch mode
pnpm test:coverage        # Run tests with coverage report
pnpm test:ui              # Open Vitest UI
```

### Architecture

**Component Structure:**

- `/src/components/common/`: Reusable components
- `/src/components/layout/`: Layout components (header, footer)
- `/src/components/marketing/`: Marketing-specific components
- `/src/components/ui/`: Base UI components (Radix UI based)

**Key Files:**

- `astro.config.mjs`: Main Astro configuration
- `src/middleware.ts`: Request handling, metrics, logging
- `src/i18n/config.ts`: Internationalization setup
- `src/lib/metrics.ts`: Application metrics tracking

**Important Patterns:**

1. **File Extensions**: `.astro` for Astro components, `.tsx` for React components
2. **Imports**: Use path aliases (`@/*`) for internal imports
3. **TypeScript**: Strict mode with additional safety checks enabled
4. **i18n**: Translation keys in `public/locales/{lang}/common.json`
5. **SSR**: Server-side rendering configured for optimal performance

### Environment Variables

- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 4321)
- `URL`: Site URL for production

### Testing Strategy

- Unit tests with Vitest and jsdom
- Component testing with @testing-library/react
- Coverage reports generated to `coverage.json`
- Test files colocated with source files (`*.test.ts`)

### Deployment

- Configured for Fly.io deployment
- Docker support with multi-stage builds
- Health check endpoint: `/health`
- Metrics endpoint: `/metrics`
- Monitoring setup with Grafana dashboard

### Code Style

- ESLint with @nextnode/eslint-plugin
- Prettier formatting with Astro plugin
- Commitlint for conventional commit messages
- Husky for pre-commit hooks
- Lint-staged for staged file linting

## Template Synchronization

**IMPORTANT**: When making fixes or improvements to this project, also update `project-templates/apps/astro/` to ensure new generated projects benefit from the same improvements.
