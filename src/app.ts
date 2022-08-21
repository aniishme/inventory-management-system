import express from "express";
import authRouter from "./routes/auth.route";

const app = express();

app.use("/", authRouter);

app.listen(3000, () => {
  console.log("App running");
});
