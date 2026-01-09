# TODO list

## Website Project To-dos

Purpose: Track and review each suggested improvement and planned updates item by item. Use this as the authoritative checklist for implementation and review. Also map tasks from defined plans for tracking.

Status legend:

- Not started | In progress | Blocked | Done

How to use:

- Update Owner, Status, and Notes as work progresses.
- Link PRs/issues in Notes.

| ID    | Area      | Action                          | Files/Links                              | Acceptance Criteria                    | Priority | Owner | Status | Notes                              |
| ----- | --------- | ------------------------------- | ---------------------------------------- | -------------------------------------- | -------- | ----- | ------ | ---------------------------------- |
| P1-01 | Analytics | Implement GA4/GTM Analytics     | `./ga4-analytics-plan.md`                | GTM loading, consent, event tracking   | High     | AI    | Done   | All code tasks complete            |
| S1-01 | Security  | Complete security remediation   | `./security-final-remediation-plan.md`   | All 24 findings closed, tests passing  | High     | AI    | Done   | 24/24 findings closed (100%)       |

### Plans to Task Mapping

P1 tasks map to T-002 to T-021 in `./ga4-analytics-plan.md` (GA4 Analytics Implementation)
S1 tasks map to T-001 to T-005 in `./security-final-remediation-plan.md` (Security Remediation Final Phase)

### GA4 Analytics Implementation Status

| Task ID | Description                                             | Status | Notes                                      |
| ------- | ------------------------------------------------------- | ------ | ------------------------------------------ |
| T-002   | Update CSP policy for GTM/GA4 domains                   | Done   | index.html updated                         |
| T-003   | Add GTM container snippet with consent defaults         | Done   | GTM-NJ7W8HQ8, consent default denied       |
| T-004   | Install react-cookie-consent package                    | Done   | Package added to dependencies              |
| T-005   | Create CookieConsentBanner component                    | Done   | With accept/decline actions                |
| T-006   | Implement consent state persistence                     | Done   | localStorage-based                         |
| T-007   | Add gtag consent update calls                           | Done   | Integrated with banner                     |
| T-009   | Create data layer utility module                        | Done   | src/lib/analytics.ts with tests            |
| T-011   | Add checkbox toggle event tracking                      | Done   | In SectionCard.tsx                         |
| T-012   | Add section completion event tracking                   | Done   | In SectionCard.tsx                         |
| T-013   | Add progress milestone tracking                         | Done   | 25%, 50%, 75%, 100% in Index.tsx           |
| T-014   | Add theme toggle event tracking                         | Done   | In ThemeToggle.tsx                         |
| T-015   | Add clear all button event tracking                     | Done   | In SectionCard.tsx                         |
| T-017   | Add debug mode logging                                  | Done   | DEV environment only                       |

#### Human Tasks Required (GTM Configuration)

| Task ID | Description                                             | Status      | Notes                                      |
| ------- | ------------------------------------------------------- | ----------- | ------------------------------------------ |
| T-001   | GTM container created and GA4 tag configured            | Done        | GTM-NJ7W8HQ8, G-517LEH65ZW                 |
| T-008   | Configure GTM Consent Mode v2 with regional defaults    | Not started | See docs/gtm-setup-instructions.md         |
| T-010   | Configure GTM History Change trigger for SPA            | Not started | See docs/gtm-setup-instructions.md         |
| T-016   | Create GTM triggers and tags for custom events          | Not started | See docs/gtm-setup-instructions.md         |
| T-018   | Test consent flow in GTM Preview mode                   | Not started | After T-016 complete                       |
| T-019   | Validate all events in GA4 DebugView                    | Not started | After T-018 complete                       |
| T-020   | Test consent banner across browsers                     | Not started | Chrome, Firefox, Safari                    |
| T-021   | Document analytics events and GTM configuration         | Done        | docs/gtm-setup-instructions.md created     |

### Change log (for this file)

- 2026-01-02: Added P1
- 2026-01-09: Added S1-01 - Security remediation complete (24/24 findings closed)
- 2026-01-09: Updated P1-01 - GA4 Analytics code implementation complete, added detailed task breakdown
