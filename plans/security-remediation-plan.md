# Security & Quality Remediation Plan

## 1. Title
Security, Testing, and Performance Remediation for lovable-security-checklist

## 2. Short description
Address 24 findings from the codebase review: 4 critical security issues, 12 major defects, and 8 minor polish items. Establish test infrastructure, fix performance bottlenecks, and remove technical debt to make the application production-ready.

## 3. Current status

```yaml
owner: TBD <tbd@example.com>
state: proposed
last_updated: 2026-01-08
blockers: []
```

## 4. Objectives

1. Eliminate all 4 critical security vulnerabilities to unblock production deployment
2. Establish test infrastructure with Vitest and achieve >50% coverage on core functionality
3. Improve render performance by implementing React memoization patterns
4. Reduce bundle size by removing unused dependencies
5. Fix all 12 major findings to establish production readiness

## 5. Success criteria

| Name | Metric | Target | Verification |
|------|--------|--------|--------------|
| Security headers | CSP implementation | Headers present | Browser DevTools inspection + security audit |
| API key exposure | Sensitive data in repo | 0 secrets committed | `git log --all --full-history -S "API_KEY"` returns empty |
| Test coverage | Line coverage % | ≥50% on core modules | `vitest --coverage` report |
| Tests runnable | Test script exists | `npm test` succeeds | CI pipeline execution |
| Performance | Re-render count | ≤2 re-renders per click | React DevTools Profiler |
| Bundle size | Unused packages | 0 unused Radix packages | `npx vite-bundle-analyzer` |
| Console statements | Production console.log | 0 statements | Build output inspection |

## 6. Scope

```yaml
in:
  - Fix all 4 critical security issues (API key, SRI, CSP, test infra)
  - Fix all 12 major issues (XSS vector, console.log, localStorage, performance, etc.)
  - Fix 8 minor code quality issues
  - Establish Vitest testing infrastructure
  - Write tests for core service layer and main page
  - Implement React.memo and useCallback/useMemo optimizations
  - Remove duplicate toast system and unused dependencies
  - Add accessibility labels

out:
  - Feature development
  - UI/UX redesign
  - localStorage encryption (accepted risk for checkbox state)
  - Self-hosting gptengineer.js (requires stakeholder decision)
  - Removing gptengineer.js entirely (requires stakeholder decision)
```

## 7. Stakeholders & Roles

| Name | Role | Responsibility | Contact |
|------|------|----------------|---------|
| TBD | Project Owner | Final approval and stakeholder decisions | tbd@example.com |
| TBD | Engineering Lead | Implementation oversight | tbd@example.com |

## 8. High-level timeline & milestones

1. M1 — Emergency Security Fixes Complete — 2026-01-09 — TBD
2. M2 — Test Infrastructure Operational — 2026-01-13 — TBD
3. M3 — Core Test Coverage Achieved — 2026-01-15 — TBD
4. M4 — Performance Optimizations Complete — 2026-01-17 — TBD
5. M5 — Code Quality Remediation Complete — 2026-01-22 — TBD
6. M6 — Production Ready Sign-off — 2026-01-24 — TBD

## 9. Task list

### Phase 1: Emergency Security Fixes (M1)

| ID | Task | Owner | Complexity | Dependencies | Done |
|----|------|-------|------------|--------------|------|
| T-001 | Verify CONTEXT7_API_KEY usage and remove if unused | TBD | XS | [] | false |
| T-002 | Rotate or delete exposed API key from all environments | TBD | XS | [T-001] | false |
| T-003 | Purge API key from git history using BFG Repo Cleaner | TBD | S | [T-002] | false |
| T-004 | Add SRI hash to gptengineer.js script or document decision to remove | TBD | S | [] | false |
| T-005 | Add Content-Security-Policy meta tag to index.html | TBD | S | [T-004] | false |
| T-006 | Add vite-plugin-remove-console to strip console.log in production | TBD | S | [] | false |

### Phase 2: Test Infrastructure (M2)

| ID | Task | Owner | Complexity | Dependencies | Done |
|----|------|-------|------------|--------------|------|
| T-007 | Create vitest.config.ts with jsdom environment | TBD | S | [] | false |
| T-008 | Add "test" script to package.json | TBD | XS | [T-007] | false |
| T-009 | Create test setup file with React Query/Theme provider wrappers | TBD | M | [T-007] | false |
| T-010 | Verify existing SectionCard.test.tsx runs successfully | TBD | XS | [T-008] | false |

### Phase 3: Core Test Coverage (M3)

| ID | Task | Owner | Complexity | Dependencies | Done |
|----|------|-------|------------|--------------|------|
| T-011 | Write tests for checklistService.ts (fetch, localStorage ops) | TBD | M | [T-009] | false |
| T-012 | Write tests for Index.tsx (loading, error, success states) | TBD | M | [T-009] | false |
| T-013 | Write tests for ProgressDial.tsx | TBD | S | [T-009] | false |
| T-014 | Add test coverage reporting to CI | TBD | S | [T-010] | false |

