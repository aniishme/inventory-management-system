import { Router } from "express";
import {
  createCategory,
  getCategoryByID,
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.put("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);
categoryRouter.get("/:id", getCategoryByID);
categoryRouter.get("/", getAllCategory);

export default categoryRouter;
