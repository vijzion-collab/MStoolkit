# move_vault_to_onedrive.ps1

$source = "C:\Users\ShaDe\Documents\Obsidian Vault"
$dest = "C:\Users\ShaDe\OneDrive\Obsidian Vault"

Write-Host "Moving vault to OneDrive..."

if (-not (Test-Path $dest)) {
    Move-Item -Path $source -Destination $dest -Force
    Write-Host "Success: Vault moved to $dest"
}
else {
    Write-Host "Error: Destination folder already exists."
}
