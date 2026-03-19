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

# 🏗️ Project Architecture

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── task/
│   │
│   ├── middleware/
│   ├── utils/
│   ├── prisma/
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│   └── schema.prisma
│
├── .env
├── prisma.config.ts
├── package.json
```

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

# 👨‍💻 Author

Developed as part of a Fullstack Developer assignment.

---
