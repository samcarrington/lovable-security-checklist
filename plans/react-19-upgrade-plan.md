# React 19 Upgrade Plan

## 1. Title

Upgrade lovable-security-checklist from React 18.3.1 to React 19

## 2. Short description

Upgrade the project from React 18.3.1 to React 19.x, including all dependent packages, verifying API compatibility, ensuring all existing tests pass, and confirming the application functions correctly with modern React patterns.

## 3. Current status

```yaml
owner: TBD
state: proposed
last_updated: 2026-01-08
blockers: []
```

## 4. Objectives

1. Upgrade React and React DOM from 18.3.1 to 19.x stable release
2. Update all React-dependent packages to React 19 compatible versions
3. Update build tooling (Vite, Vitest) to versions supporting React 19
4. Verify all existing tests pass after upgrade
5. Verify all existing functionality works correctly after upgrade
6. Fill any remaining test coverage gaps for untested components
7. Ensure zero breaking changes to end-user functionality
8. Document any new React 19 features that could benefit the project

## 5. Success criteria

| Name               | Metric                           | Target                       | Verification                         |
| ------------------ | -------------------------------- | ---------------------------- | ------------------------------------ |
| Build Success      | Build completes without errors   | 0 errors                     | Run `npm run build` successfully     |
| Test Pass Rate     | All existing tests pass          | 100%                         | Run `npm run test:run`               |
| No Runtime Errors  | Console errors in browser        | 0 errors                     | Manual inspection in Chrome DevTools |
| Core Functionality | Checklist interactions work      | All features functional      | Manual E2E testing of all user flows |
| Bundle Size        | Gzipped bundle size              | Within 10% of current        | Compare build output sizes           |
| Performance        | Lighthouse performance score     | >= current score             | Run Lighthouse audit before/after    |
| Test Coverage      | Coverage for untested components | Add tests for remaining gaps | Run `npm run test:coverage`          |

## 6. Scope

```yaml
in:
  - Upgrade react and react-dom to version 19.x
  - Upgrade @types/react and @types/react-dom to version 19.x
  - Upgrade @vitejs/plugin-react-swc to React 19 compatible version
  - Upgrade vite to version 6.x or later as needed for React 19 support
  - Upgrade vitest to version compatible with updated vite
  - Verify and update @testing-library/react if needed
  - Verify react-confetti compatibility with React 19
  - Verify all Radix UI components work with React 19
  - Ensure all existing tests pass (4 test files)
  - Add tests for remaining untested components
  - Update TypeScript types as needed
  - Document any deprecation warnings and address them

out:
  - React Router upgrade from v6 to v7 (separate effort)
  - Adoption of React Server Components (not applicable - client-only app)
  - React Compiler integration (separate evaluation needed)
  - Major refactoring of existing component architecture
  - Adding new features beyond React 19 compatibility
  - Migrating to different state management solutions
  - Testing shadcn/ui components in src/components/ui/ (third-party, excluded from coverage)
```

## 7. Stakeholders & Roles

| Name | Role             | Responsibility                   | Contact |
| ---- | ---------------- | -------------------------------- | ------- |
| TBD  | Engineering Lead | Delivery and technical decisions | TBD     |
| TBD  | QA               | Manual testing verification      | TBD     |

## 8. High-level timeline & milestones

1. `M1` - Plan approved - TBD - Engineering Lead
2. `M2` - Dependencies updated, app compiles - TBD - Engineering Lead
3. `M3` - All existing tests passing - TBD - Engineering Lead
4. `M4` - Manual testing complete - TBD - QA
5. `M5` - Test coverage gaps filled - TBD - Engineering Lead
6. `M6` - Upgrade complete and merged - TBD - Engineering Lead

## 9. Task list

### Phase 1: Preparation and Baseline (Complexity: S)

- T-001 | Create backup branch of current working state | TBD | complexity: XS | deps: [] | done: true
- T-002 | Document current bundle sizes and Lighthouse scores for comparison | TBD | complexity: XS | deps: [] | done: true
- T-003 | Run existing test suite to confirm baseline (4 test files) | TBD | complexity: XS | deps: [] | done: true
- T-004 | Verify react-confetti 6.4.0 compatibility with React 19 | TBD | complexity: S | deps: [] | done: true

