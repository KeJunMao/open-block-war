import express from "express";
import router from "./routes";
const app = express();

app.use("/api", router);

export const handler = app;
