import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = await prisma.user.create({
      data: { ...req.body, password: hashedPassword, salt: salt },
    });

    return res.status(200).json(newUser);
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

    let token = jwt.sign(user, process.env.SECRET_KEY as string);

    res.cookie(
      "session",
      { user: { name: user.name, username: user.username }, token },
      { httpOnly: true }
    );
    return res.status(200).json({ message: "Cookie Set" });
  } catch (error: any) {
    return res.status(500).json({ message: error });
  }
};
