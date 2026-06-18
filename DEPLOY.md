# Deployment Guide - GitHub Pages

This guide explains how to deploy BabyWhy to GitHub Pages.

## Automatic Deployment (Recommended)

The repository is configured with GitHub Actions for automatic deployment on every push to `main`.

### Setup (One-time)

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click `Settings` → `Pages`

2. **Configure GitHub Pages**
   - Under "Build and deployment"
   - Select `GitHub Actions` as the source
   - Save

3. **That's it!**
   - Every push to `main` will automatically build and deploy
   - Your site will be live at: `https://anhnguyen765.github.io/claw-a-thon-26-demp/`

### How It Works

The `.github/workflows/deploy.yml` workflow:
1. Listens for pushes to the `main` branch
2. Installs dependencies
3. Builds the Next.js site with static export
4. Deploys to the `gh-pages` branch
5. GitHub Pages serves the site

## Manual Deployment

If you prefer to deploy manually:

### Local Setup

```bash
# Install gh-pages package (if not already installed)
npm install --save-dev gh-pages

# Build and deploy
npm run deploy
```

### What Happens

1. Next.js builds the site to the `out/` directory
2. `gh-pages` pushes the `out/` folder to the `gh-pages` branch
3. GitHub Pages automatically serves from this branch

## Viewing Your Deployment

After deployment, your site will be available at:
```
https://anhnguyen765.github.io/claw-a-thon-26-demp/
```

### Verify Deployment

1. Go to repository → Settings → Pages
2. You should see: "Your site is live at https://..."
3. Click the link to view your deployed site

## Troubleshooting

### Site Not Loading

1. **Check GitHub Pages is enabled**
   - Settings → Pages
   - Ensure source is set to "GitHub Actions"

2. **Clear browser cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. **Check deployment status**
   - Go to repository → Actions
   - Click the latest workflow run
   - Look for any error messages

4. **Check the gh-pages branch**
   - Go to repository
   - Click branch dropdown
   - Verify `gh-pages` branch exists and has recent commits

### Build Fails

Check the Actions tab for error logs:
1. Repository → Actions
2. Click the failed workflow
3. Click the "build" job
4. Scroll to see error details

Common issues:
- **Node version mismatch** — Update `.github/workflows/deploy.yml` node-version
- **Missing dependencies** — Run `npm install` locally first
- **TypeScript errors** — Run `npm run build` locally to debug

## Development vs Production

- **Local development:** `npm run dev`
  - Full Next.js features
  - Hot reload enabled
  - Runs on `http://localhost:3000`

- **Production (GitHub Pages):** `npm run build`
  - Static export only
  - No server-side features
  - Optimized for static hosting

## Path Configuration

The site is configured with:
```
basePath: '/claw-a-thon-26-demp'
output: 'export'
```

This means:
- All links are prefixed with `/claw-a-thon-26-demp/`
- The app works correctly at `https://anhnguyen765.github.io/claw-a-thon-26-demp/`
- If you deploy to a custom domain, update `basePath` in `next.config.js`

## Custom Domain (Optional)

To use a custom domain like `babywhy.com`:

1. **Buy a domain** from any registrar

2. **Configure DNS**
   - Point your domain to GitHub Pages servers
   - See GitHub docs for your registrar

3. **Update Repository Settings**
   - Settings → Pages → Custom domain
   - Enter your domain name
   - GitHub automatically creates a `CNAME` file

4. **Update next.config.js**
   - Set `basePath: ''` (remove the project path)

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '', // For custom domain
}
```

## Redeployment

To manually trigger a deployment:

1. Make a commit to `main`
2. Push to GitHub
3. The GitHub Actions workflow automatically runs
4. Wait 1-2 minutes for deployment to complete

Or force a rebuild:
1. Go to Actions
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

## Environment Variables

GitHub Pages is a static host, so:
- ❌ Cannot use server-side environment variables
- ❌ Cannot use API routes
- ✅ Can use client-side JavaScript
- ✅ Can call external APIs from the browser

For future AI integration, you would:
1. Set up a separate backend API (e.g., Vercel Functions, AWS Lambda)
2. Call the API from the browser
3. Handle CORS appropriately

## Performance Optimization

The deployed site includes:
- Static asset caching
- Minified JavaScript/CSS
- Optimized fonts
- CDN delivery via GitHub Pages

Check performance:
- Use Lighthouse: https://pagespeed.web.dev/
- Enter your deployment URL
- Get optimization suggestions

## Support

If deployment issues persist:

1. Check `.github/workflows/deploy.yml` is present
2. Verify `next.config.js` has `output: 'export'`
3. Run `npm run build` locally to test
4. Check GitHub Actions logs for errors
5. Ensure Node 18+ is installed locally

## Next Steps

After deployment:

1. ✅ Visit your live site
2. ✅ Test all links work (especially relative paths)
3. ✅ Share the link: `https://anhnguyen765.github.io/claw-a-thon-26-demp/`
4. ✅ Customize domain if needed
5. ✅ Set up API backend for AI features

Happy deploying! 🚀
