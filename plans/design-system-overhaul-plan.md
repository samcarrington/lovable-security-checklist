# Design System Overhaul Plan

## 1. Title

Modernist-Brutalist Design System Overhaul with OKLCH Color Tokens

## 2. Short description

Replace the generic AI-generated aesthetic with a distinctive modernist-brutalist design system. Implement OKLCH color palette (blue-green trust tones), semantic design tokens, improved typography, and stronger visual hierarchy—while maintaining the approachable, learning-journey tone appropriate for designers and vibe coders new to security engineering.

## 3. Current status

```yaml
owner: TBD
state: proposed
last_updated: 2026-01-17
blockers: []
```

## 4. Objectives

1. Eliminate "AI slop" visual patterns identified in `docs/design/design-review.md`
2. Implement OKLCH-based color system with blue-green trust palette and tinted neutrals
3. Create semantic design token architecture (primitives + semantic layers)
4. Establish modernist-brutalist card and component styling (sharp corners, minimal shadows)
5. Improve visual hierarchy on Resources/Examples pages with hero patterns and varied layouts
6. Implement distinctive typography system with proper scale and font choices
7. Ensure dark mode works correctly with new palette
8. Maintain accessibility standards (WCAG AA contrast, keyboard nav, ARIA)

## 5. Success criteria

| Name | Metric | Target | Verification |
|------|--------|--------|--------------|
| AI Slop Elimination | Design review anti-patterns resolved | All 9 high/medium issues addressed | Re-run design review checklist |
| Color Contrast | WCAG AA compliance | All text >4.5:1, UI elements >3:1 | Browser DevTools contrast checker |
| Dark Mode Parity | Feature parity | 100% components work in both modes | Manual visual QA |
| Test Suite | Existing tests pass | 100% pass rate | `npm test` |
| Build Success | No type errors | Clean build | `npm run build` |
| Typography Scale | Consistent modular scale | 5-tier hierarchy implemented | Visual audit |

## 6. Scope

```yaml
in:
  - Replace HSL CSS custom properties with OKLCH color tokens
  - Create semantic token layer (primitives → semantic)
  - Remove peach/coral gradient background
  - Remove vibe-purple accent colors
  - Implement blue-green trust palette
  - Update card components to brutalist styling (sharp corners, no shadows)
  - Remove icon-in-rounded-background patterns
  - Refactor Resources page hierarchy (hero featured items, compact lists)
  - Refactor OWASP and Agentic Engineering pages similarly
  - Left-align page headers, break centered symmetry
  - Add distinctive typography (display font for headings)
  - Implement 4pt spacing scale with semantic tokens
  - Polish dark mode with new palette
  - Retain confetti celebration feature
  - Retain all accessibility features

out:
  - Changing the checklist functionality or data structure
  - Modifying the security content itself
  - Adding new pages or routes
  - Changing the navigation structure
  - Modifying analytics or cookie consent
  - Performance optimization beyond what's needed for new CSS
```

## 7. Stakeholders & Roles

| Name | Role | Responsibility | Contact |
|------|------|----------------|---------|
| Sam Carrington | Product Owner | Final design approval, tone decisions | TBD |
| Developer Agent | Implementer | Execute design changes per this plan | N/A |

## 8. High-level timeline & milestones

1. M1 — Design tokens foundation complete — TBD — Developer Agent
2. M2 — Component styling updated — TBD — Developer Agent  
3. M3 — Page layouts refactored — TBD — Developer Agent
4. M4 — Dark mode polished & tests passing — TBD — Developer Agent

## 9. Task list

### Phase 1: Design Token Foundation (M1)

- T-001 | Create OKLCH color primitives in src/index.css | Developer Agent | complexity: M | deps: [] | done: false
- T-002 | Create semantic color tokens layer (light mode) | Developer Agent | complexity: S | deps: [T-001] | done: false
- T-003 | Create semantic color tokens layer (dark mode) | Developer Agent | complexity: S | deps: [T-001] | done: false
- T-004 | Create spacing scale tokens (4pt base) | Developer Agent | complexity: XS | deps: [] | done: false
- T-005 | Create typography tokens (font families, scale) | Developer Agent | complexity: S | deps: [] | done: false
- T-006 | Update tailwind.config.ts to use new tokens | Developer Agent | complexity: M | deps: [T-001, T-004, T-005] | done: false
- T-007 | Remove vibe-purple and legacy color definitions | Developer Agent | complexity: XS | deps: [T-006] | done: false

