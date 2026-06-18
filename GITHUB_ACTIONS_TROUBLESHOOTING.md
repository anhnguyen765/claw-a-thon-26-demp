# GitHub Actions Troubleshooting Guide

If you're seeing errors in the GitHub Actions workflow, this guide will help you fix them.

## Common Errors

### Error: "Deprecated version of actions/upload-artifact"

**Status:** ✅ **FIXED** (Updated in latest commit)

The workflow now uses:
- ✅ `actions/upload-pages-artifact@v3` (was v2)
- ✅ `actions/deploy-pages@v4` (was v2)

**What to do:**
1. Pull the latest code: `git pull origin main`
2. The workflow will run automatically on your next push
3. Check Actions tab to verify it works

---

## Workflow Troubleshooting

### Workflow Won't Run

**Check:**
1. Is your branch named `main`? (not `master`)
   - The workflow only triggers on pushes to `main`
   - Go to repo → Settings → Branches → Default branch

2. Did you enable GitHub Pages?
   - Go to Settings → Pages
   - Source should be `GitHub Actions`

3. Check the Actions tab
   - Go to your repository → Actions
   - Do you see a "Deploy to GitHub Pages" workflow listed?

**Fix:**
```bash
# If branch is master, rename it to main
git branch -m master main
git push -u origin main
```

### Build Step Fails

**Error in npm ci or npm run build**

**Debug:**
1. Go to Actions → Latest workflow → build job
2. Expand the failed step
3. Look for error message

**Common causes:**

#### Node version issue
```yaml
# In .github/workflows/deploy.yml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'  # Change to '20' if needed
    cache: 'npm'
```

#### Dependency issue
```bash
# Test locally first
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### TypeScript errors
```bash
# Fix TypeScript issues
npm run build  # Run locally to see detailed errors

# Check tsconfig.json
cat tsconfig.json

# Common fix: check app/ directory exists
ls -la app/
```

### Deploy Step Fails

**Error after successful build**

**Check:**
1. Pages settings: Settings → Pages
2. Verify source is `GitHub Actions`
3. Check for CNAME or custom domain conflicts

**Fix:**
```bash
# Remove any CNAME file
git rm CNAME
git commit -m "Remove CNAME file"
git push
```

### Site 404 After Deploy

**The build succeeds but site shows 404**

**Common cause:** Wrong basePath in next.config.js

```javascript
// Check your next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/claw-a-thon-26-demp',  // Should match your repo name
  images: {
    unoptimized: true,
  },
}
```

**Fix:**
1. Verify the basePath matches your repository name exactly
2. Rebuild: `git push` (workflow runs automatically)
3. Wait 2 minutes for deployment

### Pages Settings Not Showing Deployment

**Deploy job completed but Pages shows nothing**

**Check:**
1. Go to Actions tab
2. Click the completed workflow
3. Click "deploy" job
4. Look for the deployment URL in the output

**Manual fix:**
1. Settings → Pages
2. Select "Deploy from a branch"
3. Choose `gh-pages` branch
4. Wait 1 minute
5. Switch back to "GitHub Actions"

---

## Two Workflow Options

### Method 1: GitHub Actions (Recommended)

File: `.github/workflows/deploy.yml`
- Uses official GitHub Pages environment
- Automatic HTTPS and CDN
- Latest versions
- **Use this if:** Works without errors (updated to fix deprecated versions)

### Method 2: Traditional gh-pages Branch

File: `.github/workflows/deploy-alt.yml`
- Uses `peaceiris/actions-gh-pages` action
- Manual gh-pages branch management
- More control
- **Use this if:** Method 1 continues to have issues

**To switch to Method 2:**

1. Disable the main workflow:
```bash
mv .github/workflows/deploy.yml .github/workflows/deploy.yml.bak
mv .github/workflows/deploy-alt.yml .github/workflows/deploy.yml
git add .github/workflows/
git commit -m "Switch to gh-pages deployment method"
git push
```

2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `gh-pages` branch
5. Wait for the workflow to complete

---

## Testing Locally

### Test Build Locally First

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The output should be in ./out/
ls -la out/

# Test locally (requires Node.js server)
npx serve out/
# Visit http://localhost:3000/claw-a-thon-26-demp/
```

### Verify All Files Are Included

```bash
# Check what got built
find out/ -type f | head -20

# Should include:
# - index.html
# - _next/ directory
# - app/ directory with HTML files
```

---

## Debugging Steps

### Step 1: Check Configuration

```bash
# Verify files exist
ls -la .github/workflows/deploy.yml
ls -la next.config.js
cat next.config.js | grep -E "output|basePath"
```

### Step 2: Test Build

```bash
npm install
npm run build

# Should create out/ directory
ls -la out/ | head -5
```

### Step 3: Check GitHub Settings

- [ ] Repository is public (or Actions enabled for private)
- [ ] Pages is set to "GitHub Actions"
- [ ] Default branch is "main"
- [ ] Branch protection rules aren't blocking workflow

### Step 4: View Workflow Logs

1. Go to: https://github.com/anhnguyen765/claw-a-thon-26-demp/actions
2. Click the latest workflow run
3. Click "build" or "deploy" job
4. Expand each step to see detailed output
5. Look for error messages

---

## Reset & Retry

If everything is broken, start fresh:

```bash
# Reset workflow cache
# (No command needed - GitHub does this automatically)

# Force workflow to run
1. Go to Actions tab
2. Click "Deploy to GitHub Pages"
3. Click "Run workflow" dropdown
4. Click "Run workflow"
5. Watch the build progress
```

---

## Quick Reference

| Issue | Solution |
|-------|----------|
| Workflow won't run | Enable GitHub Pages in Settings |
| Build fails | Run `npm run build` locally first |
| Deploy fails | Check Pages settings → source is "GitHub Actions" |
| Site shows 404 | Check basePath in next.config.js |
| Deprecated actions | Pull latest code (already fixed) |
| Still stuck | Use deploy-alt.yml method |

---

## Getting Help

### Check These Files First

- `.github/workflows/deploy.yml` — Main workflow
- `.github/workflows/deploy-alt.yml` — Alternative workflow
- `next.config.js` — basePath configuration
- `package.json` — Build scripts

### Common Commands

```bash
# Check branch name
git branch

# Check remote
git remote -v

# Verify files
ls -la .github/workflows/

# Check config
cat next.config.js

# Test build
npm run build

# See what got built
find out/ -type f | wc -l
```

### Contact Points

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Next.js Export Docs:** https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **GitHub Pages Docs:** https://docs.github.com/en/pages

---

## Confirmed Working Setup

✅ **Current Configuration (Fixed)**

- Workflow: `.github/workflows/deploy.yml`
- Node: 18 (or 20)
- Actions versions:
  - `actions/checkout@v4`
  - `actions/setup-node@v4`
  - `actions/upload-pages-artifact@v3` ← Updated from v2
  - `actions/deploy-pages@v4` ← Updated from v2
- Next.js: 15.x with `output: 'export'`
- Deployment: GitHub Actions → GitHub Pages

**Status:** ✅ Ready to use

---

Last updated: June 18, 2026
