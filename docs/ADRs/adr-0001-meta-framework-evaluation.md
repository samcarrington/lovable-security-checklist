---
title: "ADR-0001: Meta-Framework Evaluation for Multi-Page Application"
status: "Proposed"
date: "2026-01-17"
authors: "Development Team"
tags: ["architecture", "framework", "build-tooling", "migration"]
supersedes: ""
superseded_by: ""
---

# ADR-0001: Meta-Framework Evaluation for Multi-Page Application

## Status

**Proposed** | Accepted | Rejected | Superseded | Deprecated

## Context

The Security Checklist application is expanding from a single-page application (SPA) to a multi-page site with the following planned additions:

- **New pages**: `/resources`, `/owasp-links`, `/agentic-engineering`
- **Static assets**: Downloadable markdown example files in `public/examples/`
- **Navigation**: Responsive navigation component across all pages

### Current Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Build tool | Vite | 7.3.1 |
| UI framework | React | 19.2.3 |
| Routing | react-router-dom | 6.30.3 |
| Styling | Tailwind CSS | 3.4.19 |
| Components | shadcn/ui (Radix) | Various |
| State | TanStack Query | 5.90.18 |
| Testing | Vitest | 4.0.17 |
| Deployment | Vercel | N/A |

### Problem Statement

With the planned expansion to 6+ pages (Index, Privacy, NotFound, Resources, OWASPLinks, AgenticEngineering), questions arise about whether the current Vite + React Router SPA architecture remains optimal, or whether migrating to a meta-framework (Next.js, Astro, Remix) would provide meaningful benefits for:

1. **SEO and performance** - Static/server rendering for content pages
2. **Developer experience** - File-based routing, built-in optimizations
3. **Content management** - MDX support, content collections
4. **Build output** - Smaller bundles, better code splitting

### Constraints

- **CTX-001**: Limited development resources; migration effort must justify benefits
- **CTX-002**: Existing Vercel deployment must remain supported
- **CTX-003**: Current test suite (Vitest) and component library (shadcn/ui) should be preserved
- **CTX-004**: React 19 compatibility required
- **CTX-005**: No backend/API requirements; all data is static JSON files

## Decision

**Recommend: Remain with Vite + React Router for the current scope.**

The planned 3 new pages and static markdown assets do not justify the migration cost to a meta-framework. The current architecture adequately serves the use case, and the benefits of meta-frameworks (SSR, SSG, file-based routing) provide marginal value for this primarily client-interactive application.

**Re-evaluate this decision if:**
- Page count exceeds 10-15 pages
- SEO becomes a critical business requirement
- Blog/content-heavy features are added requiring MDX
- Server-side data fetching or API routes are needed

## Consequences

### Positive

- **POS-001**: **Zero migration effort** - Development time can focus on feature delivery rather than framework migration
- **POS-002**: **Team familiarity** - No learning curve for new framework patterns, file conventions, or build behaviors
- **POS-003**: **Simpler architecture** - Single build step, predictable client-side routing, no hydration complexity
- **POS-004**: **Test stability** - Existing Vitest tests continue working without modification
- **POS-005**: **Faster iteration** - Vite's HMR and build times are excellent; no framework overhead
- **POS-006**: **Dependency stability** - React 19 + Vite 7 is a proven, stable combination without framework-specific edge cases

### Negative

- **NEG-001**: **No automatic code splitting by route** - Must manually configure lazy loading with `React.lazy()` and `Suspense`
- **NEG-002**: **Client-side rendering only** - Initial HTML is empty shell; content not visible to crawlers without JavaScript
- **NEG-003**: **Manual SEO optimization** - Must add `react-helmet-async` or similar for meta tags per page
- **NEG-004**: **No file-based routing** - Routes must be explicitly defined in `App.tsx`
- **NEG-005**: **No built-in image optimization** - Manual configuration needed for responsive images
- **NEG-006**: **Future migration debt** - If requirements change, migration later may be more complex than doing it now

## Alternatives Considered

### Next.js 15 (App Router)

- **ALT-001**: **Description**: React meta-framework with hybrid SSR/SSG, file-based routing, built-in image optimization, and API routes. Industry standard for production React applications.

- **ALT-002**: **Pros**:
  - Excellent SEO with server-side rendering
  - File-based routing eliminates manual route configuration
  - Built-in Image component with automatic optimization
  - Strong Vercel integration (same deployment platform)
  - Large ecosystem and community support
  - React Server Components for reduced bundle size

- **ALT-003**: **Cons**:
  - Significant migration effort (routing patterns, component structure)
  - App Router introduces new mental model (server vs client components)
  - React 19 support still maturing in Next.js ecosystem
  - Potential compatibility issues with current shadcn/ui setup
  - Overkill for static content site without backend

- **ALT-004**: **Rejection Reason**: Migration cost exceeds benefit for current scope. The application is primarily client-interactive (checkbox state, localStorage, confetti effects) with no SEO-critical requirements. Next.js strengths (SSR, API routes) are not needed.

### Astro 5

- **ALT-005**: **Description**: Content-focused meta-framework with islands architecture. Ships zero JavaScript by default, hydrates only interactive components. Excellent for content-heavy sites with sprinkled interactivity.

- **ALT-006**: **Pros**:
  - Exceptional performance (ships minimal JS)
  - Built-in markdown/MDX support for example files
  - Content collections for type-safe content management
  - React integration via `@astrojs/react`
  - File-based routing with static generation
  - Smaller bundle sizes than full React SPA

