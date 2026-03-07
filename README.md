# Isha-Clinic

This repository contains a static front-end and a small Node.js backend that accepts appointment requests and persists them to a JSON file.

Run locally:

1. Install dependencies:

```bash
cd "c:\Users\Geetha Ram\siva\project\github_project\Isha-Clinic"
npm install
```

2. Start the server:

```bash
npm start
```

Open http://localhost:3000 in your browser. The form on the site POSTs to `/api/appointments` and entries are saved to `db.json`.

Notes:
- This is a minimal demo backend intended for local development. For production use, replace the JSON file persistence with a proper database and add input sanitization, authentication, and rate-limiting as needed.

Download real images used on the site

From PowerShell (recommended if ExecutionPolicy blocks):

```powershell
cd "c:\Users\Geetha Ram\siva\project\github_project\Isha-Clinic"
powershell -ExecutionPolicy Bypass -File .\download-images.ps1
```

Or (if your policy allows) run directly:

```powershell
cd "c:\Users\Geetha Ram\siva\project\github_project\Isha-Clinic"
.\download-images.ps1
```

The script saves images into the `images/` folder as `hero.jpg`, `gallery1.jpg`, `gallery2.jpg`, `gallery3.jpg`, `gallery4.jpg`.
