import { Router } from "express";
import {
  createItem,
  getItemById,
  getAllItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";

const itemRouter = Router();

itemRouter.post("/", createItem);
itemRouter.put("/:id", updateItem);
itemRouter.put("/:id", deleteItem);
itemRouter.get("/:id", getItemById);
itemRouter.get("/", getAllItem);

export default itemRouter;
