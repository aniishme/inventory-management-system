import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller";
import { body } from "express-validator";
const authRouter = Router();

authRouter.post(
  "/register",
  body("name").not().isEmpty().withMessage("Name is required"),
  body("username")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  createUser
);
authRouter.post("/login", loginUser);

export default authRouter;
