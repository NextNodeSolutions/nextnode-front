# Buio Template Migration - Technical Specification

> **Final Location**: `scripts/ralph/specs/buio-migration.md`
> **PRD Strategy**: This spec will be split into multiple PRDs for Ralph execution

## Overview

Migration of the buio template into nextnode-front while preserving existing infrastructure, applying NextNode brand standards, and ensuring 100% coverage with comprehensive TDD tests.

**Source**: `/Users/walid/Development/templates/buio`
**Target**: `/Users/walid/Development/SaaS/nextnode-front`
**Branch**: `feature/buio-template-adaptation`

## Implementation Plan

1. **Copy this spec** to `scripts/ralph/specs/buio-migration.md`
2. **Run spec-to-PRD agent** to split into multiple PRDs
3. **Execute PRDs sequentially** with Ralph

---

## Decision Summary

| Category     | Decision                                           |
| ------------ | -------------------------------------------------- |
| Framework    | Keep Astro 5 (both projects use it)                |
| Colors       | Keep NextNode colors, remap buio components        |
| CDN deps     | Internalize all (aos, fuse.js, keen-slider) as npm |
| Fonts        | Self-host (Geist, Geist Mono, EB Garamond)         |
| Components   | Adopt buio atomic structure, best variant only     |
| Layouts      | Adopt all 11 buio layouts                          |
| Animations   | Keep all AOS animations                            |
| Decoratives  | Import all SVG shapes/blobs                        |
| Navigation   | Adopt buio nav (dropdowns, no search)              |
| Footer       | Adopt buio footer (with newsletter)                |
| Search       | Remove entirely                                    |
| Logging      | Full @nextnode/logger coverage                     |
| Tests        | TDD with render + props + responsive coverage      |
| SEO          | Adopt @astrolib/seo setup                          |
| Content      | Placeholder text (copywriting later)               |
| Code quality | Apply @nextnode/standards immediately              |
| Priority     | High - ASAP                                        |

---

## Pages to Import

### Marketing Pages

- `/` - Homepage (Hero -> Features -> Stats -> Testimonials -> Pricing -> FAQ -> CTA)
- `/index-two` - Alternative homepage variant
- `/contact` - Contact form page
- `/pricing` - Single pricing page (one component variant)

### Design System Pages

- `/system/overview` - Design system overview
- `/system/buttons` - Button variants showcase
- `/system/colors` - Color palette reference
- `/system/link` - Link styles
- `/system/typography` - Typography scales

### Content Collection Pages

- `/helpcenter/` - Help center listing
- `/helpcenter/[...slug]` - Individual help articles
- `/helpcenter/status` - Status page
- `/team/` - Team listing
- `/team/[...slug]` - Team member profiles
- `/jobs/` - Jobs listing
- `/jobs/[...slug]` - Job postings
- `/customers/` - Customer case studies
- `/customers/[...slug]` - Individual customer stories
- `/changelog/` - Changelog listing
- `/changelog/[...slug]` - Changelog entries
- `/legal/[...slug]` - Legal pages (privacy, terms)

### Error Pages

- `/404` - Custom 404 page

### Pages NOT Imported

- `/sign-in`, `/sign-up` (auth UI)
- `/blog/*` (blog system)
- `/integrations/*`
- `/whitepaper/*`
- `/components/all-features`, `/components/all-pricing`

---

## Content Collections to Import

| Collection | Schema Fields                                  | Notes           |
| ---------- | ---------------------------------------------- | --------------- |
| helpcenter | title, description, category, pubDate          | Help articles   |
| team       | name, role, bio, image, social links           | Team members    |
| jobs       | title, department, location, type, description | Job postings    |
| customers  | name, logo, industry, quote, caseStudy         | Case studies    |
| changelog  | version, date, type, description               | Product updates |
| legal      | title, lastUpdated, content                    | Legal documents |

**NOT imported**: posts, integrations, whitepaper

---

## Component Import Specification

### Foundation Layer (`/components/fundations/`)

#### Elements

| Component    | Import | Notes                                                       |
| ------------ | ------ | ----------------------------------------------------------- |
| Button.astro | Yes    | Variants: default, accent, muted, link, none. Sizes: xxs-xl |
| Text.astro   | Yes    | 14+ typography variants                                     |

#### Containers

| Component     | Import | Notes                             |
| ------------- | ------ | --------------------------------- |
| Wrapper.astro | Yes    | Variants: standard, narrow, prose |

#### Head Components