### Phase 4: Performance Optimizations (M4)

| ID | Task | Owner | Complexity | Dependencies | Done |
|----|------|-------|------------|--------------|------|
| T-015 | Replace useEffect progress calculation with useMemo in Index.tsx | TBD | S | [T-012] | false |
| T-016 | Wrap SectionCard with React.memo | TBD | S | [T-010] | false |
| T-017 | Wrap ChecklistGrid with React.memo | TBD | S | [T-010] | false |
| T-018 | Memoize handleItemToggle with useCallback | TBD | S | [T-015] | false |
| T-019 | Fix ResizeObserver cleanup in SectionCard (store ref in closure) | TBD | S | [T-016] | false |
| T-020 | Reduce confetti particles from 200 to 50 with increased gravity | TBD | XS | [] | false |

### Phase 5: Code Quality (M5)

| ID | Task | Owner | Complexity | Dependencies | Done |
|----|------|-------|------------|--------------|------|
| T-021 | Remove Toaster, keep only Sonner toast system in App.tsx | TBD | S | [] | false |
| T-022 | Remove manual DOM manipulation from ThemeToggle.tsx | TBD | S | [] | false |
| T-023 | Render Analytics component or remove import from App.tsx | TBD | XS | [] | false |
| T-024 | Run npm audit fix and update vulnerable dependencies | TBD | M | [] | false |
| T-025 | Audit Radix UI packages and remove unused (27 total) | TBD | L | [] | false |
| T-026 | Delete duplicate src/data/checklist-data.json | TBD | XS | [] | false |
| T-027 | Fix TypeScript any usage in ChecklistGrid.tsx | TBD | XS | [] | false |
| T-028 | Enable @typescript-eslint/no-unused-vars rule in eslint.config.js | TBD | S | [T-027] | false |
| T-029 | Add aria-labels to ThemeToggle and ProgressDial | TBD | S | [] | false |
| T-030 | Standardize component export patterns (named vs default) | TBD | S | [] | false |
| T-031 | Replace useIsMobile resize listener with matchMedia | TBD | S | [] | false |
| T-032 | Add will-change: opacity to GradientBackground layers | TBD | XS | [] | false |

## 10. Risks and mitigations

| ID | Description | Probability | Impact | Mitigation | Owner |
|----|-------------|-------------|--------|------------|-------|
| R-001 | gptengineer.js script required by Lovable platform | High | High | Document as accepted risk OR self-host if allowed | TBD |
| R-002 | Git history rewrite causes collaborator conflicts | Medium | Medium | Coordinate timing, notify all contributors to re-clone | TBD |
| R-003 | Removing Radix packages breaks unknown dependencies | Low | High | Run full test suite after each removal, add tests first | TBD |
| R-004 | Performance optimizations introduce subtle bugs | Medium | Medium | Ensure test coverage before refactoring | TBD |
| R-005 | Dependency updates introduce breaking changes | Low | Medium | Pin versions, test thoroughly before merging | TBD |

## 11. Assumptions

- The repository can be force-pushed to after git history cleanup (API key purge)
- The Lovable platform allows SRI hashes on gptengineer.js (may need verification)
- The CONTEXT7_API_KEY is truly unused and can be removed entirely
- Team has access to regenerate any rotated credentials
- Test infrastructure can use Vitest (Vite-native) rather than Jest
- Bundle analyzer can be run locally to audit Radix packages

## 12. Implementation approach / Technical narrative

**TL;DR:** This remediation follows a defense-in-depth strategy: fix critical security issues first, then establish testing infrastructure before making performance changes. Tests provide safety nets for refactoring.

### Security Fixes (Phase 1)

The most urgent issue is the exposed API key. While research shows it appears unused in the codebase, it must be rotated as it's now in git history. The recommended approach:

1. Verify usage by grepping for `CONTEXT7_API_KEY` in all source files
2. If unused, delete the `.env` file contents (file is already gitignored)
3. Use BFG Repo Cleaner to purge from history: `bfg --delete-files .env`
4. Force push and notify collaborators

For the external script SRI:
```html
<!-- Calculate hash: curl -s https://cdn.gpteng.co/gptengineer.js | openssl dgst -sha384 -binary | openssl base64 -A -->
<script src="https://cdn.gpteng.co/gptengineer.js" 
        integrity="sha384-[CALCULATED_HASH]" 
        crossorigin="anonymous"></script>
```

CSP implementation:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://cdn.gpteng.co; style-src 'self' 'unsafe-inline'; img-src 'self' data:;">
```

### Testing Infrastructure (Phase 2)

Vitest configuration for the Vite project:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

Test setup with providers:
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

export const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

export const TestProviders = ({ children }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  </QueryClientProvider>
);
```

### Performance Optimizations (Phase 4)

