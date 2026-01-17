# Security Examples and Agentic Engineering Resources Plan

## 1. Title

Add security prompt examples, resource pages, and site navigation

## 2. Short description

Create example files demonstrating security-focused prompts and agent configurations, add new resource pages to the React application with responsive navigation, and curate resources for transitioning from vibe coding to systematic agentic engineering practices.

## 3. Current status

```yaml
owner: TBD
state: proposed
last_updated: 2026-01-17
blockers: []
```

## 4. Objectives

1. Provide ready-to-use security agent and prompt examples that complement the existing security checklist
2. Curate external resources linking vibe coding practices to agentic engineering methodologies
3. Extract and organize the 70+ OWASP links from `checklist-data.json` into navigable resource pages
4. Create example agent configurations for common security review tasks
5. Document integration patterns for security scanning tools in AI-assisted workflows
6. Add new pages to the React application displaying resources with responsive navigation
7. Implement a responsive navigation component accessible across all pages

## 5. Success criteria

| Name                    | Metric                                           | Target                      | Verification                                       |
| ----------------------- | ------------------------------------------------ | --------------------------- | -------------------------------------------------- |
| Example coverage        | Number of security-focused agent/prompt examples | >= 5 agents, >= 5 prompts   | Count files in examples directory                  |
| Resource completeness   | Curated external resource links documented       | >= 20 high-quality links    | Review resource pages                              |
| OWASP extraction        | OWASP links from JSON extracted and organized    | 100% of unique links        | Compare extracted links vs JSON                    |
| Documentation usability | All examples include usage instructions          | 100%                        | Review each file has instructions                  |
| Page accessibility      | New pages accessible via navigation              | All 3 resource pages linked | Navigate to each page from any page                |
| Responsive design       | Navigation works on mobile/tablet/desktop        | Passes at 320px, 768px, 1024px | Test in browser dev tools at each breakpoint    |
| Test coverage           | New components have unit tests                   | >= 80% coverage             | Run test:coverage and review report                |
| Frontend design quality | Components pass design quality checklist         | 100% checklist items        | Run design quality checklist from Section 12       |
| Accessibility           | WCAG AA compliance for all new components        | 4.5:1 contrast, keyboard nav | axe-core audit + manual keyboard testing         |
| Interaction states      | All interactive elements have 8 states defined   | 100%                        | Visual audit of hover/focus/active/disabled states |

## 6. Scope

```yaml
in:
  - Create example security-focused agent definitions
  - Create example security review prompts
  - Extract and organize OWASP links from checklist-data.json
  - Curate agentic engineering transition resources
  - Document recommended security tools and integrations
  - Create resource index/landing pages (markdown files)
  - Create new React pages: Resources, OWASP Links, Agentic Engineering
  - Create responsive navigation component (hamburger menu on mobile)
  - Add routes for new pages in App.tsx
  - Write unit tests for new components
out:
  - Implementing actual security scanning CI/CD pipelines
  - Major redesign of existing Index or Privacy pages
  - Backend API development
  - Writing comprehensive tool-specific tutorials
  - Authentication or user accounts
```

## 7. Stakeholders & Roles

| Name                 | Role          | Responsibility                     | Contact |
| -------------------- | ------------- | ---------------------------------- | ------- |
| TBD                  | Project Owner | Final approval                     | TBD     |
| Implementation Agent | Developer     | Execute implementation tasks       | N/A     |
| Security Reviewer    | Reviewer      | Validate security content accuracy | N/A     |

## 8. High-level timeline & milestones

1. M1 - Examples directory structure established - 2026-01-20 - Implementation Agent
2. M2 - Security agent examples complete - 2026-01-24 - Implementation Agent
3. M3 - Security prompt examples complete - 2026-01-28 - Implementation Agent
4. M4 - Responsive navigation component complete - 2026-01-31 - Implementation Agent
5. M5 - New resource pages (React) complete - 2026-02-05 - Implementation Agent
6. M6 - OWASP resource page complete - 2026-02-07 - Implementation Agent
7. M7 - Agentic engineering resources complete - 2026-02-10 - Implementation Agent
8. M8 - Tests and documentation complete - 2026-02-12 - Implementation Agent

## 9. Task list

### Phase 1: Foundation & Structure (Complexity: S)

| ID    | Task                                                        | Owner                | Complexity | Dependencies | Done  |
| ----- | ----------------------------------------------------------- | -------------------- | ---------- | ------------ | ----- |
| T-001 | Create `public/examples/` directory structure               | Implementation Agent | XS         | []           | false |
| T-002 | Create `public/examples/manifest.json` with example metadata | Implementation Agent | S          | [T-001]      | false |

### Phase 2: Security Agent Examples (Complexity: M)

| ID    | Task                                                                                          | Owner                | Complexity | Dependencies | Done  |
| ----- | --------------------------------------------------------------------------------------------- | -------------------- | ---------- | ------------ | ----- |
| T-003 | Create `public/examples/agents/security-reviewer.md` - Code security review agent             | Implementation Agent | S          | [T-001]      | false |
| T-004 | Create `public/examples/agents/dependency-auditor.md` - Package vulnerability scanner agent   | Implementation Agent | S          | [T-001]      | false |
| T-005 | Create `public/examples/agents/secrets-scanner.md` - Credential leak detection agent          | Implementation Agent | S          | [T-001]      | false |
| T-006 | Create `public/examples/agents/api-security-reviewer.md` - API endpoint security agent        | Implementation Agent | S          | [T-001]      | false |
| T-007 | Create `public/examples/agents/ai-code-validator.md` - AI-generated code validation agent     | Implementation Agent | S          | [T-001]      | false |