| Component      | Import | Notes                                             |
| -------------- | ------ | ------------------------------------------------- |
| BaseHead.astro | Yes    | Core head setup                                   |
| Fonts.astro    | Yes    | **Modify**: self-host fonts instead of Google CDN |
| Favicons.astro | Yes    | Favicon configuration                             |
| Meta.astro     | Yes    | Meta tags                                         |
| Seo.astro      | Yes    | @astrolib/seo integration                         |

#### Icons

| Component          | Import | Notes            |
| ------------------ | ------ | ---------------- |
| Menu.astro         | Yes    | Mobile menu icon |
| Close.astro        | Yes    | Close icon       |
| ChevronLeft.astro  | Yes    | Navigation       |
| ChevronRight.astro | Yes    | Navigation       |
| Plus.astro         | Yes    | FAQ accordion    |
| Search.astro       | No     | Search removed   |

#### Scripts

| Component        | Import | Notes                                      |
| ---------------- | ------ | ------------------------------------------ |
| AosHead.astro    | Yes    | **Modify**: import from npm instead of CDN |
| AosBody.astro    | Yes    | **Modify**: import from npm instead of CDN |
| FuseJS.astro     | No     | Search removed                             |
| KeenSlider.astro | Yes    | **Modify**: import from npm instead of CDN |

### Global Components (`/components/global/`)

| Component        | Import | Notes                                    |
| ---------------- | ------ | ---------------------------------------- |
| Navigation.astro | Yes    | With dropdowns, **remove search button** |
| MobileNav.astro  | Yes    | CSS grid animation                       |
| Footer.astro     | Yes    | With newsletter signup                   |
| Search.astro     | No     | Search functionality removed             |

### Section Components (Best Variant Only)

| Category     | Variant      | File                              |
| ------------ | ------------ | --------------------------------- |
| Headers      | Hero1        | `headers/Hero1.astro`             |
| Features     | Feature1     | `features/Feature1.astro`         |
| Features     | Feature2     | `features/Feature2.astro`         |
| Features     | Feature3     | `features/Feature3.astro`         |
| Features     | Work         | `features/Work.astro`             |
| Pricing      | Pricing1     | `pricing/Pricing1.astro`          |
| Testimonials | Testimonial1 | `testimonials/Testimonial1.astro` |
| Testimonials | LogoCloud1   | `testimonials/LogoCloud1.astro`   |
| Stats        | Stats1       | `stats/Stats1.astro`              |
| FAQs         | Faq1         | `faqs/Faq1.astro`                 |
| CTAs         | Cta1         | `ctas/Cta1.astro`                 |

### Content Components

| Category     | Components                         | Notes                      |
| ------------ | ---------------------------------- | -------------------------- |
| blog         | BlogCard.astro, Subscribe.astro    | **Skip** - no blog         |
| changelog    | ChangelogCard.astro                | Import                     |
| customers    | CustomerCard.astro                 | Import                     |
| team         | TeamCard.astro                     | Import                     |
| jobs         | JobCard.astro, Cta.astro           | Import                     |
| helpcenter   | HelpCenterCard.astro, Status.astro | Import                     |
| integrations | IntegrationCard.astro              | **Skip** - no integrations |

### Asset Components

| Component          | Import | Notes                         |
| ------------------ | ------ | ----------------------------- |
| Logo.astro         | Yes    | **Modify**: use NextNode logo |
| Shapes/decoratives | Yes    | All SVG decorative elements   |

---

## Layout Import Specification

| Layout                   | Import | Purpose                     |
| ------------------------ | ------ | --------------------------- |
| BaseLayout.astro         | Yes    | Root layout with nav/footer |
| ChangelogLayout.astro    | Yes    | Changelog pages             |
| CustomersLayout.astro    | Yes    | Customer case studies       |
| HelpCenterLayout.astro   | Yes    | Help center pages           |
| JobsLayout.astro         | Yes    | Job listings                |
| LegalLayout.astro        | Yes    | Legal pages                 |
| SplashLayout.astro       | Yes    | Pages without nav/footer    |
| TeamLayout.astro         | Yes    | Team pages                  |
| BlogLayout.astro         | No     | No blog                     |
| IntegrationsLayout.astro | No     | No integrations             |
| WhitepaperLayout.astro   | No     | No whitepapers              |

---

## Technical Modifications

### 1. Color Token Remapping

**buio tokens -> nextnode tokens**

