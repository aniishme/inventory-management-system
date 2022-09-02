import { Router } from "express";
import { createItem, getAllItem } from "../controllers/item.controller";

const itemRouter = Router();

itemRouter.post("/", createItem);
itemRouter.get("/", getAllItem);

export default itemRouter;
