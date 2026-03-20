# 🚀 Fullstack Assignment Backend - Earnest Data Analytics

This is a **production-ready backend API** built using **Node.js, TypeScript, Prisma, and PostgreSQL**, implementing secure authentication and a complete task management system.

---

# 📌 Tech Stack

* **Node.js** (Runtime)
* **Express.js** (Backend Framework)
* **TypeScript** (Type Safety)
* **Prisma ORM (v7 with Adapter)** (Database ORM)
* **PostgreSQL (Neon Cloud DB)** (Database)
* **JWT (jsonwebtoken)** (Authentication)
* **bcrypt** (Password Hashing)
* **Zod** (Validation)
* **Cookie Parser** (Handling cookies)
* **ts-node-dev** (Development server)

---

# 🏗️ Project Architecture (Detailed)

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
│   │   └── error.middleware.ts         # Global error handler (centralized error handling)
│   │
│   ├── utils/
│   │   ├── asyncHandler.ts             # Wraps async functions to catch errors automatically
│   │   ├── hash.ts                    # Password hashing and comparison (bcrypt)
│   │   ├── jwt.ts                     # JWT generation & verification (access + refresh tokens)
│   │   └── response.ts                # Standard API response format (success/error)
│   │
│   ├── prisma/
│   │   └── client.ts                  # Prisma client instance (DB connection)
│   │
│   ├── app.ts                         # Express app configuration (middlewares, routes)
│   └── server.ts                      # Entry point (starts server, loads env variables)
│
├── prisma/
│   ├── schema.prisma                  # Database schema (User, Task models)
│   └── migrations/                    # Auto-generated DB migration files
│
├── .env                              # Environment variables (DB URL, JWT secrets)
├── prisma.config.ts                  # Prisma v7 configuration (adapter + datasource)
├── package.json                      # Project dependencies & scripts
```

---

# 🧠 Architecture Explanation

This backend follows a **modular and layered architecture**:

### 🔹 Controller Layer

* Handles incoming HTTP requests
* Sends responses back to client

### 🔹 Service Layer

* Contains business logic
* Interacts with database via Prisma

### 🔹 Middleware Layer

* Authentication (JWT verification)
* Validation (Zod schemas)
* Error handling (global middleware)

### 🔹 Utility Layer

* Common reusable functions (JWT, hashing, responses)

### 🔹 Database Layer

* Prisma ORM manages PostgreSQL database
* Schema defined in `schema.prisma`

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


---

# 🔐 Authentication System

### Features:

* User Registration
* User Login
* JWT-based Authentication
* Access Token (short-lived)
* Refresh Token (stored in HTTP-only cookie)
* Logout functionality

---

## 🔑 Token Strategy

| Token         | Purpose              | Storage                |
| ------------- | -------------------- | ---------------------- |
| Access Token  | API access           | Client (memory/header) |
| Refresh Token | Get new access token | HTTP-only Cookie       |

---

# 📋 Task Management System

### Features:

* Create Task
* Read Tasks
* Update Task
* Delete Task
* Toggle Task Status
* Pagination
* Filtering (status)
* Searching (title)

---

# 🔒 Security Features

* Password hashing using bcrypt
* JWT Authentication
* HTTP-only cookies
* User-specific data access
* Protected routes using middleware

---

# ✅ Validation (Zod)

All incoming requests are validated using **Zod schemas**:

* Auth validation (email, password)
* Task validation (title, status, etc.)

---

# ⚙️ Error Handling

* Centralized error middleware
* Async error handling using wrapper
* Clean API response structure

---

# 📦 API RESPONSE FORMAT

### Success:

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

### Error:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 🌐 API ENDPOINTS

---

## 🔐 AUTH APIs

### 1. Register

```
POST /auth/register
```

Body:

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 2. Login

```
POST /auth/login
```

Response:

```json
{
  "user": {},
  "accessToken": "..."
}
```

---

### 3. Refresh Token

```
POST /auth/refresh
```

---

### 4. Logout

```
POST /auth/logout
```

---

# 📋 TASK APIs (Protected 🔐)

### Header Required:

```
Authorization: Bearer <access_token>
```

---

### 5. Create Task

```
POST /tasks
```

---

### 6. Get All Tasks

```
GET /tasks
```

---

### 7. Pagination

```
GET /tasks?page=1&limit=5
```

---

### 8. Filter

```
GET /tasks?status=pending
```

---

### 9. Search

```
GET /tasks?search=keyword
```

---

### 10. Combined Query

```
GET /tasks?page=1&limit=5&status=pending&search=learn
```

---

### 11. Get Single Task

```
GET /tasks/:id
```

---

### 12. Update Task

```
PATCH /tasks/:id
```

---

### 13. Toggle Task Status

```
PATCH /tasks/:id/toggle
```

---

### 14. Delete Task

```
DELETE /tasks/:id
```

---

# 🧪 Testing with Postman

---

## Step 1: Register User

* POST `/auth/register`

---

## Step 2: Login

* Copy `accessToken`
* Cookie automatically stores refresh token

---

## Step 3: Use Protected Routes

Add header:

```
Authorization: Bearer <access_token>
```

---

## Step 4: Test Task APIs

* Create tasks
* Fetch tasks
* Apply filters/search
* Toggle status
* Delete tasks

---

# ❌ Validation Test Cases

* Invalid email → ❌ rejected
* Short password → ❌ rejected
* Empty title → ❌ rejected
* Invalid status → ❌ rejected

---

# 🔐 Security Test Cases

* Access without token → ❌ 401
* Access other user's data → ❌ blocked

---

# 🚀 Running the Project

---

## 1. Install Dependencies

```
npm install
```
## Important ⚠️
```
npx prisma generate
```

---

## 2. Setup Environment Variables

Create `.env`:

```
DATABASE_URL=your_neon_db_url
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

