# My Portfolio Website

## Folder Structure
```
my-portfolio/
├── public/
│   └── index.html     ← Your website (edit this!)
├── server.js          ← Backend (don't touch unless needed)
├── package.json       ← Project info
├── .env.example       ← Rename to .env and add your MongoDB link
└── README.md          ← This file
```

---

## Step 1 — Things to change in index.html
Open `public/index.html` in VS Code and search (Ctrl+F) for these:

- `YourName.dev`     → your name
- `[Your Name]`      → your name  
- `youremail@gmail.com` → your email
- `© 2026 Your Name` → your name
- Update the 3 project cards with your own projects
- Update the skills list with your actual skills
- Update the stats numbers (projects built, years, etc.)

---

## Step 2 — Run it locally (after installing Node.js)

Open Command Prompt inside this folder and run:

```
npm install
npm start
```

Then open browser and go to:  http://localhost:3000

---

## Step 3 — Deploy to Netlify (get a live URL, free)

1. Go to netlify.com → Sign up free
2. Drag and drop the `public` folder onto Netlify
3. You get a live URL instantly!

---

## Step 4 — MongoDB (for the contact form to save messages)

1. Go to mongodb.com/atlas → Sign up free
2. Create a free cluster
3. Get your connection string
4. Rename `.env.example` to `.env`
5. Paste your connection string as MONGO_URI=...
6. Restart the server: npm start
