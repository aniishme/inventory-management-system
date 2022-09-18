import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loggedInUser,
  loginUser,
  logOutUser,
} from "../controllers/auth.controller";
import { z } from "zod";
import { validate } from "../utils/zod.validate";
import { verify } from "crypto";
import { verifyAdmin } from "../middlewares/authorization.middleware";
const authRouter = Router();

const dataSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Fullname is required",
    }),
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3, "Username must be at least 3 characters long"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters long"),
    role: z.string({
      required_error: "Role is required",
    }),
  }),
});

authRouter.post("/register", [verifyAdmin, validate(dataSchema)], createUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", loggedInUser);
authRouter.get("/logout", logOutUser);
authRouter.get("/users", verifyAdmin, getAllUsers);
authRouter.delete("/users/:id", verifyAdmin, deleteUser);

export default authRouter;
