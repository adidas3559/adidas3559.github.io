# Chatbot Setup — Finish on Personal Computer

The AI chatbot UI and Cloudflare Worker code are already written. You just need to
deploy the Worker from your personal machine (where your personal Gmail/Cloudflare
account is). Then drop the Worker URL into the project and rebuild.

---

## What's already done
- `worker/index.js` — Cloudflare Worker that proxies to Gemini 2.0 Flash
- `wrangler.toml` — Worker config (name: `portfolio-chat`)
- `src/components/CopilotPanel.jsx` — fully wired chat UI
- `.env.local` — placeholder file waiting for the Worker URL
- Gemini API key — already created at aistudio.google.com

---

## Steps to finish

### 1. Clone / pull the repo on your personal computer
Make sure you have the latest code.

### 2. Install Wrangler (Cloudflare CLI)
```bash
npm install -g wrangler
```

### 3. Log in to Cloudflare
```bash
wrangler login
```
Opens a browser — log in with your personal Gmail account.

### 4. Store your Gemini API key as a Cloudflare secret
```bash
wrangler secret put GEMINI_API_KEY
```
Paste your Gemini API key when prompted (from aistudio.google.com).
This stores it securely in Cloudflare — it never touches the code or git history.

### 5. Deploy the Worker
Run this from the project root (where `wrangler.toml` lives):
```bash
wrangler deploy
```
When it finishes you'll see a URL like:
```
https://portfolio-chat.YOUR_SUBDOMAIN.workers.dev
```
Copy that URL.

### 6. Add the Worker URL to `.env.local`
Open `.env.local` in the project root and fill in the URL:
```
VITE_CHAT_URL=https://portfolio-chat.YOUR_SUBDOMAIN.workers.dev
```

### 7. Rebuild and redeploy to GitHub Pages
```bash
npm run build
```
Then push / deploy as normal.

---

## Testing it works
- Open the site, click the copilot icon (activity bar or menu)
- Click one of the suggestion chips or type a question
- You should get a real Gemini response about Stephen within ~1 second
- The panel allows 5 messages per browser session (resets on page refresh)
- The pencil icon (top right of panel) starts a new chat

---

## If something goes wrong
- **"Failed to fetch"** — double-check the URL in `.env.local` matches exactly what `wrangler deploy` printed
- **Blank/error reply** — run `wrangler tail` to see live Worker logs and check the Gemini key is set correctly
- **Re-set the secret** — `wrangler secret put GEMINI_API_KEY` (can run again to overwrite)
