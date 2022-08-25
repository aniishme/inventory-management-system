import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (await req.cookies.session) {
      const token = await req.cookies.session.token;

      const user: any = jwt.verify(token, process.env.SECRET_KEY as string);

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
    if (await req.cookies.session) {
      const token = await req.cookies.session.token;

      const user: any = jwt.verify(token, process.env.SECRET_KEY as string);

      console.log(user.role);
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
