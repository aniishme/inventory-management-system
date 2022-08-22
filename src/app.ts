import express from "express";
import authRouter from "./routes/auth.route";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("App running");
});
