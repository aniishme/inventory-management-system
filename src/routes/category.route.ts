import { Router } from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/", getAllCategory);

export default categoryRouter;
