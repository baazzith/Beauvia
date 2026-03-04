# Beauvia

Mobile barber booking website with a React frontend and an Express backend for booking submissions.

## Local Development

1. Create `.env` from `.env.example`
2. Set `WHATSAPP_NUMBER` to your real WhatsApp number in international format, for example `919876543210`
3. Run:

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend API runs on `http://localhost:8787`

Bookings are stored locally in `server/data/bookings.json`.

## Deploy Through GitHub (Full Stack)

This project uses both frontend and backend, so use a Node host connected to GitHub (recommended: Render).

### 1) Push code to GitHub

```bash
git add .
git commit -m "Initial Beauvia website"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### 2) Deploy on Render from GitHub

1. Go to https://render.com and sign in with GitHub
2. Click `New` -> `Blueprint`
3. Select your GitHub repo
4. Render will detect `render.yaml` automatically
5. Add env var `WHATSAPP_NUMBER` (for example `919876543210`)
6. Click deploy

After deploy, your website will be live on a Render URL.

## Production (Manual)

```bash
npm run build
npm run start
```
# Beauvia
