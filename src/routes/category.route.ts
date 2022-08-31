import { Router } from "express";
import { z } from "zod";
import { validate } from "../utils/zod.validate";

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
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});

const paramSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "ID is required",
    }),
  }),
});

categoryRouter.post("/", validate(dataSchema), createCategory);
categoryRouter.put("/:id", validate(paramSchema), updateCategory);
categoryRouter.delete("/:id", validate(dataSchema), deleteCategory);
categoryRouter.get("/:id", getCategoryByID);
categoryRouter.get("/", getAllCategory);

export default categoryRouter;