### Phase 2: Component Styling (M2)

- T-008 | Refactor GradientBackground to solid subtle background | Developer Agent | complexity: S | deps: [T-002, T-003] | done: false
- T-009 | Update Card component to brutalist styling (sharp corners, no shadows) | Developer Agent | complexity: S | deps: [T-006] | done: false
- T-010 | Update ExampleCard: remove icon-in-rounded-background pattern | Developer Agent | complexity: S | deps: [T-009] | done: false
- T-011 | Update SectionCard to brutalist styling | Developer Agent | complexity: S | deps: [T-009] | done: false
- T-012 | Update ResourceCategoryCard styling | Developer Agent | complexity: S | deps: [T-009] | done: false
- T-013 | Update Button variants for new palette | Developer Agent | complexity: S | deps: [T-006] | done: false
- T-014 | Add distinctive heading font (Space Grotesk or similar) | Developer Agent | complexity: S | deps: [T-005] | done: false

### Phase 3: Page Layout Refactoring (M3)

- T-015 | Refactor ChecklistHeader: left-align, reposition ProgressDial | Developer Agent | complexity: M | deps: [T-006] | done: false
- T-016 | Refactor Resources page: hero featured items, compact list for rest | Developer Agent | complexity: L | deps: [T-010, T-015] | done: false
- T-017 | Refactor OWASPLinks page: improve hierarchy, reduce card monotony | Developer Agent | complexity: M | deps: [T-009, T-015] | done: false
- T-018 | Refactor AgenticEngineering page similarly | Developer Agent | complexity: M | deps: [T-009, T-015] | done: false
- T-019 | Increase negative space and vary spacing rhythm across pages | Developer Agent | complexity: M | deps: [T-004] | done: false

### Phase 4: Polish & Validation (M4)

- T-020 | Polish dark mode: verify contrast, adjust surfaces | Developer Agent | complexity: M | deps: [T-003, T-008 through T-018] | done: false
- T-021 | Update component tests for any changed text/structure | Developer Agent | complexity: M | deps: [T-008 through T-018] | done: false
- T-022 | Run full test suite, fix any failures | Developer Agent | complexity: S | deps: [T-021] | done: false
- T-023 | Run build, verify no type errors | Developer Agent | complexity: XS | deps: [T-022] | done: false
- T-024 | Manual QA: light mode visual review | Developer Agent | complexity: S | deps: [T-023] | done: false
- T-025 | Manual QA: dark mode visual review | Developer Agent | complexity: S | deps: [T-023] | done: false
- T-026 | Verify accessibility: contrast ratios, focus states, keyboard nav | Developer Agent | complexity: S | deps: [T-023] | done: false

## 10. Risks and mitigations

| ID | Description | Probability | Impact | Mitigation | Owner |
|----|-------------|-------------|--------|------------|-------|
| R-001 | OKLCH browser support gaps | Low | Medium | OKLCH has 94%+ support; provide fallback for legacy browsers if needed | Developer Agent |
| R-002 | Typography font loading causes layout shift | Medium | Low | Use font-display: swap and fallback font metrics adjustment | Developer Agent |
| R-003 | Brutalist styling feels too stark/dour | Medium | Medium | Balance with appropriate spacing, retain confetti, use muted tones not harsh ones | Developer Agent |
| R-004 | Breaking existing tests | Medium | Low | Update test assertions to match new text/structure | Developer Agent |
| R-005 | Dark mode contrast issues | Medium | Medium | Test all components with contrast checker, adjust chroma/lightness | Developer Agent |

## 11. Assumptions

- The current test suite provides adequate coverage to catch regressions
- Product owner has approved the modernist-brutalist direction per design review decisions
- No new dependencies required beyond potentially a Google Font import
- The existing accessibility infrastructure (skip links, ARIA, focus states) remains intact
- Build and deployment processes remain unchanged

## 12. Implementation approach / Technical narrative

### TL;DR
Replace HSL with OKLCH tokens, create two-layer token architecture, apply brutalist component styling, refactor page layouts for hierarchy, polish dark mode.

### Color System Architecture

The current implementation uses HSL custom properties which don't provide perceptual uniformity. We'll migrate to OKLCH for better color manipulation and consistency.

**Token Layers:**

1. **Primitive tokens** - Raw color values with no semantic meaning:
```css
--slate-500: oklch(52% 0.02 240);
--teal-500: oklch(62% 0.14 185);
```

