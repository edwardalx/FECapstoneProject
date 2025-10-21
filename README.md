# Ì≥ö Bookshelf App (FECapstoneProject)

A full-stack Bookshelf application with a React frontend and a .NET backend. Manages books in a tile-based UI, supports pagination, and includes foundations for authentication, authorization, and user history.

---

## Summary (today)
- Consolidated project status and next steps.
- Documented completed features (frontend & backend).
- Added concise setup/run instructions for both repos.
- Listed remaining backlog, enhancements, and infrastructure tasks.

---

## ‚úÖ Completed Features
- Authentication & Authorization
  - JWT login, token storage, protected routes, admin-only actions, user profile.
- Book Management
  - Tile-based responsive book grid, details view, pagination (Next/Previous), search.
- UI/UX & State
  - Responsive design (Tailwind planned), toast notifications, loading/error states.
  - Centralized client state (Zustand), API helper/service layer.
- Dev setup
  - FE/BE decoupled, API proxy configured, VS Code C# environment prepared.

---

## ‚úÖ Setup Instructions (run both repos locally)

Prerequisites
- Windows: Node 16+ & npm, .NET 6+ SDK, SQL Server or LocalDB, Git.

Backend (.NET)
1. Clone backend repo:
   git clone <backend-repo-url>
2. Open folder:
   cd book-shelf-backend
3. Configure connection & JWT in appsettings.json:
   - ConnectionStrings: DefaultConnection
   - JwtSettings: SecretKey
4. Restore, apply migrations, run:
   dotnet restore
   dotnet ef database update
   dotnet watch run
5. Default API URL (example): http://localhost:5093

Frontend (React)
1. Clone frontend repo (or use this folder):
   git clone <frontend-repo-url>
2. Open folder:
   cd book-shelf-frontend
3. Create .env (example):
   VITE_API_URL=http://localhost:5093
4. Install and run:
   npm install
   npm run dev
5. App URL (example): http://localhost:5173

Run order: start backend first, then frontend. Verify .env points to backend URL.

---

## Ì≥ã To Do / Roadmap (concise)
- Backend: Payments (Paystack), purchase & read history, reviews/ratings, richer book metadata.
- Frontend: Registration, admin UI gating, dark mode, filters, user dashboard, validations.
- Infra: CI/CD, production deploy, logging/monitoring, caching, unit tests.

---

## Ìª†Ô∏è Tech Stack (short)
- Frontend: React (Vite), TailwindCSS (planned), Zustand, React Router, React Toastify.
- Backend: .NET 6, Entity Framework Core, SQL Server, JWT auth.
- Deployment: Netlify/Vercel (FE), Azure/Render (BE) ‚Äî planned.

---

## Quick Commands
- Frontend dev: npm run dev
- Frontend build: npm run build
- Backend dev: dotnet watch run
- Apply migrations: dotnet ef database update

---

## License
MIT

