import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isProjectMember } from "../middlewares/proj.middleware.js";
import { createProject, joinByPasswordProject, getProject } from "../controllers/proj.controller.js"

const router = Router();

router.route("/create").post(verifyJWT, createProject);
router.route("/join").post(verifyJWT, joinByPasswordProject);

router.route("/:projId").get(verifyJWT, isProjectMember, getProject);

export default router;