import express from "express";
import { userControllerr } from "./user.controller";

const router = express.Router();
router.post("/auth/signup", userControllerr.createUser);

router.get('/users', userControllerr.getAllUsers);

router.put("/users/:id", userControllerr.updateUser);

router.delete("/users/:id", userControllerr.deleteUser);

export const userRouter = router;