### Phase 3: Security Prompt Examples (Complexity: M)

| ID    | Task                                                                           | Owner                | Complexity | Dependencies | Done  |
| ----- | ------------------------------------------------------------------------------ | -------------------- | ---------- | ------------ | ----- |
| T-008 | Create `public/examples/prompts/secure-code-review.prompt.md`                  | Implementation Agent | S          | [T-001]      | false |
| T-009 | Create `public/examples/prompts/threat-model.prompt.md`                        | Implementation Agent | S          | [T-001]      | false |
| T-010 | Create `public/examples/prompts/security-checklist-audit.prompt.md`            | Implementation Agent | S          | [T-001]      | false |
| T-011 | Create `public/examples/prompts/dependency-security-check.prompt.md`           | Implementation Agent | S          | [T-001]      | false |
| T-012 | Create `public/examples/prompts/input-validation-review.prompt.md`             | Implementation Agent | S          | [T-001]      | false |
| T-013 | Update `public/examples/manifest.json` with all example metadata               | Implementation Agent | S          | [T-003..T-012] | false |

### Phase 4: Reference Link Data (Complexity: M)

| ID    | Task                                                                                          | Owner                | Complexity | Dependencies | Done  |
| ----- | --------------------------------------------------------------------------------------------- | -------------------- | ---------- | ------------ | ----- |
| T-014 | Create `public/resources-data.json` with OWASP links extracted from checklist-data.json      | Implementation Agent | M          | []           | false |
| T-015 | Add agentic engineering resources to `public/resources-data.json`                             | Implementation Agent | M          | [T-014]      | false |

### Phase 5: Responsive Navigation Component (Complexity: M)

| ID    | Task                                                                                     | Owner                | Complexity | Dependencies | Done  |
| ----- | ---------------------------------------------------------------------------------------- | -------------------- | ---------- | ------------ | ----- |
| T-016 | Create `src/components/Navigation.tsx` - Responsive nav with hamburger menu on mobile   | Implementation Agent | M          | []           | false |
| T-017 | Create `src/components/Navigation.test.tsx` - Unit tests for navigation component       | Implementation Agent | S          | [T-016]      | false |
| T-018 | Integrate Navigation component into App.tsx layout                                       | Implementation Agent | S          | [T-016]      | false |

### Phase 6: Resource Pages & Components (React) (Complexity: L)

| ID    | Task                                                                                     | Owner                | Complexity | Dependencies        | Done  |
| ----- | ---------------------------------------------------------------------------------------- | -------------------- | ---------- | ------------------- | ----- |
| T-019 | Add `react-syntax-highlighter` dependency for markdown viewing                           | Implementation Agent | XS         | []                  | false |
| T-020 | Create `src/types/examples.ts` - TypeScript interfaces for examples manifest             | Implementation Agent | S          | []                  | false |
| T-021 | Create `src/types/resources.ts` - TypeScript interfaces for resource links               | Implementation Agent | S          | []                  | false |
| T-022 | Create `src/services/examplesService.ts` - Fetch manifest and markdown content           | Implementation Agent | S          | [T-020]             | false |
| T-023 | Create `src/services/resourcesService.ts` - Fetch and parse resources JSON               | Implementation Agent | S          | [T-021]             | false |
| T-024 | Create `src/components/MarkdownViewer.tsx` - Modal with syntax-highlighted markdown      | Implementation Agent | M          | [T-019]             | false |
| T-025 | Create `src/components/MarkdownViewer.test.tsx` - Unit tests for viewer                  | Implementation Agent | S          | [T-024]             | false |
| T-026 | Create `src/components/ExampleCard.tsx` - Card with View/Download buttons                | Implementation Agent | S          | [T-020,T-024]       | false |
| T-027 | Create `src/components/ResourceCategoryCard.tsx` - Card for external link categories     | Implementation Agent | S          | [T-021]             | false |
| T-028 | Create `src/pages/Resources.tsx` - Landing page with examples and reference links        | Implementation Agent | M          | [T-016,T-022,T-026,T-027] | false |
| T-029 | Create `src/pages/Resources.test.tsx` - Unit tests for resources landing page            | Implementation Agent | S          | [T-028]             | false |
| T-030 | Create `src/pages/OWASPLinks.tsx` - OWASP resources page with categorized links          | Implementation Agent | M          | [T-023,T-027]       | false |
| T-031 | Create `src/pages/OWASPLinks.test.tsx` - Unit tests for OWASP page                       | Implementation Agent | S          | [T-030]             | false |
| T-032 | Create `src/pages/AgenticEngineering.tsx` - Vibe-to-agentic resources page               | Implementation Agent | M          | [T-023,T-027]       | false |
| T-033 | Create `src/pages/AgenticEngineering.test.tsx` - Unit tests for agentic engineering page | Implementation Agent | S          | [T-032]             | false |
| T-034 | Add routes for new pages in App.tsx                                                      | Implementation Agent | XS         | [T-028,T-030,T-032] | false |

### Phase 7: Documentation & Polish (Complexity: S)

| ID    | Task                                                         | Owner                | Complexity | Dependencies              | Done  |
| ----- | ------------------------------------------------------------ | -------------------- | ---------- | ------------------------- | ----- |
| T-035 | Update main README.md to reference resources and new pages   | Implementation Agent | XS         | [T-034]                   | false |
| T-036 | Review all examples for consistency and completeness         | Security Reviewer    | S          | [T-003..T-012]            | false |
| T-037 | Run full test suite and fix any failures                     | Implementation Agent | S          | [T-017,T-025,T-029,T-031,T-033] | false |
| T-038 | Verify responsive design at all breakpoints                  | Implementation Agent | S          | [T-016,T-028,T-030,T-032] | false |

