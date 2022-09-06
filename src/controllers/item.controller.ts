import { Request, Response } from "express";
import prisma from "../db";
import cloud from "../utils/cloudinary.config";

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, price, categoryId, image } = req.body;
    const cloudinaryResponse = await cloud.uploader.upload(image, {
      folder: "items",
    });
    const imageUrl = cloudinaryResponse.secure_url;

    const item = await prisma.item.create({
      data: {
        name: name,
        price: price,
        categoryId: categoryId,
        imageUrl: imageUrl,
      },
    });

    return res.status(200).json(item);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!item) return res.status(404).json({ message: "Item not found" });

    const updatedItem = await prisma.item.update({
      where: {
        id: req.params.id,
      },
      data: { ...req.body },
    });

    return res.status(201).json({ updatedItem, message: "updated" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!item) return res.status(404).json({ message: "Item not found" });

    await prisma.item.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: "deleted" });
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
      include: {
        category: true,
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
    const items = await prisma.item.findMany({
      include: {
        category: true,
      },
    });

    return res.status(200).json(items);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
