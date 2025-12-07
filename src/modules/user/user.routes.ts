import express from "express";
import { userControllerr } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/auth/signup", userControllerr.createUser);

router.get('/users', auth("admin"), userControllerr.getAllUsers);

router.put("/users/:id",auth("admin", "customer"), userControllerr.updateUser);

router.delete("/users/:id", auth("admin"), userControllerr.deleteUser);

export const userRouter = router;
