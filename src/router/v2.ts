import { Router } from "express";
import verifyUser from "../middleware";
const v2Router = Router();
v2Router.get("/", verifyUser, (req, res) => {
  res.status(200).send({
    msg: " from v2",
  });
});

export default v2Router;