### Phase 2: Core Dependency Updates (Complexity: M)

- T-005 | Update react and react-dom to ^19.0.0 | TBD | complexity: S | deps: [T-001] | done: true
- T-006 | Update @types/react to ^19.0.0 | TBD | complexity: XS | deps: [T-005] | done: true
- T-007 | Update @types/react-dom to ^19.0.0 | TBD | complexity: XS | deps: [T-005] | done: true
- T-008 | Update @vitejs/plugin-react-swc to ^4.x (React 19 support) | TBD | complexity: S | deps: [T-005] | done: true
- T-009 | Update vite to ^6.x as required | TBD | complexity: M | deps: [T-008] | done: true (already on 7.x)
- T-010 | Update vitest and @vitest/coverage-v8 to compatible versions | TBD | complexity: S | deps: [T-009] | done: true (already on 4.x)
- T-011 | Update @testing-library/react if needed for React 19 | TBD | complexity: S | deps: [T-005] | done: true (already compatible)
- T-012 | Run npm install and resolve any peer dependency conflicts | TBD | complexity: M | deps: [T-005, T-006, T-007, T-008, T-009, T-010, T-011] | done: true

### Phase 3: Code Compatibility Verification (Complexity: S)

- T-013 | Run TypeScript compilation and fix any type errors | TBD | complexity: M | deps: [T-012] | done: true
- T-014 | Run ESLint and fix any new linting errors | TBD | complexity: S | deps: [T-012] | done: true
- T-015 | Verify application starts with `npm run dev` | TBD | complexity: XS | deps: [T-013, T-014] | done: true
- T-016 | Verify application builds with `npm run build` | TBD | complexity: XS | deps: [T-015] | done: true

### Phase 4: API Migration (if needed) (Complexity: S)

- T-017 | Review and address any forwardRef deprecation warnings | TBD | complexity: S | deps: [T-015] | done: true (only in shadcn/ui - excluded)
- T-018 | Review and update any ref callback patterns if needed | TBD | complexity: S | deps: [T-015] | done: true (none found)
- T-019 | Update Context.Provider to Context syntax if desired | TBD | complexity: XS | deps: [T-015] | done: true (none found)
- T-020 | Address any other React 19 deprecation warnings | TBD | complexity: M | deps: [T-015] | done: true (none found)

### Phase 5: Test Suite Verification (Complexity: M)

- T-021 | Run all existing tests and fix any failures | TBD | complexity: M | deps: [T-012] | done: true
- T-022 | Verify test utilities (test-utils.tsx) work correctly with React 19 | TBD | complexity: S | deps: [T-021] | done: true
- T-023 | Update any act() usage patterns if needed | TBD | complexity: S | deps: [T-021] | done: true (no changes needed)

### Phase 6: Fill Remaining Test Coverage Gaps (Complexity: M)

- T-024 | Add tests for ChecklistGrid component | TBD | complexity: M | deps: [T-022] | done: false
- T-025 | Add tests for ChecklistHeader component | TBD | complexity: S | deps: [T-022] | done: false
- T-026 | Add tests for ThemeToggle component | TBD | complexity: S | deps: [T-022] | done: false
- T-027 | Add tests for Footer component | TBD | complexity: XS | deps: [T-022] | done: false
- T-028 | Add tests for LoadingState component | TBD | complexity: XS | deps: [T-022] | done: false
- T-029 | Add tests for ErrorState component | TBD | complexity: XS | deps: [T-022] | done: false
- T-030 | Add tests for GradientBackground component | TBD | complexity: XS | deps: [T-022] | done: false
- T-031 | Add tests for use-mobile hook | TBD | complexity: S | deps: [T-022] | done: false

### Phase 7: Manual Testing & Verification (Complexity: M)

- T-032 | Manual test: Checkbox interactions and state persistence | TBD | complexity: S | deps: [T-016] | done: false
- T-033 | Manual test: Progress dial animations and calculations | TBD | complexity: S | deps: [T-016] | done: false
- T-034 | Manual test: Section expand/collapse (if applicable) | TBD | complexity: S | deps: [T-016] | done: false
- T-035 | Manual test: Confetti celebration on completion | TBD | complexity: S | deps: [T-016] | done: false
- T-036 | Manual test: Theme switching (light/dark mode) | TBD | complexity: S | deps: [T-016] | done: false
- T-037 | Manual test: LocalStorage data persistence | TBD | complexity: S | deps: [T-016] | done: false
- T-038 | Manual test: Responsive design on mobile viewports | TBD | complexity: S | deps: [T-016] | done: false
- T-039 | Manual test: Toast notifications | TBD | complexity: XS | deps: [T-016] | done: false

