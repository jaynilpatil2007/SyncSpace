import { Router } from "express";
import { updateDocument, createDocument, deleteDocument, getSingleDocument, getUserDocument } from "../controllers/doc.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createDocument);

router.route("/").get(getUserDocument);

router.route("/:id").get(getSingleDocument);

router.route("/:id").put(updateDocument);

router.route("/:id").delete(deleteDocument);

export default router;