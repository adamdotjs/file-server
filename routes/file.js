import { Router } from "express";
import multer from "multer";
import { createFile } from "../controllers/createFile.js";
import { readFile } from "../controllers/readFile.js";
import { readFiles } from "../controllers/readFiles.js";
import { readExistingValues, updateFile } from "../controllers/updateFile.js";

const router = Router();
const upload = multer();

router.get("/", readFiles);
router.get("/file/:id", readFile);
router.post("/add", upload.any(), createFile);
router.get("/update/:id", readExistingValues);
router.post("/update/:id", upload.any(), updateFile);

export { router as fileRoutes };
