$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

Write-Host "=============================================="
Write-Host "✅ Starting PowerShell Local Server..."
Write-Host "👉 Open http://localhost:$port in your browser."
Write-Host "=============================================="

try {
    $listener.Start()
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath.EndsWith("/")) {
            $urlPath = Join-Path $urlPath "index.html"
        }
        
        $urlPathClean = $urlPath.Replace("/", "\").TrimStart("\")
        $filePath = Join-Path (Get-Location) $urlPathClean
        
        if (-not (Test-Path $filePath -PathType Leaf)) {
            # Fallback to index.html for routing/loader support
            $filePath = Join-Path (Get-Location) "index.html"
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css" }
                ".js"   { "application/javascript" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".gif"  { "image/gif" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                ".webp" { "image/webp" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Error in server: $_"
} finally {
    $listener.Close()
}
