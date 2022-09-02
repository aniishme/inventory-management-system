import { Router } from "express";
import { z } from "zod";
import { validate } from "../utils/zod.validate";

import {
  createItem,
  getItemById,
  getAllItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";

const itemRouter = Router();

const dataSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
    categoryId: z.string({
      required_error: "Category is required",
    }),
  }),
});

itemRouter.post("/", validate(dataSchema), createItem);
itemRouter.put("/:id", updateItem);
itemRouter.delete("/:id", deleteItem);
itemRouter.get("/:id", getItemById);
itemRouter.get("/", getAllItem);

export default itemRouter;
