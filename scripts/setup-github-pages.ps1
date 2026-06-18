# BabyWhy GitHub Pages Setup Script (Windows PowerShell)
# This script helps configure GitHub Pages deployment

Write-Host "🚀 BabyWhy GitHub Pages Setup" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Warning: Not a git repository" -ForegroundColor Yellow
    Write-Host "Run 'git init' first if this is a new project"
    exit 1
}

# Get the repository URL
$repoUrl = git config --get remote.origin.url
if (-not $repoUrl) {
    Write-Host "Warning: No remote origin found" -ForegroundColor Yellow
    Write-Host "Add your GitHub repository: git remote add origin <url>"
    exit 1
}

# Parse repository info
$parts = $repoUrl -split '/' | Select-Object -Last 2
$repo = $parts[1] -replace '\.git$', ''
$owner = $parts[0]

Write-Host "Repository Configuration" -ForegroundColor Cyan
Write-Host "Owner: $owner"
Write-Host "Repository: $repo"
Write-Host "URL: $repoUrl"
Write-Host ""

# Check which branch exists
$mainBranch = "main"
$branchExists = git rev-parse --verify main 2>&1
if ($LASTEXITCODE -ne 0) {
    $masterExists = git rev-parse --verify master 2>&1
    if ($LASTEXITCODE -eq 0) {
        $mainBranch = "master"
    } else {
        Read-Host "Neither 'main' nor 'master' found. Enter your branch name"
        $mainBranch = Read-Host
    }
}

Write-Host "Branch Configuration" -ForegroundColor Cyan
Write-Host "Main branch: $mainBranch"
Write-Host ""

# Check GitHub Actions workflow
Write-Host "GitHub Actions Workflow" -ForegroundColor Cyan
if (Test-Path ".github/workflows/deploy.yml") {
    Write-Host "✓ Deploy workflow found" -ForegroundColor Green
} else {
    Write-Host "✗ Deploy workflow not found" -ForegroundColor Red
    exit 1
}

# Check Next.js config
Write-Host ""
Write-Host "Next.js Configuration" -ForegroundColor Cyan
$configContent = Get-Content next.config.js -Raw
if ($configContent -like "*output: 'export'*" -or $configContent -like '*output: "export"*') {
    Write-Host "✓ Static export enabled" -ForegroundColor Green
} else {
    Write-Host "✗ Static export not enabled" -ForegroundColor Red
    exit 1
}

# Instructions
Write-Host ""
Write-Host "Setup Instructions" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Push your code to GitHub:"
Write-Host "   git add -A" -ForegroundColor Cyan
Write-Host "   git commit -m 'Configure GitHub Pages deployment'" -ForegroundColor Cyan
Write-Host "   git push -u origin $mainBranch" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Configure GitHub Pages:"
Write-Host "   - Go to: https://github.com/$owner/$repo/settings/pages"
Write-Host "   - Select 'GitHub Actions' as the source"
Write-Host "   - Click Save"
Write-Host ""
Write-Host "3. Monitor the deployment:"
Write-Host "   - Go to: https://github.com/$owner/$repo/actions"
Write-Host "   - Wait for the 'Deploy to GitHub Pages' workflow to complete"
Write-Host ""
Write-Host "4. View your site:" -ForegroundColor Cyan
Write-Host "   https://$owner.github.io/$repo/" -ForegroundColor Green
Write-Host ""
Write-Host "✓ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "- Push your code: git push"
Write-Host "- GitHub Actions will automatically build and deploy"
Write-Host "- Check deployment status in the Actions tab"
Write-Host "- Your site will be live in 1-2 minutes"
Write-Host ""
Write-Host "For more help, see DEPLOY.md"
