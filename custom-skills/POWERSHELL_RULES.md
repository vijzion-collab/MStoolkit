---
name: powershell-rules
description: Rules and best practices for PowerShell automation in the repository. Use when executing terminal commands or scripts.
---

# Skill Content

- **Safety First**: Use `SafeToAutoRun: true` only for non-destructive commands.
- **Environment**: All commands run in a Windows environment (PowerShell/cmd).
- **Escaping**: Be mindful of backslashes and double quotes in PowerShell strings.
- **Execution Policy**: If scripts are blocked, run commands directly via `cmd /c`.
