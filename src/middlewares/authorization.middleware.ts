import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  salt: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

const verifyAccessToken = async (req: Request, res: Response) => {
  const token =
    (await req.cookies.session?.token) || req.headers?.authorization;

  const user = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as unknown as User;

  return user;
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await verifyAccessToken(req, res);

    req.body.user = user;

    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await verifyAccessToken(req, res)) as User;

    if (user.role != "ADMIN")
      return res.status(401).json({ message: "Unauthorized" });

    req.body.user = user;

    next();
  } catch (error: any) {
    if (error) return res.status(500).send({ message: error.message });
  }
};
