$ErrorActionPreference = 'Stop'

$outputDirectory = Join-Path $env:TEMP ("hugo-smoke-" + [guid]::NewGuid().ToString())

try {
    hugo --destination $outputDirectory --cleanDestinationDir
    $homePage = Join-Path $outputDirectory 'index.html'
    $postListPage = Join-Path $outputDirectory 'posts/index.html'

    if (-not (Test-Path $homePage)) { throw 'Home page was not generated.' }
    if (-not (Test-Path $postListPage)) { throw 'Post list page was not generated.' }

    $homeHtml = Get-Content -Raw $homePage
    if ($homeHtml -notmatch 'Notes from the studio') {
        throw 'Home page does not contain the site title.'
    }
    if ($homeHtml -notmatch 'Latest writing') {
        throw 'Home page does not contain the latest-writing section.'
    }
}
finally {
    if (Test-Path $outputDirectory) {
        Remove-Item -LiteralPath $outputDirectory -Recurse -Force
    }
}
