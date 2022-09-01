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
