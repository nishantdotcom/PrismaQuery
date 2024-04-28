import { Router } from "express";

const authRouter = Router();
authRouter.get("/", (req, res) => {
  res.status(200).send({
    msg: "getting from auth api",
  });
});

authRouter.get("/validate-user", (req, res) => {
  res.status(200).send({
    msg: " validate user sign",
  });
});

export default authRouter;
