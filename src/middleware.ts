import { Request, Response } from "express";

export default function verifyUser(req: Request, res: Response, next: any) {
  console.log("verifiying  middleware");
  next();
}
