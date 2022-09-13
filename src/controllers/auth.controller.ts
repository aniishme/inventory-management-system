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

    const resData = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
    };

    return res.status(200).json(resData);
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
    const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
    res.cookie(
      "session",
      { token },
      { httpOnly: true, path: "/", maxAge: ONE_WEEK_IN_MS }
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

export const logOutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("session");
    return res.status(200).json({ message: "Session Ended" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
