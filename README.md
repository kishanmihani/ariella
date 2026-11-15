# Daybook

A responsive task planner with a React/Vite frontend and a Node.js API backed by MongoDB.

## Run locally

1. Start MongoDB locally, or set `MONGO_URI` in `.env` to your MongoDB connection string. The checked-in `.env.example` shows the expected variables.
2. In one terminal, start the API:

   ```powershell
   npm --prefix backend run dev
   ```

3. In a second terminal, start the frontend:

   ```powershell
   npm run dev
   ```

The API seeds a few example tasks when the MongoDB `tasks` collection is empty. The Vite development server proxies `/api` requests to the Node API on port `3001`.

For a non-watching backend process, run `npm --prefix backend start`. The root `npm run server` command remains available as well.

## Project structure

- `frontend/src/pages/` contains the welcome, dashboard, task, and utility screens.
- `frontend/src/components/` contains shared UI elements such as task lists, forms, navigation, and icons.
- `frontend/src/utils/` contains the frontend API client and date helpers.
- `backend/server/models/`, `backend/server/controllers/`, and `backend/server/routes/` follow the MVC pattern for task data and API endpoints.
- `backend/server/config/` and `backend/server/app.js` handle MongoDB connection and Express setup.
- `backend/api/[...path].js` adapts the Express API for Vercel; `api/[...path].js` is its root deployment entry point.

## Deploy to Vercel

1. Create a MongoDB Atlas cluster and configure its network access for your Vercel deployment.
2. Import this repository into Vercel. The included `vercel.json` builds the Vite app into `frontend/dist`; `api/[...path].js` serves the Express API.
3. Add `MONGO_URI` in Vercel **Project Settings → Environment Variables** using the Atlas connection string. Set `MONGO_DB` to `daybook` if you want to choose the database explicitly.
4. Deploy. The frontend calls the API through relative `/api` URLs, so no separate frontend API URL is needed.
