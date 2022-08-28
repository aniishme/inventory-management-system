import { Router } from "express";
import {
  createCategory,
  getCategoryByID,
  getAllCategory,
} from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/:id", getCategoryByID);
categoryRouter.get("/", getAllCategory);

export default categoryRouter;
