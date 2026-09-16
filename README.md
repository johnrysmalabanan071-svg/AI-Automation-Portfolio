# John Rys Clanor — Personal Portfolio

GitHub-ready export of the latest portfolio: Next.js App Router, React, TypeScript, Tailwind CSS and Framer Motion. Includes the updated portrait, hero, moving tools, project screenshots, certificates and resume. The existing live website is not changed by this export.

## Before publishing

- The contact form is currently a demo: submitting it does NOT deliver a message. The email and LinkedIn links work independently. Connect the form to an email service or CRM before relying on form submissions.
- Review the resume and certificates in `public/`: these become publicly downloadable on your website, even if your GitHub repository is private.
- This is a standard Next.js source project, not a static HTML upload. Deploy it to Vercel with the instructions below; it is not configured for GitHub Pages.
- No API keys are needed for the current portfolio. Never put private keys in GitHub or in variables prefixed `NEXT_PUBLIC_`.

## 1. Upload to GitHub

1. Extract the ZIP if using the archive.
2. Sign in at https://github.com and create a repository named `john-rys-portfolio`. Choose public or private. You may initialize it with a README to make the upload menu easy to find.
3. Open the repository and choose **Add file > Upload files**.
4. Drag the CONTENTS of this folder into the upload area, including `app`, `components`, `public`, and the configuration files. Include `.gitignore` and `.env.example` too.
5. Commit the upload. At the repository root you should see `package.json`, `app`, `components`, and `public`. Do not upload the ZIP itself or nest everything inside an extra folder.

Official guide: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## 2. Publish with Vercel

1. Sign in at https://vercel.com using GitHub.
2. Choose **Add New > Project**, allow access to the repository, then import `john-rys-portfolio`.
3. Use framework preset **Next.js**. Keep the root directory at the repository root. Keep the default output directory; do not enter `out` or `dist`.
4. The build command is `npm run build`. Dependencies are installed from the included package lock.
5. Click **Deploy**. Vercel will provide a `vercel.app` address. Test navigation, project previews, certificates, resume, mobile layout, and the email link.
6. Later changes committed to the connected production branch will trigger a new deployment.

Official guide: https://vercel.com/docs/git/vercel-for-github

## 3. Connect your domain

1. Purchase a domain if you do not already own one.
2. In your Vercel project, open **Settings > Domains > Add Domain**.
3. Enter your domain and follow the displayed DNS instructions at your domain provider. Copy the exact record values Vercel gives you. Preserve existing email/MX records and other unrelated records.
4. Wait until Vercel confirms the domain is configured and HTTPS is ready.
5. In the project's environment variables, add `NEXT_PUBLIC_SITE_URL` with your final full address, such as `https://your-domain.com`, for Production. Replace the example with your actual domain.
6. Redeploy so canonical links and social-sharing metadata use the new domain. Choose your preferred www/non-www domain and redirect the other in Vercel.

Official guide: https://vercel.com/docs/domains/working-with-domains/add-a-domain

## Local preview (optional)

Install a Node.js version supported by the included Next.js release (Node 22 recommended), then open a terminal in this folder:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To check production:

```sh
npm run build
npm start
```

Google fonts are downloaded at build time, so the build needs internet access.

## Where to edit later

- `components/portfolio.tsx`: content, hero, projects, certificates, experience and contact form.
- `components/portfolio-visual.ts`: visual styling overrides.
- `components/interactive-background.tsx`: interactive background.
- `app/globals.css`: shared styles and tools animation.
- `app/layout.tsx`: page title and social/SEO metadata.
- `public/`: portrait, resume, certificates, project images, tool icons and sharing image.

Keep third-party icon attribution in `public/tool-icons/SOURCES.md`.
