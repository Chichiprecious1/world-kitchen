# 🌍 World Kitchen — Build & Deploy Guide
### Your step-by-step reference for this project and every future one

---

## 📁 PART 1 — Understanding the Folder Structure

This is how your project is organized and WHY:

```
world-kitchen/
│
├── netlify/
│   └── functions/
│       └── generate.js     ← The SECRET file. API key lives here.
│                             Netlify runs this on their server,
│                             NOT in the browser. Users can't see it.
│
├── src/                    ← All YOUR code lives here
│   ├── css/
│   │   └── style.css       ← All your styles in one place
│   │
│   └── js/
│       ├── api.js          ← ONLY handles talking to the server
│       ├── filters.js      ← ONLY handles the pill/filter buttons
│       ├── render.js       ← ONLY handles drawing things on screen
│       └── app.js          ← The boss file. Connects everything.
│
├── index.html              ← Your main page (just structure, no logic)
├── .env                    ← Your secret keys (NEVER goes to GitHub)
├── .gitignore              ← Tells Git what to ignore (like .env)
└── netlify.toml            ← Tells Netlify how to run your site
```

### 🧠 The Rule to Remember:
> **One file = one job.**
> `api.js` only talks to the API.
> `filters.js` only handles filters.
> `render.js` only draws on screen.
> `app.js` connects them all.

This is called **Separation of Concerns** — and it's what makes
senior developers' code readable and easy to fix.

---

## 🔧 PART 2 — Setting Up Your Computer (One-Time Setup)

### Step 1: Install VS Code
- Go to https://code.visualstudio.com
- Download for your OS, install it
- Open it

### Step 2: Install Node.js
- Go to https://nodejs.org
- Download the **LTS version** (the green button)
- Install it

### Step 3: Check it worked
Open VS Code → press `` Ctrl+` `` (backtick) to open the terminal.
Type these and press Enter after each:
```
node --version
```
You should see something like `v20.11.0`. If you do, you're good!

### Step 4: Install Netlify CLI
In the terminal, type:
```
npm install -g netlify-cli
```
This lets you test your site locally before deploying.

---

## 📂 PART 3 — Creating the Project

### Step 1: Open the world-kitchen folder in VS Code
- In VS Code: File → Open Folder → select `world-kitchen`

### Step 2: Create the .env file
In VS Code, click the new file icon and name it `.env`
Add this line (you'll fill in the real key in Part 5):
```
ANTHROPIC_API_KEY=your_key_will_go_here
```

### Step 3: Create the .gitignore file
Create a file named `.gitignore` and paste:
```
.env
node_modules/
.netlify/
```
This stops Git from ever uploading your secret key to GitHub. 🔒

### Step 4: Initialize npm
In the terminal:
```
npm init -y
```
This creates a `package.json` file — think of it as your project's ID card.

### Step 5: Install dependencies
```
npm install @netlify/functions
```

---

## 🔑 PART 4 — Getting Your Anthropic API Key

1. Go to **https://console.anthropic.com**
2. Sign up or log in
3. Click **"API Keys"** in the left sidebar
4. Click **"Create Key"**
5. Give it a name like `world-kitchen`
6. **COPY IT IMMEDIATELY** — you only see it once!
7. Paste it in your `.env` file:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxx
   ```

### 🚨 Rules about API Keys:
- NEVER paste it in index.html or any .js file in /src/
- NEVER commit it to GitHub
- ONLY put it in .env (locally) and Netlify's environment variables (online)
- It's like a password — if someone gets it, they can spend your money

---

## ⚡ PART 5 — Understanding Netlify Functions (THE KEY CONCEPT)

### The Problem:
If you put your API key in your HTML/JS files:
```javascript
// ❌ WRONG — anyone can open DevTools and steal this
const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: { 'x-api-key': 'sk-ant-MYSECRETKEY' }  // visible to everyone!
})
```

### The Solution — A Netlify Function:
Your browser calls YOUR server function → YOUR function calls Anthropic.
The user never sees the API key.

```
User's Browser  →  /api/generate (your Netlify Function)  →  Anthropic API
                   (API key is HERE, hidden on the server)
```

### How it works in code:
In your frontend (`src/js/api.js`), you call:
```javascript
// ✅ RIGHT — calling YOUR function, not Anthropic directly
fetch('/api/generate', { method: 'POST', body: yourData })
```

In `netlify/functions/generate.js`, Netlify runs this secretly:
```javascript
// This runs on NETLIFY'S SERVER, not in the browser
const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY }  // hidden!
})
```

---

## 🚀 PART 6 — Pushing to GitHub

### First time only:
```bash
git init
git add .
git commit -m "initial commit: world kitchen app"
git branch -M main
git remote add origin https://github.com/Chichiprecious1/world-kitchen.git
git push -u origin main
```

### Every time you make changes:
```bash
git add .
git commit -m "describe what you changed"
git push
```

### Good commit message examples:
- `"add tribal filter feature"`
- `"fix protein pills not selecting"`
- `"update styles for mobile"`

---

## 🌐 PART 7 — Deploying to Netlify

### Step 1: Connect your repo
1. Go to **https://netlify.com** → Log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your `world-kitchen` repo
5. Leave build settings as default
6. Click **"Deploy site"**

### Step 2: Add your API Key to Netlify
This is how Netlify knows your key without it being in your code:
1. In Netlify: **Site Settings → Environment Variables**
2. Click **"Add a variable"**
3. Key: `ANTHROPIC_API_KEY`
4. Value: `sk-ant-api03-your-actual-key`
5. Click **Save**
6. **Trigger a new deploy** (Deploys → Trigger deploy)

### Step 3: Your site is live! 🎉
Netlify gives you a URL like `world-kitchen-abc123.netlify.app`
You can buy a custom domain later from Namecheap (~$12/year).

---

## 💳 PART 8 — Stripe Monetization (Future Step)

### The plan:
- **Free tier:** 3 meal generations
- **Pro:** $5/month for unlimited

### How to set it up:
1. Sign up at **https://stripe.com**
2. Create a product: "World Kitchen Pro" at $5/month
3. Get your Stripe publishable key (goes in frontend) and secret key (goes in .env)
4. Add a second Netlify Function: `netlify/functions/checkout.js`
5. Track free uses in `localStorage` (browser storage)

### The freemium logic (in your app.js):
```javascript
const FREE_LIMIT = 3;
let usageCount = parseInt(localStorage.getItem('wk_uses') || '0');

function canGenerate() {
  if (usageCount < FREE_LIMIT) return true;
  if (localStorage.getItem('wk_pro') === 'true') return true;
  return false; // show paywall
}

function trackUsage() {
  usageCount++;
  localStorage.setItem('wk_uses', usageCount);
}
```

---

## 🧠 PART 9 — Learning More (Your Roadmap)

Now that you're building real apps, here's what to learn next:

| Skill | Why | Where to learn |
|-------|-----|----------------|
| JavaScript fundamentals | Everything runs on this | javascript.info (free, best resource) |
| CSS Flexbox & Grid | Layout control | flexboxfroggy.com (game!) |
| Fetch API | How JS talks to servers | MDN Web Docs |
| Git & GitHub | Version control | learngitbranching.js.org |
| React (next level) | Component-based apps | react.dev/learn |
| Node.js basics | For backend functions | nodejs.org/en/learn |

### 💡 The secret to learning fast:
Build something. Break it. Fix it. Repeat.
Every project you build teaches you more than any course.

---

*Built with 💛 for ChiChi's World Kitchen — Around the World Series*
