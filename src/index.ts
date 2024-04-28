import express from "express";
import dotenv from "dotenv";
import v1Router from "./router/v1";
import v2Router from "./router/v2";
import authRouter from "./router/auth";
import v3router from "./router/v3";

const app = express();
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "HIi",
  });
});

app.use("/v1", v1Router);
app.use("/v2", v2Router);
app.use("/v3", v3router);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listning to port ${PORT}`);
});
