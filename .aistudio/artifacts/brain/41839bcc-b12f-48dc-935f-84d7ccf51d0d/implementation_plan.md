# GitHub Pages Blank Screen Fix & Production Deployment Plan

Resolve the blank screen issue on `https://kennyrios.github.io/portfolio2026/` by setting Vite asset resolution to relative paths, verifying the production build, and adding a zero-maintenance GitHub Actions automated deployment workflow.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Root Cause of the Blank Page**: 
> In Vite, the default `base` configuration is `'/'` (root domain). When deployed to a project repository subpath like `https://kennyrios.github.io/portfolio2026/`, the browser attempts to fetch your JavaScript and CSS files from `https://kennyrios.github.io/assets/index-xxx.js` instead of `https://kennyrios.github.io/portfolio2026/assets/index-xxx.js`. Because the files return 404 Not Found, React fails to mount and the screen appears completely white/blank.
>
> Setting `base: './'` in `vite.config.ts` solves this immediately by converting all script, link, and asset tags to relative paths. This ensures the app runs properly on both GitHub Pages subpaths (`/portfolio2026/`) and custom domains (e.g., `kennyrios.com`).

---

## 1. Overview & Core Solution

- **Issue**: `https://kennyrios.github.io/portfolio2026/` loads `index.html` but scripts fail to load due to absolute root path referencing (`/assets/...`).
- **Target**: Fix Vite build output to use relative paths (`./assets/...`) so that all scripts, styles, fonts, and interactive canvas components load instantly.
- **Automation**: Add a GitHub Actions workflow (`.github/workflows/deploy.yml`) so any commit pushed to GitHub automatically builds and deploys without manual folder copying or CLI commands.

---

## 2. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       GitHub Repository                     │
│                 kennyrios/portfolio2026                    │
└──────────────────────────────┬──────────────────────────────┘
                               │ git push main
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            GitHub Actions Workflow (.github/workflows)      │
│  1. Checkout repository code                                │
│  2. Setup Node.js & npm ci                                  │
│  3. Run `npm run build` (Vite with base: './')              │
│  4. Upload `dist/` artifact to GitHub Pages                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 GitHub Pages Hosted Site                    │
│          https://kennyrios.github.io/portfolio2026/         │
│  • index.html loads ./assets/index.js & ./assets/index.css  │
│  • React 19 mounts into #root                               │
│  • Lenis scroll + Interactive Thick Brush Canvas active     │
│  • Project cards with 3D tilt & magnetic proximity active   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Implementation Steps

### Step 1: Configure Relative Base in `vite.config.ts`
- Update `vite.config.ts` to include `base: './'`.
- Verify that `dist/index.html` contains `<script type="module" crossorigin src="./assets/index-....js">` and `<link rel="stylesheet" crossorigin href="./assets/index-....css">`.

### Step 2: Add Automated GitHub Actions Workflow
- Create `.github/workflows/deploy.yml` with:
  - Trigger on push to `main` branch (and manual dispatch).
  - Setup Node 20.
  - Install dependencies and run `npm run build`.
  - Deploy to GitHub Pages using the official `actions/deploy-pages@v4`.

### Step 3: Add `gh-pages` Script Fallback in `package.json`
- Add a helper script for users who prefer deploying from the command line:
  - `"predeploy": "npm run build"`
  - `"deploy": "gh-pages -d dist"`

### Step 4: Verification Build
- Run `npm run build` and inspect the generated `dist/index.html` to confirm all asset links use `./assets/`.

---

## 4. GitHub Repository Settings (After We Apply the Code Fix)

Once the changes are committed and pushed to your GitHub repository:
1. Go to your repository on GitHub: **https://github.com/kennyrios/portfolio2026**
2. Click **Settings** (top tab) -> **Pages** (left sidebar).
3. Under **Build and deployment > Source**:
   - Select **GitHub Actions** (recommended for automatic deploys whenever you push).
   - *Alternatively*, if deploying manually from a branch: choose `Deploy from a branch` and select `gh-pages` (or `main` / `dist`).
4. Refresh `https://kennyrios.github.io/portfolio2026/` (or press Cmd+Shift+R / Ctrl+F5) to see your portfolio live.
