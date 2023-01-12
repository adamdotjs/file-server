import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileRoutes } from "./routes/file.js";
import { indexRoutes } from "./routes/index.js";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.static("public"));

app.use("/", indexRoutes);
app.use("/files", fileRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