## 10. Risks and mitigations

| ID    | Description                                              | Probability | Impact | Mitigation                                                                     | Owner                |
| ----- | -------------------------------------------------------- | ----------- | ------ | ------------------------------------------------------------------------------ | -------------------- |
| R-001 | OWASP links in JSON may become stale                     | Medium      | Low    | Include last-verified dates; document update process                           | Implementation Agent |
| R-002 | External agentic engineering resources may change        | Medium      | Low    | Use archived links where possible; document retrieval dates                    | Implementation Agent |
| R-003 | Agent examples may not match target tool formats         | Low         | Medium | Test examples with GitHub Copilot Workspace, Claude Projects, and OpenCode.ai | Implementation Agent |
| R-004 | Scope creep into implementation                          | Medium      | Medium | Strict adherence to scope; examples are templates, not integrations            | Implementation Agent |
| R-005 | Responsive navigation breaks on edge-case screen sizes   | Low         | Medium | Test at 320px, 375px, 768px, 1024px, 1440px; use CSS Grid/Flexbox              | Implementation Agent |
| R-006 | New pages don't match existing app styling               | Low         | Low    | Use existing Tailwind classes and shadcn/ui components consistently            | Implementation Agent |
| R-007 | Existing tests break due to navigation changes           | Medium      | Medium | Update existing tests to account for new navigation; run full test suite       | Implementation Agent |
| R-008 | Performance impact from loading resource data            | Low         | Low    | Lazy load resource pages; keep JSON data files small                           | Implementation Agent |

## 11. Assumptions

- The existing `checklist-data.json` structure will remain stable during implementation
- Examples are intended as starting templates, not production-ready configurations
- External links are curated but not exhaustively verified; users should validate currency
- Target audience has basic familiarity with AI coding assistants and security concepts

## 12. Frontend Design Requirements

This section defines the visual design standards for all new UI components. These requirements ensure the implementation avoids generic "AI slop" aesthetics and creates a distinctive, production-grade interface.

### Typography

| Requirement | Specification | Rationale |
|-------------|---------------|-----------|
| Font family | Use existing project fonts from Tailwind config; avoid Inter, Roboto, Arial, Open Sans | Maintain consistency; avoid overused defaults |
| Modular scale | Use a 5-size system: xs (0.75rem), sm (0.875rem), base (1rem), lg (1.25rem), xl+ (2rem+) | Clear visual hierarchy with distinct steps |
| Fluid sizing | Use `clamp()` for headings: e.g., `clamp(1.5rem, 3vw + 1rem, 2.5rem)` | Responsive without breakpoint jumps |
| Line height | Body: 1.5-1.6; Headings: 1.1-1.3; Increase +0.05 for dark mode | Readability and vertical rhythm |
| Measure | Max-width 65ch for prose content using `max-width: 65ch` | Optimal reading line length |
| Font loading | Use `font-display: swap` for web fonts; define fallback metrics to minimize CLS | Performance and layout stability |

**Implementation Notes:**
- Review existing typography scale in `tailwind.config.ts` and extend if needed
- Navigation links and button text should use consistent weights (medium for interactive, regular for body)
- Use `font-variant-numeric: tabular-nums` for any numerical data display

### Color & Theme

