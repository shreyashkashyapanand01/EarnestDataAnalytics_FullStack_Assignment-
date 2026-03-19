import { Router } from "express";
import { register, login, refresh, logout } from "./auth.controller";

import { validate } from "../../middleware/validate.middleware";
import { registerSchema, loginSchema } from "./auth.validation";

import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/refresh", asyncHandler(refresh));
router.post("/logout", asyncHandler(logout));

export default router;