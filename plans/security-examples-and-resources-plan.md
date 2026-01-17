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

| ID    | Task                                   | Owner                | Complexity | Dependencies | Done  |
| ----- | -------------------------------------- | -------------------- | ---------- | ------------ | ----- |
| T-001 | Create `examples/` directory structure | Implementation Agent | XS         | []           | false |
| T-002 | Create `examples/README.md` index page | Implementation Agent | XS         | [T-001]      | false |

### Phase 2: Security Agent Examples (Complexity: M)

| ID    | Task                                                                                 | Owner                | Complexity | Dependencies | Done  |
| ----- | ------------------------------------------------------------------------------------ | -------------------- | ---------- | ------------ | ----- |
| T-003 | Create `examples/agents/security-reviewer.md` - Code security review agent           | Implementation Agent | S          | [T-001]      | false |
| T-004 | Create `examples/agents/dependency-auditor.md` - Package vulnerability scanner agent | Implementation Agent | S          | [T-001]      | false |
| T-005 | Create `examples/agents/secrets-scanner.md` - Credential leak detection agent        | Implementation Agent | S          | [T-001]      | false |
| T-006 | Create `examples/agents/api-security-reviewer.md` - API endpoint security agent      | Implementation Agent | S          | [T-001]      | false |
| T-007 | Create `examples/agents/ai-code-validator.md` - AI-generated code validation agent   | Implementation Agent | S          | [T-001]      | false |

### Phase 3: Security Prompt Examples (Complexity: M)

| ID    | Task                                                          | Owner                | Complexity | Dependencies | Done  |
| ----- | ------------------------------------------------------------- | -------------------- | ---------- | ------------ | ----- |
| T-008 | Create `examples/prompts/secure-code-review.prompt.md`        | Implementation Agent | S          | [T-001]      | false |
| T-009 | Create `examples/prompts/threat-model.prompt.md`              | Implementation Agent | S          | [T-001]      | false |
| T-010 | Create `examples/prompts/security-checklist-audit.prompt.md`  | Implementation Agent | S          | [T-001]      | false |
| T-011 | Create `examples/prompts/dependency-security-check.prompt.md` | Implementation Agent | S          | [T-001]      | false |
| T-012 | Create `examples/prompts/input-validation-review.prompt.md`   | Implementation Agent | S          | [T-001]      | false |

### Phase 4: Resource Pages (Markdown) (Complexity: M)

| ID    | Task                                                                                       | Owner                | Complexity | Dependencies | Done  |
| ----- | ------------------------------------------------------------------------------------------ | -------------------- | ---------- | ------------ | ----- |
| T-013 | Create `examples/resources/owasp-links.md` - Extracted from checklist-data.json            | Implementation Agent | M          | [T-001]      | false |
| T-014 | Create `examples/resources/agentic-engineering.md` - Vibe to agentic transition resources  | Implementation Agent | M          | [T-001]      | false |
| T-015 | Create `examples/resources/security-tools.md` - Recommended scanning tools                 | Implementation Agent | S          | [T-001]      | false |
| T-016 | Create `examples/resources/ai-security-practices.md` - AI-specific security considerations | Implementation Agent | S          | [T-001]      | false |

### Phase 5: Responsive Navigation Component (Complexity: M)

| ID    | Task                                                                                     | Owner                | Complexity | Dependencies | Done  |
| ----- | ---------------------------------------------------------------------------------------- | -------------------- | ---------- | ------------ | ----- |
| T-017 | Create `src/components/Navigation.tsx` - Responsive nav with hamburger menu on mobile   | Implementation Agent | M          | []           | false |
| T-018 | Create `src/components/Navigation.test.tsx` - Unit tests for navigation component       | Implementation Agent | S          | [T-017]      | false |
| T-019 | Integrate Navigation component into App.tsx layout                                       | Implementation Agent | S          | [T-017]      | false |

### Phase 6: Resource Pages (React) (Complexity: L)

