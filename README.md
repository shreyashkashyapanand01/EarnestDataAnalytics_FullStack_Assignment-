# 🚀 Fullstack Assignment - Earnest Data Analytics

A **production-ready fullstack application** built using modern technologies, implementing **secure authentication**, **scalable architecture**, and a complete **task management system**.

---

# 📌 Tech Stack

## 🔹 Backend

* Node.js (Runtime)
* Express.js (Framework)
* TypeScript
* Prisma ORM (v7 with Adapter)
* PostgreSQL (Neon Cloud DB)
* JWT (Authentication)
* bcrypt (Password Hashing)
* Zod (Validation)
* Cookie Parser
* ts-node-dev

## 🔹 Frontend

* Next.js 14 (App Router)
* React 19
* TypeScript
* Tailwind CSS v4
* React Hook Form
* Zod
* Axios (with interceptors)
* Lucide React
* React Hot Toast

---

# 🏗️ Project Architecture (Detailed)

## 🔹 Backend

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

## 🔹 Frontend

```plaintext
frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskToolbar.tsx
│   │   ├── Pagination.tsx
│   │   └── ConfirmDialog.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── lib/
│   │   ├── apiClient.ts
│   │   ├── auth.ts
│   │   └── tasks.ts
│   │
│   └── types/
│       └── index.ts
│
├── .env.local                        # Frontend environment variables
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

# 🧠 Architecture Explanation

## 🔹 Backend (Layered Architecture)

* **Controller Layer** → Handles HTTP requests/responses
* **Service Layer** → Business logic + DB interaction
* **Middleware Layer** → Auth, validation, error handling
* **Utility Layer** → Reusable helpers
* **Database Layer** → Prisma ORM + PostgreSQL

---

## 🔹 Frontend (Component Architecture)

* **App Router** → Routing & page structure
* **Component Layer** → Reusable UI components
* **API Layer** → Axios-based communication
* **State Layer** → AuthContext for global state

---

# 🔄 Request Flow

```plaintext
Client Request
      ↓
Route
      ↓
Validation Middleware (Zod)
      ↓
Auth Middleware (JWT)
      ↓
Controller
      ↓
Service Layer
      ↓
Prisma ORM
      ↓
Database
      ↓
Response → Client
```

---

# 🔐 Authentication System

### Features

* User Registration
* User Login
* JWT Authentication
* Access Token (short-lived)
* Refresh Token (HTTP-only cookie)
* Logout

---

## 🔑 Token Strategy

| Token         | Purpose     | Storage          |
| ------------- | ----------- | ---------------- |
| Access Token  | API access  | Memory/Header    |
| Refresh Token | Renew token | HTTP-only Cookie |

---

# 📋 Task Management System

### Features

* Create Task
* Read Tasks
* Update Task
* Delete Task
* Toggle Status
* Pagination
* Filtering
* Search

---

# 🔒 Security Features

* Password hashing (bcrypt)
* JWT authentication
* HTTP-only cookies
* User-specific data isolation
* Protected routes

---

# ✅ Validation (Zod)

* Auth validation (email, password)
* Task validation (title, status)

---

# ⚙️ Error Handling

* Centralized error middleware
* Async handler wrapper
* Clean API response structure

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

### Register

```
POST /auth/register
```

### Login

```
POST /auth/login
```

### Refresh

```
POST /auth/refresh
```

### Logout

```
POST /auth/logout
```

---

## 📋 TASK APIs (Protected 🔐)

### Header

```
Authorization: Bearer <access_token>
```

### Endpoints

* POST `/tasks`
* GET `/tasks`
* GET `/tasks/:id`
* PATCH `/tasks/:id`
* PATCH `/tasks/:id/toggle`
* DELETE `/tasks/:id`

### Query Examples

* Pagination → `/tasks?page=1&limit=5`
* Filter → `/tasks?status=pending`
* Search → `/tasks?search=keyword`
* Combined → `/tasks?page=1&limit=5&status=pending&search=learn`

---

# 🧪 Testing with Postman

1. Register user
2. Login → copy accessToken
3. Use header:

```
Authorization: Bearer <token>
```

4. Test all task APIs

---

# ❌ Validation Test Cases

* Invalid email → Rejected
* Short password → Rejected
* Empty title → Rejected
* Invalid status → Rejected

---

# 🔐 Security Test Cases

* No token → 401 Unauthorized
* Access other user data → Blocked

---

# 🚀 Running the Project

## 🔹 Backend Setup

📁 Navigate:

```bash
cd backend
```

### Install

```bash
npm install
```

### Important

```bash
npx prisma generate
```

### Create Environment File

📄 Location: `backend/.env`

```env
DATABASE_URL=your_neon_db_url
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

### Run

```bash
npm run dev
```

---

## 🔹 Frontend Setup

📁 Navigate:

```bash
cd frontend
```

### Install

```bash
npm install
```

### Create Environment File

📄 Location: `frontend/.env.local`

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
```

### Run

```bash
npm run dev
```

---

# 🧠 Key Highlights

* Clean modular architecture
* Secure authentication system
* Advanced querying (filter, search, pagination)
* Production-level validation
* Scalable codebase

---

# 🎯 Conclusion

This project demonstrates:

* Strong backend architecture
* Secure authentication practices
* REST API design
* Advanced frontend integration
* Clean code principles

---

# 👨‍💻 Author

Developed as part of a **Fullstack Developer Assignment (Earnest Data Analytics)**.
