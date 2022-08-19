import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Success" });
});

export default router;
