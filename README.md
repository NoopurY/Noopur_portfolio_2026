# Noopur Yawalkar — Portfolio

React + Vite + Tailwind CSS. Soft blue palette: Ice Blue `#EAF3FA`, Soft Blue `#BBD7EC`, Steel Blue `#568FC7`, Cobalt `#2455B5`, Deep Navy `#142A4A`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Edit content
Everything (intro, projects, experience, skills, links) is in **`src/data.js`**.
- Add your GitHub: set `github: 'https://github.com/<you>'` in `profile`.
- Add project links: set `link: 'https://...'` on any project — an arrow button appears.
- Resume: replace `public/Noopur_Yawalkar_Resume.pdf`.

Colours and fonts are in `src/index.css` (`@theme` block).

## Deploy (Vercel — recommended)
1. Push this folder to a GitHub repo:
   ```bash
   git init && git add . && git commit -m "portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/portfolio.git
   git push -u origin main
   ```
2. Go to vercel.com → **Add New → Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output `dist`. Click **Deploy**.

## Deploy (Netlify)
Import the repo on netlify.com → build command `npm run build`, publish directory `dist`.

## Deploy (GitHub Pages)
Add `base: '/<repo-name>/'` to `vite.config.js`, run `npm run build`, and publish the `dist` folder (e.g. with the `gh-pages` package: `npx gh-pages -d dist`).
