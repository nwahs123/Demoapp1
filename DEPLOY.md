# Deploying Lynk: The Scent of You to Vercel

This guide will help you deploy your Next.js app to Vercel, the recommended platform for Next.js.

## Prerequisites
- A GitHub account.
- A Vercel account (you can sign up with GitHub).

## Steps

1.  **Push to GitHub**
    - Create a new repository on GitHub.
    - Push your code to this repository.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

2.  **Import to Vercel**
    - Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Select your GitHub repository from the list.
    - Click **"Import"**.

3.  **Configure Project**
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `./` (default).
    - **Build Command**: `next build` (default).
    - **Output Directory**: `.next` (default).
    - **Install Command**: `npm install` (default).
    - **Environment Variables**: You don't have any secrets yet, so you can skip this.

4.  **Deploy**
    - Click **"Deploy"**.
    - Vercel will build your project and deploy it.
    - Once done, you will get a live URL (e.g., `lynkdemo.vercel.app`).

## Troubleshooting
- **Build Errors**: If the deployment fails, check the "Logs" tab in Vercel. Ensure `npm run build` works locally before pushing.
- **Missing Images**: Ensure all images are in the `public` folder and committed to Git.