---

## 3. Run Server

```
npm run dev
```

---

# 🧠 Key Highlights

* Clean modular architecture
* Secure authentication system
* Advanced querying (pagination, filter, search)
* Production-level validation and error handling
* Prisma ORM with PostgreSQL
* Scalable and maintainable codebase

---

# 🎯 Conclusion

This backend demonstrates:

* Strong understanding of backend architecture
* Secure authentication practices
* REST API design
* Clean code principles

---
<!-- 
# 👨‍💻 Author

Developed as part of a Fullstack Developer assignment. -->

---

# Frontend Part 
# 🚀 Fullstack Assignment Frontend - Task Management Dashboard

This is a **production-ready frontend web application** built using **Next.js 14 (App Router), TypeScript, and Tailwind CSS v4**, perfectly integrated with the secure Node.js backend to provide a seamless Task Management experience.

---

# 📌 Tech Stack

* **Next.js 14 (App Router)** (React Framework)
* **React 19** (UI Library)
* **TypeScript** (End-to-end Type Safety)
* **Tailwind CSS v4** (Utility-first CSS framework for premium styling)
* **React Hook Form** (Performant, flexible form state management)
* **Zod** (Schema-based form validation)
* **Axios** (Promise-based HTTP client with interceptors)
* **Lucide React** (Beautiful, consistent icons)
* **React Hot Toast** (Elegant toast notifications)

---

# 🏗️ Project Architecture (Detailed)

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

# 🧠 Architecture Explanation

This frontend application follows a **modular, scalable component architecture**:

### 🔹 App Router Layer
* Utilizes Next.js Server & Client components efficiently.
* Handles route protection and authentication redirects naturally.

### 🔹 Component Layer
* Highly reusable, strictly-typed UI components.
* Styled with premium UI/UX aesthetics using Tailwind glassmorphism (`backdrop-blur`) and micro-interactions.

### 🔹 API Integration Layer
* Centralized API logic inside `lib/`.
* Isolates API payloads and responses from UI rendering completely.

### 🔹 Global State Layer
* Utilizes React Context API (`AuthContext`) to wrap the application, ensuring authentication state is synchronized across all routes without prop-drilling.

---

# 🔄 Request Flow

```plaintext
User Action (e.g. click "Login" / "Save Task")
      ↓
React Hook Form state update
      ↓
Validation Layer (Zod strictly matches backend schemas)
      ↓
API Method call (lib/auth.ts or lib/tasks.ts)
      ↓
Axios Interceptor (injects Bearer Token if needed)
      ↓
Backend Express API
      ↓
Response Parsed
      ↓
State Updated (Context / Local State)
      ↓
Toast Notification Triggered → Client
```

---

# 🔐 Authentication System

### Features:
* **Silent Token Refreshes**: Before a user even realizes their token expired, Axios Interceptors catch `401 Unauthorized` errors, automatically ping the `/auth/refresh` endpoint (via the HTTP-only cookie), update the in-memory token, and invisibly retry the failed request.
* **In-Memory Storage**: Access tokens are stored strictly in React state/memory—not localStorage—to prevent XSS attacks.
* **Session Persistence**: The app attempts to refresh the session silently the moment the application loads.
* **Route Guards**: Dashboard redirects to `/login` if unauthenticated. Login redirects to `/dashboard` if authenticated.

---

# 📋 Task Management UI Features

### Features:
* **Premium UX**: Deep radial gradients, smooth floating shadows, and interactive task cards.
* **Debounced Search**: Typing in the search bar uses a `setTimeout` debounce to prevent spamming the backend API on every single keystroke.
* **Status Filtering**: Instantly switch between "All", "Pending", and "Completed" views via the smart toolbar.
* **Dynamic Pagination**: Full numeric pagination controls to smoothly scrub through large lists of tasks.
* **Real-time Feedback**: Every create, edit, delete, or status toggle provides immediate visual feedback via `react-hot-toast`.

---

# ✅ Validation (React Hook Form + Zod)

The frontend uses the exact same validation rules as the backend by defining isomorphic Zod schemas. Forms will block submission and show inline red text errors for:
* Invalid email formats
* Missing passwords / Unmatched "Confirm Password"
* Missing Task Titles

---

# 🚀 Running the Project

---

## 1. Install Dependencies
Ensure you are in the `frontend` directory.
```bash
npm install
```

---

## 2. Setup Environment Variables
Make sure your `.env.local` file contains the link to your running backend:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
```

---

## 3. Run Development Server
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

# 🧠 Key Highlights
* **Zero UI Overlaps**: Fully mobile-responsive Flexbox layouts tailored for all screen sizes.
* **Advanced Axios Setup**: Interceptor-based retry logic for handling expired tokens.
* **Premium Aesthetics**: Utilizes Tailwind CSS v4 to achieve complex glassmorphism dropshadows and gradients.
* **Type-Safe**: 100% strict TypeScript coverage protecting against runtime errors.

---

# 🎯 Conclusion
This frontend pairs perfectly with the provided backend, demonstrating:
* Advanced React and Next.js state management
* Secure frontend authentication practices
* Premium, user-centric UI/UX design
* Clean separation of concerns

---

# 👨‍💻 Author
Frontend  and backendimplemented as requested for the Fullstack Developer assignment.
