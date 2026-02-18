# PLAN: OpenClaw Gateway Stabilization & Auth Fix

This plan addresses the persistent "disconnected (1006)" error and the "Service loaded but not running" status by standardizing the authentication flow and stabilizing the Windows orchestration layer.

## User Review Required

> [!IMPORTANT]
> **Token-Based Auth**: v2026.2.13 requires all clients (cli, dashboard, subagents) to use a valid token. We will hardcode this in our local environment to prevent future disconnects.
> 
> **Scheduled Task vs Direct Process**: The "stopped" status in `gateway status` is often a reporting error when the probe fails. We will focus on making the probe succeed.

## Proposed Changes

### 1. Configuration Layer
#### [MODIFY] [.env](file:///C:/Users/ShaDe/.openclaw/workspace/.env)
- Ensure `OPENROUTER_API_KEY` is present and assigned to the correct key.
- Add `OPENCLAW_GATEWAY_TOKEN` to ensure environmental persistence across service restarts.

#### [MODIFY] [openclaw.json](file:///C:/Users/ShaDe/.openclaw/openclaw.json)
- Verify `gateway.auth.token` matches the environment variable.
- Set `gateway.bind` to `loopback` to ensure maximum security for local-only traversal.

### 2. Orchestration Layer (Windows)
#### [EXECUTION] Scheduled Task Reset
- We will fully delete and recreate the "OpenClaw Gateway" Scheduled Task to ensure it uses the updated v2026.2.13 binary path and inherits the correct profile environment.

### 3. Client & Dashboard
#### [DOCUMENTATION] Tokenized Access
- Generate and provide a persistent desktop shortcut/link for the dashboard that includes the token by default.

---

## Phase 1: Preparation (Analysis)
- [x] Verify Ollama health (Port 11434)
- [x] Update OpenClaw to v2026.2.13
- [x] Identify token mismatch in gateway logs

## Phase 2: Implementation (Solutioning)
- [ ] Align `.env` and `openclaw.json` tokens.
- [ ] Force-stop all lingering Node processes (PIDs 16436, 21876, 6276, 10576).
- [ ] Run `openclaw doctor --fix` to ensure structural integrity post-update.
- [ ] Reconfigure the Windows Scheduled Task for persistent background execution.

## Phase 3: Verification
### Automated Tests
- Run `openclaw gateway status` and verify **RPC probe: success**.
- Execute `curl http://127.0.0.1:18789/` to check dashboard availability.

### Manual Verification
- Open tokenized dashboard URL in browser.
- Verify "connected" status in the Gateway UI.
- Test a quick "ping" chat message using the `openrouter-claude` model.

---

[OK] Plan created: docs/PLAN-openclaw-gateway-fix.md

Next steps:
- Review the plan
- Run `/create` or simply ask me to "execute phase 2" to start implementation.
