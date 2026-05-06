# mersedee.github.io

This repository is configured to publish the Vite frontend in `frontend/` to GitHub Pages.

## Deploy

1. Push the `main` branch to GitHub:

   ```bash
   git push origin main
   ```

2. In GitHub, open the repository settings:

   `Settings` -> `Pages` -> `Build and deployment`

3. Set `Source` to `GitHub Actions`.

After the workflow finishes, the site will be available at:

```text
https://mersedee.github.io/
```

## Custom Domain

For a custom domain, add a `frontend/public/CNAME` file containing only the domain name, then configure the same domain in `Settings` -> `Pages`.

Example:

```text
your-domain.com
```

GitHub Pages hosts the static frontend only. The Python backend in `backend/` needs a separate host if the site starts using backend API routes.
