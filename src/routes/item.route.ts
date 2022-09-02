import { Router } from "express";
import {
  createItem,
  getItemById,
  getAllItem,
  updateItem,
} from "../controllers/item.controller";

const itemRouter = Router();

itemRouter.post("/", createItem);
itemRouter.put("/:id", updateItem);
itemRouter.get("/:id", getItemById);
itemRouter.get("/", getAllItem);

export default itemRouter;
