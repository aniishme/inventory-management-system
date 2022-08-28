import express from "express";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category.route";

import {
  verifyUser,
  verifyAdmin,
} from "./middlewares/authorization.middleware";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/", verifyAdmin, (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log("App running");
});
