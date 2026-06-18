# GitHub Pages Deployment Checklist

Use this checklist to verify your BabyWhy app is ready for GitHub Pages deployment.

## Pre-Deployment ✓

- [ ] Code is committed and pushed to GitHub
- [ ] Repository URL is `https://github.com/anhnguyen765/claw-a-thon-26-demp.git`
- [ ] Main branch is `main` or `master`
- [ ] You have push access to the repository

## Configuration Files ✓

- [ ] `.github/workflows/deploy.yml` exists
- [ ] `next.config.js` has `output: 'export'`
- [ ] `next.config.js` has `basePath: '/claw-a-thon-26-demp'`
- [ ] `package.json` has build script with `next export`
- [ ] `.gitignore` includes `node_modules` and `.next`

## Local Build ✓

Run these commands to test locally:

```bash
# 1. Install dependencies
npm install

# 2. Test build
npm run build

# 3. Check output
ls -la out/
```

- [ ] `npm install` completes without errors
- [ ] `npm run build` creates the `out/` directory
- [ ] `out/` directory contains HTML files

## GitHub Configuration ✓

1. Go to: `https://github.com/anhnguyen765/claw-a-thon-26-demp/settings/pages`

2. Under "Build and deployment":
   - [ ] Source is set to `GitHub Actions`
   - [ ] Not using `Deploy from branch`

3. Other settings:
   - [ ] Custom domain is empty (unless you want one)
   - [ ] Enforce HTTPS is enabled

## Deployment Trigger ✓

The workflow runs automatically when:
- [ ] You push to the `main` branch
- [ ] A pull request is created

Manually trigger (optional):
1. Go to: `https://github.com/anhnguyen765/claw-a-thon-26-demp/actions`
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

## Verify Deployment ✓

After the workflow completes (1-2 minutes):

1. Go to: `https://github.com/anhnguyen765/claw-a-thon-26-demp/actions`
   - [ ] Latest "Deploy to GitHub Pages" workflow shows ✓ (green checkmark)
   - [ ] No error messages in logs

2. Go to: `https://github.com/anhnguyen765/claw-a-thon-26-demp/settings/pages`
   - [ ] Shows "Your site is live at https://..."
   - [ ] URL is `https://anhnguyen765.github.io/claw-a-thon-26-demp/`

3. Visit your site: `https://anhnguyen765.github.io/claw-a-thon-26-demp/`
   - [ ] Page loads without errors
   - [ ] All links work (presentation slides, /app page)
   - [ ] Styling looks correct
   - [ ] No 404 errors in browser console

## Content Verification ✓

On your live site, verify:

- [ ] Presentation deck loads (11 slides)
- [ ] Can navigate between slides with arrows
- [ ] Slide indicators work
- [ ] Play/pause button works
- [ ] "Launch App" button appears on last slide
- [ ] `/app` coaching interface loads
- [ ] Can type in chat and submit messages
- [ ] Mobile responsive design works

## Troubleshooting ✓

If deployment fails:

### Build fails
- [ ] Check Actions tab for error logs
- [ ] Run `npm run build` locally to debug
- [ ] Verify Node.js 18+ is used

### Site doesn't load
- [ ] Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
- [ ] Check URL is correct: `https://anhnguyen765.github.io/claw-a-thon-26-demp/`
- [ ] Verify `basePath` in `next.config.js` matches repo name

### Links broken
- [ ] Check console for 404 errors
- [ ] Verify all links use relative paths
- [ ] Ensure `basePath` is configured correctly

### Still stuck?
- [ ] Check DEPLOY.md for detailed instructions
- [ ] Review GitHub Actions logs
- [ ] Verify all files are committed and pushed

## Next Steps After Deployment ✓

- [ ] Test on mobile devices
- [ ] Share deployment URL with team
- [ ] Set up custom domain (optional)
- [ ] Add AI backend integration
- [ ] Set up analytics (optional)

## Quick Links

- **Repository:** https://github.com/anhnguyen765/claw-a-thon-26-demp
- **Live Site:** https://anhnguyen765.github.io/claw-a-thon-26-demp/
- **Settings:** https://github.com/anhnguyen765/claw-a-thon-26-demp/settings/pages
- **Actions:** https://github.com/anhnguyen765/claw-a-thon-26-demp/actions
- **Deployment Guide:** See DEPLOY.md

---

**Last Updated:** June 18, 2026
**Status:** Ready for GitHub Pages deployment ✓
