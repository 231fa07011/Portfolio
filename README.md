# Varikuntla Nagamounika - Full-Stack Personal Portfolio

A decoupled, high-performance personal portfolio website built with a **React.js (Vite)** frontend and an **Express.js REST API** backend — engineered **with zero database dependencies**.

---

## 🌟 Key Features

- **Decoupled Architecture**: Independent frontend and backend communicating via RESTful HTTP endpoints.
- **Zero Database Requirement**: Portfolio data is stored in high-performance structured JSON flat-file cache on the backend. No MongoDB, MySQL, PostgreSQL, or Firebase required.
- **Soft Pastel Visual Aesthetics**: Light lavender (`#ede9fe`), sky blue (`#e0f2fe`), crisp white card styling, glowing border rings, and glassmorphic card hover effects.
- **Framer Motion Slide Animations**: Smooth left-to-right entrance animations (`initial={{ opacity: 0, x: -50 }}`).
- **Interactive Project Slideshow**: Featured project carousel with interactive modal walkthrough, live tags, and direct repository links.
- **Graceful Offline Degradation**: The frontend includes a bundled local cache. If the backend is ever sleeping or offline, the portfolio remains fully interactive, while displaying a live connection status pill and retry option.
- **Zero-DB Contact Form & Validation**: Sanitizes and validates user input (name, email, message) on both client and server. Explicitly clarifies to visitors that messages are processed in-memory with zero persistent database storage, and includes optional Nodemailer email delivery.

---

## 🏗️ Project Architecture

```text
Portfolio/
├── frontend/                     # React.js SPA (Vite + Tailwind CSS + Framer Motion)
│   ├── public/
│   │   ├── images/              # Project diagrams & graphics (SVG)
│   │   ├── profile.png          # High-resolution profile picture
│   │   └── resume.pdf           # Varikuntla Nagamounika's resume
│   ├── src/
│   │   ├── components/          # Navbar, Hero, About, Skills, Experience, Projects, etc.
│   │   ├── data/                # Fallback offline portfolio data
│   │   ├── services/            # Axios API client (checkHealth, fetchPortfolio, submitContact)
│   │   ├── App.jsx              # Main App root component
│   │   ├── main.jsx             # React DOM entry point
│   │   └── index.css            # Tailwind CSS v4 & custom glassmorphism styles
│   ├── .env.example             # Frontend environment template
│   ├── vercel.json              # SPA routing rewrite for Vercel
│   ├── vite.config.js           # Vite configuration with Tailwind CSS plugin
│   └── package.json
├── backend/                      # Node.js + Express REST API Server
│   ├── data/
│   │   └── portfolio.json       # Structured portfolio entities (No Database)
│   ├── routes/
│   │   ├── portfolio.js         # GET /api/portfolio
│   │   ├── projects.js          # GET /api/projects & /api/projects/:id
│   │   └── contact.js           # POST /api/contact (Validation & Rate Limiting)
│   ├── server.js                # Express entry point, CORS & Security middleware
│   ├── .env.example             # Backend environment template
│   └── package.json
├── .gitignore                    # Git ignore file for node_modules, .env, and dist
├── package.json                  # Root monorepo orchestrator (concurrently)
└── README.md                     # Comprehensive documentation
```

---

## 📡 REST API Reference

The backend runs by default at `http://localhost:5000`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and available endpoints summary |
| `GET` | `/api/health` | Server health check (uptime, environment, database: `false`) |
| `GET` | `/api/portfolio` | Full portfolio payload (education, skills, experience, projects, etc.) |
| `GET` | `/api/projects` | Project directory (supports `?featured=true`, `?category=...`, `?search=...`) |
| `GET` | `/api/projects/:id` | Single project record by ID |
| `POST` | `/api/contact` | In-memory contact submission validation & optional email forwarding |

### Contact Form Validation Rules:
- **`name`**: Required, string, 2 – 100 characters.
- **`email`**: Required, valid email format regex, max 120 characters.
- **`message`**: Required, min 10 characters, max 3000 characters.
- **Rate Limit**: Max 5 requests per 15 minutes per IP address.
- **Database Storage**: None. Form responses explicitly inform the client that no database is utilized.

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or later (Tested with Node v24)
- **npm**: v9.0.0 or later

### 1. Install All Dependencies
From the root directory:
```bash
npm run install:all
```
*(Or install manually: `cd backend && npm install`, then `cd ../frontend && npm install`)*

### 2. Configure Environment Files

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Optional: Nodemailer SMTP (Leave commented if no email delivery is desired)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# CONTACT_EMAIL=nagamounika624@gmail.com
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Frontend & Backend Concurrently
From the root directory:
```bash
npm run dev
```

This starts:
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

You can also run them separately in two terminal windows:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 🌐 Deployment Instructions

### A. Push Code to GitHub

1. Initialize git in the root folder:
   ```bash
   git init
   git add .
   git commit -m "feat: complete fullstack portfolio without database"
   ```
2. Create a new repository on [GitHub](https://github.com/new) (e.g. `nagamounika-portfolio`).
3. Link and push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/nagamounika-portfolio.git
   git branch -M main
   git push -u origin main
   ```

---

### B. Deploying the Backend (Express on Render / Railway)

Because the backend is a Node.js Express server, it should be deployed to a Node.js hosting platform such as **Render** (free web service tier) or **Railway**.

#### Deploying on Render:
1. Sign in to [Render.com](https://render.com) and click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. In **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (or leave default assigned by Render)
   - `CLIENT_URL` = `https://<your-vercel-app-name>.vercel.app`
5. Click **Create Web Service**.
6. Render will generate a URL like: `https://portfolio-backend.onrender.com`.
7. Verify by opening `https://portfolio-backend.onrender.com/api/health` in your browser.

---

### C. Deploying the Frontend to Vercel

1. Sign in to [Vercel](https://vercel.com) and click **Add New...** -> **Project**.
2. Select your GitHub repository (`nagamounika-portfolio`).
3. In **Project Configuration**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and choose `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://portfolio-backend.onrender.com/api` (use the backend URL from Step B)
5. Click **Deploy**.
6. Vercel will build and deploy your React frontend at `https://<your-project>.vercel.app`.

---

### D. Production Verification Checklist

1. **Verify Backend**: Open `https://<backend-url>/api/health` — should return:
   ```json
   { "status": "ok", "service": "portfolio-backend", "database": false }
   ```
2. **Verify Frontend**: Open your deployed Vercel URL.
   - Look at the top navigation bar: it should display `● API Online`.
   - Scroll down to the **Contact** section and submit a test inquiry.
   - You should receive an instant green confirmation message verifying the payload was validated by the live backend.
3. **Verify CORS**: Open browser DevTools (F12) -> Console. Ensure there are no CORS errors. If a CORS warning appears, ensure `CLIENT_URL` on the backend matches your Vercel domain exactly.

---

## 👤 Author

**Varikuntla Nagamounika**
- Degree: B.Tech in Information Technology (2023 – 2027)
- Institution: Vignan's Foundation for Science, Technology & Research, Guntur, AP
- Email: [nagamounika624@gmail.com](mailto:nagamounika624@gmail.com)
- Location: Ongole, Andhra Pradesh, India

#   P o r t f o l i o  
 