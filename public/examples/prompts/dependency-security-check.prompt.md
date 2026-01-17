---
mode: "agent"
description: "Prompt for reviewing third-party dependencies for security issues"
tools: ["codebase", "bash", "web_search"]
---

# Dependency Security Check Prompt

Review the project's dependencies for security vulnerabilities, outdated packages, and license compliance issues.

## Steps

### 1. Generate Dependency Inventory

Run the appropriate audit command:

```bash
# For npm projects
npm audit --json

# For yarn projects
yarn audit --json

# For pnpm projects
pnpm audit --json
```

### 2. Analyze Results

For each vulnerability found:
- Assess severity (Critical/High/Medium/Low)
- Check if fix is available
- Evaluate upgrade path complexity
- Consider alternative packages if necessary

### 3. Check Package Health

For each direct dependency, verify:
- Last update date (flag if > 12 months)
- Maintainer activity
- Open security issues
- Download trends
- TypeScript support (if applicable)

### 4. License Compliance

Check all licenses against project requirements:
- MIT, Apache 2.0, BSD: Generally safe
- GPL, LGPL: May require source disclosure
- AGPL: Network use triggers copyleft
- Custom/Proprietary: Requires legal review

## Output Format

```markdown
## Dependency Security Report

### Summary
- **Total Dependencies**: X (Y direct, Z transitive)
- **Vulnerabilities**: X Critical, Y High, Z Medium
- **Outdated**: X packages
- **License Issues**: X packages

### Critical Vulnerabilities (Fix Immediately)

| Package | Version | Vulnerability | Fix Version | CVE |
|---------|---------|---------------|-------------|-----|
| lodash | 4.17.15 | Prototype Pollution | 4.17.21 | CVE-2021-23337 |

### High Vulnerabilities

[Similar table]

### Outdated Packages (> 12 months)

| Package | Current | Latest | Last Updated |
|---------|---------|--------|--------------|
| moment | 2.24.0 | 2.30.1 | 2020-01-15 |

Recommendation: Consider replacing with `date-fns` or `dayjs`

### License Report

| Package | License | Compliance |
|---------|---------|------------|
| react | MIT | ✅ Compatible |
| some-gpl-lib | GPL-3.0 | ⚠️ Review Required |

### Recommended Actions

1. **Immediate**: Upgrade lodash to 4.17.21
2. **This Week**: Address all High severity issues
3. **This Sprint**: Update outdated packages
4. **Backlog**: Evaluate GPL package alternatives
```

## Automation Recommendations

1. Enable Dependabot/Renovate for automated updates
2. Add `npm audit` to CI pipeline
3. Set up Snyk or similar for continuous monitoring
4. Implement lockfile for reproducible builds

## References

- [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/)
- [Snyk Vulnerability Database](https://snyk.io/vuln/)
- [npm Security Best Practices](https://docs.npmjs.com/security)