```css
/* Map buio's purple/cyan to nextnode's sky/pink */
--color-primary-* -> nextnode-* (sky blue)
--color-accent-* -> accent-* (pink/magenta)

/* Preserve OKLCH format but with nextnode values */
```

**Files to modify**: All imported components with color classes

### 2. Font Self-Hosting

**Download and bundle**:

- Geist (variable, 100-900)
- Geist Mono (variable, 100-900)
- EB Garamond (variable, 400-800, italic)

**Location**: `/public/fonts/`

**Modify**: `Fonts.astro` to use local `@font-face` declarations

### 3. CDN Internalization

| Library     | CDN URL                                | npm Package   | Version |
| ----------- | -------------------------------------- | ------------- | ------- |
| AOS         | unpkg.com/aos@2.3.1                    | `aos`         | ^2.3.4  |
| Fuse.js     | cdn.jsdelivr.net/npm/fuse.js@7.1.0     | Skip          | -       |
| Keen Slider | cdn.jsdelivr.net/npm/keen-slider@6.8.6 | `keen-slider` | ^6.8.6  |

**Modify**: Script components to import from node_modules

### 4. Search Removal

**Remove**:

- `Search.astro` component
- Search icon from Navigation.astro
- FuseJS.astro script
- All search-related event handlers

### 5. Logger Integration

Add `@nextnode/logger` to:

- All layouts (page load logging)
- Navigation component (route tracking)
- Form components (submission logging)
- Error boundaries (error logging)

**Pattern**:

```typescript
import { logger } from '@nextnode/logger'

const log = logger.withPrefix('component:ComponentName')
log.info('Component mounted', { props })
```

---

## Image Assets

### Import All (66 files)

**Directory structure**:

```
/src/images/
├── brands/     # Partner/client logos (SVG)
├── logos/      # Product logos
├── team/       # Team photos (placeholder)
├── avatar/     # Avatar images
├── changelog/  # Changelog images
├── assets/     # Decorative assets
```

### Modifications

- Replace buio logo with NextNode logo
- Keep all other images as placeholders

---

## Testing Specification

### Coverage Requirements

Each component requires tests for:

1. **Render**: Component renders without errors
2. **Props**: All prop variations work correctly
3. **Responsive**: Breakpoint behavior (sm, md, lg)

### Test File Structure

```
/tests/
├── components/
│   ├── fundations/
│   │   ├── Button.test.ts
│   │   ├── Text.test.ts
│   │   └── Wrapper.test.ts
│   ├── global/
│   │   ├── Navigation.test.ts
│   │   ├── MobileNav.test.ts
│   │   └── Footer.test.ts
│   ├── headers/
│   │   └── Hero1.test.ts
│   ├── features/
│   │   ├── Feature1.test.ts
│   │   ├── Feature2.test.ts
│   │   └── Feature3.test.ts
│   ├── pricing/
│   │   └── Pricing1.test.ts
│   ├── testimonials/
│   │   ├── Testimonial1.test.ts
│   │   └── LogoCloud1.test.ts
│   ├── stats/
│   │   └── Stats1.test.ts
│   ├── faqs/
│   │   └── Faq1.test.ts
│   └── ctas/
│       └── Cta1.test.ts
├── layouts/
│   ├── BaseLayout.test.ts
│   ├── ChangelogLayout.test.ts
│   ├── CustomersLayout.test.ts
│   ├── HelpCenterLayout.test.ts
│   ├── JobsLayout.test.ts
│   ├── LegalLayout.test.ts
│   ├── SplashLayout.test.ts
│   └── TeamLayout.test.ts
└── pages/
    ├── index.test.ts
    ├── contact.test.ts
    ├── pricing.test.ts
    └── 404.test.ts
```

