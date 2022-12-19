import { Router } from "express";
import { createFile } from "../controllers/createFile.js";
import { deleteFile } from "../controllers/deleteFile.js";
import { readFile } from "../controllers/readFile.js";
import { readFiles } from "../controllers/readFiles.js";
import { updateFile } from "../controllers/updateFile.js";

const router = Router();

router.get("/", readFiles);
router.get("/file/:id", readFile);
// router.post("/add", createFile);
router.get("/update/:id", (req, res) =>
  res.render("updateFile.ejs", { id: req.params.id })
);
router.post("/update/:id", updateFile);
// router.delete("/delete", deleteFile);

export { router as fileRoutes };
