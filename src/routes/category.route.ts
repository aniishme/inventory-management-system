import { Router } from "express";
import { z } from "zod";
import {
  createCategory,
  getCategoryByID,
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
const categoryRouter = Router();

const dataSchema = z.object({
  body: z.object({
    fullname: z.string({
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

categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.get("/:id", getCategoryByID);
categoryRouter.get("/", getAllCategory);

export default categoryRouter;
