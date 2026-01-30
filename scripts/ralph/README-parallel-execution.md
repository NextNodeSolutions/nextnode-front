# Buio Migration - Ralph Execution Guide

## Overview

This migration is split into 6 PRDs with a parallel execution strategy:

```
PRD-01 (Foundation) ─────► PRD-02 (Structure) ─────┬─► PRD-03 (Sections)  ──┐
                                                   ├─► PRD-04 (Content)   ──┼─► PRD-06 (Pages + QA)
                                                   └─► PRD-05 (Assets)    ──┘
```

**Sequential**: PRD-01 → PRD-02
**Parallel**: PRD-03, PRD-04, PRD-05 (can run simultaneously)
**Final**: PRD-06 (after merging 03, 04, 05)

---

## PRD Summary

| PRD | Name       | Stories | Branch                    | Dependencies   |
| --- | ---------- | ------- | ------------------------- | -------------- |
| 01  | Foundation | 20      | `feature/buio-foundation` | None           |
| 02  | Structure  | 14      | `feature/buio-structure`  | PRD-01         |
| 03  | Sections   | 12      | `feature/buio-sections`   | PRD-02         |
| 04  | Content    | 14      | `feature/buio-content`    | PRD-02         |
| 05  | Assets     | 8       | `feature/buio-assets`     | PRD-02         |
| 06  | Pages + QA | 24      | `feature/buio-pages`      | PRD-03, 04, 05 |

**Total: 92 user stories**

---

## Phase 1: Sequential Execution (PRD-01 & PRD-02)

### Step 1: Run PRD-01 (Foundation)

```bash
cd /Users/walid/Development/SaaS/nextnode-front/scripts/ralph

# Copy PRD-01 to active prd.json
cp prd-01-foundation.json prd.json

# Run Ralph (adjust iterations as needed)
./ralph.sh --tool claude 25
```

Wait for completion, then review and merge the PR.

### Step 2: Run PRD-02 (Structure)

```bash
# After PRD-01 PR is merged to main

# Copy PRD-02 to active prd.json
cp prd-02-structure.json prd.json

# Run Ralph
./ralph.sh --tool claude 20
```

Wait for completion, then review and merge the PR.

---

## Phase 2: Parallel Execution (PRD-03, PRD-04, PRD-05)

After PRD-02 is merged, you can run PRD-03, PRD-04, and PRD-05 **simultaneously** in separate clones.

### Setup: Create 3 Clones

```bash
# Navigate to parent directory
cd /Users/walid/Development/SaaS

# Clone for PRD-03 (Sections)
git clone nextnode-front nextnode-front-sections
cd nextnode-front-sections
git checkout main && git pull
pnpm install
cd ..

# Clone for PRD-04 (Content)
git clone nextnode-front nextnode-front-content
cd nextnode-front-content
git checkout main && git pull
pnpm install
cd ..

# Clone for PRD-05 (Assets)
git clone nextnode-front nextnode-front-assets
cd nextnode-front-assets
git checkout main && git pull
pnpm install
cd ..
```

### Run PRD-03 (Sections) - Terminal 1

```bash
cd /Users/walid/Development/SaaS/nextnode-front-sections/scripts/ralph

# Copy PRD-03
cp prd-03-sections.json prd.json

# Run Ralph
./ralph.sh --tool claude 15
```

### Run PRD-04 (Content) - Terminal 2

```bash
cd /Users/walid/Development/SaaS/nextnode-front-content/scripts/ralph

# Copy PRD-04
cp prd-04-content.json prd.json

# Run Ralph
./ralph.sh --tool claude 18
```

### Run PRD-05 (Assets) - Terminal 3

```bash
cd /Users/walid/Development/SaaS/nextnode-front-assets/scripts/ralph

# Copy PRD-05
cp prd-05-assets.json prd.json

# Run Ralph
./ralph.sh --tool claude 12
```

### Merge Parallel PRs

Once all 3 complete:

1. Review and merge PRD-03 PR (`feature/buio-sections`)
2. Review and merge PRD-04 PR (`feature/buio-content`)
3. Review and merge PRD-05 PR (`feature/buio-assets`)

**Note**: These should merge cleanly as they touch different files:

- PRD-03: `src/components/{headers,features,stats,testimonials,pricing,faqs,ctas}/*`
- PRD-04: `src/components/{changelog,customers,team,jobs,helpcenter}/*` + `src/content/*`
- PRD-05: `src/images/*` + `src/components/assets/shapes/*`

---

## Phase 3: Final Execution (PRD-06)

After all parallel PRs are merged:

```bash
# Return to main repo
cd /Users/walid/Development/SaaS/nextnode-front

# Update main
git checkout main && git pull

# Copy PRD-06
cd scripts/ralph
cp prd-06-pages.json prd.json

# Run Ralph (this is the largest PRD)
./ralph.sh --tool claude 30
```

