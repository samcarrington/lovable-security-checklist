# Vibe Engineering Security & Quality Checklist

An interactive security and quality checklist application for AI-assisted software development. Track your progress through security best practices with persistent state and visual feedback.

It began as a quick vibe-coded test in Lovable and has been manually edited a little. Most of the changes
are now made via Opencode.ai.

## Overview

This single-page React application provides a useful checklist covering security topics essential for modern software development:

- **Authentication & Authorization** - Password policies, session management, MFA
- **Input Validation** - XSS prevention, SQL injection, file upload security
- **Data Protection** - Encryption, secure storage, data handling
- **API Security** - Rate limiting, authentication, input validation
- **Infrastructure** - HTTPS, security headers, dependency management
- **Code Quality** - Testing, code review, documentation

## Tech Stack

| Category         | Technology                     |
| ---------------- | ------------------------------ |
| Framework        | React 19                       |
| Language         | TypeScript                     |
| Build Tool       | Vite                           |
| Styling          | Tailwind CSS                   |
| UI Components    | shadcn/ui (Radix primitives)   |
| State Management | TanStack Query                 |
| Testing          | Vitest + React Testing Library |
| Analytics        | Vercel Analytics               |

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui base components
│   │   ├── ChecklistGrid.tsx
│   │   ├── SectionCard.tsx
│   │   ├── ProgressDial.tsx
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── services/          # Data fetching services
│   └── test/              # Test utilities and setup
├── public/
│   └── checklist-data.json  # Checklist content data
├── docs/                  # Documentation
│   ├── ADRs/              # Architecture Decision Records
│   ├── PRDs/              # Product Requirement Documents
│   └── EARS-specs/        # Requirements specifications
├── plans/                 # Project planning documents
├── coverage/              # Test coverage reports
└── .github/               # GitHub workflows and AI instructions
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/lovable-security-checklist.git
cd lovable-security-checklist

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:5173)
npm run dev

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

### Building

```bash
# Production build
npm run build

# Development build (with source maps)
npm run build:dev

# Preview production build locally
npm run preview
```

## Configuration Files

| File                 | Purpose                           |
| -------------------- | --------------------------------- |
| `vite.config.ts`     | Vite bundler configuration        |
| `vitest.config.ts`   | Test runner configuration         |
| `tailwind.config.ts` | Tailwind CSS customization        |
| `tsconfig.json`      | TypeScript compiler options       |
| `eslint.config.js`   | Linting rules                     |
| `components.json`    | shadcn/ui component configuration |

## Features

- **Persistent Progress** - Checkbox state saved to localStorage
- **Visual Progress Tracking** - Animated progress dial showing completion percentage
- **Dark/Light Theme** - System-aware theme with manual toggle
- **Responsive Design** - Mobile-first layout with adaptive grid
- **Celebration Animation** - Confetti effect on 100% completion
- **External Resources** - Links to OWASP and security documentation

## Data Format

Checklist content is stored in `public/checklist-data.json`:

```json
{
  "title": "Vibe Engineering Security & Quality Checklist",
  "sections": [
    {
      "id": "sec-1",
      "title": "Authentication & Authorization",
      "description": "Section description",
      "items": [
        {
          "id": "sec-1-item-1",
          "title": "Item title",
          "description": "Detailed description",
          "link": "https://example.com/resource",
          "summary": "Brief summary"
        }
      ]
    }
  ]
}
```

## Contributing

This project follows trunk-based development. See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed contribution guidelines including:

- Branch naming conventions
- Commit message format
- Pull request requirements
- Code review process

## License

MIT
