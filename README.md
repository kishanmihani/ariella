# Daybook

A responsive task planner with a React/Vite frontend and a Node.js API backed by MongoDB.

## Run locally

Install dependencies, copy `.env.example` to `.env`, then start the app:

```powershell
npm install
npm run dev
```

Task data comes from the hosted API. In development, Vite proxies `/api` to the backend; on Vercel, the `/api` rewrite does the same. Leave `VITE_API_URL` unset to use these same-origin proxies. If you set it to a different API origin, that API must allow requests from the frontend's origin.

## Project structure

```text
public/                   Static files
src/
  components/             Shared UI and task form/list
  pages/                  Welcome, dashboard, task, and utility screens
  types/                  Task types
  utils/                  API client and date helpers
  App.tsx                 Main application
  main.tsx                Frontend entry point
```

## Deploy to Vercel

Deploy this frontend as one Vercel project from the repository root:

1. Import this repository and keep **Root Directory** set to `.` (the repository root).
2. Use these **Build and Output Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Leave `VITE_API_URL` unset to use the configured same-origin API rewrite, then deploy.