2. **Semantic tokens** - Role-based tokens that reference primitives:
```css
--primary: var(--teal-600);
--foreground: var(--slate-900);
```

3. **Component tokens** (optional) - Component-specific overrides if needed

**Palette Definition (OKLCH):**

```css
/* Blue-tinted slate neutrals for trust/authority */
--slate-50: oklch(97% 0.008 240);   /* Near-white with blue tint */
--slate-100: oklch(94% 0.01 240);
--slate-200: oklch(88% 0.012 240);
--slate-300: oklch(78% 0.015 240);
--slate-400: oklch(65% 0.018 240);
--slate-500: oklch(52% 0.02 240);
--slate-600: oklch(42% 0.022 240);
--slate-700: oklch(32% 0.02 240);
--slate-800: oklch(22% 0.018 240);
--slate-900: oklch(15% 0.015 240);
--slate-950: oklch(10% 0.012 240);  /* Near-black with blue tint */

/* Teal accent for trust/security connotation */
--teal-400: oklch(72% 0.12 185);
--teal-500: oklch(62% 0.14 185);
--teal-600: oklch(52% 0.12 185);
--teal-700: oklch(42% 0.10 185);

/* Semantic colors with reduced chroma for subtlety */
--success: oklch(65% 0.18 145);
--warning: oklch(75% 0.15 85);
--error: oklch(55% 0.2 25);
```

**Key insight**: As lightness approaches extremes, reduce chroma to avoid garish colors.

### Spacing System

Replace arbitrary spacing with a 4pt-based scale:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

### Typography System

```css
/* Font families */
--font-display: 'Space Grotesk', system-ui, sans-serif;
--font-body: system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Type scale (1.25 ratio - major third) */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
--text-2xl: clamp(2rem, 1.5rem + 2.5vw, 2.5rem);
--text-3xl: clamp(2.5rem, 1.8rem + 3.5vw, 3.5rem);
```

### Brutalist Component Styling

**Cards:**
- Border radius: `0` or `2px` max (not `rounded-lg`)
- Borders: `1px solid var(--border)` or `2px` for emphasis
- Shadows: None, or hard offset shadow (`2px 2px 0 0 currentColor`)
- No `bg-primary/10` decorative backgrounds on icons

**Before (AI-slop):**
```tsx
<div className="p-2 rounded-lg bg-primary/10 text-primary">
  <FileText className="h-5 w-5" />
</div>
```

**After (brutalist):**
```tsx
<FileText className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
```

### Page Layout Patterns

**Headers - Left-aligned with asymmetric layout:**
```
┌─────────────────────────────────────────────────────┐
│ Security Checklist               ┌──────────────┐  │
│ for AI-Assisted Code             │ Progress: 80%│  │
│                                  └──────────────┘  │
│ Use this checklist to...                           │
└─────────────────────────────────────────────────────┘
```

**Resources page - Hero + Compact List:**
```
┌─────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────┐ │
│ │ FEATURED: Security Review Agent                 │ │
│ │ Full description, prominent CTA                 │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ More Examples                                       │
│ ─────────────────────────────────────────────────── │
│ Threat Modeling Agent          [View] [Download]    │
│ Code Audit Agent               [View] [Download]    │
│ Dependency Scanner             [View] [Download]    │
└─────────────────────────────────────────────────────┘
```

### Dark Mode Strategy

Dark mode is not inverted light mode. Key differences:
- Use lighter surfaces for depth instead of shadows
- Reduce text weight slightly (350 vs 400)
- Desaturate accent colors slightly
- Never use pure black—use dark slate (oklch 10-15%)

```css
.dark {
  --background: var(--slate-950);
  --foreground: var(--slate-100);
  --card: var(--slate-900);
  --primary: var(--teal-400); /* Lighter teal for dark mode */
  /* Surfaces get lighter as they elevate */
  --surface-1: var(--slate-900);
  --surface-2: var(--slate-800);
  --surface-3: var(--slate-700);
}
```

## 13. Testing & validation plan

**Unit tests:**
- Existing component tests should continue to pass
- Update any snapshot tests or text-matching assertions affected by changes

**Visual QA:**
- Review each page in light mode at 3 viewport sizes (mobile, tablet, desktop)
- Review each page in dark mode at 3 viewport sizes
- Verify color contrast using browser DevTools

