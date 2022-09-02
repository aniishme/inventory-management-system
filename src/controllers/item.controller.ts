import { Request, Response } from "express";
import prisma from "../db";

export const createItem = async (req: Request, res: Response) => {
  try {
    const newItem = await prisma.item.create({
      data: { ...req.body },
    });

    return res.status(200).json(newItem);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!item) return res.status(404).json({ message: "Item not found" });

    return res.status(200).json(item);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllItem = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();

    return res.status(200).json(items);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