### Phase 8: Performance & Final Verification (Complexity: S)

- T-040 | Compare bundle sizes before/after upgrade | TBD | complexity: S | deps: [T-016] | done: false
- T-041 | Run Lighthouse audit and compare scores | TBD | complexity: S | deps: [T-016] | done: false
- T-042 | Verify no console errors or warnings in production build | TBD | complexity: S | deps: [T-016] | done: false
- T-043 | Run full test suite with coverage report | TBD | complexity: S | deps: [T-024, T-025, T-026, T-027, T-028, T-029, T-030, T-031] | done: false
- T-044 | Update documentation if needed | TBD | complexity: S | deps: [T-043] | done: false

## 10. Risks and mitigations

| ID    | Description                                                  | Probability | Impact | Mitigation                                                                 | Owner |
| ----- | ------------------------------------------------------------ | ----------- | ------ | -------------------------------------------------------------------------- | ----- |
| R-001 | react-confetti may not be compatible with React 19           | Low         | Medium | Test early; if incompatible, find alternative library or fork and fix      | TBD   |
| R-002 | Vite/Vitest major version updates introduce breaking changes | Medium      | Medium | Follow migration guides; pin to specific versions if needed                | TBD   |
| R-003 | Third-party Radix UI components have React 19 issues         | Low         | Medium | Radix UI officially supports React 19; update to latest versions           | TBD   |
| R-004 | TypeScript type incompatibilities between React 18 and 19    | Medium      | Low    | Use @types/react@19 and fix type errors incrementally                      | TBD   |
| R-005 | Performance regression after upgrade                         | Low         | Medium | Benchmark before/after; React 19 generally improves performance            | TBD   |
| R-006 | Breaking changes in forwardRef or ref handling               | Low         | Low    | Codebase uses shadcn/ui patterns with forwardRef; apply codemods if needed | TBD   |
| R-007 | Existing tests fail due to React 19 behavior changes         | Medium      | Medium | Fix tests incrementally; React Testing Library supports React 19           | TBD   |

## 11. Assumptions

- The development team has access to npm and can install updated packages
- The CI/CD pipeline can handle the upgraded dependencies
- No other major refactoring work is planned during this upgrade
- All Radix UI components at their current versions support React 19
- The project will remain a client-side only application (no SSR/RSC)
- React 19 stable (19.0.0+) is the target, not canary/experimental releases
- The existing test infrastructure (Vitest) is properly configured and working
- The 4 existing test files provide a baseline for regression testing

## 12. Implementation approach / Technical narrative

### TL;DR

This is a low-risk upgrade due to the modern codebase architecture and well-established test infrastructure. The main work involves updating package versions and verification. React 19's breaking changes primarily affect legacy patterns not used in this project. Vitest is already configured with 4 test files providing a solid baseline.

### Current Architecture Assessment

The lovable-security-checklist project is well-positioned for React 19 upgrade:

1. **Modern Root API**: Already using `createRoot` from `react-dom/client` in `src/main.tsx`
2. **No Legacy Patterns**: No usage of deprecated lifecycle methods, string refs, or legacy context
3. **Modern Hooks**: All state management uses `useState`, `useEffect`, `useMemo`, `useCallback`
4. **shadcn/ui Components**: Uses forwardRef pattern extensively in UI components
5. **Well-established Testing**: Vitest configured with test utilities and 4 test files

### Current Test Infrastructure Status

**Vitest is fully configured**:

- `vitest.config.ts` with jsdom environment and path aliases
- `src/test/setup.ts` with testing-library matchers and mocks (matchMedia, ResizeObserver, localStorage)
- `src/test/test-utils.tsx` with provider wrapper (QueryClient, ThemeProvider, BrowserRouter)
- Test scripts: `npm run test`, `npm run test:run`, `npm run test:coverage`
- Coverage configured with v8 provider, excluding shadcn/ui components

