# stamp.ps1 — stamps every page with the current commit + date, then commits and pushes.
# Idempotent: updates the existing stamp in place if present, else inserts before </footer>.
$commit = (git rev-parse --short HEAD).Trim()
$date = Get-Date -Format 'yyyy-MM-dd'
$stamp = "  <div class=""build-stamp"">build $commit &middot; $date</div>"
foreach ($f in Get-ChildItem *.html) {
  $hasStamp = Select-String -Path $f.FullName -Pattern 'class="build-stamp"' -Quiet
  if ($hasStamp) {
    Update-MatchInFile $f.Name -OldText '  <div class="build-stamp">.*</div>' -Replacement $stamp -Regex | Out-Null
  } else {
    Update-MatchInFile $f.Name -OldText '</footer>' -Replacement "$stamp`n</footer>" | Out-Null
  }
  Write-Host "stamped $($f.Name)"
}