| ID    | Task                                                                                     | Owner                | Complexity | Dependencies | Done  |
| ----- | ---------------------------------------------------------------------------------------- | -------------------- | ---------- | ------------ | ----- |
| T-020 | Create `src/pages/Resources.tsx` - Main resources landing page                           | Implementation Agent | M          | [T-017]      | false |
| T-021 | Create `src/pages/Resources.test.tsx` - Unit tests for resources page                    | Implementation Agent | S          | [T-020]      | false |
| T-022 | Create `src/pages/OWASPLinks.tsx` - OWASP resources page with categorized links          | Implementation Agent | M          | [T-013]      | false |
| T-023 | Create `src/pages/OWASPLinks.test.tsx` - Unit tests for OWASP page                       | Implementation Agent | S          | [T-022]      | false |
| T-024 | Create `src/pages/AgenticEngineering.tsx` - Vibe-to-agentic resources page               | Implementation Agent | M          | [T-014]      | false |
| T-025 | Create `src/pages/AgenticEngineering.test.tsx` - Unit tests for agentic engineering page | Implementation Agent | S          | [T-024]      | false |
| T-026 | Add routes for new pages in App.tsx                                                      | Implementation Agent | XS         | [T-020,T-022,T-024] | false |
| T-027 | Create `public/resources-data.json` - JSON data for resource pages                       | Implementation Agent | M          | [T-013,T-014] | false |

### Phase 7: Documentation & Polish (Complexity: S)

| ID    | Task                                                         | Owner                | Complexity | Dependencies        | Done  |
| ----- | ------------------------------------------------------------ | -------------------- | ---------- | ------------------- | ----- |
| T-028 | Update main README.md to reference examples and new pages    | Implementation Agent | XS         | [T-002,T-026]       | false |
| T-029 | Add cross-references between examples and checklist sections | Implementation Agent | S          | [T-013]             | false |
| T-030 | Review all examples for consistency and completeness         | Security Reviewer    | S          | [T-003..T-016]      | false |
| T-031 | Run full test suite and fix any failures                     | Implementation Agent | S          | [T-018,T-021,T-023,T-025] | false |
| T-032 | Verify responsive design at all breakpoints                  | Implementation Agent | S          | [T-017,T-020,T-022,T-024] | false |

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

## 12. Implementation approach / Technical narrative

**TL;DR:** Create an `examples/` directory with subdirectories for agents, prompts, and resources. Add a responsive Navigation component and three new React pages (Resources, OWASPLinks, AgenticEngineering). Each example file follows established patterns from `.github/agents/` and `.github/prompts/`. OWASP links are extracted from JSON and displayed on a dedicated page.

### Directory Structure (Examples)

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
└── resources/
    ├── owasp-links.md
    ├── agentic-engineering.md
    ├── security-tools.md
    └── ai-security-practices.md
```

### New React Components Structure

```
src/
├── components/
│   ├── Navigation.tsx           # Responsive navigation with hamburger menu
│   └── Navigation.test.tsx
├── pages/
│   ├── Resources.tsx            # Resources landing page
│   ├── Resources.test.tsx
│   ├── OWASPLinks.tsx           # OWASP links categorized by security topic
│   ├── OWASPLinks.test.tsx
│   ├── AgenticEngineering.tsx   # Vibe-to-agentic transition resources
│   └── AgenticEngineering.test.tsx
public/
└── resources-data.json          # JSON data for resource pages
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

## 13. Testing & validation plan

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

## 14. Deployment plan & roll-back strategy

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

## 15. Monitoring & observability

- **Vercel Analytics**: Already integrated; monitor page views for new pages
- **Error Tracking**: Existing toast error handling extends to new pages
- **Performance**: Monitor Core Web Vitals via Vercel dashboard
- **Link Monitoring**: Consider adding periodic link checker for external resources

## 16. Compliance, security & privacy considerations

- All content is educational/reference material
- No credentials, secrets, or sensitive data in examples
- External links are to public resources only
- Examples should not contain real vulnerability details that could be exploited

## 17. Communication plan

- PR description will summarize new examples available
- README updates will make examples discoverable
- No external notification required

## 18. Related documents & links

- Plan template: `plans/plan-template.md`
- Existing agents: `.github/agents/`
- Existing prompts: `.github/prompts/`
- OpenCode commands: `.opencode/commands/`
- Checklist data: `public/checklist-data.json`
- Quality policy: `.github/copilot-instructions.md#quality-policy`

## 19. Appendix

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
