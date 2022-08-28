import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        name: req.body.name,
      },
    });

    if (category)
      return res.status(400).json({ message: "Category name must be unique" });

    const newCategory = await prisma.category.create({
      data: { ...req.body },
    });

    return res.status(200).json(newCategory);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};