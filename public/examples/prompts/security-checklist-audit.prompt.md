---
mode: "agent"
description: "Prompt for auditing code against OWASP security checklists"
tools: ["codebase", "file_search", "grep"]
---

# Security Checklist Audit Prompt

Audit the codebase against the OWASP security checklists. For each category, verify compliance and document gaps.

## Audit Categories

### 1. Authentication & Authorization

Check for:
- [ ] Strong password policies enforced
- [ ] Secure session management
- [ ] Multi-factor authentication available
- [ ] Secure password storage (bcrypt/Argon2)
- [ ] Account lockout policies
- [ ] Secure password reset flow
- [ ] OAuth2 best practices (if applicable)
- [ ] Secure logout functionality

### 2. Input Validation

Check for:
- [ ] Server-side validation on all inputs
- [ ] Input length restrictions
- [ ] Parameterized queries (no SQL injection)
- [ ] File upload validation
- [ ] URL parameter sanitization
- [ ] Data type validation

### 3. Data Protection

Check for:
- [ ] Encryption at rest for sensitive data
- [ ] HTTPS for all connections
- [ ] Minimal data collection
- [ ] Data retention policies
- [ ] Secrets not in code
- [ ] Access logging

### 4. API Security

Check for:
- [ ] Authentication on all endpoints
- [ ] Rate limiting implemented
- [ ] Input validation
- [ ] Proper error responses
- [ ] CSRF protection
- [ ] JWT best practices

### 5. Frontend Security

Check for:
- [ ] Content Security Policy
- [ ] Subresource Integrity
- [ ] Secure cookie flags
- [ ] CORS configuration
- [ ] XSS prevention
- [ ] Open redirect protection

## Output Format

```markdown
## OWASP Security Audit Report

### Executive Summary
- **Overall Compliance**: X%
- **Critical Gaps**: X
- **Recommended Priority**: [Area with most gaps]

### Category Scores

| Category | Compliance | Findings |
|----------|------------|----------|
| Authentication | 80% | 2 gaps |
| Input Validation | 60% | 4 gaps |
| Data Protection | 90% | 1 gap |
| API Security | 70% | 3 gaps |
| Frontend Security | 85% | 2 gaps |

### Detailed Findings

#### Authentication & Authorization

| Check | Status | Evidence | Gap |
|-------|--------|----------|-----|
| Strong passwords | ✅ | `auth.ts:42` | - |
| MFA available | ❌ | Not found | Implement TOTP |

[Continue for each category...]

### Remediation Roadmap
1. **Week 1**: Critical gaps
2. **Week 2-3**: High priority
3. **Month 1**: Medium priority
```

## References

- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
