# Ralph Agent Instructions - NextNode Front

You are an autonomous coding agent working on the nextnode-front project.

## Project Context

- **Stack**: Astro 5, React 19, TypeScript (strict), Tailwind v4
- **Linter**: Biome (not ESLint)
- **Testing**: Vitest
- **Package Manager**: pnpm
- **Logger**: `@nextnode/logger`

### Path Aliases

- `@/*` - src directory
- `@/types/*` - type definitions

### Color Tokens

- `nextnode-*` - brand colors
- `accent-*` - accent colors

## Your Task

1. Read the PRD at `prd.json` (in the same directory as this file)
2. Read the progress log at `progress.txt` (check Codebase Patterns section first)
3. Check you're on the correct branch from PRD `branchName`. If not, check it out or create from main.
4. Pick the **highest priority** user story where `passes: false`
5. Implement that single user story
6. Run quality checks (see below)
7. Update CLAUDE.md files if you discover reusable patterns (see below)
8. If checks pass, commit ALL changes with message: `feat: [Story ID] - [Story Title]`
9. Update the PRD to set `passes: true` for the completed story
10. Append your progress to `progress.txt`

## Quality Checks (MANDATORY)

Run these commands in order. ALL must pass before committing:

```bash
pnpm type-check    # astro check + tsc --noEmit
pnpm lint          # biome check
pnpm test          # vitest
pnpm build         # full build verification
```

If any check fails:

1. Fix the issue
2. Re-run all checks
3. Only commit when ALL pass

## Code Conventions

### TypeScript

- **NO `any` type** - use proper types or `unknown`
- Strict mode is enabled
- Export types from component files when needed

### Astro Components

- Use `.astro` extension for Astro components
- Use TypeScript in frontmatter: `---` blocks
- Props interface at top of frontmatter

### Tailwind v4

- Use `@apply` sparingly
- Prefer utility classes directly
- Use `nextnode-*` and `accent-*` color tokens

### Logging

```typescript
import { logger } from '@nextnode/logger'
logger.info('message', { context })
```

## Progress Report Format

APPEND to progress.txt (never replace, always append):

```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered
  - Gotchas encountered
  - Useful context
---
```

## Consolidate Patterns

If you discover a **reusable pattern**, add it to the `## Codebase Patterns` section at the TOP of progress.txt:

```
## Codebase Patterns
- Example: Use `@/components/ui` for shared UI components
- Example: i18n keys follow `section.component.key` pattern
- Example: SEO props are passed via `seo` prop to Layout
```

## Update CLAUDE.md Files

Before committing, check if edited files have learnings worth preserving in nearby CLAUDE.md files:

1. Identify directories with edited files
2. Check for existing CLAUDE.md in those directories
3. Add valuable, reusable learnings (not story-specific details)

## Browser Testing (If Available)

For UI changes, verify in browser if tools are available:

1. Navigate to the relevant page
2. Verify UI changes work
3. Note in progress report if manual verification needed

## Stop Condition

After completing a user story, check if ALL stories have `passes: true`.

If ALL stories are complete:
<promise>COMPLETE</promise>

If stories remain with `passes: false`, end normally (next iteration continues).

## Important

- Work on ONE story per iteration
- Commit frequently
- Keep all quality checks passing
- Read Codebase Patterns in progress.txt before starting
