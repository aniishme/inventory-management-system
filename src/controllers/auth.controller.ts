import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    const newUser = await prisma.user.create({
      data: { ...req.body, password: hashedPassword },
    });

    res.status(200).json(newUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(req.body.password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    // const token = user.generateToken();

    res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
