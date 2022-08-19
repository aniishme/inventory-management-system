import express, { Express, Request, Response } from "express";
import router from "./routes/items.route";

const app: Express = express();

app.use("/", router);

app.listen(3000, () => {
  console.log("App running");
});
