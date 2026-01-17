---
mode: "agent"
description: "Prompt for validating input handling and sanitization practices"
tools: ["codebase", "file_search", "grep"]
---

# Input Validation Review Prompt

Review all input handling in the codebase to ensure proper validation and sanitization practices are followed.

## Scope

Identify and review all locations where external input enters the application:

1. **HTTP Request Bodies** - POST/PUT/PATCH payloads
2. **Query Parameters** - URL query strings
3. **Path Parameters** - Dynamic URL segments
4. **Headers** - Custom headers, cookies
5. **File Uploads** - User-submitted files
6. **WebSocket Messages** - Real-time input
7. **External APIs** - Third-party data

## Validation Checklist

For each input point, verify:

### Type Validation
- [ ] Expected data types enforced
- [ ] Schema validation (Zod, Yup, Joi, etc.)
- [ ] Null/undefined handling

### Length Validation
- [ ] Maximum length limits
- [ ] Minimum length where required
- [ ] Array size limits

### Format Validation
- [ ] Email format validation
- [ ] URL validation
- [ ] Date format validation
- [ ] Phone number format
- [ ] Custom regex patterns

### Sanitization
- [ ] HTML encoding for display
- [ ] SQL parameterization
- [ ] Shell command escaping
- [ ] Path traversal prevention

### Business Rules
- [ ] Range validation (min/max values)
- [ ] Enum/allowed values
- [ ] Cross-field validation

## Common Vulnerabilities

### SQL Injection
```typescript
// ❌ Vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Safe
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);
```

### XSS (Cross-Site Scripting)
```typescript
// ❌ Vulnerable
element.innerHTML = userInput;

// ✅ Safe
element.textContent = userInput;
// Or use DOMPurify for HTML
```

### Path Traversal
```typescript
// ❌ Vulnerable
const filePath = `./uploads/${filename}`;

// ✅ Safe
const safeName = path.basename(filename);
const filePath = path.join('./uploads', safeName);
```

## Output Format

```markdown
## Input Validation Review

### Summary
- **Input Points Reviewed**: X
- **Properly Validated**: Y
- **Needs Improvement**: Z
- **Critical Issues**: W

### Input Point Analysis

#### [Input Point Name]
- **Location**: `api/users.ts:42`
- **Type**: POST body
- **Current Validation**: [Description]
- **Issues Found**:
  - [ ] Missing length validation
  - [ ] No type checking
- **Risk Level**: High
- **Recommendation**: Add Zod schema validation

\`\`\`typescript
// Recommended validation
const userSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150).optional(),
});
\`\`\`

### Vulnerability Summary

| Type | Count | Locations |
|------|-------|-----------|
| SQL Injection | 2 | auth.ts, users.ts |
| XSS | 3 | profile.tsx, comments.tsx |
| Path Traversal | 1 | upload.ts |

### Recommended Schema Library

For this project, recommend using: **[Zod/Yup/Joi]**

Rationale: [Explanation based on project stack]
```

## References

- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [CWE-20: Improper Input Validation](https://cwe.mitre.org/data/definitions/20.html)
