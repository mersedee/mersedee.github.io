# mersedee.github.io

Personal portfolio website for presenting front-end development experience, project work, technical skills, education, and contact details. The site is organized as a single-page portfolio with sections for the hero profile, about summary, work experience, skills, selected projects, education, and contact links.

The current portfolio content lives in `frontend/src/mock.js`, making it straightforward to update profile details, project descriptions, social links, and resume information without changing the section components.

## Technology

The website is built as a static React frontend and deployed to GitHub Pages.

- React 19 for the UI
- Vite 5 for local development and production builds
- Tailwind CSS for styling
- Radix UI component primitives and local `components/ui` wrappers
- Lucide React for icons
- GitHub Actions for automated GitHub Pages deployment

The repository also includes a small FastAPI backend scaffold in `backend/`. GitHub Pages only hosts the static frontend, so the backend is not part of the current Pages deployment and would need separate hosting if API features are added later.

## Project Structure

```text
frontend/
  src/
    components/sections/   Portfolio page sections
    components/ui/         Reusable UI components
    pages/Portfolio.jsx    Main page composition
    mock.js                Portfolio profile and content data
  public/                  Static public assets
  dist/                    Production build output

backend/
  server.py                FastAPI scaffold

.github/workflows/
  deploy.yml               GitHub Pages build and deploy workflow
```

## Local Development

Install dependencies and run the frontend from the `frontend/` directory:

```bash
cd frontend
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Preview the built site locally with:

```bash
npm run preview
```

## Deployment

The site is deployed automatically through GitHub Actions when changes are pushed to the `main` branch. The workflow installs frontend dependencies, builds the Vite app, uploads `frontend/dist`, and publishes it with GitHub Pages.

After the workflow finishes, the site is available at:

```text
https://mersedee.github.io/
```
