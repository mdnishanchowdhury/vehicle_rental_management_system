import express from "express";
import { userControllerr } from "./user.controller";

const router = express.Router();

router.post('/signup', userControllerr.createUser);

export const userRouter = router;