**Accessibility:**
- Run axe DevTools or similar on each page
- Verify keyboard navigation still works
- Check focus ring visibility with new palette
- Verify skip-to-content link still functions

**Build validation:**
- `npm run build` must complete without errors
- `npm test` must pass 100%

## 14. Deployment plan & roll-back strategy

**Environments:**
1. Local development
2. Preview/staging (via PR preview if configured)
3. Production

**Deployment steps:**
1. Create feature branch from main
2. Implement changes per task list
3. Run local tests and visual QA
4. Create PR for review
5. Deploy to preview environment
6. Product owner approval
7. Merge to main

**Roll-back:**
- Git revert of merge commit if issues discovered in production
- No database or API changes, so rollback is purely code-based

## 15. Monitoring & observability

N/A - This is a frontend styling change with no new telemetry requirements. Existing analytics remain unchanged.

## 16. Compliance, security & privacy considerations

- No changes to data handling or user data collection
- Existing cookie consent and privacy features remain unchanged
- Accessibility compliance (WCAG AA) must be maintained or improved
- No new third-party dependencies that would require security review (fonts are loaded from Google Fonts CDN, already trusted)

## 17. Communication plan

| Event | Channel | Audience |
|-------|---------|----------|
| Plan approval | This document | Product Owner |
| Implementation complete | PR | Product Owner, reviewers |
| Production deployment | N/A | Self-serve via merge |

## 18. Related documents & links

- Design Review: `docs/design/design-review.md`
- Frontend Design Skill: `.opencode/skill/skills/frontend-design/`
- Color Reference: `.opencode/skill/skills/frontend-design/reference/color-and-contrast.md`
- Typography Reference: `.opencode/skill/skills/frontend-design/reference/typography.md`
- Spatial Reference: `.opencode/skill/skills/frontend-design/reference/spatial-design.md`

## 19. Appendix

### A. Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Replace HSL with OKLCH tokens, add spacing/typography tokens |
| `tailwind.config.ts` | Update color definitions, remove vibe-purple, add font families |
| `src/components/GradientBackground.tsx` | Replace gradient with solid subtle background |
| `src/components/ui/card.tsx` | Remove rounded corners and shadows |
| `src/components/ExampleCard.tsx` | Remove icon decoration, update styling |
| `src/components/SectionCard.tsx` | Brutalist styling update |
| `src/components/ResourceCategoryCard.tsx` | Brutalist styling update |
| `src/components/ChecklistHeader.tsx` | Left-align, reposition ProgressDial |
| `src/pages/Resources.tsx` | Hero layout, compact list, left-align header |
| `src/pages/OWASPLinks.tsx` | Improve hierarchy, left-align |
| `src/pages/AgenticEngineering.tsx` | Improve hierarchy, left-align |
| `index.html` | Add Google Fonts link for Space Grotesk |

### B. OKLCH Color Reference

```
OKLCH: lightness (0-100%), chroma (0-0.4+), hue (0-360)

Hue Reference:
- 0-30: Red/Orange
- 30-90: Yellow/Gold  
- 90-150: Green
- 150-210: Cyan/Teal
- 210-270: Blue
- 270-330: Purple/Magenta
- 330-360: Red

Chroma guidelines:
- 0.01-0.02: Tinted neutrals (subtle)
- 0.08-0.12: Muted accents
- 0.14-0.20: Vibrant accents
- Reduce chroma at extreme lightness (near white/black)
```

### C. Design Review Anti-Patterns to Address

| Anti-Pattern | Current Location | Resolution |
|--------------|------------------|------------|
| Identical card grids | Resources page | Hero + compact list pattern |
| Icon in rounded background | ExampleCard, Resources | Remove decorative icon backgrounds |
| Peach/coral gradient | GradientBackground | Solid subtle background |
| Everything centered | All page headers | Left-align with asymmetric layout |
| Same spacing everywhere | All pages | Varied rhythm with spacing scale |
| Cards wrapped in cards | SectionCard | Flatten hierarchy |
| Generic shadcn/ui defaults | All cards | Brutalist overrides |
| Generic font stack | Global | Space Grotesk for headings |
| Purple accent colors | tailwind.config.ts | Remove vibe-purple, use teal |

---

**Checklist before marking plan as ready for review:**

- [x] All minimal required fields are filled
- [x] Dates validated (ISO 8601)
- [x] Complexity assigned to each task (XS/S/M/L/XL)
- [x] At least one test/validation approach is defined
- [x] Security & compliance items are noted
