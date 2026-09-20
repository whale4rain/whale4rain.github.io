$ErrorActionPreference = 'Stop'
$project = Split-Path $PSScriptRoot -Parent
$fixtureRoot = Join-Path ([IO.Path]::GetTempPath()) ('hugo-covers-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $fixtureRoot | Out-Null
try {
    foreach ($item in @('hugo.toml', 'assets', 'layouts', 'data')) {
        Copy-Item -LiteralPath (Join-Path $project $item) -Destination $fixtureRoot -Recurse
    }
    $posts = Join-Path $fixtureRoot 'content/posts'
    New-Item -ItemType Directory -Path $posts -Force | Out-Null
    $cases = @(
        @{ Name='tech'; Category='\u6280\u672f'; Color='#DCE5EB' },
        @{ Name='design'; Category='\u8bbe\u8ba1'; Color='#EBD8CC' },
        @{ Name='essay'; Category='\u968f\u7b14'; Color='#EAE4D8' },
        @{ Name='reading'; Category='\u9605\u8bfb'; Color='#DEE5D8' },
        @{ Name='life'; Category='\u751f\u6d3b'; Color='#EFE5CB' },
        @{ Name='unknown'; Category='unknown'; Color='#EAE4D8' }
    )
    foreach ($case in $cases) {
        $lines = @('---', ('title: ' + $case.Name), 'date: 2020-01-01', ('categories: ["' + $case.Category + '"]'), '---', 'Fixture.')
        Set-Content -LiteralPath (Join-Path $posts ($case.Name + '.md')) -Value $lines -Encoding utf8
    }
    $output = Join-Path $fixtureRoot 'public'
    function Build-Fixture {
        & hugo --source $fixtureRoot --destination $output --quiet
        if ($LASTEXITCODE -ne 0) { throw 'Fixture build failed.' }
    }
    function Get-PostCover($name) {
        $html = Get-Content -Raw -Encoding utf8 (Join-Path $output 'posts/index.html')
        $pattern = '(?s)<a class="card-link" href="/posts/' + $name + '/">(.*?)</a>'
        $card = [regex]::Match($html, $pattern).Groups[1].Value
        if (-not $card) { throw "Missing card: $name" }
        return $card
    }
    Build-Fixture
    foreach ($case in $cases) {
        if ((Get-PostCover $case.Name) -notmatch $case.Color) { throw "Wrong palette: $($case.Name)" }
    }
    if ((Get-PostCover 'tech') -notmatch 'preserveAspectRatio="xMidYMid slice"') {
        throw 'Generated SVG cover does not fill a wide card.'
    }
    $original = Get-PostCover 'tech'
    Build-Fixture
    if ((Get-PostCover 'tech') -cne $original) { throw 'Cover changed between builds.' }
    $techFile = Join-Path $posts 'tech.md'
    $source = Get-Content -Raw -Encoding utf8 $techFile
    $seeded = $source.Replace('title: tech', ('title: tech' + [Environment]::NewLine + 'cover_seed: v2'))
    Set-Content -LiteralPath $techFile -Encoding utf8 -Value $seeded
    Build-Fixture
    $variant = Get-PostCover 'tech'
    if ($variant -ceq $original) { throw 'Seed override did not change cover.' }
    if ($variant -notmatch '#DCE5EB') { throw 'Seed override changed palette.' }
    $customSource = $source.Replace('title: tech', ('title: tech' + [Environment]::NewLine + 'cover: /custom.webp'))
    Set-Content -LiteralPath $techFile -Encoding utf8 -Value $customSource
    Build-Fixture
    $custom = Get-PostCover 'tech'
    if ($custom -notmatch 'src="/custom.webp"' -or $custom -match '<svg') { throw 'Custom cover priority failed.' }
    Write-Output 'PASS: five palettes, fallback, repeatability, seed override, custom image priority.'
}
finally {
    $resolved = [IO.Path]::GetFullPath($fixtureRoot)
    $tempBase = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
    if (-not $resolved.StartsWith($tempBase, [StringComparison]::OrdinalIgnoreCase) -or
        (Split-Path $resolved -Leaf) -notlike 'hugo-covers-*') { throw 'Unsafe temporary cleanup path.' }
    Remove-Item -LiteralPath $resolved -Recurse -Force
}