---

## Cleanup

After PRD-06 is merged, clean up the parallel clones:

```bash
cd /Users/walid/Development/SaaS
rm -rf nextnode-front-sections
rm -rf nextnode-front-content
rm -rf nextnode-front-assets
```

---

## Troubleshooting

### Ralph times out before completing

Increase the iteration count:

```bash
./ralph.sh --tool claude 50
```

### PRD file not found

Ensure you copied the PRD to `prd.json`:

```bash
cp prd-0X-name.json prd.json
```

### Merge conflicts

If parallel PRs have conflicts (shouldn't happen with this structure):

1. Merge them one at a time
2. Resolve conflicts manually
3. Push to the conflicting branch
4. Re-run that PR's merge

### Tests failing

Check the progress.txt for details on what failed. Ralph logs all issues there.

### Branch already exists

If rerunning a PRD:

```bash
git branch -D feature/buio-xyz  # Delete local
git push origin --delete feature/buio-xyz  # Delete remote
```

---

## Verification Checklist

After all PRDs complete:

```bash
cd /Users/walid/Development/SaaS/nextnode-front
git checkout main && git pull

# Run all checks
pnpm type-check  # Must pass
pnpm lint        # Must pass
pnpm test        # Must pass
pnpm build       # Must succeed

# Manual verification
pnpm preview     # Check in browser
```

### Visual Checks

- [ ] Homepage renders with all sections
- [ ] Navigation dropdowns work
- [ ] Mobile menu animates
- [ ] AOS scroll animations trigger
- [ ] NextNode colors display correctly
- [ ] Fonts load (no FOUT)
- [ ] All images display
- [ ] Footer newsletter form shows
- [ ] 404 page works
- [ ] All content collection pages render

---

## Timeline Estimate

| Phase      | PRDs       | Estimated Time                      |
| ---------- | ---------- | ----------------------------------- |
| Sequential | 01, 02     | ~2-3 hours total                    |
| Parallel   | 03, 04, 05 | ~1-2 hours (running simultaneously) |
| Final      | 06         | ~2-3 hours                          |

**Total**: ~5-8 hours of Ralph execution (can be done overnight)

---

## File Structure After Migration

```
src/
├── components/
│   ├── assets/
│   │   ├── Logo.astro
│   │   └── shapes/
│   ├── changelog/
│   │   └── ChangelogCard.astro
│   ├── ctas/
│   │   └── Cta1.astro
│   ├── customers/
│   │   └── CustomerCard.astro
│   ├── faqs/
│   │   └── Faq1.astro
│   ├── features/
│   │   ├── Feature1.astro
│   │   ├── Feature2.astro
│   │   ├── Feature3.astro
│   │   └── Work.astro
│   ├── fundations/
│   │   ├── containers/
│   │   ├── elements/
│   │   ├── head/
│   │   ├── icons/
│   │   └── scripts/
│   ├── global/
│   │   ├── Footer.astro
│   │   ├── MobileNav.astro
│   │   └── Navigation.astro
│   ├── headers/
│   │   └── Hero1.astro
│   ├── helpcenter/
│   │   ├── HelpCenterCard.astro
│   │   └── Status.astro
│   ├── jobs/
│   │   ├── Cta.astro
│   │   └── JobCard.astro
│   ├── pricing/
│   │   └── Pricing1.astro
│   ├── stats/
│   │   └── Stats1.astro
│   ├── team/
│   │   └── TeamCard.astro
│   └── testimonials/
│       ├── LogoCloud1.astro
│       └── Testimonial1.astro
├── content/
│   ├── changelog/
│   ├── customers/
│   ├── helpcenter/
│   ├── jobs/
│   ├── legal/
│   └── team/
├── images/
│   ├── assets/
│   ├── avatar/
│   ├── brands/
│   ├── changelog/
│   ├── logos/
│   └── team/
├── layouts/
│   ├── BaseLayout.astro
│   ├── ChangelogLayout.astro
│   ├── CustomersLayout.astro
│   ├── HelpCenterLayout.astro
│   ├── JobsLayout.astro
│   ├── LegalLayout.astro
│   ├── SplashLayout.astro
│   └── TeamLayout.astro
├── pages/
│   ├── 404.astro
│   ├── changelog/
│   ├── contact.astro
│   ├── customers/
│   ├── helpcenter/
│   ├── index-two.astro
│   ├── index.astro
│   ├── jobs/
│   ├── legal/
│   ├── pricing.astro
│   ├── system/
│   └── team/
└── styles/
    └── global.css (updated with color tokens)

public/
└── fonts/
    ├── eb-garamond/
    ├── geist-mono/
    └── geist/

tests/
├── components/
├── layouts/
└── pages/
```
