# 🚀 Fullstack Assignment - Earnest Data Analytics

This is a **production-ready fullstack application** built using **Node.js, Express, Prisma, PostgreSQL, and Next.js 14**, implementing secure authentication and a complete **task management system**.

---

# 📌 Tech Stack

## 🔧 Backend
* **Node.js**
* **Express.js**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL (Neon DB)**
* **JWT**
* **bcrypt**
* **Zod**

## 🎨 Frontend
* **Next.js 14**
* **React 19**
* **TypeScript**
* **Tailwind CSS v4**
* **React Hook Form**
* **Zod**
* **Axios**
* **Lucide React**
* **React Hot Toast**

---

# ⚙️ Project Setup (Step-by-Step)

## 📥 Clone Repository

```bash
git clone https://github.com/shreyashkashyapanand01/EarnestDataAnalytics_FullStack_Assignment-.git
cd EarnestDataAnalytics_FullStack_Assignment-
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
npx prisma generate
```

### Create `backend/.env`

```env
DATABASE_URL=your_neon_db_url
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

### Run Backend

```bash
npm run dev
```

Backend runs at:
```
http://localhost:5000
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
```

### Create `frontend/.env.local`

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
```

### Run Frontend

```bash
npm run dev
```

Frontend runs at:
```
http://localhost:3000
```

---

# 🏗️ Project Architecture (Detailed)

## 🔧 Backend

```plaintext
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts      # Handles HTTP requests (register, login, etc.)
│   │   │   ├── auth.service.ts         # Business logic (DB operations, JWT handling)
│   │   │   ├── auth.routes.ts          # Defines auth API routes
│   │   │   └── auth.validation.ts      # Zod schemas for request validation
│   │   │
│   │   ├── task/
│   │   │   ├── task.controller.ts      # Handles task-related requests
│   │   │   ├── task.service.ts         # Task business logic (CRUD operations)
│   │   │   ├── task.routes.ts          # Task API routes (protected)
│   │   │   └── task.validation.ts      # Zod validation schemas for tasks
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts          # Protects routes using JWT authentication
│   │   ├── validate.middleware.ts      # Validates request body using Zod schemas
│   │   └── error.middleware.ts         # Global error handler
│   │
│   ├── utils/
│   │   ├── asyncHandler.ts             # Async error wrapper
│   │   ├── hash.ts                    # Password hashing (bcrypt)
│   │   ├── jwt.ts                     # JWT handling
│   │   └── response.ts                # Standard API responses
│   │
│   ├── prisma/
│   │   └── client.ts                  # Prisma client instance
│   │
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── .env                              # Backend environment variables
├── prisma.config.ts
├── package.json
```

---

## 🎨 Frontend

```plaintext
frontend/
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── dashboard/page.tsx          # Main protected task dashboard
│   │   ├── login/page.tsx              # User login page
│   │   ├── register/page.tsx           # User registration page
│   │   ├── layout.tsx                  # Global layout (Providers, Toast)
│   │   ├── page.tsx                    # Root redirector
│   │   └── globals.css                 # Global CSS & Tailwind v4 imports
│   │
│   ├── components/                     # Reusable UI Components
│   │   ├── Navbar.tsx                  # Top navigation with user details & logout
│   │   ├── TaskCard.tsx                # Card displaying individual task data
│   │   ├── TaskForm.tsx                # Modal logic for creating/editing tasks
│   │   ├── TaskToolbar.tsx             # Search, Filter dropdown, Add Task button
│   │   ├── Pagination.tsx              # Page number navigation
│   │   └── ConfirmDialog.tsx           # Safety modal for deleting tasks
│   │
│   ├── context/                        # Global State Management
│   │   └── AuthContext.tsx             # Provides global user state & auth methods
│   │
│   ├── lib/                            # API Integration Layer
│   │   ├── apiClient.ts                # Axios instance with auth/refresh interceptors
│   │   ├── auth.ts                     # API calls for login, register, refresh
│   │   └── tasks.ts                    # API calls for Task CRUD operations
│   │
│   └── types/                          # TypeScript Interfaces
│       └── index.ts                    # User, Task, Payload, and API Response types
│
├── .env.local                          # Environment variables
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind configuration
└── package.json                        # Project dependencies
```

---

# 🧠 Architecture Overview

### 🔹 Backend
* Controller Layer → Handles HTTP requests/responses
* Service Layer → Business logic + DB interaction
* Middleware Layer → Auth, validation, error handling
* Utility Layer → Reusable helpers
* Database Layer → Prisma ORM + PostgreSQL

### 🔹 Frontend
* App Router → Routing & page structure
* Component Layer → Reusable UI components
* API Layer → Axios-based communication
* State Layer → AuthContext for global state

---

# 🔄 Fullstack Request Flow

```plaintext
User Action (Frontend)
      ↓
Form Handling
      ↓
Validation (Zod)
      ↓
API Call (Axios)
      ↓
Backend Route
      ↓
Middleware (Auth + Validation)
      ↓
Controller → Service → DB
      ↓
Response → Frontend
      ↓
UI Update
```

---

# 🔐 Authentication System

* JWT Authentication
* Access + Refresh Tokens
* HTTP-only cookies
* Silent refresh (frontend)

---

## 🔑 Token Strategy

| Token         | Purpose     | Storage          |
| ------------- | ----------- | ---------------- |
| Access Token  | API access  | Memory/Header    |
| Refresh Token | Renew token | HTTP-only Cookie |

---

# 📋 Task Management

* CRUD operations
* Pagination
* Filtering
* Search
* Toggle Status

---

# 🔒 Security Features

* bcrypt hashing
* JWT auth
* Protected routes
* In-memory tokens (frontend)

---

# ✅ Validation

* Backend: Zod
* Frontend: React Hook Form + Zod

---

# ⚙️ Error Handling

* Centralized backend error handling
* Clean API responses
* Toast notifications

---

# 📦 API RESPONSE FORMAT

### Success

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 🌐 API ENDPOINTS

## 🔐 AUTH APIs

```
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout

```

## 📋 TASK APIs (Protected 🔐)

### Header

```
Authorization: Bearer <access_token>
```

### Endpoints

* POST   /tasks
* GET    /tasks
* GET    /tasks?page=1&limit=5
* GET    /tasks?status=pending
* GET    /tasks?search=keyword
* GET    /tasks/:id
* PATCH  /tasks/:id
* PATCH  /tasks/:id/toggle
* DELETE /tasks/:id
```

---

# 🚀 Key Highlights


* Clean modular architecture
* Secure authentication system
* Advanced querying (filter, search, pagination)
* Production-level validation
* Scalable codebase

---

# 🎯 Conclusion

Demonstrates strong fullstack skills, clean architecture, and secure system design.

---

# 👨‍💻 Author

Developed as part of a **Fullstack Developer Assignment (Earnest Data Analytics)**.
# 🚀 Fullstack Assignment - Earnest Data Analytics