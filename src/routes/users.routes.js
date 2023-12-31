import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { UsersController } from "../controllers/users.controller.js";

const router = Router()

router.post("/premium/:uid", checkRole(["admin"]), UsersController.modifyRole)

export {router as usersRouter}