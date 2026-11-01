# VARIKUNTLA NAGAMOUNIKA — Personal Portfolio

A modern, elegant, light pastel personal portfolio website built with **React.js**, **Vite**, **Tailwind CSS**, and **Framer Motion**, powered by **Web3Forms** for zero-database contact delivery and an optional **Express.js REST API** backend.

- **GitHub Repository**: [https://github.com/231fa07011/Portfolio](https://github.com/231fa07011/Portfolio)
- **Live Vercel Frontend**: Automatic deployment via GitHub

---

## 🎨 Visual Design & Color System

- **Background**: Warm White `#FCFBFF`
- **Soft Lavender**: `#EDE7FF`
- **Powder Blue**: `#E5F2FF`
- **Blush Pink**: `#FFF0F4`
- **Mint Green**: `#E8F8F0`
- **Pale Peach**: `#FFF1E5`
- **Primary Text**: Deep Navy `#26324A`
- **Secondary Text**: Soft Gray `#707789`
- **Accent**: Muted Purple `#9180D8`

---

## 🚀 Key Features

1. **Light Pastel Minimalist Theme**: Generous whitespace, rounded cards (`rounded-2xl` & `rounded-3xl`), soft shadows, and clean typography.
2. **Authentic Certificate Gallery**: Displays verified certificate images for:
   - *Software Testing* (NPTEL — IIT Madras / IIIT Bangalore)
   - *Online Communication in the Digital Age* (NPTEL — IIT Roorkee)
   - *Deep Learning* (NPTEL — IIT Ropar)
   - *Generative AI Workshop* (IIT Hyderabad / IncuXai)
   - *Cambridge English — Preliminary (PET)*
3. **Verified Internship Documents**: Displays official Rinex Technologies Web Development Internship certificate and Course certificate with interactive full-screen Lightbox Modal and download capabilities.
4. **Web3Forms Direct Email Delivery**:
   - Zero-database architecture: contact messages are transmitted directly to your email via Web3Forms.
   - Built-in honeypot bot-check spam protection.
   - Validates name, email, and message format.
   - Clear loading, success, and error notification banners.
5. **Interactive Project Spotlight**: Carousel showcasing academic and full-stack projects with live inspection modals.
6. **Framer Motion Slide Transitions**: Smooth entrance animations (`x: -40`) with full reduced-motion accessibility support.
7. **Scroll Progress & Active Navigation**: Fixed header with scroll progress bar and active section tracking.

---

## 🛠️ Project Structure

```text
Portfolio/
├── vercel.json                 # Vercel deployment configuration (root)
├── package.json                # Root package with concurrently & build script
├── .gitignore                  # Ignores .env, node_modules, and dist
├── .env.example                # Example environment variables
├── frontend/                   # React + Vite application
│   ├── public/
│   │   ├── profile.png         # Profile portrait
│   │   ├── resume.pdf          # Resume document
│   │   ├── images/
│   │   │   ├── certificates/   # Genuine academic certificates
│   │   │   └── internships/    # Rinex internship documents
│   │   └── vercel.json         # SPA rewrite rules
│   ├── src/
│   │   ├── components/         # Hero, About, Education, Skills, Experience,
│   │   │                       # Projects, Certifications, Achievements, Contact, Footer
│   │   ├── services/api.js     # Web3Forms and Express API integration
│   │   ├── data/               # Fallback portfolio data
│   │   ├── App.jsx             # Main layout
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind CSS & Pastel Theme
│   ├── .env.example            # Frontend environment variable guide
│   └── package.json            # Frontend dependencies
└── backend/                    # Optional Node/Express REST API (Zero Database)
    ├── data/portfolio.json     # Flat-file JSON portfolio data
    ├── routes/                 # REST endpoints (/portfolio, /projects, /health)
    ├── server.js               # Express server
    └── package.json            # Backend dependencies
```

---

## 💻 Local Development

### 1. Prerequisites
- **Node.js** v18+ installed
- **Git** installed

### 2. Install Dependencies
From the repository root:
```bash
# Install root dependencies
npm install

# Install both backend and frontend dependencies
npm run install:all
```

### 3. Setup Environment Variables
Create `frontend/.env`:
```env
VITE_WEB3FORMS_ACCESS_KEY=YOUR_WEB3FORMS_ACCESS_KEY
VITE_API_URL=http://localhost:5000/api
```
*(Get a free Web3Forms access key at [https://web3forms.com](https://web3forms.com) — delivered instantly to your email.)*

### 4. Run Locally
```bash
# Run both frontend and backend concurrently:
npm run dev

# Or run frontend only:
npm run client
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## ☁️ Deploying Frontend to Vercel via GitHub

### Step 1: Push Project to GitHub
```bash
git add .
git commit -m "Configure Web3Forms, Vercel deployment, and updated portfolio assets"
git push origin main
```

### Step 2: Import into Vercel
1. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Locate your repository **`231fa07011/Portfolio`** and click **"Import"**.

### Step 3: Configure Project Settings
- **Framework Preset**: `Vite` (automatically detected)
- **Root Directory**: Leave as `./` (or select `frontend` if deploying frontend alone)
- **Build Command**: `npm run build`
- **Output Directory**: `frontend/dist` (or `dist` if Root Directory is `frontend`)

### Step 4: Add Environment Variables in Vercel
In the **Environment Variables** section on Vercel:
- **Key**: `VITE_WEB3FORMS_ACCESS_KEY`
- **Value**: Your actual Web3Forms access key (from [web3forms.com](https://web3forms.com))
- Click **"Add"**.

> ⚠️ **Important Security Note on `VITE_` Variables**:
> Variables prefixed with `VITE_` are embedded into the client-side JavaScript bundle during the build. This is required and safe for public API keys like Web3Forms, which are designed to be called from the browser. Never store private server secrets (such as database passwords or private API keys) in `VITE_` variables.

### Step 5: Deploy
Click **"Deploy"**. Vercel will build your project in ~30 seconds and provide a production URL (e.g. `https://portfolio-xxxx.vercel.app`).

### Automatic Deployments
Whenever you push new commits to `main`:
```bash
git push origin main
```
Vercel automatically triggers a new production build and redeploys your updated site within seconds.

> 💡 **Note on Changing Environment Variables**:
> If you add or change `VITE_WEB3FORMS_ACCESS_KEY` in Vercel Project Settings later, go to the **Deployments** tab, click the three dots on the latest deployment, and select **"Redeploy"** so the new variable is baked into the build.

---

## ⚙️ Optional Backend Deployment (Render / Railway)

The Express backend runs with **zero database** (data is loaded from JSON flat files). If you wish to host the API live:
1. Create a free Web Service on [Render](https://render.com) or [Railway](https://railway.app).
2. Connect `https://github.com/231fa07011/Portfolio`.
3. Set **Root Directory**: `backend`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start`
6. Add the deployed backend URL to Vercel's `VITE_API_URL` environment variable:
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
*(Even without a backend running, the frontend gracefully falls back to its bundled data so the site remains 100% functional!)*

---

## 📄 License
MIT © 2026 Varikuntla Nagamounika
