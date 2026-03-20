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
Frontend implemented as requested for the Fullstack Developer assignment.
