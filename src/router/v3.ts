import { Router } from "express";
import prisma from "../db/prisma";
const v3router = Router();
v3router.get("/", async (req, res) => {
  res.status(200).send({
    msg: "Inside V3 routes",
  });
});

export default v3router;