**Existing test files (4)**:

- `src/services/checklistService.test.ts` - Service layer tests
- `src/pages/Index.test.tsx` - Page integration tests
- `src/components/SectionCard.test.tsx` - Component tests
- `src/components/ProgressDial.test.tsx` - Component tests

### React 19 Breaking Changes Assessment

| Breaking Change                                   | Impact on Project                  | Action Required      |
| ------------------------------------------------- | ---------------------------------- | -------------------- |
| `ReactDOM.render` removed                         | None - already using `createRoot`  | None                 |
| `ReactDOM.hydrate` removed                        | None - not using SSR               | None                 |
| `unmountComponentAtNode` removed                  | None - not used                    | None                 |
| `ReactDOM.findDOMNode` removed                    | None - not used                    | None                 |
| Legacy Context removed                            | None - using modern Context        | None                 |
| String refs removed                               | None - using `useRef`              | None                 |
| Factory components removed                        | None - not used                    | None                 |
| `propTypes` removed from React                    | None - using TypeScript            | None                 |
| `defaultProps` for function components deprecated | None - using default parameters    | None                 |
| `forwardRef` may be deprecated                    | Low - used in shadcn/ui components | Monitor for warnings |

### React 19 New Features (Optional Adoption)

The following React 19 features could be adopted in future iterations:

1. **`use()` hook**: For reading promises and context conditionally
2. **`useActionState`**: For form state management (if forms are added)
3. **`useOptimistic`**: For optimistic UI updates
4. **`ref` as prop**: Simplify forwardRef usage in UI components
5. **`<Context>` as provider**: Cleaner context syntax

These are NOT required for the upgrade and can be adopted incrementally later.

### Dependency Update Strategy

```mermaid
graph TD
    A[Start] --> B[Baseline Tests]
    B --> C[Update React Core]
    C --> D[Update React Types]
    D --> E[Update Vite Plugin]
    E --> F[Update Vite]
    F --> G[Update Vitest]
    G --> H[Resolve Peer Dependencies]
    H --> I[Verify Build]
    I --> J[Run Tests]
    J --> K[Fill Test Gaps]
    K --> L[Manual Testing]
    L --> M[Complete]
```

### Package Version Targets

| Package                  | Current | Target  | Notes                  |
| ------------------------ | ------- | ------- | ---------------------- |
| react                    | 18.3.1  | ^19.0.0 | Core upgrade           |
| react-dom                | 18.3.1  | ^19.0.0 | Core upgrade           |
| @types/react             | 18.3.24 | ^19.0.0 | Type definitions       |
| @types/react-dom         | 18.3.7  | ^19.0.0 | Type definitions       |
| @vitejs/plugin-react-swc | 3.11.0  | ^4.0.0  | React 19 JSX transform |
| vite                     | 5.4.20  | ^6.0.0  | Build tool             |
| vitest                   | 2.1.8   | ^3.0.0  | Test runner            |
| @vitest/coverage-v8      | 2.1.8   | ^3.0.0  | Coverage               |
| @testing-library/react   | 16.3.0  | ^16.3.0 | Already compatible     |

### Rollback Strategy

If critical issues are discovered:

1. **Immediate rollback**: `git checkout main` and re-deploy
2. **Partial rollback**: Revert specific package versions in package.json
3. **Recovery branch**: The backup branch (T-001) preserves the working state

### Code Changes Expected

Based on codebase analysis, minimal code changes are expected:

1. **Possible type fixes**: Minor TypeScript adjustments for React 19 types
2. **Possible ref callback fixes**: If any implicit returns exist in ref callbacks
3. **Test adjustments**: Minor updates if React 19 changes behavior in edge cases

## 13. Testing & validation plan

### Existing Test Infrastructure

Vitest is fully configured and ready:

- **Config**: `vitest.config.ts` with jsdom, globals, and coverage
- **Setup**: `src/test/setup.ts` with mocks for matchMedia, ResizeObserver, localStorage
- **Utilities**: `src/test/test-utils.tsx` with provider wrapper
- **Scripts**: `test`, `test:run`, `test:coverage`

### Existing Test Files (4)

