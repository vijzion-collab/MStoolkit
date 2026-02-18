# PLAN: Universal English Translation & Verification

Establish a protocol to ensure all project writing, documentation, and agent interactions are exclusively in English.

## 🎯 Objectives
- Scrub all current Russian text from project artifacts and documentation.
- Establish a "Translation Auditor" persona within the orchestration flow.
- Ensure 100% English compliance for all future deliverables.

## 🏗️ Phase 1: Artifact Scrubbing (documentation-writer)
- [ ] Translate `task.md` entries that contain Russian summaries or notes.
- [ ] Translate `walkthrough.md` sections if any non-English remains.
- [ ] Scan `custom-skills/` specifically for 1C/BSL related comments (often in Russian by default).

## 🚀 Phase 2: Translation Guardrail (orchestrator)
- [ ] Update `AGENTS.md` with an explicit "English Only" requirement for all generated content.
- [ ] Verify that all sub-agents (project-planner, etc.) receive the translation context.

## 🧪 Phase 3: Verification (test-engineer)
- [ ] Run a project-wide regex scan for Cyrillic characters.
- [ ] Success criteria: `grep` returns 0 hits for `[а-яА-ЯёЁ]`.

## 🛠️ Agents Invoked
- `project-planner` (Planning)
- `documentation-writer` (Translation & Scrubbing)
- `test-engineer` (Regex Verification)

---

✅ Plan created: docs/PLAN-translation-cleanup.md

Onaylıyor musunuz? (Y/N)
