---
mode: "agent"
description: "Comprehensive prompt for reviewing code for security vulnerabilities"
tools: ["codebase", "file_search", "grep"]
---

# Secure Code Review Prompt

Review the provided code for security vulnerabilities. Focus on the following areas:

## Scope

Analyze the code changes for:

1. **Input Validation** - Are all user inputs properly validated and sanitized?
2. **Authentication** - Are authentication mechanisms properly implemented?
3. **Authorization** - Are access controls correctly enforced?
4. **Data Protection** - Is sensitive data properly encrypted and handled?
5. **Error Handling** - Do errors expose sensitive information?

## Instructions

For each finding, provide:

- **Severity**: Critical, High, Medium, or Low
- **Location**: File path and line number
- **Issue**: Clear description of the vulnerability
- **Impact**: What could an attacker do?
- **Fix**: Specific code recommendation
- **Reference**: Link to OWASP or CWE documentation

## Output Format

```markdown
## Security Review: [Component Name]

### Summary
- Total findings: X
- Critical: X | High: X | Medium: X | Low: X

### Findings

#### [Finding Title]
- **Severity**: [Level]
- **Location**: `file.ts:42`
- **Issue**: [Description]
- **Impact**: [Consequences]
- **Recommended Fix**:
\`\`\`typescript
// Fixed code example
\`\`\`
- **Reference**: [OWASP Link]
```

## Priority Focus

1. SQL Injection (CWE-89)
2. Cross-Site Scripting (CWE-79)
3. Broken Authentication (CWE-287)
4. Sensitive Data Exposure (CWE-200)
5. Security Misconfiguration (CWE-16)
