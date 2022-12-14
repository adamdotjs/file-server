import { Router } from "express";
import { createFile } from "../controllers/createFile.js";
import { deleteFile } from "../controllers/deleteFile.js";
import { readFile } from "../controllers/readFile.js";
import { updateFile } from "../controllers/updateFile.js";

const router = Router();

// router.get("/", readFiles);
router.get("/:id", readFile);
// router.post("/add", createFile);
// router.put("/update", updateFile);
// router.delete("/delete", deleteFile);

export { router as fileRoutes };
