# Hugo Blog Initialization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize a fast, responsive Hugo blog with a restrained editorial design inspired by modern product blogs.

**Architecture:** Hugo renders Markdown content through a small custom theme held directly in `layouts/` and `assets/`. The home page lists recent articles, while taxonomy and single-page templates use the same semantic card and reading layouts. A PowerShell smoke test builds the site into a temporary output directory and checks the generated routes and key page content.

**Tech Stack:** Hugo Extended 0.145+, Go templates, CSS, Markdown, PowerShell.

**Spec:** User request in this conversation: initialize this repository as a lightweight Hugo blog with a Claude-blog-like page design; animations are out of scope.

## Global Constraints

- Build only static output; do not add a runtime backend or client framework.
- Use original branding, copy, and imagery; do not reproduce Anthropic or Claude assets.
- Work directly on `main`, as explicitly authorized by the user.
- Keep the initial site dependency-free beyond Hugo.

---

### Task 1: Establish a build smoke test and Hugo configuration

**Files:**
- Create: `tests/site-smoke.ps1`
- Create: `hugo.toml`

**Interfaces:**
- Consumes: a Hugo executable available on `PATH`.
- Produces: a `hugo` project whose generated home page is available at `public/index.html`.

- [ ] **Step 1: Write the failing test**

Create `tests/site-smoke.ps1` to run `hugo --destination <temporary directory>` and assert that `index.html`, `posts/index.html`, and the text `Notes from the studio` exist.

- [ ] **Step 2: Run test to verify it fails**

Run: `powershell -ExecutionPolicy Bypass -File tests/site-smoke.ps1`

Expected: FAIL because `hugo.toml` and templates do not yet exist.

- [ ] **Step 3: Write the minimal implementation**

Create `hugo.toml` with the site title, base URL, pagination settings, taxonomy mappings, and a Chinese default content language.

- [ ] **Step 4: Run test to verify it passes**

Run: `powershell -ExecutionPolicy Bypass -File tests/site-smoke.ps1`

Expected: PASS once the basic home and post-list templates are in place.

- [ ] **Step 5: Commit**

```powershell
git add hugo.toml tests/site-smoke.ps1 layouts
git commit -m "feat: initialize Hugo blog foundation"
```

### Task 2: Create the editorial page templates and design system

**Files:**
- Create: `layouts/_default/baseof.html`
- Create: `layouts/index.html`
- Create: `layouts/_default/list.html`
- Create: `layouts/_default/single.html`
- Create: `layouts/partials/article-card.html`
- Create: `assets/css/main.css`

**Interfaces:**
- Consumes: Hugo `site.RegularPages`, page title/date/summary/taxonomy parameters.
- Produces: responsive home, list, and article pages with navigation, article cards, and readable article typography.

- [ ] **Step 1: Write the failing test**

Extend `tests/site-smoke.ps1` to assert that the built home page contains `<nav`, `Latest writing`, and a link to the sample post.

- [ ] **Step 2: Run test to verify it fails**

Run: `powershell -ExecutionPolicy Bypass -File tests/site-smoke.ps1`

Expected: FAIL because no themed templates or sample post exist.

- [ ] **Step 3: Write the minimal implementation**

Add templates that use the shared base layout and an article-card partial, plus CSS for an off-white canvas, serif display typography, responsive grid cards, focused reading column, taxonomy chips, and accessible contrast.

- [ ] **Step 4: Run test to verify it passes**

Run: `powershell -ExecutionPolicy Bypass -File tests/site-smoke.ps1`

Expected: PASS with all expected markup in generated output.

- [ ] **Step 5: Commit**

```powershell
git add layouts assets tests/site-smoke.ps1
git commit -m "feat: add editorial Hugo layouts"
```

### Task 3: Add starter content and deployment documentation

**Files:**
- Create: `content/posts/welcome.md`
- Create: `README.md`
- Modify: `tests/site-smoke.ps1`

**Interfaces:**
- Consumes: the Hugo template front-matter fields `title`, `date`, `summary`, `categories`, and `tags`.
- Produces: a working sample article and clear local build/deployment commands.

- [ ] **Step 1: Write the failing test**

Extend `tests/site-smoke.ps1` to assert that `/posts/welcome/` exists and contains the sample post title and category.

- [ ] **Step 2: Run test to verify it fails**

Run: `powershell -ExecutionPolicy Bypass -File tests/site-smoke.ps1`

Expected: FAIL because the sample Markdown article does not exist.

- [ ] **Step 3: Write the minimal implementation**

Add a Chinese welcome post with original text and metadata. Document `hugo server -D`, production builds, and GitHub Pages publication prerequisites in the README.

- [ ] **Step 4: Run test to verify it passes**

Run: `powershell -ExecutionPolicy Bypass -File tests/site-smoke.ps1`

Expected: PASS and generate home, posts, and sample article routes.

- [ ] **Step 5: Commit**

```powershell
git add content README.md tests/site-smoke.ps1
git commit -m "docs: add starter post and Hugo usage"
```
