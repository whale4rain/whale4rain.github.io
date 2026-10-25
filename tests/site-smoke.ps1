$ErrorActionPreference = 'Stop'

$outputDirectory = Join-Path ([IO.Path]::GetTempPath()) ("hugo-smoke-" + [guid]::NewGuid().ToString())

try {
    hugo --destination $outputDirectory --cleanDestinationDir
    if ($LASTEXITCODE -ne 0) { throw 'Hugo build failed.' }

    $homePage = Join-Path $outputDirectory 'index.html'
    $postListPage = Join-Path $outputDirectory 'posts/index.html'
    $tagsPage = Join-Path $outputDirectory 'tags/index.html'
    $archivesPage = Join-Path $outputDirectory 'archives/index.html'
    $searchIndex = Join-Path $outputDirectory 'index.json'
    $technicalPostPage = Join-Path $outputDirectory 'posts/go-memory-model/index.html'

    foreach ($page in @($homePage, $postListPage, $tagsPage, $archivesPage, $searchIndex, $technicalPostPage)) {
        if (-not (Test-Path $page)) { throw "Page was not generated: $page" }
    }

    $homeHtml = Get-Content -Raw -Encoding utf8 $homePage
    if ($homeHtml -notmatch 'whale4rain') { throw 'Home page does not contain the site title.' }
    if ($homeHtml -notmatch 'post-card') { throw 'Home page does not list recent posts.' }

    $technicalPostHtml = Get-Content -Raw -Encoding utf8 $technicalPostPage
    if ($technicalPostHtml -match '<pre[^>]+style=') {
        throw 'Code blocks must not use Hugo inline highlighting styles.'
    }
    if ($technicalPostHtml -notmatch 'class=["'']?chroma') {
        throw 'Technical post must use class-based syntax highlighting.'
    }
    if ($technicalPostHtml -notmatch 'TableOfContents') {
        throw 'Technical post must render a table of contents.'
    }

    $styleHref = [regex]::Match($technicalPostHtml, 'href=["'']?([^"'' >]+\.css)').Groups[1].Value
    if (-not $styleHref) { throw 'Stylesheet link was not generated.' }
    $stylePath = Join-Path $outputDirectory ($styleHref.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar))
    $style = Get-Content -Raw -Encoding utf8 $stylePath
    if ($style -notmatch 'JetBrains Mono' -or $style -notmatch '\.chroma') {
        throw 'Code typography and syntax theme styles are missing.'
    }
}
finally {
    if (Test-Path $outputDirectory) {
        Remove-Item -LiteralPath $outputDirectory -Recurse -Force
    }
}
