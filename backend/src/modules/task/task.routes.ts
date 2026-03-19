import { Router } from "express";
import * as controller from "./task.controller";
import { authenticate } from "../../middleware/auth.middleware";

import { validate } from "../../middleware/validate.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
} from "./task.validation";

const router = Router();

router.use(authenticate);

router.get("/", controller.getTasks);
// router.post("/", controller.createTask);
router.post("/", validate(createTaskSchema), controller.createTask);
router.get("/:id", controller.getTask);
//router.patch("/:id", controller.updateTask);
router.patch("/:id", validate(updateTaskSchema), controller.updateTask);
router.delete("/:id", controller.deleteTask);
router.patch("/:id/toggle", controller.toggleTask);

export default router;