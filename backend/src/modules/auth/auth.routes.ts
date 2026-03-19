import { Router } from "express";
import { register, login, refresh, logout } from "./auth.controller";

import { validate } from "../../middleware/validate.middleware";
import { registerSchema, loginSchema } from "./auth.validation";

const router = Router();

// router.post("/register", register);
// router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;