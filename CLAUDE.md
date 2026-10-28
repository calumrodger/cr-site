# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # local dev server
npm run build   # static export to out/ (also lints)
npm run lint    # next lint (next/core-web-vitals)
```

There is no test suite or test framework. No env vars are needed to build.

## Hosting

The site is a **static export** (`output: 'export'` in `next.config.js`) hosted on statichost.eu, which serves files only. `statichost.yml` builds with `npm ci && npm run build` and publishes `out/`. statichost serves `/x` from `x.html` and 308-redirects `/x/` to `/x`, and serves `404.html` for unknown paths. Anything that needs a server at request time won't work:

- No route handlers or server actions. Request-time APIs (`cookies()`, `headers()`, `searchParams` in server components) are out too.
- Dynamic routes need `generateStaticParams`.
- `next/image` runs with `images.unoptimized: true`.

DNS for calumrodger.com is managed at SiteGround, which also handles the domain's email.

## Stack

Next.js 14 App Router, plain JavaScript (no TypeScript), SCSS modules (one `*.module.scss` per component). Path aliases from `jsconfig.json`: `@components/*`, `@styles/*`, `@helpers/*`, `@tg/*` → `src/...`.

The repo has two largely separate parts: a portfolio site whose content lives in `content/`, and the **stanzafier**, a self-contained poetry-generator app.

## Portfolio site (`content/`, formerly headless WordPress)

- The content used to come from WordPress. It was exported once by `scripts/export-wordpress.mjs`, and the repo is now the only source.
  - **Posts:** each one is `content/posts/<slug>.html`. The file name is the URL slug. YAML frontmatter holds `id, title, date, featuredImage, featuredPost, blurb, indexPost, categories`, and the body is the post's HTML exactly as WordPress rendered it.
  - **Categories:** listed in `content/categories.json`.
  - **Uploads** (images and PDFs): in `public/wp-content/uploads/`, referenced as root-relative `/wp-content/uploads/...`.
- `src/helpers/api-utils.js` reads these files at build time.
  - `getPostData()` and `getCategoryData()` return the same edge shape WPGraphQL did, sorted by `date`, newest first. `postDataSorter()` flattens them into the shape the components use.
  - Pages, posts and category intros are all *posts*, looked up by slug or title. There is no per-page query.
  - `api-utils.js` uses `fs`, so client components must not import it. `sendContactData` lives in `src/helpers/contact-utils.js` for that reason.
- Every server page loads posts and categories and passes them to the client `Layout` (`src/components/layout.js`), which uses them for the category bar and footer.
- Conventions that depend on how the content is structured:
  - **Home page.** `src/app/page.js` reads `content/posts/home.html` by **position**: its first five top-level HTML elements become the heading, bio blurb, highlights, and so on. Changing that file's structure breaks the home page.
  - **Category intros.** A category's intro text is the post whose **title** equals the category slug (`getCategoryIntroPost`). For example, `books.html` has the title `book`.
  - **Featured items.** Which items a category page shows, and in what order, is hardcoded as slug arrays in `src/components/cat-component.js`.
- **Category slugs are hardcoded in several places, which must stay in sync:**
  - the allow-list and `generateStaticParams` in `src/app/category/[cat]/page.js`
  - the excluded-slug list in `src/app/[slug]/page.js`, which also excludes slugs taken by static routes
  - `src/components/cat-bar.js`

  `web` is not part of the dynamic route; it has its own route at `src/app/category/web/`.

### Web poems (`src/app/poem/<slug>/`)

Each digital poem is a standalone route. To add one, copy `src/app/poem/template/`. It has three files: `page.js` (server component that sets the metadata and wraps the poem in `PoemLayout` with optional border and text colours), `poem.js` (the piece itself, usually a client component), and `poem.module.scss`. Then add a link to it by hand in `src/components/web-component.js`, which is where the `/category/web` list is defined.

## Stanzafier (`src/app/stanzafier/` + `src/tg/`)

- `src/app/stanzafier/genny.js` is one large (~1600-line) client component that **owns all app state and every handler**. The components under `src/tg/*` are presentational: they get state and `on*` callbacks through props. There is no context or store, so a new feature usually means adding state and a handler in `genny.js` and passing them down.
- Data model:
  - The stanza is an array of word objects `{ id, type: 'text' | 'break', text, selected, style? }`.
  - The poem is an array of `{ id, stanza, selected }`.
  - `treatString()` / `treatImportString()` in `genny.js` turn raw text into stanza arrays.
- Stanza edits go through `onUpdate(newStanza)`. It keeps a single undo level (`oldStanza`), and undo/redo just swaps the current and previous values. The poem works the same way through `onUpdatePoem` / `oldPoem`.
- User feedback goes through `onSetStatusMessage(message, durationMs, colour)`.
- Presets (source texts) and word lists are JS modules in `public/tg/` (`presets/*.js`, `word-lists.js`) and are imported directly rather than fetched.
- `src/tg/utils/cmu-*.js` are huge generated dictionaries (~130k lines each), used for syllable, stress and rhyme counts. Search them; don't read them whole.
- **LLM features (currently broken on the static host).** `src/tg/fx/content/llm.js` and `src/tg/word-bank/populate-word-bank.js` POST `{ prompt }` to `/api/ai`.
  - The handler is kept, unchanged, at `src/app/_api/ai/route.js`. The `_` prefix keeps it out of the build, so `/api/ai` returns 404 and the callers show their error message.
  - The handler runs `anthropic/claude-3.5-haiku` **via Replicate**.
  - Prompts ask the model to wrap a JS array in `:::` delimiters, and the client parses whatever is between them. Keep that format if you change a prompt.
- **External data (currently broken on the static host).** YouTube comments, OMDb, Guardian and weather data come from `src/tg/server-actions/actions.js`.
  - These used to be server actions. With `'use server'` removed, they run in the browser without API keys, so they fail.
  - On failure they return the string `'error'` instead of throwing, and callers check for it.
  - Wikipedia is fetched from the client (`source-pad/generate-from-wiki.js`).
- **`mpp-new` reads this repo.** Its `generate-stanzafier` script reads `public/tg/presets/*.js` and `src/tg/utils/cmu-stress-count-dictionary.js` from a `../cr-site` checkout, so don't move those files.
- Save/load exports the whole state as a JSON download (`src/tg/global/save-load.js`), and `onLoadState` in `genny.js` restores it. If you add new state that should persist, add it to both.
- The in-app user docs are `src/tg/docs/docs.js`, with screenshots in `public/tg/docs-images/`.

## Known loose ends

- `src/components/contact-form.js` posts to `/api/contact` and `src/components/mailing-list-signup.js` posts to `api/mailing-list`, but neither route exists.
  - `contact-form.js` isn't rendered anywhere.
  - `/mailing-list` is built but nothing links to it.
- `@vercel/analytics` is still in `src/app/layout.js`. Off Vercel, its script request returns 404.
- The `mongodb` dependency is not used anywhere.
