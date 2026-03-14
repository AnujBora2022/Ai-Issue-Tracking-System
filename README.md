# Projectify — AI-Powered Issue Tracking System

> A full-stack project management tool with AI-generated issue summaries, role-based access, and real-time collaboration built with React, Express, MongoDB, and OpenRouter AI.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [API Documentation](#api-documentation)
- [Design Decisions](#design-decisions)

---

## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- MongoDB installed and running locally
- npm or yarn
- OpenRouter API key (for AI summary feature)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Ai-Issue-Tracking-System.git
cd Ai-Issue-Tracking-System
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder with only this:

```env
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxx
```

> MongoDB connects automatically to `mongodb://127.0.0.1:27017/issueTracker` — no extra config needed, just make sure MongoDB is running locally.

Start the backend:

```bash
npm run dev
```

Server runs at → `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

### 4. Folder Structure

```
Ai-Issue-Tracking-System/
├── client/                        # React frontend
│   └── src/
│       ├── components/
│       │   └── dashboard/
│       │       ├── icons.jsx      # SVG icon components
│       │       ├── styles.js      # Global CSS + helpers
│       │       ├── Topbar.jsx
│       │       ├── Sidebar.jsx
│       │       ├── StatsRow.jsx
│       │       ├── MembersTab.jsx
│       │       ├── IssuesTab.jsx
│       │       ├── CommentsTab.jsx
│       │       └── Modals.jsx
│       ├── pages/
│       │   ├── Signup.jsx
│       │   └── Login.jsx
│       ├── Dashboard.jsx
│       └── App.jsx
└── server/                        # Express backend
    ├── controllers/
    │   ├── authController.js
    │   ├── projectController.js
    │   ├── issueController.js
    │   ├── commentController.js
    │   └── aiController.js
    ├── models/
    │   ├── User.js
    │   ├── Project.js
    │   ├── Issue.js
    │   └── Comment.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── projectRoutes.js
    │   ├── issueRoutes.js
    │   ├── commentRoutes.js
    │   └── aiRoutes.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── config/
    │   └── db.js
    ├── .env                       # Only OPENROUTER_API_KEY
    └── server.js
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| React Router 6 | Client-side routing |
| Axios | HTTP client for API calls |
| Vite | Build tool and dev server |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js 18 | JavaScript runtime |
| Express.js 4 | Web framework |
| MongoDB (local) | NoSQL database |
| Mongoose 8 | MongoDB ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| dotenv | Load OpenRouter API key from .env |
| cors | Cross-origin resource sharing |

### AI / External

| Service | Model | Purpose |
|---------|-------|---------|
| OpenRouter | `openai/gpt-4o` or `mistralai/mistral-7b-instruct:free` | AI issue summarization |

---

## Architecture Overview

### High-Level

```
React SPA  →  REST API (Express)  →  MongoDB (local)
                    ↕
            OpenRouter AI API
```

### Frontend Architecture

All state and CRUD logic lives in `Dashboard.jsx`, which passes data and handlers down as props to focused components:

| Component | Responsibility |
|-----------|---------------|
| `Dashboard.jsx` | Root — all state, API calls, handlers |
| `Topbar.jsx` | Logo and logout button |
| `Sidebar.jsx` | Project list with select and delete |
| `StatsRow.jsx` | Members, open issues, comment count cards |
| `MembersTab.jsx` | Team member grid |
| `IssuesTab.jsx` | Issue list with status update, AI summary, delete |
| `CommentsTab.jsx` | Comment thread with issue switcher and post input |
| `Modals.jsx` | ProjectModal, MemberModal, IssueModal |
| `icons.jsx` | All SVG icon components |
| `styles.js` | Global CSS string + `initials`, `timeAgo`, `DOT_COLORS` helpers |

### Backend Architecture (MVC)

```
Routes → Controllers → Models
              ↑
         authMiddleware (JWT verification)
```

### Authentication Flow

```
Signup  →  bcrypt hash password  →  store in MongoDB
Login   →  verify password  →  generate JWT  →  return to client
Client  →  store JWT in localStorage
Request →  send Authorization: Bearer <token>
Server  →  authMiddleware verifies token  →  attach req.user.id  →  proceed
```

---

## API Documentation

**Base URL:** `http://localhost:5000`

> All protected routes require the header:
> `Authorization: Bearer <token>`

### Auth Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | Public | Register a new user |
| POST | `/auth/login` | Public | Login and receive JWT token |
| POST | `/auth/logout` | Protected | Logout |

### Project Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/projects` | Protected | Create a new project |
| GET | `/projects` | Protected | Get all projects for logged-in user |
| DELETE | `/projects/:id` | Protected | Delete a project (owner only) |
| POST | `/projects/:id/members` | Protected | Add member by email |
| GET | `/projects/:id/issues` | Protected | Get all issues in a project |

### Issue Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/issues` | Protected | Create an issue with multiple assignees |
| GET | `/issues/:projectId` | Protected | Get issues visible to logged-in user |
| PATCH | `/issues/:id` | Protected | Update issue status |
| DELETE | `/issues/:id` | Protected | Delete issue (creator only) |

### Comment Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/comments` | Protected | Post a comment (creator or assigned only) |
| GET | `/comments/:issueId` | Protected | Get all comments for an issue |
| DELETE | `/comments/:id` | Protected | Delete own comment |

### AI Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/ai/summarize` | Protected | Generate AI summary for an issue |

### Sample Request & Response

**POST `/auth/login`**

```json
// Request
{ "email": "user@example.com", "password": "yourpassword" }

// Response
{
  "token": "eyJhbGciOi...",
  "user": { "_id": "...", "name": "Jane", "email": "user@example.com" }
}
```

**POST `/ai/summarize`**

```json
// Request
{ "issueId": "64f3a..." }

// Response
{
  "summary": "The team identified a Safari localStorage bug affecting users in private mode.",
  "actionItems": [
    "Implement sessionStorage fallback",
    "Add try/catch around storage calls",
    "Test on Safari 17.2 private mode"
  ],
  "nextStep": "Merge the fix and deploy to staging for QA testing"
}
```

---

## Design Decisions

### 1. JWT over Sessions
Stateless JWT authentication keeps the backend scalable without needing a Redis session store. Tokens are stored in `localStorage` and sent via the `Authorization` header on every request. The JWT secret is hardcoded as `"secretkey"` for simplicity in this project.

### 2. Local MongoDB — No Atlas
MongoDB runs locally at `mongodb://127.0.0.1:27017/issueTracker`. No cloud setup or connection string is needed — just have MongoDB installed and running before starting the server.

### 3. Minimal .env
Only the `OPENROUTER_API_KEY` is stored in `.env` since it is the only truly secret external credential. MongoDB URI, JWT secret, and port are hardcoded directly in the codebase for simplicity in a local development environment.

### 4. Role-Based Issue Visibility
Issues are filtered per user using a MongoDB `$or` query — a user only sees issues they **created** or were **assigned to**. This prevents information leakage between project members.

### 5. Multiple Assignees per Issue
`assignedTo` on the Issue model is an **array** of ObjectIds rather than a single reference. This allows multiple team members to collaborate on one issue and comment on it, producing richer AI summaries with diverse perspectives.

### 6. Comment Permissions
Only the issue **creator** or **assigned users** can comment. This is enforced on the backend before creating a comment, preventing unauthorised users from cluttering issue threads.

### 7. AI Summary via OpenRouter
AI summarization is handled entirely on the **backend** via the OpenRouter API, keeping the API key secure and never exposing it to the client. The prompt includes issue metadata and all comments with author names so the model generates contextual, user-attributed summaries.

### 8. Component Splitting
The Dashboard was split into 9 focused components to improve readability and maintainability. All state and CRUD logic stays in `Dashboard.jsx` and is passed down as props — keeping the architecture flat and easy to debug.

### 9. Parallel Data Fetching
When a project is selected, the app fires parallel requests using `Promise.all` to fetch members and issues simultaneously, then fetches all comments in parallel across issues. This minimises loading time compared to sequential awaits.

### 10. Dark Glassmorphism UI
The UI uses a dark theme with CSS custom properties for consistent theming. The **Syne** and **DM Sans** font pairing gives the interface a modern developer-tool aesthetic. All CSS is embedded as a template literal to avoid the need for external stylesheets or CSS modules.

---

> Built with React, Express, MongoDB & OpenRouter AI