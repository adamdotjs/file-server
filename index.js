import * as dotenv from "dotenv";
import express from "express";
import { fileRoutes } from "./routes/file.js";
import { indexRoutes } from "./routes/index.js";

const app = express();

dotenv.config();

app.use("/", indexRoutes);
app.use("/files", fileRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
