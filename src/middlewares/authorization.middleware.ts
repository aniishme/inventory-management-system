import { NextFunction, Request, Response } from "express";
import { verifyAccessToken, User } from "../utils/verify.accesstoken";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await verifyAccessToken(req, res);
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

    next();
  } catch (error: any) {
    if (error) return res.status(500).send({ message: error.message });
  }
};
