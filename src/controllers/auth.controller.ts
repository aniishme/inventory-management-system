import { Request, Response } from "express";
import prisma from "../db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/verify.accesstoken";

export const createUser = async (req: Request, res: Response) => {
  try {
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

    if (!isMatch) return res.status(400).json({ message: "User not found" });

    const tokenData = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    let token = jwt.sign(tokenData, process.env.SECRET_KEY as string);
    const cookieAge = 60 * 60 * 24 * 7;
    res.cookie(
      "session",
      { token },
      { httpOnly: true, path: "/", maxAge: cookieAge }
    );
    return res.status(200).json({ message: "Cookie Set" });
  } catch (error: any) {
    return res.status(500).json({ message: error });
  }
};

export const loggedInUser = async (req: Request, res: Response) => {
  try {
    const data = await verifyAccessToken(req, res);
    return res.status(200).json(data);
  } catch (error: any) {
    return res
      .status(401)
      .clearCookie("session")
      .json({ message: error.message });
  }
};
