#!/bin/bash

# BabyWhy GitHub Pages Setup Script
# This script helps configure GitHub Pages deployment

set -e

echo "🚀 BabyWhy GitHub Pages Setup"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Warning: Not a git repository${NC}"
    echo "Run 'git init' first if this is a new project"
    exit 1
fi

# Get the repository URL
REPO_URL=$(git config --get remote.origin.url)
if [ -z "$REPO_URL" ]; then
    echo -e "${YELLOW}Warning: No remote origin found${NC}"
    echo "Add your GitHub repository: git remote add origin <url>"
    exit 1
fi

# Extract owner and repo name
if [[ $REPO_URL =~ ([^/]+)/([^/]+?)(\.git)?$ ]]; then
    OWNER="${BASH_REMATCH[1]}"
    REPO="${BASH_REMATCH[2]}"
else
    echo "Error: Could not parse repository URL"
    exit 1
fi

echo -e "${BLUE}Repository Configuration${NC}"
echo "Owner: $OWNER"
echo "Repository: $REPO"
echo "URL: $REPO_URL"
echo ""

# Check if main branch exists
if git rev-parse --verify main >/dev/null 2>&1; then
    MAIN_BRANCH="main"
elif git rev-parse --verify master >/dev/null 2>&1; then
    MAIN_BRANCH="master"
else
    echo -e "${YELLOW}Warning: Neither 'main' nor 'master' branch found${NC}"
    read -p "Enter your default branch name: " MAIN_BRANCH
fi

echo -e "${BLUE}Branch Configuration${NC}"
echo "Main branch: $MAIN_BRANCH"
echo ""

# Check GitHub Actions workflow
echo -e "${BLUE}GitHub Actions Workflow${NC}"
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✓ Deploy workflow found"
else
    echo "✗ Deploy workflow not found"
    echo "Please create .github/workflows/deploy.yml"
    exit 1
fi

# Check Next.js config
echo ""
echo -e "${BLUE}Next.js Configuration${NC}"
if grep -q "output: 'export'" next.config.js; then
    echo "✓ Static export enabled"
else
    echo "✗ Static export not enabled"
    echo "Add 'output: \"export\"' to next.config.js"
    exit 1
fi

# Verify package.json
echo ""
echo -e "${BLUE}Build Configuration${NC}"
if grep -q "next build && next export" package.json; then
    echo "✓ Build script configured"
else
    echo "⚠ Build script may need updates"
fi

# Instructions
echo ""
echo -e "${GREEN}Setup Instructions${NC}"
echo "==================="
echo ""
echo "1. Push your code to GitHub:"
echo -e "   ${BLUE}git add -A${NC}"
echo -e "   ${BLUE}git commit -m 'Configure GitHub Pages deployment'${NC}"
echo -e "   ${BLUE}git push -u origin $MAIN_BRANCH${NC}"
echo ""
echo "2. Configure GitHub Pages:"
echo "   - Go to: https://github.com/$OWNER/$REPO/settings/pages"
echo "   - Select 'GitHub Actions' as the source"
echo "   - Click Save"
echo ""
echo "3. Monitor the deployment:"
echo "   - Go to: https://github.com/$OWNER/$REPO/actions"
echo "   - Wait for the 'Deploy to GitHub Pages' workflow to complete"
echo ""
echo "4. View your site:"
echo -e "   ${GREEN}https://$OWNER.github.io/$REPO/${NC}"
echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "- Push your code: git push"
echo "- GitHub Actions will automatically build and deploy"
echo "- Check deployment status in the Actions tab"
echo "- Your site will be live in 1-2 minutes"
echo ""
echo "For more help, see DEPLOY.md"
