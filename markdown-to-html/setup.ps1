# Setup Script

Write-Host "🚀 Setting up Markdown to HTML Blog..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the markdown-to-html directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Installation failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: npm run dev" -ForegroundColor White
Write-Host "  2. Open: http://localhost:3000" -ForegroundColor White
Write-Host "  3. Add your posts to content/posts/" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "  - QUICKSTART.md - Quick start guide" -ForegroundColor White
Write-Host "  - README.md - Full documentation" -ForegroundColor White
Write-Host "  - IMPLEMENTATION.md - What was built" -ForegroundColor White
Write-Host ""
Write-Host "Happy blogging! 🎉" -ForegroundColor Green
