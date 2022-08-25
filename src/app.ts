import express from "express";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import {
  verifyUser,
  verifyAdmin,
} from "./middlewares/authorization.middleware";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/", verifyAdmin, (req, res) => {
  // console.log(req.cookies);
  res.send("Hello World");
});
app.listen(8000, () => {
  console.log("App running");
});
