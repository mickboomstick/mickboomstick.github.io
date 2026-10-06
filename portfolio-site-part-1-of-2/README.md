# Matthew Guadarrama — Portfolio

A static, no-build portfolio site (plain HTML/CSS/JS) for Mechanical Engineering projects, built to deploy directly with GitHub Pages and a custom domain.

## File structure

```
index.html
css/style.css
js/projects-data.js   ← edit this to add/remove/update projects
js/main.js             ← renders cards + the image modal, no edits usually needed
assets/images/         ← project photos/renders live here
CNAME                  ← your custom domain (see below)
.nojekyll               ← tells GitHub Pages not to run Jekyll on the site
```

## Adding a new project

Open `js/projects-data.js` and add a new object to the `PROJECTS` array, e.g.:

```js
{
  id: "my-new-project",
  title: "My New Project",
  tags: ["SolidWorks", "3D Printing"],
  status: "Complete",        // or "In Progress"
  date: "Spring 2027",
  summary: "One or two sentence summary shown on the card.",
  details: ["First paragraph shown in the popup.", "Optional second paragraph."],
  specs: [{ k: "CAD", v: "SolidWorks" }],
  images: ["my-new-project-1.png", "my-new-project-2.png"]  // put files in assets/images/
}
```

Drop the image file(s) into `assets/images/` and the card + popup gallery will render automatically — no HTML editing required. Leave `images: []` for a project with no photo yet (shows "Image coming soon").

## Deploying on GitHub Pages with a custom domain

1. **Create a repo.** On GitHub, create a new repository (e.g. `portfolio` or `matthewguadarrama.com`) and push all the files in this folder to the `main` branch.

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages.** In the repo, go to **Settings → Pages**. Under "Build and deployment," set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.

3. **Point your domain at GitHub Pages.** Your domain is `matthew-guadarrama.me` — that's an apex/bare domain (no `www`), so with your domain registrar (GoDaddy, Namecheap, Google Domains, etc.), add four **A** records for the root domain pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   Optionally also add a **CNAME** record for `www` pointing to `<your-username>.github.io`, if you want `www.matthew-guadarrama.me` to work too (GitHub will offer to redirect one to the other once both are set up).

4. **Set the custom domain in GitHub.** Still in **Settings → Pages**, enter `matthew-guadarrama.me` in the "Custom domain" field and save. GitHub will automatically commit a `CNAME` file to your repo with that domain in it — this repo already includes a `CNAME` file pre-filled with `matthew-guadarrama.me`, so this step should just confirm it.

5. **Wait for DNS + enable HTTPS.** DNS can take a few minutes to a few hours to propagate. Once GitHub verifies it, check "Enforce HTTPS" in the Pages settings.

That's it — the site is fully static, so no build step, no `node_modules`, nothing else to configure.

## Notes

- The `CNAME` file in this folder is already set to `matthew-guadarrama.me`. If you ever change domains, edit that file to the new one (one line, no `http://`), or let GitHub overwrite it for you per step 4 above.
- Music section: links out to your YouTube channel (`@noskeeeee`) via a branded YouTube card, plus a "Work in Progress" list of streamable/downloadable demo tracks driven by `js/music-data.js` — add a track by dropping an mp3 into `assets/audio/` and adding an entry to `TRACKS`. A few FL Studio screenshots are embedded directly in `index.html` (`assets/images/studio/`) to break up the text; swap them out by editing the `<img>` tags there.
- Project tags (SolidWorks, ANSYS Fluent, CFD, etc.) each have their own fixed color, defined in `css/style.css` under "Per-skill tag colors." Adding a brand-new tag that isn't in that list just falls back to the default teal accent color until you add a rule for it.
