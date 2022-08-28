import { Router } from "express";
import { createCategory } from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter.post("/create", createCategory);

export default categoryRouter;
