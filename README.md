# QuickHire — Job Portal Web Application

A full-stack job portal platform where job seekers can browse and apply for jobs, and admins can manage job listings. Built with **React**, **Express.js**, and **MongoDB Atlas**.

---

## 🌐 Live Demo

| Service  | URL |
|----------|-----|
| **Frontend (Vercel)** | [https://quick-job-eight.vercel.app](https://quick-job-eight.vercel.app) |
| **Backend API (Render)** | [https://quickjob-backend-tc2a.onrender.com](https://quickjob-backend-tc2a.onrender.com) |
| **Frontend Repo** | [github.com/majedul0/QuickJob](https://github.com/majedul0/QuickJob) |
| **Backend Repo** | [github.com/majedul0/QuickJob-backend-](https://github.com/majedul0/QuickJob-backend-) |

> **Note:** The Render free tier puts the server to sleep after 15 minutes of inactivity. The first request may take 30–60 seconds to respond while the server wakes up.

---

## ✨ Features

### User-Facing
- **Job Browsing** — Browse all available jobs with search, category, and location filters
- **Job Details** — View detailed job descriptions, responsibilities, and requirements
- **User Signup & Login** — Secure authentication with JWT tokens and bcrypt password hashing
- **Profile Display** — Logged-in users see their name and avatar in the navbar with a dropdown menu
- **Job Application** — Submit applications with name, email, resume link, and cover note
- **Responsive Design** — Fully responsive UI that works on desktop, tablet, and mobile

### Admin
- **Admin Login** — Separate admin authentication
- **Create Jobs** — Post new job listings with full details
- **Delete Jobs** — Remove job listings
- **View Applications** — See all submitted applications

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 19 | UI Framework |
| React Router v7 | Client-side routing |
| Vite 7 | Build tool & dev server |
| Lucide React | Icon library |
| CSS (BEM convention) | Styling |
| Context API | State management (Auth & Jobs) |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express v5 | API framework |
| MongoDB Atlas | Cloud database |
| Mongoose v9 | MongoDB ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| express-validator | Input validation |
| cors | Cross-origin resource sharing |
| dotenv | Environment variables |

### Deployment
| Platform | Service |
|----------|---------|
| Vercel | Frontend hosting (CDN) |
| Render | Backend API hosting |
| MongoDB Atlas | Database (cloud) |

---

## 📁 Project Structure

### Frontend (`client/`)

```
client/
├── public/                     # Static assets (logo, images)
├── src/
│   ├── assets/                 # App assets
│   ├── components/
│   │   ├── jobs/
│   │   │   ├── JobCard.jsx     # Individual job listing card
│   │   │   ├── JobFilters.jsx  # Category, location & type filters
│   │   │   └── SearchBar.jsx   # Search input component
│   │   ├── layout/
│   │   │   ├── Footer.jsx      # Site footer
│   │   │   ├── Layout.jsx      # Main layout wrapper with Outlet
│   │   │   └── Navbar.jsx      # Navigation bar with auth state
│   │   └── ui/
│   │       ├── Badge/          # Reusable badge component
│   │       ├── Button/         # Reusable button component
│   │       ├── Input/          # Reusable input component
│   │       ├── Select/         # Reusable select component
│   │       ├── Textarea/       # Reusable textarea component
│   │       └── index.js        # UI component barrel exports
│   ├── context/
│   │   ├── AuthContext.jsx     # Authentication state & API calls
│   │   └── JobContext.jsx      # Job listings state management
│   ├── data/
│   │   └── jobs.js             # Static job data (fallback/seed)
│   ├── pages/
│   │   ├── AdminLoginPage/     # Admin login page
│   │   ├── AdminPage/          # Admin dashboard (create/delete jobs)
│   │   ├── HomePage/           # Landing page with job listings
│   │   ├── JobDetailPage/      # Single job detail view
│   │   ├── LoginPage/          # User login page
│   │   └── SignupPage/         # User registration page
│   ├── App.jsx                 # Root component with routes
│   ├── App.css                 # Global app styles
│   ├── index.css               # CSS reset & variables
│   └── main.jsx                # React entry point
├── vercel.json                 # Vercel SPA routing config
├── vite.config.js              # Vite configuration
└── package.json
```

### Backend (`server/`)

```
server/
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── authController.js   # Signup, login, getMe handlers
│   │   ├── jobController.js    # CRUD operations for jobs
│   │   └── applicationController.js  # Application submission handler
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── errorHandler.js     # Validation & global error handler
│   ├── models/
│   │   ├── User.js             # User schema (name, email, password, role)
│   │   ├── Job.js              # Job schema (title, company, location, etc.)
│   │   └── Application.js      # Application schema (job_id, name, email, etc.)
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints with validation
│   │   ├── jobRoutes.js        # Job CRUD endpoints
│   │   └── applicationRoutes.js # Application endpoints
│   ├── validators/
│   │   └── index.js            # Express-validator rules
│   └── index.js                # Express app entry point
├── .env                        # Environment variables (not in repo)
├── .gitignore
└── package.json
```

---

## 🔌 API Endpoints

**Base URL:** `https://quickjob-backend-tc2a.onrender.com`

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/signup` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login & receive JWT token | Public |
| `GET` | `/api/auth/me` | Get current user profile | Bearer Token |

**Signup Request Body:**
```json
{
  "firstName": "Majedul",
  "lastName": "Islam",
  "email": "user@example.com",
  "password": "mypassword",
  "role": "jobseeker"
}
```

**Login Request Body:**
```json
{
  "email": "user@example.com",
  "password": "mypassword"
}
```

**Auth Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "firstName": "Majedul",
    "lastName": "Islam",
    "email": "user@example.com",
    "role": "jobseeker",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Jobs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/jobs` | List all jobs | Public |
| `GET` | `/api/jobs/:id` | Get single job details | Public |
| `POST` | `/api/jobs` | Create a new job | Admin |
| `DELETE` | `/api/jobs/:id` | Delete a job | Admin |

**Query Parameters for `GET /api/jobs`:**
- `?search=developer` — Search in title, company, description
- `?category=Technology` — Filter by category
- `?location=New York` — Filter by location

### Applications

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/applications` | Submit a job application | Public |
| `GET` | `/api/applications` | List all applications | Admin |

**Query Parameters for `GET /api/applications`:**
- `?job_id=<id>` — Filter applications by job

---

## 📦 Database Models

### User
```json
{
  "firstName": "Majedul",
  "lastName": "Islam",
  "email": "user@example.com",
  "password": "$2a$10$...(hashed)",
  "role": "jobseeker | employer",
  "created_at": "2026-02-28T..."
}
```

### Job
```json
{
  "title": "Frontend Developer",
  "company": "QuickHire",
  "location": "New York, USA",
  "category": "Technology",
  "description": "We are looking for...",
  "created_at": "2026-02-28T..."
}
```

### Application
```json
{
  "job_id": "ObjectId(ref: Job)",
  "name": "Majedul Islam",
  "email": "user@example.com",
  "resume_link": "https://drive.google.com/...",
  "cover_note": "I am excited to apply...",
  "created_at": "2026-02-28T..."
}
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js** v18+
- **npm** v9+
- **MongoDB Atlas** account (or local MongoDB)

### 1. Clone the repositories

```bash
# Frontend
git clone https://github.com/majedul0/QuickJob.git
cd QuickJob

# Backend (in a separate terminal)
git clone https://github.com/majedul0/QuickJob-backend-.git
```

### 2. Setup Backend

```bash
cd QuickJob-backend-

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
EOF

# Start development server
npm run dev
```

The API will be running at `http://localhost:5000`

### 3. Setup Frontend

```bash
cd QuickJob

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`

> During local development, the `.env.development` file sets `VITE_API_URL=http://localhost:5000/api` to connect to the local backend.

---

## 🌍 Deployment Guide

### Backend → Render

1. Push the server code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect the GitHub repo
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
5. Add environment variables:
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `JWT_SECRET` — Secret key for JWT tokens
   - `NODE_ENV` — `production`

### Frontend → Vercel

1. Push the client code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import the GitHub repo
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variable:
   - `VITE_API_URL` — `https://your-render-app.onrender.com/api`

---

## 🔐 Validation

All API endpoints include comprehensive input validation:

- **Required fields** — All mandatory fields are validated
- **Email format** — Must be a properly formatted email address
- **Password strength** — Minimum 6 characters
- **URL format** — Resume links must be valid URLs (http/https)
- **Data length limits** — Character limits on all text fields
- **Duplicate check** — Email uniqueness enforced during signup
- **MongoDB ObjectId** — Job ID format validated in applications

---

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with featured jobs, search & filters |
| `/jobs/:id` | Job Detail | Full job details with apply option |
| `/login` | Login | User authentication |
| `/signup` | Signup | User registration (Job Seeker / Employer roles) |
| `/admin/login` | Admin Login | Admin authentication |
| `/admin` | Admin Dashboard | Create/delete jobs, view applications |

---

## 📸 Screenshots

### Home Page
The landing page features a hero section, category explorer, and featured job listings with search and filter capabilities.

### Login / Signup
Clean authentication forms with client-side and server-side validation, password visibility toggle, and role selection (Job Seeker / Employer).
### Admin user&pass
  admin@gmail.com 
  admin

### Navbar (Logged In)
When authenticated, the navbar displays the user's avatar (initials), full name, and a dropdown menu with profile info and logout option.

### Job Detail
Detailed view of each job listing including description, responsibilities, requirements, and an apply section.

---

## 👤 Author

**Majedul Islam**
- GitHub: [@majedul0](https://github.com/majedul0)

---

## 📄 License

This project is licensed under the ISC License.