### Test Pattern (TDD)

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('ComponentName', () => {
	describe('Rendering', () => {
		it('renders without crashing', () => {})
		it('renders with default props', () => {})
		it('renders children correctly', () => {})
	})

	describe('Props', () => {
		it('applies variant classes correctly', () => {})
		it('applies size classes correctly', () => {})
		it('handles optional props', () => {})
	})

	describe('Responsive', () => {
		it('applies mobile styles at sm breakpoint', () => {})
		it('applies tablet styles at md breakpoint', () => {})
		it('applies desktop styles at lg breakpoint', () => {})
	})

	describe('Accessibility', () => {
		it('has correct ARIA attributes', () => {})
		it('is keyboard navigable', () => {})
	})
})
```

---

## Migration Phases

### Phase 1: Foundation Setup

1. Add npm dependencies (aos, keen-slider)
2. Download and configure self-hosted fonts
3. Create font face declarations
4. Set up color token remapping in global.css
5. Add @astrolib/seo dependency

### Phase 2: Foundation Components

1. Import fundations/elements (Button, Text)
2. Import fundations/containers (Wrapper)
3. Import fundations/head (BaseHead, Fonts, Meta, Seo, Favicons)
4. Import fundations/icons (Menu, Close, ChevronLeft, ChevronRight, Plus)
5. Modify script components for npm imports
6. Write tests for each component

### Phase 3: Global Components

1. Import Navigation (remove search, update links)
2. Import MobileNav (CSS grid animation)
3. Import Footer (with newsletter)
4. Update Logo component with NextNode branding
5. Write tests for each component

### Phase 4: Layout Migration

1. Import BaseLayout
2. Import content-specific layouts (8 total)
3. Configure logger in each layout
4. Write tests for each layout

### Phase 5: Section Components

1. Import Hero1
2. Import Feature1, Feature2, Feature3, Work
3. Import Stats1
4. Import Testimonial1, LogoCloud1
5. Import Pricing1
6. Import Faq1
7. Import Cta1
8. Remap colors to nextnode tokens
9. Write tests for each component

### Phase 6: Content Components

1. Import ChangelogCard
2. Import CustomerCard
3. Import TeamCard
4. Import JobCard, jobs/Cta
5. Import HelpCenterCard, Status
6. Write tests for each component

### Phase 7: Content Collections

1. Set up collection schemas in `src/content/config.ts`
2. Create placeholder content for each collection
3. Configure collection queries

### Phase 8: Page Migration

1. Import homepage (index.astro)
2. Import homepage variant (index-two.astro)
3. Import contact page
4. Import pricing page
5. Import design system pages (5 pages)
6. Import content collection pages
7. Import 404 page
8. Write page tests

### Phase 9: Assets & Polish

1. Copy all images to src/images/
2. Import decorative SVG elements
3. Update image references in components
4. Verify all animations work

### Phase 10: Quality Assurance

1. Run full test suite
2. Run type-check
3. Run lint
4. Run build
5. Manual browser testing
6. Fix any issues

---

## Verification Checklist

### Build Verification

```bash
pnpm type-check  # Must pass
pnpm lint        # Must pass
pnpm test        # Must pass (all new tests)
pnpm build       # Must succeed
pnpm preview     # Manual verification
```

### Visual Verification

- [ ] Homepage renders correctly
- [ ] Navigation dropdowns work
- [ ] Mobile menu animates
- [ ] All AOS animations trigger on scroll
- [ ] Color tokens display NextNode brand
- [ ] Fonts load correctly (no FOUT)
- [ ] All images display
- [ ] Footer newsletter form displays
- [ ] 404 page works

### Functional Verification

- [ ] All internal links work
- [ ] Content collections load
- [ ] Dynamic routes resolve
- [ ] Logger outputs in console
- [ ] SEO meta tags present
- [ ] Sitemap generates

---

## Files to Create/Modify

### New Files (Estimated: ~80 files)

- 30+ component files
- 8 layout files
- 20+ page files
- 30+ test files
- 6 content collection schema entries
- Font files (3 families)

### Modified Files

- `package.json` (new dependencies)
- `src/styles/global.css` (color tokens, fonts)
- `astro.config.mjs` (if needed for MDX)
- `src/content/config.ts` (collection schemas)

---

## Dependencies to Add

```json
{
	"dependencies": {
		"@astrojs/mdx": "^4.3.13",
		"@astrolib/seo": "^1.0.0-beta.8",
		"aos": "^2.3.4",
		"keen-slider": "^6.8.6"
	}
}
```

---

## Risk Mitigation

| Risk                  | Mitigation                                |
| --------------------- | ----------------------------------------- |
| Color conflicts       | Test each component after token remapping |
| Font loading issues   | Implement font-display: swap fallback     |
| Animation performance | Test on low-end devices                   |
| Test failures         | TDD approach catches issues early         |
| Build size increase   | Monitor bundle size during migration      |

---

## Success Criteria

1. All 80+ files migrated
2. All tests pass
3. Build succeeds
4. Type-check passes
5. Lint passes
6. Visual parity with buio (with NextNode colors)
7. Full logger coverage
8. Self-hosted fonts working
9. No CDN dependencies
10. Content collections functional