| File                       | Description            | Coverage                   |
| -------------------------- | ---------------------- | -------------------------- |
| `checklistService.test.ts` | Service layer tests    | Data fetching, persistence |
| `Index.test.tsx`           | Page integration tests | Loading, error, rendering  |
| `SectionCard.test.tsx`     | Component tests        | Rendering, interactions    |
| `ProgressDial.test.tsx`    | Component tests        | Animation, percentage      |

### Components Requiring New Tests

| Component                | Type      | Priority | Notes             |
| ------------------------ | --------- | -------- | ----------------- |
| `ChecklistGrid.tsx`      | Component | Medium   | Grid layout logic |
| `ChecklistHeader.tsx`    | Component | Low      | Static header     |
| `ThemeToggle.tsx`        | Component | Medium   | Theme switching   |
| `Footer.tsx`             | Component | Low      | Static footer     |
| `LoadingState.tsx`       | Component | Low      | Loading spinner   |
| `ErrorState.tsx`         | Component | Low      | Error display     |
| `GradientBackground.tsx` | Component | Low      | Background effect |
| `use-mobile.tsx`         | Hook      | Medium   | Responsive hook   |

### Integration Tests

- **Scope**: Page-level tests with providers (already in Index.test.tsx)
- **Provider Wrapper**: QueryClient, ThemeProvider, BrowserRouter
- **Key Scenarios**:
  - Loading state renders correctly
  - Error state renders correctly
  - Checklist data loads and displays
  - Checkbox toggling updates progress
  - LocalStorage persistence works

### Manual Testing Checklist

| Feature             | Test Steps         | Expected Result                      |
| ------------------- | ------------------ | ------------------------------------ |
| Checkbox Toggle     | Click checkboxes   | State updates, progress recalculates |
| Progress Dial       | Complete items     | Dial animates, shows percentage      |
| Completion          | Complete all items | Confetti animation plays             |
| Theme Toggle        | Click theme button | Theme switches with transition       |
| Persistence         | Refresh page       | Checked items are preserved          |
| Mobile View         | Resize to mobile   | Layout adapts responsively           |
| Toast Notifications | Trigger error      | Toast appears correctly              |

### Performance Testing

- **Tool**: Lighthouse CLI or Chrome DevTools
- **Metrics**: Performance score, First Contentful Paint, Time to Interactive
- **Target**: Within 10% of pre-upgrade baseline

## 14. Deployment plan & roll-back strategy

### Environments

1. **Local Development**: First validation
2. **Preview/Staging**: PR preview deployments (Vercel)
3. **Production**: Main branch deployment

### Deployment Steps

1. Complete all tasks and tests on feature branch
2. Create PR for review
3. Verify preview deployment works correctly
4. Merge to main after approval
5. Monitor production deployment
6. Verify production functionality

### Rollback Criteria

Trigger rollback if any of the following occur:

- Application fails to start
- Critical user flows are broken
- Significant performance regression (>20%)
- Console errors affecting functionality

### Rollback Steps

1. Revert merge commit on main branch
2. Deploy previous version
3. Investigate and fix issues on feature branch
4. Re-attempt upgrade with fixes

## 15. Monitoring & observability

### Metrics to Monitor

| Metric           | Tool             | Target              |
| ---------------- | ---------------- | ------------------- |
| Console Errors   | Browser DevTools | 0                   |
| Build Errors     | CI Pipeline      | 0                   |
| Test Failures    | Vitest           | 0                   |
| Bundle Size      | Build Output     | Within 10% baseline |
| Lighthouse Score | Lighthouse       | >= baseline         |

### Post-Deployment Checks

- Verify Vercel Analytics continues working
- Check for JavaScript errors in production console
- Validate all user interactions work correctly

## 16. Compliance, security & privacy considerations

### Data Classification

- No sensitive data handling changes
- LocalStorage usage remains unchanged
- No new external data connections

### Security Considerations

- React 19 includes security improvements
- No security-relevant API changes in this project
- Dependencies will be updated to latest secure versions

### Compliance

- N/A - No compliance requirements affected by this upgrade

## 17. Communication plan

### Stakeholder Notifications

