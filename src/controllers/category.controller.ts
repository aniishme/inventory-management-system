import { Request, Response } from "express";
import prisma from "../db";

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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const updatedCategory = await prisma.category.update({
      where: {
        id: req.params.id,
      },
      data: { ...req.body },
    });

    return res.status(201).json({ updatedCategory, message: "updated" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await prisma.category.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: "deleted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoryByID = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    return res.status(200).json(category);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        items: true,
      },
    });

    return res.status(200).json(categories);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
