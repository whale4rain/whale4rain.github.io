$ErrorActionPreference = 'Stop'

$outputDirectory = Join-Path $env:TEMP ("hugo-smoke-" + [guid]::NewGuid().ToString())

try {
    hugo --destination $outputDirectory --cleanDestinationDir
    $homePage = Join-Path $outputDirectory 'index.html'
    $postListPage = Join-Path $outputDirectory 'posts/index.html'
    $samplePostPage = Join-Path $outputDirectory 'posts/welcome/index.html'

    if (-not (Test-Path $homePage)) { throw 'Home page was not generated.' }
    if (-not (Test-Path $postListPage)) { throw 'Post list page was not generated.' }
    if (-not (Test-Path $samplePostPage)) { throw 'Sample post page was not generated.' }

    $homeHtml = Get-Content -Raw -Encoding utf8 $homePage
    if ($homeHtml -notmatch 'Notes from the studio') {
        throw 'Home page does not contain the site title.'
    }
    if ($homeHtml -notmatch 'Latest writing') {
        throw 'Home page does not contain the latest-writing section.'
    }

    $samplePostHtml = Get-Content -Raw -Encoding utf8 $samplePostPage
    $sampleTitle = [string]::Concat([char]0x4ECE, [char]0x8FD9, [char]0x91CC, [char]0x5F00, [char]0x59CB)
    $sampleCategory = [string]::Concat([char]0x968F, [char]0x7B14)
    if ($samplePostHtml -notmatch $sampleTitle) {
        throw 'Sample post title is missing.'
    }
    if ($samplePostHtml -notmatch $sampleCategory) {
        throw 'Sample post category is missing.'
    }
}
finally {
    if (Test-Path $outputDirectory) {
        Remove-Item -LiteralPath $outputDirectory -Recurse -Force
    }
}
