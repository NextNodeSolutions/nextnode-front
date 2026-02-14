<!-- PROCESSED BY SWARM: fix-nextnode-standards — 2026-02-14T00:00:00Z -->
# NextNode Standards Compliance — nextnode-front

## Overview

Bring the `@nextnode/nextnode-front` project into full compliance with NextNode standards. The project already passes 9/15 checks. This spec covers the 5 remaining FAIL/MISSING items identified by the NextNode Standards Audit.

## Context

- **Project**: `@nextnode/nextnode-front` — Astro 5 marketing site for NextNode
- **Standards package**: `@nextnode/standards` v2.1.3
- **Linter**: Biome (extends `@nextnode/standards/biome`) — NOT oxlint
- **Formatter**: Prettier (extends `@nextnode/standards/prettier/astro`) — NOT oxfmt
- **Domain**: nextnode.fr
- **Project type**: app (SSR via `@astrojs/node`)

## Functional Requirements

### FR-1: Create `nextnode.toml`

Create the project metadata file at the repository root.

```toml
[project]
name = "nextnode-front"
type = "app"
domain = "nextnode.fr"
```

**Acceptance Criteria:**
- File exists at `./nextnode.toml`
- Contains `[project]` section with `name`, `type`, and `domain`
- `type` is `"app"`
- `domain` is `"nextnode.fr"`

### FR-2: Migrate lint-staged config to extend from standards

The current `.lintstagedrc.json` contains inline config. It must be replaced with a `lint-staged.config.js` that extends from `@nextnode/standards/lint-staged`.

**Current state** (`.lintstagedrc.json`):
```json
{
  "package.json": ["better-sort-package-json"],
  "*": ["pnpm lint", "pnpm format"]
}
```

**Required action:**
1. Delete `.lintstagedrc.json`
2. Create `lint-staged.config.js` that re-exports from `@nextnode/standards/lint-staged`
3. If the standards export does not include the `better-sort-package-json` rule, add it as a local override

**Acceptance Criteria:**
- `.lintstagedrc.json` no longer exists
- `lint-staged.config.js` exists and references `@nextnode/standards/lint-staged`
- `pnpm lint-staged` still works correctly (pre-commit hook passes)

### FR-3: Add `format:check` script to `package.json`

Add a `format:check` script that performs a dry-run format check (CI-friendly, no writes).

Since the project uses Prettier for formatting, the script should be:
```json
"format:check": "prettier --check ."
```

**Acceptance Criteria:**
- `package.json` contains `"format:check"` in `scripts`
- Running `pnpm format:check` exits 0 when all files are formatted
- Running `pnpm format:check` exits non-zero when files need formatting

### FR-4: Create CI pipeline (`.github/workflows/ci.yml`)

Create the GitHub Actions CI workflow using the reusable NextNode infrastructure pipeline.

The workflow must reference:
```
NextNodeSolutions/infrastructure/.github/workflows/pipeline.yml@main
```

**Acceptance Criteria:**
- `.github/workflows/ci.yml` exists
- References the reusable NextNode pipeline workflow
- Triggers on push to `main` and on pull requests

### FR-5: Create `docker-compose.yml`

Create a Docker Compose file for local development and deployment reference.

**Context:**
- The `Dockerfile` already exists with multi-stage build
- App port is 4321 (Astro default)
- The app uses SSR via `@astrojs/node`

**Acceptance Criteria:**
- `docker-compose.yml` exists at project root
- Contains a `services` block with the app service
- References the existing `Dockerfile`
- Maps port 4321
- Passes `docker compose config` validation

## Data Model

N/A — all changes are config/infrastructure files, no data model changes.

## Open Questions

None — all requirements are defined by the NextNode standards.
