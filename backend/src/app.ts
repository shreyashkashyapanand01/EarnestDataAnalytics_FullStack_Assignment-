import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
const app = express();
import { authenticate, AuthRequest } from "./middleware/auth.middleware";

import taskRoutes from "./modules/task/task.routes";

import { globalErrorHandler } from "./middleware/error.middleware";

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/protected", authenticate, (req: AuthRequest, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

app.use("/tasks", taskRoutes);

app.use(globalErrorHandler);

export default app;