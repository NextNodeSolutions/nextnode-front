# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the **nextnode-front** project.

## Project Overview

Main Astro web application with React components, TypeScript, Tailwind CSS, and internationalization. Part of the NextNode multi-repository ecosystem.

## Context7 MCP - Documentation Priority

**CRITICAL**: Always prioritize Context7 MCP for accessing up-to-date official documentation when available.

### Usage Protocol - MANDATORY AUTOMATIC BEHAVIOR

**Claude MUST automatically use Context7 for ANY question about supported technologies without user prompting**

1. **AUTOMATICALLY invoke Context7** when working with any listed technology
2. **NO user prompt required** - Context7 usage is mandatory and transparent
3. **Prioritize official documentation** through Context7 over general knowledge
4. **If Context7 unavailable**, fall back to general knowledge with notification

### Priority Technologies for Context7 (nextnode-front specific) ✅

- **Astro 5.x**: Framework features, SSR, islands architecture, middleware, i18n ✅
- **React 19.x**: Hooks, component patterns, testing, concurrent features ✅
- **TypeScript**: Latest features, strict configuration, generics, utility types ✅
- **Tailwind CSS 4.x**: Utilities, configuration, responsive design, plugins ✅
- **Vite**: Build configuration, plugins, optimization, rollup options ✅
- **Vitest**: Testing patterns, mocking, coverage, jsdom environment ✅
- **i18next**: Internationalization, server-side rendering, route handling ✅
- **Node.js**: Runtime APIs, performance optimization, server configuration ✅
- **ESLint/Prettier**: Configuration, rules, formatting, plugin development ✅

## Essential Commands

**Package Manager**: pnpm

### Development

```bash
pnpm dev          # Start development server
pnpm build        # Type check and build
pnpm preview      # Preview built application
```

### Testing

```bash
pnpm test                    # Run all tests
pnpm test:watch             # Run tests in watch mode
pnpm test:coverage          # Run tests with coverage
pnpm vitest run path/to/test.test.ts  # Run single test file
```

### Code Quality (ALWAYS run before finishing work)

```bash
pnpm lint         # ESLint with zero warnings tolerance
pnpm type-check   # TypeScript type checking (REQUIRED)
pnpm format       # Prettier formatting
pnpm build        # Full build when necessary
```

## TypeScript Standards (STRICTLY ENFORCED)

- **TypeScript is MANDATORY** - all code must be properly typed
- **Use generics** when appropriate but keep them simple, concise, and descriptive
- **NEVER use `any`** - absolutely forbidden
- **NEVER use `as`** except for `as const`
- **Use `unknown` only as last resort** when type is truly unknowable
- Prefer explicit type annotations over inference for public APIs
- Use proper generic constraints and conditional types when needed

## Architecture Overview

### Tech Stack

- **Framework**: Astro 5.x with server-side rendering
- **UI**: React 19.x for interactive components
- **Styling**: Tailwind CSS 4.x with custom utilities
- **i18n**: Built-in Astro i18n with manual routing
- **State**: React hooks only (no global state management)
- **Testing**: Vitest with jsdom environment

### Project Structure

```
src/
├── components/          # React/Astro components
│   ├── common/         # Shared utilities
│   ├── features/       # Feature-specific components
│   ├── layout/         # Site structure
│   └── ui/            # Reusable UI components
├── pages/             # File-based routing with i18n
├── lib/               # Utilities and configurations
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── styles/            # Global CSS and animations
```

### Internationalization

- **Framework**: Astro's built-in i18n with manual routing
- **Languages**: English (default) and French
- **URL Structure**: Automatic locale routing with middleware
- **Server-side**: Translation handling in middleware
- **Client-side**: Language switching with localStorage

### Component Architecture

- **Hybrid approach**: Astro for static, React for interactivity
- **Design system**: BaseCard variants using class-variance-authority
- **Type-safe props**: All components fully typed with TypeScript
- **Accessibility**: ARIA compliance throughout

### Key Patterns

#### Custom Hooks

- Always return properly typed objects/tuples
- Use `useCallback` for function references
- Example: `useWorkflowModal(): UseWorkflowModalReturn`

#### Component Props

```typescript
interface ComponentProps {
	title: string
	variant?: 'primary' | 'secondary'
	children: React.ReactNode
}
```

#### API Routes

- Located in `src/pages/` (health.ts, metrics.ts)
- Type API responses with proper interfaces
- Use `APIRoute` type from Astro

### Performance & Monitoring

- Custom metrics system with Prometheus endpoint at `/metrics`
- Health checks at `/health`
- Request/response timing in middleware
- Memory and performance monitoring

### Configuration Files

- **astro.config.mjs**: SSR, integrations, i18n setup
- **vitest.config.ts**: Test configuration with jsdom
- **eslint.config.mjs**: Uses `@nextnode/eslint-plugin/base`
- **tsconfig.json**: Strict TypeScript configuration

## Development Guidelines

### Before Finishing Any Work

1. **Always run** `pnpm lint` - must pass with zero warnings
2. **Always run** `pnpm type-check` - must pass completely
3. **Run** `pnpm build` when making structural changes
4. **Never use** `pnpm dev` for final testing

### Adding New Features

1. Create properly typed components in appropriate `src/components/` subdirectory
2. Define TypeScript interfaces in `src/types/` if shared
3. Add translations for both languages
4. Write tests with full type coverage
5. Follow existing component patterns and naming conventions

### Code Quality Rules

- **Prettier config**: Tabs (width: 4), no semicolons, single quotes
- **ESLint**: Zero warnings tolerance - build will fail otherwise
- **Git hooks**: Husky enforces linting and conventional commits
- **Type safety**: Every function, component, and variable must be typed

### Testing

- Use Vitest with React Testing Library
- Test files co-located with components or in `__tests__`
- Mock external dependencies properly with TypeScript
- Maintain test coverage above 80%

## Deployment

- **Platform**: Fly.io with Docker
- **Environment**: Node.js standalone mode
- **Region**: Paris (CDG)
- **Health checks**: Built-in monitoring endpoints

## Related Projects

- See [../CLAUDE.md](../CLAUDE.md) for multi-repo overview
- Templates available in [../project-templates/](../project-templates/)
- CI/CD workflows in [../github-actions/](../github-actions/)
