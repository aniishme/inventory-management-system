import { Router } from "express";
import { createItem } from "../controllers/item.controller";

const itemRouter = Router();

itemRouter.post("/", createItem);

export default itemRouter;
