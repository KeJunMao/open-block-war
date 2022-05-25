import express from "express";
import { getFaceByBilibili, getFaceByTenApi } from "./proxy/getBilibiliFace";
import router from "./routes";
const app = express();

app.use("/api", router);

export const handler = app;