- **ALT-007**: **Cons**:
  - Islands architecture requires rethinking component boundaries
  - Interactive components must be explicitly hydrated (`client:load`, `client:visible`)
  - Less mature than Next.js; smaller ecosystem
  - Potential complexity managing hydration for highly interactive pages
  - Testing story less established than Vite + React

- **ALT-008**: **Rejection Reason**: The Security Checklist main page is highly interactive (100+ checkboxes, real-time progress, localStorage persistence). Astro's strength is content sites with limited interactivity. The islands model would require significant refactoring and might introduce hydration complexity for the main interactive experience.

### Remix

- **ALT-009**: **Description**: Full-stack React framework emphasizing web fundamentals, progressive enhancement, and nested routing. Strong focus on data loading patterns.

- **ALT-010**: **Pros**:
  - Excellent data loading with loaders/actions
  - Progressive enhancement (works without JS)
  - Nested layouts reduce code duplication
  - Strong TypeScript support

- **ALT-011**: **Cons**:
  - Designed for server-rendered apps with backend
  - Less suitable for purely static/client-side apps
  - Smaller community than Next.js
  - Migration path less documented than Next.js

- **ALT-012**: **Rejection Reason**: Remix's strengths (form handling, data mutations, progressive enhancement) are not relevant to this static content application. It adds server complexity without corresponding benefit.

### Vite with Manual SSG Plugin

- **ALT-013**: **Description**: Add `vite-plugin-ssr` or `vite-plugin-ssg` to generate static HTML at build time while keeping Vite as the core build tool.

- **ALT-014**: **Pros**:
  - Minimal migration; additive to current setup
  - Pre-rendered HTML improves SEO
  - Keeps existing tooling and patterns
  - Can be adopted incrementally

- **ALT-015**: **Cons**:
  - `vite-plugin-ssr` has been deprecated in favor of Vike
  - Adds configuration complexity
  - Less community support than full frameworks
  - May conflict with react-router-dom patterns

- **ALT-016**: **Rejection Reason**: Adds complexity without the full benefits of a meta-framework. If SSG is needed, a purpose-built framework (Astro, Next.js) is preferable to plugin-based solutions.

## Implementation Notes

### If Staying with Vite + React Router (Recommended)

- **IMP-001**: **Add code splitting** - Implement `React.lazy()` for new pages to reduce initial bundle size:
  ```tsx
  const Resources = React.lazy(() => import('./pages/Resources'));
  const OWASPLinks = React.lazy(() => import('./pages/OWASPLinks'));
  ```

- **IMP-002**: **Add SEO meta tags** - Install `react-helmet-async` for per-page meta tags:
  ```bash
  npm install react-helmet-async
  ```

- **IMP-003**: **Prerender critical pages** - Consider `vite-plugin-prerender` for static HTML generation of content pages if SEO becomes important

- **IMP-004**: **Monitor bundle size** - Set up bundle analysis to track growth as pages are added:
  ```bash
  npm install -D rollup-plugin-visualizer
  ```

### If Migrating to Next.js (Future Consideration)

- **IMP-005**: **Migration path**: Pages → App Router structure, update imports, configure Tailwind, migrate tests from Vitest to Jest/Vitest hybrid
- **IMP-006**: **Estimated effort**: 2-3 days for basic migration, 1 week for full parity including tests
- **IMP-007**: **Risk mitigation**: Create proof-of-concept branch before committing to migration

### If Migrating to Astro (Future Consideration)

- **IMP-008**: **Migration path**: Identify island boundaries, convert layout components to Astro, keep React for interactive sections
- **IMP-009**: **Estimated effort**: 3-5 days due to paradigm shift
- **IMP-010**: **Best for**: If content pages significantly outnumber interactive pages in the future

## Decision Matrix

| Criteria (Weight) | Vite + RR | Next.js | Astro | Remix |
|-------------------|-----------|---------|-------|-------|
| Migration effort (25%) | 5 | 2 | 2 | 2 |
| Performance (20%) | 3 | 4 | 5 | 4 |
| SEO capability (15%) | 2 | 5 | 5 | 4 |
| DX / Familiarity (20%) | 5 | 3 | 2 | 2 |
| Ecosystem / Support (10%) | 4 | 5 | 3 | 3 |
| Future flexibility (10%) | 3 | 5 | 4 | 4 |
| **Weighted Score** | **3.85** | **3.55** | **3.45** | **3.00** |

*Scale: 1 (Poor) to 5 (Excellent)*

## Re-evaluation Triggers

This decision should be revisited if any of the following occur:

- **TRG-001**: Page count exceeds 10 distinct routes
- **TRG-002**: SEO audit identifies client-rendering as a blocker
- **TRG-003**: Blog or documentation features requiring MDX are planned
- **TRG-004**: Performance audits show unacceptable bundle sizes (>500KB gzipped)
- **TRG-005**: Server-side data requirements emerge (API routes, database)

## References

- **REF-001**: [Vite Documentation](https://vitejs.dev/)
- **REF-002**: [Next.js App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- **REF-003**: [Astro + React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- **REF-004**: [React Router v6 Documentation](https://reactrouter.com/)
- **REF-005**: Plan: `plans/security-examples-and-resources-plan.md`
