# AGENTS Guidelines for 2026 Infinite Takeover

This repository contains a Next.js 15 application using the App Router and Tailwind CSS 4.
When working on the project interactively, please follow these guidelines:

## 1. Use the Development Server
* **Always use `npm run dev`** while iterating on the application. This ensures Hot Module Replacement (HMR) stays active.
* **Do NOT run `npm run build`** during an active session unless explicitly verifying production readiness, as it can interfere with the development environment.

## 2. Technical Stack
* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript (prefer `.tsx` for components)
* **Styling**: Tailwind CSS 4
* **Components**: Co-locate styles and tests with components where practical.

## 3. Custom Skills & Framework Global
* This repository includes a custom skill for **PDF Processing** located in `.agent/skills/pdf-processing`.
* It also integrates the **FrameWork Global** skill-based architecture. 
* Before starting work, refer to:
    * [SKILLS INDEX.md](file:///c:/Users/ShaDe/Documents/2026%20Infinite%20Takeover/SKILLS%20INDEX.md) - Map of all available skills.
    * [SKILLS RULE.md](file:///c:/Users/ShaDe/Documents/2026%20Infinite%20Takeover/SKILLS%20RULE.md) - Global guidance on skill application.

## 4. Useful Commands

| Command         | Purpose                                      |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start development server                     |
| `npm run lint`  | Run ESLint                                   |
| `npm run build` | Production build (use sparingly in sessions) |

---
Following these practices ensures a fast and dependable development workflow.
