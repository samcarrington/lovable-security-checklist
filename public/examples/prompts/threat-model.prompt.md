---
mode: "agent"
description: "Prompt for creating threat models and identifying attack vectors"
tools: ["codebase", "file_search", "web_search"]
---

# Threat Model Prompt

Create a threat model for the specified system or feature. Use STRIDE methodology to identify potential threats.

## Context Required

Before starting, I need to understand:

1. **System Description**: What does this system/feature do?
2. **Trust Boundaries**: Where does data cross trust levels?
3. **Data Flows**: How does data move through the system?
4. **Entry Points**: Where can external actors interact?
5. **Assets**: What are we trying to protect?

## STRIDE Analysis

For each component, analyze:

| Threat | Description | Question to Ask |
|--------|-------------|-----------------|
| **S**poofing | Identity impersonation | Can someone pretend to be another user? |
| **T**ampering | Data modification | Can data be modified in transit or at rest? |
| **R**epudiation | Denying actions | Can actions be traced and proven? |
| **I**nformation Disclosure | Data exposure | Can sensitive data be accessed? |
| **D**enial of Service | Availability attacks | Can the system be overwhelmed? |
| **E**levation of Privilege | Unauthorized access | Can users gain higher privileges? |

## Output Format

```markdown
## Threat Model: [System Name]

### System Overview
[Brief description and architecture diagram if applicable]

### Trust Boundaries
1. [Boundary 1] - Between [A] and [B]
2. [Boundary 2] - Between [C] and [D]

### Data Flow Diagram
\`\`\`
[User] --> [Frontend] --> [API] --> [Database]
                |
                v
           [External API]
\`\`\`

### STRIDE Analysis

#### Entry Point: [Name]

| Threat | Applicable? | Risk Level | Mitigation |
|--------|-------------|------------|------------|
| Spoofing | Yes/No | High/Med/Low | [Control] |
| Tampering | Yes/No | High/Med/Low | [Control] |
| Repudiation | Yes/No | High/Med/Low | [Control] |
| Info Disclosure | Yes/No | High/Med/Low | [Control] |
| DoS | Yes/No | High/Med/Low | [Control] |
| EoP | Yes/No | High/Med/Low | [Control] |

### Risk Matrix

| Risk | Likelihood | Impact | Priority |
|------|------------|--------|----------|
| [Risk 1] | High | Critical | P1 |

### Recommended Mitigations
1. [Prioritized list of security controls]
```

## References

- [STRIDE Threat Modeling](https://docs.microsoft.com/en-us/azure/security/develop/threat-modeling-tool)
- [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling)
