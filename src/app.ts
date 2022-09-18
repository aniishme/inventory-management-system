import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category.route";
import itemRouter from "./routes/item.route";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

import {
  verifyUser,
  verifyAdmin,
} from "./middlewares/authorization.middleware";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/category", verifyUser, categoryRouter);
app.use("/item", verifyUser, itemRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log("App running");
});
