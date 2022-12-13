import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
	res.send("TigerPress File Store");
});

export { router as indexRoutes };