| Event             | Audience     | Channel     | Timing             |
| ----------------- | ------------ | ----------- | ------------------ |
| Plan Approval     | Dev Team     | PR Review   | Before work starts |
| Upgrade Complete  | Dev Team     | PR Merge    | On completion      |
| Production Deploy | Stakeholders | Slack/Email | After deploy       |

### Issue Escalation

- Minor issues: Fix on feature branch
- Major blockers: Discuss in team standup
- Critical issues: Immediate rollback and incident review

## 18. Related documents & links

- [React 19 Release Blog Post](https://react.dev/blog/2024/12/05/react-19)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Vite Migration Guide](https://vite.dev/guide/migration)
- [Vitest Migration Guide](https://vitest.dev/guide/migration)
- [Project Research Document](./react-19-upgrade-research.md)

## 19. Appendix

### A. Current Dependencies (package.json)

```json
{
  "name": "lovable-vibe-security-checklist",
  "private": true,
  "version": "2.0.0",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-toast": "^1.2.15",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tanstack/react-query": "^5.87.4",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@vercel/analytics": "^1.5.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.544.0",
    "next-themes": "^0.4.6",
    "react": "^18.3.1",
    "react-confetti": "^6.4.0",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.35.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.18.1",
    "@types/react": "^18.3.24",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "@vitest/coverage-v8": "^2.1.8",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.35.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "jsdom": "^25.0.1",
    "lovable-tagger": "^1.1.9",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.9.2",
    "typescript-eslint": "^8.43.0",
    "vite": "^5.4.20",
    "vitest": "^2.1.8"
  }
}
```

### B. Current Project Component Structure

| File                                    | Type       | Has Tests | Notes              |
| --------------------------------------- | ---------- | --------- | ------------------ |
| `src/pages/Index.tsx`                   | Page       | ✅ Yes    | Main app logic     |
| `src/components/SectionCard.tsx`        | Component  | ✅ Yes    | Checklist section  |
| `src/components/ProgressDial.tsx`       | Component  | ✅ Yes    | Progress indicator |
| `src/components/ChecklistGrid.tsx`      | Component  | ❌ No     | Grid layout        |
| `src/components/ChecklistHeader.tsx`    | Component  | ❌ No     | Header             |
| `src/components/ThemeToggle.tsx`        | Component  | ❌ No     | Theme switching    |
| `src/components/Footer.tsx`             | Component  | ❌ No     | Footer             |
| `src/components/LoadingState.tsx`       | Component  | ❌ No     | Loading spinner    |
| `src/components/ErrorState.tsx`         | Component  | ❌ No     | Error display      |
| `src/components/GradientBackground.tsx` | Component  | ❌ No     | Background effect  |
| `src/hooks/use-mobile.tsx`              | Hook       | ❌ No     | Responsive hook    |
| `src/services/checklistService.ts`      | Service    | ✅ Yes    | Data layer         |
| `src/components/ui/*`                   | UI Library | Excluded  | shadcn/ui          |

### C. Test Infrastructure Files

| File                      | Purpose                                                                  |
| ------------------------- | ------------------------------------------------------------------------ |
| `vitest.config.ts`        | Vitest configuration with jsdom, globals, coverage                       |
| `src/test/setup.ts`       | Test setup with mocks (matchMedia, ResizeObserver, localStorage)         |
| `src/test/test-utils.tsx` | Custom render with providers (QueryClient, ThemeProvider, BrowserRouter) |

### D. React 19 API Changes Reference

| Old API              | New API                 | Status             |
| -------------------- | ----------------------- | ------------------ |
| `ReactDOM.render()`  | `createRoot().render()` | Already migrated   |
| `ReactDOM.hydrate()` | `hydrateRoot()`         | N/A (no SSR)       |
| `forwardRef`         | `ref` as prop           | Optional migration |
| `<Context.Provider>` | `<Context>`             | Optional migration |
| `useFormState`       | `useActionState`        | N/A (not used)     |

### E. Vitest Configuration (Current)

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "src/components/ui/**", // Exclude shadcn/ui components
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

**Plan Version**: 1.2  
**Created**: 2026-01-08  
**Last Updated**: 2026-01-08  
**Revision Notes**: v1.2 - Updated to reflect Vitest configuration from main branch. Removed Phase 0 (test infrastructure setup). Updated task list, dependencies, and component structure to match current state.
