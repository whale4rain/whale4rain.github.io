$ErrorActionPreference = 'Stop'

$project = Split-Path $PSScriptRoot -Parent
$publisher = Join-Path $project 'scripts/publish-posts.ps1'

if (-not (Test-Path $publisher)) {
    throw 'Publisher script is missing.'
}

$sandbox = Join-Path ([IO.Path]::GetTempPath()) ('publish-posts-' + [guid]::NewGuid())
$remote = $sandbox + '-remote.git'
New-Item -ItemType Directory -Path (Join-Path $sandbox 'scripts') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $sandbox 'content/posts') -Force | Out-Null

try {
    Copy-Item -LiteralPath $publisher -Destination (Join-Path $sandbox 'scripts/publish-posts.ps1')
    Set-Content -LiteralPath (Join-Path $sandbox 'content/posts/test.md') -Encoding utf8 -Value "---`ntitle: Test`n---`n"
    git -C $sandbox init --initial-branch=main --quiet
    git -C $sandbox config user.name 'Smoke Test'
    git -C $sandbox config user.email 'smoke@example.invalid'
    git -C $sandbox add .
    git -C $sandbox commit --quiet -m 'chore: establish fixture'
    git init --bare --quiet $remote
    git -C $sandbox remote add origin $remote
    git -C $sandbox push --quiet -u origin main

    Add-Content -LiteralPath (Join-Path $sandbox 'content/posts/test.md') -Value 'Updated.' -Encoding utf8
    & (Join-Path $sandbox 'scripts/publish-posts.ps1') -Message 'docs: publish fixture' -SkipBuild
    if ($LASTEXITCODE -ne 0) { throw 'Publisher script failed.' }
    if ((git -C $sandbox log -1 --format=%s) -ne 'docs: publish fixture') { throw 'Publisher used the wrong commit message.' }
    if ((git --git-dir=$remote log main -1 --format=%s) -ne 'docs: publish fixture') { throw 'Publisher did not push the commit.' }
    Write-Output 'PASS: publisher commits and pushes article changes.'
}
finally {
    foreach ($path in @($sandbox, $remote)) {
        if (Test-Path $path) { Remove-Item -LiteralPath $path -Recurse -Force }
    }
}
