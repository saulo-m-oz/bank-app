import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import { appRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("", appRoutes);
app.use(errorMiddleware);

export default app;
