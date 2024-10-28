import express from "express";
import "express-async-errors";
import configs from "../config/config";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error-middleware/error-handler";
import { notFoundMiddleware } from "./middlewares/not-found-middleware/not-found";
import { loggerMiddleware } from "./lib/winston/winston";
import healthCheckRouter from "./routes/health-check";
import serveFavicon from "serve-favicon";
import path from "path";
import { apiRouter } from "./routes/main-route";
import { PATHS } from "./constants";
import expressListEndpoints from "express-list-endpoints";

const app = express();

app.use(express.json());
app.use(serveFavicon(path.join(__dirname, "../public", "favicon.ico")));
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use(
  cors({
    origin: configs.whiteListedOrigin,
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  }),
);

app.use(healthCheckRouter);
app.use(PATHS.Base, apiRouter);

app.get("/", (_req, res) => {
  res.json({ message: "server started" });
});

app.get("/routes", (_req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
