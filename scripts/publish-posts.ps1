[CmdletBinding()]
param(
    [string]$Message = 'docs: publish blog posts',
    [switch]$All,
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

function Invoke-Git {
    param([Parameter(Mandatory)][string[]]$Arguments)

    & git @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "git $($Arguments -join ' ') failed."
    }
}

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Push-Location $projectRoot

try {
    Invoke-Git @('rev-parse', '--show-toplevel') | Out-Null
    $branch = (git branch --show-current).Trim()
    if (-not $branch) { throw 'Cannot publish from a detached Git HEAD.' }

    if (-not $SkipBuild) {
        Write-Host 'Building Hugo site...'
        & hugo --minify
        if ($LASTEXITCODE -ne 0) { throw 'Hugo build failed; nothing was committed.' }
    }

    if ($All) {
        Write-Host 'Staging every change with git add .'
        Invoke-Git @('add', '.')
    }
    else {
        Write-Host 'Staging article changes in content/posts/...'
        Invoke-Git @('add', '--all', '--', 'content/posts')
    }

    & git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
        throw 'No staged article changes to publish.'
    }
    if ($LASTEXITCODE -ne 1) { throw 'Unable to inspect staged changes.' }

    Invoke-Git @('commit', '-m', $Message)
    Invoke-Git @('push', 'origin', $branch)
    Write-Host "Published on $branch."
}
finally {
    Pop-Location
}