| Requirement | Specification | Rationale |
|-------------|---------------|-----------|
| Color system | Use OKLCH or existing Tailwind/shadcn tokens; define semantic tokens (--color-primary, --color-surface) | Perceptually uniform, maintainable |
| Tinted neutrals | Add subtle brand hue to grays (chroma 0.01); never pure gray (#808080) or pure black (#000) | Cohesion and natural appearance |
| 60-30-10 rule | 60% neutral backgrounds, 30% secondary colors, 10% accent for CTAs | Visual hierarchy and accent impact |
| Dark mode | Support existing theme toggle; use lighter surfaces for elevation (not shadows); reduce font weight slightly; desaturate accents | Dark mode requires different decisions, not inversion |
| Contrast ratios | Body text: 4.5:1 minimum (AA); Large text/UI: 3:1 minimum | WCAG compliance |

**Anti-patterns to avoid:**
- Cyan-on-dark, purple-to-blue gradients, neon accents on dark backgrounds ("AI color palette")
- Gradient text for headings or metrics
- Gray text on colored backgrounds (use tinted variant of background color instead)
- Pure black (#000) or pure white (#fff) for large areas

### Layout & Spatial Design

| Requirement | Specification | Rationale |
|-------------|---------------|-----------|
| Spacing scale | Use 4pt base: 4, 8, 12, 16, 24, 32, 48, 64px (Tailwind: gap-1, gap-2, gap-3, gap-4, gap-6, gap-8, gap-12, gap-16) | Granular control with consistent rhythm |
| Visual rhythm | Vary spacing intentionally—tight groupings for related items, generous separation for sections | Hierarchy through space, not uniformity |
| Grid system | Use `repeat(auto-fit, minmax(280px, 1fr))` for responsive card grids without explicit breakpoints | Self-adjusting layouts |
| Container queries | Use `@container` for component-level responsiveness (e.g., cards adapting to sidebar vs main content) | Components adapt to their container, not viewport |
| Semantic z-index | Define scale: dropdown (10) → sticky (20) → modal-backdrop (30) → modal (40) → toast (50) → tooltip (60) | Predictable stacking without magic numbers |

**Anti-patterns to avoid:**
- Cards nested inside cards (flatten hierarchy with spacing/dividers)
- Identical card grids (same-sized cards with icon + heading + text repeated endlessly)
- Same spacing everywhere (creates monotonous layouts)
- Everything centered (left-aligned text with asymmetric layouts feels more designed)

### Interaction States (8-State Model)

Every interactive element (buttons, links, cards, form fields) must define all 8 states:

| State | When | Visual Treatment | Tailwind Example |
|-------|------|------------------|------------------|
| Default | At rest | Base styling | — |
| Hover | Pointer over (not touch) | Subtle lift, color shift | `hover:bg-primary/90` |
| Focus | Keyboard/programmatic focus | Visible ring with offset | `focus-visible:ring-2 focus-visible:ring-offset-2` |
| Active | Being pressed | Pressed in, darker | `active:scale-95 active:bg-primary/80` |
| Disabled | Not interactive | Reduced opacity, no pointer | `disabled:opacity-50 disabled:cursor-not-allowed` |
| Loading | Processing | Spinner, skeleton, or pulse | Custom spinner component |
| Error | Invalid state | Red border, icon, message | `border-destructive` |
| Success | Completed action | Green check, confirmation | `border-green-500` |

**Implementation Notes:**
- Use `:focus-visible` (not `:focus`) to show focus rings only for keyboard users
- Focus rings: 2px thick, high contrast (3:1 minimum), offset from element
- Never remove focus indicators without providing alternatives

### Responsive Design

| Requirement | Specification | Rationale |
|-------------|---------------|-----------|
| Mobile-first CSS | Base styles for mobile; use `min-width` queries to layer complexity | Mobile loads only necessary styles |
| Breakpoints | Content-driven: sm (640px), md (768px), lg (1024px), xl (1280px) per Tailwind defaults | Let content determine breaks |
| Touch targets | Minimum 44x44px for all interactive elements; use padding or pseudo-elements if visual size is smaller | Accessibility and touch usability |
| Input method detection | Use `@media (pointer: coarse)` for touch devices; `@media (hover: none)` to avoid hover-dependent features | Screen size doesn't indicate input method |
| Safe areas | Use `env(safe-area-inset-*)` for mobile navigation and fixed elements | Handle notches and home indicators |

**Navigation Component Specifics:**
- Mobile (< 640px): Hamburger menu, full-screen overlay with 44px+ touch targets
- Tablet (640-767px): Hamburger menu, slide-out panel
- Desktop (≥ 768px): Horizontal navigation bar

**Testing Requirements:**
- Test on real devices (not just DevTools): One iPhone, one Android minimum
- Verify at: 320px, 375px, 640px, 768px, 1024px, 1440px
- Test landscape orientation on mobile

### Motion & Animation

| Requirement | Specification | Rationale |
|-------------|---------------|-----------|
| Duration scale | Instant feedback: 100-150ms; State changes: 200-300ms; Layout changes: 300-500ms | Appropriate timing for context |
| Easing | Use exponential curves: `ease-out-quart` (0.25, 1, 0.5, 1) for entrances; avoid bounce/elastic | Natural deceleration; bounce feels dated |
| Properties | Animate only `transform` and `opacity`; use `grid-template-rows: 0fr → 1fr` for height transitions | Avoid layout recalculation |
| Reduced motion | Implement `@media (prefers-reduced-motion: reduce)` alternatives for all animations | Vestibular disorders affect ~35% of adults 40+ |
| Exit animations | 75% of entrance duration | Exits feel faster than entrances |

**Motion Tokens (define in Tailwind or CSS variables):**
```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

**Anti-patterns to avoid:**
- Animating width, height, padding, margin directly
- Bounce or elastic easing (tacky, draws attention to animation)
- Animation for animation's sake (animation fatigue is real)

### Accessibility

| Requirement | Specification | Verification |
|-------------|---------------|--------------|
| Focus visible | Use `:focus-visible` for keyboard-only focus rings; 2px, high contrast, offset | Tab through all interactive elements |
| Skip links | Provide "Skip to main content" link, hidden off-screen, visible on focus | First Tab press on page |
| ARIA labels | All icon-only buttons need `aria-label`; form fields need visible `<label>` | Screen reader testing |
| Keyboard navigation | Full keyboard support for navigation, modals, dropdowns; Escape closes overlays | Tab, Enter, Escape, Arrow keys |
| Roving tabindex | For tab groups/menus: one item tabbable, arrow keys move within group | Keyboard-only navigation test |
| Reduced motion | Honor `prefers-reduced-motion`; provide fade alternatives for motion animations | OS reduced motion setting |
| Color independence | Never use color alone to convey information; pair with icons/text | Grayscale screenshot test |

**MarkdownViewer Modal Specifics:**
- Use native `<dialog>` element or shadcn Dialog with proper focus trapping
- Return focus to trigger button on close
- Close on Escape key
- Use `inert` attribute on background content

### UX Writing

| Element | Requirement | Example |
|---------|-------------|---------|
| Button labels | Specific verb + object; never "OK", "Submit", "Click here" | "Download Example", "View Markdown", "Open Menu" |
| Link text | Standalone meaning; avoid "click here" or "learn more" | "View OWASP Authentication Guide" |
| Error messages | What happened + why + how to fix | "Failed to load resources. Check your connection and try again." |
| Empty states | Acknowledge briefly + explain value + provide action | "No examples loaded. Check your connection or try refreshing the page." |
| Loading states | Specific action being performed | "Loading security examples...", "Fetching OWASP resources..." |

**Anti-patterns to avoid:**
- Redundant copy (heading restated in intro paragraph)
- Vague errors ("Something went wrong")
- Humor in error states
- Generic placeholders used as labels

### Component-Specific Design Requirements

#### Navigation Component
- Desktop: Horizontal layout with consistent spacing; active state indicator for current page
- Mobile hamburger: 44px touch target; animated icon transition (hamburger → X)
- Mobile menu: Full-screen overlay with generous touch targets; staggered entrance animation
- Logo/brand mark aligned left; primary actions aligned right

#### ExampleCard Component
- Avoid card-in-card nesting; use flat layout with clear visual separation
- Action buttons (View/Download) aligned consistently; primary action emphasized
- Description truncated with ellipsis; full content in expanded view
- Hover state: subtle elevation or background shift (not both)

#### MarkdownViewer Modal
- Max-width 4xl (896px); max-height 80vh with scroll
- Code blocks: syntax highlighting with accessible contrast; copy-to-clipboard button
- Header: filename prominent; close button with keyboard shortcut hint
- Footer: Download action clearly labeled

#### ResourceCategoryCard Component
- Category title prominent; link count as secondary info
- Consistent link styling; external link indicator (icon + `target="_blank"`)
- Expandable/collapsible on mobile for long lists

### Design Quality Checklist

Before implementation is considered complete, verify:

- [ ] **Squint test**: Blur the UI—can you identify the most important element and clear groupings?
- [ ] **AI slop test**: Would someone immediately recognize this as "AI-generated"? If yes, revise.
- [ ] **8-state audit**: Every interactive element has all 8 states designed
- [ ] **Keyboard walkthrough**: Complete all tasks using only keyboard
- [ ] **Reduced motion**: Verify experience with `prefers-reduced-motion: reduce`
- [ ] **Touch target audit**: All interactive elements ≥ 44x44px
- [ ] **Contrast check**: Run automated contrast checker on all text/background combinations
- [ ] **Dark mode parity**: All features work equally in light and dark themes

## 13. Implementation approach / Technical narrative

**TL;DR:** Create example markdown files in `public/examples/` served as static downloadable assets. Add a responsive Navigation component, a Resources landing page with View/Download functionality, and dedicated pages for OWASP and agentic engineering links. Users can browse examples, view syntax-highlighted markdown in a modal, and download the raw files.

### Static Examples Directory (`public/examples/`)

```
public/examples/
├── manifest.json                # Metadata for all examples (used by landing page)
├── agents/
│   ├── security-reviewer.md
│   ├── dependency-auditor.md
│   ├── secrets-scanner.md
│   ├── api-security-reviewer.md
│   └── ai-code-validator.md
└── prompts/
    ├── secure-code-review.prompt.md
    ├── threat-model.prompt.md
    ├── security-checklist-audit.prompt.md
    ├── dependency-security-check.prompt.md
    └── input-validation-review.prompt.md
```
examples/
├── README.md                    # Index and usage guide
├── agents/
│   ├── security-reviewer.md
│   ├── dependency-auditor.md
│   ├── secrets-scanner.md
│   ├── api-security-reviewer.md
│   └── ai-code-validator.md
├── prompts/
│   ├── secure-code-review.prompt.md
│   ├── threat-model.prompt.md
│   ├── security-checklist-audit.prompt.md
│   ├── dependency-security-check.prompt.md
│   └── input-validation-review.prompt.md
```

### New React Components Structure

```
src/
├── types/
│   ├── examples.ts              # Interfaces for examples manifest
│   └── resources.ts             # Interfaces for resource links
├── services/
│   ├── examplesService.ts       # Fetch manifest and markdown content
│   └── resourcesService.ts      # Fetch and parse resources JSON
├── components/
│   ├── Navigation.tsx           # Responsive navigation with hamburger menu
│   ├── Navigation.test.tsx
│   ├── MarkdownViewer.tsx       # Modal with syntax-highlighted markdown
│   ├── MarkdownViewer.test.tsx
│   ├── ExampleCard.tsx          # Card with View/Download buttons
│   └── ResourceCategoryCard.tsx # Card for external link categories
├── pages/
│   ├── Resources.tsx            # Resources landing page (examples + links)
│   ├── Resources.test.tsx
│   ├── OWASPLinks.tsx           # OWASP links categorized by security topic
│   ├── OWASPLinks.test.tsx
│   ├── AgenticEngineering.tsx   # Vibe-to-agentic transition resources
│   └── AgenticEngineering.test.tsx
public/
├── examples/
│   ├── manifest.json            # Metadata for all examples
│   ├── agents/*.md              # Agent example files
│   └── prompts/*.md             # Prompt example files
└── resources-data.json          # JSON data for OWASP and agentic links
```

### Navigation Component Design

The Navigation component will:

1. **Desktop (>= 768px)**: Horizontal nav bar with links to Home, Resources, OWASP Links, Agentic Engineering, Privacy
2. **Mobile (< 768px)**: Hamburger menu icon that expands to full-screen or slide-out menu
3. **Accessibility**: Full keyboard navigation, ARIA labels, focus management
4. **Styling**: Use existing Tailwind classes and shadcn/ui components

```tsx
// Navigation component structure (pseudocode)
<nav className="...">
  {/* Desktop nav */}
  <div className="hidden md:flex">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/resources">Resources</NavLink>
    <NavLink to="/owasp-links">OWASP Links</NavLink>
    <NavLink to="/agentic-engineering">Agentic Engineering</NavLink>
  </div>
  
  {/* Mobile hamburger */}
  <button className="md:hidden" onClick={toggleMenu}>
    <MenuIcon />
  </button>
  
  {/* Mobile menu overlay */}
  {isOpen && <MobileMenu />}
</nav>
```

### Responsive Breakpoints

| Breakpoint | Width      | Navigation Style            |
| ---------- | ---------- | --------------------------- |
| Mobile     | < 640px    | Hamburger menu, full-screen overlay |
| Tablet     | 640-767px  | Hamburger menu, slide-out panel     |
| Desktop    | >= 768px   | Horizontal navigation bar           |

### Page Layout Pattern

Each new page will follow the existing pattern from Index.tsx:

```tsx
const ResourcePage = () => {
  return (
    <GradientBackground intensity={50} brightness={89}>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <Navigation />
        <ThemeToggle />
        {/* Page content */}
        <Footer />
      </div>
    </GradientBackground>
  );
};
```

### Route Configuration

Update `App.tsx` to include new routes:

```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/resources" element={<Resources />} />
  <Route path="/owasp-links" element={<OWASPLinks />} />
  <Route path="/agentic-engineering" element={<AgenticEngineering />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Content Architecture: Example Files as Downloadable Resources

The example markdown files are **user-facing resources** served as static assets, browsable via a landing page with view and download capabilities.

#### File Location & Serving

```
public/examples/
├── manifest.json              # Metadata for all examples (used by landing page)
├── agents/
│   ├── security-reviewer.md
│   ├── dependency-auditor.md
│   ├── secrets-scanner.md
│   ├── api-security-reviewer.md
│   └── ai-code-validator.md
└── prompts/
    ├── secure-code-review.prompt.md
    ├── threat-model.prompt.md
    ├── security-checklist-audit.prompt.md
    ├── dependency-security-check.prompt.md
    └── input-validation-review.prompt.md
```

Files in `public/` are served as static assets by Vite, so:
- **Download**: Direct link to `/examples/agents/security-reviewer.md`
- **View**: Fetch the raw markdown and display with syntax highlighting

#### Landing Page Structure (`/resources`)

```
Resources
├── Security Agents (5)
│   ├── Security Reviewer                    [View] [Download]
│   ├── Dependency Auditor                   [View] [Download]
│   ├── Secrets Scanner                      [View] [Download]
│   ├── API Security Reviewer                [View] [Download]
│   └── AI Code Validator                    [View] [Download]
├── Security Prompts (5)
│   ├── Secure Code Review                   [View] [Download]
│   ├── Threat Model                         [View] [Download]
│   ├── Security Checklist Audit             [View] [Download]
│   ├── Dependency Security Check            [View] [Download]
│   └── Input Validation Review              [View] [Download]
└── Reference Links
    ├── OWASP Links                          [View Page →]
    └── Agentic Engineering Resources        [View Page →]
```

#### Manifest File (`public/examples/manifest.json`)

The landing page reads metadata from a manifest file:

```json
{
  "agents": {
    "title": "Security Agents",
    "description": "AI agent configurations for security review tasks",
    "items": [
      {
        "id": "security-reviewer",
        "title": "Security Reviewer",
        "description": "Code security review agent for vulnerabilities and best practices",
        "filename": "security-reviewer.md",
        "path": "/examples/agents/security-reviewer.md"
      }
    ]
  },
  "prompts": {
    "title": "Security Prompts",
    "description": "Reusable prompts for security-focused code review",
    "items": [
      {
        "id": "secure-code-review",
        "title": "Secure Code Review",
        "description": "Prompt for reviewing code for security vulnerabilities",
        "filename": "secure-code-review.prompt.md",
        "path": "/examples/prompts/secure-code-review.prompt.md"
      }
    ]
  }
}
```

#### View Modal with Syntax Highlighting

When user clicks [View], a modal displays the raw markdown with syntax highlighting:

```tsx
// Using a lightweight syntax highlighter like Prism or highlight.js
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownViewer = ({ content, filename }: { content: string; filename: string }) => (
  <Dialog>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
      <DialogHeader>
        <DialogTitle>{filename}</DialogTitle>
      </DialogHeader>
      <SyntaxHighlighter language="markdown" style={oneDark}>
        {content}
      </SyntaxHighlighter>
      <DialogFooter>
        <Button asChild>
          <a href={`/examples/agents/${filename}`} download>
            Download
          </a>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
```

#### Data Flow

```
public/examples/manifest.json  →  fetch()  →  Resources.tsx (landing page)
                                                    ↓
                                              User clicks [View]
                                                    ↓
public/examples/agents/*.md    →  fetch()  →  MarkdownViewer modal (syntax highlighted)
                                                    ↓
                                              User clicks [Download]
                                                    ↓
                                              Browser downloads raw .md file
```

#### TypeScript Interfaces

```typescript
// src/types/examples.ts
interface ExampleItem {
  id: string;
  title: string;
  description: string;
  filename: string;
  path: string;
}

interface ExampleCategory {
  title: string;
  description: string;
  items: ExampleItem[];
}

interface ExamplesManifest {
  agents: ExampleCategory;
  prompts: ExampleCategory;
}
```

#### Dependencies

This approach requires adding a syntax highlighting library:

```bash
npm install react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
```

Alternatively, use a lighter option like `prism-react-renderer` (~3KB) if bundle size is a concern.

### Reference Links Pages (OWASP & Agentic Engineering)

The "Reference Links" section links to separate pages (`/owasp-links`, `/agentic-engineering`) that display curated external links. These use the existing JSON + React pattern:

**`public/resources-data.json` Structure:**

```json
{
  "owasp": {
    "title": "OWASP Security Resources",
    "description": "Curated links from the OWASP Cheat Sheet Series",
    "categories": [
      {
        "id": "authentication",
        "title": "Authentication & Authorization",
        "links": [
          {
            "id": "auth-1",
            "title": "Authentication Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
            "description": "Best practices for implementing authentication",
            "checklistSection": "sec-1"
          }
        ]
      }
    ]
  },
  "agenticEngineering": {
    "title": "From Vibe Coding to Agentic Engineering",
    "description": "Resources for systematic AI-assisted development",
    "categories": [
      {
        "id": "concepts",
        "title": "Core Concepts",
        "links": [
          {
            "id": "ae-1",
            "title": "What is Agentic Engineering?",
            "url": "https://example.com/agentic-engineering",
            "description": "Understanding the shift from ad-hoc to systematic AI workflows"
          }
        ]
      }
    ]
  }
}
```

**TypeScript Interfaces:**

```typescript
// src/types/resources.ts
interface ResourceLink {
  id: string;
  title: string;
  url: string;
  description: string;
  checklistSection?: string; // Optional link to checklist section
}

interface ResourceCategory {
  id: string;
  title: string;
  links: ResourceLink[];
}

interface ResourcePage {
  title: string;
  description: string;
  categories: ResourceCategory[];
}

interface ResourcesData {
  owasp: ResourcePage;
  agenticEngineering: ResourcePage;
}
```

**React Page Pattern:**

```tsx
// src/pages/OWASPLinks.tsx
const OWASPLinks = () => {
  const [data, setData] = useState<ResourcePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/resources-data.json')
      .then(res => res.json())
      .then((data: ResourcesData) => setData(data.owasp))
      .catch(err => setError('Failed to load resources'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  return (
    <GradientBackground intensity={50} brightness={89}>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <Navigation />
        <ThemeToggle />
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        {data.categories.map(category => (
          <ResourceCategoryCard key={category.id} category={category} />
        ))}
        <Footer />
      </div>
    </GradientBackground>
  );
};
```

#### Relationship Between Markdown and JSON

The `examples/resources/*.md` files serve as:
1. **Source documentation** for curating the JSON data
2. **Standalone GitHub-readable** versions of the same content
3. **Templates** for users who want to maintain their own resource lists

The `public/resources-data.json` is:
1. **The canonical data source** for the React app
2. **Derived from** the markdown research/curation
3. **Structured for programmatic consumption**

**Synchronization:** During implementation, the JSON is created by extracting structured data from the curated markdown files. They are not automatically synced - the markdown files are the human-editable source, and JSON is generated/updated manually when content changes.

### Agent Example Format

Each agent file follows the pattern established in `.github/agents/`:

```markdown
---
description: "Brief description of the agent's purpose"
---

# Agent Name

## Core Identity

What this agent does and its primary focus.

## Primary Objective

The main goal when invoked.

## Operating Principles

- Key behaviors and constraints

## Workflow

Step-by-step process the agent follows.

## Output Format

Expected structure of agent responses.

## References

- Links to relevant documentation
```

### Prompt Example Format

Each prompt follows the pattern in `.github/prompts/`:

```markdown
---
mode: "agent"
description: "Brief description"
tools: ["relevant", "tools"]
---

# Prompt Title

Instruction text...

## Inputs

- Required inputs

## Requirements

- Quality requirements

## Output Structure

Expected output format
```

### OWASP Link Extraction

The `examples/resources/owasp-links.md` will be organized by checklist section:

1. Parse `checklist-data.json`
2. Extract unique links with their associated titles and descriptions
3. Group by section (Authentication, Input Validation, etc.)
4. Add brief context for each link category

### Agentic Engineering Resources

The `examples/resources/agentic-engineering.md` will curate:

1. **Conceptual Resources** - What is agentic engineering vs. vibe coding
2. **Tool Documentation** - GitHub Copilot, OpenCode, Claude Code
3. **Best Practices** - Prompt engineering for security, agent orchestration
4. **Community Resources** - Repositories, blogs, tutorials
5. **Transition Guides** - Moving from ad-hoc to systematic approaches

## 14. Testing & validation plan

### Example Files (Markdown)

- **Manual Review**: Each example file reviewed for:
  - Correct format matching established patterns
  - Accurate security information
  - Working external links
  - Clear usage instructions
- **Link Validation**: All extracted OWASP links verified accessible
- **Cross-Reference Check**: Verify agent/prompt references match checklist sections

### React Components (Unit Tests)

- **Navigation Component**:
  - Renders correctly on desktop (shows horizontal nav)
  - Renders correctly on mobile (shows hamburger icon)
  - Menu opens/closes on click
  - Keyboard navigation works (Tab, Enter, Escape)
  - ARIA labels present and correct
  - Links navigate to correct routes

- **Resource Pages**:
  - Pages render without errors
  - Content displays correctly
  - External links have correct href and target attributes
  - Categorized links display in correct sections
  - Loading and error states handled

### Responsive Design Testing

| Test Case                       | Method                           | Pass Criteria                    |
| ------------------------------- | -------------------------------- | -------------------------------- |
| Mobile portrait (320px)         | Browser DevTools                 | Hamburger menu visible, no overflow |
| Mobile landscape (568px)        | Browser DevTools                 | Menu accessible, content readable  |
| Tablet portrait (768px)         | Browser DevTools                 | Desktop nav appears              |
| Desktop (1024px, 1440px)        | Browser DevTools                 | Full nav visible, proper spacing |
| Touch interactions              | Mobile device or emulator        | Menu responds to touch           |

### Coverage Requirements

Per Quality Policy (`.github/copilot-instructions.md#quality-policy`):
- New components: >= 80% line coverage
- Navigation (hot path): 100% coverage
- Error handling paths: 100% coverage

## 15. Deployment plan & roll-back strategy

**Environments:** 
- Development: Local dev server (npm run dev)
- Production: Vercel deployment (automatic on merge to main)

**Deployment Steps:**

1. Create feature branch with all changes
2. Run `npm run lint` and fix any issues
3. Run `npm run test:coverage` and verify coverage targets met
4. Run `npm run build` and verify no build errors
5. Test responsive design manually in browser
6. Submit PR for review
7. Merge to main after approval (triggers Vercel deployment)

**Roll-back:** 
- Revert merge commit if issues discovered post-merge
- Vercel supports instant rollback to previous deployment

## 16. Monitoring & observability

- **Vercel Analytics**: Already integrated; monitor page views for new pages
- **Error Tracking**: Existing toast error handling extends to new pages
- **Performance**: Monitor Core Web Vitals via Vercel dashboard
- **Link Monitoring**: Consider adding periodic link checker for external resources

## 17. Compliance, security & privacy considerations

- All content is educational/reference material
- No credentials, secrets, or sensitive data in examples
- External links are to public resources only
- Examples should not contain real vulnerability details that could be exploited

## 18. Communication plan

- PR description will summarize new examples available
- README updates will make examples discoverable
- No external notification required

## 19. Related documents & links

- Plan template: `plans/plan-template.md`
- Existing agents: `.github/agents/`
- Existing prompts: `.github/prompts/`
- OpenCode commands: `.opencode/commands/`
- Checklist data: `public/checklist-data.json`
- Quality policy: `.github/copilot-instructions.md#quality-policy`
- Frontend design skill: `.opencode/skill/skills/frontend-design/`
- Typography reference: `.opencode/skill/skills/frontend-design/reference/typography.md`
- Color reference: `.opencode/skill/skills/frontend-design/reference/color-and-contrast.md`
- Spatial design reference: `.opencode/skill/skills/frontend-design/reference/spatial-design.md`
- Motion design reference: `.opencode/skill/skills/frontend-design/reference/motion-design.md`
- Interaction design reference: `.opencode/skill/skills/frontend-design/reference/interaction-design.md`
- Responsive design reference: `.opencode/skill/skills/frontend-design/reference/responsive-design.md`
- UX writing reference: `.opencode/skill/skills/frontend-design/reference/ux-writing.md`

## 20. Appendix

### A. Sample OWASP Links from checklist-data.json

The following unique OWASP Cheat Sheet links are present in the checklist:

| Section            | Link                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Authentication     | https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html             |
| Session Management | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html         |
| MFA                | https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html |
| Password Storage   | https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html           |
| Forgot Password    | https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html            |
| OAuth2             | https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html                     |
| Input Validation   | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html           |
| SQL Injection      | https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html   |
| File Upload        | https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html                |
| Error Handling     | https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html             |
| ...                | (additional links to be extracted)                                                         |

### B. Proposed Agentic Engineering Resources

| Category   | Resource                              | Description                                |
| ---------- | ------------------------------------- | ------------------------------------------ |
| Concepts   | Simon Willison's AI Engineering blog  | Practical AI-assisted development patterns |
| Tools      | GitHub Copilot Documentation          | Official Copilot agent/prompt patterns     |
| Tools      | Anthropic Claude Code documentation   | Claude-specific agent patterns             |
| Tools      | OpenCode.ai documentation             | OpenCode command and agent patterns        |
| Security   | OWASP ML Security Top 10              | AI/ML-specific security considerations     |
| Security   | GitHub Security Lab                   | Security research and tooling              |
| Transition | Microsoft Generative AI for Beginners | Comprehensive learning path                |

### C. Navigation Component Wireframes

**Desktop Layout (>= 768px)**:
```
┌─────────────────────────────────────────────────────────────┐
│  Logo    Home   Resources   OWASP   Agentic   [Theme] [☰]  │
└─────────────────────────────────────────────────────────────┘
```

**Mobile Layout (< 768px)**:
```
┌─────────────────────┐
│  Logo         [☰]   │
└─────────────────────┘

Menu Open:
┌─────────────────────┐
│  Logo         [✕]   │
├─────────────────────┤
│  Home               │
│  Resources          │
│  OWASP Links        │
│  Agentic Engineering│
│  Privacy            │
└─────────────────────┘
```

### D. Page Route Structure

| Route                   | Component              | Description                          |
| ----------------------- | ---------------------- | ------------------------------------ |
| `/`                     | Index                  | Main security checklist              |
| `/resources`            | Resources              | Resources landing/index page         |
| `/owasp-links`          | OWASPLinks             | Categorized OWASP reference links    |
| `/agentic-engineering`  | AgenticEngineering     | Vibe-to-agentic transition resources |
| `/privacy`              | Privacy                | Privacy policy (existing)            |
| `*`                     | NotFound               | 404 page (existing)                  |

---

_Checklist before marking plan as ready for review:_

- [x] All minimal required fields are filled
- [x] Dates validated (ISO 8601)
- [x] Complexity assigned to each task (XS/S/M/L/XL)
- [x] At least one test/validation approach is defined
- [x] Security & compliance items are noted
- [x] UI components specified with responsive breakpoints
- [x] Test coverage requirements defined
- [x] Frontend design requirements documented (Section 12)
- [x] Typography requirements (font choices, modular scale, fluid sizing)
- [x] Color/theme requirements (design tokens, dark mode, avoiding AI slop)
- [x] Layout requirements (visual rhythm, spacing scale, container queries)
- [x] Interaction state requirements (8-state model for all interactive elements)
- [x] Responsive requirements (mobile-first, touch targets 44px+, input method detection)
- [x] Motion requirements (exponential easing, reduced motion, transform/opacity only)
- [x] Accessibility requirements (focus-visible, ARIA, keyboard navigation, skip links)
- [x] UX writing requirements (button labels, error messages, empty states)
- [x] Component-specific design requirements documented
- [x] Design quality checklist provided