The key optimization is memoizing the progress calculation:

```typescript
// Before: O(n×m) on every render
useEffect(() => {
  // Iterates all sections and items
}, [checkedItems, checklist]);

// After: Memoized, only recalculates when deps change
const totalProgress = useMemo(() => {
  if (!checklist) return 0;
  let total = 0, checked = 0;
  checklist.sections.forEach(s => {
    total += s.items.length;
    checked += s.items.filter(i => checkedItems[i.id]).length;
  });
  return total > 0 ? (checked / total) * 100 : 0;
}, [checkedItems, checklist]);
```

Component memoization pattern:
```typescript
export const SectionCard = React.memo(function SectionCard(props: Props) {
  // Component implementation
});
```

ResizeObserver fix:
```typescript
useEffect(() => {
  const element = contentRef.current; // Capture ref value
  if (!element) return;
  
  const observer = new ResizeObserver(/* ... */);
  observer.observe(element);
  
  return () => {
    observer.unobserve(element); // Use captured value
    observer.disconnect();
  };
}, []);
```

## 13. Testing & validation plan

### Unit Tests
- **checklistService.ts**: Test fetchChecklist success/failure, localStorage get/set/clear
- **Progress calculation**: Test edge cases (0%, 50%, 100%, empty checklist)
- **Expected coverage**: ≥80% on service layer

### Integration Tests
- **Index.tsx**: Test loading → success → interaction flow
- **Theme toggle**: Test dark/light mode switching persists
- **Expected coverage**: ≥50% on page components

### End-to-End Tests (Out of Scope)
- E2E testing with Playwright recommended but not included in this plan

### Performance Testing
- Use React DevTools Profiler to verify render counts
- Target: ≤2 component re-renders per checkbox toggle

## 14. Deployment plan & roll-back strategy

### Environments
1. Local development
2. Preview/staging (Vercel previews on PRs)
3. Production

### Deployment Steps
1. Merge security fixes (Phase 1) immediately after approval
2. Deploy to staging for verification
3. Merge subsequent phases after test coverage validates changes
4. Production deployment after staging validation

### Roll-back Criteria
- Any security regression (new vulnerabilities introduced)
- Test suite failure rate >5%
- Performance regression >20% (measured by Lighthouse)

### Roll-back Steps
1. Revert merge commit: `git revert <commit-hash>`
2. Force push if history was modified (Phase 1 only)
3. Redeploy previous version

## 15. Monitoring & observability

| Metric | Unit | Target | Alert Threshold |
|--------|------|--------|-----------------|
| Page load time | seconds | <2s | >4s |
| JavaScript errors | count/hour | 0 | >10 |
| Test coverage | percentage | ≥50% | <40% |
| Bundle size | KB | <500KB | >750KB |

### Dashboards
- Vercel Analytics (if rendered) for performance metrics
- GitHub Actions for CI/CD status

## 16. Compliance, security & privacy considerations

### Security Review Checklist
- [ ] API keys removed from git history
- [ ] CSP headers implemented
- [ ] External scripts have SRI hashes
- [ ] No sensitive data in console.log
- [ ] localStorage usage documented (checkbox state only)

### Data Classification
- **Public**: Checklist content (static JSON)
- **User Data**: Checkbox state in localStorage (not sensitive)
- **Secrets**: API keys (should not exist in repo)

## 17. Communication plan

| Event | Channel | Audience | Template |
|-------|---------|----------|----------|
| Plan approved | GitHub PR merge | Contributors | "Security remediation plan approved. Work begins on Phase 1." |
| Phase 1 complete | Team chat | Team | "🔒 Critical security fixes deployed. Safe to update local repos." |
| Git history rewrite | Email + chat | All contributors | "⚠️ Repository history has been rewritten. Please re-clone." |
| Production ready | Release notes | Users | "v1.1.0: Security hardening and performance improvements" |

## 18. Related documents & links

- [recommendations.md](./recommendations.md) - Original codebase review
- [Vitest Documentation](https://vitest.dev/)
- [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [MDN Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 19. Appendix

### Unused Radix UI Packages (To Audit)

Packages to investigate for removal:
- @radix-ui/react-accordion
- @radix-ui/react-alert-dialog
- @radix-ui/react-aspect-ratio
- @radix-ui/react-context-menu
- @radix-ui/react-hover-card
- @radix-ui/react-menubar
- @radix-ui/react-navigation-menu
- @radix-ui/react-radio-group

### Console.log Locations

```
src/pages/Index.tsx:34, 64, 68
src/services/checklistService.ts:34, 48
src/components/SectionCard.tsx:86
src/pages/NotFound.tsx:8
```

### Stakeholder Questions (Pending)

1. Is gptengineer.js required for Lovable platform functionality?
2. Can the repository support force-push for history cleanup?
3. What is the expected growth in checklist size?
4. Is @vercel/analytics intentionally disabled?
