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

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if ((await req.cookies.session) || req.headers.authorization) {
      const token =
        (await req.cookies.session.token) || req.headers.authorization;

      const user = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as unknown as User;

      if (!user) return res.status(401).json({ message: "Unauthorized" });
      req.body.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if ((await req.cookies.session) || req.headers.authorization) {
      const token =
        (await req.cookies.session.token) || req.headers.authorization;

      const user = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as unknown as User;

      if (!user) return res.status(401).json({ message: "Unauthorized" });

      if (user.role != "ADMIN")
        return res.status(401).json({ message: "Unauthorized" });

      req.body.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
