import { Router } from "express";
import {
  createItem,
  getItemById,
  getAllItem,
} from "../controllers/item.controller";

const itemRouter = Router();

itemRouter.post("/", createItem);
itemRouter.post("/:id", getItemById);
itemRouter.get("/", getAllItem);

export default itemRouter;
