import express, { Router, Request, Response, NextFunction } from "express";

const authRouter = Router();

authRouter.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Success" });
});

export default authRouter;
