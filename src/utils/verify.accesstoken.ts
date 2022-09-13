import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  salt: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

export const verifyAccessToken = async (req: Request, res: Response) => {
  const token =
    (await req.cookies.session?.token) || req.headers?.authorization;

  const user = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as unknown as User;

  return user;
};
