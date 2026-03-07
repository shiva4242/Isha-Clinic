#!/usr/bin/env pwsh
<#
Downloads hero and gallery images into the local `images/` folder.
Run with: `powershell -ExecutionPolicy Bypass -File .\download-images.ps1` if ExecutionPolicy blocks.
#>

$files = @(
    @{ url = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348'; out = 'hero.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'; out = 'gallery1.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66'; out = 'gallery2.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1604654894610-df63bc536371'; out = 'gallery3.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1526045478516-99145907023c'; out = 'gallery4.jpg' }
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$imagesDir = Join-Path $scriptDir 'images'

if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

foreach ($f in $files) {
    $outPath = Join-Path $imagesDir $f.out
    Write-Host "Downloading $($f.url) -> $outPath" -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri $f.url -OutFile $outPath -UseBasicParsing -ErrorAction Stop
        Write-Host "Saved: $outPath" -ForegroundColor Green
    }
    catch {
        Write-Warning "Failed to download $($f.url): $($_.Exception.Message)"
    }
}

Write-Host "Done. Files are in: $imagesDir" -ForegroundColor Yellow
